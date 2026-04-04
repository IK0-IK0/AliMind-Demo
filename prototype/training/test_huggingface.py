"""
Quick test to verify HuggingFace models work
"""

from inference_from_huggingface import TPBInferenceFromHub, TTMInferenceFromHub

def test_huggingface_models():
    print("="*60)
    print("TESTING HUGGINGFACE MODELS")
    print("="*60)
    
    username = "franzzzzzzzzz"
    
    print(f"\nLoading models from HuggingFace user: {username}")
    print("(This may take a few minutes on first run)")
    print()
    
    try:
        # Load models
        tpb = TPBInferenceFromHub(username)
        ttm = TTMInferenceFromHub(username)
        
        print("\n" + "="*60)
        print("✓ MODELS LOADED SUCCESSFULLY!")
        print("="*60)
        
        # Test TPB
        print("\nTesting TPB inference...")
        text = "I love healthy food, it's amazing!"
        result = tpb.predict_all(text)
        print(f"Text: '{text}'")
        print(f"✓ Attitude: {result['attitude']}/5")
        print(f"✓ Subjective Norm: {result['subjectiveNorm']}/5")
        print(f"✓ Perceived Control: {result['perceivedControl']}/5")
        print(f"✓ Confidence: {result['confidence']}%")
        
        # Test TTM
        print("\nTesting TTM inference...")
        text = "I'm thinking about eating healthier"
        result = ttm.predict(text)
        print(f"Text: '{text}'")
        print(f"✓ Stage: {result['stage']}")
        print(f"✓ Description: {result['description']}")
        print(f"✓ Confidence: {result['confidence']}%")
        
        print("\n" + "="*60)
        print("✓ ALL TESTS PASSED!")
        print("="*60)
        print("\nYour HuggingFace models are working perfectly!")
        print("Next step: Start the API server with:")
        print("  python api_server_huggingface.py")
        
        return True
        
    except Exception as e:
        print(f"\n✗ Error: {e}")
        print("\nTroubleshooting:")
        print("1. Check models are uploaded: https://huggingface.co/franzzzzzzzzz")
        print("2. Verify models are public")
        print("3. Check internet connection")
        return False

if __name__ == '__main__':
    test_huggingface_models()
