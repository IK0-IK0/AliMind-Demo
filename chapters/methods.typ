#import "@preview/fletcher:0.5.8" as fletcher: diagram, edge, node

= Methods and Materials

== Research Design

AliMind's development will progress through structured development cycles as shown in Figure 2, following a Design-Development-Testing-Review paradigm. Each iteration will build upon the previous one, progressively refining the system from initial prototyping through final deployment.

#figure(
  image("../figures/iterative.png"),
  caption: [Iterative Development Cycle Flow],
) <fig:iterations>

#v(10pt)

=== Overview of Iterations

*Iteration 1: Proxy Data and Pipeline Prototyping.* The first cycle will focus on establishing the core system architecture and conversation flow before collecting real user data. Using placeholder dialogue datasets (MHC-Coach, openCHA demo scripts) and simulated user interactions, this cycle will test the end-to-end functionality of the seven-step pipeline.

*Iteration 2: Real Data Integration and Model Fine-Tuning.* The second cycle will incorporate the preliminary survey data collected from the target population, with open-ended responses paired with TPB scores and TTM stage labels. This iteration will focus on training and validating the core inference models.

*Iteration 3: Refinement and Enhancement.* The third cycle will focus on polishing the system based on insights from pilot testing, addressing edge cases, and preparing for deployment.

== Theoretical Framework

=== The Theory of Planned Behavior (TPB)

Developed by Icek Ajzen @ajzen1991theory, the Theory of Planned Behavior posits that the immediate antecedent of any behavior is the individual's *intention* to perform that behavior. Intention represents the motivational factors that influence how hard people are willing to try and how much effort they plan to exert @ajzen1991theory. According to the TPB, intention is itself a function of three independent constructs:

#figure(
  image("../figures/tpb.png"),
  caption: [Theory of Planned Behavior],
)

#pad(left: 1em)[
  - *Attitude Toward the Behavior (A):* This refers to the degree to which a person has a favorable or unfavorable evaluation or appraisal of the behavior in question. It encompasses both *instrumental* aspects (e.g., beneficial/harmful, wise/foolish) and *experiential* aspects (e.g., pleasant/unpleasant, enjoyable/unenjoyable) of performing the behavior @ajzen2020changing. A person who believes that eating healthy will lead to positive outcomes (e.g., more energy, better health) will hold a more positive attitude.

  - *Subjective Norm (SN):* This is the perceived social pressure to perform or not perform the behavior @ajzen1991theory. It is determined by the individual's beliefs about whether significant others (e.g., family, friends, colleagues) think they should engage in the behavior, weighted by their motivation to comply with those referents @armitage2001EfficacyOT. For instance, a young adult might feel pressure from peers to eat out at fast-food restaurants, creating a subjective norm that discourages healthy eating.

  - *Perceived Behavioral Control (PBC):* This refers to the individual's perception of the ease or difficulty of performing the behavior @ajzen1991theory. It reflects both *internal* control factors (e.g., skills, knowledge, willpower) and *external* control factors (e.g., time, opportunity, cooperation of others). PBC is a unique addition to the model as it has both a motivational influence on intention and a direct link to behavior, as it can serve as a partial substitute for actual control @ajzen2020changing.
]

In this study, TPB will be used to diagnose the specific psychological barriers holding a user back. By analyzing a user's natural language, AliMind will infer their scores on Attitude, Subjective Norm, and PBC. The weakest of these determinants will become the primary target for intervention.

=== The Transtheoretical Model (TTM)

Developed by Prochaska and DiClemente @prochaska1997transtheoretical, the Transtheoretical Model conceptualizes behavior change not as a discrete event, but as a process that unfolds over time through a series of stages. The model's core premise is that individuals at different stages of change require different types of interventions @prochaska2005transtheoretical. The five stages are:

#pad(left: 1em)[
  1. *Pre-contemplation:* The individual does not intend to take action in the foreseeable future (usually measured as the next six months). They may be unaware that their behavior is problematic or may be demoralized from past failed attempts.

  2. *Contemplation:* The individual intends to change within the next six months. They are aware of the pros and cons of changing, leading to a state of ambivalence and "weighing" of the costs and benefits.

  3. *Preparation:* The individual intends to take action in the immediate future (usually within the next month). They may have a plan of action, such as joining a support group, buying a cookbook, or speaking to a counselor.

  4. *Action:* The individual has made specific, overt modifications to their lifestyle within the past six months. This is a busy period of active change and is the most vulnerable to relapse.

  5. *Maintenance:* The individual is working to prevent relapse and consolidate the gains attained during action. They are less tempted to regress and increasingly more confident they can sustain the change.
]

*TTM Stage Assessment:* Traditional TTM assessment relies on validated staging algorithms and instruments. The University of Rhode Island Change Assessment (URICA) is one of the most widely used instruments for measuring stages of change @mcconnaughy1989stages. URICA is a 32-item self-report measure with four subscales corresponding to precontemplation, contemplation, action, and maintenance stages, using 5-point Likert scales. For dietary behavior specifically, validated staging algorithms employ combinations of yes/no questions about current behavior and intentions for future change @greene1994stages @prochaska1994changing. Typical staging questions assess current eating patterns, intentions to change within specific timeframes (6 months for contemplation, 30 days for preparation), and duration of current healthy eating behaviors (less than 6 months for action, more than 6 months for maintenance) @greene1999dietary @horwath2013transtheoretical.

In this study, TTM will be used to determine the user's current readiness for change by analyzing linguistic markers in their conversation. This stage classification will dictate the intervention mode.

#table(
  columns: (auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, left),

  [*Stage*], [*Characteristics*], [*Intervention Mode*], [*Example BCTs*],

  [Pre-contemplation],
  [Not considering change, unaware or demoralized],
  [Awareness],
  [Information about health consequences, consciousness raising],

  [Contemplation],
  [Thinking about change, weighing pros and cons],
  [Ambivalence-resolution],
  [Pros and cons exploration, dramatic relief],

  [Preparation],
  [Planning to act soon, making small experiments],
  [Planning],
  [Action planning, goal setting, commitment],

  [Action],
  [Actively modifying behavior, vulnerable to relapse],
  [Coping],
  [Self-monitoring, problem solving, stimulus control],

  [Maintenance],
  [Sustaining change, preventing backsliding],
  [Relapse-prevention],
  [Relapse prevention, social support, helping relationships],
)

#v(20pt)

=== Cognitive Aspects of Survey Methodology (CASM)

The inference of TPB constructs and TTM stages from natural language is grounded in the Cognitive Aspects of Survey Methodology (CASM) framework @tourangeau2000psychology. CASM posits that answering any survey question involves four cognitive stages: (1) comprehension, (2) retrieval from memory, (3) judgment formation, and (4) response mapping. Critically, the first three stages are identical regardless of response format; only the final stage differs between structured and open-ended responses @tourangeau2000psychology. Whether a respondent rates their perceived behavioral control as "3" on a Likert scale or states "I don't have time to cook" in conversation, they have engaged the same cognitive processes of comprehension, retrieval, and judgment. Similarly, whether someone selects "Contemplation" on a URICA scale or says "I've been thinking about changing my diet but haven't started yet," the underlying stage assessment reflects the same cognitive judgment. The difference lies only in how the internal judgment is expressed.

This principle validates the core methodological approach: open-ended conversational responses contain the same underlying psychological constructs as structured assessments. Empirical support comes from qualitative TPB research demonstrating that open-ended elicitation interviews reliably capture belief structures underlying attitudes, subjective norms, and perceived behavioral control @francis2004constructing @downs1999eliciting, and from TTM research showing that stage classification can be reliably derived from open-ended interviews @prochaska2005transtheoretical. Studies further demonstrate that conversational formats yield richer responses while maintaining construct consistency @schuman1996questions @geer1988what @bishop1988changing.

The NLP inference models developed in this research analyze the response mapping stage, extracting latent judgments from natural language and converting them to quantitative representations. The paired training data where participants provide both open-ended explanations and corresponding Likert-scale ratings enables supervised learning of this mapping function, ensuring that inferred scores reflect the same cognitive judgments captured by validated psychometric instruments @kjell2019semantic @boyd2022development.

== Conceptual Framework

=== Integration of TPB and TTM

While powerful on their own, the true potential of this study lies in the *synergistic integration* of TPB and TTM. The TPB provides a snapshot of the content of a person's motivation, while the TTM provides the timeline and context of their readiness. By combining them, we can move from a one-size-fits-all approach to a dynamically tailored intervention.

The integrated framework operates on a simple yet powerful principle: *What you talk about (the TPB barrier) depends on when the person is in their journey (the TTM stage).* The TPB provides the "what", which is the specific psychological determinants of intention and behavior, while the TTM provides the "when", the dynamic stages of readiness that dictate how and when to intervene.

#figure(
  fletcher.diagram(
    node-stroke: 1pt,
    spacing: (20mm, 18mm),
    edge-stroke: 1pt,

    // Top: Input Analyses
    node((0, 4), [TPB Analysis], fill: blue.lighten(80%), name: <tpb>),
    node((2, 4), [TTM Analysis], fill: green.lighten(80%), name: <ttm>),

    // TPB Constructs (left column)
    node((0, 3), [Attitude], fill: blue.lighten(90%), name: <att>),
    node((0, 2.7), [Subjective Norm], fill: blue.lighten(90%), name: <sn>),
    node((0, 2.4), [Perceived Behavioral Control], fill: blue.lighten(90%), name: <pbc>),

    // TTM Stages (right column)
    node((2, 3), [Pre-contemplation], fill: green.lighten(90%), name: <pre>),
    node((2, 2.7), [Contemplation], fill: green.lighten(90%), name: <con>),
    node((2, 2.4), [Preparation], fill: green.lighten(90%), name: <prep>),
    node((2, 2.1), [Action], fill: green.lighten(90%), name: <act>),
    node((2, 1.85), [Maintenance], fill: green.lighten(90%), name: <main>),

    // Middle: Integration Logic
    node((1, 1), [Integration\ Logic], fill: yellow.lighten(80%), name: <integration>),

    node((1, 0), [Personalized\ Intervention], fill: red.lighten(80%), name: <intervention>),

    edge(<tpb>, <att>, "<-"),
    edge(<tpb>, <sn>, "<-"),
    edge(<tpb>, <pbc>, "<-"),

    edge(<ttm>, <pre>, "<-"),
    edge(<ttm>, <con>, "<-"),
    edge(<ttm>, <prep>, "<-"),
    edge(<ttm>, <act>, "<-"),
    edge(<ttm>, <main>, "<-"),

    edge(<tpb>, <integration>, "->", [Weakest\ Determinant], bend: -20deg, label-pos: 0.3),
    edge(<ttm>, <integration>, "->", [Current\ Stage], bend: 20deg, label-pos: 0.3),
    edge(<integration>, <intervention>, "->", [BCT\ Selection]),
  ),
  caption: [TPB-TTM Integration Framework for Personalized Intervention],
) <fig:integration>

This integration is applied in the system's core logic as follows:

#pad(left: 1em)[
  - *Early Stages (Pre-contemplation & Contemplation):* The interaction is *TTM-led*. The primary goal is stage progression, not directly attacking a TPB barrier. The system uses TPB scores contextually to understand *why* the user is stuck. For example, if a user is in Contemplation, the system will use the TPB profile to inform a "decisional balance" exercise (a TTM process) @kleis2021ttm. If the user's main barrier is a negative Attitude ("Healthy food is bland"), the system can explore the "pros" of taste versus the "cons" of health, but the goal is still to move them toward Preparation, not to convince them to like broccoli today.

  - *Middle Stages (Preparation & Action):* The interaction becomes *TPB-led*. The user is ready to act, so the system uses the TPB profile to identify the "weakest link" (e.g., low PBC due to poor cooking skills). It then selects a specific Behavior Change Technique (BCT), guided by the TTM stage, to target that barrier @michie2013behavior. For instance, for a user in the Action stage with low PBC, the system might use BCT 4.1 ("Instruction on how to perform") and recommend a simple, low-skill recipe.

  - *Late Stage (Maintenance):* The interaction returns to being *TTM-led*, with a focus on relapse prevention. The TPB scores are monitored longitudinally as an early warning system @bassett-gunterOhBabyMotivation2013. A sudden drop in PBC scores, for example, could signal an increased risk of relapse, prompting the system to intervene with coping strategies before the user backslides.
]

This integrated framework ensures that the conversational AI is a theory-driven coach that delivers the right type of support, at the right time, for the right reason. It allows the system to understand both the user's destination (healthy eating) and their current location on the map (TTM stage), as well as the specific obstacles in their path (TPB determinants).

#table(
  columns: (auto, auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, left, left),

  [*Stage Group*], [*Stages*], [*Primary Driver*], [*Role of TPB*], [*Role of TTM*],

  [Early Stages],
  [Pre-contemplation, Contemplation],
  [TTM-led],
  [Contextual understanding of barriers],
  [Selects processes (consciousness raising, decisional balance) to move user to next stage],

  [Middle Stages],
  [Preparation, Action],
  [TPB-led],
  [Identifies weakest determinant; selects targeted BCT],
  [Ensures action-orientation; provides stage-appropriate intensity and framing],

  [Late Stage],
  [Maintenance],
  [TTM-led with TPB monitoring],
  [Monitored for regression signs; triggers booster interventions if scores decline],
  [Focuses on relapse prevention, lifestyle integration, coping with high-risk situations],
)

=== Seven-Step Computational Pipeline

The proposed system will implement a modular pipeline architecture consisting of seven sequential processing stages (Figure 5). Each stage will be designed as an independent microservice that communicates via JSON payloads, allowing for modular updates and independent scaling.

#figure(
  fletcher.diagram(
    node-stroke: 1pt,
    node-fill: gradient.radial(blue.lighten(80%), blue.lighten(60%), center: (30%, 20%), radius: 80%),
    spacing: (9mm, 9mm),
    edge-stroke: 1pt,

    node((0, 3), [Step 1], name: <step1>),
    node((0, 4), [Conversational\ Context Collection], name: <step1-desc>),

    node((1, 3), [Step 2], name: <step2>),
    node((1, 4), [TPB Construct\ Inference], name: <step2-desc>),

    node((2, 3), [Step 3], name: <step3>),
    node((2, 4), [TTM Stage\ Estimation], name: <step3-desc>),

    node((3, 3), [Step 4], name: <step4>),
    node((3, 4), [Intervention Mode\ Selection], name: <step4-desc>),

    // Bottom row: Steps 5-7 (reversed order for U-turn)
    node((3, 0), [Step 5], name: <step5>),
    node((3, 1), [TPB-Targeted\ Intervention Choice], name: <step5-desc>),

    node((2, 0), [Step 6], name: <step6>),
    node((2, 1), [Feasible Dish/Plan\ Generation], name: <step6-desc>),

    node((1, 0), [Step 7], name: <step7>),
    node((1, 1), [Response\ Generation], name: <step7-desc>),

    // Forward flow (top row)
    edge(<step1>, <step2>, "->", [User Input]),
    edge(<step2>, <step3>, "->", [TPB Scores]),
    edge(<step3>, <step4>, "->", [TTM Stage]),

    // Turn down
    edge(<step4>, <step5>, "->", [Mode], label-pos: 0.05),

    // Backward flow (bottom row)
    edge(<step5>, <step6>, "->", [BCT]),
    edge(<step6>, <step7>, "->", [Recipes]),

    // Loop back to start
    edge(<step7>, <step1>, "->", [Session\ Context], bend: -40deg),
  ),
  caption: [Seven-Step Computational Pipeline Architecture],
) <fig:pipeline>

The seven steps are:

#pad(left: 1em)[
  1. *Conversational Context Collection:* User chats about eating habits, preferences, barriers, schedule, budget, cooking skills, and food access
  2. *TPB Construct Inference:* NLP models output continuous scores for Attitude, Subjective Norms, and Perceived Behavioral Control
  3. *Stage Estimation (TTM):* Assign a stage: pre-contemplation, contemplation, preparation, action, or maintenance
  4. *Intervention Mode Selection:* Choose a mode based on stage: awareness, ambivalence-resolution, planning, coping, or relapse prevention
  5. *TPB-Targeted Intervention Choice:* Select what to target: attitude, subjective norms, or PBC based on weakest determinant
  6. *Feasible Dish/Plan Generation:* Recommend recipes filtered by user constraints (time, budget, skills, equipment)
  7. *Response Generation:* Generate chat response that follows chosen mode, targets selected TPB construct, and embeds feasible dishes
]

The pipeline will operate as a closed-loop system where each conversation session feeds into longitudinal tracking. Across multiple sessions, the system will implement Exponential Moving Average (EMA) principles by capturing repeated measurements of TPB constructs and TTM stages in the user's natural environment, enabling detection of psychological changes over time and adaptation of intervention strategies based on progress patterns. Detailed EMA implementation is described in Iteration 2 Design.


== Data Collection and Preparation

=== Target Population
The study will focus on Filipino young adults and adults aged 18–40 in Davao City. This age range captures the transition from early adulthood through established adulthood, a period where dietary habits are both malleable and consequential for long-term health outcomes. The conversational system will operate in English, consistent with its role as the medium of instruction in Philippine higher education and its widespread use in professional and digital contexts within the target demographic @commission2012english. This also ensures compatibility with available NLP models and training corpora.

=== Preliminary Survey
The preliminary phase will consist of a single hybrid quali-quantitative survey designed to capture both natural language expressions and corresponding quantitative measures for all psychological constructs.

*Survey Structure:* In collaboration with a registered nutritionist, the survey instrument will combine open-ended prompts with immediately paired quantitative measures to ensure clinical relevance and capture salient beliefs specific to the target population. The hybrid survey will include:

*TPB Construct Assessment:*
For each of the three TPB constructs, participants will provide:
#pad(left: 1em)[
  - Open-ended responses to natural prompts eliciting attitudes, social pressures, and perceived control (e.g., "How do you feel about eating healthier? What are your thoughts on this?")
  - Paired Likert-scale items measuring the same construct (e.g., "Rate your attitude toward healthy eating: 1=very negative to 7=very positive")
]

*TTM Stage Classification:*
#pad(left: 1em)[
  - Open-ended questions about current eating habits and change intentions (e.g., "Where are you right now with healthy eating? What are your plans, if any?")
  - The University of Rhode Island Change Assessment (URICA) adapted for dietary behavior, using both Likert scales and yes/no format to classify participants' readiness for dietary change @greene1994stages
]

*Additional Measures:*
#pad(left: 1em)[
  - Behavioral Intention measured through both open-ended expression and 7-point Likert scales
  - Demographic and socioeconomic contextual variables
  - Probing questions to elicit deeper explanations of specific barriers and motivations
]

*Data Analysis:* Responses will be analyzed using thematic analysis to identify recurring patterns and barriers, with identified themes systematically mapped to the three core TPB constructs. This creates the theme taxonomy that the NLP inference models will use. The direct pairing of open-ended responses with their corresponding quantitative scores from the same survey session forms the primary labeled training corpus for the psychological inference models, ensuring temporal alignment and reducing noise in the training data.

=== Datasets and Sources

*Primary Data Corpus:* The primary training data will consist of open-ended explanations from the preliminary survey paired with their corresponding TPB Likert-scale scores and TTM stage classifications. This corpus will provide the essential ground truth for training the psychological inference models, ensuring that the system can accurately map natural language expressions to theoretical constructs. Additionally, annotated conversational logs collected during pilot testing phases in Iterations 2-3 will supplement the primary corpus with real-world interaction patterns and user feedback.

*Proxy Data for Iteration 1:* During the initial prototyping phase, placeholder dialogue datasets will serve as the foundation for system development and testing. The openCHA framework demo scripts provide structured examples of health coaching conversations, while MHC-Coach health coaching dialogues offer diverse conversational patterns and intervention strategies @abbasian2025opencha @mantena2025mhccoach. These datasets will enable comprehensive testing of the seven-step pipeline before real user data becomes available.

*Recipe Database:* AliMind will utilize the RecipeNLG dataset containing 2.2 million recipes with structured metadata @bien2020recipenlg as the primary source for recipe recommendations. This comprehensive database will be supplemented with Filipino recipe datasets to ensure cultural appropriateness and relevance for the target population. All recipes will be indexed with metadata including preparation time, difficulty level, required equipment, and estimated cost to enable effective constraint-based filtering and recommendation.

=== Programming and Development Environment

AliMind will be developed using Python 3.9+ as the primary programming language. For computationally intensive tasks such as model training and fine-tuning, Google Colab (Premium/Pro) will be utilized to leverage cloud-based GPU resources. All code, documentation, and project assets will be managed using Git for version control.

== Design Procedure

=== Iteration 1:

The first iteration will focus on establishing the core system architecture and conversation flow before collecting real user data. This iteration will begin with a comprehensive requirements analysis that grounds all subsequent design decisions.

#enum(numbering: "A)", spacing: 1.5em)[
  *Requirements Gathering*

  The requirements gathering phase will establish foundational requirements based on the TPB and TTM theoretical framework, including functional requirements for each pipeline step, conversation flow and dialogue state tracking needs, technical requirements for pipeline connectivity and confidence propagation, data requirements for recipe retrieval, and ethical requirements for health coaching conversations.

  Data collection will proceed in two parts. First, placeholder dialogue data will be gathered using openCHA framework demo scripts and MHC-Coach datasets @abbasian2025opencha @mantena2025mhccoach to test end-to-end pipeline functionality before real user data becomes available. Second, the RecipeNLG dataset containing 2.2 million recipes @bien2020recipenlg will be indexed and pre-processed, with recipes filtered for cultural appropriateness and tagged with metadata including prep time, difficulty level, equipment required, and estimated cost.

  The primary development tools will be identified: LangChain for conversation management, DeBERTa-v3-base, DeBERTa-v3-large, RoBERTa-base, and DistilBERT as candidate models for TPB/TTM inference (to be compared and selected based on validation performance), Llama 3 8B and Mistral 7B for response generation, FAISS for vector search in recipe retrieval, and Unsloth/LoRA for parameter-efficient fine-tuning.


][*Design*

  The seven-step computational pipeline will be designed as a modular architecture where each stage operates as an independent microservice communicating via JSON payloads, with confidence scores propagating through the pipeline to inform downstream decision-making.

  *Step 1: Conversational Context Collection.* The system will employ a conversational approach that embeds psychologically informed prompts within organic dialogue, grounded in evidence that conversational agents elicit more thoughtful responses than traditional surveys @xiao2020tell @aggarwalArtificialIntelligenceBased2023 @feuerriegel2025nlp.

  *Question Pool and Prompt Selection:* Conversational prompts will be organized hierarchically by TPB constructs and sub-themes. During Iteration 1, the system will use dialogues from the MHC-Coach dataset @mantena2025mhccoach, extracting questions that align with TPB and TTM frameworks. Sub-themes include: for Subjective Norm (family pressure, peer influence, workplace culture, social situations), for Attitude (taste expectations, health beliefs, cooking enjoyment, outcome expectations), and for Perceived Behavioral Control (time scarcity, cost concerns, cooking skill, food access). TTM stage indicators will be organized by stage-specific linguistic markers.

  #table(
    columns: (auto, auto, auto),
    stroke: 0.5pt,
    align: (left, left, left),

    [*TPB Construct*], [*Sub-themes*], [*Example User Utterances*],

    [Attitude (A)],
    [
      • Taste expectations\
      • Health beliefs\
      • Cooking enjoyment\
      • Outcome expectations
    ],
    [
      "Healthy food is bland"\
      "I know vegetables are good for me"\
      "I actually enjoy cooking"\
      "Eating well makes me feel energized"
    ],

    [Subjective Norm (SN)],
    [
      • Family pressure\
      • Peer influence\
      • Workplace eating culture\
      • Social eating situations
    ],
    [
      "My family always orders fast food"\
      "My friends think meal prep is weird"\
      "Everyone at work eats out for lunch"\
      "It's awkward to eat healthy at parties"
    ],

    [Perceived Behavioral Control (PBC)],
    [
      • Time scarcity\
      • Cost concerns\
      • Cooking skill confidence\
      • Food access
    ],
    [
      "I don't have time to cook"\
      "Healthy food is too expensive"\
      "I'm not confident in the kitchen"\
      "There's no grocery store near me"
    ],

    [TTM Stage Indicators],
    [
      • Awareness markers\
      • Intention markers\
      • Planning markers\
      • Action markers\
      • Maintenance markers
    ],
    [
      "I never thought about it" (Pre-contemplation)\
      "I should probably start eating better" (Contemplation)\
      "I'm planning to meal prep next week" (Preparation)\
      "I've been cooking at home for a month" (Action)\
      "I've kept this up for 6 months now" (Maintenance)
    ],
  )

  As the conversation progresses, user mentions that map to sub-themes (e.g., "my family always orders fast food" triggers family pressure under Subjective Norm) register as evidence, accumulating confidence scores across turns that contribute to overall TPB construct scores and TTM stage probability in Steps 2 and 3.

  *Text Processing and Cleaning:* User inputs will undergo minimal preprocessing (removing repeating letters, excessive whitespace, standardizing punctuation) while preserving semantic content and emotional expression.

  *Dialogue State Tracking and Coverage Monitoring:* LangChain will manage conversation flow and context retention. A dialogue state tracker will maintain: (1) sub-theme confidence scores, (2) TPB construct coverage levels, (3) TTM stage indicator confidence, (4) mentioned constraints, and (5) outstanding clarifications. The tracker updates after each turn using pattern matching and keyword detection. A construct is sufficiently covered when sub-theme confidence ≥ 0.6. When coverage gaps exist, the system selects follow-up questions from the corresponding sub-theme pool.

  *Practical Constraints Collection:* After TPB/TTM construct coverage reaches sufficient thresholds (70% coverage and TTM confidence > 0.6), Step 1 will collect dietary restrictions, food allergies, medical dietary needs, and cultural restrictions using a hybrid approach: open-ended questions followed by structured checklist confirmation. These constraints serve as hard filters for recipe recommendation.

  Step 1 outputs a structured conversation object containing turns, extracted entities (spaCy, bert-fda-nutrition-ner), dialogue state with TPB/TTM coverage, dietary constraints, and session metadata. Tools: LangChain, Llama 3 8B or Mistral 7B, spaCy.

  *Step 2: TPB Construct Inference.* A fine-tuned bert model will perform multi-label classification on the user's recent conversation window (last 3–5 turns), detecting themes from an empirically derived taxonomy. Each theme maps to TPB constructs via a mapping matrix $m_{"ic"}$ in [0,1].

  The scoring formula will incorporate population-specific regression weights derived from the quantitative survey. Multiple linear regression analysis will yield standardized coefficients representing the relative contribution of each construct to behavioral intention:

  #v(5pt)
  #align(center)[
    $ "BI" = beta_0 + beta_1 A + beta_2 "SN" + beta_3 "PBC" + epsilon $ <eq:regression>
  ]
  #v(5pt)

  These coefficients ($w_i$) will calibrate the importance of each theme within its associated construct. TPB construct scores are then computed using weighted aggregation:

  #v(5pt)
  #align(center)[
    $
      "Score"_"construct" = frac(sum_{i=1}^{n} ( w_i times m_{"ic"} times "confidence"_i times "intensity"_i ), sum_{i=1}^{n} ( w_i times m_{"ic"} times "max_intensity" ))
    $ <eq:tpb-score>
  ]
  #v(5pt)

  where $w_i$ represents the population-specific regression weight for theme $i$, $m_{"ic"}$ is the mapping weight of theme $i$ to construct $c$, $"confidence"_i$ is the classifier's confidence score, and $"intensity"_i$ is the normalized frequency of theme-related language. This weighted aggregation approach will be validated during Iteration 2 Development and Testing phases to ensure that the interaction effects between the four factors produce theoretically consistent construct scores. Sensitivity analysis will be conducted to verify that the formula appropriately balances high-confidence detections of less important themes against low-confidence detections of more important themes.

  *Step 3: Stage Estimation (TTM).* A lightweight DistilBERT or BERT-small model will be fine-tuned on TTM-annotated corpus, outputting a probability distribution across the five stages. When confidence falls below threshold ($P_"max" < 0.7$), the system falls back on rule-based pattern matching using linguistic markers identified in the literature @horwath2013transtheoretical @wyker2010behavioral. Confidence thresholds guide behavior: High ($P_"max" >= 0.7$) accepts and proceeds; Medium ($0.5 <= P_"max" < 0.7$) accepts but flags for monitoring; Low ($P_"max" < 0.5$) triggers clarification. The fallback rate (percentage of classifications requiring rule-based pattern matching) will be monitored during Iteration 2 Testing, with a target of less than 20% fallback usage indicating that the model provides reliable classifications for the majority of cases. Stage classifications are tracked across sessions to detect movement, backsliding, or stalling.

  *Step 4: Intervention Mode Selection.* TTM stage translates to intervention mode via deterministic lookup: Pre-contemplation → Awareness, Contemplation → Ambivalence-resolution, Preparation → Planning, Action → Coping, Maintenance → Relapse-prevention @bridle2009stagematched @kleis2021ttm.

  *Behavior Change Techniques (BCTs) Framework:* The system will utilize the BCT Taxonomy version 1 (BCTTv1), which provides 93 distinct techniques organized into 16 hierarchical clusters @michie2013behavior. Each BCT targets specific psychological mechanisms (e.g., "Action Planning" enhances PBC, "Information about Health Consequences" strengthens attitudes).

  #table(
    columns: 4,
    stroke: 0.5pt,
    align: (left, left, left, left),

    [*TTM Stage*], [*Weak Attitude*], [*Weak Subjective Norm*], [*Weak PBC*],

    [Pre-contemplation],
    [Health consequences information, consciousness raising],
    [Social norm information, environmental reevaluation],
    [Capability information, self-reevaluation],

    [Contemplation],
    [Pros/cons exploration, outcome expectancies],
    [Social support identification, normative beliefs],
    [Barrier identification, self-efficacy building],

    [Preparation],
    [Goal setting, outcome planning],
    [Social support planning, commitment devices],
    [Action planning, implementation intentions],

    [Action],
    [Self-monitoring, feedback on behavior],
    [Social support utilization, accountability],
    [Problem solving, coping strategies],

    [Maintenance],
    [Relapse prevention, habit formation],
    [Social support maintenance, role models],
    [Coping strategies, environmental restructuring],
  )

  The complete intervention library contains BCTs covering all 15 possible combinations of TTM stage (5 stages) and weakest TPB determinant (3 constructs), with 2-3 evidence-based BCTs specified for each combination to provide flexibility in intervention selection. The BCT mappings shown in the table above are derived from systematic reviews of behavior change interventions and TTM clinical guidelines @michie2013behavior @prochaska2005transtheoretical, and will be validated by behavioral scientists during Iteration 2 Design to ensure theoretical appropriateness and practical applicability.

  *Step 5: TPB-Targeted Intervention Choice.* The system identifies the weakest TPB determinant by comparing the three construct scores and selecting the one with the lowest value. It then consults an intervention library mapping (TTM Stage, Weakest TPB Determinant) pairs to specific BCTs from BCTTv1 @michie2013behavior. The balance of TPB versus TTM influence varies by stage: early stages (Pre-contemplation, Contemplation) are TTM-led with TPB providing context; middle stages (Preparation, Action) are TPB-led, directly targeting the weakest determinant; late stage (Maintenance) returns to TTM-led with TPB monitoring as early warning indicators.

  *Step 6: Feasible Dish/Plan Generation.* The system implements a hybrid search architecture with two stages: semantic retrieval followed by constraint-based filtering and re-ranking.

  #figure(
    fletcher.diagram(
      node-stroke: 1pt,
      spacing: (20mm, 25mm),
      edge-stroke: 1pt,

      // Input
      node((0, 3), [User Context], fill: blue.lighten(80%), name: <context>),
      node((0, 2.5), [• Preferences\ • Constraints\ • BCT Target], fill: blue.lighten(90%), name: <input>),

      // Stage 1: Semantic Search
      node((1, 3), [Stage 1:\ Semantic Search], fill: green.lighten(80%), name: <stage1>),
      node((1, 2.5), [Query Embedding\ (MiniLM-L6-v2)], fill: green.lighten(90%), name: <embed>),
      node((1, 2), [FAISS IVF\ Search], fill: green.lighten(90%), name: <faiss>),
      node((1, 1.5), [RecipeNLG\ (2.2M recipes)], fill: gray.lighten(80%), name: <db>),
      node((1, 1), [Top 100\ Similar Recipes], fill: green.lighten(90%), name: <top100>),

      // Stage 2: Filtering & Ranking
      node((2, 3), [Stage 2:\ Filter & Rank], fill: yellow.lighten(80%), name: <stage2>),
      node((2, 2.5), [Constraint\ Filtering], fill: yellow.lighten(90%), name: <filter>),
      node((2, 2), [Multi-criteria\ Scoring], fill: yellow.lighten(90%), name: <score>),
      node((2, 1.5), [Final Recipe\ Recommendations], fill: red.lighten(80%), name: <final>),

      // Connections
      edge(<input>, <embed>, "->"),
      edge(<embed>, <faiss>, "->"),
      edge(<faiss>, <db>, "<->"),
      edge(<faiss>, <top100>, "->", bend: 90deg),
      edge(<top100>, <filter>, "->"),
      edge(<filter>, <score>, "->"),
      edge(<score>, <final>, "->"),
    ),
    caption: [Recipe Recommendation Architecture (Step 6)],
  ) <fig:recipe-arch>

  Stage 1 employs FAISS semantic search on the RecipeNLG database (2.2M recipes). User context is encoded using all-MiniLM-L6-v2, then FAISS performs approximate nearest neighbor search via Inverted File Index (IVF) to identify the top 100 semantically similar recipes.

  Stage 2 applies constraint filtering (removing recipes exceeding time, difficulty, equipment, budget limits, plus dietary restrictions/allergies from Step 1), then BCT-driven re-ranking based on the selected intervention strategy:

  #table(
    columns: (auto, auto, auto, auto),
    stroke: 0.5pt,
    align: (left, left, left, left),

    [*BCT*], [*BCT Name*], [*Target Construct*], [*Recipe Features Prioritized*],

    [1.4],
    [Action Planning],
    [PBC],
    [Step-by-step instructions, ingredient prep lists, time estimates, equipment lists],

    [5.1],
    [Health Consequences],
    [Attitude],
    [Nutritional info highlighted, health benefits explained, ingredient benefits],

    [8.7], [Graded Tasks], [PBC], [Beginner-friendly tag, progressive difficulty, simple techniques],

    [9.2], [Pros and Cons], [Attitude], [Taste appeal emphasized, "healthy but delicious" framing],

    [12.5], [Environmental Restructuring], [PBC], [Common ingredients, minimal equipment, pantry staples],
  )

  Final scoring uses weighted multi-criteria formula:

  #v(5pt)
  #align(center)[
    $
      "FinalScore" = 0.4 dot.op "HealthScore" + 0.3 dot.op (1 - "Difficulty")\ + 0.2 dot.op "PreferenceMatch" + 0.1 dot.op "NoveltyBonus"
    $ <eq:recipe-score>
  ]
  #v(5pt)

  where HealthScore is a composite nutritional quality metric (0-1) computed from: (1) nutrient density (vitamins, minerals, fiber per calorie), (2) macronutrient balance, (3) whole food ingredient ratio, and (4) vegetable/fruit content //@mozaffarian2016dietary.

  This two-stage approach will ensure that recipe recommendations are both contextually relevant to the user's expressed preferences and practically achievable within their stated constraints, while prioritizing nutritional value and maintaining variety in suggestions.

  *Step 7: Response Generation.* The final step synthesizes all previous analyses into a coherent, natural language response. Step 7 receives: conversation history (Step 1), intervention mode and stage context (Step 4), targeted TPB construct and selected BCT (Step 5), ranked recipe recommendations (Step 6), and current TPB/TTM confidence scores.

  The system employs Llama 3 8B or Mistral 7B as the core language model. Dynamic prompt templates managed through Jinja2 or LangChain incorporate: intervention mode, targeted TPB construct with BCT framing, embedded recipe recommendations with motivational context, and empathetic acknowledgment of the user's situation. Templates are designed to feel conversational rather than prescriptive.

  *Quality Assurance and Safety Checks.* Before delivery, responses undergo a multi-layered validation pipeline to ensure safety and appropriateness. First, theoretical consistency is verified by checking that the response aligns with the selected intervention mode and BCT using keyword matching and semantic similarity scoring against mode-specific reference responses. Second, practical feasibility is validated by confirming that recommended recipes match the user's stated constraints (time, budget, skill level, dietary restrictions) through automated constraint checking. Third, conversational coherence is assessed by verifying that the response flows naturally from the conversation history using perplexity scoring and context relevance metrics. Fourth, safety screening is performed using a rule-based filter that flags potentially harmful content including: extreme caloric restrictions, elimination of entire food groups without medical justification, medical claims or diagnoses (e.g., "this will cure your diabetes"), supplement or medication recommendations, and weight loss promises or guarantees. Additionally, a keyword blocklist screens for inappropriate language, stigmatizing terms related to body image, or overly prescriptive medical advice. If any check fails, the system falls back to a pre-validated templated response that acknowledges the limitation (e.g., "I want to make sure I give you the best advice. Let me ask a few more questions to understand your situation better") and redirects the conversation constructively. All flagged responses are logged for expert review during the testing phase to refine the safety filters.

][*Development*

  The seven-step pipeline will be implemented using placeholder datasets. LangChain will provide conversation management, off-the-shelf models will establish baseline TPB inference (zero-shot mode), and FAISS will enable semantic recipe retrieval on RecipeNLG. Initial versions of all seven steps will be created with mock confidence propagation. The dialogue state tracker will include basic clarification logic.

][*Testing*

  The testing phase will conduct technical validation of component functionality. End-to-end connectivity between all seven steps will be verified to confirm that data flows correctly through the pipeline. Conversation flow will be tested with simulated user interactions using the placeholder dialogues, evaluating whether the system can maintain coherent multi-turn conversations. Response latency will be measured for different language model backbones, specifically comparing Llama 3 8B and Mistral 7B, to identify performance bottlenecks and inform model selection. The system will validate that confidence scores propagate correctly through the pipeline, ensuring that low-confidence outputs in early steps trigger appropriate clarification mechanisms in later steps. Bottlenecks and failure points in the architecture will be identified and documented for refinement.

  Success criteria for Iteration 1 will be assessed through several key questions: Does the pipeline complete all seven steps without breaking? Can the system maintain coherent conversations over multiple turns? Are theoretical constructs being elicited naturally in the conversation? What are the baseline performance metrics for future comparison?

][*Review*

  The review phase will analyze pipeline performance and identify improvements. Prompt templates will be updated based on conversation flow observations. Dialogue state tracker logic will be refined to better capture user inputs and detect sufficient construct coverage. Clarification strategies will be adjusted based on simulated responses. A prioritized improvement list for Iteration 2 will be created. Baseline performance metrics will be documented (latency, conversation coherence, construct coverage rates).
]

=== Iteration 2:
The second iteration will incorporate the preliminary survey data collected from the target population. Building on the requirements established in Iteration 1, this iteration will focus on training and validating the core inference models.

#enum(numbering: "A)", spacing: 1.5em)[
  *Design*

  Iteration 2 will focus on integrating real user data and enhancing inference capabilities through model fine-tuning. The preliminary survey data will include open-ended responses paired with TPB Likert-scale scores, TTM stage classifications from standard staging questions, and demographic metadata.

  *Theme Taxonomy Development.* Thematic analysis of qualitative responses will establish a comprehensive theme taxonomy. Each theme (e.g., "time scarcity," "cost concerns," "family pressure") will be systematically mapped to TPB constructs with association weights. For example, "time scarcity" maps primarily to PBC with weight $m_{"ic"} = 0.9$, but may also influence Attitude with $m_{"ic"} = 0.3$. The mapping will be established through expert review by behavioral scientists.

  *Model Architecture Refinement for Step 2 (TPB Construct Inference).* Multiple transformer architectures will be evaluated for multi-label theme classification: DeBERTa-v3-base, DeBERTa-v3-large, and RoBERTa-base. All models will be fine-tuned using binary cross-entropy loss with class weights to address theme frequency imbalance (dataset split 80/10/10, acceptance threshold F1 > 0.80). The best-performing model will be selected based on validation performance. A keyword dictionary will serve as fallback when neural model confidence is low (< 0.6).

  #table(
    columns: (auto, auto, auto, auto),
    stroke: 0.5pt,
    align: (left, left, left, left),

    [*Component*], [*DeBERTa-v3-base*], [*DeBERTa-v3-large*], [*RoBERTa-base*],

    [Parameters], [~184M], [~435M], [~125M],

    [Input], [Conversation window (3-5 turns)], [Conversation window (3-5 turns)], [Conversation window (3-5 turns)],

    [Processing],
    [Multi-label theme classification → TPB mapping],
    [Multi-label theme classification → TPB mapping],
    [Multi-label theme classification → TPB mapping],

    [Output],
    [Theme confidence scores → construct scores],
    [Theme confidence scores → construct scores],
    [Theme confidence scores → construct scores],

    [Selection Criteria],
    [F1 score, inference speed, interpretability],
    [F1 score, inference speed, interpretability],
    [F1 score, inference speed, interpretability],

    [Fallback],
    [Keyword dictionary when confidence < 0.6],
    [Keyword dictionary when confidence < 0.6],
    [Keyword dictionary when confidence < 0.6],
  )

  *Model Architecture Refinement for Step 3 (TTM Stage Classification).* DistilBERT or BERT-small will be fine-tuned on the TTM-annotated corpus, where open-ended responses are paired with stage labels from standard TTM staging questions @greene1994stages. The model will take the user's recent conversation window (up to 512 tokens) and output a probability distribution across the five stages. When confidence falls below threshold, the system will fall back on rule-based heuristics.

  *Model Architecture Refinement for Step 3 (TTM Stage Classification).* DistilBERT or BERT-small will be fine-tuned on the TTM-annotated corpus, where open-ended responses are paired with stage labels from standard TTM staging questions @greene1994stages. The model will take the user's recent conversation window (up to 512 tokens) and output a probability distribution across the five stages. When confidence falls below threshold, the system will fall back on rule-based pattern matching using linguistic markers @horwath2013transtheoretical @wyker2010behavioral.

  *Confidence Threshold Calibration.* For Step 2, when model confidence for any construct falls below 0.6, the system will flag the need for clarification. For Step 3: high confidence ($P_"max" >= 0.7$) accepts classification and proceeds; medium confidence ($0.5 <= P_"max" < 0.7$) accepts but flags for monitoring; low confidence ($P_"max" < 0.5$) triggers a clarification question. These thresholds are set conservatively based on preliminary validation during Iteration 1, where analysis of model outputs showed that predictions below 0.6 confidence for TPB constructs and 0.7 for TTM stages exhibited substantially higher error rates. The 0.6 threshold for TPB reflects the multi-label nature of theme classification where multiple constructs may be relevant simultaneously, requiring a lower bar to avoid excessive clarification requests. The 0.7 threshold for TTM reflects the mutually exclusive nature of stage classification where higher certainty is needed before committing to a specific intervention mode. These initial thresholds will be empirically refined during Iteration 2 testing based on precision-recall tradeoffs observed in validation data, balancing the need for accurate inferences against user experience concerns about excessive clarification questions.

  *Validation Protocols.* Models will be evaluated using 80/10/10 train/validation/test splits. Metrics include: precision, recall, and F1-score for theme classification (target: F1 > 0.80); Mean Absolute Error (MAE), Root Mean Square Error (RMSE), and R² for TPB construct scoring (target: MAE < 0.5); and accuracy, precision, recall, and weighted F1-score for TTM stage classification (target: F1 > 0.80). Pearson correlation $r$ between inferred and survey-measured scores will be tracked.

  *Longitudinal Tracking Mechanisms.* The system will maintain a rolling window of recent inferences to track changes across sessions. TPB construct scores will be aggregated using exponential smoothing:

  #v(5pt)
  #align(center)[
    $ "Score"_"smoothed" = 0.4 times "Score"_"current" + 0.6 times "Score"_"previous" $ <eq:longitudinal>
  ]
  #v(5pt)

  where λ = 0.4 balances recent observations with historical trends @bassett-gunterOhBabyMotivation2013. TTM stage classifications will be tracked across sessions to detect forward movement, backsliding, or stalling, with session-level stage estimates computed as the mode across turns within each session. Stage transitions are confirmed only when the new stage persists across at least 2 consecutive sessions to filter out temporary fluctuations or misclassifications. For example, if a user is classified as Contemplation in Session 1, then Preparation in Session 2, the system will tentatively note the transition but continue monitoring; only when Session 3 also indicates Preparation (or a further forward stage) will the transition be confirmed and intervention strategies adjusted accordingly. This conservative approach prevents the system from prematurely shifting intervention modes based on momentary changes in user language that may not reflect genuine psychological shifts.

  #figure(
    fletcher.diagram(
      node-stroke: 1pt,
      spacing: (10mm, 10mm),
      edge-stroke: 1pt,

      node((0, 2.8), [Session 1], fill: blue.lighten(80%), name: <s1>),
      node((1, 2.8), [Session 2], fill: blue.lighten(80%), name: <s2>),
      node((2, 2.8), [Session 3], fill: blue.lighten(80%), name: <s3>),
      node((3, 2.8), [Session $n$], fill: blue.lighten(80%), name: <sn>),

      node((0, 2), [TPB Scores\ A, SN, PBC], fill: green.lighten(90%), name: <tpb1>),
      node((1, 2), [TPB Scores\ A, SN, PBC], fill: green.lighten(90%), name: <tpb2>),
      node((2, 2), [TPB Scores\ A, SN, PBC], fill: green.lighten(90%), name: <tpb3>),
      node((3, 2), [TPB Scores\ A, SN, PBC], fill: green.lighten(90%), name: <tpbn>),

      node((0, 0), [Smoothed\ Scores\ (λ=0.4)], fill: green.lighten(70%), name: <smooth1>),
      node((1, 0), [Smoothed\ Scores\ (λ=0.4)], fill: green.lighten(70%), name: <smooth2>),
      node((2, 0), [Smoothed\ Scores\ (λ=0.4)], fill: green.lighten(70%), name: <smooth3>),
      node((3, 0), [Smoothed\ Scores\ (λ=0.4)], fill: green.lighten(70%), name: <smoothn>),

      node((0, 1), [TTM Scores\ (Mode)], fill: yellow.lighten(90%), name: <ttm1>),
      node((1, 1), [TTM Scores\ (Mode)], fill: yellow.lighten(90%), name: <ttm2>),
      node((2, 1), [TTM Scores\ (Mode)], fill: yellow.lighten(90%), name: <ttm3>),
      node((3, 1), [TTM Scores\ (Mode)], fill: yellow.lighten(90%), name: <ttmn>),

      node((1.5, -1), [Longitudinal\ Tracking], fill: red.lighten(80%), name: <progress>),

      edge(<tpb1>, <smooth1>, "->"),
      edge(<tpb2>, <smooth2>, "->"),
      edge(<tpb3>, <smooth3>, "->"),
      edge(<tpbn>, <smoothn>, "->"),

      edge(<smooth1>, <smooth2>, "->"),
      edge(<smooth2>, <smooth3>, "->"),
      edge(<smooth3>, <smoothn>, "->"),

      edge(<smooth1>, <progress>, "->"),
      edge(<smooth2>, <progress>, "->"),
      edge(<smooth3>, <progress>, "->"),
      edge(<smoothn>, <progress>, "->"),
    ),
    caption: [Longitudinal Tracking System for TPB and TTM Progress Monitoring],
  ) <fig:longitudinal>

  Improvements will be made to Steps 2 and 3 of the pipeline to incorporate these fine-tuned models, replacing the zero-shot prototypes from Iteration 1. Steps 1, 4, 5, 6, and 7 will remain largely unchanged from Iteration 1, with minor prompt refinements based on synthetic testing observations.

][*Development*

  During the development phase, the enhancements outlined in the design will be implemented. Model training will begin with fine-tuning both DeBERTa-v3 for multi-label theme classification and RoBERTa with regression head for direct TPB construct scoring on the annotated corpus from the preliminary survey. Both approaches will be trained and evaluated separately to determine which performs better on the target population data. DistilBERT will be fine-tuned for TTM stage classification, learning to recognize linguistic patterns associated with each stage of change. Confidence thresholds will be calibrated based on validation performance, determining when the system should accept inferences versus trigger clarification questions. The theme-to-construct mapping will be updated with empirically derived weights from regression analysis, ensuring that the contribution of each theme to TPB constructs reflects actual relationships in the target population.

  The superior performing model from the DeBERTa vs. RoBERTa comparison will be integrated into Step 2 of the pipeline, replacing the zero-shot prototype from Iteration 1. The fine-tuned DistilBERT model will be integrated into Step 3.

][*Testing*

  // OBJECTIVE 2: TPB construct inference validation - measuring accuracy of psychological barrier identification
  // OBJECTIVE 3: TTM stage classification validation - measuring accuracy of readiness detection
  The testing phase will conduct both technical validation and initial pilot testing to assess the system's performance with real models and real users. Technical validation will measure precision, recall, and F1-score for theme classification, with a target of F1 > 0.80 to ensure reliable theme detection. Mean Absolute Error (MAE), Root Mean Square Error (RMSE), and R² will be calculated for TPB construct scoring, with a target of MAE < 0.5 to ensure scores closely match ground truth values from the survey. Stage classification accuracy and weighted F1-score will be evaluated with a target of F1 > 0.80, accounting for class imbalance across the five TTM stages. Confidence threshold logic will be tested with validation data to verify that low-confidence cases trigger appropriate clarification mechanisms. Performance will be compared against Iteration 1 baseline metrics to quantify improvements from model fine-tuning.

  // OBJECTIVE 1: Conversational naturalness evaluation - pilot testing conversation quality
  Initial pilot testing will be conducted with a small user group of 10-15 participants recruited from the target population (Filipino young adults, ages 18-40, Davao City). Each participant will complete 2-3 conversation sessions with the system, allowing observation of multi-session interactions and stage progression. Conversational logs will be collected for analysis, examining conversation flow, construct coverage, and system responses. Qualitative feedback will be gathered on conversation naturalness and relevance, identifying areas where the system feels robotic or where responses miss the mark.


][*Review*

  The review phase will assess performance against Iteration 2 success criteria through several key questions. Do models meet accuracy thresholds (F1 > 0.80 for classification, MAE < 0.5 for regression)? Are confidence thresholds appropriately calibrated to balance precision and coverage? How do pilot users perceive response relevance and conversation naturalness? Is theoretical alignment maintained after fine-tuning, ensuring that the system still reflects TPB and TTM principles?

  Based on the assessment, refinement actions will be taken. Model performance will be compared between DeBERTa-v3 and RoBERTa approaches, with the superior performing model selected for final implementation. Confidence thresholds will be refined where misclassifications occur, tightening thresholds for constructs with high error rates. Clarification question templates will be updated based on pilot feedback, making them feel more natural and less interrogative. A prioritized list of edge cases and improvements for Iteration 3 will be created, focusing on scenarios where the system struggles or where users express confusion.

  The outputs of Iteration 2 will include trained inference models with documented architectures and hyperparameters, empirically validated theme-to-construct mappings reflecting population-specific relationships, calibrated scoring algorithms with confidence thresholds optimized for the target population, pilot testing reports summarizing user feedback and observed issues, and validation performance metrics demonstrating improvements over Iteration 1.
]

=== Iteration 3:

The third iteration will focus on polishing the system based on insights from pilot testing, addressing edge cases, and preparing for comprehensive evaluation. A key enhancement is the implementation of dynamic weight reestimation, which allows the system to continuously learn from accumulated user data and adapt intervention targeting strategies.

#enum(numbering: "A)", spacing: 1.5em)[
  *Design*

  Iteration 3 will focus on final integration and optimization, incorporating feedback from pilot testing in Iteration 2. The design phase will address four major areas.

  *Fallback Strategy Enhancement.* Decision trees will be created for low-confidence scenarios to systematically determine the best course of action when primary models fail. The BCT-to-recipe adaptation logic will be enhanced based on user feedback. Clarification dialogue patterns will be refined for ambiguous inputs. Tone and empathy guidelines will be developed for response generation.

  *User Experience Improvements.* Based on Iteration 2 pilot testing feedback, conversation flow will be refined to address confusion points. Response timing and pacing will be adjusted. The system's ability to handle topic shifts and tangential conversations will be improved. Error messages and clarification requests will be rewritten to be more user-friendly.

  *Longitudinal Tracking Mechanisms.* Enhanced tracking will detect TPB and TTM changes across sessions. The system will maintain: conversation history for context preservation, smoothed TPB scores using exponential smoothing, and persistent TTM stage monitoring where stage changes are confirmed only when they persist across 2+ sessions. An early warning system will be developed for relapse risk based on declining PBC scores.

  *Dynamic Weight Reestimation.* The system will continuously learn from accumulated user data. Every 50 new sessions accumulated across all users, the system will run a regression analysis where the outcome variable is TTM stage progression encoded as: +1 for forward movement, 0 for stalling, and -1 for backsliding. The predictor variables will be the per-session delta values of each smoothed TPB construct: ΔAttitude, ΔSubjective Norm, and ΔPBC.

  The regression model:

  #v(5pt)
  #align(center)[
    $
      "StageProgression" = beta_0 + beta_1 Delta A + beta_2 Delta "SN" + beta_3 Delta "PBC" + epsilon
    $ <eq:dynamic-weights>
  ]
  #v(5pt)

  The resulting coefficients ($beta_1$, $beta_2$, $beta_3$) will become the updated intervention targeting weights, determining which TPB construct the system prioritizes in Step 5. Constructs with larger positive coefficients will be weighted more heavily.

  *Cold Start and Weight Smoothing.* Before sufficient data exists (fewer than 50 sessions), the system will use static preliminary survey regression weights from Iteration 2. When new weights are estimated, exponential moving average smoothing will be applied:

  #v(5pt)
  #align(center)[
    $ beta_"updated" = 0.3 times beta_"new" + 0.7 times beta_"current" $ <eq:weight-smoothing>
  ]
  #v(5pt)

  #figure(
    fletcher.diagram(
      node-stroke: 1pt,
      spacing: (20mm, 18mm),
      edge-stroke: 1pt,

      node((2, 3.65), [Session Data], fill: blue.lighten(80%), name: <sessions>),
      node((2, 3.2), [TPB Scores\ TTM Stages], fill: blue.lighten(90%), name: <data>),

      node((3.2, 3.2), [Accumulate\ 50 Sessions], fill: green.lighten(80%), name: <accumulate>),

      node((3.2, 2.2), [Compute Deltas], fill: yellow.lighten(80%), name: <deltas>),
      node((3.2, 1.8), [ΔA, ΔSN, ΔPBC\ Progression], fill: yellow.lighten(90%), name: <delta-vals>),

      node((3.2, 0.85), [Regression], fill: orange.lighten(80%), name: <regression>),
      node((3.2, 0.5), [β₁, β₂, β₃], fill: orange.lighten(90%), name: <betas>),

      node((2, 0.85), [EMA Smoothing], fill: purple.lighten(80%), name: <smoothing>),
      node((2, 0.5), [λ = 0.3], fill: purple.lighten(90%), name: <lambda>),

      node((0.8, 0.5), [Updated\ Weights], fill: red.lighten(80%), name: <updated>),

      node((0.8, 1.8), [Feed to\ Step 5], fill: red.lighten(70%), name: <output>),

      node((0.8, 3.2), [New weights\ for inference], fill: blue.lighten(70%), name: <feedback>),

      node((2, 2.2), [Cold Start (< 50 sessions)], fill: gray.lighten(80%), name: <cold>),
      node((2, 1.8), [Preliminary\ Weights], fill: gray.lighten(90%), name: <prelim>),

      edge(<data>, <accumulate>, "->"),
      edge(<accumulate>, <delta-vals>, "->"),
      edge(<delta-vals>, <betas>, "->"),
      edge(<betas>, <lambda>, "->"),
      edge(<lambda>, <updated>, "->"),
      edge(<updated>, <output>, "->"),
      edge(<output>, <feedback>, "->"),
      edge(<feedback>, <data>, "->"),

      edge(<prelim>, <output>, "->", [Initial]),
    ),
    caption: [Dynamic Weight Reestimation: Continuous Learning Cycle],
  ) <fig:dynamic-weights>

  A more conservative update rate of λ = 0.3 will be used here compared to the λ = 0.4 applied to individual TPB score smoothing, preventing large shifts in intervention strategy based on potentially noisy estimates. The smoothed weights will feed into Step 5, adjusting how the weakest determinant is identified and prioritized. This creates a continuous learning loop where the system's intervention targeting strategy evolves based on what actually works for the user population.

][*Development*

  The enhancements outlined in the design will be systematically implemented. Fallback mechanisms will be created for low-confidence scenarios in Steps 2 and 3. Rule-based pattern matching for stage classification will be expanded. User experience improvements will be implemented based on Iteration 2 feedback, including conversation pacing refinements, response length optimization, and natural handling of topic shifts. Sophisticated clarification strategies will be implemented in Step 1. Response generation prompts will be optimized for better tone and empathy in Step 7. Session-to-session tracking will be added for TPB construct scores and TTM stage.
][*Testing*

  The testing phase will evaluate the system's overall performance using both automated benchmarks and human assessments.

  Technical validation will test fallback mechanisms with edge case scenarios, deliberately providing ambiguous or contradictory inputs to verify graceful handling. User experience improvements will be validated through usability testing. System usability will be measured using the System Usability Scale (SUS), a standardized questionnaire assessing perceived ease of use and satisfaction. Engagement metrics will be tracked including session duration, conversation length, and dropout rates.

  Expert evaluation will be conducted by registered nutritionists and linguistic experts. At least 2 nutritionists will review 100 randomly sampled system responses, rating each on nutritional safety, appropriateness, and relevance using a 1-5 scale. The target will be ≥85% of responses rated as nutritionally safe (score ≥ 3).

  Conversational naturalness will be assessed through multiple methods. Linguistic experts will rate 50 randomly sampled conversation transcripts on a 5-point scale across four dimensions: (1) fluency and coherence (responses flow naturally and make sense in context), (2) appropriateness (tone and language match the conversational situation), (3) engagement quality (responses encourage continued dialogue without feeling interrogative), and (4) empathy and supportiveness (responses acknowledge user concerns non-judgmentally). The target will be an average rating ≥ 3.5 across all dimensions. Additionally, user perception of naturalness will be captured through post-session questionnaires asking participants to rate on a 5-point scale: "The conversation felt natural and human-like" and "The system's responses felt relevant to what I said." Qualitative feedback will be collected through open-ended questions asking users to describe moments where the conversation felt awkward or robotic.

  Comprehensive user testing will be conducted with 30-50 participants from the target population using a quasi-experimental design to assess system effectiveness. Participants will be randomly assigned to either the intervention group (using AliMind) or a comparison group (using a generic nutrition chatbot without TPB/TTM integration). The comparison chatbot will provide general nutrition information and recipe suggestions based on stated preferences but will not assess psychological constructs or deliver stage-matched interventions. This design allows evaluation of whether theory-driven personalization produces measurably better outcomes than generic conversational support.

  Each participant will complete 5-7 conversation sessions over 2-3 weeks, allowing observation of sustained engagement and longitudinal behavior change. Pre/post surveys will be administered measuring TPB constructs and TTM stage. System Usability Scale scores will be collected with a target of SUS > 68 (above average). Behavioral outcomes will be tracked including stage progression and changes in TPB scores. Between-group comparisons will assess whether the intervention group shows greater improvements in TPB scores, higher rates of TTM stage progression, and better engagement metrics compared to the comparison group. While this preliminary comparison cannot establish definitive causal claims about effectiveness, it provides initial evidence of whether theory-driven personalization offers advantages over generic conversational support.

][*Review*

  The final review phase will analyze the system thoroughly, capturing lessons learned and verifying that the tool meets standards of accuracy and usability. Performance assessment will address: Does the system meet all technical performance thresholds? Are ≥85% of responses rated as nutritionally safe? Is the SUS score > 68? Are there demonstrable shifts in TPB scores or TTM stage progression? Do users report positive experiences and therapeutic alliance?

  Documentation efforts will finalize all aspects for potential deployment. The final system architecture and design decisions will be documented. User guidelines and disclosure statements will be created. Deployment protocols will be prepared for larger-scale validation. Limitations and future improvement opportunities will be documented.

  Outputs: production-ready prototype with refined fallback mechanisms, improved user experience, optimized response generation, comprehensive evaluation reports, and final system documentation.

]

#v(10pt)

== Evaluation Metrics

The evaluation framework employs multiple complementary approaches to assess technical performance, expert validation, and user outcomes, ensuring comprehensive assessment of the system's effectiveness across all dimensions.

#table(
  columns: (auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, left),

  [*Metric Category*], [*Specific Metrics*], [*Target Thresholds*], [*Application*],

  [Classification], [Precision, Recall, F1-score], [F1 > 0.80], [Theme detection, TTM stage classification],

  [Regression], [MAE, RMSE, R²], [MAE < 0.5], [TPB construct scoring (7-point scale)],

  [Correlation], [Pearson r], [r > 0.70], [Validation against survey ground truth],

  [Expert Review], [Nutritional safety rating (1-5)], [≥85% safe (≥3/5)], [Nutritionist validation of recommendations],

  [User Experience], [System Usability Scale (SUS)], [> 68 (above average)], [Usability and satisfaction assessment],

  [Behavioral Outcomes],
  [TTM stage progression, TPB score changes],
  [Forward movement, score increases],
  [Pre/post intervention comparison],
)

=== Technical Performance Metrics

*Classification Tasks (Theme Classification, TTM Stage Classification):*

Precision measures the proportion of positive predictions that are actually correct:

#v(5pt)
#align(center)[
  $ "Precision" = frac("TP", "TP" + "FP") $ <eq:precision>
]
#v(5pt)

where TP = true positives, FP = false positives.

Recall measures the proportion of actual positives that are correctly identified:

#v(5pt)
#align(center)[
  $ "Recall" = frac("TP", "TP" + "FN") $ <eq:recall>
]
#v(5pt)

where FN = false negatives.

F1-Score provides the harmonic mean of precision and recall:

#v(5pt)
#align(center)[
  $ "F1" = 2 times frac("Precision" times "Recall", "Precision" + "Recall") $ <eq:f1>
]
#v(5pt)

Target: F1 > 0.80 for theme classification and weighted F1 > 0.80 for TTM stage classification.

*Regression Tasks (TPB Construct Scoring):*

Mean Absolute Error measures the average magnitude of prediction errors:

#v(5pt)
#align(center)[
  $ "MAE" = frac(1, n) sum_{i=1}^{n} |y_i - hat{y}_i| $ <eq:mae>
]
#v(5pt)

Root Mean Square Error gives higher weight to larger errors:

#v(5pt)
#align(center)[
  $ "RMSE" = sqrt(frac(1, n) sum_{i=1}^{n} (y_i - hat{y}_i)^2) $ <eq:rmse>
]
#v(5pt)

Coefficient of Determination measures the proportion of variance explained:

#v(5pt)
#align(center)[
  $ R^2 = 1 - frac(sum_{i=1}^{n} (y_i - hat{y}_i)^2, sum_{i=1}^{n} (y_i - bar{y})^2) $ <eq:r2>
]
#v(5pt)

where $y_i$ = ground truth score, $hat{y}_i$ = predicted score, $n$ = number of samples, $bar{y}$ = mean of ground truth values.

Target: MAE < 0.5 on a 7-point Likert scale for TPB construct scoring.

*Correlation Analysis:*

Pearson correlation coefficient between inferred and survey-measured scores:

#v(5pt)
#align(center)[
  $
    r = sum_{i=1}^{n} (x_i - bar{x})(y_i - bar{y}) / sqrt{sum_{i=1}^{n} (x_i - bar{x})^2 sum_{i=1}^{n} (y_i - bar{y})^2}}
  $ <eq:pearson>
]
#v(5pt)

where $x_i$ = predicted scores, $y_i$ = ground truth scores.

=== Expert Validation Metrics

*Nutritionist Review:* Registered nutritionists will review a random sample of 100 system responses, rating each on nutritional safety using a 1-5 scale where scores of 3 or higher indicate safe recommendations. The target threshold is set at ≥85% of responses receiving safe ratings. Additionally, nutritionists will assess the appropriateness of recipe recommendations for the user's stated constraints and goals, as well as the cultural relevance of suggested foods within the Filipino context.

=== User Outcome Metrics

*Behavioral Outcomes:* The primary behavioral outcomes will be assessed through pre/post comparisons of TTM stage progression and changes in TPB construct scores. TTM stage progression will be measured by comparing participants' initial stage classification with their stage at the end of the study period, with forward movement (e.g., from Contemplation to Preparation) indicating positive intervention effects. Changes in TPB construct scores will be evaluated by comparing baseline Attitude, Subjective Norm, and Perceived Behavioral Control scores with post-intervention measurements, with increases indicating improved psychological readiness for behavior change. Additionally, participants will complete self-reported dietary behavior change questionnaires to capture actual changes in eating patterns, meal preparation frequency, and healthy food consumption.

*Engagement Metrics:* System engagement will be quantified through multiple indicators of user interaction patterns. Session duration and conversation length will be tracked to assess sustained user interest, with longer, more substantive conversations indicating higher engagement. Dropout rates will be calculated as the percentage of users who discontinue use before completing the intended intervention period, with lower rates suggesting better user retention. Return rates for subsequent sessions will measure the proportion of users who initiate follow-up conversations after their initial interaction, indicating the system's ability to maintain user interest over time.

*Usability Assessment:* User experience will be evaluated using the standardized System Usability Scale (SUS), a 10-item questionnaire that produces scores ranging from 0-100, with scores above 68 considered above average. The SUS assessment will be supplemented with qualitative feedback collection through open-ended questions about user experience, perceived helpfulness, and suggestions for improvement. Therapeutic alliance ratings will measure the degree to which users feel understood, supported, and engaged by the system, using adapted items from established therapeutic relationship scales to assess the quality of the human-AI interaction.

=== Success Criteria

The system will be considered successful based on three complementary evaluation dimensions that collectively demonstrate both technical competence and practical utility. Technical performance success requires achieving acceptable accuracy thresholds across all computational components, specifically F1 scores greater than 0.80 for classification tasks including theme detection and TTM stage classification, and Mean Absolute Error less than 0.5 on the 7-point Likert scale for TPB construct scoring tasks. These thresholds ensure that the system's psychological inferences are sufficiently accurate to guide meaningful interventions.

Expert validation success centers on nutritional safety and appropriateness, with registered nutritionists rating at least 85% of system responses as nutritionally safe (score ≥ 3 on a 5-point scale). This criterion ensures that the system provides responsible health guidance that does not contradict established nutritional principles or pose risks to users. The expert review process also validates that recipe recommendations are culturally appropriate and feasible within the Filipino context.

User acceptance success is demonstrated through positive user response metrics, including System Usability Scale scores above 68 (indicating above-average usability) and above-average ratings for perceived helpfulness and therapeutic alliance. These criteria ensure that the system not only functions correctly but also provides a satisfactory user experience that encourages sustained engagement and behavior change efforts. The combination of technical accuracy, expert validation, and user acceptance provides a comprehensive framework for evaluating the system's readiness for broader implementation.


#v(3em)
== Ethical Considerations

=== Informed Consent

All participants will provide informed consent before participating in any phase of the study. The consent process will clearly explain the study's purpose, procedures, expected time commitment, potential risks and benefits, and the voluntary nature of participation. Participants will be informed that they may withdraw from the study at any time without penalty or loss of benefits. For the preliminary survey phase, consent will be obtained through a digital consent form presented before survey access. For the pilot testing and evaluation phases, participants will complete a separate informed consent process that specifically addresses the conversational AI interaction, data collection during conversations, and the experimental nature of the system.

The consent documentation will be written in clear, accessible language appropriate for the target population (Filipino young adults aged 18-40) and will be available in both English and Filipino to ensure comprehension. Participants will have the opportunity to ask questions before providing consent, and contact information for the research team will be provided for any subsequent inquiries or concerns.

=== Risk Classification and Mitigation

This study is classified as minimal risk research. The primary activities involve completing surveys about dietary habits and attitudes, and interacting with a conversational AI system that provides nutritional guidance and recipe recommendations. These activities pose no greater risk than those encountered in daily life when discussing food choices or using nutrition apps.

Potential risks are limited and manageable. Psychological discomfort may arise if participants feel judged about their eating habits or perceive social pressure to change behaviors. To mitigate this, the conversational system is designed with a non-judgmental, supportive tone, and participants are reminded that their responses are confidential and that participation is voluntary. Nutritional safety risks are addressed through expert validation, where registered nutritionists review system outputs to ensure recommendations are safe and appropriate. The system includes safeguards to avoid providing medical advice or recommendations for individuals with specific health conditions, instead directing such users to consult healthcare professionals.

Privacy risks related to disclosure of personal dietary information are mitigated through robust data protection measures described below. Participants will be informed that their conversation data will be stored securely and used only for research purposes.

=== Data Privacy and Security

All participant data will be handled in accordance with data protection principles and institutional research ethics guidelines. Personal identifiers will be separated from research data through a coding system, with the linking key stored separately in a password-protected file accessible only to authorized research personnel. Participant names and contact information will not be associated with survey responses or conversation logs in the research database.

Conversational data collected during pilot testing will be stored on secure, password-protected servers with encrypted transmission protocols. Access to identifiable data will be restricted to the research team members who require it for data analysis and quality assurance purposes. All research personnel will complete training on data protection and confidentiality requirements before accessing participant data.

Data retention will follow institutional guidelines, with identifiable data destroyed after the completion of the study and publication of results, while de-identified data may be retained for potential secondary analyses or methodological validation. Participants will be informed of these data retention practices during the consent process.

=== Confidentiality and Reporting

Individual participant data will be kept confidential and will not be disclosed to third parties. Research findings will be reported only in aggregate form, ensuring that individual participants cannot be identified in publications, presentations, or other dissemination activities. Direct quotes from participant conversations may be used in research outputs only if they are sufficiently de-identified and do not contain information that could reasonably identify the participant.

If during the course of the study, a participant discloses information suggesting imminent risk of harm to themselves or others, the research team will follow institutional protocols for managing such disclosures, which may include breaking confidentiality to ensure participant safety. Participants will be informed of these limits to confidentiality during the consent process.

=== Expert Review and Validation

This research protocol will undergo expert review by a registered nutritionist-dietitian before deployment to ensure that all nutritional guidance, recipe recommendations, and dietary advice provided by the system are safe, evidence-based, and appropriate for the target population. The nutritionist will review the system's intervention logic, behavior change technique mappings, and sample outputs to verify alignment with established nutritional principles and dietary guidelines.

During the pilot testing phase, the nutritionist will conduct ongoing review of system responses, rating a random sample of at least 100 interactions for nutritional safety and appropriateness. Any recommendations flagged as potentially unsafe or inappropriate will trigger immediate system refinement. The nutritionist will also validate that the system appropriately handles edge cases, such as users who may have underlying health conditions, by ensuring the system directs such individuals to consult healthcare professionals rather than providing specific medical advice.

=== Algorithmic Risks and Mitigation Strategies

Several algorithmic and system-level risks require consideration. Algorithmic bias may emerge if the NLP models trained on survey data systematically misclassify TPB constructs or TTM stages for certain demographic subgroups. For example, users from lower socioeconomic backgrounds may express barriers differently than those from higher-income groups, potentially leading to misidentification of their primary psychological determinants. To mitigate this, model performance will be evaluated across demographic subgroups during validation, and the training dataset will be reviewed for representation balance. The fallback mechanisms (keyword dictionaries and rule-based heuristics) provide additional safeguards when model confidence is low.

Dependency risk exists if users become overly reliant on the system instead of developing autonomous self-regulation skills or seeking professional help when needed. The system is designed to promote gradual autonomy by providing educational content alongside recommendations and encouraging users to reflect on their own progress. Clear disclaimers will inform users that AliMind is a research prototype for behavior change support, not a substitute for professional medical or nutritional counseling. Users reporting symptoms of eating disorders or medical conditions will be directed to appropriate healthcare resources.

System failure modes must be anticipated and managed. If the TPB inference models produce inaccurate construct scores, the system may target the wrong barrier, leading to ineffective interventions. If TTM stage classification is incorrect, users may receive interventions mismatched to their readiness level, potentially causing frustration or disengagement. To address these risks, the system implements confidence thresholds that trigger fallback mechanisms when uncertainty is high. Additionally, the conversational interface allows users to provide corrective feedback, and the system includes periodic check-ins to validate that interventions feel relevant and helpful. During pilot testing, the research team will monitor conversation logs for signs of systematic misclassification and refine models accordingly.

Safety monitoring at scale presents challenges beyond the pilot phase. While 100 reviewed interactions provide initial validation, production deployment would require ongoing quality assurance mechanisms. Future implementations should incorporate automated safety checks, such as flagging responses that contain medical advice or extreme dietary restrictions, and periodic human review of flagged interactions. User feedback mechanisms should enable reporting of inappropriate or unhelpful responses, with a clear process for investigating and addressing such reports.
