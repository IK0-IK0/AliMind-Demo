# Using Your Trained BERT Models

This guide shows you how to use the fine-tuned DistilBERT models for TPB/TTM inference.

## Quick Start

### Option 1: Python Script (Simplest)

```bash
cd prototype/training
python inference_example.py
```

This will run test predictions and show you how the models work.

### Option 2: Flask API Server (Recommended for Production)

1. **Install Flask dependencies:**
```bash
pip install flask flask-cors
```

2. **Start the API server:**
```bash
cd prototype/training
python api_server.py
```

Server will start on `http://localhost:5000`

3. **Test the API:**
```bash
# Health check
curl http://localhost:5000/health

# TPB prediction
curl -X POST http://localhost:5000/api/tpb/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "I love healthy food, it makes me feel great!"}'

# TTM prediction
curl -X POST http://localhost:5000/api/ttm/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "I am thinking about eating healthier"}'

# Combined prediction
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "I love healthy food and I am starting to eat better"}'
```

### Option 3: TypeScript Integration

1. **Start the Flask API server** (see Option 2)

2. **Use the TypeScript service in your React app:**

```typescript
import { predictAll, checkAPIHealth } from './services/bertInferenceService';

// Check if API is available
const isAvailable = await checkAPIHealth();

if (isAvailable) {
  // Get predictions
  const result = await predictAll("I love healthy food!");
  
  console.log('TPB Scores:', result.tpb);
  // { attitude: 5, subjectiveNorm: 3, perceivedControl: 4, confidence: 80 }
  
  console.log('TTM Stage:', result.ttm);
  // { stage: 'action', confidence: 85, description: 'Actively making changes' }
}
```

3. **Add environment variable** (optional):

Create `.env` in prototype folder:
```
REACT_APP_BERT_API_URL=http://localhost:5000
```

## API Endpoints

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "message": "API is running"
}
```

### POST /api/tpb/predict
Predict TPB scores (attitude, subjective norm, perceived control)

**Request:**
```json
{
  "text": "I love healthy food"
}
```

**Response:**
```json
{
  "attitude": 5,
  "subjectiveNorm": 3,
  "perceivedControl": 4,
  "confidence": 80
}
```

### POST /api/ttm/predict
Predict TTM stage of change

**Request:**
```json
{
  "text": "I'm thinking about eating healthier"
}
```

**Response:**
```json
{
  "stage": "contemplation",
  "confidence": 85,
  "description": "Thinking about making changes"
}
```

### POST /api/predict
Predict both TPB and TTM

**Request:**
```json
{
  "text": "I love healthy food and I'm starting to eat better"
}
```

**Response:**
```json
{
  "tpb": {
    "attitude": 5,
    "subjectiveNorm": 3,
    "perceivedControl": 4,
    "confidence": 80
  },
  "ttm": {
    "stage": "action",
    "confidence": 85,
    "description": "Actively making changes"
  }
}
```

## Python Code Examples

### Load and Use Models Directly

```python
from inference_example import TPBInference, TTMInference

# Initialize models
tpb = TPBInference()
ttm = TTMInference()

# Predict TPB scores
text = "I love healthy food, it's amazing!"
scores = tpb.predict_all(text)
print(f"Attitude: {scores['attitude']}/5")
print(f"Subjective Norm: {scores['subjectiveNorm']}/5")
print(f"Perceived Control: {scores['perceivedControl']}/5")
print(f"Confidence: {scores['confidence']}%")

# Predict TTM stage
text = "I'm thinking about eating healthier"
stage = ttm.predict(text)
print(f"Stage: {stage['stage']}")
print(f"Description: {stage['description']}")
print(f"Confidence: {stage['confidence']}%")
```

### Individual Construct Prediction

```python
from inference_example import TPBInference

tpb = TPBInference()

# Predict only attitude
attitude_score = tpb.predict_attitude("I love healthy food")
print(f"Attitude: {attitude_score}/5")

# Predict only subjective norm
sn_score = tpb.predict_subjective_norm("My family supports me")
print(f"Subjective Norm: {sn_score}/5")

# Predict only perceived control
pc_score = tpb.predict_perceived_control("I can prepare healthy meals")
print(f"Perceived Control: {pc_score}/5")
```

## TypeScript Code Examples

### Basic Usage

```typescript
import { predictTPB, predictTTM } from './services/bertInferenceService';

// Predict TPB
const tpbScores = await predictTPB("I love healthy food!");
console.log(tpbScores);

// Predict TTM
const ttmStage = await predictTTM("I'm thinking about it");
console.log(ttmStage);
```

### With Error Handling

```typescript
import { predictAll, checkAPIHealth } from './services/bertInferenceService';

async function getPredictions(userMessage: string) {
  // Check if API is available
  const isHealthy = await checkAPIHealth();
  
  if (!isHealthy) {
    console.error('BERT API is not available');
    // Fall back to keyword-based inference
    return null;
  }
  
  try {
    const predictions = await predictAll(userMessage);
    return predictions;
  } catch (error) {
    console.error('Prediction failed:', error);
    return null;
  }
}
```

### Integration with Existing Services

```typescript
import { predictAll } from './services/bertInferenceService';
import { calculateTPBScores } from './tpbInference';
import { classifyTTMStage } from './ttmInference';

async function getInferenceScores(text: string) {
  try {
    // Try BERT first (more accurate)
    const bertResult = await predictAll(text);
    return {
      tpb: convertBertTPBScores(bertResult.tpb),
      ttm: bertResult.ttm
    };
  } catch (error) {
    // Fall back to keyword-based inference
    console.warn('BERT unavailable, using keyword inference');
    return {
      tpb: calculateTPBScores(text),
      ttm: classifyTTMStage(text)
    };
  }
}
```

## Model Performance

Based on test set evaluation:

| Model | Test Accuracy | Samples |
|-------|--------------|---------|
| TPB Attitude | 88% | 50 |
| TPB Subjective Norm | 78% | 50 |
| TPB Perceived Control | 70% | 50 |
| TTM Stage | 84% | 50 |
| **Average** | **80%** | **200** |

## Deployment Options

### 1. Local Development
- Run Flask server locally
- Frontend calls `http://localhost:5000`

### 2. Docker Container
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "api_server.py"]
```

### 3. Cloud Deployment
- Deploy Flask API to Heroku, AWS, or Google Cloud
- Update `REACT_APP_BERT_API_URL` to production URL

### 4. Serverless (AWS Lambda)
- Package models with Lambda function
- Use API Gateway for REST endpoints

## Troubleshooting

### Models not loading
- Check that `models/` directory exists
- Verify all model files are present (config.json, model.safetensors, vocab.txt)

### API connection errors
- Ensure Flask server is running
- Check CORS settings if calling from browser
- Verify API URL in environment variables

### Slow inference
- First prediction is slow (model loading)
- Subsequent predictions are fast (~100ms)
- Consider using GPU for faster inference

### Memory issues
- Models use ~800MB RAM total
- Reduce batch size if needed
- Load models on-demand instead of at startup

## Next Steps

1. Test the models with your own data
2. Integrate with your React app
3. Deploy the Flask API to production
4. Monitor model performance and retrain if needed
