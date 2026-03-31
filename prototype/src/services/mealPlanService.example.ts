// Example usage of Meal Plan Service
// This file demonstrates how to use the meal plan generation functions

import {
  generateMealPlan,
  calculateMealPlanCalories,
  calculateMealPlanMacros,
  getMealPlanDay,
  MealPlanConstraints
} from './mealPlanService';

// Example 1: Generate a simple 1-day meal plan
console.log('=== Example 1: Simple 1-day meal plan ===');
const simpleConstraints: MealPlanConstraints = {
  targetCalories: 2000,
  difficulty: 'easy',
  budget: 'low'
};

const simpleMealPlan = generateMealPlan(simpleConstraints, 1);
console.log(`Duration: ${simpleMealPlan.durationDays} day(s)`);
console.log(`Target daily calories: ${simpleMealPlan.totalDailyCalories}`);
console.log(`Number of meals: ${simpleMealPlan.items.length}`);
console.log('\nMeals:');
simpleMealPlan.items.forEach(item => {
  console.log(`- ${item.mealType}: ${item.recipe.name} (${item.recipe.calories} cal)`);
});

// Example 2: Generate a 3-day meal plan with dietary restrictions
console.log('\n=== Example 2: 3-day vegetarian meal plan ===');
const vegetarianConstraints: MealPlanConstraints = {
  targetCalories: 1800,
  dietaryRestrictions: ['vegetarian'],
  difficulty: 'easy'
};

const vegetarianMealPlan = generateMealPlan(vegetarianConstraints, 3);
console.log(`Duration: ${vegetarianMealPlan.durationDays} day(s)`);
console.log(`Total meals: ${vegetarianMealPlan.items.length}`);

for (let day = 1; day <= vegetarianMealPlan.durationDays; day++) {
  const dayMeals = getMealPlanDay(vegetarianMealPlan, day);
  console.log(`\nDay ${day}:`);
  dayMeals.forEach(item => {
    console.log(`  ${item.mealType}: ${item.recipe.name} (${item.recipe.calories} cal)`);
  });
}

// Example 3: Generate a meal plan with time constraints
console.log('\n=== Example 3: Quick meal plan (max 30 min total time) ===');
const quickConstraints: MealPlanConstraints = {
  targetCalories: 2200,
  maxPrepTime: 15,
  maxCookTime: 30,
  difficulty: 'easy'
};

const quickMealPlan = generateMealPlan(quickConstraints, 1);
console.log(`Duration: ${quickMealPlan.durationDays} day(s)`);
console.log('\nMeals:');
quickMealPlan.items.forEach(item => {
  const totalTime = item.recipe.prepTime + item.recipe.cookTime;
  console.log(
    `- ${item.mealType}: ${item.recipe.name} ` +
    `(${item.recipe.calories} cal, ${totalTime} min total)`
  );
});

// Example 4: Calculate meal plan statistics
console.log('\n=== Example 4: Meal plan statistics ===');
const statsConstraints: MealPlanConstraints = {
  targetCalories: 2000,
  difficulty: 'easy'
};

const statsMealPlan = generateMealPlan(statsConstraints, 1);
const totalCalories = calculateMealPlanCalories(statsMealPlan);
const macros = calculateMealPlanMacros(statsMealPlan);

console.log(`Target calories: ${statsMealPlan.totalDailyCalories}`);
console.log(`Actual total calories: ${totalCalories}`);
console.log(`Difference: ${totalCalories - statsMealPlan.totalDailyCalories} cal`);
console.log(`\nMacronutrients:`);
console.log(`  Protein: ${macros.protein}g`);
console.log(`  Carbs: ${macros.carbs}g`);
console.log(`  Fat: ${macros.fat}g`);

// Example 5: High-protein meal plan
console.log('\n=== Example 5: High-protein meal plan ===');
const highProteinConstraints: MealPlanConstraints = {
  targetCalories: 2500,
  dietaryRestrictions: ['high-protein'],
  difficulty: 'medium'
};

const highProteinMealPlan = generateMealPlan(highProteinConstraints, 1);
const highProteinMacros = calculateMealPlanMacros(highProteinMealPlan);

console.log(`Total protein: ${highProteinMacros.protein}g`);
console.log('\nMeals:');
highProteinMealPlan.items.forEach(item => {
  console.log(
    `- ${item.mealType}: ${item.recipe.name} ` +
    `(${item.recipe.protein}g protein, ${item.recipe.calories} cal)`
  );
});

// Example 6: Budget-conscious meal plan
console.log('\n=== Example 6: Budget-conscious meal plan ===');
const budgetConstraints: MealPlanConstraints = {
  targetCalories: 1800,
  budget: 'low',
  difficulty: 'easy',
  equipment: 'basic'
};

const budgetMealPlan = generateMealPlan(budgetConstraints, 2);
console.log(`Duration: ${budgetMealPlan.durationDays} day(s)`);
console.log(`Budget level: low`);
console.log(`Equipment needed: basic`);

for (let day = 1; day <= budgetMealPlan.durationDays; day++) {
  const dayMeals = getMealPlanDay(budgetMealPlan, day);
  console.log(`\nDay ${day}:`);
  dayMeals.forEach(item => {
    console.log(
      `  ${item.mealType}: ${item.recipe.name} ` +
      `(${item.recipe.difficulty} difficulty, ${item.recipe.calories} cal)`
    );
  });
}

// Example 7: Detailed meal plan with recipe information
console.log('\n=== Example 7: Detailed meal plan ===');
const detailedConstraints: MealPlanConstraints = {
  targetCalories: 2000,
  difficulty: 'easy'
};

const detailedMealPlan = generateMealPlan(detailedConstraints, 1);
console.log(`Meal Plan for ${detailedMealPlan.durationDays} day(s)\n`);

detailedMealPlan.items.forEach(item => {
  console.log(`${item.mealType.toUpperCase()}: ${item.recipe.name}`);
  console.log(`  Description: ${item.recipe.description}`);
  console.log(`  Target calories: ${item.targetCalories} cal`);
  console.log(`  Actual calories: ${item.recipe.calories} cal`);
  console.log(`  Macros: ${item.recipe.protein}g protein, ${item.recipe.carbs}g carbs, ${item.recipe.fat}g fat`);
  console.log(`  Time: ${item.recipe.prepTime} min prep + ${item.recipe.cookTime} min cook`);
  console.log(`  Difficulty: ${item.recipe.difficulty}`);
  console.log(`  Budget: ${item.recipe.budget}`);
  console.log(`  Tags: ${item.recipe.tags.join(', ')}`);
  console.log('');
});

// Example 8: Caloric distribution verification
console.log('=== Example 8: Caloric distribution verification ===');
const distributionConstraints: MealPlanConstraints = {
  targetCalories: 2000
};

const distributionMealPlan = generateMealPlan(distributionConstraints, 1);
console.log(`Target daily calories: ${distributionMealPlan.totalDailyCalories}`);
console.log('\nExpected distribution:');
console.log('  Breakfast: 25% = 500 cal');
console.log('  Lunch: 35% = 700 cal');
console.log('  Dinner: 35% = 700 cal');
console.log('  Snack: 5% = 100 cal');

console.log('\nActual meals:');
distributionMealPlan.items.forEach(item => {
  const percentage = ((item.recipe.calories / distributionMealPlan.totalDailyCalories) * 100).toFixed(1);
  console.log(
    `  ${item.mealType}: ${item.recipe.calories} cal (${percentage}% of daily target)`
  );
});

const actualTotal = calculateMealPlanCalories(distributionMealPlan);
const difference = actualTotal - distributionMealPlan.totalDailyCalories;
const percentDiff = ((difference / distributionMealPlan.totalDailyCalories) * 100).toFixed(1);
console.log(`\nTotal actual calories: ${actualTotal} cal`);
console.log(`Difference from target: ${difference} cal (${percentDiff}%)`);
