// Meal Plan Generation Service
// Generates meal plans based on user constraints and caloric targets

import { Recipe, recipes } from '../data/recipes';
import { filterRecipes, RecipeConstraints, DietaryRestriction } from '../utils/recipeFilters';

export interface MealPlanConstraints {
  targetCalories: number;
  dietaryRestrictions?: DietaryRestriction[];
  maxPrepTime?: number;
  maxCookTime?: number;
  budget?: 'low' | 'medium' | 'high';
  difficulty?: 'easy' | 'medium' | 'hard';
  equipment?: 'basic' | 'intermediate' | 'advanced';
}

export interface MealPlanItem {
  day: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: Recipe;
  targetCalories: number;
}

export interface MealPlan {
  durationDays: number;
  totalDailyCalories: number;
  items: MealPlanItem[];
}

/**
 * Caloric distribution for meal types
 * Based on standard nutritional guidelines
 */
const CALORIC_DISTRIBUTION = {
  breakfast: 0.25,  // 25%
  lunch: 0.35,      // 35%
  dinner: 0.35,     // 35%
  snack: 0.05       // 5%
};

/**
 * Tolerance for calorie matching (10%)
 */
const CALORIE_TOLERANCE = 0.10;

/**
 * Generate a meal plan based on user constraints
 * @param constraints - User constraints including target calories and dietary restrictions
 * @param durationDays - Number of days for the meal plan
 * @returns Generated meal plan with recipes for each day
 */
export function generateMealPlan(
  constraints: MealPlanConstraints,
  durationDays: number = 1
): MealPlan {
  const { targetCalories, dietaryRestrictions, ...recipeConstraints } = constraints;

  // Calculate target calories for each meal type
  const breakfastCalories = targetCalories * CALORIC_DISTRIBUTION.breakfast;
  const lunchCalories = targetCalories * CALORIC_DISTRIBUTION.lunch;
  const dinnerCalories = targetCalories * CALORIC_DISTRIBUTION.dinner;
  const snackCalories = targetCalories * CALORIC_DISTRIBUTION.snack;

  const items: MealPlanItem[] = [];

  // Generate meals for each day
  for (let day = 1; day <= durationDays; day++) {
    // Generate breakfast
    const breakfast = selectRecipe(
      'breakfast',
      breakfastCalories,
      recipeConstraints,
      dietaryRestrictions,
      items
    );
    if (breakfast) {
      items.push({
        day,
        mealType: 'breakfast',
        recipe: breakfast,
        targetCalories: breakfastCalories
      });
    }

    // Generate lunch
    const lunch = selectRecipe(
      'lunch',
      lunchCalories,
      recipeConstraints,
      dietaryRestrictions,
      items
    );
    if (lunch) {
      items.push({
        day,
        mealType: 'lunch',
        recipe: lunch,
        targetCalories: lunchCalories
      });
    }

    // Generate dinner
    const dinner = selectRecipe(
      'dinner',
      dinnerCalories,
      recipeConstraints,
      dietaryRestrictions,
      items
    );
    if (dinner) {
      items.push({
        day,
        mealType: 'dinner',
        recipe: dinner,
        targetCalories: dinnerCalories
      });
    }

    // Generate snack
    const snack = selectRecipe(
      'snack',
      snackCalories,
      recipeConstraints,
      dietaryRestrictions,
      items
    );
    if (snack) {
      items.push({
        day,
        mealType: 'snack',
        recipe: snack,
        targetCalories: snackCalories
      });
    }
  }

  return {
    durationDays,
    totalDailyCalories: targetCalories,
    items
  };
}

/**
 * Select a recipe for a specific meal type and caloric target
 * @param mealType - Type of meal (breakfast, lunch, dinner, snack)
 * @param targetCalories - Target calories for this meal
 * @param recipeConstraints - User constraints (time, budget, difficulty, equipment)
 * @param dietaryRestrictions - Dietary restrictions to apply
 * @param existingItems - Already selected items to avoid duplicates
 * @returns Selected recipe or null if no suitable recipe found
 */
function selectRecipe(
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  targetCalories: number,
  recipeConstraints: Omit<RecipeConstraints, 'targetCalories'>,
  dietaryRestrictions?: DietaryRestriction[],
  existingItems: MealPlanItem[] = []
): Recipe | null {
  // Filter recipes by meal type
  let candidateRecipes = recipes.filter(recipe => {
    // Check if recipe is suitable for this meal type
    if (mealType === 'breakfast') {
      return recipe.mealType === 'breakfast';
    } else if (mealType === 'snack') {
      return recipe.mealType === 'snack' || recipe.tags.includes('snack');
    } else {
      // Lunch and dinner can use 'any' or specific meal type
      return recipe.mealType === mealType || recipe.mealType === 'any';
    }
  });

  // Apply user constraints and dietary restrictions
  candidateRecipes = filterRecipes(candidateRecipes, {
    constraints: recipeConstraints,
    restrictions: dietaryRestrictions,
    targetCalories,
    calorieTolerance: CALORIE_TOLERANCE
  });

  // Remove recipes that have already been selected in this meal plan
  const usedRecipeIds = new Set(existingItems.map(item => item.recipe.id));
  candidateRecipes = candidateRecipes.filter(recipe => !usedRecipeIds.has(recipe.id));

  // If no recipes found, try relaxing constraints
  if (candidateRecipes.length === 0) {
    // Try without calorie constraint
    candidateRecipes = recipes.filter(recipe => {
      if (mealType === 'breakfast') {
        return recipe.mealType === 'breakfast';
      } else if (mealType === 'snack') {
        return recipe.mealType === 'snack' || recipe.tags.includes('snack');
      } else {
        return recipe.mealType === mealType || recipe.mealType === 'any';
      }
    });

    candidateRecipes = filterRecipes(candidateRecipes, {
      constraints: recipeConstraints,
      restrictions: dietaryRestrictions
    });

    candidateRecipes = candidateRecipes.filter(recipe => !usedRecipeIds.has(recipe.id));
  }

  // Return the first matching recipe (already sorted by calorie proximity if applicable)
  return candidateRecipes.length > 0 ? candidateRecipes[0] : null;
}

/**
 * Calculate total calories for a meal plan
 * @param mealPlan - The meal plan to calculate
 * @returns Total calories across all meals
 */
export function calculateMealPlanCalories(mealPlan: MealPlan): number {
  return mealPlan.items.reduce((total, item) => total + item.recipe.calories, 0);
}

/**
 * Calculate macronutrient totals for a meal plan
 * @param mealPlan - The meal plan to calculate
 * @returns Object with total protein, carbs, and fat
 */
export function calculateMealPlanMacros(mealPlan: MealPlan): {
  protein: number;
  carbs: number;
  fat: number;
} {
  return mealPlan.items.reduce(
    (totals, item) => ({
      protein: totals.protein + item.recipe.protein,
      carbs: totals.carbs + item.recipe.carbs,
      fat: totals.fat + item.recipe.fat
    }),
    { protein: 0, carbs: 0, fat: 0 }
  );
}

/**
 * Get meal plan summary for a specific day
 * @param mealPlan - The meal plan
 * @param day - Day number (1-indexed)
 * @returns Array of meal items for that day
 */
export function getMealPlanDay(mealPlan: MealPlan, day: number): MealPlanItem[] {
  return mealPlan.items.filter(item => item.day === day);
}
