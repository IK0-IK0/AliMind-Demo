/**
 * Unit tests for chatbotService
 * Tests the seven-step computational pipeline
 */

import { describe, it, expect } from 'vitest';
import {
  extractDietaryContext,
  selectBCT,
  recommendRecipes,
  generateResponse,
  processChatMessage,
  DietaryContext
} from './chatbotService';
import { TTMStage } from './ttmInference';
import { TPBScores } from './tpbInference';

describe('chatbotService', () => {
  describe('extractDietaryContext', () => {
    it('should extract time constraints from message', () => {
      const context = extractDietaryContext('I need something quick for dinner');
      expect(context.constraints.timeCategory).toBe('quick');
      expect(context.keywords).toContain('time-constrained');
    });

    it('should extract budget constraints', () => {
      const context = extractDietaryContext('Looking for cheap healthy meals');
      expect(context.constraints.budget).toBe('low');
      expect(context.keywords).toContain('budget-conscious');
    });

    it('should extract difficulty preferences', () => {
      const context = extractDietaryContext('I want something easy to cook');
      expect(context.constraints.difficulty).toBe('easy');
      expect(context.keywords).toContain('beginner-friendly');
    });

    it('should extract dietary restrictions', () => {
      const context = extractDietaryContext('I am vegetarian and need high protein meals');
      expect(context.dietaryRestrictions).toContain('vegetarian');
      expect(context.dietaryRestrictions).toContain('high-protein');
    });

    it('should extract meal type', () => {
      const context = extractDietaryContext('What should I have for breakfast?');
      expect(context.mealType).toBe('breakfast');
    });

    it('should handle multiple constraints', () => {
      const context = extractDietaryContext('I need a quick, cheap, easy vegetarian dinner');
      expect(context.constraints.timeCategory).toBe('quick');
      expect(context.constraints.budget).toBe('low');
      expect(context.constraints.difficulty).toBe('easy');
      expect(context.dietaryRestrictions).toContain('vegetarian');
      expect(context.mealType).toBe('dinner');
    });

    it('should return empty constraints for generic message', () => {
      const context = extractDietaryContext('Hello, how are you?');
      expect(context.keywords).toHaveLength(0);
      expect(context.dietaryRestrictions).toHaveLength(0);
      expect(Object.keys(context.constraints)).toHaveLength(0);
    });
  });

  describe('selectBCT', () => {
    it('should select information BCT for pre-contemplation with weak attitude', () => {
      const bct = selectBCT('attitude', 'preContemplation');
      expect(bct.bctId).toBe('5.1');
      expect(bct.bctName).toBe('Information about health consequences');
      expect(bct.targetDeterminant).toBe('attitude');
    });

    it('should select pros/cons BCT for contemplation with weak attitude', () => {
      const bct = selectBCT('attitude', 'contemplation');
      expect(bct.bctId).toBe('9.2');
      expect(bct.bctName).toBe('Pros and cons');
    });

    it('should select action planning BCT for preparation with weak PBC', () => {
      const bct = selectBCT('perceivedControl', 'preparation');
      expect(bct.bctId).toBe('1.4');
      expect(bct.bctName).toBe('Action planning');
    });

    it('should select instruction BCT for action with weak PBC', () => {
      const bct = selectBCT('perceivedControl', 'action');
      expect(bct.bctId).toBe('4.1');
      expect(bct.bctName).toBe('Instruction on how to perform the behavior');
    });

    it('should select problem solving BCT for maintenance with weak PBC', () => {
      const bct = selectBCT('perceivedControl', 'maintenance');
      expect(bct.bctId).toBe('1.2');
      expect(bct.bctName).toBe('Problem solving');
    });

    it('should select social support BCT for weak subjective norm', () => {
      const bct = selectBCT('subjectiveNorm', 'contemplation');
      expect(bct.bctId).toBe('3.1');
      expect(bct.targetDeterminant).toBe('subjectiveNorm');
    });
  });

  describe('recommendRecipes', () => {
    it('should recommend recipes matching constraints', () => {
      const context: DietaryContext = {
        keywords: ['quick'],
        constraints: { timeCategory: 'quick' },
        dietaryRestrictions: [],
        mealType: 'any'
      };
      const recipes = recommendRecipes(context, 3);
      expect(recipes).toHaveLength(3);
      recipes.forEach(recipe => {
        expect(recipe.timeCategory).toBe('quick');
      });
    });

    it('should recommend vegetarian recipes when requested', () => {
      const context: DietaryContext = {
        keywords: ['vegetarian'],
        constraints: {},
        dietaryRestrictions: ['vegetarian'],
        mealType: 'any'
      };
      const recipes = recommendRecipes(context, 3);
      expect(recipes.length).toBeGreaterThan(0);
      recipes.forEach(recipe => {
        expect(recipe.tags).toContain('vegetarian');
      });
    });

    it('should filter by meal type', () => {
      const context: DietaryContext = {
        keywords: [],
        constraints: {},
        dietaryRestrictions: [],
        mealType: 'breakfast'
      };
      const recipes = recommendRecipes(context, 3);
      expect(recipes.length).toBeGreaterThan(0);
      recipes.forEach(recipe => {
        expect(['breakfast', 'any']).toContain(recipe.mealType);
      });
    });

    it('should return fallback recipes when no matches found', () => {
      const context: DietaryContext = {
        keywords: [],
        constraints: { budget: 'high', difficulty: 'hard' },
        dietaryRestrictions: ['vegan', 'gluten-free'],
        mealType: 'any'
      };
      const recipes = recommendRecipes(context, 3);
      expect(recipes.length).toBeGreaterThan(0);
    });

    it('should respect recipe count parameter', () => {
      const context: DietaryContext = {
        keywords: [],
        constraints: {},
        dietaryRestrictions: [],
        mealType: 'any'
      };
      const recipes = recommendRecipes(context, 5);
      expect(recipes.length).toBeLessThanOrEqual(5);
    });
  });

  describe('generateResponse', () => {
    const mockTPBScores: TPBScores = {
      attitude: 60,
      subjectiveNorm: 50,
      perceivedControl: 40,
      confidence: 50
    };

    const mockTTMStage: TTMStage = {
      stage: 'contemplation',
      confidence: 70,
      description: 'Thinking about making changes'
    };

    const mockBCT = {
      bctId: '9.2',
      bctName: 'Pros and cons',
      description: 'Explore advantages and disadvantages',
      targetDeterminant: 'attitude' as const
    };

    const mockRecipes = [
      {
        id: 'test-recipe',
        name: 'Test Recipe',
        description: 'A test recipe',
        ingredients: ['ingredient1'],
        instructions: ['step1'],
        prepTime: 10,
        cookTime: 20,
        difficulty: 'easy' as const,
        calories: 300,
        protein: 20,
        carbs: 30,
        fat: 10,
        tags: ['test'],
        timeCategory: 'quick' as const,
        budget: 'low' as const,
        equipment: 'basic' as const,
        mealType: 'any' as const
      }
    ];

    it('should generate response for contemplation stage', () => {
      const response = generateResponse(
        'I am thinking about eating healthier',
        mockTPBScores,
        mockTTMStage,
        'Ambivalence-resolution',
        mockBCT,
        mockRecipes
      );
      expect(response).toContain('thinking about making some changes');
      expect(response).toContain('Test Recipe');
      expect(response).toContain('30 min');
      expect(response).toContain('300 cal');
    });

    it('should include BCT-specific message', () => {
      const response = generateResponse(
        'I am thinking about eating healthier',
        mockTPBScores,
        mockTTMStage,
        'Ambivalence-resolution',
        mockBCT,
        mockRecipes
      );
      expect(response).toContain('gain from eating healthier');
    });

    it('should format recipe list correctly', () => {
      const response = generateResponse(
        'I am thinking about eating healthier',
        mockTPBScores,
        mockTTMStage,
        'Ambivalence-resolution',
        mockBCT,
        mockRecipes
      );
      expect(response).toContain('1. **Test Recipe**');
      expect(response).toContain('Difficulty: easy');
      expect(response).toContain('Budget: low');
    });

    it('should generate different responses for different stages', () => {
      const preContemplationStage: TTMStage = {
        stage: 'preContemplation',
        confidence: 60,
        description: 'Not yet considering change'
      };
      const actionStage: TTMStage = {
        stage: 'action',
        confidence: 80,
        description: 'Actively making changes'
      };

      const preResponse = generateResponse(
        'message',
        mockTPBScores,
        preContemplationStage,
        'Awareness',
        mockBCT,
        mockRecipes
      );
      const actionResponse = generateResponse(
        'message',
        mockTPBScores,
        actionStage,
        'Coping',
        mockBCT,
        mockRecipes
      );

      expect(preResponse).toContain('not quite ready');
      expect(actionResponse).toContain('actively working');
      expect(preResponse).not.toBe(actionResponse);
    });
  });

  describe('processChatMessage - Integration', () => {
    it('should execute complete seven-step pipeline', () => {
      const message = 'I want to start eating healthier but I don\'t have much time';
      const response = processChatMessage(message);

      // Verify all pipeline outputs are present
      expect(response.message).toBeDefined();
      expect(response.tpbScores).toBeDefined();
      expect(response.ttmStage).toBeDefined();
      expect(response.interventionMode).toBeDefined();
      expect(response.bct).toBeDefined();
      expect(response.recommendedRecipes).toBeDefined();
      expect(response.disclaimer).toBeDefined();
    });

    it('should include disclaimer in response', () => {
      const message = 'What should I eat?';
      const response = processChatMessage(message);
      expect(response.disclaimer).toContain('informational purposes only');
      expect(response.disclaimer).toContain('not medical guidance');
    });

    it('should recommend appropriate recipes based on context', () => {
      const message = 'I need quick vegetarian breakfast ideas';
      const response = processChatMessage(message);
      expect(response.recommendedRecipes.length).toBeGreaterThan(0);
    });

    it('should calculate TPB scores from message', () => {
      const message = 'I love healthy food and my family supports me';
      const response = processChatMessage(message);
      expect(response.tpbScores.attitude).toBeGreaterThan(50);
      expect(response.tpbScores.subjectiveNorm).toBeGreaterThan(50);
    });

    it('should classify TTM stage from message', () => {
      const message = 'I am planning to start eating better next week';
      const response = processChatMessage(message);
      expect(['preparation', 'contemplation']).toContain(response.ttmStage.stage);
    });

    it('should select appropriate BCT based on stage and determinant', () => {
      const message = 'I want to eat healthy but I don\'t know how';
      const response = processChatMessage(message);
      expect(response.bct.bctId).toBeDefined();
      expect(response.bct.targetDeterminant).toBeDefined();
    });

    it('should handle generic messages gracefully', () => {
      const message = 'Hello';
      const response = processChatMessage(message);
      expect(response.message).toBeDefined();
      expect(response.recommendedRecipes.length).toBeGreaterThan(0);
    });
  });
});
