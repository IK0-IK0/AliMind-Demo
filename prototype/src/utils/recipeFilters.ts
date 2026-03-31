// Recipe Search and Filter Utility Functions
// These functions support the chatbot service in recommending recipes based on user constraints

import { Recipe } from '../data/recipes';

/**
 * Search recipes by text query
 * Searches in recipe name, description, and ingredients
 * @param recipes - Array of recipes to search
 * @param query - Search query string
 * @returns Filtered array of recipes matching the query
 */
export function searchRecipes(recipes: Recipe[], query: string): Recipe[] {
  if (!query || query.trim() === '') {
    return recipes;
  }

  const searchTerm = query.toLowerCase().trim();

  return recipes.filter(recipe => {
    // Search in name
    if (recipe.name.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in description
    if (recipe.description.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in ingredients
    if (recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm)
    )) {
      return true;
    }

    // Search in tags
    if (recipe.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm)
    )) {
      return true;
    }

    return false;
  });
}

/**
 * Constraint filters for recipes
 */
export interface RecipeConstraints {
  maxPrepTime?: number; // Maximum preparation time in minutes
  maxCookTime?: number; // Maximum cooking time in minutes
  maxTotalTime?: number; // Maximum total time (prep + cook) in minutes
  budget?: 'low' | 'medium' | 'high'; // Budget level
  difficulty?: 'easy' | 'medium' | 'hard'; // Difficulty level
  equipment?: 'basic' | 'intermediate' | 'advanced'; // Required equipment level
  timeCategory?: 'quick' | 'medium' | 'long'; // Time category
}

/**
 * Filter recipes by user constraints (time, budget, difficulty, equipment)
 * @param recipes - Array of recipes to filter
 * @param constraints - Constraint object with optional filters
 * @returns Filtered array of recipes matching all specified constraints
 */
export function filterByConstraints(
  recipes: Recipe[],
  constraints: RecipeConstraints
): Recipe[] {
  return recipes.filter(recipe => {
    // Filter by max prep time
    if (constraints.maxPrepTime !== undefined && recipe.prepTime > constraints.maxPrepTime) {
      return false;
    }

    // Filter by max cook time
    if (constraints.maxCookTime !== undefined && recipe.cookTime > constraints.maxCookTime) {
      return false;
    }

    // Filter by max total time
    if (constraints.maxTotalTime !== undefined) {
      const totalTime = recipe.prepTime + recipe.cookTime;
      if (totalTime > constraints.maxTotalTime) {
        return false;
      }
    }

    // Filter by budget
    if (constraints.budget !== undefined && recipe.budget !== constraints.budget) {
      return false;
    }

    // Filter by difficulty
    if (constraints.difficulty !== undefined && recipe.difficulty !== constraints.difficulty) {
      return false;
    }

    // Filter by equipment
    if (constraints.equipment !== undefined && recipe.equipment !== constraints.equipment) {
      return false;
    }

    // Filter by time category
    if (constraints.timeCategory !== undefined && recipe.timeCategory !== constraints.timeCategory) {
      return false;
    }

    return true;
  });
}

/**
 * Dietary restrictions supported by the filter
 */
export type DietaryRestriction = 
  | 'vegetarian' 
  | 'vegan' 
  | 'gluten-free' 
  | 'dairy-free' 
  | 'low-carb' 
  | 'high-protein' 
  | 'low-fat';

/**
 * Filter recipes by dietary restrictions
 * @param recipes - Array of recipes to filter
 * @param restrictions - Array of dietary restrictions to apply
 * @returns Filtered array of recipes matching all dietary restrictions
 */
export function filterByDietaryRestrictions(
  recipes: Recipe[],
  restrictions: DietaryRestriction[]
): Recipe[] {
  if (!restrictions || restrictions.length === 0) {
    return recipes;
  }

  return recipes.filter(recipe => {
    // Check each restriction
    for (const restriction of restrictions) {
      switch (restriction) {
        case 'vegetarian':
          // Recipe must have 'vegetarian' tag
          if (!recipe.tags.includes('vegetarian')) {
            return false;
          }
          break;

        case 'vegan':
          // Recipe must have 'vegan' tag (vegan is stricter than vegetarian)
          if (!recipe.tags.includes('vegan')) {
            return false;
          }
          break;

        case 'gluten-free':
          // Recipe must have 'gluten-free' tag
          if (!recipe.tags.includes('gluten-free')) {
            return false;
          }
          break;

        case 'dairy-free':
          // Recipe must have 'dairy-free' tag
          if (!recipe.tags.includes('dairy-free')) {
            return false;
          }
          break;

        case 'low-carb':
          // Recipe should have low carbs (less than 30g)
          if (recipe.carbs >= 30) {
            return false;
          }
          break;

        case 'high-protein':
          // Recipe must have 'high-protein' tag or protein >= 25g
          if (!recipe.tags.includes('high-protein') && recipe.protein < 25) {
            return false;
          }
          break;

        case 'low-fat':
          // Recipe must have 'low-fat' tag or fat <= 10g
          if (!recipe.tags.includes('low-fat') && recipe.fat > 10) {
            return false;
          }
          break;

        default:
          // Unknown restriction, skip
          break;
      }
    }

    return true;
  });
}

/**
 * Find recipes that match a target calorie range
 * @param recipes - Array of recipes to filter
 * @param targetCalories - Target calorie count
 * @param tolerance - Acceptable deviation from target (default: 0.15 = 15%)
 * @returns Filtered array of recipes within the calorie range, sorted by proximity to target
 */
export function calculateCalories(
  recipes: Recipe[],
  targetCalories: number,
  tolerance: number = 0.15
): Recipe[] {
  const minCalories = targetCalories * (1 - tolerance);
  const maxCalories = targetCalories * (1 + tolerance);

  // Filter recipes within the calorie range
  const matchingRecipes = recipes.filter(recipe => 
    recipe.calories >= minCalories && recipe.calories <= maxCalories
  );

  // Sort by proximity to target calories (closest first)
  return matchingRecipes.sort((a, b) => {
    const diffA = Math.abs(a.calories - targetCalories);
    const diffB = Math.abs(b.calories - targetCalories);
    return diffA - diffB;
  });
}

/**
 * Combined filter function that applies all filters in sequence
 * @param recipes - Array of recipes to filter
 * @param query - Optional text search query
 * @param constraints - Optional constraint filters
 * @param restrictions - Optional dietary restrictions
 * @param targetCalories - Optional target calorie count
 * @param calorieTolerance - Optional calorie tolerance (default: 0.15)
 * @returns Filtered and sorted array of recipes
 */
export function filterRecipes(
  recipes: Recipe[],
  options: {
    query?: string;
    constraints?: RecipeConstraints;
    restrictions?: DietaryRestriction[];
    targetCalories?: number;
    calorieTolerance?: number;
  }
): Recipe[] {
  let filtered = recipes;

  // Apply text search
  if (options.query) {
    filtered = searchRecipes(filtered, options.query);
  }

  // Apply constraint filters
  if (options.constraints) {
    filtered = filterByConstraints(filtered, options.constraints);
  }

  // Apply dietary restrictions
  if (options.restrictions && options.restrictions.length > 0) {
    filtered = filterByDietaryRestrictions(filtered, options.restrictions);
  }

  // Apply calorie filtering
  if (options.targetCalories !== undefined) {
    filtered = calculateCalories(
      filtered, 
      options.targetCalories, 
      options.calorieTolerance
    );
  }

  return filtered;
}
