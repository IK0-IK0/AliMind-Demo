/**
 * BERT Inference Service (Browser Version)
 * 
 * Uses Transformers.js to run models directly in the browser
 * No Python server needed!
 */

import { pipeline, env } from '@xenova/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

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

const HUGGINGFACE_USERNAME = 'franzzzzzzzzz';

// Model instances (lazy loaded)
let attitudeClassifier: any = null;
let subjectiveNormClassifier: any = null;
let perceivedControlClassifier: any = null;
let ttmClassifier: any = null;

// Loading state
let modelsLoading = false;
let modelsLoaded = false;

/**
 * Initialize models (call once at app startup)
 */
export async function initializeBERTModels(): Promise<void> {
  if (modelsLoaded || modelsLoading) return;
  
  modelsLoading = true;
  console.log('Loading BERT models from HuggingFace...');
  
  try {
    // Load all models in parallel
    const [attitude, subjectiveNorm, perceivedControl, ttm] = await Promise.all([
      pipeline('text-classification', `${HUGGINGFACE_USERNAME}/tpb-attitude-nutrition`),
      pipeline('text-classification', `${HUGGINGFACE_USERNAME}/tpb-subjective-norm-nutrition`),
      pipeline('text-classification', `${HUGGINGFACE_USERNAME}/tpb-perceived-control-nutrition`),
      pipeline('text-classification', `${HUGGINGFACE_USERNAME}/ttm-stage-nutrition`)
    ]);
    
    attitudeClassifier = attitude;
    subjectiveNormClassifier = subjectiveNorm;
    perceivedControlClassifier = perceivedControl;
    ttmClassifier = ttm;
    
    modelsLoaded = true;
    modelsLoading = false;
    console.log('✓ BERT models loaded successfully!');
  } catch (error) {
    modelsLoading = false;
    console.error('Failed to load BERT models:', error);
    throw error;
  }
}

/**
 * Check if models are ready
 */
export function areBERTModelsReady(): boolean {
  return modelsLoaded;
}

/**
 * Predict TPB attitude score
 */
async function predictAttitude(text: string): Promise<number> {
  if (!attitudeClassifier) {
    await initializeBERTModels();
  }
  
  const result = await attitudeClassifier(text);
  const prediction = result[0].label; // "LABEL_0" to "LABEL_4"
  const labelNum = parseInt(prediction.split('_')[1]);
  return labelNum + 1; // Convert 0-4 to 1-5
}

/**
 * Predict TPB subjective norm score
 */
async function predictSubjectiveNorm(text: string): Promise<number> {
  if (!subjectiveNormClassifier) {
    await initializeBERTModels();
  }
  
  const result = await subjectiveNormClassifier(text);
  const prediction = result[0].label;
  const labelNum = parseInt(prediction.split('_')[1]);
  return labelNum + 1;
}

/**
 * Predict TPB perceived control score
 */
async function predictPerceivedControl(text: string): Promise<number> {
  if (!perceivedControlClassifier) {
    await initializeBERTModels();
  }
  
  const result = await perceivedControlClassifier(text);
  const prediction = result[0].label;
  const labelNum = parseInt(prediction.split('_')[1]);
  return labelNum + 1;
}

/**
 * Predict all TPB scores
 */
export async function predictTPB(text: string): Promise<TPBScores> {
  try {
    // Run all predictions in parallel
    const [attitude, subjectiveNorm, perceivedControl] = await Promise.all([
      predictAttitude(text),
      predictSubjectiveNorm(text),
      predictPerceivedControl(text)
    ]);
    
    // Calculate confidence (average, normalized to 0-100)
    const confidence = Math.round(((attitude + subjectiveNorm + perceivedControl) / 15) * 100);
    
    return {
      attitude,
      subjectiveNorm,
      perceivedControl,
      confidence
    };
  } catch (error) {
    console.error('Error predicting TPB scores:', error);
    throw error;
  }
}

/**
 * Predict TTM stage
 */
export async function predictTTM(text: string): Promise<TTMStage> {
  try {
    if (!ttmClassifier) {
      await initializeBERTModels();
    }
    
    const result = await ttmClassifier(text);
    const prediction = result[0].label; // "LABEL_0" to "LABEL_4"
    const confidence = Math.round(result[0].score * 100);
    const labelNum = parseInt(prediction.split('_')[1]);
    
    const stages = [
      'preContemplation',
      'contemplation',
      'preparation',
      'action',
      'maintenance'
    ] as const;
    
    const descriptions = {
      preContemplation: 'Not yet considering change',
      contemplation: 'Thinking about making changes',
      preparation: 'Getting ready to take action',
      action: 'Actively making changes',
      maintenance: 'Maintaining healthy habits'
    };
    
    const stage = stages[labelNum];
    
    return {
      stage,
      confidence,
      description: descriptions[stage]
    };
  } catch (error) {
    console.error('Error predicting TTM stage:', error);
    throw error;
  }
}

/**
 * Predict both TPB and TTM
 */
export async function predictAll(text: string): Promise<CombinedPrediction> {
  try {
    const [tpb, ttm] = await Promise.all([
      predictTPB(text),
      predictTTM(text)
    ]);
    
    return { tpb, ttm };
  } catch (error) {
    console.error('Error predicting combined scores:', error);
    throw error;
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
