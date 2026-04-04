# Training Data for TPB and TTM Inference

This directory contains structured training datasets for the Theory of Planned Behavior (TPB) and Transtheoretical Model (TTM) inference systems.

## Files

### `tpb_training_data.json`
Training data for TPB constructs with 5-point scale (1-5):
- **Scale**: 1 (Very Low) → 5 (Very High)
- **Constructs**: Attitude (5 questions), Subjective Norm (5 questions), Perceived Control (5 questions)
- **Total Questions**: 15 (5 per construct)
- **Format**: Each question has 10 sample answers per scale level (50 samples total per question)
- **Total Samples**: 750 (15 questions × 5 levels × 10 samples)

### `ttm_training_data.json`
Training data for TTM stages of change:
- **Stages**: Pre-contemplation, Contemplation, Preparation, Action, Maintenance
- **Format**: Each question has 10 sample answers per stage (50 samples total per question)

## Data Structure

### TPB Format
```json
{
  "id": "question-id",
  "construct": "attitude|subjectiveNorm|perceivedControl",
  "question": "Question text",
  "samples": {
    "1": ["answer1", "answer2", ...],  // Very Low (10 samples)
    "2": ["answer1", "answer2", ...],  // Low (10 samples)
    "3": ["answer1", "answer2", ...],  // Moderate (10 samples)
    "4": ["answer1", "answer2", ...],  // High (10 samples)
    "5": ["answer1", "answer2", ...]   // Very High (10 samples)
  }
}
```

### TTM Format
```json
{
  "id": "question-id",
  "question": "Question text",
  "samples": {
    "preContemplation": ["answer1", "answer2", ...],  // 10 samples
    "contemplation": ["answer1", "answer2", ...],     // 10 samples
    "preparation": ["answer1", "answer2", ...],       // 10 samples
    "action": ["answer1", "answer2", ...],            // 10 samples
    "maintenance": ["answer1", "answer2", ...]        // 10 samples
  }
}
```

## Usage for Model Training

These datasets can be used to:

1. **Fine-tune language models** for better classification
2. **Train semantic similarity models** to match user responses to scale levels/stages
3. **Improve keyword-based inference** by extracting common patterns
4. **Validate inference accuracy** by testing against known labels

## Expanding the Dataset

To add more questions:
1. Follow the same JSON structure
2. Ensure 10 diverse samples per scale level/stage
3. Include varied language patterns (formal, casual, short, detailed)
4. Cover different demographics and contexts

## Integration with Inference System

The current inference system (`tpbInference.ts`, `ttmInference.ts`) uses keyword matching. To integrate this training data:

1. **Option 1**: Extract keywords from samples to improve keyword dictionaries
2. **Option 2**: Use samples to train a semantic similarity model (e.g., sentence transformers)
3. **Option 3**: Fine-tune a small language model for classification
4. **Option 4**: Use samples for few-shot prompting with LLMs

## Notes

- Each sample represents realistic user responses at different levels
- Samples include varied language styles (confident, uncertain, detailed, brief)
- The 1-5 scale for TPB maps to: 1=0-20, 2=21-40, 3=41-60, 4=61-80, 5=81-100 in the scoring system
- TTM stages are categorical (not ordinal), though they represent progression
