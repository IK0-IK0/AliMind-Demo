import { describe, it, expect } from 'vitest';
import {
  classifyTTMStage,
  classifyTTMStageFromHistory,
  getInterventionMode,
  getStageDescription,
  getStageExplanation
} from './ttmInference';

describe('TTM Inference Module', () => {
  describe('classifyTTMStage', () => {
    it('should return contemplation for empty message', () => {
      const result = classifyTTMStage('');
      
      expect(result.stage).toBe('contemplation');
      expect(result.confidence).toBe(50);
    });

    it('should detect pre-contemplation stage', () => {
      const message = 'I\'m not interested in changing my diet. I\'m fine as is and don\'t see why I need to.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('preContemplation');
      expect(result.confidence).toBeGreaterThan(50);
    });

    it('should detect contemplation stage', () => {
      const message = 'I\'m thinking about eating healthier. Maybe I should, but I\'m not sure yet.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('contemplation');
      expect(result.confidence).toBeGreaterThan(50);
    });

    it('should detect preparation stage', () => {
      const message = 'I\'m planning to start eating healthy next week. I\'m getting ready and researching recipes.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('preparation');
      expect(result.confidence).toBeGreaterThan(50);
    });

    it('should detect action stage', () => {
      const message = 'I started eating healthy this week. I\'m currently tracking my meals and cooking more.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('action');
      expect(result.confidence).toBeGreaterThan(50);
    });

    it('should detect maintenance stage', () => {
      const message = 'I\'ve been maintaining healthy eating habits for months. It\'s become a natural part of my lifestyle.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('maintenance');
      expect(result.confidence).toBeGreaterThan(50);
    });

    it('should include stage description', () => {
      const result = classifyTTMStage('I\'m thinking about it');
      
      expect(result.description).toBeDefined();
      expect(result.description.length).toBeGreaterThan(0);
    });

    it('should return confidence score between 0 and 100', () => {
      const result = classifyTTMStage('I want to eat healthier');
      
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(100);
    });
  });

  describe('classifyTTMStageFromHistory', () => {
    it('should return contemplation for empty history', () => {
      const result = classifyTTMStageFromHistory([]);
      
      expect(result.stage).toBe('contemplation');
      expect(result.confidence).toBe(50);
    });

    it('should aggregate stages from multiple messages', () => {
      const messages = [
        'I\'m thinking about eating healthier',
        'Maybe I should start soon',
        'I\'m considering making changes'
      ];
      
      const result = classifyTTMStageFromHistory(messages);
      
      expect(result.stage).toBe('contemplation');
    });

    it('should detect stage progression in conversation', () => {
      const messages = [
        'I\'m thinking about it',           // Contemplation
        'I\'m planning to start next week', // Preparation
        'I just started today'              // Action
      ];
      
      const result = classifyTTMStageFromHistory(messages);
      
      // Should classify as action or preparation (recent messages)
      expect(['action', 'preparation']).toContain(result.stage);
    });

    it('should weight recent messages more heavily with higher alpha', () => {
      const messages = [
        'I\'m not interested in changing',  // Old: Pre-contemplation
        'I\'m actively eating healthy now'  // Recent: Action
      ];
      
      const resultHighAlpha = classifyTTMStageFromHistory(messages, 0.9);
      
      // Higher alpha should favor recent action stage
      // At minimum, high alpha should not be pre-contemplation
      expect(resultHighAlpha.stage).not.toBe('preContemplation');
    });

    it('should handle single message', () => {
      const result = classifyTTMStageFromHistory(['I\'m planning to start']);
      
      expect(result.stage).toBe('preparation');
    });
  });

  describe('Temporal context detection', () => {
    it('should boost preparation for future indicators', () => {
      const message = 'I will start eating healthy next week. I\'m going to plan my meals.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('preparation');
    });

    it('should boost action for present indicators', () => {
      const message = 'I\'m currently eating healthy. I\'m doing it now and tracking today.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('action');
    });

    it('should boost maintenance for duration indicators', () => {
      const message = 'I\'ve been eating healthy for months. It\'s been years since I ate junk food.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('maintenance');
    });

    it('should reduce action/maintenance for past indicators', () => {
      const message = 'I used to eat healthy before, but not anymore.';
      const result = classifyTTMStage(message);
      
      // Should not classify as action or maintenance
      expect(['action', 'maintenance']).not.toContain(result.stage);
    });
  });

  describe('getInterventionMode', () => {
    it('should map pre-contemplation to Awareness', () => {
      expect(getInterventionMode('preContemplation')).toBe('Awareness');
    });

    it('should map contemplation to Ambivalence-resolution', () => {
      expect(getInterventionMode('contemplation')).toBe('Ambivalence-resolution');
    });

    it('should map preparation to Planning', () => {
      expect(getInterventionMode('preparation')).toBe('Planning');
    });

    it('should map action to Coping', () => {
      expect(getInterventionMode('action')).toBe('Coping');
    });

    it('should map maintenance to Relapse-prevention', () => {
      expect(getInterventionMode('maintenance')).toBe('Relapse-prevention');
    });
  });

  describe('getStageDescription', () => {
    it('should return description for pre-contemplation', () => {
      const desc = getStageDescription('preContemplation');
      expect(desc.toLowerCase()).toContain('not');
      expect(desc.toLowerCase()).toContain('considering');
    });

    it('should return description for contemplation', () => {
      const desc = getStageDescription('contemplation');
      expect(desc.toLowerCase()).toContain('thinking');
    });

    it('should return description for preparation', () => {
      const desc = getStageDescription('preparation');
      expect(desc.toLowerCase()).toContain('ready');
    });

    it('should return description for action', () => {
      const desc = getStageDescription('action');
      expect(desc.toLowerCase()).toContain('actively');
    });

    it('should return description for maintenance', () => {
      const desc = getStageDescription('maintenance');
      expect(desc.toLowerCase()).toContain('maintaining');
    });
  });

  describe('getStageExplanation', () => {
    it('should return detailed explanation for each stage', () => {
      const stages: Array<'preContemplation' | 'contemplation' | 'preparation' | 'action' | 'maintenance'> = [
        'preContemplation',
        'contemplation',
        'preparation',
        'action',
        'maintenance'
      ];
      
      stages.forEach(stage => {
        const explanation = getStageExplanation(stage);
        expect(explanation).toBeDefined();
        expect(explanation.length).toBeGreaterThan(20);
      });
    });
  });

  describe('Confidence calculation', () => {
    it('should have higher confidence for clear signals', () => {
      const clearMessage = 'I\'m not interested. I don\'t want to change. I\'m fine as is. Not ready. Not now. Won\'t do it. Refuse.';
      const ambiguousMessage = 'I\'m thinking about it but also not sure and maybe later';
      
      const clearResult = classifyTTMStage(clearMessage);
      const ambiguousResult = classifyTTMStage(ambiguousMessage);
      
      // Clear message should have higher confidence than mixed signals
      expect(clearResult.confidence).toBeGreaterThan(ambiguousResult.confidence);
    });

    it('should have lower confidence for mixed signals', () => {
      const mixedMessage = 'I\'m thinking about it but not ready. Maybe I should but I won\'t.';
      const result = classifyTTMStage(mixedMessage);
      
      // Mixed signals should result in moderate confidence
      expect(result.confidence).toBeLessThan(90);
    });
  });

  describe('Edge cases', () => {
    it('should handle case-insensitive matching', () => {
      const lower = classifyTTMStage('i\'m thinking about eating healthier');
      const upper = classifyTTMStage('I\'M THINKING ABOUT EATING HEALTHIER');
      const mixed = classifyTTMStage('I\'m ThInKiNg AbOuT eAtInG hEaLtHiEr');
      
      expect(lower.stage).toBe(upper.stage);
      expect(lower.stage).toBe(mixed.stage);
    });

    it('should handle phrases with spaces', () => {
      const message = 'I\'m not sure if I want to. I\'m thinking about it.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('contemplation');
    });

    it('should avoid partial word matches', () => {
      // "scan" should not match "can"
      const message = 'I need to scan this document';
      const result = classifyTTMStage(message);
      
      // Should default to contemplation (neutral)
      expect(result.stage).toBe('contemplation');
    });

    it('should handle very short messages', () => {
      const result = classifyTTMStage('maybe');
      
      expect(result.stage).toBeDefined();
      expect(result.confidence).toBeGreaterThanOrEqual(0);
    });

    it('should handle very long messages', () => {
      const longMessage = 'I\'m thinking about eating healthier. Maybe I should consider it. '.repeat(25);
      const result = classifyTTMStage(longMessage);
      
      expect(result.stage).toBe('contemplation');
      expect(result.confidence).toBeGreaterThanOrEqual(50);
    });
  });

  describe('Real-world conversation examples', () => {
    it('should classify ambivalent user as contemplation', () => {
      const message = 'I know I should eat better, but I\'m not sure if I can. Maybe someday.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('contemplation');
    });

    it('should classify committed planner as preparation', () => {
      const message = 'I\'m going to start meal prepping this Sunday. I\'ve been researching recipes and making a shopping list.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('preparation');
    });

    it('should classify active changer as action', () => {
      const message = 'I\'ve been eating salads for lunch this week and tracking my calories. It\'s going well so far.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('action');
    });

    it('should classify long-term maintainer as maintenance', () => {
      const message = 'I\'ve been maintaining healthy eating for over a year now. It\'s been part of my lifestyle for months. It\'s automatic and a habit.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('maintenance');
    });

    it('should classify resistant user as pre-contemplation', () => {
      const message = 'I don\'t think I need to change anything. My diet is fine and I\'m not interested in all this healthy eating stuff.';
      const result = classifyTTMStage(message);
      
      expect(result.stage).toBe('preContemplation');
    });
  });
});
