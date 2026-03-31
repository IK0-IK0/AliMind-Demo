/**
 * TPB (Theory of Planned Behavior) Inference Module
 * 
 * This module implements keyword-based scoring for the three TPB constructs:
 * - Attitude: Positive/negative evaluations of healthy eating behavior
 * - Subjective Norm: Perceived social pressure and support
 * - Perceived Behavioral Control: Perceived ease/difficulty and confidence
 * 
 * Scores are returned as continuous values from 0-100, where:
 * - 0-33: Low (negative attitude, low social support, low control)
 * - 34-66: Moderate
 * - 67-100: High (positive attitude, high social support, high control)
 */

// Keyword dictionaries for TPB construct scoring

const ATTITUDE_KEYWORDS = {
  positive: [
    // Positive food/health words
    'healthy', 'nutritious', 'fresh', 'delicious', 'tasty', 'enjoy', 'love',
    'good', 'great', 'excellent', 'wonderful', 'beneficial', 'nourishing',
    'wholesome', 'natural', 'organic', 'clean', 'balanced', 'energizing',
    'satisfying', 'fulfilling', 'vibrant', 'vital', 'wellness', 'fit',
    // Positive outcomes
    'energy', 'strong', 'better', 'improved', 'feel good', 'refreshed',
    'lighter', 'clearer', 'focused', 'productive', 'active', 'alive'
  ],
  negative: [
    // Negative food/health words
    'unhealthy', 'junk', 'processed', 'greasy', 'fatty', 'sugary', 'salty',
    'bad', 'terrible', 'awful', 'disgusting', 'boring', 'bland', 'tasteless',
    'restrictive', 'depriving', 'sacrifice', 'give up', 'miss', 'crave',
    // Negative outcomes
    'tired', 'sluggish', 'bloated', 'heavy', 'guilty', 'regret', 'worse',
    'sick', 'uncomfortable', 'weak', 'lethargic', 'foggy'
  ]
};

const SUBJECTIVE_NORM_KEYWORDS = {
  positive: [
    // Social support
    'family supports', 'friends encourage', 'partner helps', 'mom says',
    'dad thinks', 'spouse agrees', 'everyone', 'people around me',
    'my family', 'my friends', 'together', 'support', 'encourage',
    'approve', 'recommend', 'suggest', 'advise', 'motivate',
    // Social eating
    'cook together', 'eat together', 'share meals', 'family dinner',
    'meal prep together', 'join me', 'with me', 'help me'
  ],
  negative: [
    // Social barriers
    'family eats', 'friends eat', 'everyone eats', 'pressure to eat',
    'tempt', 'offer', 'insist', 'judge', 'criticize', 'mock', 'tease',
    'don\'t understand', 'don\'t support', 'make fun', 'difficult when',
    // Social isolation
    'alone', 'by myself', 'no one', 'nobody', 'isolated', 'different',
    'only one', 'left out', 'awkward', 'embarrassed'
  ]
};

const PERCEIVED_CONTROL_KEYWORDS = {
  positive: [
    // Confidence
    'can', 'able', 'confident', 'easy', 'simple', 'manageable', 'doable',
    'know how', 'capable', 'control', 'handle', 'manage', 'succeed',
    'will', 'going to', 'plan to', 'ready', 'prepared', 'organized',
    // Resources
    'have time', 'affordable', 'available', 'accessible', 'convenient',
    'know where', 'have access', 'can find', 'can get', 'can make'
  ],
  negative: [
    // Lack of confidence
    'can\'t', 'unable', 'difficult', 'hard', 'challenging', 'struggle',
    'don\'t know', 'confused', 'overwhelmed', 'complicated', 'impossible',
    'fail', 'give up', 'quit', 'too much', 'can\'t handle',
    // Lack of resources
    'no time', 'too busy', 'expensive', 'can\'t afford', 'unavailable',
    'no access', 'don\'t have', 'lack', 'limited', 'restricted',
    'too far', 'inconvenient', 'no equipment', 'no skills'
  ]
};

/**
 * TPB construct scores
 */
export interface TPBScores {
  attitude: number;           // 0-100: Positive evaluation of healthy eating
  subjectiveNorm: number;     // 0-100: Perceived social support
  perceivedControl: number;   // 0-100: Perceived ability to change
  confidence: number;         // 0-100: Overall confidence (average of all three)
}

/**
 * Calculate TPB scores from a user message
 * 
 * @param message - User's message text
 * @returns TPB scores for all three constructs
 */
export function calculateTPBScores(message: string): TPBScores {
  const lowerMessage = message.toLowerCase();
  
  const attitude = calculateAttitudeScore(lowerMessage);
  const subjectiveNorm = calculateSubjectiveNormScore(lowerMessage);
  const perceivedControl = calculatePerceivedControlScore(lowerMessage);
  
  // Overall confidence is the average of all three constructs
  const confidence = Math.round((attitude + subjectiveNorm + perceivedControl) / 3);
  
  return {
    attitude,
    subjectiveNorm,
    perceivedControl,
    confidence
  };
}

/**
 * Calculate TPB scores from conversation history
 * Uses exponential smoothing to weight recent messages more heavily
 * 
 * @param messages - Array of user messages from conversation history
 * @param alpha - Smoothing factor (0-1), higher = more weight on recent messages
 * @returns Aggregated TPB scores
 */
export function calculateTPBScoresFromHistory(
  messages: string[],
  alpha: number = 0.3
): TPBScores {
  if (messages.length === 0) {
    return {
      attitude: 50,
      subjectiveNorm: 50,
      perceivedControl: 50,
      confidence: 50
    };
  }
  
  // Calculate scores for each message
  const allScores = messages.map(msg => calculateTPBScores(msg));
  
  // Apply exponential smoothing (most recent message has highest weight)
  let smoothedAttitude = allScores[0].attitude;
  let smoothedSubjectiveNorm = allScores[0].subjectiveNorm;
  let smoothedPerceivedControl = allScores[0].perceivedControl;
  
  for (let i = 1; i < allScores.length; i++) {
    smoothedAttitude = alpha * allScores[i].attitude + (1 - alpha) * smoothedAttitude;
    smoothedSubjectiveNorm = alpha * allScores[i].subjectiveNorm + (1 - alpha) * smoothedSubjectiveNorm;
    smoothedPerceivedControl = alpha * allScores[i].perceivedControl + (1 - alpha) * smoothedPerceivedControl;
  }
  
  const confidence = Math.round((smoothedAttitude + smoothedSubjectiveNorm + smoothedPerceivedControl) / 3);
  
  return {
    attitude: Math.round(smoothedAttitude),
    subjectiveNorm: Math.round(smoothedSubjectiveNorm),
    perceivedControl: Math.round(smoothedPerceivedControl),
    confidence
  };
}

/**
 * Identify the weakest TPB determinant (main barrier)
 * 
 * @param scores - TPB scores
 * @returns Name of the weakest construct
 */
export function identifyWeakestDeterminant(scores: TPBScores): 'attitude' | 'subjectiveNorm' | 'perceivedControl' {
  const constructs = [
    { name: 'attitude' as const, score: scores.attitude },
    { name: 'subjectiveNorm' as const, score: scores.subjectiveNorm },
    { name: 'perceivedControl' as const, score: scores.perceivedControl }
  ];
  
  // Sort by score ascending (lowest first)
  constructs.sort((a, b) => a.score - b.score);
  
  return constructs[0].name;
}

/**
 * Get a human-readable description of a TPB construct
 * 
 * @param construct - TPB construct name
 * @returns User-friendly description
 */
export function getConstructDescription(construct: 'attitude' | 'subjectiveNorm' | 'perceivedControl'): string {
  const descriptions = {
    attitude: 'Your attitude toward healthy eating (how you feel about it)',
    subjectiveNorm: 'Social support and influence (what others think and do)',
    perceivedControl: 'Your confidence and ability to make changes'
  };
  
  return descriptions[construct];
}

/**
 * Get interpretation of a TPB score
 * 
 * @param score - Score value (0-100)
 * @returns Interpretation level
 */
export function interpretScore(score: number): 'low' | 'moderate' | 'high' {
  if (score < 34) return 'low';
  if (score < 67) return 'moderate';
  return 'high';
}

// Internal scoring functions

function calculateAttitudeScore(message: string): number {
  const positiveCount = countKeywordMatches(message, ATTITUDE_KEYWORDS.positive);
  const negativeCount = countKeywordMatches(message, ATTITUDE_KEYWORDS.negative);
  
  return calculateScore(positiveCount, negativeCount);
}

function calculateSubjectiveNormScore(message: string): number {
  const positiveCount = countKeywordMatches(message, SUBJECTIVE_NORM_KEYWORDS.positive);
  const negativeCount = countKeywordMatches(message, SUBJECTIVE_NORM_KEYWORDS.negative);
  
  return calculateScore(positiveCount, negativeCount);
}

function calculatePerceivedControlScore(message: string): number {
  const positiveCount = countKeywordMatches(message, PERCEIVED_CONTROL_KEYWORDS.positive);
  const negativeCount = countKeywordMatches(message, PERCEIVED_CONTROL_KEYWORDS.negative);
  
  return calculateScore(positiveCount, negativeCount);
}

/**
 * Count how many keywords from a list appear in the message
 * Uses word boundary matching to avoid partial matches
 */
function countKeywordMatches(message: string, keywords: string[]): number {
  let count = 0;
  
  for (const keyword of keywords) {
    // Use word boundaries for single words, substring match for phrases
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
 * Calculate score from positive and negative keyword counts
 * 
 * Formula:
 * - Base score: 50 (neutral)
 * - Each positive keyword: +10 points (max +50)
 * - Each negative keyword: -10 points (max -50)
 * - Clamped to 0-100 range
 */
function calculateScore(positiveCount: number, negativeCount: number): number {
  const baseScore = 50;
  const pointsPerKeyword = 10;
  const maxKeywords = 5; // Cap influence at 5 keywords
  
  const positivePoints = Math.min(positiveCount, maxKeywords) * pointsPerKeyword;
  const negativePoints = Math.min(negativeCount, maxKeywords) * pointsPerKeyword;
  
  const score = baseScore + positivePoints - negativePoints;
  
  // Clamp to 0-100 range
  return Math.max(0, Math.min(100, score));
}
