# Meal Plan Service

## Overview

The Meal Plan Service generates personalized meal plans based on user constraints and caloric targets. It uses the hardcoded Filipino recipe database and applies intelligent filtering to select appropriate recipes for each meal type.

## Features

- **Caloric Distribution**: Automatically distributes daily calories across meal types:
  - Breakfast: 25%
  - Lunch: 35%
  - Dinner: 35%
  - Snack: 5%

- **Constraint-Based Filtering**: Respects user constraints including:
  - Time constraints (prep time, cook time)
  - Budget level (low, medium, high)
  - Difficulty level (easy, medium, hard)
  - Equipment requirements (basic, intermediate, advanced)
  - Dietary restrictions (vegetarian, vegan, gluten-free, etc.)

- **Calorie Matching**: Selects recipes within 10% of target calories for each meal type

- **Recipe Variety**: Avoids duplicate recipes within the same meal plan

- **Multi-Day Plans**: Supports meal plans for multiple days

## Usage

### Basic Example

```typescript
import { generateMealPlan, MealPlanConstraints } from './services/mealPlanService';

const constraints: MealPlanConstraints = {
  targetCalories: 2000,
  difficulty: 'easy',
  budget: 'low'
};

const mealPlan = generateMealPlan(constraints, 1);

console.log(`Generated ${mealPlan.items.length} meals`);
mealPlan.items.forEach(item => {
  console.log(`${item.mealType}: ${item.recipe.name} (${item.recipe.calories} cal)`);
});
```

### With Dietary Restrictions

```typescript
const constraints: MealPlanConstraints = {
  targetCalories: 1800,
  dietaryRestrictions: ['vegetarian', 'low-fat'],
  difficulty: 'easy'
};

const mealPlan = generateMealPlan(constraints, 3);
```

### With Time Constraints

```typescript
const constraints: MealPlanConstraints = {
  targetCalories: 2200,
  maxPrepTime: 15,
  maxCookTime: 30,
  difficulty: 'easy'
};

const mealPlan = generateMealPlan(constraints, 1);
```

## API Reference

### Types

#### `MealPlanConstraints`

```typescript
interface MealPlanConstraints {
  targetCalories: number;
  dietaryRestrictions?: DietaryRestriction[];
  maxPrepTime?: number;
  maxCookTime?: number;
  budget?: 'low' | 'medium' | 'high';
  difficulty?: 'easy' | 'medium' | 'hard';
  equipment?: 'basic' | 'intermediate' | 'advanced';
}
```

#### `MealPlanItem`

```typescript
interface MealPlanItem {
  day: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: Recipe;
  targetCalories: number;
}
```

#### `MealPlan`

```typescript
interface MealPlan {
  durationDays: number;
  totalDailyCalories: number;
  items: MealPlanItem[];
}
```

### Functions

#### `generateMealPlan(constraints, durationDays)`

Generates a meal plan based on user constraints.

**Parameters:**
- `constraints: MealPlanConstraints` - User constraints including target calories and dietary restrictions
- `durationDays: number` - Number of days for the meal plan (default: 1)

**Returns:** `MealPlan` - Generated meal plan with recipes for each day

**Example:**
```typescript
const mealPlan = generateMealPlan({ targetCalories: 2000 }, 3);
```

#### `calculateMealPlanCalories(mealPlan)`

Calculates total calories for a meal plan.

**Parameters:**
- `mealPlan: MealPlan` - The meal plan to calculate

**Returns:** `number` - Total calories across all meals

**Example:**
```typescript
const totalCalories = calculateMealPlanCalories(mealPlan);
console.log(`Total: ${totalCalories} calories`);
```

#### `calculateMealPlanMacros(mealPlan)`

Calculates macronutrient totals for a meal plan.

**Parameters:**
- `mealPlan: MealPlan` - The meal plan to calculate

**Returns:** `{ protein: number; carbs: number; fat: number }` - Total macronutrients

**Example:**
```typescript
const macros = calculateMealPlanMacros(mealPlan);
console.log(`Protein: ${macros.protein}g, Carbs: ${macros.carbs}g, Fat: ${macros.fat}g`);
```

#### `getMealPlanDay(mealPlan, day)`

Gets meal plan items for a specific day.

**Parameters:**
- `mealPlan: MealPlan` - The meal plan
- `day: number` - Day number (1-indexed)

**Returns:** `MealPlanItem[]` - Array of meal items for that day

**Example:**
```typescript
const day2Meals = getMealPlanDay(mealPlan, 2);
day2Meals.forEach(item => {
  console.log(`${item.mealType}: ${item.recipe.name}`);
});
```

## Algorithm

### Meal Selection Process

1. **Calculate Target Calories**: Distribute daily calories across meal types using predefined percentages
2. **Filter by Meal Type**: Select recipes appropriate for each meal type (breakfast, lunch, dinner, snack)
3. **Apply Constraints**: Filter recipes by user constraints (time, budget, difficulty, equipment)
4. **Apply Dietary Restrictions**: Filter recipes by dietary restrictions (vegetarian, vegan, etc.)
5. **Match Calories**: Select recipes within 10% of target calories for each meal
6. **Avoid Duplicates**: Ensure no recipe is used twice in the same meal plan
7. **Fallback**: If no recipes match all constraints, relax calorie constraint and try again

### Caloric Distribution

The service uses standard nutritional guidelines for meal distribution:

| Meal Type | Percentage | Example (2000 cal) |
|-----------|------------|-------------------|
| Breakfast | 25%        | 500 cal           |
| Lunch     | 35%        | 700 cal           |
| Dinner    | 35%        | 700 cal           |
| Snack     | 5%         | 100 cal           |

### Calorie Tolerance

Recipes are selected within **10% tolerance** of target calories:
- For a 500 cal target: 450-550 cal range
- For a 700 cal target: 630-770 cal range

If no recipes match within tolerance, the constraint is relaxed to find the closest match.

## Testing

The service includes comprehensive unit tests covering:

- Basic meal plan generation
- Multi-day meal plans
- Dietary restrictions
- Budget constraints
- Difficulty constraints
- Time constraints
- Recipe uniqueness
- Caloric distribution
- Macronutrient calculations
- Edge cases (zero days, extreme calorie targets, strict constraints)

Run tests:
```bash
npm test -- mealPlanService.test.ts --run
```

## Examples

See `mealPlanService.example.ts` for detailed usage examples including:

1. Simple 1-day meal plan
2. 3-day vegetarian meal plan
3. Quick meal plan with time constraints
4. Meal plan statistics calculation
5. High-protein meal plan
6. Budget-conscious meal plan
7. Detailed meal plan with recipe information
8. Caloric distribution verification

Run examples:
```bash
npx tsx src/services/mealPlanService.example.ts
```

## Integration with Chatbot

The meal plan service is designed to integrate with the chatbot service:

```typescript
import { generateMealPlan } from './services/mealPlanService';
import { inferTPBScores } from './services/tpbInference';
import { classifyTTMStage } from './services/ttmInference';

// In chatbot service
const tpbScores = inferTPBScores(conversationHistory);
const ttmStage = classifyTTMStage(conversationHistory);

// Generate meal plan based on user constraints
const mealPlan = generateMealPlan({
  targetCalories: userProfile.targetCalories || 2000,
  dietaryRestrictions: userProfile.dietaryRestrictions,
  difficulty: ttmStage === 'pre-contemplation' ? 'easy' : 'medium',
  budget: 'low'
}, 3);

// Include meal plan in bot response
const response = `Based on your goals, here's a 3-day meal plan...`;
```

## Limitations

- **Session-Only**: This is a demo implementation with no persistence
- **Hardcoded Database**: Uses a fixed set of ~50 Filipino recipes
- **Simple Matching**: Uses basic filtering without advanced optimization
- **No Nutritional Analysis**: Does not validate nutritional balance beyond calories and macros
- **No Portion Scaling**: Recipes are used as-is without portion adjustments
- **No User Preferences**: Does not learn from user feedback or preferences

## Future Enhancements

Potential improvements for a production version:

1. **Recipe Database**: Integrate with external recipe APIs or larger databases
2. **Portion Scaling**: Adjust recipe portions to match exact calorie targets
3. **Nutritional Balance**: Ensure adequate micronutrients (vitamins, minerals)
4. **User Preferences**: Learn from user feedback and preferences
5. **Meal Swapping**: Allow users to swap individual meals
6. **Shopping Lists**: Generate shopping lists from meal plans
7. **Cost Estimation**: Calculate estimated cost for meal plans
8. **Seasonal Ingredients**: Prioritize seasonal and locally available ingredients
9. **Meal Prep Optimization**: Group recipes with similar ingredients
10. **Advanced Optimization**: Use constraint satisfaction or optimization algorithms

## Related Files

- `src/data/recipes.ts` - Recipe database
- `src/utils/recipeFilters.ts` - Recipe filtering utilities
- `src/services/chatbotService.ts` - Chatbot integration
- `src/services/tpbInference.ts` - TPB scoring
- `src/services/ttmInference.ts` - TTM stage classification
