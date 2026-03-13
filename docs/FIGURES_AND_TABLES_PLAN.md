# Figures and Tables Plan for Methods Chapter

This document outlines where figures and tables should be added to enhance the methods chapter's clarity and visual presentation.

## Figures Needed

### 1. Seven-Step Pipeline Architecture (Figure 3)
**Location:** Seven-Step Computational Pipeline section (after line ~77)
**Type:** System architecture diagram
**Content:** 
- Visual flowchart showing all 7 steps
- Data flow between steps (JSON payloads)
- Input/output for each step
- Microservice architecture representation

### 2. Iterative Development Cycle (Figure 2) 
**Location:** Research Design section (after line ~18)
**Type:** Process flow diagram
**Content:**
- Requirements → Design → Development → Testing → Review cycle
- Three iterations shown as connected cycles
- Feedback loops between iterations

### 3. TPB-TTM Integration Framework
**Location:** Conceptual Framework section (after Integration explanation)
**Type:** Conceptual diagram
**Content:**
- TPB constructs (A, SN, PBC) feeding into intervention selection
- TTM stages determining intervention mode
- Integration logic showing stage-dependent approach

### 4. Longitudinal Tracking Visualization
**Location:** Iteration 2 Design section (after longitudinal tracking explanation)
**Type:** Timeline/tracking diagram
**Content:**
- Session-to-session tracking of TPB scores
- TTM stage progression over time
- Exponential smoothing visualization
- Early warning system triggers

### 5. Recipe Recommendation Architecture
**Location:** Step 6 explanation in Iteration 1
**Type:** System architecture diagram
**Content:**
- FAISS semantic search process
- Two-stage filtering (semantic → constraint)
- Multi-criteria scoring visualization
- RecipeNLG database representation

### 6. Response Generation Flow
**Location:** Step 7 explanation in Iteration 1
**Type:** Process flow diagram
**Content:**
- Input synthesis from all previous steps
- Prompt template structure
- Quality assurance checks
- Longitudinal record updates

## Tables Needed

### 1. Iteration Summary Table (Already exists)
**Location:** Summary of Iterative Development section
**Status:** ✅ Already implemented
**Content:** Iteration focus, data source, key outputs

### 2. Seven-Step Pipeline Overview (Already exists)
**Location:** Conceptual Framework section
**Status:** ✅ Already implemented  
**Content:** Step number, process, theoretical connection

### 3. TPB Construct Operationalization
**Location:** Theoretical Framework section (after TPB explanation)
**Content:**
| Construct | Definition | Measurement Approach | Example Themes |
|-----------|------------|---------------------|----------------|
| Attitude | Evaluation of behavior | Theme detection + scoring | "healthy food tastes bad", "cooking is rewarding" |
| Subjective Norm | Social pressure | Social reference extraction | "family expects fast food", "friends support healthy eating" |
| PBC | Perceived control | Barrier/facilitator identification | "no time to cook", "confident in kitchen skills" |

### 4. TTM Stage Characteristics and Interventions
**Location:** Theoretical Framework section (after TTM explanation)
**Content:**
| Stage | Characteristics | Intervention Mode | Example BCTs |
|-------|----------------|-------------------|--------------|
| Pre-contemplation | Not considering change | Awareness | Information about consequences |
| Contemplation | Thinking about change | Ambivalence-resolution | Pros and cons exploration |
| Preparation | Planning to act | Planning | Action planning, goal setting |
| Action | Actively changing | Coping | Self-monitoring, problem solving |
| Maintenance | Sustaining change | Relapse-prevention | Relapse prevention, social support |

### 5. Model Architecture Comparison
**Location:** Iteration 2 Design section
**Content:**
| Component | DeBERTa-v3 Approach | RoBERTa Approach | Selection Criteria |
|-----------|-------------------|------------------|-------------------|
| Input | Conversation window | Conversation window | Same |
| Processing | Multi-label theme classification | Direct regression | Performance comparison |
| Output | Theme scores → TPB mapping | Direct TPB scores | Accuracy, interpretability |
| Advantages | Interpretable, theory-aligned | Direct, potentially more accurate | Empirical evaluation |

### 6. Evaluation Metrics Summary
**Location:** Evaluation Metrics section (before detailed formulas)
**Content:**
| Metric Category | Specific Metrics | Target Thresholds | Application |
|----------------|------------------|-------------------|-------------|
| Classification | Precision, Recall, F1 | F1 > 0.80 | Theme detection, TTM staging |
| Regression | MAE, RMSE, R² | MAE < 0.5 | TPB construct scoring |
| Correlation | Pearson r | r > 0.70 | Validation against surveys |
| Expert Review | Safety rating | ≥85% safe (≥3/5) | Nutritionist validation |
| User Experience | SUS score | > 68 | Usability assessment |

### 7. BCT Selection Matrix
**Location:** After BCT explanation (before Step 5)
**Content:**
| TTM Stage | Weak Attitude | Weak Subjective Norm | Weak PBC |
|-----------|---------------|---------------------|----------|
| Pre-contemplation | Health consequences info | Social norm info | Capability info |
| Contemplation | Pros/cons exploration | Social support identification | Barrier identification |
| Preparation | Goal setting | Social support planning | Action planning |
| Action | Self-monitoring | Social support utilization | Problem solving |
| Maintenance | Relapse prevention | Social support maintenance | Coping strategies |

### 8. Data Collection Timeline
**Location:** Data Collection and Preparation section
**Content:**
| Phase | Duration | Participants | Data Collected | Purpose |
|-------|----------|-------------|----------------|---------|
| Preliminary Survey | 2-3 weeks | 200-300 | Quali-quanti responses | Model training data |
| Iteration 1 Testing | 1 week | Synthetic data | Pipeline validation | Technical testing |
| Iteration 2 Pilot | 2 weeks | 10-15 users | Conversation logs | Model validation |
| Iteration 3 Evaluation | 3 weeks | 30-50 users | Full assessment | Comprehensive testing |

## Implementation Notes

### Figure Creation Tools
- **Diagrams:** Draw.io, Lucidchart, or Figma for system architectures
- **Flowcharts:** Microsoft Visio or online tools
- **Conceptual diagrams:** Adobe Illustrator or Canva for clean academic figures

### Table Formatting
- Use Typst's native table syntax for consistency
- Ensure proper alignment and spacing
- Include table captions and numbering
- Reference tables in text appropriately

### Integration Strategy
1. Create figures first as separate files (PNG/SVG)
2. Add figures to `figures/` directory
3. Update Typst code to include figures with proper captions
4. Create tables directly in Typst using table syntax
5. Add cross-references throughout the text

### Priority Order
1. **High Priority:** Seven-step pipeline, TPB-TTM integration, evaluation metrics
2. **Medium Priority:** Longitudinal tracking, recipe architecture, BCT matrix
3. **Low Priority:** Response generation flow, data collection timeline

This visual enhancement will significantly improve the methods chapter's clarity and academic presentation.