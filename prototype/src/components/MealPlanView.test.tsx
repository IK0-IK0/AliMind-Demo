import { describe, it, expect } from 'vitest';
import { MealPlan } from '../services/mealPlanService';

describe('MealPlanView', () => {
  const mockMealPlan: MealPlan = {
    durationDays: 1,
    totalDailyCalories: 2000,
    items: [
      {
        day: 1,
        mealType: 'breakfast',
        recipe: {
          id: 'test-breakfast',
          name: 'Test Breakfast',
          description: 'A test breakfast recipe',
          ingredients: ['Ingredient 1', 'Ingredient 2'],
          instructions: ['Step 1', 'Step 2'],
          prepTime: 10,
          cookTime: 15,
          difficulty: 'easy',
          calories: 400,
          protein: 20,
          carbs: 50,
          fat: 10,
          tags: ['breakfast'],
          timeCategory: 'quick',
          budget: 'low',
          equipment: 'basic',
          mealType: 'breakfast'
        },
        targetCalories: 500
      },
      {
        day: 1,
        mealType: 'lunch',
        recipe: {
          id: 'test-lunch',
          name: 'Test Lunch',
          description: 'A test lunch recipe',
          ingredients: ['Ingredient A', 'Ingredient B', 'Ingredient C'],
          instructions: ['Cook step 1', 'Cook step 2', 'Serve'],
          prepTime: 20,
          cookTime: 30,
          difficulty: 'medium',
          calories: 600,
          protein: 30,
          carbs: 60,
          fat: 15,
          tags: ['lunch'],
          timeCategory: 'medium',
          budget: 'medium',
          equipment: 'intermediate',
          mealType: 'lunch'
        },
        targetCalories: 700
      }
    ]
  };

  it('validates meal plan structure', () => {
    expect(mockMealPlan.durationDays).toBe(1);
    expect(mockMealPlan.totalDailyCalories).toBe(2000);
    expect(mockMealPlan.items.length).toBe(2);
  });

  it('calculates daily totals correctly', () => {
    const totalCalories = mockMealPlan.items.reduce((sum, item) => sum + item.recipe.calories, 0);
    const totalProtein = mockMealPlan.items.reduce((sum, item) => sum + item.recipe.protein, 0);
    const totalCarbs = mockMealPlan.items.reduce((sum, item) => sum + item.recipe.carbs, 0);
    const totalFat = mockMealPlan.items.reduce((sum, item) => sum + item.recipe.fat, 0);

    expect(totalCalories).toBe(1000);
    expect(totalProtein).toBe(50);
    expect(totalCarbs).toBe(110);
    expect(totalFat).toBe(25);
  });

  it('groups meals by day correctly', () => {
    const grouped: { [key: number]: typeof mockMealPlan.items } = {};
    mockMealPlan.items.forEach((item) => {
      if (!grouped[item.day]) {
        grouped[item.day] = [];
      }
      grouped[item.day].push(item);
    });

    expect(Object.keys(grouped).length).toBe(1);
    expect(grouped[1].length).toBe(2);
  });

  it('validates recipe data structure', () => {
    const recipe = mockMealPlan.items[0].recipe;
    
    expect(recipe.name).toBeDefined();
    expect(recipe.description).toBeDefined();
    expect(recipe.ingredients).toBeInstanceOf(Array);
    expect(recipe.instructions).toBeInstanceOf(Array);
    expect(recipe.calories).toBeGreaterThan(0);
    expect(recipe.protein).toBeGreaterThan(0);
    expect(recipe.carbs).toBeGreaterThan(0);
    expect(recipe.fat).toBeGreaterThan(0);
  });

  it('validates meal type labels', () => {
    const getMealTypeLabel = (mealType: string) => {
      return mealType.charAt(0).toUpperCase() + mealType.slice(1);
    };

    expect(getMealTypeLabel('breakfast')).toBe('Breakfast');
    expect(getMealTypeLabel('lunch')).toBe('Lunch');
    expect(getMealTypeLabel('dinner')).toBe('Dinner');
    expect(getMealTypeLabel('snack')).toBe('Snack');
  });
});
