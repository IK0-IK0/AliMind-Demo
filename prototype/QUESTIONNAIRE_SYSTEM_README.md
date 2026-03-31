# Questionnaire System Documentation

## Overview

The questionnaire system replaces the free-form chat-based assessment with a structured 15-question flow that systematically evaluates:
- **TPB (Theory of Planned Behavior)** constructs: 10 questions
  - Attitude: 5 questions
  - Subjective Norm (Social Support): 3 questions
  - Perceived Behavioral Control (Confidence): 2 questions
- **TTM (Transtheoretical Model)** stage: 5 questions

## Architecture

### Files Created

1. **`src/services/questionnaireService.ts`**
   - Core questionnaire logic
   - Question definitions and scoring
   - State management

2. **`src/components/QuestionnaireFlow.tsx`**
   - UI component for questionnaire
   - Progress tracking
   - Answer selection interface

3. **`src/services/huggingFaceConnector.ts`**
   - Integration with Hugging Face API
   - Context-aware prompt building
   - Conversation management

### Files Modified

1. **`src/pages/DemoPage.tsx`**
   - Added questionnaire flow before chat
   - State management for questionnaire results
   - Conditional rendering

2. **`src/components/ChatbotShowcase.tsx`**
   - Accepts initial TPB/TTM scores
   - Displays questionnaire results
   - Updated welcome message

## User Flow

1. **Start**: User clicks "Start Demo" or similar button
2. **Questionnaire**: User answers 15 questions sequentially
   - Questions 1-5: Attitude toward healthy eating
   - Questions 6-8: Social support
   - Questions 9-10: Confidence/ability
   - Questions 11-15: Readiness stage (TTM)
3. **Scoring**: System calculates TPB scores and TTM stage
4. **Chat**: User enters chat interface with pre-populated scores
5. **Conversation**: Chat uses scores for personalized responses

## Question Structure

### TPB Questions

Each question has 5 options scored 0-100:
- 0: Very negative/low
- 25: Somewhat negative/low
- 50: Neutral/moderate
- 75: Somewhat positive/high
- 100: Very positive/high

**Example (Attitude):**
```typescript
{
  id: 'tpb-att-1',
  type: 'tpb-attitude',
  text: 'How do you feel about eating healthy Filipino food?',
  options: [
    { text: 'Very negative - I don\'t like it at all', value: 0 },
    { text: 'Somewhat negative - Not really my preference', value: 25 },
    { text: 'Neutral - I don\'t have strong feelings', value: 50 },
    { text: 'Somewhat positive - I think it\'s good', value: 75 },
    { text: 'Very positive - I love the idea!', value: 100 }
  ]
}
```

### TTM Questions

Each question has 5 options representing stages (0-4):
- 0: Pre-contemplation
- 1: Contemplation
- 2: Preparation
- 3: Action
- 4: Maintenance

**Example:**
```typescript
{
  id: 'ttm-1',
  type: 'ttm',
  text: 'Are you currently thinking about changing your eating habits?',
  options: [
    { text: 'No, I\'m not interested in changing', value: 0 },
    { text: 'I\'m thinking about it but haven\'t decided', value: 1 },
    { text: 'Yes, I\'m planning to change soon', value: 2 },
    { text: 'Yes, I recently started making changes', value: 3 },
    { text: 'I\'ve been eating healthy for a while now', value: 4 }
  ]
}
```

## Scoring Algorithm

### TPB Scoring

Each construct score is the average of its questions:

```typescript
attitude = average(questions 1-5)
subjectiveNorm = average(questions 6-8)
perceivedControl = average(questions 9-10)
confidence = average(all three constructs)
```

### TTM Scoring

Stage is determined by averaging all TTM question values and rounding:

```typescript
avgStage = average(questions 11-15)
stage = round(avgStage) // Maps to 0-4 (pre-contemplation to maintenance)
```

Confidence is based on answer consistency (low standard deviation = high confidence).

## Hugging Face Integration

### Setup

1. **Get API Key**: Sign up at [huggingface.co](https://huggingface.co)
2. **Set Environment Variable**:
   ```bash
   REACT_APP_HUGGINGFACE_API_KEY=your_api_key_here
   REACT_APP_HUGGINGFACE_MODEL_ID=facebook/blenderbot-400M-distill
   ```

3. **Initialize Connector**:
   ```typescript
   import { createConnectorFromEnv } from './services/huggingFaceConnector';
   
   const connector = createConnectorFromEnv();
   if (connector) {
     connector.initializeConversation(systemPrompt);
   }
   ```

### Usage in Chat

```typescript
// Send message with context
const response = await connector.sendMessage(userMessage, {
  tpbScores: {
    attitude: 75,
    subjectiveNorm: 60,
    perceivedControl: 50
  },
  ttmStage: 'contemplation',
  interventionMode: 'Ambivalence-resolution'
});
```

### Recommended Models

1. **facebook/blenderbot-400M-distill** (Default)
   - Good for conversational responses
   - Fast inference
   - Free tier available

2. **microsoft/DialoGPT-medium**
   - Alternative conversational model
   - Good dialogue quality

3. **Custom Fine-tuned Model**
   - Train on nutrition coaching data
   - Upload to Hugging Face
   - Use: `username/model-name`

## API Integration Example

```typescript
import { HuggingFaceConnector, createNutritionCoachingPrompt } from './services/huggingFaceConnector';

// Initialize
const connector = new HuggingFaceConnector({
  apiKey: 'hf_xxxxxxxxxxxxx',
  modelId: 'facebook/blenderbot-400M-distill'
});

// Set up system prompt with user profile
const systemPrompt = createNutritionCoachingPrompt(
  { attitude: 75, subjectiveNorm: 60, perceivedControl: 50 },
  'contemplation'
);
connector.initializeConversation(systemPrompt);

// Send messages
const response = await connector.sendMessage(
  "I want to eat healthier but my family doesn't support me",
  {
    tpbScores: { attitude: 75, subjectiveNorm: 60, perceivedControl: 50 },
    ttmStage: 'contemplation',
    interventionMode: 'Ambivalence-resolution'
  }
);

console.log(response); // AI-generated personalized response
```

## Testing

### Manual Testing

1. Run the application: `npm run dev`
2. Navigate to Demo page
3. Complete questionnaire
4. Verify scores display correctly
5. Test chat with different scenarios

### Unit Tests

Create tests for:
- Question scoring logic
- State transitions
- Score calculations
- API integration (mocked)

## Customization

### Adding Questions

Edit `src/services/questionnaireService.ts`:

```typescript
const NEW_QUESTION: Question = {
  id: 'tpb-att-6',
  type: 'tpb-attitude',
  text: 'Your question here?',
  options: [
    { text: 'Option 1', value: 0 },
    { text: 'Option 2', value: 25 },
    // ... more options
  ]
};

// Add to appropriate array
const TPB_ATTITUDE_QUESTIONS: Question[] = [
  // ... existing questions
  NEW_QUESTION
];
```

### Changing Scoring

Modify `calculateTPBScoresFromAnswers()` or `calculateTTMStageFromAnswers()` in `questionnaireService.ts`.

### Styling

Update `QuestionnaireFlow.tsx` component styles using Material-UI `sx` prop.

## Troubleshooting

### Questionnaire not showing
- Check `showQuestionnaire` state in `DemoPage.tsx`
- Verify `QuestionnaireFlow` import

### Scores not calculating
- Check browser console for errors
- Verify all questions answered
- Check `answerQuestion()` logic

### Hugging Face API errors
- Verify API key is set correctly
- Check model ID is valid
- Ensure API quota not exceeded
- Check network connectivity

### Chat not receiving scores
- Verify `onComplete` callback in `QuestionnaireFlow`
- Check props passed to `ChatbotShowcase`
- Inspect `questionnaireResults` state

## Future Enhancements

1. **Save Progress**: Allow users to pause and resume
2. **Skip Option**: Let users skip questionnaire (use defaults)
3. **Retake**: Button to retake questionnaire
4. **Analytics**: Track completion rates and answer patterns
5. **Adaptive Questions**: Adjust questions based on previous answers
6. **Multi-language**: Support for Filipino/Tagalog
7. **Accessibility**: Screen reader support, keyboard navigation
