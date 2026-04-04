# AliMind Presentation Slide Deck

Complete slide deck with all revisions incorporated. Slides are numbered sequentially for clarity.

---

## Slide 1: Title Slide

**AliMind:** A Theory‑Driven Conversational AI for Personalized Nutrition Support

- **Authors:** Faculty Researcher, Student Researcher
- **College of Computer Studies**

---

## Part 1: Introduction

### Slide 2: Introduction – The Global Nutrition Challenge

Maintaining healthy eating habits is a critical global challenge, as unhealthy diets contribute to millions of deaths annually from non-communicable diseases like diabetes and cardiovascular conditions (WHO).

Despite widespread awareness of dietary guidelines, a significant gap persists between knowledge and sustained behavioral change across diverse populations. In the Philippines, despite high self-reported ease of healthy eating, most Filipino adults consume high-sugar and high-salt foods, revealing a gap between perception and actual diet quality—especially among younger adults (DOH HPLS, 2023).

While existing digital health tools offer promise, they often suffer from high attrition rates (43-80%) because they are largely atheoretical and fail to address the deeper psychological drivers of behavior.

**This presentation introduces AliMind**, a conversational AI system designed to bridge this gap by integrating the Theory of Planned Behavior and the Transtheoretical Model to provide personalized, culturally situated nutrition support tailored to the unique realities of Filipino young adults in Davao City.

### Slide 3: Presentation Overview

**The Challenge:**
Unhealthy eating is a global crisis, but knowing what's healthy doesn't guarantee behavior change.

**The Gap:**
Current digital nutrition tools ignore psychological barriers and readiness to change.

**Our Solution:**
AliMind – a conversational AI that integrates behavioral science (TPB + TTM) to deliver personalized, stage-matched nutrition support.

**Today's Agenda:**
1. The Problem: Global nutrition crisis and the intention-behavior gap
2. Theoretical Foundation: TPB, TTM, and their integration
3. Our Approach: Three-iteration development process
4. Evaluation: Metrics, ethics, timeline, and expected outcomes

### Slide 4a: The Problem – Global Dietary Crisis

**According to the World Health Organization's Healthy Diet and Noncommunicable Diseases Fact Sheets:**

Consuming a healthy diet throughout the life-course helps to prevent malnutrition in all its forms as well as a range of noncommunicable diseases (NCDs) and conditions. However, change in food production and food systems, rapid urbanization and changing lifestyles have led to a shift in dietary patterns, with people now consuming more highly processed foods high in unhealthy fats, free sugars and salt/sodium. Unhealthy diets are a major risk factor for disease and disability, with NCDs killing at least 43 million people in 2021 (75% of non-pandemic-related deaths globally), and tobacco use, physical inactivity, harmful use of alcohol, unhealthy diets and air pollution all increasing the risk of dying from an NCD.

**Sources:**
- WHO. (2025). Noncommunicable Diseases Fact Sheet. https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases
- WHO. (2025). Healthy Diet Fact Sheet. https://www.who.int/westernpacific/newsroom/fact-sheets/detail/healthy-diet

### Slide 4b: The Problem – National Nutrition Challenge

**National Study Findings (DOH HPLS, 2023):**

Despite high self-reported ease of healthy eating (83.8%), most Filipino adults recently consumed high-sugar (85.4%) or high-salt (55.8%) foods. This revealed a gap between perception and actual diet quality, especially among younger adults (18–45). Among the 16.2% who did find it difficult to eat healthily, the top barriers were money (57.3%), time (16.6%), and access (15.0%).

**Source:**
- Department of Health Philippines & IDinsight. (2023). Healthy Philippines Lifestyle Survey (HPLS) Nutrition and Diet Policy Brief.

### Slide 4c: The Problem – Local Food Environment in Davao City

**According to the study "Underlying Motivations for Food Choices and Their Influence on Healthy Eating among Millennials" (2023) by Lafuente, Catin, Dagoc, and Egos:**

A study of 394 millennials (ages 19-37) in Davao City found that motivations for food choices are consistently evident, with mood (4.52/5), health concerns (4.32/5), and price (4.01/5) as key factors, resulting in an overall motivation score of 4.28/5. However, healthy eating was only occasionally observed with a diet index of 3.24/5, revealing a weak positive relationship (r = 0.246) between motivation and actual healthy eating behaviors. This gap is attributed to busy lifestyles, time constraints, and limited access to healthy options in the rapidly urbanizing BPO hub.

*(Suggested graph: Grouped bar chart showing Mood (4.52), Health Concerns (4.32), Price (4.01), and Diet Index (3.24) to visualize the motivation-behavior gap. Alternative: Side-by-side comparison of Overall Motivation (4.28) vs. Diet Index (3.24) with gap annotation.)*

**Source:**
- Lafuente, D.V.M., Catin, J.C.A., Dagoc, M.G.R., & Egos, C.M.N. (2023). Underlying Motivations for Food Choices and Their Influence on Healthy Eating among Millennials. Journal of Tourism and Hospitality Management, 11(2), 29-37.

### Slide 5: The Problem – The Intention‑Behavior Gap

**The Core Challenge:** Knowing ≠ Doing

**Meet Carlos:** 24-year-old call center agent
- Knows vegetables are important
- But: 10-hour night shifts, limited budget, street food convenience
- His story is not unique in Davao City

**Why the Gap Exists:**

**Practical Barriers:**
- Cost: Fresh produce exceeds budgets
- Time: Demanding schedules leave no time for meal prep
- Access: Limited grocery stores, convenience stores dominate

**Social Barriers:**
- Family resistance to dietary changes
- Cultural food traditions
- Peer eating habits undermine personal goals

**Personal Barriers:**
- Low cooking confidence
- Belief that healthy food is bland
- Exhaustion after demanding days

*(Show Figure 1 – conceptual diagram of the intention-action gap with barriers)*

**The Reality:** Behavior change is a long process, not a one-time decision.

### Slide 6: The Gap – Why Current Digital Tools Fail

**The Atheoretical Problem:**
- Most apps personalize based on food preferences and calorie goals
- They ignore the psychological drivers: attitudes, social influences, perceived control
- They don't assess readiness to change or deliver stage-matched interventions

**The Consequences:**
- Attrition rates: 43–80% in mHealth apps
- Only 3.9% of users maintain engagement beyond 15 days
- Users abandon apps because advice feels irrelevant to their actual barriers

**The Missed Opportunity:**
- Conversational AI can naturally elicit rich psychological data
- Yet existing tools still rely on rigid questionnaires or generic advice
- No tool combines TPB construct inference + TTM stage-matched intervention + recipe recommendations

### Slide 7: The Digital Opportunity – Why Now?

**Young Adults Are Digitally Connected:**
- 76.5% of Filipinos have internet access
- 89.7% of internet users (16–64) use smartphones daily
- Average 10 hours 27 minutes online per day
- 71% smartphone adoption in 2023

**Source:** Philippine Digital Statistics 2023

**They Want Health Support:**
- Young adults are primary adopters of health apps
- Download nutrition trackers, meal planners, fitness coaches with enthusiasm
- But initial engagement rarely translates to sustained use

**The Technology Is Ready:**
- NLP models can infer psychological constructs from natural language
- Conversational AI can elicit richer responses than traditional surveys
- Behavioral science provides validated frameworks (TPB, TTM)

**The Gap:** Technology exists, behavioral science exists, but they haven't been properly integrated.

### Slide 8: Current Digital Nutrition Tools – The Gap Analysis

*(Show table comparing existing tools)*

| Tool Category | Examples | Assesses TPB? | Implements TTM? | Key Limitation |
|--------------|----------|---------------|-----------------|----------------|
| **Calorie Tracking** | MyFitnessPal, Lose It! | ✗ | ✗ | Monitors intake, ignores psychological barriers |
| **Meal Planning** | Mealime, PlateJoy | ✗ | ✗ | Assumes intention = action |
| **Rule-Based Chatbots** | Roti | ✓ | ✗ | Pre-scripted content, no real-time inference |
| **LLM Chatbots** | ChatGPT-4o, FiberMore | Partial | ✗ | Conversational but not theory-driven |
| **Research Prototypes** | PROTEIN, Fridolin, DIAITA | Partial | ✗ | Structured questionnaires, no stage matching |

**Critical Gap:** No existing tool combines real-time TPB inference from conversation + TTM stage-matched interventions + theory-driven recipe recommendations.

### Slide 9: The Proposed Solution – AliMind

**What Makes AliMind Different:**
- Integrates **Theory of Planned Behavior (TPB)** and **Transtheoretical Model (TTM)**
- Infers psychological constructs from natural conversation – no lengthy questionnaires
- Delivers stage-matched interventions based on readiness to change
- Recommends recipes that address both psychological barriers AND practical constraints

**How It Works:**
- **TPB** diagnoses *what* holds users back (attitude, social pressure, perceived control)
- **TTM** determines *when* they're ready and *how* to intervene
- **Recipe Engine** translates insights into actionable, feasible meal suggestions

**For Carlos (our call center agent):**
- System detects: low PBC (time scarcity), Preparation stage
- Intervention: Action planning + quick, beginner-friendly recipes
- Result: Practical support matched to his actual barriers and readiness

### Slide 10: Study Objectives

*(Exact wording from the manuscript)*

To develop and evaluate AliMind, a conversational AI system that integrates the Theory of Planned Behavior and Transtheoretical Model to provide personalized nutrition support for Filipino young adults in Davao City. Specifically, the study will:

- Address the limitation of existing tools that rely on structured questionnaires which fail to capture nuanced psychological barriers and result in high attrition rates.
- Resolve the gap in real‑time psychological barrier identification by developing NLP models that can infer TPB constructs from natural conversation without requiring users to complete lengthy assessments.
- Enable stage‑appropriate intervention delivery by developing a classification system that detects users' readiness for change from conversational cues rather than explicit stage self‑reporting.
- Bridge the gap between psychological assessment and actionable nutrition support by building an intervention engine that translates TPB/TTM insights into appropriate behavior change strategies and recipe recommendations.
- Evaluate whether the integrated TPB‑TTM approach improves both technical performance and user outcomes compared to existing atheoretical or single‑theory approaches.

---

## Part 2: Methodology & Theoretical Foundations

### Slide 11: Development Approach – Three Iterative Cycles

- Design‑Development‑Testing‑Review paradigm.
- Iteration 1: Proxy data & pipeline prototyping.
- Iteration 2: Real data integration & model fine‑tuning.
- Iteration 3: Refinement, enhancement & comprehensive evaluation.
- *(Show Figure 2: Iterative Development Cycle Flow.)*

### Slide 12: Theoretical Framework – Theory of Planned Behavior (TPB)

**Core Principle:** Intention is the immediate antecedent of behavior.

**Three Key Determinants of Intention:**
- **Attitude** – favorable/unfavorable evaluation of the behavior
  - "Is healthy eating good or bad for me?"
  - "Will it be enjoyable or unpleasant?"
- **Subjective Norm** – perceived social pressure from important others
  - "Do people I care about think I should eat healthy?"
  - "Would my family/friends support this change?"
- **Perceived Behavioral Control (PBC)** – perceived ease or difficulty of performing the behavior
  - "Do I have the skills, time, and resources to eat healthy?"
  - "Can I actually do this given my circumstances?"

**Why TPB for AliMind:**
- TPB diagnoses *what* is holding the user back
- Identifies which specific barrier to target (weak attitude? low PBC? social pressure?)
- Meta-analyses show TPB accounts for 39% of variance in intention, 27% in behavior
- Validated across diverse health behaviors and cultural contexts

**Evidence:** TPB is one of the most extensively tested frameworks in health psychology, with strong predictive validity for dietary behaviors.

*(Show Figure: TPB model diagram with Attitude, Subjective Norm, and PBC arrows pointing to Intention, which points to Behavior)*

### Slide 13: Theoretical Framework – Transtheoretical Model (TTM)

**Core Principle:** Behavior change is a process that unfolds through stages, not a single event.

**Five Stages of Change:**
1. **Pre-contemplation** – not considering change ("I don't need to eat healthier")
2. **Contemplation** – thinking about change ("Maybe I should eat better")
3. **Preparation** – planning to change soon ("I'll start eating healthy next week")
4. **Action** – actively making changes ("I'm eating vegetables daily now")
5. **Maintenance** – sustaining change long-term ("I've been eating healthy for 6+ months")

**Why TTM for AliMind:**
- TTM determines *when* and *how* to intervene
- Each stage requires different intervention strategies:
  - Early stages need consciousness-raising and pros/cons exploration
  - Middle stages need action planning and skill-building
  - Late stages need relapse prevention and social support
- Stage-matched interventions are more effective than one-size-fits-all approaches
- Systematic reviews confirm improved dietary outcomes with stage-matched interventions

**The Problem TTM Solves:** Giving action-oriented advice to someone in pre-contemplation causes resistance. Giving consciousness-raising to someone in action wastes their readiness.

*(Show Figure: TTM stages as a progression arrow from Pre-contemplation → Contemplation → Preparation → Action → Maintenance, with intervention types labeled for each stage)*

### Slide 14: Theoretical Framework – NLP-Based Construct Inference

**The Bridge Between Questionnaires and Conversation**

**Two Complementary Theoretical Foundations:**

**1. Cognitive Aspects of Survey Methodology (CASM)**

CASM explains how people generate survey responses through four cognitive stages:
1. **Comprehension** – understanding the question
2. **Retrieval** – accessing relevant memories and experiences
3. **Judgment** – forming an evaluation or opinion
4. **Response Mapping** – translating judgment into the response format

**Critical Insight:**
The first three stages (Comprehension → Retrieval → Judgment) are **identical** whether someone is:
- Answering a structured Likert-scale questionnaire, OR
- Speaking naturally in conversation

**Only the final stage differs:**
- Questionnaire: Map judgment to "1-Strongly Disagree" through "5-Strongly Agree"
- Conversation: Express judgment in natural language ("I really struggle with cooking")

**2. Distributional Semantics (Harris, 1954)**

The distributional hypothesis holds that words appearing in similar contexts carry similar meanings. This enables:
- Vector representations to capture semantic relationships
- Language model embeddings to encode psychological constructs
- Semantic similarity in text to correspond to similarity in psychological meaning
- NLP models to map natural language expressions to the same latent constructs measured by validated instruments

**Why This Matters for AliMind:**
- **CASM** validates that conversational responses contain the same psychological constructs as structured assessments
- **Distributional semantics** enables computational extraction of these constructs from text
- Together, they justify using NLP to infer TPB constructs (attitude, subjective norm, PBC) and TTM stages from natural conversation
- This eliminates the assessment burden that drives user attrition in traditional apps
- Users engage more naturally and provide richer, more detailed responses

*(Show Figure: Split diagram - Left side shows CASM's four stages with stages 1-3 labeled "Same for questionnaires and conversation" and stage 4 labeled "Different format, same content". Right side shows distributional semantics concept with word embeddings capturing semantic similarity)*

### Slide 15: Conceptual Framework – Integrating TPB & TTM

- TPB provides the "what" (psychological determinants).
- TTM provides the "when" (readiness stage).
- **Early stages** (Pre‑contemplation, Contemplation): TTM‑led, using TPB context for decisional balance.
- **Middle stages** (Preparation, Action): TPB‑led, targeting the weakest determinant with stage‑matched BCTs.
- **Late stage** (Maintenance): TTM‑led, focusing on relapse prevention with TPB monitoring.
- *(Show Figure 4: TPB‑TTM Integration Framework for Personalized Intervention.)*

### Slide 16: Conceptual Framework – The Seven‑Step Computational Pipeline

- *(Show Figure 5: Seven‑Step Pipeline Architecture.)*

1. **Conversational Context Collection** – elicits barriers, preferences, constraints.
2. **TPB Construct Inference** – continuous scores for Attitude, Subjective Norm, PBC.
3. **TTM Stage Estimation** – classifies readiness from conversation.
4. **Intervention Mode Selection** – maps stage to intervention type.
5. **TPB‑Targeted Intervention Choice** – selects BCT based on weakest determinant.
6. **Feasible Dish/Plan Generation** – filters recipes by user constraints.
7. **Response Generation** – synthesizes everything into a natural‑language reply.

### Slide 17: Data Collection & Preparation

- **Target Population:** Filipino young adults aged 18‑40 in Davao City; English language interface.
- **Preliminary Survey (Hybrid Design):**
  - Open‑ended prompts paired with Likert‑scale items for TPB constructs.
  - TTM stage classification using open‑ended questions and adapted URICA.
  - Thematic analysis → theme taxonomy for NLP models.
- **Primary Data Corpus:** 150‑200 participants' open‑ended responses paired with quantitative scores.
- **Proxy Data (Iteration 1):** MHC‑Coach, openCHA demo scripts for initial prototyping.
- **Recipe Database:** RecipeNLG (2.2M recipes) enriched with Filipino recipes and metadata (time, cost, difficulty).

---

## Part 3: Iterations in Detail

### Slide 18: Iteration 1 – Proxy Data & Pipeline Prototyping

**Goal:** Establish core architecture and conversation flow.

**A. Requirements Gathering**
- Functional, technical, and ethical requirements based on TPB/TTM framework
- Gather placeholder dialogue data (MHC‑Coach, openCHA)
- Index RecipeNLG dataset (2.2M recipes)
- Identify development tools (LangChain, DeBERTa, RoBERTa, Llama 3, Mistral 7B)

**B. Design**
- Design seven‑step modular pipeline architecture
- Create question pools organized by TPB constructs and TTM stages
- Design dialogue state tracking and coverage monitoring
- Map intervention modes to TTM stages

**C. Development**
- Implement pipeline using placeholder datasets
- Establish baseline TPB inference (zero‑shot mode)
- Enable FAISS semantic recipe retrieval
- Create mock confidence propagation

**D. Testing**
- Verify end‑to‑end connectivity between all seven steps
- Test conversation flow with simulated interactions
- Measure response latency (compare Llama 3 vs. Mistral 7B)
- Validate confidence score propagation

**E. Review**
- Update prompt templates based on observations
- Refine dialogue state tracker logic
- Document baseline performance metrics
- Create prioritized improvement list for Iteration 2

### Slide 19: Iteration 2 – Real Data Integration & Model Fine‑Tuning

**Goal:** Train and validate inference models with real user data.

**A. Design**
- Develop theme taxonomy from thematic analysis of survey responses
- Map themes to TPB constructs with association weights
- Refine model architectures (DeBERTa‑v3, RoBERTa, DistilBERT)
- Calibrate confidence thresholds (0.6 for TPB, 0.7 for TTM)
- Design longitudinal tracking with exponential smoothing (λ = 0.4)
- Plan stage transition confirmation (2‑session persistence)

**B. Development**
- Administer preliminary survey (150–200 participants)
- Conduct thematic analysis and annotate corpus
- Fine‑tune models: DeBERTa/RoBERTa for TPB themes, DistilBERT for TTM stages
- Integrate trained models into Steps 2 and 3
- Implement longitudinal tracking mechanisms

**C. Testing**
- Validate models: F1 > 0.80 (classification), MAE < 0.5 (regression)
- Pilot testing with 10–15 users (2–3 sessions each)
- Collect conversational logs and qualitative feedback
- Test confidence threshold logic with validation data
- Compare performance against Iteration 1 baseline

**D. Review**
- Compare DeBERTa vs. RoBERTa performance, select best model
- Refine confidence thresholds based on precision‑recall tradeoffs
- Update clarification question templates
- Document edge cases and improvements for Iteration 3

### Slide 20: Iteration 3 – Refinement, Enhancement & Comprehensive Evaluation

**Goal:** Polish system for final evaluation and deployment readiness.

**A. Design**
- Design fallback strategies for low‑confidence scenarios
- Plan user experience improvements based on Iteration 2 feedback
- Design dynamic weight reestimation (every 50 sessions, λ = 0.3)
- Plan comprehensive evaluation: quasi‑experimental design (AliMind vs. generic chatbot)
- Design conversational naturalness assessment (4 dimensions)

**B. Development**
- Implement enhanced fallback mechanisms and clarification strategies
- Refine conversation flow, response timing, and tone
- Implement dynamic weight reestimation system
- Enhance longitudinal tracking with relapse risk detection
- Optimize response generation prompts for empathy

**C. Testing**
- Comprehensive user testing: 30–50 participants, 5–7 sessions over 2–3 weeks
- Expert validation: nutritionists review 100 responses (target: ≥85% safe)
- Linguistic experts rate 50 transcripts on naturalness (target: ≥3.5/5)
- Measure SUS (target: > 68), engagement metrics, behavioral outcomes
- Compare intervention group vs. comparison group

**D. Review**
- Assess performance against all success criteria
- Finalize system architecture and design decisions
- Create user guidelines and disclosure statements
- Document limitations and future improvements
- Prepare deployment protocols

---

## Part 4: Evaluation, Ethics, and Planning

### Slide 21: Evaluation Metrics & Success Criteria

**Technical Performance**
- Classification: F1 > 0.80 (themes, TTM stages)
- Regression: MAE < 0.5 (TPB scores on 7‑point scale)
- Correlation: Pearson r > 0.70 against ground truth

**Expert Validation**
- ≥85% of responses rated as nutritionally safe (score ≥3/5) by registered nutritionists

**User Outcomes**
- System Usability Scale (SUS) > 68
- Positive stage progression and TPB score improvements
- High engagement (session duration, return rates)

*(Show summary table from the manuscript if needed.)*

### Slide 22: Ethical Considerations

- **Informed Consent** – digital consent forms, clear explanation of risks/benefits, voluntary participation.
- **Risk Classification** – minimal risk; safeguards include non‑judgmental tone, expert review, and redirection for medical concerns.
- **Data Privacy & Security** – de‑identification, encrypted storage, restricted access.
- **Algorithmic Risks** – bias mitigation through subgroup evaluation, fallback mechanisms, and confidence thresholds.
- **Expert Oversight** – registered nutritionist reviews system outputs and safety filters.

### Slide 23: Project Workplan (Timeline)

*(Insert simplified Gantt chart or table from the workplan section.)*

Key milestones:
- **Months 1–3:** Protocol, Iteration 1
- **Months 4–8:** Iteration 2 (survey, model training, pilot)
- **Months 9–12:** Iteration 3 (user testing, expert review, final analysis)
- **Months 13–14:** Documentation, defense

### Slide 24: Budget Request Proposal

*(Show the budget table from the manuscript.)*

Summary:
- Participant incentives: PHP 21,000
- Cloud computing (Google Colab): PHP 1,200
- Supplies & printing: PHP 1,700
- Miscellaneous & contingency: PHP 2,100
- **Grand Total: PHP 32,955**

### Slide 25: Video Demo – AliMind in Action

*(Placeholder for a 1‑2 minute screen recording.)*

Show:
- User initiates conversation about eating habits.
- System asks about barriers; user mentions "no time to cook."
- Backend inference (low PBC, Preparation stage).
- System responds with empathy and recommends a quick, beginner‑friendly recipe.
- Recipe card with simple instructions.

### Slide 26: Conclusion

**Summary:** AliMind bridges behavioral science and digital nutrition by delivering personalized, stage‑matched support.

**Anticipated Impact:** A theoretically grounded, conversational AI that addresses real‑world barriers for Filipino young adults in Davao City, demonstrating how conversational AI can naturally elicit psychological constructs and deliver theory-driven interventions at scale.

---

## Notes

- Total slides: 26
- Slide 2: Introduction - Opens with global nutrition challenge, leads into AliMind introduction (based on your text)
- Slide 3: Presentation Overview - Provides roadmap
- Slide 4c: Updated with Lafuente et al. (2023) local Davao City study findings showing motivation-behavior gap
- Presentation structure: 4 parts (Introduction, Methodology & Theory, Iterations, Evaluation & Planning)
- Key figures to prepare: Figures 1, 2, 4, 5, Gantt chart, budget table
- Video demo placeholder on Slide 25

---

## Potential Additional Content (Not Currently in Slides)

Based on review of the full paper, the following content is covered in the manuscript but not explicitly in the slide deck. Consider whether any should be added:

### From Introduction Chapter:
- Table 1: Comparison of existing digital nutrition tools (calorie tracking apps, meal planning apps, rule-based chatbots, LLM-powered chatbots, research prototypes) showing none assess both TPB constructs AND implement TTM stages
- Specific statistics: 76.5% internet access in Philippines, 89.7% smartphone usage, 10h 27min daily online time
- Attrition rates: 43-80% dropout in mHealth apps, only 3.9% engagement beyond 15 days
- Specific tool examples: MyFitnessPal, Mealime, Roti, ChatGPT-4o, FiberMore, PROTEIN, Fridolin, DIAITA

### From Methods Chapter:
- CASM (Cognitive Aspects of Survey Methodology) framework - justifies NLP inference from conversation (Slide 10 covers this)
- Detailed formulas:
  - Behavioral Intention regression: BI = β₀ + β₁A + β₂SN + β₃PBC + ε
  - TPB construct scoring with weighted aggregation
  - Exponential smoothing for longitudinal tracking: λ = 0.4
  - Dynamic weight reestimation: StageProgression = β₀ + β₁ΔA + β₂ΔSN + β₃ΔPBC + ε
  - Recipe scoring: FinalScore = 0.4·HealthScore + 0.3·(1-Difficulty) + 0.2·PreferenceMatch + 0.1·NoveltyBonus
- Specific model architectures: DeBERTa-v3-base (~184M params), DeBERTa-v3-large (~435M), RoBERTa-base (~125M)
- Confidence threshold details: 0.6 for TPB, 0.7 for TTM
- Recipe database: RecipeNLG (2.2M recipes) with FAISS semantic search
- Quality assurance pipeline: theoretical consistency, practical feasibility, conversational coherence, safety screening
- Longitudinal tracking: 2-session confirmation for stage transitions
- Dynamic weight reestimation: every 50 sessions, λ = 0.3 for weight smoothing
- Evaluation formulas: Precision, Recall, F1, MAE, RMSE, R², Pearson r
- Quasi-experimental design: intervention group (AliMind) vs. comparison group (generic chatbot)
- Conversational naturalness assessment: 4 dimensions (fluency, appropriateness, engagement, empathy)

### From Ethics Section:
- Detailed informed consent process
- Risk classification: minimal risk
- Data privacy: de-identification, encrypted storage
- Confidentiality limits: imminent harm disclosure
- Expert review by registered nutritionist-dietitian
- Algorithmic bias mitigation: subgroup evaluation
- Dependency risk management
- System failure modes and fallback mechanisms
- Safety monitoring at scale considerations

### Recommendations:
1. Current slide deck provides excellent high-level overview suitable for presentation
2. Consider adding 1-2 slides if time permits:
   - Optional Slide: "Comparison with Existing Tools" (Table 1 summary)
   - Optional Slide: "Technical Architecture Details" (model sizes, confidence thresholds, recipe database specs)
3. Keep detailed formulas and technical specifications for Q&A or appendix slides
4. Ethics content is appropriately summarized in Slide 18
