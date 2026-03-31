# Services Module

This directory contains service modules for the NutriBot application, implementing the core logic for TPB/TTM inference and chatbot functionality.

## Modules

- **TPB Inference** (`tpbInference.ts`) - Theory of Planned Behavior construct scoring
- **TTM Inference** (`ttmInference.ts`) - Transtheoretical Model stage classification

---

## TPB Inference Module (`tpbInference.ts`)

The TPB (Theory of Planned Behavior) Inference Module implements keyword-based scoring for the three TPB constructs that predict behavioral intention and behavior change.

### Overview

The module analyzes user messages to infer psychological constructs related to dietary behavior change:

1. **Attitude** - How the user feels about healthy eating (positive/negative evaluation)
2. **Subjective Norm** - Perceived social pressure and support from others
3. **Perceived Behavioral Control** - Perceived ability, confidence, and resources to change

### Key Features

- **Keyword-based scoring**: Uses curated dictionaries of positive and negative keywords
- **Continuous scores**: Returns values from 0-100 for each construct
- **Conversation history**: Aggregates scores across multiple messages with exponential smoothing
- **Barrier identification**: Identifies the weakest TPB determinant (main barrier to change)
- **Score interpretation**: Provides human-readable interpretations (low/moderate/high)

### Usage

#### Basic Usage

```typescript
import { calculateTPBScores } from './services/tpbInference';

const message = "I love healthy food and my family supports me!";
const scores = calculateTPBScores(message);

console.log(scores);
// {
//   attitude: 70,
//   subjectiveNorm: 60,
//   perceivedControl: 50,
//   confidence: 60
// }
```

#### Conversation History

```typescript
import { calculateTPBScoresFromHistory } from './services/tpbInference';

const userMessages = [
  "I want to eat healthier",
  "My family doesn't support me",
  "But I'm confident I can do it!"
];

const scores = calculateTPBScoresFromHistory(userMessages, 0.3);
// Alpha = 0.3 means 30% weight on new messages, 70% on previous
```

#### Identify Main Barrier

```typescript
import { 
  calculateTPBScores, 
  identifyWeakestDeterminant,
  getConstructDescription 
} from './services/tpbInference';

const message = "I know it's good but I don't have time or money";
const scores = calculateTPBScores(message);
const barrier = identifyWeakestDeterminant(scores);

console.log(barrier); // "perceivedControl"
console.log(getConstructDescription(barrier));
// "Your confidence and ability to make changes"
```

### API Reference

#### `calculateTPBScores(message: string): TPBScores`

Calculates TPB scores from a single user message.

**Parameters:**
- `message` - User's message text

**Returns:**
```typescript
{
  attitude: number;           // 0-100
  subjectiveNorm: number;     // 0-100
  perceivedControl: number;   // 0-100
  confidence: number;         // 0-100 (average of all three)
}
```

#### `calculateTPBScoresFromHistory(messages: string[], alpha?: number): TPBScores`

Calculates aggregated TPB scores from conversation history using exponential smoothing.

**Parameters:**
- `messages` - Array of user messages (chronological order)
- `alpha` - Smoothing factor (0-1), default 0.3. Higher = more weight on recent messages

**Returns:** `TPBScores` object

#### `identifyWeakestDeterminant(scores: TPBScores): 'attitude' | 'subjectiveNorm' | 'perceivedControl'`

Identifies which TPB construct has the lowest score (main barrier).

**Parameters:**
- `scores` - TPB scores object

**Returns:** Name of the weakest construct

#### `getConstructDescription(construct): string`

Returns a user-friendly description of a TPB construct.

**Parameters:**
- `construct` - One of: `'attitude'`, `'subjectiveNorm'`, `'perceivedControl'`

**Returns:** Human-readable description string

#### `interpretScore(score: number): 'low' | 'moderate' | 'high'`

Interprets a score value into a categorical level.

**Parameters:**
- `score` - Score value (0-100)

**Returns:**
- `'low'` - Score 0-33
- `'moderate'` - Score 34-66
- `'high'` - Score 67-100

### Scoring Algorithm

The module uses a keyword-matching approach:

1. **Keyword Dictionaries**: Curated lists of positive and negative keywords for each construct
2. **Matching**: Case-insensitive matching with word boundaries (avoids partial matches)
3. **Scoring Formula**:
   - Base score: 50 (neutral)
   - Each positive keyword: +10 points (max 5 keywords = +50)
   - Each negative keyword: -10 points (max 5 keywords = -50)
   - Final score clamped to 0-100 range

4. **Exponential Smoothing** (for history):
   - `smoothed_score = α × new_score + (1 - α) × previous_score`
   - Higher α gives more weight to recent messages

### Keyword Categories

#### Attitude Keywords

**Positive**: healthy, nutritious, delicious, love, enjoy, energizing, satisfying, etc.

**Negative**: unhealthy, junk, boring, tasteless, restrictive, guilty, etc.

#### Subjective Norm Keywords

**Positive**: family supports, friends encourage, cook together, everyone, help me, etc.

**Negative**: pressure, judge, criticize, alone, don't understand, isolated, etc.

#### Perceived Control Keywords

**Positive**: can, able, confident, easy, manageable, have time, affordable, etc.

**Negative**: can't, difficult, struggle, no time, expensive, overwhelmed, etc.

### Limitations

This is a **simplified, keyword-based approach** suitable for a demo/prototype:

- **Not a trained ML model**: Uses rule-based keyword matching, not machine learning
- **Context-insensitive**: Doesn't understand negation, sarcasm, or complex context
- **English-only**: Keywords are in English
- **Limited vocabulary**: Only recognizes predefined keywords
- **No semantic understanding**: Doesn't understand meaning beyond keywords

For production use, consider:
- Fine-tuned language models (BERT, GPT)
- Sentiment analysis APIs
- Validated psychological assessment tools
- Human expert review

### Testing

The module includes comprehensive unit tests covering:
- Individual construct scoring
- Conversation history aggregation
- Barrier identification
- Edge cases (mixed keywords, case sensitivity, phrase matching)

Run tests:
```bash
npm test -- tpbInference.test.ts
```

### Examples

See `tpbInference.example.ts` for detailed usage examples including:
- Single message scoring
- Conversation history analysis
- Chatbot integration
- UI display helpers

### References

**Theory of Planned Behavior (TPB)**:
- Ajzen, I. (1991). The theory of planned behavior. *Organizational Behavior and Human Decision Processes*, 50(2), 179-211.

**TPB in Dietary Behavior**:
- McDermott, M. S., et al. (2015). The theory of planned behaviour and dietary patterns: A systematic review and meta-analysis. *Preventive Medicine*, 81, 150-156.


---

## TTM Inference Module (`ttmInference.ts`)

The TTM (Transtheoretical Model) Inference Module implements rule-based classification for the five stages of behavior change readiness.

### Overview

The module analyzes user messages to classify their current stage in the behavior change process:

1. **Pre-contemplation** - Not thinking about change, no intention to change
2. **Contemplation** - Considering change but not committed, weighing pros and cons
3. **Preparation** - Planning to change soon, taking small preparatory steps
4. **Action** - Actively making changes, implementing new behaviors
5. **Maintenance** - Sustaining changes over time, preventing relapse

### Key Features

- **Keyword-based classification**: Uses stage-specific keyword dictionaries
- **Temporal context detection**: Distinguishes past, present, and future behaviors
- **Confidence scoring**: Returns confidence level (0-100) for each classification
- **Conversation history**: Aggregates classifications across multiple messages
- **Intervention mapping**: Maps stages to appropriate intervention modes
- **Stage descriptions**: Provides human-readable explanations

### Usage

#### Basic Usage

```typescript
import { classifyTTMStage } from './services/ttmInference';

const message = "I'm planning to start eating healthy next week.";
const result = classifyTTMStage(message);

console.log(result);
// {
//   stage: 'preparation',
//   confidence: 75,
//   description: 'Getting ready to take action'
// }
```

#### Conversation History

```typescript
import { classifyTTMStageFromHistory } from './services/ttmInference';

const userMessages = [
  "I'm thinking about eating healthier",
  "I'm planning to start soon",
  "I just started today!"
];

const result = classifyTTMStageFromHistory(userMessages, 0.4);
// Alpha = 0.4 means 40% weight on new messages, 60% on previous
```

#### Get Intervention Mode

```typescript
import { 
  classifyTTMStage, 
  getInterventionMode,
  getStageExplanation 
} from './services/ttmInference';

const message = "I'm thinking about it but not sure yet";
const result = classifyTTMStage(message);

console.log(result.stage); // "contemplation"
console.log(getInterventionMode(result.stage)); // "Ambivalence-resolution"
console.log(getStageExplanation(result.stage));
// "You're considering making changes to your diet..."
```

### API Reference

#### `classifyTTMStage(message: string): TTMStage`

Classifies TTM stage from a single user message.

**Parameters:**
- `message` - User's message text

**Returns:**
```typescript
{
  stage: 'preContemplation' | 'contemplation' | 'preparation' | 'action' | 'maintenance';
  confidence: number;  // 0-100
  description: string; // Human-readable stage description
}
```

#### `classifyTTMStageFromHistory(messages: string[], alpha?: number): TTMStage`

Classifies TTM stage from conversation history using exponential weighting.

**Parameters:**
- `messages` - Array of user messages (chronological order)
- `alpha` - Smoothing factor (0-1), default 0.4. Higher = more weight on recent messages

**Returns:** `TTMStage` object

#### `getInterventionMode(stage): string`

Maps a TTM stage to the appropriate intervention mode.

**Parameters:**
- `stage` - TTM stage name

**Returns:** Intervention mode name:
- Pre-contemplation → `'Awareness'`
- Contemplation → `'Ambivalence-resolution'`
- Preparation → `'Planning'`
- Action → `'Coping'`
- Maintenance → `'Relapse-prevention'`

#### `getStageDescription(stage): string`

Returns a brief description of a TTM stage.

**Parameters:**
- `stage` - TTM stage name

**Returns:** Short description string (e.g., "Thinking about making changes")

#### `getStageExplanation(stage): string`

Returns a detailed explanation of a TTM stage for user feedback.

**Parameters:**
- `stage` - TTM stage name

**Returns:** Detailed explanation string

### Classification Algorithm

The module uses a multi-step classification approach:

1. **Keyword Matching**: Count keywords for each stage in the message
2. **Temporal Adjustment**: Apply temporal context to boost/reduce stage scores
   - Future indicators (will, going to) → boost Preparation
   - Present indicators (now, currently) → boost Action
   - Duration indicators (for months, for years) → boost Maintenance
   - Past indicators (used to, before) → reduce Action/Maintenance
3. **Stage Selection**: Choose stage with highest adjusted score
4. **Confidence Calculation**: Based on separation between top two stages
   - High confidence: Clear winner with large separation
   - Low confidence: Close competition between stages

### Stage Keywords

#### Pre-contemplation
- **No interest**: not interested, don't want, not ready, not now
- **Resistance**: won't, refuse, reject, opposed
- **Denial**: not that bad, fine, nothing wrong

#### Contemplation
- **Considering**: thinking about, considering, wondering, maybe, might
- **Ambivalence**: but, however, not sure, uncertain, conflicted
- **Awareness**: know I should, realize, understand, someday

#### Preparation
- **Planning**: planning, going to, will, intend to, preparing
- **Small steps**: researching, learning, making a plan, setting goals
- **Commitment**: committed, determined, ready, decided

#### Action
- **Currently changing**: doing, trying, working on, started, currently
- **Behavioral changes**: eating, cooking, tracking, logging, monitoring
- **Progress**: have been, progress, improving, making changes

#### Maintenance
- **Sustained change**: maintaining, keeping, continuing, still, consistently
- **Long-term**: for months, for years, habit, routine, lifestyle
- **Confidence**: automatic, natural, easy now, won't go back

### Temporal Indicators

The module detects temporal context to improve classification accuracy:

- **Past**: used to, before, previously, in the past, ago
- **Present**: now, currently, today, this week, these days
- **Future**: will, going to, plan to, next, soon, later
- **Duration**: for weeks, for months, for years, since

### Confidence Scoring

Confidence is calculated based on the separation between the top two stage scores:

```
confidence = 50 + (separation_ratio × 50)
```

Where:
- `separation_ratio = (top_score - second_score) / (top_score + second_score)`
- 100% confidence: Clear winner with large separation
- 50% confidence: Tied or very close competition
- Defaults to 50% when no keywords detected

### Stage-Matched Interventions

The TTM framework emphasizes matching interventions to the user's current stage:

| Stage | Intervention Mode | Focus |
|-------|------------------|-------|
| Pre-contemplation | Awareness | Raise awareness of benefits and risks |
| Contemplation | Ambivalence-resolution | Resolve ambivalence, tip decisional balance |
| Preparation | Planning | Help create concrete action plans |
| Action | Coping | Provide coping strategies and support |
| Maintenance | Relapse-prevention | Prevent relapse and sustain changes |

### Limitations

This is a **simplified, keyword-based approach** suitable for a demo/prototype:

- **Not a trained ML model**: Uses rule-based keyword matching
- **Context-insensitive**: Doesn't understand complex context or nuance
- **English-only**: Keywords are in English
- **Limited vocabulary**: Only recognizes predefined keywords
- **No semantic understanding**: Doesn't understand meaning beyond keywords
- **Stage transitions**: Doesn't track stage progression over time (requires external tracking)

For production use, consider:
- Fine-tuned language models
- Validated stage assessment questionnaires
- Longitudinal tracking with stage transition detection
- Human expert review

### Testing

The module includes comprehensive unit tests covering:
- Individual stage classification
- Conversation history aggregation
- Temporal context detection
- Confidence calculation
- Edge cases and real-world examples

Run tests:
```bash
npm test -- ttmInference.test.ts
```

### Examples

See `ttmInference.example.ts` for detailed usage examples including:
- Single message classification
- Conversation history analysis
- Stage progression tracking
- Intervention mode selection
- Combined TPB + TTM analysis
- UI display helpers

### References

**Transtheoretical Model (TTM)**:
- Prochaska, J. O., & DiClemente, C. C. (1983). Stages and processes of self-change of smoking: Toward an integrative model of change. *Journal of Consulting and Clinical Psychology*, 51(3), 390-395.

**TTM in Dietary Behavior**:
- Greene, G. W., et al. (1999). Stages of change for reducing dietary fat to 30% of energy or less. *Journal of the American Dietetic Association*, 99(11), 1409-1414.

**Stage-Matched Interventions**:
- Prochaska, J. O., et al. (2008). Multiple risk expert systems interventions: Impact of simultaneous stage-matched expert system interventions for smoking, high-fat diet, and sun exposure in a population of parents. *Health Psychology*, 27(2), 174-182.

---

## Integration Example

### Combined TPB + TTM Analysis

The TPB and TTM modules work together to provide comprehensive behavior change analysis:

```typescript
import { calculateTPBScores, identifyWeakestDeterminant } from './services/tpbInference';
import { classifyTTMStage, getInterventionMode } from './services/ttmInference';

const userMessage = "I'm thinking about eating healthier but I don't have time.";

// Analyze TPB constructs (what are the barriers?)
const tpbScores = calculateTPBScores(userMessage);
const mainBarrier = identifyWeakestDeterminant(tpbScores);
// mainBarrier = "perceivedControl" (lack of time)

// Analyze TTM stage (how ready are they?)
const ttmStage = classifyTTMStage(userMessage);
const interventionMode = getInterventionMode(ttmStage.stage);
// stage = "contemplation"
// interventionMode = "Ambivalence-resolution"

// Generate personalized response
console.log(`Use ${interventionMode} intervention targeting ${mainBarrier}`);
// "Use Ambivalence-resolution intervention targeting perceivedControl"
```

This combined analysis enables:
1. **Stage-appropriate messaging**: Match communication style to readiness level
2. **Barrier-focused interventions**: Address the specific psychological barrier
3. **Personalized recommendations**: Tailor advice to both stage and barriers
4. **Progress tracking**: Monitor changes in both constructs and stages over time
