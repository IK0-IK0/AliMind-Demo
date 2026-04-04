"""
Example: Using trained DistilBERT models for TPB/TTM inference
"""

import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
from pathlib import Path

class TPBInference:
    """TPB inference using fine-tuned DistilBERT models"""
    
    def __init__(self, models_dir='./models/tpb'):
        """Load all three TPB models"""
        self.models_dir = Path(models_dir)
        
        # Load attitude model
        self.attitude_tokenizer = DistilBertTokenizer.from_pretrained(
            str(self.models_dir / 'attitude' / 'final_model')
        )
        self.attitude_model = DistilBertForSequenceClassification.from_pretrained(
            str(self.models_dir / 'attitude' / 'final_model')
        )
        
        # Load subjective norm model
        self.subjective_norm_tokenizer = DistilBertTokenizer.from_pretrained(
            str(self.models_dir / 'subjectiveNorm' / 'final_model')
        )
        self.subjective_norm_model = DistilBertForSequenceClassification.from_pretrained(
            str(self.models_dir / 'subjectiveNorm' / 'final_model')
        )
        
        # Load perceived control model
        self.perceived_control_tokenizer = DistilBertTokenizer.from_pretrained(
            str(self.models_dir / 'perceivedControl' / 'final_model')
        )
        self.perceived_control_model = DistilBertForSequenceClassification.from_pretrained(
            str(self.models_dir / 'perceivedControl' / 'final_model')
        )
        
        # Set models to evaluation mode
        self.attitude_model.eval()
        self.subjective_norm_model.eval()
        self.perceived_control_model.eval()
    
    def predict_attitude(self, text):
        """Predict attitude score (1-5)"""
        inputs = self.attitude_tokenizer(
            text, 
            return_tensors='pt', 
            padding=True, 
            truncation=True,
            max_length=128
        )
        
        with torch.no_grad():
            outputs = self.attitude_model(**inputs)
            prediction = torch.argmax(outputs.logits, dim=1).item()
        
        # Convert 0-4 back to 1-5 scale
        return prediction + 1
    
    def predict_subjective_norm(self, text):
        """Predict subjective norm score (1-5)"""
        inputs = self.subjective_norm_tokenizer(
            text, 
            return_tensors='pt', 
            padding=True, 
            truncation=True,
            max_length=128
        )
        
        with torch.no_grad():
            outputs = self.subjective_norm_model(**inputs)
            prediction = torch.argmax(outputs.logits, dim=1).item()
        
        return prediction + 1
    
    def predict_perceived_control(self, text):
        """Predict perceived control score (1-5)"""
        inputs = self.perceived_control_tokenizer(
            text, 
            return_tensors='pt', 
            padding=True, 
            truncation=True,
            max_length=128
        )
        
        with torch.no_grad():
            outputs = self.perceived_control_model(**inputs)
            prediction = torch.argmax(outputs.logits, dim=1).item()
        
        return prediction + 1
    
    def predict_all(self, text):
        """Predict all three TPB constructs"""
        attitude = self.predict_attitude(text)
        subjective_norm = self.predict_subjective_norm(text)
        perceived_control = self.predict_perceived_control(text)
        
        # Calculate confidence (average of all three, normalized to 0-100)
        confidence = round(((attitude + subjective_norm + perceived_control) / 15) * 100)
        
        return {
            'attitude': attitude,
            'subjectiveNorm': subjective_norm,
            'perceivedControl': perceived_control,
            'confidence': confidence
        }


class TTMInference:
    """TTM inference using fine-tuned DistilBERT model"""
    
    STAGES = [
        'preContemplation',
        'contemplation', 
        'preparation',
        'action',
        'maintenance'
    ]
    
    STAGE_DESCRIPTIONS = {
        'preContemplation': 'Not yet considering change',
        'contemplation': 'Thinking about making changes',
        'preparation': 'Getting ready to take action',
        'action': 'Actively making changes',
        'maintenance': 'Maintaining healthy habits'
    }
    
    def __init__(self, model_dir='./models/ttm/final_model'):
        """Load TTM model"""
        self.model_dir = Path(model_dir)
        
        self.tokenizer = DistilBertTokenizer.from_pretrained(str(self.model_dir))
        self.model = DistilBertForSequenceClassification.from_pretrained(str(self.model_dir))
        self.model.eval()
    
    def predict(self, text):
        """Predict TTM stage"""
        inputs = self.tokenizer(
            text,
            return_tensors='pt',
            padding=True,
            truncation=True,
            max_length=128
        )
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            logits = outputs.logits
            prediction = torch.argmax(logits, dim=1).item()
            
            # Calculate confidence (softmax probability of predicted class)
            probabilities = torch.softmax(logits, dim=1)
            confidence = round(probabilities[0][prediction].item() * 100)
        
        stage = self.STAGES[prediction]
        description = self.STAGE_DESCRIPTIONS[stage]
        
        return {
            'stage': stage,
            'confidence': confidence,
            'description': description
        }


# Example usage
if __name__ == '__main__':
    # Initialize models
    print("Loading TPB models...")
    tpb = TPBInference()
    
    print("Loading TTM model...")
    ttm = TTMInference()
    
    # Test TPB inference
    print("\n" + "="*60)
    print("TPB INFERENCE TEST")
    print("="*60)
    
    test_texts = [
        "I love healthy food, it's amazing and makes me feel great!",
        "I don't really like healthy eating, it's boring",
        "My family supports me eating healthier",
        "I'm confident I can prepare healthy meals"
    ]
    
    for text in test_texts:
        print(f"\nText: {text}")
        result = tpb.predict_all(text)
        print(f"Attitude: {result['attitude']}/5")
        print(f"Subjective Norm: {result['subjectiveNorm']}/5")
        print(f"Perceived Control: {result['perceivedControl']}/5")
        print(f"Overall Confidence: {result['confidence']}%")
    
    # Test TTM inference
    print("\n" + "="*60)
    print("TTM INFERENCE TEST")
    print("="*60)
    
    ttm_texts = [
        "I'm not interested in changing my diet",
        "I'm thinking about eating healthier",
        "I'm planning to start next week",
        "I just started eating healthy this week",
        "I've been eating healthy for months"
    ]
    
    for text in ttm_texts:
        print(f"\nText: {text}")
        result = ttm.predict(text)
        print(f"Stage: {result['stage']}")
        print(f"Description: {result['description']}")
        print(f"Confidence: {result['confidence']}%")
