# DistilBERT Training for TPB/TTM Inference

This directory contains scripts to fine-tune DistilBERT models for TPB and TTM classification.

## Overview

We train 4 separate models:
1. **TPB Attitude Model**: Predicts attitude score (1-5)
2. **TPB Subjective Norm Model**: Predicts social support score (1-5)
3. **TPB Perceived Control Model**: Predicts control/confidence score (1-5)
4. **TTM Stage Model**: Predicts stage of change (pre-contemplation → maintenance)

## Setup

### 1. Install Dependencies

```bash
cd prototype/training
pip install -r requirements.txt
```

### 2. Prepare Datasets

Convert JSON training data to CSV format:

```bash
python prepare_dataset.py
```

This creates:
- `datasets/tpb_attitude.csv` (250 samples)
- `datasets/tpb_subjectiveNorm.csv` (250 samples)
- `datasets/tpb_perceivedControl.csv` (250 samples)
- `datasets/ttm.csv` (250 samples)

## Training

### Train TPB Models (all 3 constructs)

```bash
python train_tpb_model.py
```

This trains 3 separate models and saves them to:
- `models/tpb/attitude/final_model/`
- `models/tpb/subjectiveNorm/final_model/`
- `models/tpb/perceivedControl/final_model/`

### Train TTM Model

```bash
python train_ttm_model.py
```

Saves to: `models/ttm/final_model/`

## Training Details

### Model Architecture
- **Base Model**: `distilbert-base-uncased`
- **Size**: 268MB
- **Parameters**: 66M
- **Output**: 5 classes (scale 1-5 or 5 stages)

### Hyperparameters
- **Epochs**: 10 (with early stopping)
- **Batch Size**: 16 (train), 32 (eval)
- **Learning Rate**: 5e-5 (default)
- **Warmup Steps**: 100
- **Weight Decay**: 0.01
- **Max Sequence Length**: 128 tokens

### Data Split
- **Train**: 70% (175 samples per model)
- **Validation**: 10% (25 samples per model)
- **Test**: 20% (50 samples per model)

## Expected Performance

With 250 samples per model:
- **Expected Accuracy**: 75-85%
- **Training Time**: ~5-10 minutes per model (CPU)
- **Training Time**: ~1-2 minutes per model (GPU)

## Model Usage

### Load Trained Model

```python
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import torch

# Load model
model_path = './models/tpb/attitude/final_model'
tokenizer = DistilBertTokenizer.from_pretrained(model_path)
model = DistilBertForSequenceClassification.from_pretrained(model_path)

# Predict
text = "I love healthy food, it's amazing"
inputs = tokenizer(text, return_tensors='pt', padding=True, truncation=True)
outputs = model(**inputs)
prediction = torch.argmax(outputs.logits, dim=1).item()

# Convert back to scale (0-4 → 1-5)
scale_score = prediction + 1
print(f"Predicted scale: {scale_score}")
```

## Deployment Options

### Option 1: Python Backend (Recommended)
- Run models on server with Flask/FastAPI
- Best performance and accuracy
- ~1GB RAM per model

### Option 2: ONNX Export (Faster Inference)
- Convert to ONNX format for faster inference
- Can run in Node.js backend
- ~2-3x faster than PyTorch

### Option 3: TensorFlow.js (Browser)
- Convert to TF.js format
- Run directly in browser
- Slower, but no backend needed

## Next Steps

1. Train models with provided scripts
2. Evaluate performance on test set
3. Export models for deployment
4. Integrate with TypeScript inference service

## Troubleshooting

### Out of Memory
- Reduce batch size: `per_device_train_batch_size=8`
- Reduce max length: `max_length=64`

### Low Accuracy
- Increase training data (add more samples)
- Increase epochs: `num_train_epochs=15`
- Try different learning rates

### Slow Training
- Use GPU if available
- Reduce max sequence length
- Use smaller model (MiniLM)
