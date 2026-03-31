# Conversational Questionnaire System

## Overview

The system now uses a **conversational questionnaire** approach where:
1. Bot asks questions one by one in the chat interface
2. User types free-text answers
3. System infers scores from text using keyword matching
4. After 20 questions, TPB/TTM scores are calculated
5. User can then chat normally with personalized responses

## Flow

```
User opens chat
    ↓
Bot: "Ready to answer 20 questions?"
    ↓
User: "Yes" / "Ready" / "Start"
    ↓
Bot: "Question 1 of 20: How do you feel about eating healthy Filipino food?"
    ↓
User: "I think it's good and beneficial"
    ↓
[System infers score: 75 (keyword "good" matched)]
    ↓
Bot: "Question 2 of 20: Do you believe healthy eating would improve your energy?"
    ↓
User: "Definitely, I'm sure it would help"
    ↓
[System infers score: 100 (keyword "definitely" matched)]
    ↓
... continues for 20 questions ...
    ↓
Bot: "Thank you! Your profile:
      - Attitude: 82/100
      - Social Support: 45/100
      - Confidence: 60/100
      - Stage: Contemplation
      
      How can I help you?"
    ↓
Normal chat continues with personalized responses
```

## Question Structure

### 20 Questions Total

1. **TPB Attitude (5 questions)** - How they feel about healthy eating
2. **TPB Subjective Norm (5 questions)** - Social support from family/friends
3. **TPB Perceived Control (5 questions)** - Confidence and ability
4. **TTM Stage (5 questions)** - Readiness for change

### Keyword Matching

Each question has keywords for 5 score levels:

- **veryHigh (100)**: "love", "excellent", "definitely", "absolutely"
- **high (75)**: "yes", "good", "like", "probably"
- **moderate (50)**: "okay", "maybe", "not sure", "sometimes"
- **low (25)**: "not really", "difficult", "doubt", "skeptical"
- **veryLow (0)**: "no", "hate", "never", "impossible"

### Example

**Question**: "How do you feel about eating healthy Filipino food?"

**User answers**:
- "I love it!" → Score: 100 (matched "love")
- "It's good" → Score: 75 (matched "good")
- "It's okay" → Score: 50 (matched "okay")
- "Not really my thing" → Score: 25 (matched "not really")
- "I hate it" → Score: 0 (matched "hate")

## Features

### Progress Tracking
- Shows "Question X of 20" in each bot message
- Progress bar in sidebar (0-100%)
- Visual feedback on completion

### Smart Suggestions
- **Before questionnaire**: "Yes, I'm ready", "Let's begin", "Start"
- **After questionnaire**: Normal chat suggestions

### Score Display
- Real-time updates in sidebar
- TPB scores (Attitude, Social Support, Confidence)
- TTM stage with confidence level
- Color-coded progress bars

### Reset Functionality
- "Reset Session" button clears everything
- Starts questionnaire from beginning
- Clears all scores and chat history

## Integration with Hugging Face

After questionnaire completion, the system can use Hugging Face API for enhanced responses:

```typescript
// System knows user profile from questionnaire
const context = {
  tpbScores: { attitude: 82, subjectiveNorm: 45, perceivedControl: 60 },
  ttmStage: 'contemplation',
  interventionMode: 'Ambivalence-resolution'
};

// Send to Hugging Face with context
const aiResponse = await hfConnector.sendMessage(userMessage, context);
```

## User Experience

### Starting the Questionnaire

```
Bot: Hi there! I'm NutriBot 🌱. Before we start, I'd like to ask you 
     20 questions to better understand your situation and readiness for 
     change. This will help me provide personalized guidance. Ready to begin?

User: Yes

Bot: Great! Let's begin.
     
     Question 1 of 20: How do you feel about eating healthy Filipino food?
```

### During Questionnaire

```
User: I think it's really good and beneficial

Bot: Question 2 of 20: Do you believe healthy eating would improve 
     your energy and wellbeing?

User: Definitely, I'm sure it would

Bot: Question 3 of 20: How important is healthy eating to you personally?
```

### Completion

```
Bot: Thank you for completing the questionnaire! 🎉

     I now have a good understanding of your situation:
     
     📊 Your Profile:
     - Attitude: 82/100
     - Social Support: 45/100
     - Confidence: 60/100
     - Readiness Stage: Thinking about making changes
     
     Now, how can I help you with your nutrition goals?

User: I want to eat healthier but my family doesn't support me

Bot: I understand that can be challenging. Having support from family 
     makes a big difference. Here are some strategies...
```

## Technical Implementation

### State Management

```typescript
const [questionnaireState, setQuestionnaireState] = useState<QuestionnaireState | null>(null);
const [waitingForStart, setWaitingForStart] = useState(true);

// QuestionnaireState contains:
// - currentQuestionIndex: number
// - answers: Map<questionId, {text, score}>
// - isComplete: boolean
// - tpbScores: TPBScores | null
// - ttmStage: TTMStage | null
// - isActive: boolean
```

### Message Handling

```typescript
const handleSend = async (text: string) => {
  // 1. Check if waiting to start
  if (waitingForStart) {
    if (text includes 'yes' or 'ready') {
      startQuestionnaire();
    }
    return;
  }
  
  // 2. Handle questionnaire flow
  if (questionnaireState?.isActive) {
    const currentQuestion = getCurrentQuestion(questionnaireState);
    const newState = answerQuestion(questionnaireState, currentQuestion.id, text);
    
    if (newState.isComplete) {
      // Show completion message with scores
      setCurrentTPBScores(newState.tpbScores);
      setCurrentTTMStage(newState.ttmStage);
    } else {
      // Ask next question
      const nextQuestion = getCurrentQuestion(newState);
      // Display next question
    }
    return;
  }
  
  // 3. Normal chat (after questionnaire)
  const response = processChatMessage(text);
  // Display response
};
```

### Score Inference

```typescript
export function inferScoreFromText(text: string, keywords: KeywordMapping): number {
  const lowerText = text.toLowerCase();
  
  // Check each level (highest to lowest)
  if (keywords.veryHigh.some(kw => lowerText.includes(kw))) return 100;
  if (keywords.high.some(kw => lowerText.includes(kw))) return 75;
  if (keywords.moderate.some(kw => lowerText.includes(kw))) return 50;
  if (keywords.low.some(kw => lowerText.includes(kw))) return 25;
  if (keywords.veryLow.some(kw => lowerText.includes(kw))) return 0;
  
  return 50; // Default to moderate
}
```

## Advantages

1. **Natural Conversation**: Feels like chatting, not filling a form
2. **Flexible Answers**: Users can express themselves naturally
3. **No UI Changes**: Works within existing chat interface
4. **Progressive Disclosure**: One question at a time, less overwhelming
5. **Immediate Feedback**: Progress shown in real-time
6. **Context Preserved**: All answers stored for later reference

## Testing

### Test Different Answer Styles

```typescript
// Formal answer
User: "Yes, I believe it would be beneficial"
→ Score: 75

// Casual answer
User: "yeah definitely!"
→ Score: 100

// Uncertain answer
User: "hmm not sure, maybe?"
→ Score: 50

// Negative answer
User: "nah, don't think so"
→ Score: 25
```

### Test Edge Cases

1. **Very short answers**: "yes", "no", "maybe"
2. **Long answers**: "Well, I think it's good but sometimes..."
3. **Mixed sentiment**: "I like it but it's hard"
4. **No keyword match**: "I suppose" → defaults to 50

## Future Enhancements

1. **Multi-keyword detection**: Score based on multiple keywords
2. **Sentiment analysis**: Use AI to better understand tone
3. **Clarification questions**: Ask follow-up if answer is unclear
4. **Skip option**: Allow users to skip questions
5. **Edit answers**: Let users go back and change responses
6. **Save progress**: Resume questionnaire later
7. **Voice input**: Speak answers instead of typing

## Troubleshooting

### Questionnaire not starting
- Check `waitingForStart` state
- Verify user typed "yes", "ready", or "start"

### Scores not calculating
- Check all 20 questions answered
- Verify `answerQuestion()` is called for each response
- Check console for errors

### Keywords not matching
- Add more keywords to `KeywordMapping`
- Make keywords more flexible
- Consider using fuzzy matching

### Progress not updating
- Verify `setQuestionnaireState()` is called
- Check `getProgress()` calculation
- Ensure sidebar re-renders on state change
