# Recipe Search and Filter Utilities

This module provides utility functions for searching and filtering recipes based on various constraints. These functions are designed to be used by the chatbot service to recommend recipes that match user requirements.

## Overview

The recipe filter utilities support the following operations:
- **Text search**: Search recipes by name, description, ingredients, or tags
- **Constraint filtering**: Filter by time, budget, difficulty, and equipment requirements
- **Dietary restrictions**: Filter by vegetarian, vegan, gluten-free, and other dietary needs
- **Calorie matching**: Find recipes that match target caloric goals
- **Combined filtering**: Apply multiple filters simultaneously

## Installation

```typescript
import {
  searchRecipes,
  filterByConstraints,
  filterByDietaryRestrictions,
  calculateCalories,
  filterRecipes
} from './utils/recipeFilters';
```

## Functions

### `searchRecipes(recipes, query)`

Search recipes by text query across name, description, ingredients, and tags.

**Parameters:**
- `recipes: Recipe[]` - Array of recipes to search
- `query: string` - Search query string

**Returns:** `Recipe[]` - Filtered array of matching recipes

**Example:**
```typescript
const results = searchRecipes(recipes, 'chicken');
// Returns all recipes containing "chicken" in name, description, ingredients, or tags
```

### `filterByConstraints(recipes, constraints)`

Filter recipes by user constraints such as time, budget, difficulty, and equipment.

**Parameters:**
- `recipes: Recipe[]` - Array of recipes to filter
- `constraints: RecipeConstraints` - Constraint object with optional filters:
  - `maxPrepTime?: number` - Maximum preparation time in minutes
  - `maxCookTime?: number` - Maximum cooking time in minutes
  - `maxTotalTime?: number` - Maximum total time (prep + cook) in minutes
  - `budget?: 'low' | 'medium' | 'high'` - Budget level
  - `difficulty?: 'easy' | 'medium' | 'hard'` - Difficulty level
  - `equipment?: 'basic' | 'intermediate' | 'advanced'` - Required equipment level
  - `timeCategory?: 'quick' | 'medium' | 'long'` - Time category

**Returns:** `Recipe[]` - Filtered array of recipes matching all constraints

**Example:**
```typescript
const quickMeals = filterByConstraints(recipes, {
  maxTotalTime: 30,
  difficulty: 'easy',
  budget: 'low'
});
// Returns recipes that take ≤30 minutes, are easy, and budget-friendly
```

### `filterByDietaryRestrictions(recipes, restrictions)`

Filter recipes by dietary restrictions.

**Parameters:**
- `recipes: Recipe[]` - Array of recipes to filter
- `restrictions: DietaryRestriction[]` - Array of dietary restrictions:
  - `'vegetarian'` - No meat or fish
  - `'vegan'` - No animal products
  - `'gluten-free'` - No gluten
  - `'dairy-free'` - No dairy products
  - `'low-carb'` - Less than 30g carbs
  - `'high-protein'` - At least 25g protein or tagged as high-protein
  - `'low-fat'` - 10g or less fat or tagged as low-fat

**Returns:** `Recipe[]` - Filtered array of recipes matching all restrictions

**Example:**
```typescript
const veganRecipes = filterByDietaryRestrictions(recipes, ['vegan', 'high-protein']);
// Returns recipes that are both vegan and high in protein
```

### `calculateCalories(recipes, targetCalories, tolerance?)`

Find recipes that match a target calorie range.

**Parameters:**
- `recipes: Recipe[]` - Array of recipes to filter
- `targetCalories: number` - Target calorie count
- `tolerance?: number` - Acceptable deviation from target (default: 0.15 = 15%)

**Returns:** `Recipe[]` - Filtered and sorted array of recipes within the calorie range

**Example:**
```typescript
const calorieMatch = calculateCalories(recipes, 400, 0.10);
// Returns recipes with 360-440 calories (400 ± 10%), sorted by proximity to 400
```

### `filterRecipes(recipes, options)`

Combined filter function that applies all filters in sequence.

**Parameters:**
- `recipes: Recipe[]` - Array of recipes to filter
- `options: object` - Filter options:
  - `query?: string` - Text search query
  - `constraints?: RecipeConstraints` - Constraint filters
  - `restrictions?: DietaryRestriction[]` - Dietary restrictions
  - `targetCalories?: number` - Target calorie count
  - `calorieTolerance?: number` - Calorie tolerance (default: 0.15)

**Returns:** `Recipe[]` - Filtered and sorted array of recipes

**Example:**
```typescript
const results = filterRecipes(recipes, {
  query: 'lunch',
  constraints: {
    maxTotalTime: 30,
    difficulty: 'easy'
  },
  restrictions: ['vegetarian'],
  targetCalories: 300,
  calorieTolerance: 0.20
});
// Returns vegetarian lunch recipes that are quick, easy, and around 300 calories
```

## Usage Examples

### Example 1: Quick Breakfast Recipes

```typescript
const quickBreakfast = filterRecipes(recipes, {
  constraints: {
    maxTotalTime: 20,
    difficulty: 'easy'
  }
}).filter(r => r.mealType === 'breakfast');
```

### Example 2: Budget-Friendly Meal Plan

```typescript
const budgetMeals = filterByConstraints(recipes, {
  budget: 'low',
  equipment: 'basic'
});
```

### Example 3: High-Protein, Low-Carb Dinner

```typescript
const proteinDinner = filterRecipes(recipes, {
  restrictions: ['high-protein', 'low-carb'],
  constraints: {
    difficulty: 'easy'
  }
}).filter(r => r.mealType === 'any' || r.mealType === 'dinner');
```

### Example 4: Vegan Recipe Search

```typescript
const veganOptions = filterRecipes(recipes, {
  query: 'tofu',
  restrictions: ['vegan'],
  targetCalories: 350
});
```

### Example 5: Chatbot Integration

```typescript
// User: "I want a quick vegetarian lunch under 400 calories"
const chatbotRecommendations = filterRecipes(recipes, {
  query: 'lunch',
  constraints: {
    maxTotalTime: 30,
    difficulty: 'easy'
  },
  restrictions: ['vegetarian'],
  targetCalories: 400,
  calorieTolerance: 0.15
});

// Return top 3 recommendations
const topRecommendations = chatbotRecommendations.slice(0, 3);
```

## Recipe Interface

```typescript
interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number; // minutes
  cookTime: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard';
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  tags: string[];
  timeCategory: 'quick' | 'medium' | 'long';
  budget: 'low' | 'medium' | 'high';
  equipment: 'basic' | 'intermediate' | 'advanced';
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'any';
}
```

## Testing

The module includes comprehensive unit tests covering all functions and edge cases.

Run tests:
```bash
npm test
```

## Requirements Validation

These utilities validate the following requirements:
- **Requirement 6.4**: Filter recipes by user constraints (preparation time, cooking difficulty, required equipment, budget)
- **Requirement 6.5**: Provide recipe details including ingredients, preparation steps, cooking time, and nutrition information

## Notes

- All text searches are case-insensitive
- Multiple filters are applied in sequence (AND logic)
- Calorie filtering sorts results by proximity to target
- Empty or undefined filter values are ignored
- The functions are pure and do not modify the input arrays
