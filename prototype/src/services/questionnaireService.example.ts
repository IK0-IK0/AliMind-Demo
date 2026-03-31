/**
 * Example usage of questionnaireService
 */

import {
  initializeQuestionnaire,
  answerQuestion,
  getCurrentQuestion,
  getProgress,
  ALL_QUESTIONS
} from './questionnaireService';

// Example 1: Basic questionnaire flow
console.log('=== Example 1: Basic Questionnaire Flow ===\n');

let state = initializeQuestionnaire();
console.log('Initial state:', {
  currentIndex: state.currentQuestionIndex,
  isComplete: state.isComplete,
  totalQuestions: ALL_QUESTIONS.length
});

// Answer first question
const firstQuestion = getCurrentQuestion(state);
console.log('\nFirst question:', firstQuestion?.text);
console.log('Options:', firstQuestion?.options.map(o => o.text));

// User selects option 3 (value: 75)
state = answerQuestion(state, firstQuestion!.id, 75);
console.log('\nAfter answering:', {
  currentIndex: state.currentQuestionIndex,
  progress: getProgress(state) + '%'
});

// Example 2: Complete questionnaire simulation
console.log('\n=== Example 2: Complete Questionnaire ===\n');

state = initializeQuestionnaire();

// Simulate answering all questions with moderate scores
ALL_QUESTIONS.forEach((question, index) => {
  const selectedValue = 50 + Math.floor(Math.random() * 30); // Random 50-80
  state = answerQuestion(state, question.id, selectedValue);
  
  if (index % 5 === 0) {
    console.log(`Progress: ${getProgress(state)}%`);
  }
});

console.log('\nQuestionnaire complete!');
console.log('TPB Scores:', state.tpbScores);
console.log('TTM Stage:', state.ttmStage);

// Example 3: Different user profiles
console.log('\n=== Example 3: User Profile - High Motivation ===\n');

state = initializeQuestionnaire();

// High scores for all TPB questions (questions 0-9)
for (let i = 0; i < 10; i++) {
  const question = ALL_QUESTIONS[i];
  state = answerQuestion(state, question.id, 90); // High score
}

// Action stage for TTM (questions 10-14)
for (let i = 10; i < 15; i++) {
  const question = ALL_QUESTIONS[i];
  state = answerQuestion(state, question.id, 3); // Action stage
}

console.log('High Motivation Profile:');
console.log('TPB Scores:', state.tpbScores);
console.log('TTM Stage:', state.ttmStage);

// Example 4: Low readiness profile
console.log('\n=== Example 4: User Profile - Low Readiness ===\n');

state = initializeQuestionnaire();

// Low scores for TPB
for (let i = 0; i < 10; i++) {
  const question = ALL_QUESTIONS[i];
  state = answerQuestion(state, question.id, 20); // Low score
}

// Pre-contemplation for TTM
for (let i = 10; i < 15; i++) {
  const question = ALL_QUESTIONS[i];
  state = answerQuestion(state, question.id, 0); // Pre-contemplation
}

console.log('Low Readiness Profile:');
console.log('TPB Scores:', state.tpbScores);
console.log('TTM Stage:', state.ttmStage);

// Example 5: Mixed profile (common scenario)
console.log('\n=== Example 5: User Profile - Mixed (Realistic) ===\n');

state = initializeQuestionnaire();

// Attitude: High (75-100)
for (let i = 0; i < 5; i++) {
  state = answerQuestion(state, ALL_QUESTIONS[i].id, 80);
}

// Subjective Norm: Low (0-40)
for (let i = 5; i < 8; i++) {
  state = answerQuestion(state, ALL_QUESTIONS[i].id, 30);
}

// Perceived Control: Moderate (40-60)
for (let i = 8; i < 10; i++) {
  state = answerQuestion(state, ALL_QUESTIONS[i].id, 50);
}

// TTM: Contemplation (value: 1)
for (let i = 10; i < 15; i++) {
  state = answerQuestion(state, ALL_QUESTIONS[i].id, 1);
}

console.log('Mixed Profile (High attitude, Low social support, Moderate confidence):');
console.log('TPB Scores:', state.tpbScores);
console.log('TTM Stage:', state.ttmStage);
console.log('\nInterpretation:');
console.log('- User wants to eat healthy (positive attitude)');
console.log('- But lacks family/friend support (low subjective norm)');
console.log('- Has some confidence but not fully ready (moderate control)');
console.log('- Currently thinking about change (contemplation stage)');
console.log('- Intervention should focus on building social support!');

// Example 6: Question type breakdown
console.log('\n=== Example 6: Question Type Breakdown ===\n');

const questionsByType = {
  'tpb-attitude': ALL_QUESTIONS.filter(q => q.type === 'tpb-attitude'),
  'tpb-subjective-norm': ALL_QUESTIONS.filter(q => q.type === 'tpb-subjective-norm'),
  'tpb-perceived-control': ALL_QUESTIONS.filter(q => q.type === 'tpb-perceived-control'),
  'ttm': ALL_QUESTIONS.filter(q => q.type === 'ttm')
};

Object.entries(questionsByType).forEach(([type, questions]) => {
  console.log(`\n${type}: ${questions.length} questions`);
  questions.forEach((q, i) => {
    console.log(`  ${i + 1}. ${q.text.substring(0, 50)}...`);
  });
});
