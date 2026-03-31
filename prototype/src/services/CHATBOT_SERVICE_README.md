# Chatbot Service - Seven-Step Computational Pipeline

## Overview

The chatbot service implements the core seven-step computational pipeline for personalized nutrition coaching based on the Theory of Planned Behavior (TPB) and Transtheoretical Model (TTM).

## Seven-Step Pipeline

### Step 1: Extract Dietary Context
**Function:** `extractDietaryContext(message: string)`

Analyzes user messages to identify:
- **Keywords**: Dietary-related terms and patterns
- **Constraints**: Time, budget, difficulty, equipment requirements
- **Dietary Restrictions**: Vegetarian, vegan, high-protein, low-carb, low-fat
- **Meal Type**: Breakfast, lunch, dinner, snack

**Example:**
```typescript
const context = extractDietaryContext('I need a quick, cheap vegetarian dinner');
// Returns:
// {
//   keywords: ['time-constrained', 'budget-conscious', 'vegetarian'],
//   constraints: { timeCategory: 'quick', budget: 'low' },
//   dietaryRestrictions: ['vegetarian'],
//   mealType: 'dinner'
// }
```

### Step 2: Calculate TPB Scores
**Function:** `calculateTPBScores(message: string)` (from tpbInference module)

Computes continuous scores (0-100) for three TPB constructs:
- **Attitude**: Positive/negative evaluations of healthy eating
- **Subjective Norm**: Perceived social pressure and support
- **Perceived Behavioral Control**: Perceived ease/difficulty and confidence

**Example:**
```typescript
const tpbScores = calculateTPBScores('I love healthy food and my family supports me');
// Returns:
// {
//   attitude: 70,
//   subjectiveNorm: 60,
//   perceivedControl: 50,
//   confidence: 60
// }
```

### Step 3: Classify TTM Stage
**Function:** `classifyTTMStage(message: string)` (from ttmInference module)

Classifies user readiness into one of five TTM stages:
- **Pre-contemplation**: Not considering change
- **Contemplation**: Thinking about change
- **Preparation**: Planning to change soon
- **Action**: Actively making changes
- **Maintenance**: Sustaining change over time

**Example:**
```typescript
const ttmStage = classifyTTMStage('I am planning to start eating healthier next week');
// Returns:
// {
//   stage: 'preparation',
//   confidence: 80,
//   description: 'Getting ready to take action'
// }
```

### Step 4: Select Intervention Mode
**Function:** `getInterventionMode(stage)` (from ttmInference module)

Maps TTM stages to appropriate intervention approaches:
- **Pre-contemplation** → Awareness
- **Contemplation** → Ambivalence-resolution
- **Preparation** → Planning
- **Action** → Coping
- **Maintenance** → Relapse-prevention

### Step 5: Choose BCT
**Function:** `selectBCT(weakestDeterminant, ttmStage)`

Selects a specific Behavior Change Technique (BCT) based on:
1. The weakest TPB determinant (identified by `identifyWeakestDeterminant()`)
2. The current TTM stage

**BCT Mapping Matrix:**

| TTM Stage | Weak Attitude | Weak Subjective Norm | Weak PBC |
|-----------|---------------|----------------------|----------|
| Pre-contemplation | 5.1: Information about health consequences | 6.2: Social comparison | 15.1: Verbal persuasion about capability |
| Contemplation | 9.2: Pros and cons | 3.1: Social support (unspecified) | 13.2: Framing/reframing |
| Preparation | 5.3: Information about social consequences | 3.2: Social support (practical) | 1.4: Action planning |
| Action | 10.4: Social reward | 3.3: Social support (emotional) | 4.1: Instruction on how to perform |
| Maintenance | 10.9: Self-reward | 6.3: Information about others' approval | 1.2: Problem solving |

**Example:**
```typescript
const weakest = identifyWeakestDeterminant(tpbScores); // 'perceivedControl'
const bct = selectBCT(weakest, 'action');
// Returns:
// {
//   bctId: '4.1',
//   bctName: 'Instruction on how to perform the behavior',
//   description: 'Provide clear, step-by-step guidance',
//   targetDeterminant: 'perceivedControl'
// }
```

### Step 6: Filter Recipes and Recommend Top 3
**Function:** `recommendRecipes(context, count)`

Filters the recipe database based on:
1. User constraints (time, budget, difficulty, equipment)
2. Dietary restrictions
3. Meal type preferences

Returns top N recipes (default: 3) that match the criteria.

**Fallback Strategy:** If no recipes match all criteria, returns easy, quick recipes as fallback.

**Example:**
```typescript
const recipes = recommendRecipes(context, 3);
// Returns array of 3 Recipe objects matching constraints
```

### Step 7: Generate Response Text
**Function:** `generateResponse(message, tpbScores, ttmStage, interventionMode, bct, recipes)`

Synthesizes all pipeline outputs into a coherent, natural language response using:
- **Stage-appropriate templates**: Different response styles for each TTM stage
- **BCT-specific language**: Incorporates the selected BCT into the message
- **Recipe recommendations**: Formats recipe details in user-friendly format

**Response Structure:**
1. Stage-appropriate opening (acknowledges user's current readiness)
2. BCT-specific message (targets the weakest determinant)
3. Recipe recommendations (formatted with name, time, calories, difficulty, budget)
4. Stage-appropriate closing (encourages next steps)

## Main Service Function

### `processChatMessage(message: string): ChatbotResponse`

Executes the complete seven-step pipeline and returns a comprehensive response.

**Usage:**
```typescript
import { processChatMessage } from './chatbotService';

const response = processChatMessage('I want to eat healthier but I don\'t have much time');

console.log(response.message);           // Generated response text
console.log(response.tpbScores);         // TPB construct scores
console.log(response.ttmStage);          // TTM stage classification
console.log(response.interventionMode);  // Selected intervention mode
console.log(response.bct);               // Selected BCT
console.log(response.recommendedRecipes); // Top 3 recipes
console.log(response.disclaimer);        // Medical disclaimer
```

**Response Object:**
```typescript
interface ChatbotResponse {
  message: string;              // Generated response text
  tpbScores: TPBScores;         // TPB construct scores
  ttmStage: TTMStage;           // TTM stage classification
  interventionMode: string;     // Intervention mode name
  bct: BCTSelection;            // Selected BCT details
  recommendedRecipes: Recipe[]; // Top 3 matching recipes
  disclaimer: string;           // Medical disclaimer
}
```

## Integration with Other Modules

### TPB Inference Module (`tpbInference.ts`)
- `calculateTPBScores()`: Computes TPB construct scores
- `identifyWeakestDeterminant()`: Identifies the lowest-scoring TPB construct

### TTM Inference Module (`ttmInference.ts`)
- `classifyTTMStage()`: Classifies TTM stage from message
- `getInterventionMode()`: Maps stage to intervention mode

### Recipe Filters (`recipeFilters.ts`)
- `filterRecipes()`: Filters recipes by constraints and restrictions

### Recipe Database (`recipes.ts`)
- `recipes`: Array of Filipino recipe objects

## Testing

The service includes comprehensive unit tests covering:
- Dietary context extraction
- BCT selection logic
- Recipe recommendation filtering
- Response generation for all stages
- Complete pipeline integration

**Run tests:**
```bash
npm test -- chatbotService.test.ts
```

**Run examples:**
```bash
npx tsx src/services/chatbotService.example.ts
```

## Disclaimer

All responses include a medical disclaimer:

> "Note: This advice is for informational purposes only and is not medical guidance. Please consult with a healthcare professional or registered dietitian for personalized medical advice."

## Future Enhancements

1. **Conversation History**: Support for multi-turn conversations with context tracking
2. **Personalization**: User profile integration for more tailored recommendations
3. **Confidence Thresholds**: Trigger clarification questions when inference certainty is low
4. **Longitudinal Tracking**: Monitor TPB/TTM changes over time
5. **Advanced NLP**: Integration with AI language models for more sophisticated understanding
6. **Recipe Scoring**: Rank recipes by relevance to user's specific situation
7. **Dynamic BCT Selection**: Adjust BCT based on conversation flow and user responses

## References

- Michie, S., et al. (2013). The behavior change technique taxonomy (v1) of 93 hierarchically clustered techniques: Building an international consensus for the reporting of behavior change interventions. *Annals of Behavioral Medicine*, 46(1), 81-95.
- Prochaska, J. O., & DiClemente, C. C. (1997). The transtheoretical approach: Crossing traditional boundaries of therapy. *Krieger Publishing Company*.
- Ajzen, I. (1991). The theory of planned behavior. *Organizational Behavior and Human Decision Processes*, 50(2), 179-211.
