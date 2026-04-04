/**
 * BERT Inference Service
 * 
 * Calls the Python Flask API to get TPB/TTM predictions from fine-tuned DistilBERT models
 */

export interface TPBScores {
  attitude: number;           // 1-5 scale
  subjectiveNorm: number;     // 1-5 scale
  perceivedControl: number;   // 1-5 scale
  confidence: number;         // 0-100 percentage
}

export interface TTMStage {
  stage: 'preContemplation' | 'contemplation' | 'preparation' | 'action' | 'maintenance';
  confidence: number;         // 0-100 percentage
  description: string;
}

export interface CombinedPrediction {
  tpb: TPBScores;
  ttm: TTMStage;
}

const API_BASE_URL = process.env.REACT_APP_BERT_API_URL || 'http://localhost:5000';

/**
 * Predict TPB scores from user text using BERT
 */
export async function predictTPB(text: string): Promise<TPBScores> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tpb/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error predicting TPB scores:', error);
    throw error;
  }
}

/**
 * Predict TTM stage from user text using BERT
 */
export async function predictTTM(text: string): Promise<TTMStage> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ttm/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error predicting TTM stage:', error);
    throw error;
  }
}

/**
 * Predict both TPB and TTM from user text using BERT
 */
export async function predictAll(text: string): Promise<CombinedPrediction> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error predicting combined scores:', error);
    throw error;
  }
}

/**
 * Check if the BERT API is available
 */
export async function checkAPIHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });

    return response.ok;
  } catch (error) {
    console.error('BERT API is not available:', error);
    return false;
  }
}

/**
 * Convert 1-5 scale to 0-100 scale
 */
export function scaleToPercentage(score: number): number {
  return Math.round(((score - 1) / 4) * 100);
}

/**
 * Convert TPB scores to format compatible with existing inference services
 */
export function convertTPBScores(bertScores: TPBScores): {
  attitude: number;
  subjectiveNorm: number;
  perceivedControl: number;
  confidence: number;
} {
  return {
    attitude: scaleToPercentage(bertScores.attitude),
    subjectiveNorm: scaleToPercentage(bertScores.subjectiveNorm),
    perceivedControl: scaleToPercentage(bertScores.perceivedControl),
    confidence: bertScores.confidence,
  };
}
