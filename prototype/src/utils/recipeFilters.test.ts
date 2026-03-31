import { describe, it, expect } from 'vitest';
import {
  searchRecipes,
  filterByConstraints,
  filterByDietaryRestrictions,
  calculateCalories,
  filterRecipes,
  RecipeConstraints,
  DietaryRestriction
} from './recipeFilters';
import { Recipe } from '../data/recipes';

// Mock recipe data for testing
const mockRecipes: Recipe[] = [
  {
    id: 'recipe-1',
    name: 'Chicken Adobo',
    description: 'Classic Filipino chicken dish',
    ingredients: ['chicken', 'soy sauce', 'vinegar', 'garlic'],
    instructions: ['Marinate chicken', 'Cook in pot'],
    prepTime: 30,
    cookTime: 45,
    difficulty: 'easy',
    calories: 380,
    protein: 42,
    carbs: 8,
    fat: 18,
    tags: ['lunch', 'dinner', 'Filipino-classic', 'high-protein'],
    timeCategory: 'long',
    budget: 'low',
    equipment: 'basic',
    mealType: 'any'
  },
  {
    id: 'recipe-2',
    name: 'Vegetable Stir Fry',
    description: 'Quick and healthy vegetable dish',
    ingredients: ['broccoli', 'carrots', 'bell peppers', 'soy sauce'],
    instructions: ['Heat oil', 'Stir fry vegetables'],
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    calories: 180,
    protein: 6,
    carbs: 24,
    fat: 8,
    tags: ['lunch', 'dinner', 'vegetarian', 'vegan', 'quick', 'low-fat'],
    timeCategory: 'quick',
    budget: 'low',
    equipment: 'basic',
    mealType: 'any'
  },
  {
    id: 'recipe-3',
    name: 'Grilled Salmon',
    description: 'Healthy grilled fish with herbs',
    ingredients: ['salmon', 'lemon', 'herbs', 'olive oil'],
    instructions: ['Season salmon', 'Grill for 15 minutes'],
    prepTime: 10,
    cookTime: 15,
    difficulty: 'medium',
    calories: 420,
    protein: 38,
    carbs: 2,
    fat: 28,
    tags: ['lunch', 'dinner', 'high-protein', 'low-carb'],
    timeCategory: 'quick',
    budget: 'high',
    equipment: 'intermediate',
    mealType: 'any'
  },
  {
    id: 'recipe-4',
    name: 'Beef Stew',
    description: 'Hearty slow-cooked beef stew',
    ingredients: ['beef', 'potatoes', 'carrots', 'onions'],
    instructions: ['Brown beef', 'Add vegetables', 'Simmer for 2 hours'],
    prepTime: 20,
    cookTime: 120,
    difficulty: 'hard',
    calories: 520,
    protein: 45,
    carbs: 32,
    fat: 24,
    tags: ['lunch', 'dinner', 'comfort-food', 'high-protein'],
    timeCategory: 'long',
    budget: 'medium',
    equipment: 'basic',
    mealType: 'any'
  },
  {
    id: 'recipe-5',
    name: 'Tofu Scramble',
    description: 'Vegan breakfast scramble',
    ingredients: ['tofu', 'turmeric', 'vegetables', 'nutritional yeast'],
    instructions: ['Crumble tofu', 'Cook with spices'],
    prepTime: 5,
    cookTime: 10,
    difficulty: 'easy',
    calories: 220,
    protein: 18,
    carbs: 12,
    fat: 14,
    tags: ['breakfast', 'vegan', 'vegetarian', 'quick', 'high-protein'],
    timeCategory: 'quick',
    budget: 'low',
    equipment: 'basic',
    mealType: 'breakfast'
  }
];

describe('searchRecipes', () => {
  it('should return all recipes when query is empty', () => {
    const result = searchRecipes(mockRecipes, '');
    expect(result).toHaveLength(mockRecipes.length);
  });

  it('should find recipes by name', () => {
    const result = searchRecipes(mockRecipes, 'chicken');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Chicken Adobo');
  });

  it('should find recipes by description', () => {
    const result = searchRecipes(mockRecipes, 'healthy');
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(r => r.description.toLowerCase().includes('healthy'))).toBe(true);
  });

  it('should find recipes by ingredient', () => {
    const result = searchRecipes(mockRecipes, 'salmon');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Grilled Salmon');
  });

  it('should find recipes by tag', () => {
    const result = searchRecipes(mockRecipes, 'vegan');
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.every(r => r.tags.includes('vegan'))).toBe(true);
  });

  it('should be case insensitive', () => {
    const result = searchRecipes(mockRecipes, 'CHICKEN');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Chicken Adobo');
  });

  it('should handle whitespace in query', () => {
    const result = searchRecipes(mockRecipes, '  chicken  ');
    expect(result).toHaveLength(1);
  });
});

describe('filterByConstraints', () => {
  it('should return all recipes when no constraints provided', () => {
    const result = filterByConstraints(mockRecipes, {});
    expect(result).toHaveLength(mockRecipes.length);
  });

  it('should filter by max prep time', () => {
    const constraints: RecipeConstraints = { maxPrepTime: 15 };
    const result = filterByConstraints(mockRecipes, constraints);
    expect(result.every(r => r.prepTime <= 15)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should filter by max cook time', () => {
    const constraints: RecipeConstraints = { maxCookTime: 20 };
    const result = filterByConstraints(mockRecipes, constraints);
    expect(result.every(r => r.cookTime <= 20)).toBe(true);
  });

  it('should filter by max total time', () => {
    const constraints: RecipeConstraints = { maxTotalTime: 30 };
    const result = filterByConstraints(mockRecipes, constraints);
    expect(result.every(r => (r.prepTime + r.cookTime) <= 30)).toBe(true);
  });

  it('should filter by budget', () => {
    const constraints: RecipeConstraints = { budget: 'low' };
    const result = filterByConstraints(mockRecipes, constraints);
    expect(result.every(r => r.budget === 'low')).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should filter by difficulty', () => {
    const constraints: RecipeConstraints = { difficulty: 'easy' };
    const result = filterByConstraints(mockRecipes, constraints);
    expect(result.every(r => r.difficulty === 'easy')).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should filter by equipment', () => {
    const constraints: RecipeConstraints = { equipment: 'basic' };
    const result = filterByConstraints(mockRecipes, constraints);
    expect(result.every(r => r.equipment === 'basic')).toBe(true);
  });

  it('should filter by time category', () => {
    const constraints: RecipeConstraints = { timeCategory: 'quick' };
    const result = filterByConstraints(mockRecipes, constraints);
    expect(result.every(r => r.timeCategory === 'quick')).toBe(true);
  });

  it('should apply multiple constraints together', () => {
    const constraints: RecipeConstraints = {
      difficulty: 'easy',
      budget: 'low',
      timeCategory: 'quick'
    };
    const result = filterByConstraints(mockRecipes, constraints);
    expect(result.every(r => 
      r.difficulty === 'easy' && 
      r.budget === 'low' && 
      r.timeCategory === 'quick'
    )).toBe(true);
  });
});

describe('filterByDietaryRestrictions', () => {
  it('should return all recipes when no restrictions provided', () => {
    const result = filterByDietaryRestrictions(mockRecipes, []);
    expect(result).toHaveLength(mockRecipes.length);
  });

  it('should filter vegetarian recipes', () => {
    const restrictions: DietaryRestriction[] = ['vegetarian'];
    const result = filterByDietaryRestrictions(mockRecipes, restrictions);
    expect(result.every(r => r.tags.includes('vegetarian'))).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should filter vegan recipes', () => {
    const restrictions: DietaryRestriction[] = ['vegan'];
    const result = filterByDietaryRestrictions(mockRecipes, restrictions);
    expect(result.every(r => r.tags.includes('vegan'))).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should filter low-carb recipes', () => {
    const restrictions: DietaryRestriction[] = ['low-carb'];
    const result = filterByDietaryRestrictions(mockRecipes, restrictions);
    expect(result.every(r => r.carbs < 30)).toBe(true);
  });

  it('should filter high-protein recipes', () => {
    const restrictions: DietaryRestriction[] = ['high-protein'];
    const result = filterByDietaryRestrictions(mockRecipes, restrictions);
    expect(result.every(r => 
      r.tags.includes('high-protein') || r.protein >= 25
    )).toBe(true);
  });

  it('should filter low-fat recipes', () => {
    const restrictions: DietaryRestriction[] = ['low-fat'];
    const result = filterByDietaryRestrictions(mockRecipes, restrictions);
    expect(result.every(r => 
      r.tags.includes('low-fat') || r.fat <= 10
    )).toBe(true);
  });

  it('should apply multiple restrictions together', () => {
    const restrictions: DietaryRestriction[] = ['vegan', 'high-protein'];
    const result = filterByDietaryRestrictions(mockRecipes, restrictions);
    expect(result.every(r => 
      r.tags.includes('vegan') && 
      (r.tags.includes('high-protein') || r.protein >= 25)
    )).toBe(true);
  });

  it('should return empty array when no recipes match all restrictions', () => {
    // No recipe is both vegan and has beef
    const restrictions: DietaryRestriction[] = ['vegan'];
    const result = filterByDietaryRestrictions(mockRecipes, restrictions);
    const hasBeef = result.some(r => 
      r.ingredients.some(i => i.toLowerCase().includes('beef'))
    );
    expect(hasBeef).toBe(false);
  });
});

describe('calculateCalories', () => {
  it('should find recipes within default tolerance (15%)', () => {
    const targetCalories = 400;
    const result = calculateCalories(mockRecipes, targetCalories);
    
    const minCalories = targetCalories * 0.85; // 340
    const maxCalories = targetCalories * 1.15; // 460
    
    expect(result.every(r => 
      r.calories >= minCalories && r.calories <= maxCalories
    )).toBe(true);
  });

  it('should find recipes within custom tolerance', () => {
    const targetCalories = 400;
    const tolerance = 0.10; // 10%
    const result = calculateCalories(mockRecipes, targetCalories, tolerance);
    
    const minCalories = targetCalories * 0.90; // 360
    const maxCalories = targetCalories * 1.10; // 440
    
    expect(result.every(r => 
      r.calories >= minCalories && r.calories <= maxCalories
    )).toBe(true);
  });

  it('should sort recipes by proximity to target', () => {
    const targetCalories = 400;
    const result = calculateCalories(mockRecipes, targetCalories);
    
    if (result.length > 1) {
      for (let i = 0; i < result.length - 1; i++) {
        const diffCurrent = Math.abs(result[i].calories - targetCalories);
        const diffNext = Math.abs(result[i + 1].calories - targetCalories);
        expect(diffCurrent).toBeLessThanOrEqual(diffNext);
      }
    }
  });

  it('should return empty array when no recipes match', () => {
    const targetCalories = 1000; // No recipes near this value
    const tolerance = 0.05; // Very strict tolerance
    const result = calculateCalories(mockRecipes, targetCalories, tolerance);
    expect(result).toHaveLength(0);
  });

  it('should handle exact calorie match', () => {
    const targetCalories = 380; // Exact match with Chicken Adobo
    const tolerance = 0.01; // Very strict
    const result = calculateCalories(mockRecipes, targetCalories, tolerance);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].calories).toBe(380);
  });
});

describe('filterRecipes (combined)', () => {
  it('should apply all filters together', () => {
    const result = filterRecipes(mockRecipes, {
      query: 'vegan',
      constraints: { difficulty: 'easy' },
      restrictions: ['vegan'],
      targetCalories: 220,
      calorieTolerance: 0.10
    });
    
    expect(result.every(r => 
      r.difficulty === 'easy' &&
      r.tags.includes('vegan') &&
      r.calories >= 198 && // 220 * 0.9
      r.calories <= 242    // 220 * 1.1
    )).toBe(true);
  });

  it('should work with only query', () => {
    const result = filterRecipes(mockRecipes, {
      query: 'chicken'
    });
    expect(result.length).toBeGreaterThan(0);
  });

  it('should work with only constraints', () => {
    const result = filterRecipes(mockRecipes, {
      constraints: { budget: 'low' }
    });
    expect(result.every(r => r.budget === 'low')).toBe(true);
  });

  it('should work with only restrictions', () => {
    const result = filterRecipes(mockRecipes, {
      restrictions: ['vegetarian']
    });
    expect(result.every(r => r.tags.includes('vegetarian'))).toBe(true);
  });

  it('should work with only calorie target', () => {
    const result = filterRecipes(mockRecipes, {
      targetCalories: 400
    });
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return all recipes when no options provided', () => {
    const result = filterRecipes(mockRecipes, {});
    expect(result).toHaveLength(mockRecipes.length);
  });

  it('should handle complex filtering scenario', () => {
    const result = filterRecipes(mockRecipes, {
      query: 'quick',
      constraints: {
        maxTotalTime: 30,
        difficulty: 'easy',
        budget: 'low'
      },
      restrictions: ['vegetarian'],
      targetCalories: 200,
      calorieTolerance: 0.20
    });
    
    // Should find vegetarian stir fry or tofu scramble
    expect(result.every(r => 
      r.tags.includes('vegetarian') &&
      r.difficulty === 'easy' &&
      r.budget === 'low' &&
      (r.prepTime + r.cookTime) <= 30
    )).toBe(true);
  });
});
