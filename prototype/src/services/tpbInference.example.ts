/**
 * TPB Inference Module - Usage Examples
 * 
 * This file demonstrates how to use the TPB inference module
 * to calculate Theory of Planned Behavior scores from user messages.
 */

import {
  calculateTPBScores,
  calculateTPBScoresFromHistory,
  identifyWeakestDeterminant,
  getConstructDescription,
  interpretScore
} from './tpbInference';

// Example 1: Calculate TPB scores from a single message
console.log('=== Example 1: Single Message ===');
const message1 = "I love healthy food! My family supports me and I can easily prepare nutritious meals.";
const scores1 = calculateTPBScores(message1);

console.log('Message:', message1);
console.log('TPB Scores:', scores1);
console.log('Attitude:', scores1.attitude, '-', interpretScore(scores1.attitude));
console.log('Subjective Norm:', scores1.subjectiveNorm, '-', interpretScore(scores1.subjectiveNorm));
console.log('Perceived Control:', scores1.perceivedControl, '-', interpretScore(scores1.perceivedControl));
console.log('Overall Confidence:', scores1.confidence);
console.log();

// Example 2: Identify the weakest determinant (main barrier)
console.log('=== Example 2: Identify Main Barrier ===');
const message2 = "I know healthy eating is good, but I don't have time and it's too expensive.";
const scores2 = calculateTPBScores(message2);
const weakest = identifyWeakestDeterminant(scores2);

console.log('Message:', message2);
console.log('TPB Scores:', scores2);
console.log('Weakest Determinant:', weakest);
console.log('Description:', getConstructDescription(weakest));
console.log();

// Example 3: Calculate scores from conversation history
console.log('=== Example 3: Conversation History ===');
const conversationHistory = [
  "I want to eat healthier but I don't know where to start.",
  "My family doesn't really support healthy eating.",
  "I'm starting to feel more confident about making changes.",
  "I found some easy recipes that I can try!"
];

const historicalScores = calculateTPBScoresFromHistory(conversationHistory, 0.3);

console.log('Conversation History:');
conversationHistory.forEach((msg, i) => console.log(`  ${i + 1}. ${msg}`));
console.log();
console.log('Aggregated TPB Scores:', historicalScores);
console.log('Attitude:', historicalScores.attitude, '-', interpretScore(historicalScores.attitude));
console.log('Subjective Norm:', historicalScores.subjectiveNorm, '-', interpretScore(historicalScores.subjectiveNorm));
console.log('Perceived Control:', historicalScores.perceivedControl, '-', interpretScore(historicalScores.perceivedControl));
console.log();

// Example 4: Different smoothing factors
console.log('=== Example 4: Smoothing Factor Impact ===');
const messages = [
  "Healthy food is terrible and boring.",  // Old negative message
  "Actually, I'm starting to enjoy healthy meals now!"  // Recent positive message
];

const lowAlpha = calculateTPBScoresFromHistory(messages, 0.1);  // Less weight on recent
const highAlpha = calculateTPBScoresFromHistory(messages, 0.9); // More weight on recent

console.log('Messages:');
messages.forEach((msg, i) => console.log(`  ${i + 1}. ${msg}`));
console.log();
console.log('Low Alpha (0.1) - Less weight on recent:', lowAlpha.attitude);
console.log('High Alpha (0.9) - More weight on recent:', highAlpha.attitude);
console.log('Difference:', highAlpha.attitude - lowAlpha.attitude, 'points');
console.log();

// Example 5: Real-world chatbot integration
console.log('=== Example 5: Chatbot Integration ===');

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

const chatHistory: ChatMessage[] = [
  { sender: 'user', text: 'I want to lose weight but I love junk food.' },
  { sender: 'bot', text: 'I understand. What specific challenges do you face?' },
  { sender: 'user', text: 'My friends always eat fast food and I feel pressured to join them.' },
  { sender: 'bot', text: 'Social situations can be challenging. How do you feel about healthy eating?' },
  { sender: 'user', text: 'I know it\'s good for me but it seems so difficult and expensive.' }
];

// Extract only user messages for TPB scoring
const userMessages = chatHistory
  .filter(msg => msg.sender === 'user')
  .map(msg => msg.text);

const chatScores = calculateTPBScoresFromHistory(userMessages);
const mainBarrier = identifyWeakestDeterminant(chatScores);

console.log('Chat History:');
chatHistory.forEach(msg => {
  console.log(`  ${msg.sender.toUpperCase()}: ${msg.text}`);
});
console.log();
console.log('TPB Analysis:');
console.log('  Attitude:', chatScores.attitude, '-', interpretScore(chatScores.attitude));
console.log('  Subjective Norm:', chatScores.subjectiveNorm, '-', interpretScore(chatScores.subjectiveNorm));
console.log('  Perceived Control:', chatScores.perceivedControl, '-', interpretScore(chatScores.perceivedControl));
console.log();
console.log('Main Barrier:', mainBarrier);
console.log('Recommendation: Focus intervention on', getConstructDescription(mainBarrier));
console.log();

// Example 6: Score interpretation for UI display
console.log('=== Example 6: UI Display Helper ===');

function getScoreColor(score: number): string {
  const level = interpretScore(score);
  return level === 'low' ? 'red' : level === 'moderate' ? 'yellow' : 'green';
}

function getScoreEmoji(score: number): string {
  const level = interpretScore(score);
  return level === 'low' ? '😟' : level === 'moderate' ? '😐' : '😊';
}

const exampleScores = calculateTPBScores("I'm confident I can make healthy changes!");

console.log('Attitude:', exampleScores.attitude, getScoreEmoji(exampleScores.attitude), `(${getScoreColor(exampleScores.attitude)})`);
console.log('Subjective Norm:', exampleScores.subjectiveNorm, getScoreEmoji(exampleScores.subjectiveNorm), `(${getScoreColor(exampleScores.subjectiveNorm)})`);
console.log('Perceived Control:', exampleScores.perceivedControl, getScoreEmoji(exampleScores.perceivedControl), `(${getScoreColor(exampleScores.perceivedControl)})`);
