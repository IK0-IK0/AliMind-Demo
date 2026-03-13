# Methods Section - Final Integration Notes

## What Was Done

I've integrated the detailed technical content from `src/main.typ` into the iteration-based structure in `chapters/methods_reorganized.typ`, focusing on Iterations 1 and 2 as requested.

## Changes Made

### Iteration 1 - Design Section (Significantly Expanded)

**Added detailed technical specifications for all 7 steps:**

**Step 1 (Conversational Context Collection):**
- Design rationale with citations
- Conversational prompt reformulation approach
- LangChain dialogue state tracking
- Confidence-based clarification mechanism
- Input/output specifications
- Tools: LangChain, Llama 3 8B/Mistral 7B, spaCy, bert-fda-nutrition-ner

**Step 2 (TPB Construct Inference):**
- Theme detection process with DeBERTa-v3
- Theme-to-construct mapping matrix explanation
- Complete scoring formula with mathematical notation
- Ensemble approach (DeBERTa + RoBERTa + keyword fallback)
- Weighted averaging formula with specific weights (0.6, 0.3, 0.1)

**Step 3 (Stage Estimation - TTM):**
- Two-tier classification approach
- DistilBERT/BERT-small architecture
- Probability distribution formula
- Confidence thresholds (≥0.7, 0.5-0.7, <0.5)
- Rule-based fallback with linguistic markers
- Longitudinal tracking across sessions

**Step 4 (Intervention Mode Selection):**
- Deterministic stage-to-mode mapping
- Five intervention modes with citations
- TTM clinical guidelines basis

**Step 5 (TPB-Targeted Intervention Choice):**
- Weakest determinant identification formula
- BCT library mapping
- Stage-dependent logic (TTM-led vs TPB-led)
- BCTTv1 taxonomy reference

**Step 6 (Feasible Dish/Plan Generation):**
- Hybrid search architecture (4 steps)
- FAISS IVF retrieval
- Multi-criteria scoring formula with weights
- RecipeNLG dataset (2.2M recipes)

**Step 7 (Response Generation):**
- Input/output specifications
- Llama 3 8B / Mistral 7B with LoRA fine-tuning
- Unsloth framework
- Training data sources

### Iteration 2 - Design Section (Significantly Expanded)

**Added detailed technical content:**

**Theme Taxonomy Development:**
- Thematic analysis process
- Example themes with mapping weights
- Expert review validation
- Specific weight examples (e.g., time scarcity: PBC=0.9, Attitude=0.3)

**Model Architecture for Step 2:**
- DeBERTa-v3 fine-tuning details
  - Binary cross-entropy loss
  - Class weight handling
  - 80/10/10 split
  - F1 > 0.80 threshold
- RoBERTa regression head details
- Keyword dictionary fallback
- Population-specific regression weights
  - Multiple linear regression formula
  - Standardized coefficients explanation

**Model Architecture for Step 3:**
- DistilBERT/BERT-small fine-tuning
- Probability distribution formula
- Linguistic marker fallback with citations
- 512 token window specification

**Confidence Threshold Calibration:**
- Step 2 thresholds (< 0.6 triggers clarification)
- Step 3 thresholds (three levels with specific actions)
- Precision vs coverage trade-off

**Validation Protocols:**
- 80/10/10 split details
- Specific metrics for each task:
  - Theme classification: Precision, Recall, F1 (target >0.80)
  - TPB scoring: MAE, RMSE, R² (target MAE <0.5)
  - TTM classification: Accuracy, Precision, Recall, weighted F1 (target >0.80)
- Pearson correlation tracking

### Iteration 3 - Kept Concise (As Requested)

- Removed cultural adaptation (replaced with UX improvements)
- Focused on fallback mechanisms and user experience refinements
- No heavy technical details (as it's polish/refinement phase)

## Content Preserved from Original

All the following content from `src/main.typ` is now integrated:
- Mathematical formulas (scoring, probability distributions)
- Model specifications (DeBERTa-v3, RoBERTa, DistilBERT, Llama 3, Mistral)
- Confidence thresholds and their rationale
- Ensemble architecture with specific weights
- Validation metrics and targets
- Tool selections with justifications
- Citations to support design decisions

## What's Still in Technical Specifications Section

The "Technical Specifications" section at the end still contains:
- Concise summaries of each step
- Can be kept for quick reference
- Or can be removed if redundant (since details are now in iterations)

## File Sizes

- Old methods.typ: 94,217 characters
- New methods_reorganized.typ: ~70,000+ characters (estimated after additions)
- Much more balanced now!

## Recommendations

1. **Review Iteration 1 Design section** - It's now quite detailed. Make sure the level of detail is appropriate for your audience.

2. **Consider moving some tables** - Tables like "Dialogue State Tracking Variables" and "Theme-to-Construct Mapping" from the old methods could be added to Iteration 1 or 2 if needed.

3. **Check the Technical Specifications section** - Decide if you want to keep it as a quick reference or remove it since details are now in iterations.

4. **Verify formulas render correctly** - Make sure all the mathematical notation displays properly in Typst.

5. **Add any missing tables** - If there are important tables from main.typ that should be in the iterations, let me know.

## Next Steps

When you're ready:
1. Review `chapters/methods_reorganized.typ`
2. Test compile it to see if formulas render
3. Decide if you want to add any tables from the original
4. Replace `chapters/methods.typ` with `methods_reorganized.typ`
