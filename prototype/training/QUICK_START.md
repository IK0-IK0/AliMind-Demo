# Quick Start: Using Your BERT Models

## 3 Simple Steps

### Step 1: Test the Models

```bash
cd prototype/training
python test_models.py
```

This verifies your models are working correctly.

### Step 2: Start the API Server

```bash
python api_server.py
```

The server will start on `http://localhost:5000`

### Step 3: Use in Your App

**Option A: Python**
```python
from inference_example import TPBInference, TTMInference

tpb = TPBInference()
ttm = TTMInference()

# Get predictions
tpb_scores = tpb.predict_all("I love healthy food!")
ttm_stage = ttm.predict("I'm thinking about it")

print(tpb_scores)  # {'attitude': 5, 'subjectiveNorm': 3, ...}
print(ttm_stage)   # {'stage': 'contemplation', ...}
```

**Option B: TypeScript/React**
```typescript
import { predictAll } from './services/bertInferenceService';

const result = await predictAll("I love healthy food!");
console.log(result.tpb);  // TPB scores
console.log(result.ttm);  // TTM stage
```

**Option C: cURL/HTTP**
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "I love healthy food!"}'
```

## What You Have

✅ **4 Fine-tuned DistilBERT Models:**
- TPB Attitude (88% accuracy)
- TPB Subjective Norm (78% accuracy)
- TPB Perceived Control (70% accuracy)
- TTM Stage Classifier (84% accuracy)

✅ **Python API Server:**
- Flask REST API
- CORS enabled
- Ready for production

✅ **TypeScript Integration:**
- Type-safe service
- Error handling
- Fallback support

## Files Created

```
prototype/training/
├── models/                      # Your trained models
│   ├── tpb/
│   │   ├── attitude/final_model/
│   │   ├── subjectiveNorm/final_model/
│   │   └── perceivedControl/final_model/
│   └── ttm/final_model/
├── inference_example.py         # Python inference code
├── api_server.py               # Flask API server
├── test_models.py              # Test script
├── USAGE_GUIDE.md              # Detailed documentation
└── QUICK_START.md              # This file

prototype/src/services/
└── bertInferenceService.ts     # TypeScript integration
```

## Common Commands

```bash
# Test models
python test_models.py

# Start API server
python api_server.py

# Test API
curl http://localhost:5000/health

# Make prediction
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here"}'
```

## Need Help?

See `USAGE_GUIDE.md` for:
- Detailed API documentation
- Code examples
- Deployment options
- Troubleshooting

## Model Performance

Average accuracy: **80%** on test data

This is excellent for 250 training samples per model!
