# Formula Updates - Methods Section

## Changes Made

All mathematical formulas have been moved to their own lines and given equation labels for easy cross-referencing.

## Equation List

### Equation 1: TPB Construct Score Calculation
**Location:** Iteration 1, Design, Step 2
**Label:** `<eq:tpb-score>`

```typst
$ "Score"_"construct" = frac(sum_{i=1}^{n} ( w_i times m_{"ic"} times "confidence"_i times "intensity"_i ), sum_{i=1}^{n} ( w_i times m_{"ic"} times "max_intensity" )) $ <eq:tpb-score>
```

**Purpose:** Calculates TPB construct scores (Attitude, Subjective Norm, PBC) from detected themes

**Variables:**
- $w_i$ = population-specific regression weight for theme $i$
- $m_{"ic"}$ = mapping weight of theme $i$ to construct $c$
- $"confidence"_i$ = classifier's confidence score for theme $i$
- $"intensity"_i$ = normalized frequency of theme-related language

---

### Equation 2: Ensemble Score Aggregation
**Location:** Iteration 1, Design, Step 2
**Label:** `<eq:ensemble-score>`

```typst
$ "Score"_"final" = 0.6 times "Score"_"deberta" + 0.3 times "Score"_"roberta" + 0.1 times "Score"_"rule" $ <eq:ensemble-score>
```

**Purpose:** Combines scores from three models (DeBERTa, RoBERTa, rule-based) into final TPB construct score

**Weights:**
- 0.6 for DeBERTa-v3 (primary model)
- 0.3 for RoBERTa regression head (auxiliary)
- 0.1 for rule-based fallback

**Condition:** Applied when confidence in primary model exceeds 0.85

---

### Equation 3: Weakest Determinant Identification
**Location:** Iteration 1, Design, Step 5
**Label:** `<eq:weakest-determinant>`

```typst
$ "WeakestDeterminant" = "argmin"_{c in {A, "SN", "PBC"}} "Score"_c $ <eq:weakest-determinant>
```

**Purpose:** Identifies which TPB construct (Attitude, Subjective Norm, or PBC) has the lowest score to target for intervention

---

### Equation 4: Recipe Final Score Calculation
**Location:** Iteration 1, Design, Step 6
**Label:** `<eq:recipe-score>`

```typst
$ "FinalScore" = 0.4 dot.op "HealthScore" + 0.3 dot.op (1 - "Difficulty") + 0.2 dot.op "PreferenceMatch" + 0.1 dot.op "NoveltyBonus" $ <eq:recipe-score>
```

**Purpose:** Ranks recipe recommendations using multi-criteria scoring

**Weights:**
- 0.4 for health/nutrition score
- 0.3 for ease (inverse of difficulty)
- 0.2 for user preference match
- 0.1 for novelty (not suggested recently)

---

### Equation 5: Behavioral Intention Regression
**Location:** Iteration 2, Design, Model Architecture for Step 2
**Label:** `<eq:regression>`

```typst
$ "BI" = beta_0 + beta_1 A + beta_2 "SN" + beta_3 "PBC" + epsilon $ <eq:regression>
```

**Purpose:** Multiple linear regression to derive population-specific weights for TPB constructs

**Variables:**
- BI = Behavioral Intention
- A = Attitude
- SN = Subjective Norm
- PBC = Perceived Behavioral Control
- $beta_0, beta_1, beta_2, beta_3$ = regression coefficients
- $epsilon$ = error term

**Note:** Coefficients from this regression become the $w_i$ weights in Equation 1

---

### Equation 6: TTM Stage Probability Distribution
**Location:** Iteration 2, Design, Model Architecture for Step 3
**Label:** `<eq:stage-prob>`

```typst
$ P("stage" = s | text) = "softmax"(W dot.op h + b) $ <eq:stage-prob>
```

**Purpose:** Calculates probability distribution across five TTM stages from conversation text

**Variables:**
- $h$ = hidden representation from transformer (DistilBERT/BERT-small)
- $W$ = weight matrix
- $b$ = bias term
- $s$ = stage (Pre-contemplation, Contemplation, Preparation, Action, Maintenance)

**Output:** Predicted stage is the one with highest probability

---

## Cross-References in Technical Specifications Section

The Technical Specifications section at the end now references these equations:
- Step 2 references "Equation 1" instead of repeating the formula
- Ensemble approach references "Equation 2"
- Step 5 references "Equation 3"
- Step 6 references "Equation 4"

## How to Reference Equations in Text

To reference an equation in your text, use:
```typst
As shown in @eq:tpb-score, the construct score is calculated...
```

This will automatically create a clickable link to the equation.

## Equation Numbering

Typst will automatically number these equations sequentially (1, 2, 3, 4, 5, 6) when you compile the document.

## Visual Improvements

All formulas now:
1. Appear on their own lines (not inline)
2. Are centered on the page
3. Have equation labels for cross-referencing
4. Are listed in the "Key Equations" section at the start of Design Procedure
5. Can be referenced by number throughout the text
