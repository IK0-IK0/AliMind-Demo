# Methods Section Reorganization Notes

## What Changed

The Methods section has been reorganized from a **component-based structure** to an **iteration-based structure** following the WiMarka example you provided.

### Old Structure (methods.typ)
```
= Methods and Materials
  == Research Method (DSR overview)
  == Design Procedure
    - Brief iteration descriptions
    - Then detailed Iteration 1, 2, 3 descriptions
  == Theoretical Framework (TPB, TTM, Integration)
  == Conceptual Framework (7-step pipeline overview)
  == Requirements Analysis & Planning
  == Implementation
    === Step 1: Conversational Context Collection (full details)
    === Step 2: TPB Construct Inference (full details)
    === Step 3: Stage Estimation (full details)
    ... (all 7 steps with extensive detail)
```

**Problems:**
- Unclear when each step happens in which iteration
- Repetitive content (iterations described twice)
- Mixed levels of detail
- Hard to follow the development timeline

### New Structure (methods_reorganized.typ)
```
= Methods and Materials
  == Research Design
    === Design Science Research Approach
    === Overview of Iterations (brief summary)
  
  == Theoretical and Conceptual Framework
    === TPB (theory explanation)
    === TTM (theory explanation)
    === Integration of TPB and TTM
    === Seven-Step Pipeline (overview only, not full details)
  
  == Data Collection and Preparation
    === Target Population
    === Preliminary Survey (Stage 1 & 2)
    === Datasets and Sources
    === Programming Environment
  
  == Design Procedure
    === Iteration 1: Synthetic Data and Pipeline Prototyping
      ==== A. Requirements Gathering
      ==== B. Design
      ==== C. Development
      ==== D. Testing
      ==== E. Review
    
    === Iteration 2: Real Data Integration and Model Fine-Tuning
      ==== A. Design
      ==== B. Development
      ==== C. Testing
      ==== D. Review
    
    === Iteration 3: Refinement and Enhancement
      ==== A. Design
      ==== B. Development
      ==== C. Testing
      ==== D. Review
  
  == Summary of Iterative Development (table)
  
  == Technical Specifications
    === Step 1: Conversational Context Collection
    === Step 2: TPB Construct Inference
    ... (all 7 steps, concise technical details)
  
  == Evaluation Metrics
```

## Key Improvements

1. **Clear Timeline**: Readers can follow the development chronologically through iterations
2. **Theory First**: Theoretical framework presented before technical details
3. **Iteration-Specific Details**: Each iteration clearly states what data is used, what's being built, and what's being tested
4. **Technical Specs Separated**: Detailed technical specifications moved to appendix-like section
5. **No Repetition**: Each piece of information appears once in the appropriate iteration

## Notes for Uncertain Parts

Throughout the reorganized document, I've added `// NOTE:` comments for parts that may need clarification:

- **Iteration 1 Notes:**
  - "Theme taxonomy not yet available in Iteration 1; will use placeholder themes for prototyping"
  - "Models are NOT fine-tuned in Iteration 1; using base/pretrained versions only"
  - "No human evaluation in Iteration 1; purely technical/functional testing"

- **Iteration 2 Notes:**
  - "Steps 1, 4, 5, 6, 7 remain largely unchanged from Iteration 1, with minor prompt refinements"
  - "No formal expert evaluation yet; focus is on technical performance and user experience"
  - "Theme taxonomy and weights established in Iteration 2 from preliminary survey"

- **Iteration 3 Notes:**
  - "This is the final development iteration before comprehensive evaluation"
  - "This is the most comprehensive testing phase; includes technical, expert, and user evaluation"
  - "System is now ready for potential deployment or larger-scale validation studies"

## What to Review

1. **Check iteration boundaries**: Verify that what happens in each iteration matches your actual plan
2. **Data availability**: Confirm when preliminary survey data becomes available (assumed Iteration 2)
3. **Sample sizes**: Review if n=10-15 for Iteration 2 pilot and n=30-50 for Iteration 3 are correct
4. **Evaluation timing**: Confirm expert evaluation happens in Iteration 3 only
5. **Model training**: Verify that fine-tuning happens in Iteration 2, not Iteration 1

## Files

- **Original**: `chapters/methods.typ` (keep for reference)
- **Reorganized**: `chapters/methods_reorganized.typ` (new structure)
- **To use**: Replace `methods.typ` with `methods_reorganized.typ` when ready
