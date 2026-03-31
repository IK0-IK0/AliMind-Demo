# Paper Critique Discussion Notes
Date: 2026-03-26

## Context
- **Team**: 3 Computer Science students + faculty advisor + nutrition specialist
- **Project**: Theory-driven conversational AI for nutrition support (TPB + TTM integration)
- **Timeline**: Feb-Dec 2026 (10 months)
- **Target**: Filipino young adults (18-40) in Davao City

---

## Key Strengths Identified

### 1. Theoretical Foundation
- Strong integration of TPB (Theory of Planned Behavior) and TTM (Transtheoretical Model)
- Clear distinction: TPB provides "what" (barriers), TTM provides "when" (readiness)
- Sophisticated stage-specific weighting strategy:
  - Early stages (Pre-contemplation, Contemplation): TTM-led
  - Middle stages (Preparation, Action): TPB-led
  - Late stage (Maintenance): TTM-led with TPB monitoring

### 2. Technical Architecture
- Seven-step modular pipeline is well-structured
- Comparing DeBERTa-v3 vs RoBERTa for TPB inference shows methodological rigor
- Dynamic weight reestimation mechanism (Equation 6) is innovative
- Addresses gap in static intervention systems

### 3. Methodological Approach
- Iterative development (synthetic → real data → refinement) is pragmatic
- Comprehensive evaluation: technical metrics + expert validation + user outcomes
- Clear success criteria: F1 > 0.80, MAE < 0.5, SUS > 68

---

## Critical Issues & Recommendations

### 1. Team Structure Documentation
**Status**: ✅ RESOLVED - Team members and advisor already listed in paper title/front matter
**Note**: No separate team structure section needed per template requirements

### 2. Timeline Feasibility
**Issue**: Timeline is aggressive but feasible with 3-person team working in parallel

**Key Milestones**:
- April-May: Iteration 1 (Prototyping with synthetic data)
- June-August: Survey data collection (150-200 participants) - nutrition specialist leads
- July-September: Iteration 2 (Model training, pilot testing)
- September-November: Iteration 3 (User testing, refinement)
- November-December: Documentation and defense

**Concerns**:
- Survey recruitment of 150-200 participants in 3 months is tight
- Thematic analysis is time-intensive
- Model training requires GPU resources and expertise
- User testing (30-50 participants × 5-7 sessions = 150-350 sessions) is substantial

**Note**: Timeline shows activities for everyone, not individual assignments

### 3. Survey Coordination
**Status**: ✅ RESOLVED - Survey is separate paper going through REC (Research Ethics Committee)

**Note**: Survey will be conducted by nutrition specialist as separate research, going through your institution's Research Ethics Committee approval. Your AI system paper uses the survey data for model training. This is a clean separation of concerns.

**ACTION REQUIRED**: Add clarification in Methods after describing the preliminary survey:
*"The preliminary survey instrument and data collection protocol will undergo separate ethics review through the institution's Research Ethics Committee as part of a collaborative nutrition research study. The survey data will be shared with this project for the purpose of training the psychological inference models."*

**IRB/REC Explanation**: 
- IRB = Institutional Review Board (US term)
- REC = Research Ethics Committee (common in Philippines/UK)
- Same thing - ethics approval for human subjects research
- Your survey collaborators are handling this for their paper

### 4. Statistical Power & Sample Size
**Status**: ✅ KEEP AS IS - 150-200 participants acceptable for initial model training

### 5. Methodological Gaps

**Status**: ✅ KEEP - Validation by nutrition specialist is sufficient

#### Ground Truth for TTM Stages
**Action Required**: Specify which validated TTM staging instrument will be used

#### Theme Taxonomy Validation
**Status**: ✅ RESOLVED - Nutrition specialist validates themes

#### Confidence Threshold Calibration
**Action Required**: Add brief note that thresholds will be calibrated during validation phase

#### Conversational Evaluation
**Action Required**: Specify measurement method for "conversation naturalness"

### 6. Recipe Recommendation System
**Status**: ⚠️ PRIORITY - BCT-to-recipe mapping needs clarification

**Problems**:
- How does "Information about Health Consequences" (BCT 5.1) translate to recipe selection?
- How does "Action Planning" (BCT 1.4) affect recipe features?
- "HealthScore" in Equation 5 is undefined (nutrient density? calories? vegetables?)

**Recommendation**: Add brief explanation or table showing how BCTs influence recipe filtering/ranking criteria. Even 2-3 examples would help.

### 7. Cultural Adaptation
**Status**: ⚠️ OPTIONAL - Mentioned as "added flavor" but could strengthen paper

**Note**: If not central to research, current level of detail may be sufficient. Consider adding 1-2 sentences about Filipino recipe dataset sources if available.

### 8. Ethical Considerations

**Status**: ⚠️ GOOD QUESTIONS TO ADDRESS

**Missing Elements to Consider**:
- **Algorithmic bias**: What if models misclassify certain demographic groups (e.g., lower SES)?
- **Dependency risk**: Users becoming overly reliant on system instead of seeking professional help
- **Failure modes**: What happens if system gives bad advice?
- **Safety monitoring at scale**: 100 responses reviewed is small sample - how to catch problems in production?

**Recommendation**: Add 1-2 paragraphs addressing these concerns, even briefly

---

## Technical Concerns - PRIORITY DISCUSSION NEEDED

### Step 1 (Conversation Management)
**Issue**: Tension between coverage (asking about all sub-themes) and naturalness (following user's flow) not addressed
**Impact**: Could make conversation feel robotic or interrogative
**Suggestion**: Add 1-2 sentences about balancing strategy

**NEW ISSUE**: Missing dietary restrictions and allergies collection
**Problem**: Step 1 focuses only on TPB/TTM elicitation, but Step 6 (recipe recommendation) needs practical constraints
**Missing Information**:
- Dietary restrictions (vegetarian, vegan, halal, kosher, pescatarian, etc.)
- Food allergies (nuts, shellfish, dairy, eggs, gluten, soy, etc.)
- Medical dietary needs (diabetes, hypertension, kidney disease, etc.)
- Religious/cultural food restrictions

**Proposed Solution**:
- Add a "Practical Constraints Collection" phase to Step 1
- Timing: After TPB/TTM construct coverage threshold is met (e.g., when dialogue state tracker shows sufficient coverage)
- Before: Moving to intervention/recipe recommendation
- Format options:
  1. Conversational: "Before I suggest some recipes, do you have any food allergies or dietary restrictions I should know about?"
  2. Structured checklist: Present common restrictions/allergies for user to select
  3. Hybrid: Ask open-ended first, then confirm with checklist

**Integration with Pipeline**:
- Step 1 Output: Add `dietary_restrictions` and `allergies` fields to conversation object
- Step 6 Input: Use these constraints as hard filters before recipe ranking
- Example: If user has nut allergy, exclude all recipes containing nuts before applying semantic search

**Implementation Details Needed**:
- How to handle vague responses ("I can't eat too much salt" vs "I have hypertension")
- How to update restrictions across sessions (user mentions new allergy later)
- How to balance restrictions with nutritional goals (user is vegetarian but needs more protein)

### Step 2 (TPB Inference)
**Issue**: Weighted aggregation (Equation 1) multiplies confidence × intensity × mapping weight × regression weight
- Complex interaction effects
- Low confidence on high-weight theme vs high confidence on low-weight theme
**Recommendation**: Simulate formula behavior before implementation

### Step 3 (TTM Classification)
**Issue**: Two-tier approach (model + rule-based fallback) - expected fallback percentage not specified
- If fallback >30%, model isn't adding much value

### Step 5 (BCT Selection)
**Issue**: Intervention library mapping (Stage, Determinant) → BCTs not fully specified
- Table 4 shows examples but is it exhaustive?
- How many BCTs in library?
**Recommendation**: Provide complete mapping table or reference appendix

### Step 7 (Response Generation)
**Issue**: "Quality assurance checks" implementation not specified
- Rule-based filters? Another model? Human-in-the-loop?
**Recommendation**: Specify safety check implementation (critical for health advice)

---

## Missing Elements

### 1. Comparison Baseline
**Status**: ⚠️ KEEP - Important for causal claims
**Note**: Even simple comparison (e.g., generic nutrition chatbot, or pre/post with waitlist) would strengthen conclusions about effectiveness

### 2. Attrition Handling
**Status**: ✅ WILL BE ADDRESSED - Plan to measure against existing apps' usage patterns
**Note**: Good approach - comparing retention rates to existing mHealth apps provides context

### 3. Generalizability
**Status**: ✅ RESOLVED - Will be addressed naturally in paper

**Context**: Your system is trained on Davao City young adults (18-40). The question was about acknowledging that findings may not transfer to:
- Other age groups (children, older adults)
- Other regions (Manila, Cebu, rural areas)
- Other countries/cultures

**Your Response**: "how is transferability discussed?" - You were asking WHERE/HOW this should be mentioned in the paper

**Answer**: This is typically discussed:
- Briefly when describing target population in Methods (e.g., "This study focuses on young adults aged 18-40 in Davao City...")
- More thoroughly in Discussion section when interpreting results (e.g., "These findings may not generalize to older adults or other cultural contexts...")
- In Future Work section (e.g., "Future research should validate the system with diverse populations...")

**No action needed** - this will naturally emerge when writing Discussion/Conclusion sections

### 4. Computational Costs
**Status**: ✅ RESOLVED - Budget plan already includes compute costs
**Note**: Google Colab Pro ₱1,200 for 2 months listed in budget. Only 1 account needed since only one person trains models.

### 5. Limitations Section
**Status**: ✅ RESOLVED - No separate limitations section per template
**Note**: Limitations will be mentioned throughout the paper as relevant (e.g., when describing target population, discussing results, etc.)

---

## Budget Updates

### Current Budget: ₱32,955

### Status: ✅ MOSTLY RESOLVED

**Confirmed Costs**:
- Google Colab Pro: ₱1,200 (2 months) - already in budget
- Only 1 account needed (one person trains models)

**Not Needed**:
- ❌ Additional Colab accounts (₱5,400) - only one person training
- ❌ Cloud storage (₱300) - free tier sufficient for conversation logs
- ❌ Technical support contingency (₱10,000) - unclear what this was for

**Optional Additions to Consider**:
- Project management tools if needed (Notion/Trello premium): ₱500
- Extra survey incentives if recruitment is slow: contingency already in budget (₱1,500)

### Revised Assessment: Current budget (₱32,955) is appropriate for project scope

---

## Writing & Presentation Issues

### 1. Terminology Consistency
**Issue**: Alternates between "conversational AI," "chatbot," "system," "tool"
**Fix**: Pick one primary term, use consistently

### 2. Equation Formatting
**Issue**: Some equations feel like mathematical decoration
- Equation 3 (argmin) is trivial - just say "identify construct with lowest score"
**Fix**: Only include equations that add clarity

### 3. Figure Quality
**Issue**: Figure 5 (seven-step pipeline) hard to follow with U-turn layout
**Fix**: Consider linear flow or circular diagram

### 4. Redundancy
**Issue**: TPB and TTM descriptions in both Introduction and Methods
**Fix**: Methods version should be briefer, focus on operationalization not theory review

### 5. Passive Voice Overuse
**Issue**: "Will be developed," "will be implemented," "will be evaluated"
**Fix**: More active framing where appropriate (though passive is standard for proposals)

### 6. Minor Issues
- Page 3: "gonzales is a sussy baka" - remove placeholder comment
- Table 1: "Key Limitations" column too dense - split into "Technical" and "Theoretical"
- Equation 4: Dot operator (·) inconsistent with × elsewhere
- Figure 7: Color coding hard for colorblind readers - add patterns/labels

---

## Integration & Coordination Recommendations

### API Contracts
**Status**: ⚠️ IMPORTANT FOR 3-PERSON TEAM
**Critical**: Define input/output schemas for each step EARLY (Iteration 1)

**Recommendation**: Add to Iteration 1 Development:
"API specifications will be documented using OpenAPI/Swagger format, defining the JSON schema for data exchange between pipeline steps. Integration testing will be conducted weekly during development."

### Version Control
**Important Questions**:
- Git workflow strategy? (feature branches, code review)
- Who writes integration tests?
- Who ensures Step 2 output matches Step 3 input?

### Compute Resource Management
**Status**: ✅ RESOLVED - Only 1 Colab Pro account needed
**Note**: Only one person training models, others working on different components
**Still Important**: 
- Model checkpointing to avoid losing progress
- Experiment tracking (Weights & Biases or MLflow) recommended

### User Testing Logistics
**Challenge**: 150-350 total sessions to coordinate
- Scheduling: Handle no-shows, rescheduling (use Calendly?)
- Technical support: App issues mid-session?
- Data quality: Who monitors conversation logs in real-time?

---

## Risk Mitigation Strategies

### Add to Each Iteration's Review Phase:
"If model performance falls below thresholds (F1 < 0.80, MAE > 0.5), the team will implement fallback strategies: 
1. Increase training data through targeted survey recruitment
2. Simplify theme taxonomy by merging low-frequency themes
3. Increase reliance on rule-based methods for low-confidence cases"

### Survey Data Timing Risk
**Mitigation**: Start Iteration 1 with synthetic data, don't block on survey completion

### Integration Complexity Risk
**Mitigation**: Early API contracts, continuous integration, weekly team meetings

---

## Clarify Research Contribution

**Question**: Is this primarily:
- Technical contribution (novel NLP methods for psychological inference)?
- Theoretical contribution (demonstrating TPB/TTM integration)?
- Applied contribution (improving dietary behavior)?

**Recommendation**: Can't be all three in one thesis. Pick primary contribution and frame accordingly.

**Suggested Framing**: 
"This research makes a technical and methodological contribution by demonstrating that psychological constructs from established behavioral theories (TPB, TTM) can be accurately inferred from natural language conversations, enabling theory-driven personalization of digital health interventions. Behavioral outcomes are explored as preliminary evidence of system effectiveness, with comprehensive efficacy evaluation reserved for future work."

---

## Strengths of Team Approach

With 3 students, previously impossible scope becomes achievable:

✓ **Parallel model experimentation**: One student tries DeBERTa while another builds recipe system
✓ **Faster iteration**: While waiting for model training, others refine UI based on feedback
✓ **Redundancy**: If one student faces delays, others continue
✓ **Diverse perspectives**: Different CS strengths (ML, backend, frontend)

**Key Success Factors**:
1. Clear API contracts and interfaces
2. Weekly integration meetings
3. Disciplined version control
4. Early and continuous testing
5. Good communication with nutrition specialist

---

## Final Verdict

**With 3-person team + advisor + nutrition specialist**: Scope is ambitious but achievable

**Remaining Key Risks**:
1. Coordination overhead (mitigate: clear APIs, weekly meetings)
2. Survey data timing (mitigate: start with synthetic data)
3. Integration complexity (mitigate: early contracts, continuous integration)

**Paper is STRONG. Research is EXCITING.**

**Priority Actions**:
1. ✅ Add team structure subsection
2. ✅ Clarify nutrition specialist's role and survey ownership
3. ✅ Add risk mitigation strategies to each iteration
4. ✅ Specify missing methodological details (instruments, validation procedures)
5. ✅ Update budget with realistic compute costs
6. ✅ Add limitations subsection
7. ✅ Develop BCT-to-recipe mapping specification
8. ✅ Add API contract documentation to Iteration 1

**This is a compelling, well-scoped team project that makes a real contribution to theory-driven digital health interventions.**

---

## Priority Actions - UPDATED

### HIGH PRIORITY (Must Address)

#### SYSTEM NAMING & BRANDING
0. ✅ **System name created and introduced: AliMind**
   - Name: AliMind (alimentation + minding)
   - Meaning: Reflects dual focus on nutrition/feeding and mindfulness/awareness of psychological barriers
   - Integrated in:
     - Title: "AliMind: A TPB-TTM Informed Conversational System for Stage-Specific Nutrition Support"
     - Objectives section: Introduced with explanation of name meaning
     - Methods: Strategic mentions in key sections (Research Design, TPB application, Recipe Database, Programming Environment)
   - Strategy: Not overused - appears in strategic locations to establish identity while keeping "the system" for variety

#### INTRODUCTION
1. ⚠️ **Table 1 section - WEAK ARGUMENT** 
   - Current: Vague "limitations" column mixing different problems
   - Problem: Not clearly evaluating tools on TPB/TTM coverage
   - Fix: Restructure to explicitly show which tools assess TPB constructs and implement TTM stages
   - Options discussed:
     - Binary checklist with evidence citations
     - Specific criteria table (define what counts as TPB/TTM implementation)
     - Text-based review (most objective - just describe in paragraph)
   - **After table paragraph is redundant** - rewrite to clearly state the gap: "No existing tool combines real-time TPB construct inference with TTM stage-matched interventions"

2. ⚠️ **Objectives section - reframe from features to problems**
   - Current: "Design and implement a conversational interface that elicits..."
   - Better: Frame as solving specific problems identified in the gap
   - Focus on: What problem does each objective solve? Why is it needed?
   - **NEW**: Each objective must specify:
     - How it will be achieved in the design (which iteration? which component?)
     - Reference to where it will be validated (mention that evaluation is in Testing/Review sections)
   - Example structure:
     - Objective: [Problem to solve]
     - Design approach: [How the system addresses this - reference specific pipeline steps/iterations]
     - Note: Evaluation metrics and validation procedures are detailed in the Testing and Review phases of each iteration

3. ⚠️ **Add theoretical support for open-ended inference**
   - Need citations/theory supporting that TPB constructs can be inferred from open-ended responses
   - Why is conversational elicitation valid for psychological assessment?
   - Literature on qualitative assessment of TPB? Thematic analysis for construct measurement?

#### METHODS
4. ⚠️ **TTM tracking - be more specific**
   - How exactly is stage tracked across sessions?
   - What linguistic markers indicate each stage?
   - When is stage transition confirmed vs. noise?
   - Add more detail to longitudinal tracking mechanism

5. ⚠️ **Preliminary survey - add TTM details**
   - How does the survey capture TTM stage?
   - What specific questions/instruments used?
   - How are open-ended responses paired with stage labels?

6. ⚠️ **Step 1: Add dietary restrictions and allergies collection**
   - Current: Step 1 focuses only on TPB/TTM construct elicitation
   - Missing: Practical constraints needed for recipe filtering (Step 6)
   - Add: After TPB/TTM questions are sufficiently covered, system should ask about:
     - Dietary restrictions (vegetarian, vegan, halal, etc.)
     - Food allergies (nuts, shellfish, dairy, etc.)
     - Medical dietary needs (diabetes, hypertension, etc.)
   - Integration: These constraints feed into Step 6 recipe filtering
   - Timing: Ask after construct coverage threshold is met, before moving to intervention
   - Format: Can be conversational ("Do you have any food allergies I should know about?") or structured checklist

7. ⚠️ **Condense methods sections**
   - Some parts are verbose/repetitive
   - Tighten up descriptions while keeping essential details
   - Focus on what's novel, not restating theory

#### TECHNICAL
8. ⚠️ **BCT-to-recipe mapping** - Add brief explanation of how BCTs influence recipe selection (even 2-3 examples)
9. ⚠️ **Dish recommendation integration - clarify the complete flow**
   - Current: Step 6 described in isolation, unclear how it connects to intervention strategy
   - Need to clarify:
     - **Input flow**: How does Step 5 (BCT selection) inform Step 6 (recipe retrieval)?
     - **BCT translation**: How are abstract BCTs translated to concrete recipe features?
       - Example: BCT 1.4 "Action Planning" → recipes with step-by-step instructions, prep lists
       - Example: BCT 5.1 "Health Consequences" → recipes with nutritional highlights, health benefits
       - Example: BCT 8.7 "Graded Tasks" → recipes sorted by difficulty, starting with easiest
     - **Constraint integration**: How do dietary restrictions (from Step 1) combine with BCT-driven selection?
     - **Personalization layers**: 
       1. Hard filters (allergies, restrictions) - must satisfy
       2. BCT-driven features (based on intervention strategy) - should prioritize
       3. User preferences (taste, cuisine) - nice to have
       4. Feasibility (time, budget, skill) - practical constraints
     - **Recipe presentation**: How are recipes embedded in Step 7 response?
       - Just list recipes? Or explain WHY these recipes fit the intervention?
       - Example: "I'm suggesting this simple stir-fry because you mentioned limited time (PBC barrier), and it only takes 15 minutes"
   - Add: Flow diagram or table showing BCT → Recipe Feature mapping
   - Specify: How many recipes recommended per session? (1? 3? 5?)
   - Clarify: Are recipes personalized per session or do they evolve across sessions?

10. ⚠️ **Technical concerns** - Address Step 1-7 issues (see Technical Concerns section)
11. ⚠️ **Specify TTM staging instrument** - Name the exact validated tool you'll use
12. ⚠️ **Define "HealthScore"** in Equation 5 - What does this measure?
13. ⚠️ **Step 7 safety checks** - Specify how quality assurance is implemented

### MEDIUM PRIORITY (Should Address)
12. 📝 **Ethical considerations** - Add 1-2 paragraphs on algorithmic bias, dependency risk, failure modes
13. 📝 **Comparison baseline** - Consider adding simple control condition
14. 📝 **Conversational naturalness measurement** - Specify how this will be evaluated
15. 📝 **Confidence threshold justification** - Brief note on how 0.6/0.7 thresholds were chosen

### LOW PRIORITY (Nice to Have)
16. ✏️ Remove placeholder comment ("gonzales is a sussy baka")
17. ✏️ Terminology consistency (pick: "conversational AI" vs "chatbot" vs "system")
18. ✏️ Simplify Equation 3 (argmin is trivial)
19. ✏️ Cultural adaptation details (if relevant to research focus)

### RESOLVED (No Action Needed)
- ✅ Team structure documentation (in title/front matter)
- ✅ Survey recruitment feasibility (online forms)
- ✅ Sample size (150-200 acceptable)
- ✅ Theme validation (nutrition specialist)
- ✅ Budget (₱32,955 appropriate)
- ✅ Compute resources (1 Colab Pro account sufficient)
- ✅ Limitations section (not required per template)
- ✅ Attrition handling (will compare to existing apps)
- ✅ Generalizability (will discuss naturally in Discussion section)
- ✅ Survey ethics (separate paper, going through REC)


---

## NEW ISSUES IDENTIFIED - Discussion Notes

### Introduction Section Weakness
**Location**: Table 1 and paragraphs after it

**Problem**: 
- Table 1 "Key Limitations" column is too vague and subjective
- Mixes different types of problems (attrition, no theory, scalability) without clear framework
- Paragraph after table just restates what table shows (redundant)
- ChatGPT/Gemini paragraph talks about nutritional accuracy, but main argument is about lack of TPB/TTM theory (disconnected)
- Engagement/attrition paragraph is good but feels disconnected from table

**Root Cause**: Not clearly evaluating tools on TPB/TTM coverage specifically

**Solution Options**:
1. **Binary checklist approach**: "Assesses TPB Constructs?" (Yes/No) + "Implements TTM Stages?" (Yes/No) + Evidence column with citations
2. **Specific criteria table**: Define upfront what counts as TPB implementation (assesses A/SN/PBC) and TTM implementation (detects stage, delivers stage-matched content), then evaluate each tool
3. **Text-based review** (most objective): Skip evaluation table, just describe in paragraph which tools do/don't implement TPB/TTM with citations

**After-table paragraph should clearly state the gap**: "No existing tool combines real-time TPB construct inference with TTM stage-matched interventions in a scalable conversational interface."

### Objectives Framing Issue
**Problem**: Objectives read like feature list ("Design and implement X", "Develop Y", "Create Z")

**Better Approach**: Frame as solving specific problems identified in the gap
- What problem does each objective solve?
- Why is it needed?
- Connect back to the gaps identified in Table 1 section

**Example Reframe**:
- Current: "Design and implement a conversational interface that elicits rich, natural language..."
- Better: "To address the limitation of existing tools that rely on structured questionnaires which fail to capture nuanced psychological barriers, this study will develop a conversational interface that..."

### Missing Theoretical Support
**Issue**: Paper claims TPB constructs can be inferred from open-ended conversational responses, but doesn't cite theory/literature supporting this approach

**Need**:
- Why is conversational elicitation valid for psychological assessment?
- Literature on qualitative assessment of TPB constructs?
- Evidence that thematic analysis can measure TPB?
- Support for using natural language vs. Likert scales?

**Possible sources to look for**:
- Qualitative TPB research methods
- Open-ended elicitation studies in TPB literature
- Conversational assessment validity
- NLP for psychological construct measurement

### TTM Tracking Specificity
**Issue**: Paper mentions tracking TTM stages across sessions but lacks detail on:
- What specific linguistic markers indicate each stage?
- How is stage transition confirmed vs. dismissed as noise?
- What's the decision rule for "stage has changed"?
- Examples of stage-specific language patterns

**Current text**: "TTM stage classifications will be tracked across sessions to detect forward movement, backsliding, or stalling"

**Needs**: More concrete description of the tracking mechanism and validation approach

### Preliminary Survey TTM Details
**Issue**: Survey section mentions collecting TTM stage labels but doesn't explain:
- What specific TTM staging questions/instrument will be used?
- How are open-ended responses paired with stage labels?
- What's the process for stage classification in the survey?

**Need**: Brief description of TTM measurement approach in survey

### Methods Verbosity
**Issue**: Some sections are repetitive or overly detailed
- TPB and TTM theory explained in both Introduction and Methods
- Some descriptions restate obvious points
- Could be more concise while keeping essential technical details

**Suggestion**: Focus Methods on operationalization, not theory review. Save space for more important details.


---

## System Naming Considerations

### Why a System Name is Important
- Makes the paper more memorable and citable
- Easier to refer to throughout the paper than "the system" or "the proposed tool"
- Establishes identity for potential future deployment
- Research prototypes in literature have names (PROTEIN, DIAITA, Fridolin, Woebot)
- Can be used in title to make it more specific and searchable

### Naming Strategies

**Option 1: Acronym Based on Theory**
- TPB + TTM integration
- Examples: STAGE (Stage-Targeted Adaptive Guidance Engine), ADAPT (Adaptive Dietary Assessment and Planning Tool)

**Option 2: Acronym Based on Function**
- Conversational nutrition support
- Examples: COACH (Conversational Optimization for Adaptive Change in Health), CHAT (Conversational Health Assessment Tool)

**Option 3: Filipino/Local Context**
- Incorporate Filipino word or Davao reference
- Examples: KAIN (Filipino for "eat"), LUTO (Filipino for "cook")

**Option 4: Descriptive Name**
- Clear about what it does
- Examples: NutriStage, BehaviorChat, StageWise

**Option 5: Hybrid Approach**
- Combine theory + function
- Examples: TPB-TTM Coach, StageMatch, TheoryChat

### Where to Introduce the Name

**In Paper Structure**:
1. **Title**: Include system name if it's meaningful
   - Current: "From Behavioral Inference to Stage-Specific Nutrition Support: A Theory of Planned Behavior- and Transtheoretical Model- Informed System"
   - With name: "STAGE: A TPB-TTM Informed Conversational System for Stage-Specific Nutrition Support"

2. **Abstract**: Introduce name in first sentence
   - "This paper presents [SYSTEM NAME], a conversational AI system that..."

3. **Introduction**: Brief explanation section after objectives or before
   - "We call this system [NAME], which stands for [expansion]. The name reflects [rationale]."

4. **Throughout**: Use system name instead of generic "the system"
   - "STAGE analyzes user responses..." instead of "The system analyzes..."

### Naming Section Template

Could add a brief subsection (2-3 sentences) either:
- At end of Introduction, before Objectives
- At start of Methods, before Research Design
- As part of Objectives section

**Example**:
```
== System Overview: [NAME]

We refer to the proposed system as [NAME] ([Full Expansion if acronym]). 
The name reflects [key aspect of system - e.g., stage-based adaptation, 
conversational approach, theoretical grounding]. Throughout this paper, 
we use [NAME] to refer to the complete seven-step pipeline that integrates 
TPB construct inference with TTM stage-matched interventions.
```

### Considerations
- Keep it simple and pronounceable
- Avoid overly clever acronyms that feel forced
- Make sure it's not already taken by another health app/system
- Consider how it sounds in both English and Filipino context
- Think about future branding if system is deployed

### Action Items
1. Brainstorm potential names (team decision)
2. Check if name is already used in health tech space
3. Decide where to introduce it in paper structure
4. Update all references from "the system" to system name
5. Consider updating paper title to include system name


---

## Objectives Structure Enhancement

### Current Problem
Objectives are written as feature lists without clear connection to how they will be achieved in the design.

### Proposed Structure for Each Objective

**Format**:
```
Objective [N]: [Problem statement - what gap/issue this addresses]

Design Approach: [How the system achieves this]
- Reference specific pipeline steps (e.g., "Step 2: TPB Construct Inference")
- Reference specific iterations (e.g., "Iteration 2: Model fine-tuning")
- Mention key technical components (e.g., "DeBERTa-v3 multi-label classifier")

Note: Evaluation metrics and validation procedures are detailed in the Testing 
and Review phases of each iteration (see Methods section).
```

### Example Rewrite

**Current Objective 1**:
"Design and implement a conversational interface that elicits rich, natural language from users about their dietary habits, challenges, social environment, and goals, while maintaining an empathetic and non-judgmental tone that encourages sustained engagement."

**Improved Version**:
```
Objective 1: Address the limitation of existing tools that rely on rigid questionnaires 
which fail to capture nuanced psychological barriers and result in high attrition rates.

Design Approach: 
- Step 1 implements a conversational context collection system using LangChain for 
  dialogue management and Llama 3 8B for natural response generation
- Question pool organized by TPB sub-themes with coverage tracking to ensure comprehensive 
  construct elicitation while maintaining natural flow
- Developed iteratively: Iteration 1 (synthetic data testing), Iteration 2 (pilot with 
  10-15 users), Iteration 3 (refinement based on feedback)

Evaluation is detailed in the Testing and Review phases of Iterations 1-3.
```

### Mapping Objectives to Design Components

**Objective 1: Conversational Interface**
- Design: Step 1, Iterations 1-3
- Evaluation: See Testing/Review sections (Iterations 1-3)

**Objective 2: TPB Construct Inference**
- Design: Step 2, Iteration 2 (model training)
- Evaluation: See Testing/Review sections (Iteration 2)

**Objective 3: TTM Stage Classification**
- Design: Step 3, Iteration 2 (model training)
- Evaluation: See Testing/Review sections (Iteration 2)

**Objective 4: Integrated Intervention Engine**
- Design: Steps 4-6, Iterations 1-3
- Evaluation: See Testing/Review sections (Iterations 2-3)

**Objective 5: System Effectiveness**
- Design: Complete pipeline, Iteration 3 (user testing)
- Evaluation: See Testing/Review sections (Iteration 3)

### Benefits of This Structure
1. **Traceability**: Clear link from objective → design components
2. **Avoids Redundancy**: Metrics stay in Testing/Review sections where they belong
3. **Cleaner Objectives**: Focus on what and how, not measurement details
4. **Better Flow**: Readers see objectives, then later see how they're validated

### Action Required
Rewrite each objective in the paper to include:
1. Problem statement (what gap it addresses)
2. Design approach (how it's achieved - reference specific steps/iterations)
3. Brief note that evaluation is in Testing/Review sections

This creates a clear thread: Gap → Objective → Design → [later] → Testing/Evaluation → Results


---

## Figure Updates Needed

### Figure 2: Iterative Development Cycle Flow

**Current Issue**: Figure shows "Requirements-Design-Development-Testing-Review" paradigm

**Change Required**: Remove "Requirements" from the cycle

**Reason**: 
- Requirements gathering happens once at the beginning (Iteration 1 only)
- Subsequent iterations follow: Design → Development → Testing → Review
- Having "Requirements" in the cycle implies it repeats each iteration, which is misleading

**Updated Cycle Should Show**:
```
Design → Development → Testing → Review → (back to Design for next iteration)
```

**Implementation**:
- Update figures/iterative.png to remove "Requirements" box
- Or update the figure caption/description to clarify Requirements is Iteration 1 only
- Ensure text in Methods matches the updated figure

**Location in Paper**: 
- Figure 2 in Methods section, under "Research Design"
- Referenced in text: "following a Requirements-Design-Development-Testing-Review paradigm"

**Text Update Needed**:
Change from: "following a Requirements-Design-Development-Testing-Review paradigm"
To: "following a Design-Development-Testing-Review cycle, with initial requirements established in Iteration 1"


---

## Dish Recommendation Integration - Detailed Breakdown

### Current Gap in Paper
Step 6 (Feasible Dish/Plan Generation) is described technically (FAISS, semantic search, constraint filtering) but the **integration with the intervention strategy** is unclear. The paper doesn't explain how the theoretically-driven intervention (Steps 4-5) connects to the practical recipe output (Step 6).

### What Needs to Be Clarified

#### 1. Input Flow: Step 5 → Step 6
**Question**: What exactly does Step 5 pass to Step 6?

**Current**: Paper says Step 5 selects a BCT, but doesn't specify what information flows to Step 6

**Need to specify**:
- BCT identifier (e.g., "BCT 1.4: Action Planning")
- Target TPB construct (e.g., "PBC - low cooking confidence")
- TTM stage context (e.g., "Preparation stage")
- User constraints from Step 1 (time, budget, skill, allergies, restrictions)

**Example JSON payload**:
```json
{
  "bct": "1.4",
  "bct_name": "Action Planning",
  "target_construct": "PBC",
  "ttm_stage": "Preparation",
  "user_constraints": {
    "max_time": 30,
    "skill_level": "beginner",
    "budget": "low",
    "allergies": ["nuts"],
    "restrictions": ["vegetarian"]
  }
}
```

#### 2. BCT Translation: Abstract → Concrete
**Question**: How do you translate a BCT into recipe selection criteria?

**Need**: A mapping table or decision logic

**Example Mappings**:

| BCT | BCT Name | Target Construct | Recipe Features to Prioritize |
|-----|----------|------------------|-------------------------------|
| 1.4 | Action Planning | PBC | Step-by-step instructions, ingredient prep lists, time estimates, equipment lists |
| 5.1 | Health Consequences | Attitude | Nutritional info highlighted, health benefits explained, before/after comparisons |
| 8.7 | Graded Tasks | PBC | Sort by difficulty (easiest first), progressive complexity, "beginner-friendly" tag |
| 9.2 | Pros and Cons | Attitude | Recipes with taste appeal + health benefits, "healthy but delicious" framing |
| 12.5 | Adding Objects to Environment | PBC | Recipes using common ingredients, minimal special equipment, pantry staples |

**Implementation**: 
- Each BCT maps to a set of recipe metadata filters/boosts
- These become query parameters for FAISS search or re-ranking weights

#### 3. Constraint Integration: Multiple Layers
**Question**: How do different types of constraints combine?

**Proposed Hierarchy**:
1. **Hard Filters (Must Satisfy)** - Applied first, eliminates recipes
   - Allergies (e.g., no nuts)
   - Dietary restrictions (e.g., vegetarian)
   - Medical needs (e.g., low sodium)
   
2. **BCT-Driven Features (Should Prioritize)** - Boosts ranking
   - Based on intervention strategy
   - Weighted higher than general preferences
   
3. **User Preferences (Nice to Have)** - Further refines
   - Cuisine type (Filipino, Asian, Western)
   - Taste preferences (spicy, mild)
   - Cooking style (stir-fry, baking)
   
4. **Feasibility Constraints (Practical)** - Final filter
   - Time available
   - Budget
   - Skill level
   - Equipment available

**Example Flow**:
```
2.2M recipes 
→ Hard filter (vegetarian, no nuts) → 500K recipes
→ Semantic search (user context) → Top 100 recipes
→ BCT boost (beginner-friendly for PBC) → Re-ranked
→ Feasibility filter (≤30 min, low budget) → 20 recipes
→ Multi-criteria scoring (Equation 5) → Top 3-5 recipes
```

#### 4. Recipe Presentation in Step 7
**Question**: How are recipes embedded in the conversational response?

**Current**: Unclear if recipes are just listed or explained

**Options**:
1. **List only**: "Here are 3 recipes you might like: [Recipe 1], [Recipe 2], [Recipe 3]"
2. **Explained**: "I'm suggesting this simple stir-fry because you mentioned limited time (15 min prep), and it's beginner-friendly with step-by-step instructions"
3. **Intervention-framed**: "To help you build confidence in the kitchen (PBC), let's start with this easy recipe that breaks down each step clearly"

**Recommendation**: Option 3 (intervention-framed) - connects recipe to the psychological intervention

**Example Response Structure**:
```
[Empathetic acknowledgment of barrier]
"I understand that cooking feels overwhelming when you're just starting out."

[Intervention strategy explanation]
"To build your confidence, let's start with a simple recipe that guides you through each step."

[Recipe recommendation with rationale]
"I recommend this [Recipe Name] because:
- It only takes 15 minutes (fits your schedule)
- Uses 5 common ingredients (no special shopping needed)
- Has clear step-by-step photos (builds confidence)
- Is vegetarian and nut-free (matches your needs)"

[Action planning support]
"Would you like me to break down the prep steps, or do you want to try it and let me know how it goes?"
```

#### 5. Longitudinal Evolution
**Question**: How do recipe recommendations evolve across sessions?

**Need to specify**:
- **Session 1**: User in Preparation, low PBC → Easy recipes with detailed instructions
- **Session 3**: User in Action, improving PBC → Slightly more complex recipes
- **Session 5**: User in Maintenance, high PBC → Variety of difficulty levels

**Tracking**:
- Store previously recommended recipes (avoid repetition)
- Track which recipes user tried (if they report back)
- Adjust difficulty based on TPB score changes (especially PBC)
- Introduce variety while maintaining feasibility

**Example**:
```
Session 1: PBC = 2.5 → Recommend 3 "beginner" recipes
Session 2: PBC = 3.0 → Recommend 2 "beginner", 1 "easy" recipe
Session 3: PBC = 4.0 → Recommend 1 "beginner", 2 "easy" recipes
Session 4: PBC = 5.0 → Recommend 3 "easy" recipes, introduce "intermediate"
```

#### 6. Number of Recipes
**Question**: How many recipes per session?

**Considerations**:
- Too few (1): Limited choice, feels restrictive
- Too many (10+): Overwhelming, decision paralysis
- Sweet spot: 3-5 recipes

**Recommendation**: 3 recipes per session
- Provides choice without overwhelming
- Can show variety (e.g., breakfast, lunch, dinner)
- Manageable for user to review

#### 7. Recipe Metadata Requirements
**Question**: What metadata must recipes have for this system to work?

**Required Fields**:
- Ingredients list (for allergy/restriction filtering)
- Preparation time (for time constraints)
- Difficulty level (for skill matching)
- Equipment needed (for feasibility)
- Nutritional information (for HealthScore calculation)
- Cuisine type (for cultural appropriateness)
- Cost estimate (for budget constraints)

**BCT-Specific Fields** (nice to have):
- Has step-by-step instructions? (for Action Planning BCT)
- Has photos/videos? (for Graded Tasks BCT)
- Health benefits described? (for Health Consequences BCT)
- Beginner-friendly tag? (for PBC targeting)

### Implementation Recommendations

1. **Add BCT-to-Recipe Feature Mapping Table** in Methods (Step 6 description)
2. **Add Example Flow Diagram** showing how constraints combine
3. **Specify Recipe Presentation Strategy** in Step 7 description
4. **Add Longitudinal Recipe Evolution** to Iteration 3 design
5. **Define Recipe Metadata Schema** in Data Collection section
6. **Clarify Number of Recipes** (recommend 3 per session)

### Where to Add This in Paper

**Option 1**: Expand Step 6 description in Methods
- Add subsection: "BCT-Driven Recipe Selection"
- Add subsection: "Constraint Integration Hierarchy"
- Add subsection: "Recipe Presentation Strategy"

**Option 2**: Add to Integration Framework section
- Show how Steps 4-5-6-7 work together
- Emphasize that recipe recommendation is theory-driven, not just preference-based

**Option 3**: Add example walkthrough
- Show complete example: User profile → TPB/TTM analysis → BCT selection → Recipe filtering → Response generation
- Makes the integration concrete and understandable
