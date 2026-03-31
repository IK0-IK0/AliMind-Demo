/**
 * Chatbot Service - Computational Pipeline
 * 
 * This service implements the core pipeline for personalized nutrition coaching:
 * 1. Extract dietary context from user message
 * 2. Calculate TPB scores using tpbInference module
 * 3. Classify TTM stage using ttmInference module
 * 4. Select intervention mode based on TTM stage
 * 5. Choose BCT based on weakest TPB determinant
 * 6. Generate response text combining all analyses
 * 
 * The service integrates TPB (Theory of Planned Behavior) and TTM (Transtheoretical Model)
 * to provide stage-matched, barrier-targeted interventions.
 */

import { calculateTPBScores, identifyWeakestDeterminant, TPBScores } from './tpbInference';
import { classifyTTMStage, getInterventionMode, TTMStage } from './ttmInference';
import { recipes, Recipe } from '../data/recipes';
import { filterRecipes, RecipeConstraints, DietaryRestriction } from '../utils/recipeFilters';

/**
 * Dietary context extracted from user message
 */
export interface DietaryContext {
  keywords: string[];
  constraints: RecipeConstraints;
  dietaryRestrictions: DietaryRestriction[];
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'any';
}

/**
 * Behavior Change Technique (BCT) selection
 */
export interface BCTSelection {
  bctId: string;
  bctName: string;
  description: string;
  targetDeterminant: 'attitude' | 'subjectiveNorm' | 'perceivedControl';
}

/**
 * Complete chatbot response with all pipeline outputs
 */
export interface ChatbotResponse {
  message: string;
  tpbScores: TPBScores;
  ttmStage: TTMStage;
  interventionMode: string;
  bct: BCTSelection;
  recommendedRecipes: Recipe[];
  disclaimer: string;
}

/**
 * STEP 1: Extract dietary context from user message
 * Identifies keywords, patterns, constraints, and dietary restrictions
 */
export function extractDietaryContext(message: string): DietaryContext {
  const lowerMessage = message.toLowerCase();
  const keywords: string[] = [];
  const constraints: RecipeConstraints = {};
  const dietaryRestrictions: DietaryRestriction[] = [];
  let mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'any' | undefined;

  // Extract time constraints
  if (lowerMessage.match(/\b(quick|fast|hurry|rush|no time|busy)\b/)) {
    constraints.timeCategory = 'quick';
    keywords.push('time-constrained');
  }
  if (lowerMessage.match(/\b(30 minutes?|half hour|quick meal)\b/)) {
    constraints.maxTotalTime = 30;
  }

  // Extract budget constraints
  if (lowerMessage.match(/\b(cheap|budget|affordable|inexpensive|low cost)\b/)) {
    constraints.budget = 'low';
    keywords.push('budget-conscious');
  }

  // Extract difficulty preferences
  if (lowerMessage.match(/\b(easy|simple|beginner|basic)\b/)) {
    constraints.difficulty = 'easy';
    keywords.push('beginner-friendly');
  }

  // Extract equipment constraints
  if (lowerMessage.match(/\b(basic|no equipment|simple tools)\b/)) {
    constraints.equipment = 'basic';
    keywords.push('minimal-equipment');
  }

  // Extract dietary restrictions
  if (lowerMessage.match(/\b(vegetarian|no meat|plant-based)\b/)) {
    dietaryRestrictions.push('vegetarian');
    keywords.push('vegetarian');
  }
  if (lowerMessage.match(/\b(vegan|no animal)\b/)) {
    dietaryRestrictions.push('vegan');
    keywords.push('vegan');
  }
  if (lowerMessage.match(/\b(high protein|protein|muscle|gym)\b/)) {
    dietaryRestrictions.push('high-protein');
    keywords.push('high-protein');
  }
  if (lowerMessage.match(/\b(low carb|keto|carbs)\b/)) {
    dietaryRestrictions.push('low-carb');
    keywords.push('low-carb');
  }
  if (lowerMessage.match(/\b(low fat|lean|diet)\b/)) {
    dietaryRestrictions.push('low-fat');
    keywords.push('low-fat');
  }

  // Extract meal type
  if (lowerMessage.match(/\b(breakfast|morning|brunch)\b/)) {
    mealType = 'breakfast';
  } else if (lowerMessage.match(/\b(lunch|midday|noon)\b/)) {
    mealType = 'lunch';
  } else if (lowerMessage.match(/\b(dinner|evening|supper)\b/)) {
    mealType = 'dinner';
  } else if (lowerMessage.match(/\b(snack|merienda)\b/)) {
    mealType = 'snack';
  }

  return {
    keywords,
    constraints,
    dietaryRestrictions,
    mealType
  };
}

/**
 * STEP 5: Choose BCT based on weakest TPB determinant and TTM stage
 * Maps (stage, determinant) pairs to specific Behavior Change Techniques
 */
export function selectBCT(
  weakestDeterminant: 'attitude' | 'subjectiveNorm' | 'perceivedControl',
  ttmStage: TTMStage['stage']
): BCTSelection {
  // BCT mapping based on TTM stage and TPB determinant
  const bctMap: Record<string, Record<string, BCTSelection>> = {
    preContemplation: {
      attitude: {
        bctId: '5.1',
        bctName: 'Information about health consequences',
        description: 'Provide information about the benefits of healthy eating for health and wellbeing',
        targetDeterminant: 'attitude'
      },
      subjectiveNorm: {
        bctId: '6.2',
        bctName: 'Social comparison',
        description: 'Share information about what others in similar situations are doing',
        targetDeterminant: 'subjectiveNorm'
      },
      perceivedControl: {
        bctId: '15.1',
        bctName: 'Verbal persuasion about capability',
        description: 'Provide encouragement that healthy eating is achievable',
        targetDeterminant: 'perceivedControl'
      }
    },
    contemplation: {
      attitude: {
        bctId: '9.2',
        bctName: 'Pros and cons',
        description: 'Explore advantages and disadvantages of healthy eating',
        targetDeterminant: 'attitude'
      },
      subjectiveNorm: {
        bctId: '3.1',
        bctName: 'Social support (unspecified)',
        description: 'Discuss ways to get support from family and friends',
        targetDeterminant: 'subjectiveNorm'
      },
      perceivedControl: {
        bctId: '13.2',
        bctName: 'Framing/reframing',
        description: 'Reframe barriers as manageable challenges',
        targetDeterminant: 'perceivedControl'
      }
    },
    preparation: {
      attitude: {
        bctId: '5.3',
        bctName: 'Information about social and environmental consequences',
        description: 'Highlight positive impacts of healthy eating beyond personal health',
        targetDeterminant: 'attitude'
      },
      subjectiveNorm: {
        bctId: '3.2',
        bctName: 'Social support (practical)',
        description: 'Suggest specific ways to involve others in meal planning',
        targetDeterminant: 'subjectiveNorm'
      },
      perceivedControl: {
        bctId: '1.4',
        bctName: 'Action planning',
        description: 'Help create specific plans for when, where, and how to eat healthy',
        targetDeterminant: 'perceivedControl'
      }
    },
    action: {
      attitude: {
        bctId: '10.4',
        bctName: 'Social reward',
        description: 'Encourage sharing successes with supportive others',
        targetDeterminant: 'attitude'
      },
      subjectiveNorm: {
        bctId: '3.3',
        bctName: 'Social support (emotional)',
        description: 'Acknowledge challenges and provide encouragement',
        targetDeterminant: 'subjectiveNorm'
      },
      perceivedControl: {
        bctId: '4.1',
        bctName: 'Instruction on how to perform the behavior',
        description: 'Provide clear, step-by-step guidance for healthy meal preparation',
        targetDeterminant: 'perceivedControl'
      }
    },
    maintenance: {
      attitude: {
        bctId: '10.9',
        bctName: 'Self-reward',
        description: 'Encourage celebrating sustained healthy eating habits',
        targetDeterminant: 'attitude'
      },
      subjectiveNorm: {
        bctId: '6.3',
        bctName: 'Information about others\' approval',
        description: 'Reinforce positive feedback from social network',
        targetDeterminant: 'subjectiveNorm'
      },
      perceivedControl: {
        bctId: '1.2',
        bctName: 'Problem solving',
        description: 'Develop strategies for maintaining habits during challenges',
        targetDeterminant: 'perceivedControl'
      }
    }
  };

  return bctMap[ttmStage][weakestDeterminant];
}

/**
 * STEP 6: Filter recipes by user constraints and recommend top 3
 */
export function recommendRecipes(
  context: DietaryContext,
  count: number = 3
): Recipe[] {
  // Filter recipes based on dietary context
  let filtered = filterRecipes(recipes, {
    constraints: context.constraints,
    restrictions: context.dietaryRestrictions
  });

  // Further filter by meal type if specified
  if (context.mealType && context.mealType !== 'any') {
    filtered = filtered.filter(recipe => 
      recipe.mealType === context.mealType || recipe.mealType === 'any'
    );
  }

  // If no recipes match, return easy, quick recipes as fallback
  if (filtered.length === 0) {
    filtered = recipes.filter(recipe => 
      recipe.difficulty === 'easy' && recipe.timeCategory === 'quick'
    );
  }

  // Return top N recipes
  return filtered.slice(0, count);
}

/**
 * STEP 6: Generate response text combining all analyses
 * Uses stage-appropriate templates and BCT-specific language
 */
export function generateResponse(
  ttmStage: TTMStage,
  bct: BCTSelection
): string {
  // Stage-specific response templates
  const templates: Record<string, (bct: BCTSelection) => string> = {
    preContemplation: (bct) => {
      return `I hear you. It sounds like you're not quite ready to make changes right now, and that's completely okay. ${getBCTMessage(bct)}\n\nWhat are your thoughts on healthy eating?`;
    },
    contemplation: (bct) => {
      return `It sounds like you're thinking about making some changes to your eating habits. ${getBCTMessage(bct)}\n\nWhat aspects of healthy eating are you most curious about?`;
    },
    preparation: (bct) => {
      return `Great! It sounds like you're getting ready to take action. ${getBCTMessage(bct)}\n\nWhat would be most helpful for you right now?`;
    },
    action: (bct) => {
      return `Excellent! You're actively working on your eating habits. ${getBCTMessage(bct)}\n\nWhat's been working well for you so far?`;
    },
    maintenance: (bct) => {
      return `Wonderful! You've been maintaining healthy eating habits. ${getBCTMessage(bct)}\n\nHow are you keeping yourself motivated?`;
    }
  };

  const template = templates[ttmStage.stage];
  return template(bct);
}

/**
 * Helper: Get BCT-specific message
 */
function getBCTMessage(bct: BCTSelection): string {
  const messages: Record<string, string> = {
    '5.1': 'Did you know that eating more vegetables and whole foods can boost your energy and improve your mood?',
    '6.2': 'Many people in your situation have found that small changes make a big difference.',
    '15.1': 'You have what it takes to make healthy choices - it\'s more achievable than you might think.',
    '9.2': 'Let\'s think about what you might gain from eating healthier, and what concerns you might have.',
    '3.1': 'Having support from family or friends can make healthy eating much easier.',
    '13.2': 'Those challenges you mentioned? They\'re actually quite manageable with the right approach.',
    '5.3': 'Healthy eating isn\'t just good for you - it can inspire those around you too.',
    '3.2': 'Maybe you could involve family members in meal planning or cooking together?',
    '1.4': 'Let\'s make a specific plan for your next healthy meal - when, where, and what you\'ll eat.',
    '10.4': 'Share your progress with someone who supports you - they\'ll be proud of what you\'re doing!',
    '3.3': 'I know it can be challenging, but you\'re making real progress. Keep going!',
    '4.1': 'Let me walk you through exactly how to prepare these dishes - step by step.',
    '10.9': 'You\'ve earned it - celebrate how far you\'ve come with your healthy eating!',
    '6.3': 'People around you have noticed your positive changes - that\'s something to be proud of.',
    '1.2': 'Let\'s think about how to handle situations that might challenge your healthy habits.'
  };

  return messages[bct.bctId] || bct.description;
}



/**
 * Main chatbot service function - executes the complete pipeline
 */
export function processChatMessage(message: string): ChatbotResponse {
  // STEP 1: Calculate TPB scores
  const tpbScores = calculateTPBScores(message);

  // STEP 2: Classify TTM stage
  const ttmStage = classifyTTMStage(message);

  // STEP 3: Select intervention mode
  const interventionMode = getInterventionMode(ttmStage.stage);

  // STEP 4: Choose BCT based on weakest determinant
  const weakestDeterminant = identifyWeakestDeterminant(tpbScores);
  const bct = selectBCT(weakestDeterminant, ttmStage.stage);

  // STEP 5: Generate response text
  const responseMessage = generateResponse(ttmStage, bct);

  // Add disclaimer
  const disclaimer = 'Note: This advice is for informational purposes only and is not medical guidance. Please consult with a healthcare professional or registered dietitian for personalized medical advice.';

  return {
    message: responseMessage,
    tpbScores,
    ttmStage,
    interventionMode,
    bct,
    recommendedRecipes: [], // No recipes
    disclaimer
  };
}
