"""
Upload trained models to Hugging Face Hub

This script uploads your fine-tuned DistilBERT models to Hugging Face
so they can be accessed from anywhere without local storage.
"""

import os
from pathlib import Path
from huggingface_hub import HfApi, create_repo, upload_folder
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def upload_model_to_hub(
    model_path: str,
    repo_name: str,
    model_description: str,
    token: str = None
):
    """
    Upload a model to Hugging Face Hub
    
    Args:
        model_path: Local path to model directory
        repo_name: Name for the HF repo (e.g., "username/tpb-attitude")
        model_description: Description of the model
        token: HuggingFace token (or set HUGGINGFACE_TOKEN env var)
    """
    if token is None:
        token = os.getenv('HUGGINGFACE_TOKEN')
    
    if not token:
        raise ValueError("HuggingFace token not found. Set HUGGINGFACE_TOKEN env variable or pass token parameter.")
    
    api = HfApi()
    
    print(f"\n{'='*60}")
    print(f"Uploading: {repo_name}")
    print(f"{'='*60}")
    
    try:
        # Create repository (will skip if already exists)
        print("Creating repository...")
        create_repo(
            repo_id=repo_name,
            token=token,
            repo_type="model",
            exist_ok=True,
            private=False  # Set to True if you want private models
        )
        print("✓ Repository created/verified")
        
        # Upload model files
        print("Uploading model files...")
        upload_folder(
            folder_path=model_path,
            repo_id=repo_name,
            token=token,
            repo_type="model",
            commit_message=f"Upload {model_description}"
        )
        print("✓ Model uploaded successfully!")
        print(f"✓ Model URL: https://huggingface.co/{repo_name}")
        
        return True
        
    except Exception as e:
        print(f"✗ Error uploading model: {e}")
        return False

def create_model_card(model_name: str, accuracy: float, description: str) -> str:
    """Generate a model card (README) for the model"""
    return f"""---
language: en
license: mit
tags:
- nutrition
- behavior-change
- tpb
- ttm
- distilbert
- text-classification
datasets:
- custom
metrics:
- accuracy
model-index:
- name: {model_name}
  results:
  - task:
      type: text-classification
    metrics:
    - type: accuracy
      value: {accuracy}
---

# {model_name}

## Model Description

{description}

This model is a fine-tuned version of [distilbert-base-uncased](https://huggingface.co/distilbert-base-uncased) 
for behavior change inference in nutrition coaching contexts.

## Training Data

- **Training samples**: 175
- **Validation samples**: 25
- **Test samples**: 50
- **Total**: 250 samples

## Performance

- **Test Accuracy**: {accuracy}%

## Intended Use

This model is designed for:
- Nutrition coaching chatbots
- Behavior change interventions
- Health psychology research
- Personalized dietary guidance

## How to Use

```python
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import torch

# Load model
tokenizer = DistilBertTokenizer.from_pretrained("{model_name}")
model = DistilBertForSequenceClassification.from_pretrained("{model_name}")

# Predict
text = "I love healthy food, it's amazing!"
inputs = tokenizer(text, return_tensors='pt', padding=True, truncation=True)
outputs = model(**inputs)
prediction = torch.argmax(outputs.logits, dim=1).item()

# Convert 0-4 to 1-5 scale
score = prediction + 1
print(f"Score: {{score}}/5")
```

## Limitations

- Trained on English text only
- Limited to nutrition/dietary contexts
- May not generalize to other health behaviors
- Requires context-appropriate input

## Citation

If you use this model, please cite:

```
@misc{{tpb-ttm-nutrition-models,
  author = {{Your Name}},
  title = {{{model_name}}},
  year = {{2026}},
  publisher = {{Hugging Face}},
  howpublished = {{\\url{{https://huggingface.co/{model_name}}}}}
}}
```

## License

MIT License
"""

def save_model_card(model_path: str, content: str):
    """Save model card as README.md in model directory"""
    readme_path = Path(model_path) / "README.md"
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Model card saved to {readme_path}")

def main():
    """Upload all trained models to Hugging Face Hub"""
    
    import sys
    
    # Get HuggingFace token
    token = os.getenv('HUGGINGFACE_TOKEN')
    if not token:
        print("ERROR: HUGGINGFACE_TOKEN not found in .env file")
        print("\nTo upload models:")
        print("1. Get your token from https://huggingface.co/settings/tokens")
        print("2. Add it to .env file: HUGGINGFACE_TOKEN=hf_...")
        return
    
    # Get username from command line or prompt
    if len(sys.argv) > 1:
        username = sys.argv[1]
    else:
        username = input("\nEnter your HuggingFace username: ").strip()
    
    if not username:
        print("Username required!")
        return
    
    print("\n" + "="*60)
    print("UPLOADING MODELS TO HUGGING FACE HUB")
    print("="*60)
    
    models_dir = Path('./models')
    
    # Define models to upload
    models = [
        {
            'path': models_dir / 'tpb' / 'attitude' / 'final_model',
            'name': f'{username}/tpb-attitude-nutrition',
            'description': 'TPB Attitude classifier for nutrition behavior change',
            'accuracy': 88.0,
            'full_description': 'Fine-tuned DistilBERT model for classifying attitude toward healthy eating on a 1-5 scale. Part of a Theory of Planned Behavior (TPB) inference system for nutrition coaching.'
        },
        {
            'path': models_dir / 'tpb' / 'subjectiveNorm' / 'final_model',
            'name': f'{username}/tpb-subjective-norm-nutrition',
            'description': 'TPB Subjective Norm classifier for nutrition behavior change',
            'accuracy': 78.0,
            'full_description': 'Fine-tuned DistilBERT model for classifying perceived social support for healthy eating on a 1-5 scale. Part of a Theory of Planned Behavior (TPB) inference system for nutrition coaching.'
        },
        {
            'path': models_dir / 'tpb' / 'perceivedControl' / 'final_model',
            'name': f'{username}/tpb-perceived-control-nutrition',
            'description': 'TPB Perceived Behavioral Control classifier for nutrition behavior change',
            'accuracy': 70.0,
            'full_description': 'Fine-tuned DistilBERT model for classifying perceived control and confidence in healthy eating on a 1-5 scale. Part of a Theory of Planned Behavior (TPB) inference system for nutrition coaching.'
        },
        {
            'path': models_dir / 'ttm' / 'final_model',
            'name': f'{username}/ttm-stage-nutrition',
            'description': 'TTM Stage of Change classifier for nutrition behavior change',
            'accuracy': 84.0,
            'full_description': 'Fine-tuned DistilBERT model for classifying stage of change (pre-contemplation, contemplation, preparation, action, maintenance) based on the Transtheoretical Model (TTM) for nutrition behavior change.'
        }
    ]
    
    # Upload each model
    results = []
    for model in models:
        if not model['path'].exists():
            print(f"\n✗ Model not found: {model['path']}")
            results.append(False)
            continue
        
        # Create model card
        model_card = create_model_card(
            model['name'],
            model['accuracy'],
            model['full_description']
        )
        save_model_card(str(model['path']), model_card)
        
        # Upload to HuggingFace
        success = upload_model_to_hub(
            str(model['path']),
            model['name'],
            model['description'],
            token
        )
        results.append(success)
    
    # Summary
    print("\n" + "="*60)
    print("UPLOAD SUMMARY")
    print("="*60)
    
    for i, model in enumerate(models):
        status = "✓ SUCCESS" if results[i] else "✗ FAILED"
        print(f"{status}: {model['name']}")
    
    successful = sum(results)
    print(f"\n{successful}/{len(models)} models uploaded successfully")
    
    if successful > 0:
        print("\n" + "="*60)
        print("NEXT STEPS")
        print("="*60)
        print("1. View your models at: https://huggingface.co/" + username)
        print("2. Update inference code to load from HuggingFace")
        print("3. Share your models with others!")
        print("\nTo use models from HuggingFace:")
        print("  model = DistilBertForSequenceClassification.from_pretrained(")
        print(f"      '{username}/tpb-attitude-nutrition'")
        print("  )")

if __name__ == '__main__':
    main()
