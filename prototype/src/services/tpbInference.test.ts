import { describe, it, expect } from 'vitest';
import {
  calculateTPBScores,
  calculateTPBScoresFromHistory,
  identifyWeakestDeterminant,
  getConstructDescription,
  interpretScore,
  type TPBScores
} from './tpbInference';

describe('TPB Inference Module', () => {
  describe('calculateTPBScores', () => {
    it('should return neutral scores for empty message', () => {
      const scores = calculateTPBScores('');
      
      expect(scores.attitude).toBe(50);
      expect(scores.subjectiveNorm).toBe(50);
      expect(scores.perceivedControl).toBe(50);
      expect(scores.confidence).toBe(50);
    });

    it('should detect positive attitude keywords', () => {
      const message = 'I love healthy food! It tastes delicious and makes me feel energized.';
      const scores = calculateTPBScores(message);
      
      expect(scores.attitude).toBeGreaterThan(50);
    });

    it('should detect negative attitude keywords', () => {
      const message = 'Healthy food is boring and tasteless. I miss junk food.';
      const scores = calculateTPBScores(message);
      
      expect(scores.attitude).toBeLessThan(50);
    });

    it('should detect positive subjective norm keywords', () => {
      const message = 'My family supports me and we cook together. Everyone encourages healthy eating.';
      const scores = calculateTPBScores(message);
      
      expect(scores.subjectiveNorm).toBeGreaterThan(50);
    });

    it('should detect negative subjective norm keywords', () => {
      const message = 'My friends don\'t understand. I feel alone and everyone eats junk food.';
      const scores = calculateTPBScores(message);
      
      expect(scores.subjectiveNorm).toBeLessThan(50);
    });

    it('should detect positive perceived control keywords', () => {
      const message = 'I can do this! I have time and it\'s easy to prepare healthy meals.';
      const scores = calculateTPBScores(message);
      
      expect(scores.perceivedControl).toBeGreaterThan(50);
    });

    it('should detect negative perceived control keywords', () => {
      const message = 'I can\'t do this. It\'s too difficult and I don\'t have time or money.';
      const scores = calculateTPBScores(message);
      
      expect(scores.perceivedControl).toBeLessThan(50);
    });

    it('should calculate confidence as average of all constructs', () => {
      const message = 'I love healthy food, my family supports me, and I can do this!';
      const scores = calculateTPBScores(message);
      
      const expectedConfidence = Math.round(
        (scores.attitude + scores.subjectiveNorm + scores.perceivedControl) / 3
      );
      
      expect(scores.confidence).toBe(expectedConfidence);
    });

    it('should clamp scores to 0-100 range', () => {
      const veryPositive = 'healthy delicious nutritious wonderful excellent great love enjoy energizing satisfying';
      const scores = calculateTPBScores(veryPositive);
      
      expect(scores.attitude).toBeLessThanOrEqual(100);
      expect(scores.attitude).toBeGreaterThanOrEqual(0);
    });
  });

  describe('calculateTPBScoresFromHistory', () => {
    it('should return neutral scores for empty history', () => {
      const scores = calculateTPBScoresFromHistory([]);
      
      expect(scores.attitude).toBe(50);
      expect(scores.subjectiveNorm).toBe(50);
      expect(scores.perceivedControl).toBe(50);
      expect(scores.confidence).toBe(50);
    });

    it('should aggregate scores from multiple messages', () => {
      const messages = [
        'I love healthy food',
        'My family supports me',
        'I can do this easily'
      ];
      
      const scores = calculateTPBScoresFromHistory(messages);
      
      expect(scores.attitude).toBeGreaterThan(50);
      expect(scores.subjectiveNorm).toBeGreaterThan(50);
      expect(scores.perceivedControl).toBeGreaterThan(50);
    });

    it('should weight recent messages more heavily with higher alpha', () => {
      const messages = [
        'Healthy food is terrible',  // Old message (negative)
        'I love healthy food now'    // Recent message (positive)
      ];
      
      const scoresLowAlpha = calculateTPBScoresFromHistory(messages, 0.1);
      const scoresHighAlpha = calculateTPBScoresFromHistory(messages, 0.9);
      
      // Higher alpha should give more weight to recent positive message
      expect(scoresHighAlpha.attitude).toBeGreaterThan(scoresLowAlpha.attitude);
    });
  });

  describe('identifyWeakestDeterminant', () => {
    it('should identify attitude as weakest', () => {
      const scores: TPBScores = {
        attitude: 30,
        subjectiveNorm: 70,
        perceivedControl: 60,
        confidence: 53
      };
      
      expect(identifyWeakestDeterminant(scores)).toBe('attitude');
    });

    it('should identify subjectiveNorm as weakest', () => {
      const scores: TPBScores = {
        attitude: 70,
        subjectiveNorm: 25,
        perceivedControl: 60,
        confidence: 52
      };
      
      expect(identifyWeakestDeterminant(scores)).toBe('subjectiveNorm');
    });

    it('should identify perceivedControl as weakest', () => {
      const scores: TPBScores = {
        attitude: 70,
        subjectiveNorm: 65,
        perceivedControl: 20,
        confidence: 52
      };
      
      expect(identifyWeakestDeterminant(scores)).toBe('perceivedControl');
    });
  });

  describe('getConstructDescription', () => {
    it('should return description for attitude', () => {
      const desc = getConstructDescription('attitude');
      expect(desc).toContain('attitude');
      expect(desc).toContain('feel');
    });

    it('should return description for subjectiveNorm', () => {
      const desc = getConstructDescription('subjectiveNorm');
      expect(desc.toLowerCase()).toContain('social');
      expect(desc).toContain('others');
    });

    it('should return description for perceivedControl', () => {
      const desc = getConstructDescription('perceivedControl');
      expect(desc).toContain('confidence');
      expect(desc).toContain('ability');
    });
  });

  describe('interpretScore', () => {
    it('should interpret low scores (0-33)', () => {
      expect(interpretScore(0)).toBe('low');
      expect(interpretScore(20)).toBe('low');
      expect(interpretScore(33)).toBe('low');
    });

    it('should interpret moderate scores (34-66)', () => {
      expect(interpretScore(34)).toBe('moderate');
      expect(interpretScore(50)).toBe('moderate');
      expect(interpretScore(66)).toBe('moderate');
    });

    it('should interpret high scores (67-100)', () => {
      expect(interpretScore(67)).toBe('high');
      expect(interpretScore(85)).toBe('high');
      expect(interpretScore(100)).toBe('high');
    });
  });

  describe('Edge cases', () => {
    it('should handle mixed positive and negative keywords', () => {
      const message = 'I love healthy food but it\'s too expensive and difficult';
      const scores = calculateTPBScores(message);
      
      // Should have some positive attitude but low perceived control
      expect(scores.attitude).toBeGreaterThan(40);
      expect(scores.perceivedControl).toBeLessThan(50);
    });

    it('should handle case-insensitive matching', () => {
      const lower = calculateTPBScores('i love healthy food');
      const upper = calculateTPBScores('I LOVE HEALTHY FOOD');
      const mixed = calculateTPBScores('I LoVe HeAlThY FoOd');
      
      expect(lower.attitude).toBe(upper.attitude);
      expect(lower.attitude).toBe(mixed.attitude);
    });

    it('should handle phrases with spaces', () => {
      const message = 'My family supports me and we cook together';
      const scores = calculateTPBScores(message);
      
      expect(scores.subjectiveNorm).toBeGreaterThan(50);
    });

    it('should avoid partial word matches', () => {
      // "scan" should not match "can"
      const message = 'I need to scan this document';
      const scores = calculateTPBScores(message);
      
      // Should be neutral since "scan" shouldn't match "can"
      expect(scores.perceivedControl).toBe(50);
    });
  });
});
