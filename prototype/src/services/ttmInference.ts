/**
 * TTM (Transtheoretical Model) Stage Classification Module
 * 
 * This module implements rule-based classification for the five TTM stages of change:
 * - Pre-contemplation: No intention to change (not thinking about it)
 * - Contemplation: Considering change but not committed (thinking about it)
 * - Preparation: Planning to change soon (getting ready)
 * - Action: Actively making changes (doing it now)
 * - Maintenance: Sustained change over time (keeping it up)
 * 
 * Classification is based on keyword patterns and conversation history.
 * Returns stage classification with confidence score (0-100).
 */

// Keyword dictionaries for TTM stage classification

const STAGE_KEYWORDS = {
  preContemplation: [
    // No interest in change
    'not interested', 'don\'t want', 'don\'t care', 'don\'t need',
    'not ready', 'not now', 'maybe later', 'not for me',
    'fine as is', 'happy with', 'satisfied with', 'no problem',
    'don\'t see why', 'don\'t think', 'not important', 'not priority',
    // Resistance
    'won\'t', 'refuse', 'reject', 'against', 'opposed',
    'not convinced', 'don\'t believe', 'skeptical', 'doubt',
    // Denial
    'not that bad', 'exaggerating', 'overreacting', 'fine',
    'nothing wrong', 'no issue', 'not a problem'
  ],
  
  contemplation: [
    // Considering change
    'thinking about', 'considering', 'wondering', 'maybe',
    'might', 'could', 'should', 'ought to', 'supposed to',
    'want to', 'wish', 'hope', 'would like', 'interested',
    // Ambivalence
    'but', 'however', 'although', 'on the other hand',
    'not sure', 'uncertain', 'confused', 'torn', 'conflicted',
    'pros and cons', 'weighing', 'debating', 'hesitant',
    // Awareness without commitment
    'know I should', 'realize', 'understand', 'aware',
    'see the benefits', 'makes sense', 'good idea',
    'someday', 'eventually', 'in the future'
  ],
  
  preparation: [
    // Planning to change
    'planning', 'going to', 'will', 'intend to', 'plan to',
    'preparing', 'getting ready', 'about to', 'soon',
    'next week', 'next month', 'starting', 'beginning',
    // Taking small steps
    'researching', 'learning', 'looking into', 'finding out',
    'asking about', 'gathering', 'collecting', 'organizing',
    'making a plan', 'setting goals', 'deciding', 'choosing',
    // Commitment forming
    'committed', 'determined', 'ready', 'prepared',
    'decided', 'resolved', 'set on', 'serious about',
    'this time', 'for real', 'definitely'
  ],
  
  action: [
    // Currently changing
    'doing', 'trying', 'working on', 'practicing',
    'started', 'began', 'currently', 'now', 'today',
    'this week', 'recently', 'just started', 'actively',
    // Behavioral changes
    'eating', 'cooking', 'preparing', 'choosing',
    'avoiding', 'cutting', 'reducing', 'increasing',
    'tracking', 'logging', 'monitoring', 'measuring',
    // Progress indicators
    'have been', 'been doing', 'doing for', 'so far',
    'progress', 'improving', 'getting better', 'working',
    'making changes', 'taking action', 'following'
  ],
  
  maintenance: [
    // Sustained change
    'maintaining', 'keeping', 'continuing', 'sustaining',
    'still', 'always', 'consistently', 'regularly',
    'habit', 'routine', 'lifestyle', 'way of life',
    // Long-term indicators
    'for months', 'for years', 'long time', 'established',
    'automatic', 'natural', 'easy now', 'second nature',
    'don\'t even think', 'just do', 'part of me',
    // Confidence in maintenance
    'confident', 'comfortable', 'stable', 'solid',
    'won\'t go back', 'never again', 'permanent',
    'learned', 'mastered', 'figured out', 'know how'
  ]
};

// Temporal indicators help distinguish between stages
const TEMPORAL_INDICATORS = {
  past: ['used to', 'before', 'previously', 'in the past', 'ago'],
  present: ['now', 'currently', 'today', 'this week', 'these days'],
  future: ['will', 'going to', 'plan to', 'next', 'soon', 'later'],
  duration: ['for weeks', 'for months', 'for years', 'since']
};

/**
 * TTM stage classification result
 */
export interface TTMStage {
  stage: 'preContemplation' | 'contemplation' | 'preparation' | 'action' | 'maintenance';
  confidence: number;  // 0-100: Confidence in the classification
  description: string; // Human-readable stage description
}

/**
 * Classify TTM stage from a single user message
 * 
 * @param message - User's message text
 * @returns TTM stage classification with confidence
 */
export function classifyTTMStage(message: string): TTMStage {
  const lowerMessage = message.toLowerCase();
  
  // Count keyword matches for each stage
  const stageCounts = {
    preContemplation: countKeywordMatches(lowerMessage, STAGE_KEYWORDS.preContemplation),
    contemplation: countKeywordMatches(lowerMessage, STAGE_KEYWORDS.contemplation),
    preparation: countKeywordMatches(lowerMessage, STAGE_KEYWORDS.preparation),
    action: countKeywordMatches(lowerMessage, STAGE_KEYWORDS.action),
    maintenance: countKeywordMatches(lowerMessage, STAGE_KEYWORDS.maintenance)
  };
  
  // Apply temporal context to adjust scores
  const temporalContext = detectTemporalContext(lowerMessage);
  const adjustedCounts = applyTemporalAdjustment(stageCounts, temporalContext);
  
  // Find stage with highest count
  const stageEntries = Object.entries(adjustedCounts) as Array<[keyof typeof adjustedCounts, number]>;
  stageEntries.sort((a, b) => b[1] - a[1]);
  
  const topStage = stageEntries[0][0];
  const topCount = stageEntries[0][1];
  const secondCount = stageEntries[1][1];
  
  // Calculate confidence based on separation from second place
  // High confidence if clear winner, low if close competition
  const confidence = calculateConfidence(topCount, secondCount);
  
  // Default to contemplation if no clear signals (neutral/exploratory)
  const finalStage = topCount === 0 ? 'contemplation' : topStage;
  
  return {
    stage: finalStage,
    confidence,
    description: getStageDescription(finalStage)
  };
}

/**
 * Classify TTM stage from conversation history
 * Uses recent messages with exponential weighting
 * 
 * @param messages - Array of user messages from conversation history
 * @param alpha - Smoothing factor (0-1), higher = more weight on recent messages
 * @returns TTM stage classification with confidence
 */
export function classifyTTMStageFromHistory(
  messages: string[],
  alpha: number = 0.4
): TTMStage {
  if (messages.length === 0) {
    return {
      stage: 'contemplation',
      confidence: 50,
      description: getStageDescription('contemplation')
    };
  }
  
  // Classify each message
  const allClassifications = messages.map(msg => classifyTTMStage(msg));
  
  // Aggregate stage scores with exponential smoothing
  const stageScores = {
    preContemplation: 0,
    contemplation: 0,
    preparation: 0,
    action: 0,
    maintenance: 0
  };
  
  // Weight recent messages more heavily
  for (let i = 0; i < allClassifications.length; i++) {
    const weight = Math.pow(alpha, allClassifications.length - 1 - i);
    const classification = allClassifications[i];
    stageScores[classification.stage] += weight * classification.confidence;
  }
  
  // Find stage with highest aggregated score
  const stageEntries = Object.entries(stageScores) as Array<[keyof typeof stageScores, number]>;
  stageEntries.sort((a, b) => b[1] - a[1]);
  
  const topStage = stageEntries[0][0];
  const topScore = stageEntries[0][1];
  const secondScore = stageEntries[1][1];
  
  // Calculate confidence based on score separation
  const totalScore = Object.values(stageScores).reduce((sum, score) => sum + score, 0);
  const confidence = totalScore > 0 
    ? Math.round((topScore / totalScore) * 100)
    : 50;
  
  return {
    stage: topStage,
    confidence: Math.min(100, confidence),
    description: getStageDescription(topStage)
  };
}

/**
 * Get intervention mode based on TTM stage
 * Maps stages to appropriate intervention approaches
 * 
 * @param stage - TTM stage
 * @returns Intervention mode name
 */
export function getInterventionMode(
  stage: 'preContemplation' | 'contemplation' | 'preparation' | 'action' | 'maintenance'
): string {
  const interventionModes = {
    preContemplation: 'Awareness',
    contemplation: 'Ambivalence-resolution',
    preparation: 'Planning',
    action: 'Coping',
    maintenance: 'Relapse-prevention'
  };
  
  return interventionModes[stage];
}

/**
 * Get human-readable description of a TTM stage
 * 
 * @param stage - TTM stage name
 * @returns User-friendly description
 */
export function getStageDescription(
  stage: 'preContemplation' | 'contemplation' | 'preparation' | 'action' | 'maintenance'
): string {
  const descriptions = {
    preContemplation: 'Not yet considering change',
    contemplation: 'Thinking about making changes',
    preparation: 'Getting ready to take action',
    action: 'Actively making changes',
    maintenance: 'Maintaining healthy habits'
  };
  
  return descriptions[stage];
}

/**
 * Get detailed stage explanation for user feedback
 * 
 * @param stage - TTM stage name
 * @returns Detailed explanation
 */
export function getStageExplanation(
  stage: 'preContemplation' | 'contemplation' | 'preparation' | 'action' | 'maintenance'
): string {
  const explanations = {
    preContemplation: 'You\'re not currently thinking about changing your eating habits. That\'s okay - awareness is the first step.',
    contemplation: 'You\'re considering making changes to your diet. You\'re weighing the pros and cons and thinking about what\'s possible.',
    preparation: 'You\'re planning to make changes soon and taking steps to get ready. You\'re building commitment and preparing for action.',
    action: 'You\'re actively working on changing your eating habits right now. You\'re taking concrete steps and making progress.',
    maintenance: 'You\'ve been maintaining healthy eating habits for a while. You\'re focused on keeping up the good work and preventing relapse.'
  };
  
  return explanations[stage];
}

// Internal helper functions

/**
 * Count how many keywords from a list appear in the message
 * Uses word boundary matching to avoid partial matches
 */
function countKeywordMatches(message: string, keywords: string[]): number {
  let count = 0;
  
  for (const keyword of keywords) {
    // Use substring match for phrases, word boundary for single words
    if (keyword.includes(' ')) {
      if (message.includes(keyword)) {
        count++;
      }
    } else {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(message)) {
        count++;
      }
    }
  }
  
  return count;
}

/**
 * Detect temporal context in the message
 * Helps distinguish between past behavior, current action, and future plans
 */
function detectTemporalContext(message: string): {
  past: number;
  present: number;
  future: number;
  duration: number;
} {
  return {
    past: countKeywordMatches(message, TEMPORAL_INDICATORS.past),
    present: countKeywordMatches(message, TEMPORAL_INDICATORS.present),
    future: countKeywordMatches(message, TEMPORAL_INDICATORS.future),
    duration: countKeywordMatches(message, TEMPORAL_INDICATORS.duration)
  };
}

/**
 * Apply temporal context to adjust stage scores
 * 
 * Rules:
 * - Future indicators boost Preparation
 * - Present indicators boost Action
 * - Duration indicators boost Maintenance
 * - Past indicators slightly reduce Action/Maintenance
 */
function applyTemporalAdjustment(
  stageCounts: Record<string, number>,
  temporal: { past: number; present: number; future: number; duration: number }
): Record<string, number> {
  const adjusted = { ...stageCounts };
  
  // Future indicators boost Preparation
  if (temporal.future > 0) {
    adjusted.preparation += temporal.future * 2;
  }
  
  // Present indicators boost Action
  if (temporal.present > 0) {
    adjusted.action += temporal.present * 2;
  }
  
  // Duration indicators strongly boost Maintenance
  if (temporal.duration > 0) {
    adjusted.maintenance += temporal.duration * 3;
  }
  
  // Past indicators reduce Action/Maintenance (talking about past, not current)
  if (temporal.past > 0) {
    adjusted.action = Math.max(0, adjusted.action - temporal.past);
    adjusted.maintenance = Math.max(0, adjusted.maintenance - temporal.past);
  }
  
  return adjusted;
}

/**
 * Calculate confidence score based on separation between top two stages
 * 
 * @param topCount - Keyword count for top stage
 * @param secondCount - Keyword count for second stage
 * @returns Confidence score (0-100)
 */
function calculateConfidence(topCount: number, secondCount: number): number {
  if (topCount === 0) {
    return 50; // Neutral confidence when no signals
  }
  
  // Calculate separation ratio
  const separation = topCount - secondCount;
  const total = topCount + secondCount;
  
  if (total === 0) {
    return 50;
  }
  
  // Confidence increases with separation
  // 100% confidence when clear winner (large separation)
  // 50% confidence when tied (no separation)
  const confidenceRatio = separation / total;
  const confidence = 50 + (confidenceRatio * 50);
  
  return Math.round(Math.max(0, Math.min(100, confidence)));
}
