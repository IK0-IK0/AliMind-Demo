# Integration Guide: Questionnaire System with Hugging Face

## Quick Start

### 1. Install Dependencies

No additional dependencies needed - the system uses existing packages.

### 2. Set Up Hugging Face API

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your API key
REACT_APP_HUGGINGFACE_API_KEY=hf_your_actual_key_here
```

Get your API key from: https://huggingface.co/settings/tokens

### 3. Run the Application

```bash
npm install
npm run dev
```

Navigate to the Demo page to see the questionnaire flow.

## System Architecture

```
User Flow:
┌─────────────────┐
│   Start Demo    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Questionnaire  │ ← 15 questions (10 TPB + 5 TTM)
│   (15 Qs)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Calculate      │ ← TPB scores + TTM stage
│  Scores         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Chat Interface │ ← Personalized responses
│  (with scores)  │
└─────────────────┘
```

## Component Integration

### DemoPage.tsx

Main orchestrator that manages the flow:

```typescript
const [showQuestionnaire, setShowQuestionnaire] = useState(true);
const [questionnaireResults, setQuestionnaireResults] = useState<QuestionnaireState | null>(null);

const handleQuestionnaireComplete = (results: QuestionnaireState) => {
  setQuestionnaireResults(results);
  setShowQuestionnaire(false);
};

return (
  <>
    {showQuestionnaire ? (
      <QuestionnaireFlow onComplete={handleQuestionnaireComplete} />
    ) : (
      <ChatbotShowcase 
        initialTPBScores={questionnaireResults?.tpbScores}
        initialTTMStage={questionnaireResults?.ttmStage}
      />
    )}
  </>
);
```

### QuestionnaireFlow.tsx

Handles question display and answer collection:

```typescript
const [state, setState] = useState<QuestionnaireState>(initializeQuestionnaire());
const currentQuestion = getCurrentQuestion(state);

const handleAnswer = () => {
  const newState = answerQuestion(state, currentQuestion.id, selectedValue);
  setState(newState);
  
  if (newState.isComplete) {
    onComplete(newState); // Pass results to parent
  }
};
```

### ChatbotShowcase.tsx

Receives and displays questionnaire results:

```typescript
export function ChatbotShowcase({ 
  initialTPBScores, 
  initialTTMStage 
}: ChatbotShowcaseProps) {
  const [currentTPBScores, setCurrentTPBScores] = useState(initialTPBScores || null);
  const [currentTTMStage, setCurrentTTMStage] = useState(initialTTMStage || null);
  
  // Display scores in sidebar
  // Use scores for personalized responses
}
```

## Hugging Face Integration

### Option 1: Direct Integration (Recommended for Production)

Modify `chatbotService.ts` to use Hugging Face:

```typescript
import { createConnectorFromEnv, createNutritionCoachingPrompt } from './huggingFaceConnector';

const hfConnector = createConnectorFromEnv();

export async function processChatMessageWithAI(
  message: string,
  tpbScores: TPBScores,
  ttmStage: TTMStage
): Promise<ChatbotResponse> {
  
  if (hfConnector) {
    // Initialize with user profile
    const systemPrompt = createNutritionCoachingPrompt(tpbScores, ttmStage.stage);
    hfConnector.initializeConversation(systemPrompt);
    
    // Get AI response
    const aiResponse = await hfConnector.sendMessage(message, {
      tpbScores,
      ttmStage: ttmStage.stage,
      interventionMode: getInterventionMode(ttmStage.stage)
    });
    
    // Combine with existing logic
    const context = extractDietaryContext(message);
    const bct = selectBCT(identifyWeakestDeterminant(tpbScores), ttmStage.stage);
    const recipes = recommendRecipes(context, 3);
    
    return {
      message: aiResponse + '\n\n' + formatRecipeList(recipes),
      tpbScores,
      ttmStage,
      interventionMode: getInterventionMode(ttmStage.stage),
      bct,
      recommendedRecipes: recipes,
      disclaimer: 'Note: This advice is for informational purposes only...'
    };
  }
  
  // Fallback to rule-based system
  return processChatMessage(message);
}
```

### Option 2: Hybrid Approach (Current Implementation)

Keep rule-based system as primary, use HF for enhancement:

```typescript
// In ChatbotShowcase.tsx
const handleSend = async (text: string) => {
  // Get rule-based response
  const response = processChatMessage(text);
  
  // Optionally enhance with AI
  if (hfConnector && currentTPBScores && currentTTMStage) {
    try {
      const aiEnhancement = await hfConnector.sendMessage(text, {
        tpbScores: currentTPBScores,
        ttmStage: currentTTMStage.stage
      });
      
      // Combine responses
      response.message = aiEnhancement + '\n\n' + response.message;
    } catch (error) {
      console.error('AI enhancement failed, using rule-based response');
    }
  }
  
  // Display response
  setMessages(prev => [...prev, { text: response.message, sender: 'bot' }]);
};
```

### Option 3: Toggle Mode

Let users choose between rule-based and AI:

```typescript
const [useAI, setUseAI] = useState(false);

// In UI
<Switch 
  checked={useAI}
  onChange={(e) => setUseAI(e.target.checked)}
  label="Use AI Enhancement"
/>

// In message handler
const response = useAI 
  ? await processChatMessageWithAI(text, tpbScores, ttmStage)
  : processChatMessage(text);
```

## Testing the Integration

### 1. Test Questionnaire Flow

```bash
npm run dev
```

1. Navigate to Demo page
2. Complete all 15 questions
3. Verify scores appear in sidebar
4. Check console for calculated values

### 2. Test Score Calculation

```bash
npm test questionnaireService.test.ts
```

Expected output:
- All tests pass
- TPB scores calculated correctly
- TTM stage classified correctly

### 3. Test Hugging Face Connection

Create a test file:

```typescript
// test-hf-connection.ts
import { HuggingFaceConnector } from './services/huggingFaceConnector';

const connector = new HuggingFaceConnector({
  apiKey: 'your_key_here',
  modelId: 'facebook/blenderbot-400M-distill'
});

connector.initializeConversation('You are a nutrition coach.');

connector.sendMessage('I want to eat healthier')
  .then(response => console.log('Response:', response))
  .catch(error => console.error('Error:', error));
```

Run with: `npx ts-node test-hf-connection.ts`

### 4. Test End-to-End

1. Complete questionnaire with specific profile:
   - High attitude (75+)
   - Low social support (25-)
   - Moderate confidence (50)
   - Contemplation stage

2. Send message: "I want to eat healthier but my family doesn't support me"

3. Expected behavior:
   - System identifies low social support as barrier
   - Selects appropriate BCT (Social support)
   - Provides relevant advice
   - Recommends suitable recipes

## Troubleshooting

### Questionnaire Issues

**Problem**: Questions not advancing
```typescript
// Check state updates
console.log('Current state:', state);
console.log('Current question:', getCurrentQuestion(state));
```

**Problem**: Scores not calculating
```typescript
// Verify all answers recorded
console.log('Answers:', Array.from(state.answers.entries()));
console.log('Expected:', ALL_QUESTIONS.length);
```

### Hugging Face Issues

**Problem**: API key not found
```bash
# Verify environment variable
echo $REACT_APP_HUGGINGFACE_API_KEY

# Check .env file exists
ls -la .env
```

**Problem**: Model loading timeout
```typescript
// Increase timeout or use smaller model
const request = {
  inputs: prompt,
  options: {
    wait_for_model: true,
    use_cache: true // Enable caching
  }
};
```

**Problem**: Rate limit exceeded
- Free tier: 1000 requests/month
- Solution: Implement caching or upgrade plan
- Alternative: Use local model with transformers.js

### Integration Issues

**Problem**: Scores not passing to chat
```typescript
// Debug props
console.log('ChatbotShowcase props:', {
  initialTPBScores,
  initialTTMStage
});
```

**Problem**: Chat not using scores
```typescript
// Verify scores are used in response generation
console.log('Generating response with:', {
  tpbScores: currentTPBScores,
  ttmStage: currentTTMStage
});
```

## Performance Optimization

### 1. Lazy Load Hugging Face

```typescript
const [hfConnector, setHfConnector] = useState<HuggingFaceConnector | null>(null);

useEffect(() => {
  // Load only when needed
  if (questionnaireResults && !hfConnector) {
    const connector = createConnectorFromEnv();
    if (connector) {
      setHfConnector(connector);
    }
  }
}, [questionnaireResults]);
```

### 2. Cache Responses

```typescript
const responseCache = new Map<string, string>();

const getCachedResponse = async (message: string) => {
  const cacheKey = `${message}-${JSON.stringify(tpbScores)}`;
  
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey);
  }
  
  const response = await hfConnector.sendMessage(message);
  responseCache.set(cacheKey, response);
  return response;
};
```

### 3. Debounce API Calls

```typescript
import { debounce } from 'lodash';

const debouncedSend = debounce(async (message: string) => {
  const response = await hfConnector.sendMessage(message);
  // Handle response
}, 500);
```

## Deployment Checklist

- [ ] Environment variables set in production
- [ ] API key secured (not in source code)
- [ ] Error handling for API failures
- [ ] Fallback to rule-based system
- [ ] Rate limiting implemented
- [ ] Response caching enabled
- [ ] Loading states for API calls
- [ ] User feedback for errors
- [ ] Analytics tracking questionnaire completion
- [ ] A/B testing setup (AI vs rule-based)

## Next Steps

1. **Fine-tune Model**: Train custom model on nutrition coaching data
2. **Add Feedback Loop**: Collect user ratings to improve responses
3. **Implement Caching**: Store common responses
4. **Add Analytics**: Track questionnaire completion and chat engagement
5. **Multilingual Support**: Add Filipino/Tagalog translations
6. **Mobile Optimization**: Ensure questionnaire works on mobile
7. **Accessibility**: Add screen reader support
8. **Progressive Enhancement**: Work without JavaScript
