"""
Example: Using trained DistilBERT models from HuggingFace Hub
This version loads models directly from HuggingFace instead of local files
"""

import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification

class TPBInferenceFromHub:
    """TPB inference using models from HuggingFace Hub"""
    
    def __init__(self, username: str):
        """
        Load all three TPB models from HuggingFace Hub
        
        Args:
            username: Your HuggingFace username
        """
        print("Loading models from HuggingFace Hub...")
        
        # Load attitude model
        print("  Loading attitude model...")
        self.attitude_tokenizer = DistilBertTokenizer.from_pretrained(
            f'{username}/tpb-attitude-nutrition'
        )
        self.attitude_model = DistilBertForSequenceClassification.from_pretrained(
            f'{username}/tpb-attitude-nutrition'
        )
        
        # Load subjective norm model
        print("  Loading subjective norm model...")
        self.subjective_norm_tokenizer = DistilBertTokenizer.from_pretrained(
            f'{username}/tpb-subjective-norm-nutrition'
        )
        self.subjective_norm_model = DistilBertForSequenceClassification.from_pretrained(
            f'{username}/tpb-subjective-norm-nutrition'
        )
        
        # Load perceived control model
        print("  Loading perceived control model...")
        self.perceived_control_tokenizer = DistilBertTokenizer.from_pretrained(
            f'{username}/tpb-perceived-control-nutrition'
        )
        self.perceived_control_model = DistilBertForSequenceClassification.from_pretrained(
            f'{username}/tpb-perceived-control-nutrition'
        )
        
        # Set models to evaluation mode
        self.attitude_model.eval()
        self.subjective_norm_model.eval()
        self.perceived_control_model.eval()
        
        print("✓ All models loaded successfully!")
    
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
        
        confidence = round(((attitude + subjective_norm + perceived_control) / 15) * 100)
        
        return {
            'attitude': attitude,
            'subjectiveNorm': subjective_norm,
            'perceivedControl': perceived_control,
            'confidence': confidence
        }


class TTMInferenceFromHub:
    """TTM inference using model from HuggingFace Hub"""
    
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
    
    def __init__(self, username: str):
        """
        Load TTM model from HuggingFace Hub
        
        Args:
            username: Your HuggingFace username
        """
        print("Loading TTM model from HuggingFace Hub...")
        
        self.tokenizer = DistilBertTokenizer.from_pretrained(
            f'{username}/ttm-stage-nutrition'
        )
        self.model = DistilBertForSequenceClassification.from_pretrained(
            f'{username}/ttm-stage-nutrition'
        )
        self.model.eval()
        
        print("✓ TTM model loaded successfully!")
    
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
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python inference_from_huggingface.py <your-huggingface-username>")
        print("\nExample:")
        print("  python inference_from_huggingface.py johndoe")
        sys.exit(1)
    
    username = sys.argv[1]
    
    print("\n" + "="*60)
    print(f"Loading models from HuggingFace user: {username}")
    print("="*60 + "\n")
    
    # Initialize models
    try:
        tpb = TPBInferenceFromHub(username)
        ttm = TTMInferenceFromHub(username)
    except Exception as e:
        print(f"\n✗ Error loading models: {e}")
        print("\nMake sure:")
        print("  1. You've uploaded models to HuggingFace")
        print("  2. Your username is correct")
        print("  3. Models are public (or you're authenticated)")
        sys.exit(1)
    
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
    
    print("\n" + "="*60)
    print("✓ All tests completed successfully!")
    print("="*60)
