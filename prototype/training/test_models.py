"""
Quick test script to verify models are working
"""

from inference_example import TPBInference, TTMInference

def test_models():
    print("="*60)
    print("TESTING TRAINED BERT MODELS")
    print("="*60)
    
    # Load models
    print("\n1. Loading models...")
    try:
        tpb = TPBInference()
        print("   ✓ TPB models loaded")
    except Exception as e:
        print(f"   ✗ Failed to load TPB models: {e}")
        return
    
    try:
        ttm = TTMInference()
        print("   ✓ TTM model loaded")
    except Exception as e:
        print(f"   ✗ Failed to load TTM model: {e}")
        return
    
    # Test TPB
    print("\n2. Testing TPB inference...")
    test_text = "I love healthy food, it's amazing!"
    try:
        result = tpb.predict_all(test_text)
        print(f"   Text: '{test_text}'")
        print(f"   ✓ Attitude: {result['attitude']}/5")
        print(f"   ✓ Subjective Norm: {result['subjectiveNorm']}/5")
        print(f"   ✓ Perceived Control: {result['perceivedControl']}/5")
        print(f"   ✓ Confidence: {result['confidence']}%")
    except Exception as e:
        print(f"   ✗ TPB inference failed: {e}")
        return
    
    # Test TTM
    print("\n3. Testing TTM inference...")
    test_text = "I'm thinking about eating healthier"
    try:
        result = ttm.predict(test_text)
        print(f"   Text: '{test_text}'")
        print(f"   ✓ Stage: {result['stage']}")
        print(f"   ✓ Description: {result['description']}")
        print(f"   ✓ Confidence: {result['confidence']}%")
    except Exception as e:
        print(f"   ✗ TTM inference failed: {e}")
        return
    
    print("\n" + "="*60)
    print("ALL TESTS PASSED! ✓")
    print("="*60)
    print("\nYour models are ready to use!")
    print("Next steps:")
    print("  1. Run 'python api_server.py' to start the API")
    print("  2. Use the TypeScript service in your React app")
    print("  3. See USAGE_GUIDE.md for more examples")

if __name__ == '__main__':
    test_models()
