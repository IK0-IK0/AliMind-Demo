"""
Flask API server for TPB/TTM inference
Provides REST endpoints for the TypeScript frontend to call
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from inference_example import TPBInference, TTMInference
import logging

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load models on startup
logger.info("Loading models...")
tpb_inference = TPBInference()
ttm_inference = TTMInference()
logger.info("Models loaded successfully!")


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'API is running'})


@app.route('/api/tpb/predict', methods=['POST'])
def predict_tpb():
    """
    Predict TPB scores from user text
    
    Request body:
    {
        "text": "I love healthy food"
    }
    
    Response:
    {
        "attitude": 5,
        "subjectiveNorm": 3,
        "perceivedControl": 4,
        "confidence": 80
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Missing "text" field in request'}), 400
        
        text = data['text']
        
        if not text or not text.strip():
            return jsonify({'error': 'Text cannot be empty'}), 400
        
        # Run inference
        result = tpb_inference.predict_all(text)
        
        logger.info(f"TPB prediction: {result}")
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Error in TPB prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/ttm/predict', methods=['POST'])
def predict_ttm():
    """
    Predict TTM stage from user text
    
    Request body:
    {
        "text": "I'm thinking about eating healthier"
    }
    
    Response:
    {
        "stage": "contemplation",
        "confidence": 85,
        "description": "Thinking about making changes"
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Missing "text" field in request'}), 400
        
        text = data['text']
        
        if not text or not text.strip():
            return jsonify({'error': 'Text cannot be empty'}), 400
        
        # Run inference
        result = ttm_inference.predict(text)
        
        logger.info(f"TTM prediction: {result}")
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Error in TTM prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/predict', methods=['POST'])
def predict_all():
    """
    Predict both TPB and TTM from user text
    
    Request body:
    {
        "text": "I love healthy food and I'm starting to eat better"
    }
    
    Response:
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
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Missing "text" field in request'}), 400
        
        text = data['text']
        
        if not text or not text.strip():
            return jsonify({'error': 'Text cannot be empty'}), 400
        
        # Run both inferences
        tpb_result = tpb_inference.predict_all(text)
        ttm_result = ttm_inference.predict(text)
        
        result = {
            'tpb': tpb_result,
            'ttm': ttm_result
        }
        
        logger.info(f"Combined prediction: {result}")
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Error in combined prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    # Run server
    print("\n" + "="*60)
    print("TPB/TTM Inference API Server")
    print("="*60)
    print("\nEndpoints:")
    print("  GET  /health              - Health check")
    print("  POST /api/tpb/predict     - TPB inference")
    print("  POST /api/ttm/predict     - TTM inference")
    print("  POST /api/predict         - Combined inference")
    print("\nStarting server on http://localhost:5000")
    print("="*60 + "\n")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
