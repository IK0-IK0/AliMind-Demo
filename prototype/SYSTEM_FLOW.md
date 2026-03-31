# System Flow Diagram

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER STARTS DEMO                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    QUESTIONNAIRE PHASE                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Question 1/15: How do you feel about healthy eating?   │  │
│  │  ○ Very negative                                         │  │
│  │  ○ Somewhat negative                                     │  │
│  │  ○ Neutral                                               │  │
│  │  ● Somewhat positive  ← User selects                     │  │
│  │  ○ Very positive                                         │  │
│  │                                                           │  │
│  │  [Progress: 7% ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]     │  │
│  │                                    [Next Question →]     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Questions 1-5:   Attitude (How they feel)                      │
│  Questions 6-8:   Social Support (Family/friends)               │
│  Questions 9-10:  Confidence (Ability to change)                │
│  Questions 11-15: Readiness Stage (TTM)                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SCORE CALCULATION                            │
│                                                                  │
│  TPB Scores:                                                     │
│  ├─ Attitude:           75/100  ████████████████░░░░            │
│  ├─ Social Support:     45/100  ████████░░░░░░░░░░░░            │
│  └─ Confidence:         60/100  ████████████░░░░░░░░            │
│                                                                  │
│  TTM Stage: Contemplation (Thinking about change)               │
│  Confidence: 85%                                                 │
│                                                                  │
│  Weakest Determinant: Social Support ← Target for intervention  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CHAT INTERFACE                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🤖 NutriBot                                             │  │
│  │  Thank you for completing the questionnaire! Based on    │  │
│  │  your responses, I can see you're interested in healthy  │  │
│  │  eating but may need more support from family/friends.   │  │
│  │  How can I help you today?                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  👤 User                                                  │  │
│  │  I want to eat healthier but my family doesn't support   │  │
│  │  me. They keep offering unhealthy food.                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  [System processes message...]                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  RESPONSE GENERATION PIPELINE                    │
│                                                                  │
│  Step 1: Extract Context                                        │
│  ├─ Keywords: ["family", "support", "unhealthy"]                │
│  ├─ Constraints: None specified                                 │
│  └─ Meal Type: Any                                              │
│                                                                  │
│  Step 2: Use TPB Scores (from questionnaire)                    │
│  ├─ Attitude: 75 (High - user wants to change)                  │
│  ├─ Social Support: 45 (Low - main barrier!)                    │
│  └─ Confidence: 60 (Moderate)                                   │
│                                                                  │
│  Step 3: Use TTM Stage (from questionnaire)                     │
│  └─ Stage: Contemplation → Intervention: Ambivalence Resolution │
│                                                                  │
│  Step 4: Select BCT (Behavior Change Technique)                 │
│  └─ BCT 3.1: Social Support (targets weakest determinant)       │
│                                                                  │
│  Step 5: Filter Recipes                                         │
│  └─ Recommend: Easy, family-friendly Filipino recipes           │
│                                                                  │
│  Step 6: Generate Response                                      │
│  ├─ Option A: Rule-based (existing system)                      │
│  └─ Option B: AI-enhanced (Hugging Face)                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              HUGGING FACE INTEGRATION (Optional)                 │
│                                                                  │
│  System Prompt:                                                  │
│  "You are a Filipino nutrition coach. User profile:             │
│   - Attitude: 75/100 (positive)                                 │
│   - Social Support: 45/100 (LOW - focus here!)                  │
│   - Confidence: 60/100 (moderate)                               │
│   - Stage: Contemplation (thinking about change)                │
│   Use BCT 3.1 (Social Support) in your response."               │
│                                                                  │
│  User Message + Context → [Hugging Face API] → AI Response      │
│                                                                  │
│  AI Response:                                                    │
│  "I understand that can be challenging. Having support from     │
│  family makes a big difference. Here are some strategies:       │
│  1. Talk to your family about your goals                        │
│  2. Invite them to cook healthy meals together                  │
│  3. Find one family member who might support you..."            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FINAL RESPONSE                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🤖 NutriBot                                             │  │
│  │                                                           │  │
│  │  I understand that can be challenging. Having support    │  │
│  │  from family makes a big difference. Here are some       │  │
│  │  strategies to get your family on board:                 │  │
│  │                                                           │  │
│  │  1. Talk to them about your health goals                 │  │
│  │  2. Invite them to cook together                         │  │
│  │  3. Start with small changes they'll enjoy               │  │
│  │                                                           │  │
│  │  Here are some family-friendly Filipino recipes:         │  │
│  │                                                           │  │
│  │  1. **Chicken Tinola** (30 min, 250 cal)                 │  │
│  │     Healthy ginger chicken soup with vegetables          │  │
│  │     Difficulty: Easy | Budget: Low                       │  │
│  │                                                           │  │
│  │  2. **Pinakbet** (25 min, 180 cal)                       │  │
│  │     Mixed vegetables with shrimp paste                   │  │
│  │     Difficulty: Easy | Budget: Low                       │  │
│  │                                                           │  │
│  │  3. **Grilled Bangus** (20 min, 220 cal)                 │  │
│  │     Marinated milkfish, perfect for family meals         │  │
│  │     Difficulty: Easy | Budget: Medium                    │  │
│  │                                                           │  │
│  │  Would you like help planning how to introduce these     │  │
│  │  to your family?                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Sidebar shows:                                                  │
│  ├─ TTM Stage: Contemplation (85% confidence)                   │
│  ├─ Attitude: 75/100 ████████████████░░░░                       │
│  ├─ Social Support: 45/100 ████████░░░░░░░░░░░░ ← LOW!          │
│  └─ Confidence: 60/100 ████████████░░░░░░░░                     │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  DemoPage.tsx                                                    │
│  ├─ State: showQuestionnaire, questionnaireResults              │
│  └─ Orchestrates flow between questionnaire and chat            │
│                                                                  │
│  ┌────────────────────────┐    ┌──────────────────────────┐    │
│  │  QuestionnaireFlow     │    │   ChatbotShowcase        │    │
│  │  ├─ Display questions  │    │   ├─ Display messages    │    │
│  │  ├─ Collect answers    │───▶│   ├─ Show TPB/TTM scores │    │
│  │  └─ Calculate scores   │    │   └─ Generate responses  │    │
│  └────────────────────────┘    └──────────────────────────┘    │
│           │                              │                       │
│           ▼                              ▼                       │
├─────────────────────────────────────────────────────────────────┤
│                         SERVICES LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  questionnaireService.ts          chatbotService.ts             │
│  ├─ Question definitions          ├─ Extract context            │
│  ├─ State management              ├─ Select BCT                 │
│  ├─ TPB score calculation         ├─ Filter recipes             │
│  └─ TTM stage classification      └─ Generate response          │
│           │                              │                       │
│           │                              ▼                       │
│           │                    ┌──────────────────────┐         │
│           │                    │  tpbInference.ts     │         │
│           │                    │  ├─ Keyword matching │         │
│           │                    │  └─ Score calculation│         │
│           │                    └──────────────────────┘         │
│           │                              │                       │
│           │                              ▼                       │
│           │                    ┌──────────────────────┐         │
│           │                    │  ttmInference.ts     │         │
│           │                    │  ├─ Stage detection  │         │
│           │                    │  └─ Confidence calc  │         │
│           │                    └──────────────────────┘         │
│           │                              │                       │
│           │                              ▼                       │
│           │                    ┌──────────────────────┐         │
│           │                    │  recipeFilters.ts    │         │
│           │                    │  └─ Filter & rank    │         │
│           │                    └──────────────────────┘         │
│           │                                                      │
│           └──────────────────────┐                              │
│                                  ▼                              │
│                    ┌──────────────────────────┐                 │
│                    │ huggingFaceConnector.ts  │                 │
│                    │ ├─ API client            │                 │
│                    │ ├─ Prompt building       │                 │
│                    │ └─ Context integration   │                 │
│                    └──────────────┬───────────┘                 │
│                                   │                              │
└───────────────────────────────────┼──────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │   HUGGING FACE API        │
                    │   (External Service)      │
                    │                           │
                    │   Models:                 │
                    │   - blenderbot-400M       │
                    │   - DialoGPT-medium       │
                    │   - Custom fine-tuned     │
                    └───────────────────────────┘
```

## State Management Flow

```
Initial State:
┌──────────────────────────────────┐
│ showQuestionnaire: true          │
│ questionnaireResults: null       │
│ currentTPBScores: null           │
│ currentTTMStage: null            │
└──────────────────────────────────┘
                │
                ▼
User answers questions (1-15)
┌──────────────────────────────────┐
│ QuestionnaireState:              │
│ ├─ currentQuestionIndex: 0→15    │
│ ├─ answers: Map<id, value>       │
│ ├─ isComplete: false→true        │
│ ├─ tpbScores: null→calculated    │
│ └─ ttmStage: null→classified     │
└──────────────────────────────────┘
                │
                ▼
Questionnaire completes
┌──────────────────────────────────┐
│ onComplete(results) called       │
│ ├─ setQuestionnaireResults()     │
│ └─ setShowQuestionnaire(false)   │
└──────────────────────────────────┘
                │
                ▼
Chat interface loads
┌──────────────────────────────────┐
│ ChatbotShowcase receives:        │
│ ├─ initialTPBScores              │
│ └─ initialTTMStage               │
│                                  │
│ Sets internal state:             │
│ ├─ currentTPBScores              │
│ └─ currentTTMStage               │
└──────────────────────────────────┘
                │
                ▼
User sends messages
┌──────────────────────────────────┐
│ Each message uses:               │
│ ├─ currentTPBScores              │
│ ├─ currentTTMStage               │
│ └─ Message history               │
│                                  │
│ To generate personalized         │
│ responses                        │
└──────────────────────────────────┘
```

## Question Type Distribution

```
Total: 15 Questions
│
├─ TPB Questions (10)
│  │
│  ├─ Attitude (5 questions)
│  │  ├─ Q1: Feelings about healthy eating
│  │  ├─ Q2: Belief in benefits
│  │  ├─ Q3: Personal importance
│  │  ├─ Q4: Food appeal
│  │  └─ Q5: Effort vs benefit
│  │
│  ├─ Subjective Norm (3 questions)
│  │  ├─ Q6: Family/friend support
│  │  ├─ Q7: Others' behavior
│  │  └─ Q8: Willingness to join
│  │
│  └─ Perceived Control (2 questions)
│     ├─ Q9: Confidence in ability
│     └─ Q10: Available resources
│
└─ TTM Questions (5)
   ├─ Q11: Thinking about change
   ├─ Q12: Timeline for change
   ├─ Q13: Steps taken
   ├─ Q14: Current habits
   └─ Q15: Duration of change
```

## Score Calculation Flow

```
Questionnaire Answers
        │
        ▼
┌───────────────────────────────────┐
│  Extract answers by type          │
│  ├─ Attitude: Q1-Q5               │
│  ├─ Subjective Norm: Q6-Q8        │
│  ├─ Perceived Control: Q9-Q10     │
│  └─ TTM: Q11-Q15                  │
└───────────┬───────────────────────┘
            │
            ▼
┌───────────────────────────────────┐
│  Calculate TPB Scores             │
│  ├─ Attitude = avg(Q1-Q5)         │
│  ├─ SubjNorm = avg(Q6-Q8)         │
│  ├─ PercControl = avg(Q9-Q10)     │
│  └─ Confidence = avg(all three)   │
└───────────┬───────────────────────┘
            │
            ▼
┌───────────────────────────────────┐
│  Calculate TTM Stage              │
│  ├─ avgStage = avg(Q11-Q15)       │
│  ├─ stage = round(avgStage)       │
│  │   0 → Pre-contemplation        │
│  │   1 → Contemplation            │
│  │   2 → Preparation              │
│  │   3 → Action                   │
│  │   4 → Maintenance              │
│  └─ confidence = f(consistency)   │
└───────────┬───────────────────────┘
            │
            ▼
┌───────────────────────────────────┐
│  Identify Weakest Determinant     │
│  └─ min(attitude, subjNorm, perc) │
└───────────┬───────────────────────┘
            │
            ▼
┌───────────────────────────────────┐
│  Select Intervention Strategy     │
│  └─ BCT = f(stage, weakest)       │
└───────────────────────────────────┘
```

This visual representation shows how all components work together to provide personalized nutrition coaching based on behavioral science principles.
