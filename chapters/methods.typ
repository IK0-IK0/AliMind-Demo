#import "@preview/fletcher:0.5.8" as fletcher: diagram, edge, node

#v(20em)
= Methods and Materials

== Research Design

The research will progress through structured development cycles as shown in Figure 2, following a Requirements-Design-Development-Testing-Review paradigm. Each iteration will build upon the previous one, progressively refining the system from initial prototyping through final deployment.

#figure(
  image("../figures/iterative.png"),
  caption: [Iterative Development Cycle Flow],
) <fig:iterations>

#v(10pt)

=== Overview of Iterations

*Iteration 1: Synthetic Data and Pipeline Prototyping.* The first cycle will focus on establishing the core system architecture and conversation flow before collecting real user data. Using synthetic dialogue datasets (MHC-Coach, openCHA demo scripts) and simulated user interactions, this cycle will test the end-to-end functionality of the seven-step pipeline.

*Iteration 2: Real Data Integration and Model Fine-Tuning.* The second cycle will incorporate the preliminary survey data collected from the target population, with open-ended responses paired with TPB scores and TTM stage labels. This iteration will focus on training and validating the core inference models.

*Iteration 3: Refinement and Enhancement.* The third cycle will focus on polishing the system based on insights from pilot testing, addressing edge cases, and preparing for deployment.

== Theoretical Framework

=== The Theory of Planned Behavior (TPB)

Developed by Icek Ajzen @ajzen1991theory, the Theory of Planned Behavior posits that the immediate antecedent of any behavior is the individual's *intention* to perform that behavior. Intention represents the motivational factors that influence how hard people are willing to try and how much effort they plan to exert @ajzen1991theory. According to the TPB, intention is itself a function of three independent constructs:

- *Attitude Toward the Behavior (A):* This refers to the degree to which a person has a favorable or unfavorable evaluation or appraisal of the behavior in question. It encompasses both *instrumental* aspects (e.g., beneficial/harmful, wise/foolish) and *experiential* aspects (e.g., pleasant/unpleasant, enjoyable/unenjoyable) of performing the behavior @ajzen2020changing. A person who believes that eating healthy will lead to positive outcomes (e.g., more energy, better health) will hold a more positive attitude.

- *Subjective Norm (SN):* This is the perceived social pressure to perform or not perform the behavior @ajzen1991theory. It is determined by the individual's beliefs about whether significant others (e.g., family, friends, colleagues) think they should engage in the behavior, weighted by their motivation to comply with those referents @armitage2001EfficacyOT. For instance, a young adult might feel pressure from peers to eat out at fast-food restaurants, creating a subjective norm that discourages healthy eating.

- *Perceived Behavioral Control (PBC):* This refers to the individual's perception of the ease or difficulty of performing the behavior @ajzen1991theory. It reflects both *internal* control factors (e.g., skills, knowledge, willpower) and *external* control factors (e.g., time, opportunity, cooperation of others). PBC is a unique addition to the model as it has both a motivational influence on intention and a direct link to behavior, as it can serve as a partial substitute for actual control @ajzen2020changing.

Meta-analytic evidence confirms that these constructs reliably predict both intention and behavior. Armitage and Conner's comprehensive review of 185 independent studies found that the TPB accounted for 39% of the variance in intention and 27% of the variance in behavior across a wide range of health-related actions @armitage2001EfficacyOT.

In this study, TPB will be used to diagnose the specific psychological barriers holding a user back. By analyzing a user's natural language, the system will infer their scores on Attitude, Subjective Norm, and PBC. The weakest of these determinants will become the primary target for intervention.

#figure(
  image("../figures/tpb.png"),
  caption: [Theory of Planned Behavior],
)

#table(
  columns: (auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, left),

  [*Construct*], [*Definition*], [*Measurement Approach*], [*Example Themes*],

  [Attitude],
  [Evaluation of behavior (beneficial/harmful, pleasant/unpleasant)],
  [Theme detection + scoring from expressions of evaluation],
  ["healthy food tastes bad", "cooking is rewarding", "eating well makes me feel good"],

  [Subjective Norm],
  [Perceived social pressure from significant others],
  [Social reference extraction and influence assessment],
  ["family expects fast food", "friends support healthy eating", "colleagues eat out daily"],

  [Perceived Behavioral Control],
  [Perception of ease/difficulty of performing behavior],
  [Barrier/facilitator identification and confidence assessment],
  ["no time to cook", "confident in kitchen skills", "grocery stores too far"],
)

=== The Transtheoretical Model (TTM)

Developed by Prochaska and DiClemente @prochaska1997transtheoretical, the Transtheoretical Model conceptualizes behavior change not as a discrete event, but as a process that unfolds over time through a series of stages. The model's core premise is that individuals at different stages of change require different types of interventions @prochaska2005transtheoretical. The five stages are:

1. *Pre-contemplation:* The individual does not intend to take action in the foreseeable future (usually measured as the next six months). They may be unaware that their behavior is problematic or may be demoralized from past failed attempts.

2. *Contemplation:* The individual intends to change within the next six months. They are aware of the pros and cons of changing, leading to a state of ambivalence and "weighing" of the costs and benefits.

3. *Preparation:* The individual intends to take action in the immediate future (usually within the next month). They may have a plan of action, such as joining a support group, buying a cookbook, or speaking to a counselor.

4. *Action:* The individual has made specific, overt modifications to their lifestyle within the past six months. This is a busy period of active change and is the most vulnerable to relapse.

5. *Maintenance:* The individual is working to prevent relapse and consolidate the gains attained during action. They are less tempted to regress and increasingly more confident they can sustain the change.

A study confirms that stage-matched interventions improve dietary outcomes across diverse populations @vanduyn1998.

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

- *Early Stages (Pre-contemplation & Contemplation):* The interaction is *TTM-led*. The primary goal is stage progression, not directly attacking a TPB barrier. The system uses TPB scores contextually to understand *why* the user is stuck. For example, if a user is in Contemplation, the system will use the TPB profile to inform a "decisional balance" exercise (a TTM process) @kleis2021ttm. If the user's main barrier is a negative Attitude ("Healthy food is bland"), the system can explore the "pros" of taste versus the "cons" of health, but the goal is still to move them toward Preparation, not to convince them to like broccoli today.

- *Middle Stages (Preparation & Action):* The interaction becomes *TPB-led*. The user is ready to act, so the system uses the TPB profile to identify the "weakest link" (e.g., low PBC due to poor cooking skills). It then selects a specific Behavior Change Technique (BCT), guided by the TTM stage, to target that barrier @michie2013behavior. For instance, for a user in the Action stage with low PBC, the system might use BCT 4.1 ("Instruction on how to perform") and recommend a simple, low-skill recipe.

- *Late Stage (Maintenance):* The interaction returns to being *TTM-led*, with a focus on relapse prevention. The TPB scores are monitored longitudinally as an early warning system @bassett-gunterOhBabyMotivation2013. A sudden drop in PBC scores, for example, could signal an increased risk of relapse, prompting the system to intervene with coping strategies before the user backslides.

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

The proposed system will implement a modular pipeline architecture consisting of seven sequential processing stages (Figure 3). Each stage will be designed as an independent microservice that communicates via JSON payloads, allowing for modular updates and independent scaling.

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

1. *Conversational Context Collection:* User chats about eating habits, preferences, barriers, schedule, budget, cooking skills, and food access
2. *TPB Construct Inference:* NLP models output continuous scores for Attitude, Subjective Norms, and Perceived Behavioral Control
3. *Stage Estimation (TTM):* Assign a stage: pre-contemplation, contemplation, preparation, action, or maintenance
4. *Intervention Mode Selection:* Choose a mode based on stage: awareness, ambivalence-resolution, planning, coping, or relapse prevention
5. *TPB-Targeted Intervention Choice:* Select what to target: attitude, subjective norms, or PBC based on weakest determinant
6. *Feasible Dish/Plan Generation:* Recommend recipes filtered by user constraints (time, budget, skills, equipment)
7. *Response Generation:* Generate chat response that follows chosen mode, targets selected TPB construct, and embeds feasible dishes

The pipeline will operate as a closed-loop system where each conversation session feeds into longitudinal tracking. Across multiple sessions, the system will implement Ecological Momentary Assessment (EMA) principles by capturing repeated measurements of TPB constructs and TTM stages in the user's natural environment, enabling detection of psychological changes over time and adaptation of intervention strategies based on progress patterns. Detailed EMA implementation is described in Iteration 2 Design.


== Data Collection and Preparation

=== Target Population
The study will focus on Filipino young adults and adults aged 18–40 in Davao City. This age range captures the transition from early adulthood through established adulthood, a period where dietary habits are both malleable and consequential for long-term health outcomes. The conversational system will operate in English, consistent with its role as the medium of instruction in Philippine higher education and its widespread use in professional and digital contexts within the target demographic @commission2012english. This also ensures compatibility with available NLP models and training corpora.
=== Preliminary Survey

The preliminary phase will consist of a single hybrid quali-quantitative survey designed to capture both natural language expressions and corresponding quantitative measures for all psychological constructs.

*Survey Structure:* In collaboration with a registered nutritionist, the survey instrument will combine open-ended prompts with immediately paired quantitative measures to ensure clinical relevance and capture salient beliefs specific to the target population. The hybrid survey will include:

*TPB Construct Assessment:*
For each of the three TPB constructs, participants will provide:
- Open-ended responses to natural prompts eliciting attitudes, social pressures, and perceived control (e.g., "How do you feel about eating healthier? What are your thoughts on this?")
- Paired Likert-scale items measuring the same construct (e.g., "Rate your attitude toward healthy eating: 1=very negative to 7=very positive")

*TTM Stage Classification:*
- Open-ended questions about current eating habits and change intentions (e.g., "Where are you right now with healthy eating? What are your plans, if any?")
- Standard TTM staging questions using both Likert scales and yes/no format to classify participants' readiness for dietary change

*Additional Measures:*
- Behavioral Intention measured through both open-ended expression and 7-point Likert scales
- Demographic and socioeconomic contextual variables
- Probing questions to elicit deeper explanations of specific barriers and motivations

*Data Analysis:* Responses will be analyzed using thematic analysis to identify recurring patterns and barriers, with identified themes systematically mapped to the three core TPB constructs. This creates the theme taxonomy that the NLP inference models will use. The direct pairing of open-ended responses with their corresponding quantitative scores from the same survey session forms the primary labeled training corpus for the psychological inference models, ensuring temporal alignment and reducing noise in the training data.

=== Datasets and Sources

*Primary Data Corpus:* The primary training data will consist of open-ended explanations from the preliminary survey paired with their corresponding TPB Likert-scale scores and TTM stage classifications. This corpus will provide the essential ground truth for training the psychological inference models, ensuring that the system can accurately map natural language expressions to theoretical constructs. Additionally, annotated conversational logs collected during pilot testing phases in Iterations 2-3 will supplement the primary corpus with real-world interaction patterns and user feedback.

*Synthetic Data for Iteration 1:* During the initial prototyping phase, synthetic dialogue datasets will serve as the foundation for system development and testing. The openCHA framework demo scripts provide structured examples of health coaching conversations @zhang2024opencha, while MHC-Coach synthetic health coaching dialogues offer diverse conversational patterns and intervention strategies @mantena2025mhccoach. These synthetic datasets will enable comprehensive testing of the seven-step pipeline before real user data becomes available.

*Recipe Database:* The system will utilize the RecipeNLG dataset containing 2.2 million recipes with structured metadata @bien2020recipenlg as the primary source for recipe recommendations. This comprehensive database will be supplemented with Filipino recipe datasets to ensure cultural appropriateness and relevance for the target population. All recipes will be indexed with metadata including preparation time, difficulty level, required equipment, and estimated cost to enable effective constraint-based filtering and recommendation.

=== Programming and Development Environment

The system will be developed using Python 3.9+ as the primary programming language. For computationally intensive tasks such as model training and fine-tuning, Google Colab (Premium/Pro) will be utilized to leverage cloud-based GPU resources. All code, documentation, and project assets will be managed using Git for version control.

== Design Procedure

=== Iteration 1:

The first iteration will focus on establishing the core system architecture and conversation flow before collecting real user data. This iteration will begin with a comprehensive requirements analysis that grounds all subsequent design decisions.

#enum(numbering: "A)", spacing: 1.5em)[
  *Requirements Gathering*

  The requirements gathering phase will establish the foundation for the system's annotation tool and evaluation metric by identifying key components necessary for implementation. Foundational requirements will be identified for the system based on the TPB and TTM theoretical framework, including functional requirements for each of the seven pipeline steps, requirements for conversation flow and natural language elicitation of psychological constructs, dialogue state tracking needs (what information must be captured and maintained), technical requirements for pipeline connectivity and confidence propagation, data requirements for recipe retrieval and recommendation, and ethical and safety requirements for health coaching conversations.

  The collection of data will be split into two sections. First, synthetic dialogue data will be gathered using openCHA framework demo scripts and MHC-Coach synthetic datasets @zhang2024opencha @mantena2025mhccoach. These conversational examples will be suitable for prototyping the seven-step pipeline, simulating user interactions discussing dietary habits, barriers, and goals. The purpose of this collection will be to test the end-to-end pipeline functionality before real user data becomes available. Second, the RecipeNLG dataset containing 2.2 million recipes @bien2020recipenlg will be indexed and pre-processed for retrieval. Recipes will be filtered for cultural appropriateness and tagged with metadata including prep time, difficulty level, equipment required, and estimated cost.

  Following data collection, the next step will be identifying the tools and frameworks required for data processing, model deployment, and system development. The primary tools for development will be identified: LangChain for conversation management and dialogue state tracking, DeBERTa-v3, RoBERTa, and DistilBERT as baseline models for TPB/TTM inference, Llama 3 8B and Mistral 7B for response generation, FAISS for vector search in recipe retrieval, and Unsloth/LoRA for parameter-efficient fine-tuning. These tools will be set up to ensure smooth transition to the next phase.


][*Design*

  The design phase will focus on structuring the system's architecture and evaluation pipeline, following both the theoretical and conceptual framework. The seven-step computational pipeline will be designed as a modular architecture where each stage operates as an independent microservice communicating via JSON payloads. This design will allow for modular updates and independent scaling, following a cascading inference design where the output of each stage serves as input to the next, with confidence scores propagating through the pipeline to inform downstream decision-making.

  *Step 1: Conversational Context Collection.* The pipeline will establish an ongoing, naturalistic dialogue with the user to gather rich contextual information about their dietary habits, challenges, social environment, resources, and goals. Rather than administering structured questionnaires, the system will employ a conversational approach that embeds psychologically informed prompts within an organic exchange. This design choice is grounded in evidence that conversational agents elicit more thoughtful, detailed, and authentic responses than traditional surveys @xiao2020tell @aggarwalArtificialIntelligenceBased2023, while reducing assessment burden and improving user engagement @fueerriegel2025.

  *Question Pool and Prompt Selection:* The conversational prompts will be derived from multiple sources to create a comprehensive question pool organized hierarchically by TPB constructs and sub-themes within each construct. During Iteration 1, the system will make use of dialogues from the MHC-Coach synthetic dataset @mantena2025mhccoach, extracting questions that align with TPB and TTM theoretical frameworks.

  The question pool will be structured with sub-themes under each TPB construct to enable fine-grained coverage tracking. For Subjective Norm, sub-themes will include family pressure, peer influence, workplace eating culture, and social eating situations. For Attitude, sub-themes will encompass taste expectations, health beliefs, cooking enjoyment, and outcome expectations. For Perceived Behavioral Control, sub-themes will cover time scarcity, cost concerns, cooking skill confidence, and food access. Similarly, TTM stage indicators will be organized by stage-specific linguistic and behavioral markers.

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

  As the conversation progresses, when the user mentions something that maps to a sub-theme (e.g., "my family always orders fast food" triggers the family pressure sub-theme under Subjective Norm), it will register as evidence for that sub-theme under its parent TPB construct. Similarly, TTM stage indicators accumulate confidence scores based on linguistic markers detected in user utterances. This accumulates across turns, with each relevant mention adding to the confidence score of that sub-theme or stage indicator, which then contributes to the overall TPB construct scores and TTM stage probability in Steps 2 and 3. Each system-generated prompt will be selected from this pool based on the current dialogue state and theoretical targeting needs, ensuring comprehensive construct coverage while maintaining natural dialogue flow.

  *Text Processing and Cleaning:* User inputs will undergo minimal preprocessing to improve accuracy while preserving natural language authenticity. The system will remove repeating letters (e.g., "sooooo good" becomes "so good"), eliminate excessive whitespace, and standardize basic punctuation without altering the semantic content or emotional expression of the user's message. This cleaning process will enhance the reliability of downstream NLP processing while maintaining the conversational tone and personal voice that are crucial for accurate psychological inference.

  *Dialogue State Tracking and Coverage Monitoring:* Conversation flow will be managed using the LangChain framework, which supports prompt chaining and context retention. A dialogue state tracker will maintain a running tally of which sub-themes have been triggered and how strongly, using this information to decide which construct still needs more exploration. The tracker will maintain a structured representation including: (1) sub-theme confidence scores accumulated across turns, (2) parent TPB construct coverage levels computed from their sub-themes, (3) TTM stage indicator confidence scores, (4) mentioned constraints (time, budget, cooking skills, equipment), and (5) outstanding clarifications needed.

  The tracker will be updated after each user turn using pattern matching and keyword detection to identify sub-theme mentions. A construct will be considered sufficiently covered when its sub-themes have accumulated enough confidence above a set threshold (e.g., average sub-theme confidence ≥ 0.6 for that construct). When the dialogue state tracker detects that a construct has not been adequately addressed, it will select follow-up questions from the corresponding sub-theme pool to fill coverage gaps. To handle ambiguous or incomplete responses, the system will employ a confidence-based clarification mechanism, asking targeted follow-up questions when NER extraction yields low confidence or when critical sub-themes remain unexplored.

  Input and output specifications for Step 1 include: Input as raw user utterances in natural language captured via a chat interface; Output as a structured conversation object containing an array of turns (each with speaker, timestamp, and raw text), extracted entities using spaCy with custom training, a dialogue state record indicating coverage of TPB constructs and confidence levels, and session metadata (user ID, session start/end time, device type). Tools employed will include LangChain for dialogue management, Llama 3 8B or Mistral 7B for response generation, spaCy for NER, and bert-fda-nutrition-ner for food entity extraction.

  *Step 2: TPB Construct Inference.* This step will transform the raw conversational data into quantitative scores for the three core TPB constructs. The system will first detect the presence and intensity of themes from an empirically derived taxonomy (e.g., "time scarcity," "cost concerns," "family pressure"). A fine-tuned DeBERTa-v3 model will perform multi-label classification on the user's recent conversation window (typically the last 3–5 turns), outputting confidence scores for each theme.

  Each theme in the taxonomy will be mapped to one or more TPB constructs based on the theoretical framework. This mapping matrix will define the contribution of theme $i$ to construct $c$ as a weight $m_{"ic"}$ in [0,1]. For each TPB construct, a continuous score will be computed using weighted aggregation:

  #v(5pt)
  #align(center)[
    $
      "Score"_"construct" = frac(sum_{i=1}^{n} ( w_i times m_{"ic"} times "confidence"_i times "intensity"_i ), sum_{i=1}^{n} ( w_i times m_{"ic"} times "max_intensity" ))
    $ <eq:tpb-score>
  ]
  #v(5pt)

  where $w_i$ represents the population-specific regression weight for theme $i$, $m_{"ic"}$ is the mapping weight of theme $i$ to construct $c$, $"confidence"_i$ is the classifier's confidence score, and $"intensity"_i$ is the normalized frequency of theme-related language.

  To improve robustness, the system will test two competing approaches for TPB construct inference: fine-tuned DeBERTa-v3 for multi-label theme classification followed by theme-to-construct mapping, and regression head on RoBERTa for direct construct scoring. Both approaches will be evaluated during Iteration 2 to determine which performs better on the target population data, with the superior model selected for final implementation. A keyword dictionary will serve as fallback when model confidence is low (< 0.6).

  *Step 3: Stage Estimation (TTM).* This step will determine the user's current TTM stage using a two-tier classification approach. A lightweight DistilBERT or BERT-small model will be fine-tuned on TTM-annotated corpus, taking the user's recent conversation window as input and outputting a probability distribution across the five stages. When the model's confidence falls below threshold ($P_"max" < 0.7$), the system will fall back on rule-based pattern matching using linguistic markers (e.g., "should" statements for Contemplation, future tense with specific timing for Preparation, past tense describing recent changes for Action).

  Confidence thresholds will guide system behavior: High confidence ($P_"max" >= 0.7$) accepts classification and proceeds; Medium confidence ($0.5 <= P_"max" < 0.7$) accepts but flags for monitoring; Low confidence ($P_"max" < 0.5$) triggers a clarification question. The system will track stage classifications across sessions to detect forward movement, backsliding, or stalling.

  *Step 4: Intervention Mode Selection.* This step will translate the TTM stage into intervention mode using a deterministic stage-to-mode lookup table: Pre-contemplation → Awareness, Contemplation → Ambivalence-resolution, Preparation → Planning, Action → Coping, Maintenance → Relapse-prevention. Each mode encompasses a family of dialogue strategies and interaction patterns based on TTM clinical guidelines @bridle2009stagematched @kleis2021ttm.

  *Behavior Change Techniques (BCTs) Framework:* Before proceeding to Step 5, it is essential to understand the intervention toolkit employed by the system. Behavior Change Techniques (BCTs) are specific, observable, and replicable components of behavioral interventions designed to alter psychological determinants of behavior @michie2013behavior. The system will utilize the BCT Taxonomy version 1 (BCTTv1), which provides a standardized classification of 93 distinct techniques organized into 16 hierarchical clusters @michie2013behavior. Each BCT targets specific psychological mechanisms. For example, "Action Planning" (BCT 1.4) enhances Perceived Behavioral Control, while "Information about Health Consequences" (BCT 5.1) strengthens attitudes. The systematic application of BCTs will enable the system to deliver evidence-based intervention strategies rather than generic advice.

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

  *Step 5: TPB-Targeted Intervention Choice.* This step will identify the weakest TPB determinant and select an appropriate Behavior Change Technique (BCT) to target that specific psychological barrier. The process will operate through a systematic decision-making framework that combines TPB diagnostic information with TTM stage-appropriate intervention strategies.

  The system will first identify the weakest determinant by comparing the three TPB construct scores computed in Step 2:

  #v(5pt)
  #align(center)[
    $ "WeakestDeterminant" = "argmin"_{c in {A, "SN", "PBC"}} "Score"_c $ <eq:weakest-determinant>
  ]
  #v(5pt)

  This mathematical approach will ensure that intervention efforts target the most significant psychological barrier rather than applying generic advice. For example, a user with low Perceived Behavioral Control (PBC = 2.1) but adequate Attitude (A = 5.2) and Subjective Norm (SN = 4.8) would have PBC identified as their primary intervention target.

  The system will then consult a predefined intervention library that maps (TTM Stage, Weakest TPB Determinant) pairs to specific Behavior Change Techniques from the BCTTv1 taxonomy @michie2013behavior. This library contains evidence-based BCT selections derived from systematic reviews of digital health interventions. For instance, a user in the Preparation stage with weak PBC might receive "Action Planning" (BCT 1.4) combined with "Graded Tasks" (BCT 8.7), while someone in Contemplation with weak Attitude might receive "Information about Health Consequences" (BCT 5.1) paired with "Pros and Cons" (BCT 9.2).

  The balance of TPB versus TTM influence will vary strategically by stage to optimize intervention effectiveness. In early stages (Pre-contemplation and Contemplation), the approach will be TTM-led with TPB providing contextual understanding. The primary goal will be stage progression rather than directly attacking barriers. In middle stages (Preparation and Action), the approach will become TPB-led with TTM support, directly targeting the weakest determinant since users are ready for specific skill-building. In the late stage (Maintenance), the approach will return to TTM-led with TPB monitoring, focusing on relapse prevention while using TPB scores as early warning indicators of declining motivation.

  *Step 6: Feasible Dish/Plan Generation.* This step will translate the intervention focus into concrete recipe recommendations respecting user constraints. The system will implement a hybrid search architecture with two sequential stages: semantic retrieval followed by constraint-based filtering and re-ranking.

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

  The first stage will employ semantic search using FAISS (Facebook AI Similarity Search) to efficiently handle the massive RecipeNLG database containing 2.2 million recipes. User context including mentioned food preferences, cooking styles, cultural background, and dietary goals will be encoded into a query vector using the all-MiniLM-L6-v2 embedding model. FAISS will then perform approximate nearest neighbor search using an Inverted File Index (IVF) structure to rapidly identify the top 100 recipes that are semantically most similar to the user's context. This approach will enable real-time performance by avoiding computationally expensive similarity calculations across the entire database, instead leveraging pre-built index structures that compress and organize recipe embeddings for efficient retrieval.

  The second stage will apply constraint filtering and multi-criteria re-ranking to the 100 semantically relevant recipes. Constraint filtering will remove recipes that exceed the user's stated limitations regarding preparation time, cooking difficulty, required equipment, and budget constraints. The remaining recipes will then be scored using a weighted multi-criteria formula that balances health optimization with practical feasibility:

  #v(5pt)
  #align(center)[
    $
      "FinalScore" = 0.4 dot.op "HealthScore" + 0.3 dot.op (1 - "Difficulty")\ + 0.2 dot.op "PreferenceMatch" + 0.1 dot.op "NoveltyBonus"
    $ <eq:recipe-score>
  ]
  #v(5pt)

  This two-stage approach will ensure that recipe recommendations are both contextually relevant to the user's expressed preferences and practically achievable within their stated constraints, while prioritizing nutritional value and maintaining variety in suggestions.

  *Step 7: Response Generation.* The final step will synthesize all previous analyses into a coherent, natural language response that closes the loop by translating theoretical insights into practical, personalized guidance. This step represents the culmination of the entire pipeline, where stage-appropriate intervention modes, targeted TPB constructs with specific BCTs, and feasible recipe recommendations will be woven together into a supportive message that advances the user's change journey.

  *Input Specifications:* Step 7 will receive comprehensive information from all previous steps: conversation history from Step 1 (for context and coherence), intervention mode and stage context from Step 4, targeted TPB construct and selected BCT from Step 5, ranked recipe recommendations with feasibility scores from Step 6, and current TPB/TTM confidence scores for quality assurance. This rich input will enable the generation of responses that are simultaneously theoretically grounded, practically relevant, and conversationally natural.

  *Response Generation Architecture:* The system will employ Llama 3 8B or Mistral 7B as the core language model, selected for their balance of performance and computational feasibility. During Iteration 1, base versions of these models will be tested with synthetic datasets to establish baseline performance and refine prompt templates. The models will utilize dynamic prompt templates managed through Jinja2 or LangChain, which store and render mode-specific system prompts that ensure theoretical fidelity while maintaining conversational naturalness.

  *Prompt Template Structure:* Each response will be generated using a structured template that incorporates the intervention mode (awareness, ambivalence-resolution, planning, coping, or relapse-prevention), the targeted TPB construct with appropriate BCT framing, embedded recipe recommendations with motivational context, and empathetic acknowledgment of the user's current situation and progress. The templates will be designed to feel conversational rather than prescriptive, using language that matches the user's stage of readiness and psychological barriers.

  *Quality Assurance and Fallbacks:* Before delivery, each generated response will undergo validation checks including theoretical consistency (does the response align with the selected intervention mode and BCT?), practical feasibility (are the suggested recipes appropriate for the user's constraints?), conversational coherence (does the response flow naturally from the conversation history?), and safety screening (does the response avoid harmful or inappropriate nutritional advice?). If any check fails, the system will fall back to a templated response that acknowledges the limitation and redirects constructively.


][*Development*

  During the development phase, the seven-step pipeline will be implemented using synthetic datasets. The basic conversation management framework will be implemented using LangChain, providing the foundation for dialogue flow and state tracking. Prototype TPB inference will be developed using off-the-shelf models in zero-shot mode, without fine-tuning at this stage, to establish baseline functionality. The RAG pipeline will be built with FAISS vector search on the RecipeNLG dataset, enabling semantic recipe retrieval based on user context and constraints. Initial versions of all seven pipeline steps will be created with mock confidence propagation to test the flow of information through the system. The dialogue state tracker will be implemented with basic clarification logic to handle ambiguous or incomplete user responses.

][*Testing*

  The testing phase will involve conducting technical validation of component functionality to ensure the system operates as designed. End-to-end connectivity between all seven steps will be verified to confirm that data flows correctly through the pipeline without breaking. Conversation flow will be tested with simulated user interactions using the synthetic dialogues, evaluating whether the system can maintain coherent multi-turn conversations. Response latency will be measured for different LLM backbones, specifically comparing Llama 3 8B and Mistral 7B, to identify performance bottlenecks and inform model selection. The system will validate that confidence scores propagate correctly through the pipeline, ensuring that low-confidence outputs in early steps trigger appropriate clarification mechanisms in later steps. Bottlenecks and failure points in the architecture will be identified and documented for refinement.

  Success criteria for Iteration 1 will be assessed through several key questions. Does the pipeline complete all seven steps without breaking? Can the system maintain coherent conversations over multiple turns? Are theoretical constructs being elicited naturally in the conversation? What are the baseline performance metrics for future comparison? These questions will guide the evaluation and inform the refinement phase.

][*Review*

  The final phase of the first iteration will consist of analyzing the pipeline's overall performance and identifying areas for improvement. Prompt templates will be updated based on conversation flow observations, refining the naturalness and theoretical alignment of system utterances. Dialogue state tracker logic will be refined to better capture user inputs and detect when constructs have been sufficiently discussed. Clarification strategies will be adjusted based on simulated user responses, improving the system's ability to handle ambiguous inputs. A prioritized list of improvements for Iteration 2 will be created, focusing on areas where the prototype shows limitations or where real user data would enable significant enhancements. Baseline performance metrics will be documented, including latency measurements, conversation coherence scores, and construct coverage rates, providing a foundation for measuring progress in subsequent iterations.

  The outputs of Iteration 1 will include a functional pipeline prototype with documented architecture, conversation flow specifications detailing how each step operates and connects to others, initial prompt templates for all intervention modes, baseline performance metrics establishing the starting point for improvement, and a comprehensive requirements document that guides all subsequent iterations.
]

=== Iteration 2:

The second iteration will incorporate the preliminary survey data collected from the target population. Building on the requirements established in Iteration 1, this iteration will focus on training and validating the core inference models.

#enum(numbering: "A)", spacing: 1.5em)[
  *Design*

  Building on the foundation of Iteration 1, the design phase in Iteration 2 will focus on integrating real user data and enhancing the system's inference capabilities through model fine-tuning. The preliminary survey data from both Stage 1 (qualitative) and Stage 2 (quantitative) will become available at this point, including open-ended responses paired with TPB Likert-scale scores, TTM stage classifications from standard staging questions, and demographic and contextual metadata.

  *Theme Taxonomy Development.* Through thematic analysis of Stage 1 qualitative responses, a comprehensive theme taxonomy will be established. Responses will be analyzed using thematic analysis to identify recurring patterns and barriers. Each theme (such as "time scarcity," "cost concerns," "family pressure," "cooking skills deficit," "taste expectations," "social eating pressures") will be systematically mapped to TPB constructs with association weights. For example, "time scarcity" maps primarily to PBC with weight $m_{"ic"} = 0.9$, but may also influence Attitude with $m_{"ic"} = 0.3$. The mapping will be established through expert review by behavioral scientists and validated during the preliminary phase.

  *Model Architecture Refinement for Step 2 (TPB Construct Inference).* Two competing approaches will be designed for TPB construct inference to determine the optimal method for the target population. DeBERTa-v3 (base or large) will serve as the primary approach for multi-label theme classification, fine-tuned on the manually annotated corpus from the preliminary survey using binary cross-entropy loss with class weights to address imbalance in theme frequencies. The dataset will be split 80/10/10 for training, validation, and testing, with an acceptance threshold of F1 > 0.80 required for deployment. RoBERTa-base with regression head will serve as the alternative approach, bypassing explicit theme detection to directly predict continuous scores for Attitude, Subjective Norm, and Perceived Behavioral Control from text. This provides a direct pathway that captures holistic patterns without intermediate theme classification. A keyword dictionary derived from thematic analysis will serve as fallback when neural model confidence is low (< 0.6).

  #table(
    columns: (auto, auto, auto, auto),
    stroke: 0.5pt,
    align: (left, left, left, left),

    [*Component*], [*DeBERTa-v3 Approach*], [*RoBERTa Approach*], [*Selection Criteria*],

    [Input], [Conversation window (3-5 turns)], [Conversation window (3-5 turns)], [Same for both approaches],

    [Processing],
    [Multi-label theme classification → TPB mapping],
    [Direct regression to TPB scores],
    [Performance comparison on validation set],

    [Output],
    [Theme confidence scores → construct scores],
    [Direct TPB construct scores],
    [Accuracy (MAE < 0.5), correlation with ground truth],

    [Advantages],
    [Interpretable, theory-aligned, explainable],
    [Direct, potentially more accurate, simpler],
    [Empirical evaluation: F1 > 0.80, MAE < 0.5],

    [Fallback],
    [Keyword dictionary when confidence < 0.6],
    [Keyword dictionary when confidence < 0.6],
    [Same fallback mechanism for both],
  )

  The scoring formula will incorporate population-specific regression weights derived from the Stage 2 quantitative survey. Multiple linear regression analysis will yield standardized coefficients representing the relative contribution of each construct to behavioral intention:

  #v(5pt)
  #align(center)[
    $ "BI" = beta_0 + beta_1 A + beta_2 "SN" + beta_3 "PBC" + epsilon $ <eq:regression>
  ]
  #v(5pt)

  These coefficients ($w_i$) will be used to calibrate the importance of each theme within its associated construct, ensuring that the computational model reflects empirically observed relationships rather than arbitrary assumptions.

  *Model Architecture Refinement for Step 3 (TTM Stage Classification).* The TTM stage classifier will employ a two-tier approach. DistilBERT or BERT-small will be fine-tuned on the TTM-annotated corpus from the preliminary survey, where open-ended responses are paired with stage labels from standard TTM staging questions. The model will take the user's recent conversation window (up to 512 tokens) as input and output a probability distribution across the five stages:

  #v(5pt)
  #align(center)[
    $ P("stage" = s | text) = "softmax"(W dot.op h + b) $ <eq:stage-prob>
  ]
  #v(5pt)

  The predicted stage is the one with highest probability. When confidence falls below threshold, the system will fall back on rule-based pattern matching using linguistic markers identified in the literature @horwath2013transtheoretical @wyker2010behavioral.

  *Confidence Threshold Calibration.* Confidence thresholds will be defined based on validation performance to optimize the trade-off between precision and coverage. For Step 2, when model confidence for any construct falls below 0.6, or when themes are detected but mapping weights are ambiguous, the system will flag the need for clarification. For Step 3, high confidence ($P_"max" >= 0.7$) accepts classification and proceeds; medium confidence ($0.5 <= P_"max" < 0.7$) accepts but flags for monitoring; low confidence ($P_"max" < 0.5$) triggers a clarification question.

  *Validation Protocols.* Rigorous validation protocols will be established with 80/10/10 train/validation/test splits. Model performance will be evaluated using precision, recall, and F1-score for theme classification (target: F1 > 0.80), Mean Absolute Error (MAE), Root Mean Square Error (RMSE), and R² for TPB construct scoring (target: MAE < 0.5), and accuracy, precision, recall, and weighted F1-score for TTM stage classification (target: F1 > 0.80). Pearson correlation $r$ between inferred and survey-measured scores will be tracked as a key quality metric.

  *Longitudinal Tracking Mechanisms.* A critical enhancement in Iteration 2 is the implementation of longitudinal tracking to monitor psychological changes over time, implementing Ecological Momentary Assessment (EMA) principles. EMA involves repeated sampling of participants' current behaviors and experiences in real-time within their natural environments, providing ecologically valid data on dynamic psychological processes @shiffman2007ecological. The system will maintain a rolling window of recent inferences to track changes across sessions, capturing TPB constructs and TTM stages as they naturally evolve during the user's behavior change journey.

  For each session, TPB construct scores will be computed at the turn level and then aggregated using exponential smoothing, a standard technique in EMA data analysis for balancing recent observations with historical trends:

  #v(5pt)
  #align(center)[
    $ "Score"_"smoothed" = 0.4 times "Score"_"current" + 0.6 times "Score"_"previous" $ <eq:longitudinal>
  ]
  #v(5pt)

  where λ = 0.4 gives less weight to recent utterances in order to preserve historical context @bassett-gunterOhBabyMotivation2013. This exponential moving average (EMA) formula will allow the system to detect gradual shifts in psychological constructs while filtering out momentary fluctuations that do not represent true change. TTM stage classifications will be tracked across sessions to detect forward movement, backsliding, or stalling, with session-level stage estimates computed as the mode across turns within each session. Stage transitions will be detected when the current session stage differs from the previous session stage, enabling the system to adapt intervention strategies based on user progress.


  //change something about the smoothing as
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

  The testing phase will conduct both technical validation and initial pilot testing to assess the system's performance with real models and real users. Technical validation will measure precision, recall, and F1-score for theme classification, with a target of F1 > 0.80 to ensure reliable theme detection. Mean Absolute Error (MAE), Root Mean Square Error (RMSE), and R² will be calculated for TPB construct scoring, with a target of MAE < 0.5 to ensure scores closely match ground truth values from the survey. Stage classification accuracy and weighted F1-score will be evaluated with a target of F1 > 0.80, accounting for class imbalance across the five TTM stages. Confidence threshold logic will be tested with validation data to verify that low-confidence cases trigger appropriate clarification mechanisms. Performance will be compared against Iteration 1 baseline metrics to quantify improvements from model fine-tuning.

  Initial pilot testing will be conducted with a small user group of 10-15 participants recruited from the target population (Filipino young adults, ages 18-40, Davao City). Each participant will complete 2-3 conversation sessions with the system, allowing observation of multi-session interactions and stage progression. Conversational logs will be collected for analysis, examining conversation flow, construct coverage, and system responses. Qualitative feedback will be gathered on conversation naturalness and relevance, identifying areas where the system feels robotic or where responses miss the mark.


][*Review*

  The review phase will assess performance against Iteration 2 success criteria through several key questions. Do models meet accuracy thresholds (F1 > 0.80 for classification, MAE < 0.5 for regression)? Are confidence thresholds appropriately calibrated to balance precision and coverage? How do pilot users perceive response relevance and conversation naturalness? Is theoretical alignment maintained after fine-tuning, ensuring that the system still reflects TPB and TTM principles?

  Based on the assessment, refinement actions will be taken. Model performance will be compared between DeBERTa-v3 and RoBERTa approaches, with the superior performing model selected for final implementation. Confidence thresholds will be refined where misclassifications occur, tightening thresholds for constructs with high error rates. Clarification question templates will be updated based on pilot feedback, making them feel more natural and less interrogative. A prioritized list of edge cases and improvements for Iteration 3 will be created, focusing on scenarios where the system struggles or where users express confusion.

  The outputs of Iteration 2 will include trained inference models with documented architectures and hyperparameters, empirically validated theme-to-construct mappings reflecting population-specific relationships, calibrated scoring algorithms with confidence thresholds optimized for the target population, pilot testing reports summarizing user feedback and observed issues, and validation performance metrics demonstrating improvements over Iteration 1.
]

=== Iteration 3:

The third iteration will focus on polishing the system based on insights from pilot testing, addressing edge cases, and preparing for comprehensive evaluation and deployment. A key enhancement in this iteration is the implementation of dynamic weight reestimation, which allows the system to continuously learn from accumulated user data and adapt intervention targeting strategies based on observed effectiveness across the user population.

#enum(numbering: "A)", spacing: 1.5em)[
  *Design*

  Building on the refinements of the first and second iterations, Iteration 3 will focus on final integration and optimization, incorporating all accumulated feedback and emerging insights from pilot testing in Iteration 2. The design phase will address four major areas of enhancement.

  Fallback strategy enhancement will be prioritized to handle edge cases and low-confidence scenarios more gracefully. Fallback strategy designs will be created for low-confidence scenarios using decision trees that systematically determine the best course of action when primary models fail. The BCT-to-recipe adaptation logic will be enhanced based on user feedback from Iteration 2, ensuring that recipe recommendations better align with the selected behavior change technique. Clarification dialogue patterns will be refined for ambiguous user inputs, making the system more adept at handling unclear or contradictory statements. Tone and empathy guidelines will be developed for response generation, ensuring that the system maintains a supportive, non-judgmental voice even when delivering corrective feedback or addressing sensitive topics.

  User experience improvements will be prioritized based on feedback collected during Iteration 2 pilot testing. Conversation flow will be refined to address areas where users report confusion or feel the interaction is unnatural. Response timing and pacing will be adjusted based on observations of when users disengage or seem overwhelmed. The system's ability to handle topic shifts and tangential conversations will be improved, allowing for more natural dialogue that doesn't feel rigidly scripted. Error messages and clarification requests will be rewritten to be more user-friendly and less technical. The overall interaction design will be polished to reduce friction points identified during pilot testing, such as repetitive questions or overly long system responses.

  Longitudinal tracking mechanisms will be enhanced to support sustained behavior change over time. Sophisticated tracking will be implemented to detect TPB and TTM changes across sessions, enabling the system to recognize gradual shifts in user psychology. The enhanced system will maintain comprehensive longitudinal records including conversation history (appended turns for context preservation), smoothed TPB scores using exponential smoothing to track gradual psychological changes, and persistent TTM stage monitoring where stage changes are confirmed only when they persist across 2+ sessions to avoid noise from temporary fluctuations. An early warning system will be developed for relapse risk based on declining PBC scores, allowing the system to proactively intervene when users show signs of losing confidence or control. This longitudinal data will feed back into Step 1 for future sessions, creating a closed-loop design that enables continuous monitoring and adaptation based on user progress over time.

  Dynamic weight reestimation will be implemented to enable the system to continuously learn from accumulated user data and adapt intervention targeting strategies based on observed effectiveness. The system tracks TPB construct scores (Attitude, Subjective Norm, Perceived Behavioral Control) across user sessions using EMA smoothing with λ = 0.4, as established in Iteration 2. Each session produces smoothed scores for all three constructs, and TTM stage transitions (forward movement, stalling, or backsliding) are recorded per session. This rich longitudinal data will enable group-level learning that improves intervention targeting over time.

  *Group-Level Weight Reestimation Mechanism.* Every 50 new sessions accumulated across all users, the system will run a regression analysis where the outcome variable is TTM stage progression encoded as: +1 for forward movement (e.g., Contemplation → Preparation), 0 for stalling (remaining in the same stage), and -1 for backsliding (e.g., Action → Preparation). The predictor variables will be the per-session delta values of each smoothed TPB construct: ΔAttitude, ΔSubjective Norm, and ΔPBC, computed as the difference between the current session's smoothed score and the previous session's smoothed score for each construct.

  The regression model will take the form:

  #v(5pt)
  #align(center)[
    $
      "StageProgression" = beta_0 + beta_1 Delta A + beta_2 Delta "SN" + beta_3 Delta "PBC" + epsilon
    $ <eq:dynamic-weights>
  ]
  #v(5pt)

  The resulting regression coefficients ($beta_1$, $beta_2$, $beta_3$) will represent the empirically observed relationship between changes in each TPB construct and stage progression across the user population. These coefficients will become the updated intervention targeting weights, determining which TPB construct the system prioritizes for intervention in Step 5 of the pipeline. Constructs with larger positive coefficients will be weighted more heavily, as they demonstrate stronger associations with successful behavior change progression.

  *Cold Start and Weight Smoothing.* Before sufficient data exists for reliable estimation (fewer than 50 sessions), the system will use the static preliminary survey regression weights from Iteration 2 as defaults. This ensures that the system can operate effectively from the start while gradually transitioning to data-driven weights as evidence accumulates. When new weights are estimated, they will not replace the old weights abruptly to avoid instability from sampling variance. Instead, exponential moving average (EMA) smoothing will be applied to the weights themselves:

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

  A more conservative update rate of λ = 0.3 will be used here compared to the λ = 0.4 applied to individual TPB score smoothing, reflecting the greater stability required when updating shared population-level weights which prevents big shifts in intervention strategy based on potentially noisy estimates from small batches of data. The smoothed weights will feed into Step 5 of the pipeline (TPB-Targeted Intervention Choice), adjusting how the weakest determinant is identified and prioritized for intervention. This creates a continuous learning loop where the system's intervention targeting strategy evolves based on what actually works for the user population, rather than relying solely on static assumptions from preliminary survey data.

][*Development*

  During the development phase, the enhancements outlined in the design will be systematically implemented across the pipeline. Fallback mechanisms will be created for low-confidence scenarios in Steps 2 and 3, providing alternative pathways when primary models cannot make confident predictions. Rule-based pattern matching for stage classification will be expanded and refined, incorporating additional linguistic markers identified during pilot testing. User experience improvements will be implemented based on Iteration 2 feedback, including refinements to conversation pacing, response length optimization, and more natural handling of topic shifts. Sophisticated clarification strategies will be implemented in Step 1, enabling the system to ask more targeted and natural follow-up questions when user responses are ambiguous. Response generation prompts will be optimized for better tone and empathy in Step 7, fine-tuning the language model to produce more supportive and engaging responses. Session-to-session tracking will be added for TPB construct scores and TTM stage, enabling the system to detect changes over time and adapt its approach accordingly.

][*Testing*

  The testing phase in this final iteration will evaluate the system's overall performance using both automated benchmarks and human assessments, representing the most comprehensive evaluation of the entire development process.

  Technical validation will test fallback mechanisms with edge case scenarios, deliberately providing ambiguous or contradictory inputs to verify that the system handles them gracefully. User experience improvements will be validated through usability testing, ensuring that changes made based on Iteration 2 feedback actually improve the interaction quality. System usability will be measured with the target population using the System Usability Scale (SUS), a standardized questionnaire that assesses perceived ease of use and satisfaction. Engagement metrics will be tracked including session duration, conversation length, and dropout rates, providing quantitative indicators of user engagement and system stickiness.

  Expert evaluation will be done by registered nutritionists and linguistic experts to review system outputs. At least 2 nutritionists will review 100 randomly sampled system responses, rating each response on nutritional safety, appropriateness, and relevance using a 1-5 scale. The target will be set at ≥85% of responses rated as nutritionally safe (score ≥ 3), ensuring that the system does not provide harmful or misleading nutritional advice. Linguistic experts will review conversation naturalness and appropriateness, assessing whether the system's language feels authentic and maintains proper tone throughout interactions.

  Comprehensive user testing will be conducted with a larger sample of 30-50 participants selected from the target population. Each participant will complete 5-7 conversation sessions over 2-3 weeks, allowing observation of sustained engagement and longitudinal behavior change. Pre/post surveys will be administered measuring TPB constructs and TTM stage, enabling quantitative assessment of psychological and behavioral changes. System Usability Scale (SUS) scores will be collected with a target of SUS > 68 (above average), benchmarking the system against established usability standards. Behavioral outcomes will be tracked including stage progression (did users move forward through TTM stages?) and changes in TPB scores (did attitudes, norms, or PBC improve?).

][*Review*

  The final review phase will entail a thorough analysis of the system, capturing all lessons learned and verifying that the tool meets the highest standards of accuracy and usability. Performance assessment will address several critical questions. Does the system meet all technical performance thresholds established in earlier iterations? Are ≥85% of responses rated as nutritionally safe by expert nutritionists? Is the SUS score > 68, indicating above-average usability? Are there demonstrable shifts in TPB scores or TTM stage progression among users, suggesting actual behavior change? Do users report positive experiences and therapeutic alliance, indicating that the system successfully builds rapport and trust?

  Documentation efforts will finalize all aspects of the system for potential deployment. The final system architecture and design decisions will be documented, providing a complete technical specification for future developers or researchers. User guidelines and disclosure statements will be created, ensuring that end-users understand the system's capabilities, limitations, and appropriate use cases. Deployment protocols will be prepared for larger-scale validation, outlining the steps necessary to move from research prototype to production system. Limitations and future improvement opportunities will be documented, honestly acknowledging where the system falls short and where future research could enhance its effectiveness.

  The outputs of Iteration 3 will include a production-ready prototype with refined fallback mechanisms that handle edge cases gracefully, improved user experience based on pilot testing feedback, optimized response generation that maintains empathy and theoretical fidelity, comprehensive evaluation reports covering technical performance, expert validation, and user outcomes, and final system documentation suitable for deployment or further research.

]

== Summary of Iterative Development

#table(
  columns: (auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, left),

  [*Iteration*], [*Primary Focus*], [*Data Source*], [*Key Outputs*],

  [1: Prototyping],
  [System architecture and pipeline connectivity],
  [Synthetic dialogues (openCHA, MHC-Coach)],
  [Functional prototype, baseline metrics, architecture documentation],

  [2: Model Training],
  [Fine-tuning inference models on real data],
  [Preliminary survey (qualitative + quantitative)],
  [Trained models, theme taxonomy, validation metrics, pilot feedback],

  [3: Refinement],
  [Fallbacks, cultural adaptation, comprehensive evaluation],
  [Pilot testing logs, expert reviews, user testing],
  [Production-ready system, evaluation reports, deployment documentation],
)

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
