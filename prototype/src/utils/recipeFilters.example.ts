/**
 * Example usage of recipe filter functions
 * This file demonstrates how the chatbot service can use these utilities
 * to recommend recipes based on user constraints
 */

import { recipes } from '../data/recipes';
import {
  searchRecipes,
  filterByConstraints,
  filterByDietaryRestrictions,
  calculateCalories,
  filterRecipes
} from './recipeFilters';

// Example 1: Simple text search
console.log('=== Example 1: Search for "adobo" ===');
const adoboRecipes = searchRecipes(recipes, 'adobo');
console.log(`Found ${adoboRecipes.length} recipes containing "adobo"`);
console.log(adoboRecipes.map(r => r.name));

// Example 2: Filter by time constraints (quick meals under 30 minutes)
console.log('\n=== Example 2: Quick meals (under 30 min total) ===');
const quickMeals = filterByConstraints(recipes, {
  maxTotalTime: 30,
  difficulty: 'easy'
});
console.log(`Found ${quickMeals.length} quick and easy recipes`);
console.log(quickMeals.slice(0, 5).map(r => `${r.name} (${r.prepTime + r.cookTime} min)`));

// Example 3: Filter by budget and equipment
console.log('\n=== Example 3: Budget-friendly with basic equipment ===');
const budgetFriendly = filterByConstraints(recipes, {
  budget: 'low',
  equipment: 'basic'
});
console.log(`Found ${budgetFriendly.length} budget-friendly recipes`);
console.log(budgetFriendly.slice(0, 5).map(r => r.name));

// Example 4: Vegetarian recipes
console.log('\n=== Example 4: Vegetarian recipes ===');
const vegetarianRecipes = filterByDietaryRestrictions(recipes, ['vegetarian']);
console.log(`Found ${vegetarianRecipes.length} vegetarian recipes`);
console.log(vegetarianRecipes.slice(0, 5).map(r => r.name));

// Example 5: Vegan and high-protein
console.log('\n=== Example 5: Vegan high-protein recipes ===');
const veganProtein = filterByDietaryRestrictions(recipes, ['vegan', 'high-protein']);
console.log(`Found ${veganProtein.length} vegan high-protein recipes`);
console.log(veganProtein.map(r => `${r.name} (${r.protein}g protein)`));

// Example 6: Find recipes matching calorie target
console.log('\n=== Example 6: Recipes around 400 calories ===');
const calorieMatch = calculateCalories(recipes, 400, 0.15);
console.log(`Found ${calorieMatch.length} recipes within 15% of 400 calories`);
console.log(calorieMatch.slice(0, 5).map(r => `${r.name} (${r.calories} cal)`));

// Example 7: Combined filtering - realistic chatbot scenario
console.log('\n=== Example 7: Combined filtering (chatbot scenario) ===');
console.log('User request: "I want a quick, vegetarian lunch under 300 calories"');
const chatbotResult = filterRecipes(recipes, {
  query: 'lunch',
  constraints: {
    maxTotalTime: 30,
    difficulty: 'easy'
  },
  restrictions: ['vegetarian'],
  targetCalories: 300,
  calorieTolerance: 0.20
});
console.log(`Found ${chatbotResult.length} matching recipes:`);
chatbotResult.forEach(r => {
  console.log(`- ${r.name}: ${r.calories} cal, ${r.prepTime + r.cookTime} min, ${r.difficulty}`);
});

// Example 8: High-protein, low-carb meal
console.log('\n=== Example 8: High-protein, low-carb meal ===');
const proteinLowCarb = filterRecipes(recipes, {
  restrictions: ['high-protein', 'low-carb'],
  constraints: {
    difficulty: 'easy'
  }
});
console.log(`Found ${proteinLowCarb.length} high-protein, low-carb recipes`);
proteinLowCarb.slice(0, 5).forEach(r => {
  console.log(`- ${r.name}: ${r.protein}g protein, ${r.carbs}g carbs`);
});

// Example 9: Budget-conscious meal planning
console.log('\n=== Example 9: Budget meal plan (breakfast, lunch, dinner) ===');
const budgetBreakfast = filterRecipes(recipes, {
  constraints: { budget: 'low' },
  targetCalories: 400
}).filter(r => r.mealType === 'breakfast')[0];

const budgetLunch = filterRecipes(recipes, {
  constraints: { budget: 'low' },
  targetCalories: 500
}).filter(r => r.mealType === 'any' || r.mealType === 'lunch')[0];

const budgetDinner = filterRecipes(recipes, {
  constraints: { budget: 'low' },
  targetCalories: 600
}).filter(r => r.mealType === 'any' || r.mealType === 'dinner')[0];

console.log('Budget meal plan:');
console.log(`Breakfast: ${budgetBreakfast?.name} (${budgetBreakfast?.calories} cal)`);
console.log(`Lunch: ${budgetLunch?.name} (${budgetLunch?.calories} cal)`);
console.log(`Dinner: ${budgetDinner?.name} (${budgetDinner?.calories} cal)`);
const totalCalories = (budgetBreakfast?.calories || 0) + (budgetLunch?.calories || 0) + (budgetDinner?.calories || 0);
console.log(`Total: ${totalCalories} calories`);

// Example 10: Advanced filtering with multiple constraints
console.log('\n=== Example 10: Advanced filtering ===');
console.log('User: "I need a vegan dinner recipe that\'s quick, easy, and around 350 calories"');
const advancedResult = filterRecipes(recipes, {
  query: 'dinner',
  constraints: {
    maxTotalTime: 40,
    difficulty: 'easy',
    budget: 'low'
  },
  restrictions: ['vegan'],
  targetCalories: 350,
  calorieTolerance: 0.15
});
console.log(`Found ${advancedResult.length} matching recipes:`);
advancedResult.forEach(r => {
  const totalTime = r.prepTime + r.cookTime;
  console.log(`- ${r.name}`);
  console.log(`  Calories: ${r.calories}, Time: ${totalTime} min, Difficulty: ${r.difficulty}`);
  console.log(`  Macros: ${r.protein}g protein, ${r.carbs}g carbs, ${r.fat}g fat`);
});
