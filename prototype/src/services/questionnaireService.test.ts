/**
 * Tests for questionnaireService
 */

import { describe, it, expect } from 'vitest';
import {
  initializeQuestionnaire,
  answerQuestion,
  getCurrentQuestion,
  getProgress,
  ALL_QUESTIONS
} from './questionnaireService';

describe('questionnaireService', () => {
  describe('initializeQuestionnaire', () => {
    it('should initialize with correct default state', () => {
      const state = initializeQuestionnaire();
      
      expect(state.currentQuestionIndex).toBe(0);
      expect(state.isComplete).toBe(false);
      expect(state.answers.size).toBe(0);
      expect(state.tpbScores).toBeNull();
      expect(state.ttmStage).toBeNull();
    });
  });

  describe('getCurrentQuestion', () => {
    it('should return first question initially', () => {
      const state = initializeQuestionnaire();
      const question = getCurrentQuestion(state);
      
      expect(question).toBeDefined();
      expect(question?.id).toBe(ALL_QUESTIONS[0].id);
    });

    it('should return null when questionnaire is complete', () => {
      let state = initializeQuestionnaire();
      
      // Answer all questions
      ALL_QUESTIONS.forEach(q => {
        state = answerQuestion(state, q.id, 50);
      });
      
      const question = getCurrentQuestion(state);
      expect(question).toBeNull();
    });
  });

  describe('answerQuestion', () => {
    it('should record answer and advance to next question', () => {
      let state = initializeQuestionnaire();
      const firstQuestion = getCurrentQuestion(state)!;
      
      state = answerQuestion(state, firstQuestion.id, 75);
      
      expect(state.currentQuestionIndex).toBe(1);
      expect(state.answers.get(firstQuestion.id)).toBe(75);
      expect(state.isComplete).toBe(false);
    });

    it('should mark as complete after last question', () => {
      let state = initializeQuestionnaire();
      
      // Answer all questions
      ALL_QUESTIONS.forEach(q => {
        state = answerQuestion(state, q.id, 50);
      });
      
      expect(state.isComplete).toBe(true);
      expect(state.tpbScores).toBeDefined();
      expect(state.ttmStage).toBeDefined();
    });
  });

  describe('getProgress', () => {
    it('should return 0% initially', () => {
      const state = initializeQuestionnaire();
      expect(getProgress(state)).toBe(0);
    });

    it('should return 100% when complete', () => {
      let state = initializeQuestionnaire();
      
      ALL_QUESTIONS.forEach(q => {
        state = answerQuestion(state, q.id, 50);
      });
      
      expect(getProgress(state)).toBe(100);
    });

    it('should return correct percentage midway', () => {
      let state = initializeQuestionnaire();
      const halfwayPoint = Math.floor(ALL_QUESTIONS.length / 2);
      
      for (let i = 0; i < halfwayPoint; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 50);
      }
      
      const progress = getProgress(state);
      expect(progress).toBeGreaterThan(40);
      expect(progress).toBeLessThan(60);
    });
  });

  describe('TPB Score Calculation', () => {
    it('should calculate high scores correctly', () => {
      let state = initializeQuestionnaire();
      
      // Answer all TPB questions with high scores
      for (let i = 0; i < 10; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 90);
      }
      
      // Answer TTM questions
      for (let i = 10; i < 15; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 2);
      }
      
      expect(state.tpbScores?.attitude).toBeGreaterThan(80);
      expect(state.tpbScores?.subjectiveNorm).toBeGreaterThan(80);
      expect(state.tpbScores?.perceivedControl).toBeGreaterThan(80);
      expect(state.tpbScores?.confidence).toBeGreaterThan(80);
    });

    it('should calculate low scores correctly', () => {
      let state = initializeQuestionnaire();
      
      // Answer all TPB questions with low scores
      for (let i = 0; i < 10; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 10);
      }
      
      // Answer TTM questions
      for (let i = 10; i < 15; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 0);
      }
      
      expect(state.tpbScores?.attitude).toBeLessThan(20);
      expect(state.tpbScores?.subjectiveNorm).toBeLessThan(20);
      expect(state.tpbScores?.perceivedControl).toBeLessThan(20);
      expect(state.tpbScores?.confidence).toBeLessThan(20);
    });

    it('should calculate mixed scores correctly', () => {
      let state = initializeQuestionnaire();
      
      // High attitude (questions 0-4)
      for (let i = 0; i < 5; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 80);
      }
      
      // Low subjective norm (questions 5-7)
      for (let i = 5; i < 8; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 20);
      }
      
      // Moderate perceived control (questions 8-9)
      for (let i = 8; i < 10; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 50);
      }
      
      // Answer TTM questions
      for (let i = 10; i < 15; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 1);
      }
      
      expect(state.tpbScores?.attitude).toBeGreaterThan(70);
      expect(state.tpbScores?.subjectiveNorm).toBeLessThan(30);
      expect(state.tpbScores?.perceivedControl).toBeGreaterThan(40);
      expect(state.tpbScores?.perceivedControl).toBeLessThan(60);
    });
  });

  describe('TTM Stage Classification', () => {
    it('should classify pre-contemplation correctly', () => {
      let state = initializeQuestionnaire();
      
      // Answer TPB questions
      for (let i = 0; i < 10; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 50);
      }
      
      // Pre-contemplation (value: 0)
      for (let i = 10; i < 15; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 0);
      }
      
      expect(state.ttmStage?.stage).toBe('preContemplation');
    });

    it('should classify contemplation correctly', () => {
      let state = initializeQuestionnaire();
      
      for (let i = 0; i < 10; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 50);
      }
      
      // Contemplation (value: 1)
      for (let i = 10; i < 15; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 1);
      }
      
      expect(state.ttmStage?.stage).toBe('contemplation');
    });

    it('should classify preparation correctly', () => {
      let state = initializeQuestionnaire();
      
      for (let i = 0; i < 10; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 50);
      }
      
      // Preparation (value: 2)
      for (let i = 10; i < 15; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 2);
      }
      
      expect(state.ttmStage?.stage).toBe('preparation');
    });

    it('should classify action correctly', () => {
      let state = initializeQuestionnaire();
      
      for (let i = 0; i < 10; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 50);
      }
      
      // Action (value: 3)
      for (let i = 10; i < 15; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 3);
      }
      
      expect(state.ttmStage?.stage).toBe('action');
    });

    it('should classify maintenance correctly', () => {
      let state = initializeQuestionnaire();
      
      for (let i = 0; i < 10; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 50);
      }
      
      // Maintenance (value: 4)
      for (let i = 10; i < 15; i++) {
        state = answerQuestion(state, ALL_QUESTIONS[i].id, 4);
      }
      
      expect(state.ttmStage?.stage).toBe('maintenance');
    });

    it('should have higher confidence with consistent answers', () => {
      let state1 = initializeQuestionnaire();
      let state2 = initializeQuestionnaire();
      
      // Answer TPB questions
      for (let i = 0; i < 10; i++) {
        state1 = answerQuestion(state1, ALL_QUESTIONS[i].id, 50);
        state2 = answerQuestion(state2, ALL_QUESTIONS[i].id, 50);
      }
      
      // Consistent answers (all same stage)
      for (let i = 10; i < 15; i++) {
        state1 = answerQuestion(state1, ALL_QUESTIONS[i].id, 2);
      }
      
      // Inconsistent answers (mixed stages)
      state2 = answerQuestion(state2, ALL_QUESTIONS[10].id, 0);
      state2 = answerQuestion(state2, ALL_QUESTIONS[11].id, 2);
      state2 = answerQuestion(state2, ALL_QUESTIONS[12].id, 4);
      state2 = answerQuestion(state2, ALL_QUESTIONS[13].id, 1);
      state2 = answerQuestion(state2, ALL_QUESTIONS[14].id, 3);
      
      expect(state1.ttmStage?.confidence).toBeGreaterThan(state2.ttmStage?.confidence || 0);
    });
  });

  describe('ALL_QUESTIONS', () => {
    it('should have exactly 15 questions', () => {
      expect(ALL_QUESTIONS.length).toBe(15);
    });

    it('should have 5 attitude questions', () => {
      const attitudeQuestions = ALL_QUESTIONS.filter(q => q.type === 'tpb-attitude');
      expect(attitudeQuestions.length).toBe(5);
    });

    it('should have 3 subjective norm questions', () => {
      const snQuestions = ALL_QUESTIONS.filter(q => q.type === 'tpb-subjective-norm');
      expect(snQuestions.length).toBe(3);
    });

    it('should have 2 perceived control questions', () => {
      const pcQuestions = ALL_QUESTIONS.filter(q => q.type === 'tpb-perceived-control');
      expect(pcQuestions.length).toBe(2);
    });

    it('should have 5 TTM questions', () => {
      const ttmQuestions = ALL_QUESTIONS.filter(q => q.type === 'ttm');
      expect(ttmQuestions.length).toBe(5);
    });

    it('should have unique IDs', () => {
      const ids = ALL_QUESTIONS.map(q => q.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have 5 options per question', () => {
      ALL_QUESTIONS.forEach(q => {
        expect(q.options.length).toBe(5);
      });
    });
  });
});
