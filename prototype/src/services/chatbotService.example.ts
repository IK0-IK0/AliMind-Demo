/**
 * Example usage of the chatbotService
 * Demonstrates the seven-step computational pipeline in action
 */

import { processChatMessage } from './chatbotService';

console.log('='.repeat(80));
console.log('CHATBOT SERVICE - SEVEN-STEP PIPELINE EXAMPLES');
console.log('='.repeat(80));

// Example 1: Pre-contemplation stage (not ready to change)
console.log('\n📝 Example 1: Pre-contemplation Stage');
console.log('-'.repeat(80));
const example1 = processChatMessage(
  "I'm not really interested in changing my diet. I'm fine with what I eat now."
);
console.log('User Message:', "I'm not really interested in changing my diet. I'm fine with what I eat now.");
console.log('\nTPB Scores:');
console.log('  - Attitude:', example1.tpbScores.attitude);
console.log('  - Subjective Norm:', example1.tpbScores.subjectiveNorm);
console.log('  - Perceived Control:', example1.tpbScores.perceivedControl);
console.log('\nTTM Stage:', example1.ttmStage.stage, `(${example1.ttmStage.confidence}% confidence)`);
console.log('Intervention Mode:', example1.interventionMode);
console.log('Selected BCT:', `${example1.bct.bctId} - ${example1.bct.bctName}`);
console.log('Target Determinant:', example1.bct.targetDeterminant);
console.log('\nRecommended Recipes:');
example1.recommendedRecipes.forEach((recipe, i) => {
  console.log(`  ${i + 1}. ${recipe.name} (${recipe.prepTime + recipe.cookTime} min, ${recipe.calories} cal)`);
});
console.log('\nBot Response:');
console.log(example1.message);

// Example 2: Contemplation stage (thinking about change)
console.log('\n\n📝 Example 2: Contemplation Stage');
console.log('-'.repeat(80));
const example2 = processChatMessage(
  "I've been thinking about eating healthier, but I'm not sure if I can do it. What if it's too expensive?"
);
console.log('User Message:', "I've been thinking about eating healthier, but I'm not sure if I can do it. What if it's too expensive?");
console.log('\nTPB Scores:');
console.log('  - Attitude:', example2.tpbScores.attitude);
console.log('  - Subjective Norm:', example2.tpbScores.subjectiveNorm);
console.log('  - Perceived Control:', example2.tpbScores.perceivedControl);
console.log('\nTTM Stage:', example2.ttmStage.stage, `(${example2.ttmStage.confidence}% confidence)`);
console.log('Intervention Mode:', example2.interventionMode);
console.log('Selected BCT:', `${example2.bct.bctId} - ${example2.bct.bctName}`);
console.log('Target Determinant:', example2.bct.targetDeterminant);
console.log('\nRecommended Recipes:');
example2.recommendedRecipes.forEach((recipe, i) => {
  console.log(`  ${i + 1}. ${recipe.name} (${recipe.prepTime + recipe.cookTime} min, ${recipe.calories} cal)`);
});
console.log('\nBot Response:');
console.log(example2.message);

// Example 3: Preparation stage (planning to change)
console.log('\n\n📝 Example 3: Preparation Stage');
console.log('-'.repeat(80));
const example3 = processChatMessage(
  "I'm planning to start eating healthier next week. I need some quick and easy recipes for breakfast."
);
console.log('User Message:', "I'm planning to start eating healthier next week. I need some quick and easy recipes for breakfast.");
console.log('\nTPB Scores:');
console.log('  - Attitude:', example3.tpbScores.attitude);
console.log('  - Subjective Norm:', example3.tpbScores.subjectiveNorm);
console.log('  - Perceived Control:', example3.tpbScores.perceivedControl);
console.log('\nTTM Stage:', example3.ttmStage.stage, `(${example3.ttmStage.confidence}% confidence)`);
console.log('Intervention Mode:', example3.interventionMode);
console.log('Selected BCT:', `${example3.bct.bctId} - ${example3.bct.bctName}`);
console.log('Target Determinant:', example3.bct.targetDeterminant);
console.log('\nRecommended Recipes:');
example3.recommendedRecipes.forEach((recipe, i) => {
  console.log(`  ${i + 1}. ${recipe.name} (${recipe.prepTime + recipe.cookTime} min, ${recipe.calories} cal)`);
});
console.log('\nBot Response:');
console.log(example3.message);

// Example 4: Action stage (actively changing)
console.log('\n\n📝 Example 4: Action Stage');
console.log('-'.repeat(80));
const example4 = processChatMessage(
  "I've been eating healthier for the past two weeks! I'm looking for high protein meals that I can cook quickly after the gym."
);
console.log('User Message:', "I've been eating healthier for the past two weeks! I'm looking for high protein meals that I can cook quickly after the gym.");
console.log('\nTPB Scores:');
console.log('  - Attitude:', example4.tpbScores.attitude);
console.log('  - Subjective Norm:', example4.tpbScores.subjectiveNorm);
console.log('  - Perceived Control:', example4.tpbScores.perceivedControl);
console.log('\nTTM Stage:', example4.ttmStage.stage, `(${example4.ttmStage.confidence}% confidence)`);
console.log('Intervention Mode:', example4.interventionMode);
console.log('Selected BCT:', `${example4.bct.bctId} - ${example4.bct.bctName}`);
console.log('Target Determinant:', example4.bct.targetDeterminant);
console.log('\nRecommended Recipes:');
example4.recommendedRecipes.forEach((recipe, i) => {
  console.log(`  ${i + 1}. ${recipe.name} (${recipe.prepTime + recipe.cookTime} min, ${recipe.calories} cal)`);
});
console.log('\nBot Response:');
console.log(example4.message);

// Example 5: Maintenance stage (sustaining change)
console.log('\n\n📝 Example 5: Maintenance Stage');
console.log('-'.repeat(80));
const example5 = processChatMessage(
  "I've been maintaining my healthy eating habits for months now. It's become a natural part of my lifestyle. Looking for new recipe ideas to keep things interesting."
);
console.log('User Message:', "I've been maintaining my healthy eating habits for months now. It's become a natural part of my lifestyle. Looking for new recipe ideas to keep things interesting.");
console.log('\nTPB Scores:');
console.log('  - Attitude:', example5.tpbScores.attitude);
console.log('  - Subjective Norm:', example5.tpbScores.subjectiveNorm);
console.log('  - Perceived Control:', example5.tpbScores.perceivedControl);
console.log('\nTTM Stage:', example5.ttmStage.stage, `(${example5.ttmStage.confidence}% confidence)`);
console.log('Intervention Mode:', example5.interventionMode);
console.log('Selected BCT:', `${example5.bct.bctId} - ${example5.bct.bctName}`);
console.log('Target Determinant:', example5.bct.targetDeterminant);
console.log('\nRecommended Recipes:');
example5.recommendedRecipes.forEach((recipe, i) => {
  console.log(`  ${i + 1}. ${recipe.name} (${recipe.prepTime + recipe.cookTime} min, ${recipe.calories} cal)`);
});
console.log('\nBot Response:');
console.log(example5.message);

// Example 6: Complex constraints
console.log('\n\n📝 Example 6: Complex Constraints');
console.log('-'.repeat(80));
const example6 = processChatMessage(
  "I need a cheap, quick, easy vegetarian dinner recipe. I don't have much time or cooking skills."
);
console.log('User Message:', "I need a cheap, quick, easy vegetarian dinner recipe. I don't have much time or cooking skills.");
console.log('\nExtracted Context:');
console.log('  - Time Category: quick');
console.log('  - Budget: low');
console.log('  - Difficulty: easy');
console.log('  - Dietary Restrictions: vegetarian');
console.log('  - Meal Type: dinner');
console.log('\nRecommended Recipes:');
example6.recommendedRecipes.forEach((recipe, i) => {
  console.log(`  ${i + 1}. ${recipe.name}`);
  console.log(`     Time: ${recipe.prepTime + recipe.cookTime} min | Difficulty: ${recipe.difficulty} | Budget: ${recipe.budget}`);
  console.log(`     Tags: ${recipe.tags.join(', ')}`);
});

console.log('\n' + '='.repeat(80));
console.log('DISCLAIMER');
console.log('='.repeat(80));
console.log(example1.disclaimer);
console.log('='.repeat(80));
