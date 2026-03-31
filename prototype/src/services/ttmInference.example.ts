/**
 * TTM Inference Module - Usage Examples
 * 
 * This file demonstrates how to use the TTM inference module
 * to classify Transtheoretical Model stages from user messages.
 */

import {
  classifyTTMStage,
  classifyTTMStageFromHistory,
  getInterventionMode,
  getStageDescription,
  getStageExplanation
} from './ttmInference';

// Example 1: Classify TTM stage from a single message
console.log('=== Example 1: Single Message Classification ===');
const message1 = "I'm thinking about eating healthier. Maybe I should start soon.";
const stage1 = classifyTTMStage(message1);

console.log('Message:', message1);
console.log('TTM Stage:', stage1.stage);
console.log('Confidence:', stage1.confidence + '%');
console.log('Description:', stage1.description);
console.log('Intervention Mode:', getInterventionMode(stage1.stage));
console.log();

// Example 2: Different stages
console.log('=== Example 2: Different Stage Examples ===');

const examples = [
  "I'm not interested in changing my diet. I'm fine as is.",
  "I'm considering eating healthier but I'm not sure yet.",
  "I'm planning to start meal prepping next week.",
  "I started eating healthy this week and I'm tracking my meals.",
  "I've been maintaining healthy eating habits for months now."
];

examples.forEach((msg, i) => {
  const result = classifyTTMStage(msg);
  console.log(`${i + 1}. "${msg}"`);
  console.log(`   Stage: ${result.stage} (${result.confidence}% confidence)`);
  console.log(`   Intervention: ${getInterventionMode(result.stage)}`);
  console.log();
});

// Example 3: Classify from conversation history
console.log('=== Example 3: Conversation History ===');
const conversationHistory = [
  "I don't really think about healthy eating much.",
  "Well, maybe I should consider it.",
  "I'm starting to plan some changes.",
  "I'm actively working on eating better now!"
];

const historicalStage = classifyTTMStageFromHistory(conversationHistory, 0.4);

console.log('Conversation History:');
conversationHistory.forEach((msg, i) => console.log(`  ${i + 1}. ${msg}`));
console.log();
console.log('Current Stage:', historicalStage.stage);
console.log('Confidence:', historicalStage.confidence + '%');
console.log('Explanation:', getStageExplanation(historicalStage.stage));
console.log();

// Example 4: Different smoothing factors
console.log('=== Example 4: Smoothing Factor Impact ===');
const messages = [
  "I'm not interested in changing.",           // Old: Pre-contemplation
  "I'm actively eating healthy now!"           // Recent: Action
];

const lowAlpha = classifyTTMStageFromHistory(messages, 0.1);  // Less weight on recent
const highAlpha = classifyTTMStageFromHistory(messages, 0.9); // More weight on recent

console.log('Messages:');
messages.forEach((msg, i) => console.log(`  ${i + 1}. ${msg}`));
console.log();
console.log('Low Alpha (0.1) - Less weight on recent:', lowAlpha.stage, `(${lowAlpha.confidence}%)`);
console.log('High Alpha (0.9) - More weight on recent:', highAlpha.stage, `(${highAlpha.confidence}%)`);
console.log();

// Example 5: Real-world chatbot integration
console.log('=== Example 5: Chatbot Integration ===');

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

const chatHistory: ChatMessage[] = [
  { sender: 'user', text: 'Tell me about healthy eating.' },
  { sender: 'bot', text: 'Healthy eating involves balanced nutrition. Are you interested in making changes?' },
  { sender: 'user', text: 'I\'m thinking about it. I know I should but I\'m not sure.' },
  { sender: 'bot', text: 'That\'s a great first step! What concerns do you have?' },
  { sender: 'user', text: 'I\'m worried it will be too difficult and expensive.' }
];

// Extract only user messages for TTM classification
const userMessages = chatHistory
  .filter(msg => msg.sender === 'user')
  .map(msg => msg.text);

const chatStage = classifyTTMStageFromHistory(userMessages);
const interventionMode = getInterventionMode(chatStage.stage);

console.log('Chat History:');
chatHistory.forEach(msg => {
  console.log(`  ${msg.sender.toUpperCase()}: ${msg.text}`);
});
console.log();
console.log('TTM Analysis:');
console.log('  Current Stage:', chatStage.stage);
console.log('  Confidence:', chatStage.confidence + '%');
console.log('  Intervention Mode:', interventionMode);
console.log('  Explanation:', getStageExplanation(chatStage.stage));
console.log();

// Example 6: Stage progression tracking
console.log('=== Example 6: Stage Progression Tracking ===');

const progressionMessages = [
  { week: 1, message: "I'm not really interested in changing my diet." },
  { week: 2, message: "I've been thinking about eating healthier lately." },
  { week: 3, message: "I'm planning to start next week. I've been researching recipes." },
  { week: 4, message: "I started meal prepping this week!" },
  { week: 8, message: "I've been maintaining healthy eating for a month now." }
];

console.log('Stage Progression Over Time:');
progressionMessages.forEach(({ week, message }) => {
  const result = classifyTTMStage(message);
  console.log(`Week ${week}: ${result.stage}`);
  console.log(`  Message: "${message}"`);
  console.log(`  Confidence: ${result.confidence}%`);
  console.log();
});

// Example 7: Intervention mode selection
console.log('=== Example 7: Intervention Mode Selection ===');

const stageInterventions = [
  { stage: 'preContemplation' as const, focus: 'Raise awareness of benefits and risks' },
  { stage: 'contemplation' as const, focus: 'Resolve ambivalence, tip decisional balance' },
  { stage: 'preparation' as const, focus: 'Help create concrete action plans' },
  { stage: 'action' as const, focus: 'Provide coping strategies and support' },
  { stage: 'maintenance' as const, focus: 'Prevent relapse and sustain changes' }
];

console.log('Intervention Strategies by Stage:');
stageInterventions.forEach(({ stage, focus }) => {
  console.log(`${stage}:`);
  console.log(`  Mode: ${getInterventionMode(stage)}`);
  console.log(`  Focus: ${focus}`);
  console.log(`  Description: ${getStageDescription(stage)}`);
  console.log();
});

// Example 8: UI display helpers
console.log('=== Example 8: UI Display Helpers ===');

function getStageColor(stage: string): string {
  const colors: Record<string, string> = {
    preContemplation: 'gray',
    contemplation: 'blue',
    preparation: 'yellow',
    action: 'orange',
    maintenance: 'green'
  };
  return colors[stage] || 'gray';
}

function getStageEmoji(stage: string): string {
  const emojis: Record<string, string> = {
    preContemplation: '😴',
    contemplation: '🤔',
    preparation: '📝',
    action: '💪',
    maintenance: '✅'
  };
  return emojis[stage] || '❓';
}

function getStageProgress(stage: string): number {
  const progress: Record<string, number> = {
    preContemplation: 0,
    contemplation: 25,
    preparation: 50,
    action: 75,
    maintenance: 100
  };
  return progress[stage] || 0;
}

const exampleStage = classifyTTMStage("I'm planning to start eating healthy next week!");

console.log('Stage:', exampleStage.stage, getStageEmoji(exampleStage.stage));
console.log('Color:', getStageColor(exampleStage.stage));
console.log('Progress:', getStageProgress(exampleStage.stage) + '%');
console.log('Confidence:', exampleStage.confidence + '%');
console.log();

// Example 9: Temporal context detection
console.log('=== Example 9: Temporal Context Detection ===');

const temporalExamples = [
  { message: "I used to eat healthy before.", expected: "Past behavior (not current)" },
  { message: "I'm eating healthy now.", expected: "Current action" },
  { message: "I will start eating healthy next week.", expected: "Future plan" },
  { message: "I've been eating healthy for months.", expected: "Long-term maintenance" }
];

console.log('Temporal Context Examples:');
temporalExamples.forEach(({ message, expected }) => {
  const result = classifyTTMStage(message);
  console.log(`"${message}"`);
  console.log(`  Expected: ${expected}`);
  console.log(`  Classified: ${result.stage} (${result.confidence}% confidence)`);
  console.log();
});

// Example 10: Combined TPB + TTM analysis
console.log('=== Example 10: Combined TPB + TTM Analysis ===');

import { calculateTPBScores, identifyWeakestDeterminant } from './tpbInference';

const userMessage = "I'm thinking about eating healthier but I don't have time and my family doesn't support it.";

const tpbScores = calculateTPBScores(userMessage);
const ttmStage = classifyTTMStage(userMessage);
const weakestTPB = identifyWeakestDeterminant(tpbScores);
const intervention = getInterventionMode(ttmStage.stage);

console.log('User Message:', userMessage);
console.log();
console.log('TPB Analysis:');
console.log('  Attitude:', tpbScores.attitude);
console.log('  Subjective Norm:', tpbScores.subjectiveNorm);
console.log('  Perceived Control:', tpbScores.perceivedControl);
console.log('  Weakest Determinant:', weakestTPB);
console.log();
console.log('TTM Analysis:');
console.log('  Stage:', ttmStage.stage);
console.log('  Confidence:', ttmStage.confidence + '%');
console.log('  Intervention Mode:', intervention);
console.log();
console.log('Recommendation:');
console.log(`  Use ${intervention} intervention targeting ${weakestTPB}`);
console.log(`  ${getStageExplanation(ttmStage.stage)}`);
