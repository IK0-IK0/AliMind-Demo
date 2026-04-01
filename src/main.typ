$$#import "@preview/fletcher:0.5.8" as fletcher: diagram, edge, node
#import fletcher.shapes: diamond

#set par(justify: true)
#show align.where(alignment: center): set par(justify: false)

//progress report, jsut need to split da conceptual and theoretical and delve onto the design. and also double check analysis pls, we need to have like 5 sessions with my groupmates for this as discussion cuz dis is allat

#set page(numbering: "1")

#align(center + horizon)[
  = *From Behavioral Inference to Stage-Specific Nutrition Support: A TPB- and TTM- Informed System*

  #v(1em)

  Regalado, Mika | Monterolla, John Lloyd | Cuadra, Francis Neil
]

= Introduction

#v(10pt)

Maintaining healthy eating habits remains a challenge worldwide. The World Health Organization reports that unhealthy diets are a major risk factor for the global burden of disease, contributing to millions of deaths annually from non-communicable diseases (NCDs) such as cardiovascular conditions and diabetes @who2020healthy. Despite widespread awareness of dietary guidelines, a significant gap persists between knowledge and sustained behavioral change across diverse populations @kelly2023barriers.

In the Philippines, this global challenge manifests in alarming local statistics. The 2018-2019 Expanded National Nutrition Survey (ENNS) by the Department of Science and Technology's Food and Nutrition Research Institute (DOST-FNRI) revealed that only 12.7% of Filipino households met recommended vegetable consumption levels, while fruit consumption was even lower at 8.9% @fnri2022enns. This nutritional inadequacy contributes to the country's dual burden of malnutrition, where undernutrition coexists with rising rates of overweight and obesity, particularly in urban centers @patalen2022nutrition.

Consider Carlos, a 24-year-old call center agent in Davao City. He knows the importance of eating vegetables, but his 10-hour night shifts, limited budget, and the convenience of street food near his workplace make healthy eating feel impossible. His story is not unique. In Davao City, rapid urbanization and the rise of the business process outsourcing (BPO) industry have created a demographic of young adults facing similar struggles. A local study by Gonzales and colleagues found that over 60% of young professionals in Davao City reported significant barriers to healthy eating, including time scarcity, high cost of fresh produce, and lack of cooking facilities in boarding houses @gonzales2021dietary. Understanding and addressing these challenges in this specific population is the central motivation for this research.

Practical barriers present significant obstacles to healthy eating. The cost of fresh produce often exceeds the budgets of low-income households, while demanding work schedules leave little time for meal preparation @darmon2008does. Beyond finances and time, the food environment itself can be limiting and many communities lack accessible grocery stores or affordable healthy options, leaving residents dependent on convenience stores stocked predominantly with processed foods. Social pressures further adds to these challenges: family members may resist dietary changes, cultural food traditions may center less on nutritious staples, and peer eating habits can quietly undermine personal health goals @cruwys2015social. In regards to personal barriers, many individuals doubt their own cooking abilities, assume that healthy food is inherently bland or unsatisfying, or simply feel too exhausted after demanding days to invest effort in meal preparation @jabs2006time.

Even when people successfully formulate intentions to improve their diets, maintaining those intentions over an extended period proves exceptionally challenging. Eating healthy is not a singular choice but rather a long process, influenced by external factors, cravings, and conflicting obligations @sheeran2016intention. Consequently, understanding the temporal evolution of motivation and obstacles is essential. However, most current interventions conceptualize behavior change as a one time occurrence rather than a continuous progression. Figure 1 shows this contrast between intention and actual conduct, emphasizing the psychological and practical influences that intervene.

#v(10pt)

#figure(
  image("intAct.png"),
  caption: [A conceptual diagram showing the gap between intention and action],
) <inteaction>

#v(10pt)

A multitude of digital health tools have emerged in response to these challenges, offering meal planning apps, chatbot coaches, and gamified trackers, promising to make eating healthy foods much easier @franssen2022digital. Yet these tools consistently miss the mark because they fail to understand the full psychological picture of why people struggle. They personalize recommendations based on food preferences or calorie goals but ignore the deeper drivers of behavior, the attitudes, social influences, and perceived control, that shape whether a person even attempts to make that change @bardus2016does. This gap between behavioral science knowledge and technological application represents both a failure and an opportunity. This study focuses on Filipino young adults and adults (ages 18-40) in Davao City, a demographic navigating the transition to independent living where, dietary habits are still forming and intervention is most impactful @nelson2008young.


The Theory of Planned Behavior (TPB) is one of the most extensively tested and validated frameworks for predicting human behavior across diverse domains, including health and nutrition @ajzen1991theory. Developed by Icek Ajzen, the theory posits that the immediate antecedent of behavior is the individual's intention to perform that behavior. Intention itself is shaped by three conceptually distinct psychological constructs. The first construct is attitude toward the behavior, which reflects the individual's overall evaluation of performing the behavior. This encompasses both instrumental judgments (whether the behavior is beneficial or harmful) and experiential judgments (whether it is pleasant or unpleasant). The second construct is subjective norm, which captures perceived social pressure to perform or not perform the behavior. This includes beliefs about whether important others (family, friends, colleagues) think the individual should engage in the behavior. The third construct is perceived behavioral control (PBC) , which refers to the individual's perception of how capable they are of performing the behavior. PBC incorporates both internal factors (skills, confidence, knowledge) and external factors (opportunities, barriers, resources) @armitage2001EfficacyOT.

Meta-analytic evidence confirms that these constructs reliably predict both intention and behavior. Armitage and Conner's comprehensive review of 185 independent studies found that the TPB accounted for 39% of the variance in intention and 27% of the variance in behavior across a wide range of health-related actions @armitage2001EfficacyOT. Their analysis revealed that attitudes demonstrated the strongest correlation with intention, followed by perceived behavioral control and then subjective norms. Intention itself showed significant relationships with actual behavior, though the intention-behavior gap remains a persistent finding across the literature.

However, despite its many strengths, TPB has significant limitations. The model explains intention well but leaves a substantial portion of behavioral variance unexplained @sniehotta2014time. People form intentions to eat healthy yet fail to act on them when real-world barriers emerge; when they are tired, when social situations pressure them to indulge, or when old habits resurface. This intention-behavior gap becomes particularly pronounced for long-term habits that require sustained effort over time @sheeran2016intention. Understanding why some people translate intentions into lasting change while others do not requires a more dynamic approach, one that accounts for an individual's readiness to change.

If TPB tells us what psychological factors matter, the Transtheoretical Model (TTM) tells us when a person is ready to act on them. Developed by Prochaska and DiClemente in the 1980s to understand how people change addictive behaviors, TTM has since been applied across diverse health domains, including smoking cessation, physical activity, and nutrition @prochaska1997transtheoretical. The model's core insight is that behavior change is not a single event but a process that unfolds through a series of distinct stages. Individuals move through these stages at different paces, may relapse to earlier stages, and require different types of support depending on their current stage.

The five stages of change are:

- Pre-contemplation: The individual is not yet considering change. They may be unaware of the need to change, may have tried and failed in the past, or may be defensive about their current behavior. In the context of healthy eating habits, a person in pre-contemplation might say, "I don't need to change my diet; I'm fine."

- Contemplation: The individual is thinking about change but remains ambivalent. They are weighing the pros and cons of changing without yet committing to action. A contemplator might say, "I know I should eat better, but healthy food is so expensive and I'm not sure it's worth the effort."

- Preparation: The individual intends to take action soon and may be making small behavioral experiments. They are planning and building commitment. Someone in preparation might say, "I'm going to start meal prepping on Sundays starting next week."

- Action: The individual is actively modifying their behavior. This stage requires significant time and energy and is the most vulnerable to relapse. A person in action might say, "I've been cooking at home every night for the past two weeks."

- Maintenance: The individual works to sustain changes over the long term, consolidating gains and preventing backsliding. This stage involves integrating the new behavior into one's identity and lifestyle @hashemzadehTranstheoreticalModelHealth2019.

Systematic reviews confirm that stage-matched interventions improve dietary outcomes across diverse populations @spencer2007stage. When programs tailor their messages to an individual's stage of change, participants show greater improvements in fruit and vegetable consumption, fat intake reduction, and overall diet quality compared to non-tailored alternatives. This is particularly true for adolescents and young adults, populations in whom dietary habits are still forming and thus more malleable @dipietro2020transtheoretical.

And in combining these frameworks, TPB identifies the specific beliefs holding someone back: low perceived behavioral control ("I don't know how to cook healthy meals on a budget"), negative attitudes ("Healthy eating means giving up foods I love"), or unsupported subjective norms ("My family wouldn't eat what I cook"). TTM then determines how to address those beliefs based on readiness. For a person in the contemplation stage who believes healthy food is expensive, an appropriate intervention might explore the pros and cons of budgeting for groceries or introduce strategies for affordable healthy eating. For someone in the action stage with the same belief, the intervention might provide specific budget-friendly recipes and tips for shopping sales. The content of the barrier (the TPB construct) is the same, but the intervention strategy (determined by TTM stage) is completely different.

This integration addresses both the content of barriers (from TPB) and the process of addressing them (from TTM). Longitudinal research suggests that such integrated approaches may be particularly valuable for supporting the transitions between stages that are hardest to predict and facilitate @wyker2010behavioral. For a conversational AI system, this means it can not only detect what is wrong but also deliver the right type of help at the right time. Because the proposed system aims to support sustained behavior change over time, it must be grounded in evidence about how these theoretical constructs evolve. Longitudinal studies examining TPB and TTM over months and years reveal critical insights that cross-sectional research cannot provide. Several studies have tracked TPB constructs and eating behaviors over extended periods, revealing that these constructs are far from static. Bassett-Gunter and colleagues conducted a 12-month longitudinal study examining eating behavior motives within the TPB framework across three groups: new parents, established parents, and non-parents. Their findings were striking. Among both men and women during the first six months after having a baby, new parents experienced decreased perceived behavioral control related to healthy eating, while established parents actually saw increases @bassett-gunterOhBabyMotivation2013. This demonstrates that major life transitions can significantly impact PBC over time, with real consequences for dietary behavior.

Horwath and colleagues conducted a two-year longitudinal study to determine whether TTM constructs differ between individuals making successful versus unsuccessful stage transitions for fruit and vegetable consumption. Following a multi-ethnic cohort of 700 adults at six-month intervals, they found that compared to those who stayed in pre-contemplation, people who successfully moved out of pre-contemplation used behavioral processes more often, particularly self-liberation, which involves making a firm commitment to change. However, the study also revealed an important limitation: for people already in preparation or maintenance, tailoring based on TTM variables alone may be insufficient @horwathUsefulBasisInterventions2013. This finding directly supports the need to integrate other theories like TPB for individuals who have moved beyond the earliest stages. Different stages may require different theoretical toolkits.

Finally, research directly examining combined TPB and TTM predictors of stage transitions has found that these factors predict movement between most stages. However, progression from preparation to action remains harder to predict @wykerBehavioralChangeTheories2010. This is precisely the kind of transition where a conversational AI system might provide crucial support, detecting subtle cues in user language that signal ambivalence or emerging barriers and intervening before the user stalls or backslides.

These longitudinal studies collectively offer several design principles. First, TPB constructs like PBC change over time; the system must track them continuously. Second, TTM stage transitions are predictable using behavioral processes like self-liberation and consciousness raising, which the system could detect in conversation. Third, the intention-behavior gap documented in cross-sectional research persists longitudinally, reinforcing the need for ongoing adaptive support rather than one-time intention measurement. Fourth, attrition is a major challenge in longitudinal health research, meaning the system must actively work to keep users engaged over long periods, something theory-driven personalization could help accomplish.

#v(10pt)


== The Gap
Despite decades of accumulated evidence about what drives behavior change, commercially available AI nutrition tools remain largely atheoretical. This disconnect between scientific knowledge and technological application represents a fundamental flaw in current approaches @michie2017developing. While these tools excel at personalizing recommendations based on stated preferences and scaling to reach thousands of users, they systematically fail to model the psychological factors that research identifies as critical to sustained behavior change.

Table 1 summarizes the landscape of current digital nutrition tools, their capabilities, and their limitations when evaluated against the theoretical framework this study adopts.

#table(
  columns: (auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, left),

  /* --- Header row --- */
  [*Tool Category*], [*Examples*], [*Primary Strengths*], [*Key Limitations (TPB/TTM Gaps)*],

  /* --- Calorie Tracking Apps --- */
  [Calorie Tracking Apps],
  [MyFitnessPal, Lose It!, Cronometer],
  [

    Extensive food databases\

    Nutrient tracking\

    Barcode scanning\

    Progress charts
  ],
  [

    No assessment of attitudes or social norms @bardus2016does\

    Assumes knowledge deficit is the only barrier\

    Static user profiles; no longitudinal tracking\

    Ignores cooking skill, equipment, budget constraints\

    High attrition rates (up to 80% after 2 weeks) @baumel2019objective
  ],

  /* --- Meal Planning Apps --- */
  [Meal Planning Apps],
  [Mealime, PlateJoy, Eat This Much],
  [

    Personalized recipe recommendations\

    Automated grocery lists\

    Dietary filtering (vegan, keto, etc.)\

    Calendar integration
  ],
  [

    Ignores user's actual cooking skill level @yangValidatingAccuracyInternetBased2022\

    Assumes intention automatically leads to action\

    No detection of stage of change\

    Culturally limited recipe databases; poor representation of Asian cuisines @chen2025ai
  ],

  /* --- Rule-Based Chatbots --- */
  [Rule-Based Chatbots],
  [Early health bots, Woebot (for mental health), simple FAQ bots],
  [

    Consistent information delivery\

    Simple navigation\

    Predictable responses\

    Low computational cost
  ],
  [

    Cannot handle complex or novel queries\

    No adaptation to user's psychological state\

    No stage detection or tailoring\

    User disengagement due to repetitive responses @schueller2024digital
  ],

  /* --- LLM-Powered Chatbots --- */
  [LLM-Powered Chatbots],
  [Custom nutrition LLMs, ChatGPT-based coaches, Gemini],
  [

    Natural conversation\

    Contextual understanding\

    Scalable to many users\

    Can discuss open-ended topics
  ],
  [

    High variability in nutritional accuracy (calorie estimates ranged from 1357-2273 kcal for 1500 kcal target) @pires2025ai\

    Hallucination risks; inconsistent adherence to evidence\

    No theoretical grounding by default\

    Gemini showed >50% of diet plans deviating from targets by >20% @wang2025
  ],

  /* --- Specialized Research-Backed Apps --- */
  [Specialized Research-Backed Apps],
  [PROTEIN app, DIAITA, Fridolin],
  [

    Theory-informed design\

    Expert knowledge bases\

    Strong personalization\

    User-centered design through participatory methods @diaita2024 @halskov2015participatory
  ],
  [

    Often research prototypes; not commercially available\

    Limited scalability\

    May require expert supervision\

    Rarely tested in diverse populations
  ]
)

As Table 1 illustrates, current tools cluster at opposite ends of a spectrum. At one end are commercially successful apps that prioritize usability and scale but ignore psychological theory. At the other end are research-backed prototypes that incorporate expert knowledge but remain inaccessible to most users. Neither approach has successfully integrated real-time psychological assessment with scalable deployment.


Recent evaluations reveal significant technical limitations even in advanced AI tools. A 2025 study comparing five major AI models (ChatGPT-4, ChatGPT-4o, Mistral, Claude, and Llama) found substantial variability in diet plan generation. When asked to create 1500 kcal meal plans, actual energy values ranged from 1357 kcal to 2273 kcal across models, with protein intake varying by up to 65 grams @wang2025. Micronutrient content showed similar inconsistencies, with calcium, iron, and vitamin D levels varying widely. These discrepancies suggest limitations not only in the AI tools' capabilities but also in their interpretation of user intent and their underlying food composition databases.

Another study evaluating ChatGPT-4o, Microsoft Copilot, and Gemini found that while all achieved satisfactory overall diet quality scores (DQI-I > 70), they consistently performed poorly on macronutrient and fatty acid balance. Gemini showed particular instability, with over 50% of its diet plans deviating from target calories by more than 20% @wang2025. These findings demonstrate that current AI tools cannot be relied upon for precise nutritional guidance without human oversight. Research on AI-moderated conversational surveys demonstrates that chatbots can elicit more thoughtful, detailed responses than traditional questionnaires @xiao2020tell. Participants engage more naturally, provide richer information, and report greater satisfaction with conversational interfaces. Yet this approach has not been systematically applied to build real-time, theory-based coaching models that adapt to users' evolving psychological states.

The consequences of these limitations are evident in user engagement data. A study of the PROTEIN personalized nutrition app, developed through a European Union H2020 project, found that mHealth apps are often subject to dropout rates of up to 80 percent, with only 3.9 percent of participants using the apps for more than 15 days @kapsis2022proteina. Research on chatbot-based nutrition education similarly reports attrition rates of 36 percent over relatively short study periods @chew2024effects. These engagement failures are not merely technical problems; they reflect a fundamental mismatch between what apps offer and what users need. People download nutrition apps with enthusiasm, use them for a few weeks, and then abandon them when the advice feels irrelevant to their actual lives. The apps give recommendations that sound good in theory but prove impossible to follow, a nutritionally perfect recipe that requires expensive ingredients, specialized equipment, or advanced cooking skills that the user does not possess @yangValidatingAccuracyInternetBased2022.

== Objectives
The main objective of this study is to develop and evaluate a theory-driven conversational AI system that provides personalized support for healthy eating by integrating the Theory of Planned Behavior (TPB) and the Transtheoretical Model (TTM). Successfully developing such a system requires a comprehensive approach that spans multiple interconnected stages. This involves not only designing a natural conversational interface but also building the underlying inference engines that can detect psychological constructs from user language, estimate readiness to change, and deliver stage-matched, belief-targeted interventions. By addressing each of these stages, the study seeks to create a more effective and engaging digital health tool for Filipino young adults in Davao City. Specifically, this study aims to:

- Design and implement a conversational interface that elicits rich, natural language from users about their dietary habits, challenges, social environment, and goals, while maintaining an empathetic and non-judgmental tone that encourages sustained engagement.

- Develop natural language processing (NLP) models to infer the three core TPB constructs (Attitude, Subjective Norm, Perceived Behavioral Control) from user conversation, using a theme taxonomy derived from qualitative survey data and calibrated with population-specific regression weights.

- Create a rule-based classification algorithm to estimate a user's current TTM stage of change (Pre-contemplation, Contemplation, Preparation, Action, or Maintenance) based on linguistic markers in conversation, with confidence thresholds and clarification mechanisms to ensure accurate stage assignment.

- Build an integrated intervention engine that:
  - Selects stage-appropriate intervention modes based on TTM stage
  - Identifies the weakest TPB determinant to target
  - Maps (stage, determinant) pairs to specific Behavior Change Techniques (BCTs)
  - Generates personalized, context-aware recipe recommendations that respect user constraints (time, budget, skill, equipment)

- Evaluate the overall effectiveness of the complete pipeline by measuring:
  - Technical performance (classification accuracy, F1-score, Mean Absolute Error of construct inference)
  - Expert validation (nutritionist review of response safety and appropriateness)
  - User outcomes (TTM stage progression, changes in TPB construct scores, engagement metrics, and System Usability Scale scores)


= Methods and Materials

// still use iterative but add a graph on what to do on each iterations, we can remove some parts of it to make it easier to develop for 1st and 2nd iterations. In order for a smoother workflow we will be using synthetic dataset and focus more on the flow of the system and experiment with how different models perform. the 2nd one will use the dataset from the preliminary survey. 3rd would just improve upon other stuff like fallbacks and extra stuff. This replaces the limitations part.

== Research Method
This study will employ a Design Science Research (DSR) approach, applied through iterative development cycles. DSR is particularly suited for this investigation as it focuses on creating and evaluating innovative artifacts, this is a theory-driven nutritional chatbot in order to solve identified problems in behavioral health interventions.

The research progresses through structured development cycles as shown in Figure 2, following a Plan-Build-Evaluate-Refine paradigm:
- *Requirements Analysis and Planning:* Identification of functional and behavioral requirements derived from the theoretical framework
- *Design:* Architecture specification for both the dialogue system and psychological scoring mechanisms
- *Implementation:* Development of the NLP pipeline and integration of behavioral models
- *Testing:* Technical validation of component functionality
- *Evaluation:* Expert and user assessment of the artifact's effectiveness
- *Refinement*: Iterative improvement based on evaluation findings

#figure(
  image("iterative.png"),

  caption: [Iteration Development Cycle Flow],
)

#v(10pt)

*1st Iteration: Synthetic Data and Pipeline Prototyping.* The first cycle focuses on establishing the core system architecture and conversation flow before collecting real user data. Using synthetic dialogue datasets (MHC-Coach, openCHA demo scripts) and simulated user interactions, this cycle tests the end-to-end functionality of the seven-step pipeline.

*2nd Iteration: Real Data Integration and Model Fine-Tuning.* The second cycle incorporates the preliminary survey data collected from the target population. With open-ended responses paired with TPB scores and TTM stage labels.

*Final Iteration: Refinement and Enhancement.* The third cycle focuses on polishing the system based on insights from pilot testing and addressing edge cases.

== Design Procedure
Iteration 1: Synthetic Data and Pipeline Prototyping
The first iteration focuses on establishing the core system architecture and conversation flow before collecting real user data. This iteration begins with a comprehensive requirements analysis that grounds all subsequent design decisions.

*Requirements Analysis:* Identify foundational requirements for the system based on the TPB and TTM theoretical framework. This includes:

- Functional requirements for each of the seven pipeline steps
- Requirements for conversation flow and natural language elicitation of psychological constructs from preliminary survey.
- Dialogue state tracking needs (what information must be captured and maintained)
- Technical requirements for pipeline connectivity and confidence propagation
- Data requirements for recipe retrieval and recommendation
- Ethical and safety requirements for health coaching conversations

*Design:* Create the initial system architecture including:
- Conversation flow diagrams mapping how to naturally elicit TPB constructs and TTM indicators
- Dialogue state tracker specifications with variable definitions and update logic
- Prompt templates for each intervention mode based on theoretical guidelines
- RAG pipeline design for recipe retrieval from RecipeNLG
- JSON payload schemas for communication between pipeline stages
- Confidence scoring and propagation mechanisms

*Implementation:* Develop using synthetic datasets:
- Implement basic conversation management framework using LangChain
- Develop prototype TPB inference using off-the-shelf models (zero-shot)
- Build the RAG pipeline with FAISS vector search on RecipeNLG
- Create initial versions of all seven pipeline steps with mock confidence propagation
- Implement dialogue state tracker with basic clarification logic

*Testing:* Conduct technical validation of component functionality:
- Verify end-to-end connectivity between all seven steps
- Test conversation flow with simulated user interactions
- Measure response latency for different LLM backbones (Llama 3 8B, Mistral 7B)
- Validate that confidence scores propagate correctly through the pipeline
- Identify bottlenecks and failure points in the architecture

*Evaluation:* Assess against Iteration 1 success criteria:
- Does the pipeline complete all seven steps without breaking?
- Can the system maintain coherent conversations over multiple turns?
- Are theoretical constructs being elicited naturally?
- What are the baseline performance metrics for future comparison?

*Refinement:* Document insights and refine designs:
- Update prompt templates based on conversation flow observations
- Refine dialogue state tracker logic to better capture user inputs
- Adjust clarification strategies based on simulated user responses
- Create a prioritized list of improvements for Iteration 2

*Outputs:* A functional pipeline prototype with documented architecture, conversation flow specifications, initial prompt templates, baseline performance metrics, and a comprehensive requirements document that guides all subsequent iterations.

*Iteration 2:* Real Data Integration and Model Fine-Tuning
The second iteration incorporates the preliminary survey data collected from the target population. Building on the requirements established in Iteration 1, this iteration focuses on training and validating the core inference models.

*Design:* Create inference model architectures:
- Theme-to-construct mapping matrix with association weights derived from thematic analysis
- Ensemble architecture combining DeBERTa-v3 (primary), RoBERTa regression head (auxiliary), and keyword fallback
- TTM stage classifier design with two-tier approach (DistilBERT primary + rule-based fallback)
- Scoring formulas incorporating population-specific regression weights
- Confidence threshold definitions and clarification trigger logic
- Validation protocols with 80/10/10 train/validation/test splits

*Implementation*: Train and integrate models:
- Fine-tune DeBERTa-v3 for multi-label theme classification on annotated corpus
- Train regression heads on RoBERTa for direct TPB construct scoring
- Fine-tune DistilBERT for TTM stage classification
- Implement ensemble weighting scheme
- Calibrate confidence thresholds based on validation performance
- Update theme-to-construct mapping with empirically derived weights

*Testing*: Conduct technical validation:
- Measure precision, recall, and F1-score for theme classification
- Calculate MAE, RMSE, and R² for TPB construct scoring
- Evaluate stage classification accuracy and weighted F1-score
- Test confidence threshold logic with validation data
- Conduct initial pilot testing with small user group (n=10-15)

*Evaluation*: Assess against Iteration 2 success criteria:
- Do models meet accuracy thresholds (F1 > 0.80, MAE < 0.5)?
- Are confidence thresholds appropriately calibrated?
- How do pilot users perceive response relevance?
- Is theoretical alignment maintained after fine-tuning?

*Refinement*: Document insights and refine designs:
- Adjust ensemble weights based on validation performance
- Refine confidence thresholds where misclassifications occurred
- Update clarification question templates based on pilot feedback
- Create prioritized list of edge cases and improvements for Iteration 3

*Outputs*: Trained inference models with documented architectures, empirically validated theme-to-construct mappings, calibrated scoring algorithms, confidence threshold specifications, and validation reports.

*Iteration 3:* Refinement and Enhancement
The third iteration focuses on polishing the system based on insights from pilot testing and addressing edge cases that emerge during real-world interaction. This iteration emphasizes robustness, user experience, and cultural appropriateness.

*Design*: Create refinement specifications:
- Fallback strategy designs for low-confidence scenarios with decision trees
- Enhanced BCT-to-recipe adaptation logic based on user feedback
- Clarification dialogue patterns for ambiguous user inputs
- Tone and empathy guidelines for response generation
- Sophisticated longitudinal tracking mechanisms

*Implementation*: Develop refinements:
- Create fallback mechanisms for low-confidence scenarios
- Expand and refine rule-based pattern matching for stage classification
- Supplement Filipino recipe database with additional culturally appropriate options
- Implement sophisticated clarification strategies
- Optimize response generation prompts for better tone and empathy

*Testing*: Conduct comprehensive validation:
- Test fallback mechanisms with edge case scenarios
- Verify cultural appropriateness of recipe recommendations with local users
- Measure system usability with target population (SUS)
- Track engagement metrics (session duration, conversation length, dropout rates)
- Expert review by nutritionists and linguists

*Evaluation*: Assess against final success criteria:
- Does the system meet all technical performance thresholds?
- Are ≥85% of responses rated as nutritionally safe by experts?
- Is SUS score > 68 (above average)?
- Are there demonstrable shifts in TPB scores or TTM stage progression?
- Do users report positive experiences and therapeutic alliance?

*Refinement*: Final documentation and preparation:
- Document final system architecture and design decisions
- Create user guidelines and disclosure statements
- Prepare deployment protocols for larger-scale validation
- Document limitations and future improvement opportunities

*Outputs*: Production-ready prototype with refined fallback mechanisms, culturally adapted recipe selection, optimized response generation, comprehensive evaluation reports, and final system documentation.



#v(10pt)

== Theoretical Framework

This study is grounded in the integration of two prominent and complementary behavioral theories: the *Theory of Planned Behavior (TPB)* and the *Transtheoretical Model (TTM)* . This integrated framework provides a robust foundation for designing, developing, and evaluating a conversational AI system aimed at promoting healthy eating behaviors among Filipino young adults. The TPB provides the "what"—the specific psychological determinants of intention and behavior—while the TTM provides the "when", the dynamic stages of readiness that dictate how and when to intervene.

=== The Theory of Planned Behavior (TPB): Identifying the Determinants of Action

Developed by Icek Ajzen @ajzen1991theory, the Theory of Planned Behavior posits that the immediate antecedent of any behavior is the individual's *intention* to perform that behavior. Intention represents the motivational factors that influence how hard people are willing to try and how much effort they plan to exert @ajzen1991theory. According to the TPB, intention is itself a function of three independent constructs:

- *Attitude Toward the Behavior (A):* This refers to the degree to which a person has a favorable or unfavorable evaluation or appraisal of the behavior in question. It encompasses both *instrumental* aspects (e.g., beneficial/harmful, wise/foolish) and *experiential* aspects (e.g., pleasant/unpleasant, enjoyable/unenjoyable) of performing the behavior @ajzen2020changing. A person who believes that eating healthy will lead to positive outcomes (e.g., more energy, better health) will hold a more positive attitude.

- *Subjective Norm (SN):* This is the perceived social pressure to perform or not perform the behavior @ajzen1991theory. It is determined by the individual's beliefs about whether significant others (e.g., family, friends, colleagues) think they should engage in the behavior, weighted by their motivation to comply with those referents @armitage2001EfficacyOT. For instance, a young adult might feel pressure from peers to eat out at fast-food restaurants, creating a subjective norm that discourages healthy eating.

- *Perceived Behavioral Control (PBC):* This refers to the individual's perception of the ease or difficulty of performing the behavior @ajzen1991theory. It reflects both *internal* control factors (e.g., skills, knowledge, willpower) and *external* control factors (e.g., time, opportunity, cooperation of others). PBC is a unique addition to the model as it has both a motivational influence on intention and a direct link to behavior, as it can serve as a partial substitute for actual control @ajzen2020changing. A person with low confidence in their cooking skills or limited time will have low PBC, making it harder to act on their intentions.

Meta-analytic evidence confirms that these constructs reliably predict both intention and behavior. Armitage and Conner's comprehensive review of 185 independent studies found that the TPB accounted for 39% of the variance in intention and 27% of the variance in behavior across a wide range of health-related actions @armitage2001EfficacyOT. In the domain of dietary behavior, systematic reviews have demonstrated that interventions targeting TPB constructs are effective in increasing fruit and vegetable consumption and reducing unhealthy eating patterns @mcdermott2015tpb.

In this study, TPB will be used to *diagnose the specific psychological barriers* holding a user back. By analyzing a user's natural language, the system will infer their scores on Attitude, Subjective Norm, and PBC. The weakest of these determinants will become the primary target for intervention.

=== The Transtheoretical Model (TTM): Understanding the Stages of Readiness

Developed by Prochaska and DiClemente @prochaska1997ttm, the Transtheoretical Model conceptualizes behavior change not as a discrete event, but as a process that unfolds over time through a series of stages. The model's core premise is that individuals at different stages of change require different types of interventions @prochaska2005transtheoretical. The five stages are:

1. *Pre-contemplation:* The individual does not intend to take action in the foreseeable future (usually measured as the next six months). They may be unaware that their behavior is problematic or may be demoralized from past failed attempts.
2. *Contemplation:* The individual intends to change within the next six months. They are aware of the pros and cons of changing, leading to a state of ambivalence and "weighing" of the costs and benefits @.
3. *Preparation:* The individual intends to take action in the immediate future (usually within the next month). They may have a plan of action, such as joining a support group, buying a cookbook, or speaking to a counselor.
4. *Action:* The individual has made specific, overt modifications to their lifestyle within the past six months. This is a busy period of active change and is the most vulnerable to relapse.
5. *Maintenance:* The individual is working to prevent relapse and consolidate the gains attained during action. They are less tempted to regress and increasingly more confident they can sustain the change.

Systematic reviews confirm that stage-matched interventions improve dietary outcomes across diverse populations @spencer2007stage. When programs tailor their messages to an individual's stage of change, participants show greater improvements in fruit and vegetable consumption, fat intake reduction, and overall diet quality compared to non-tailored alternatives @dipietro2020transtheoretical. This is particularly true for adolescents and young adults, populations in whom dietary habits are still forming and thus more malleable @nelson2008young.

In this study, TTM will be used to determine the user's current readiness for change by analyzing linguistic markers in their conversation. This stage classification will dictate the intervention mode, whether the conversation should focus on raising awareness, resolving ambivalence, building a concrete plan, supporting action, or preventing relapse.

=== Integration of TPB and TTM: A Synergistic Framework for Personalized Intervention

While powerful on their own, the true potential of this study lies in the *synergistic integration* of TPB and TTM. The TPB provides a snapshot of the content of a person's motivation, while the TTM provides the timeline and context of their readiness. By combining them, we can move from a one-size-fits-all approach to a dynamically tailored intervention.

The integrated framework operates on a simple yet powerful principle: *What you talk about (the TPB barrier) depends on when the person is in their journey (the TTM stage).*

This integration is operationalized in the system's core logic as follows:

- *Early Stages (Pre-contemplation & Contemplation):* The interaction is *TTM-led*. The primary goal is stage progression, not directly attacking a TPB barrier. The system uses TPB scores contextually to understand *why* the user is stuck. For example, if a user is in Contemplation, the system will use the TPB profile to inform a "decisional balance" exercise (a TTM process) @kleis2021ttm. If the user's main barrier is a negative Attitude ("Healthy food is bland"), the system can explore the "pros" of taste versus the "cons" of health, but the goal is still to move them toward Preparation, not to convince them to like broccoli today.

- *Middle Stages (Preparation & Action):* The interaction becomes *TPB-led*. The user is ready to act, so the system uses the TPB profile to identify the "weakest link" (e.g., low PBC due to poor cooking skills). It then selects a specific Behavior Change Technique (BCT), guided by the TTM stage, to target that barrier @teixeira2022health. For instance, for a user in the Action stage with low PBC, the system might use BCT 4.1 ("Instruction on how to perform") and recommend a simple, low-skill recipe.

- *Late Stage (Maintenance):* The interaction returns to being *TTM-led*, with a focus on relapse prevention. The TPB scores are monitored longitudinally as an early warning system @bassett-gunter2013oh. A sudden drop in PBC scores, for example, could signal an increased risk of relapse, prompting the system to intervene with coping strategies before the user backslides.

This integrated framework ensures that the conversational AI is not just a smart recipe recommender, but a theory-driven coach that delivers the *right type of support, at the right time, for the right reason.* It allows the system to understand both the user's destination (healthy eating) and their current location on the map (TTM stage), as well as the specific obstacles in their path (TPB determinants).

=== Implementing the Framework with Accessible Language Models

The theoretical integration described above places significant demands on the system's natural language understanding capabilities. It must infer subtle psychological constructs (Attitude, Subjective Norm, PBC), detect linguistic markers of stage transitions, select appropriate intervention modes, and generate empathetic, stage-matched responses—all in real-time conversation. To meet these demands while maintaining accessibility and reproducibility, this study leverages a combination of encoder-only models for inference tasks and decoder-based models in the 7B to 8B parameter range for response generation.

For the critical tasks of TPB construct inference (Step 2) and TTM stage estimation (Step 3), the system employs fine-tuned encoder-only transformer models, which offer an optimal balance of accuracy and computational efficiency for classification and regression tasks.

DeBERTa-v3 (base/large): Serves as the primary model for multi-label theme classification in Step 2 @he2021debertav3. Fine-tuned on the manually annotated corpus from the preliminary survey, this model outputs confidence scores for each theme in the empirically derived taxonomy (e.g., "time scarcity," "cost concerns," "family pressure"). DeBERTa-v3 was selected for its superior performance on natural language understanding tasks and its ability to capture contextual nuances critical for accurately identifying psychological constructs from conversational text. The model will be fine-tuned using binary cross-entropy loss, with an acceptance threshold of F1 > 0.80 required for deployment.

RoBERTa-base with regression head: Serves as an auxiliary model in the ensemble for direct TPB construct scoring @liu2019roberta. Rather than detecting discrete themes, this model bypasses explicit theme detection and directly predicts continuous scores for Attitude, Subjective Norm, and Perceived Behavioral Control from text. This approach provides a check against theme detection errors and captures holistic patterns that may not reduce cleanly to discrete themes. Trained on the same labeled corpus as DeBERTa-v3, the regression head outputs scores that are combined with the primary model's outputs using a weighted ensemble (α=0.6, β=0.3, γ=0.1).

DistilBERT / BERT-small: Employed for lightweight TTM stage classification in Step 3 @sanh2019distilbert. This model takes the user's recent conversation window and outputs a probability distribution across the five stages of change. A smaller model was deliberately chosen for this task to reduce computational overhead while maintaining sufficient accuracy (weighted F1 > 0.80) for intervention matching. When model confidence falls below threshold, the system falls back on rule-based pattern matching using linguistic markers identified in the literature @horwath2013transtheoretical.


For Step 7 (Response Generation), the system requires a model capable of fluent, empathetic, and contextually appropriate natural language generation. This study constrains its implementation to open-source language models in the 7B to 8B parameter range, which have demonstrated strong performance on complex language tasks while remaining feasible for fine-tuning and deployment on consumer-grade hardware using parameter-efficient techniques @dettmers2024unsloth.

Llama 3 8B / 3.1 8B (Meta): Serves as the primary backbone for response generation, fine-tuned on health coaching dialogues to ensure appropriate tone and theoretical fidelity @sharma2025llm. Recent research has shown that fine-tuned 8B models can produce stage-matched interventions rated by experts as more empathetic and theoretically consistent than those generated by much larger proprietary models.

Mistral 7B (Mistral AI): Evaluated as an alternative backbone during Iteration 1 to compare response quality and latency, with the better-performing model selected for subsequent iterations.

All decoder models will be fine-tuned using LoRA (Low-Rank Adaptation) via the Unsloth framework, which dramatically reduces memory requirements and training time while maintaining model quality @hu2023finetuning. This approach enables multiple fine-tuning iterations even with limited computational resources, supporting the iterative design methodology described in the Design Procedure section.

As detailed in Step 2, these models work together in an ensemble architecture:

Fine-tuned DeBERTa-v3 for multi-label theme classification (primary)
Regression head on RoBERTa for direct construct scoring (auxiliary)
Keyword dictionary fallback based on thematic analysis (when neural confidence is low)

Final construct scores are computed as weighted averages:

$"Score"_"final" = alpha times "Score"_"deberta" + beta times "Score"_"roberta" + gamma times "Score"_"rule"$

where $alpha = 0.6$, $beta = 0.3$, and $gamma = 0.1$ when confidence in the primary model exceeds 0.85. This ensemble approach improves robustness and handles the inherent ambiguity of natural language.

During Iteration 1 (Synthetic Data and Pipeline Prototyping), base versions of these models are tested with synthetic datasets to establish baseline performance and refine prompt templates. Iteration 2 incorporates the preliminary survey data for fine-tuning all models on population-specific language and barriers. Iteration 3 focuses on refining fallback mechanisms and edge case handling based on pilot testing feedback.

This model selection strategy ensures that the theoretical sophistication of the integrated TPB-TTM framework is matched by a practical, accessible implementation, one that can be reproduced, extended, and eventually deployed in real-world settings to support Filipino young adults in their healthy eating journeys.

== Conceptual Framework
The proposed system implements a modular pipeline architecture consisting of seven sequential processing stages (Figure 3). Each stage is designed as an independent microservice that communicates via JSON payloads, allowing for modular updates and independent scaling. The architecture follows a cascading inference design, where the output of each stage serves as input to the next, with confidence scores propagating through the pipeline to inform downstream decision-making.

#figure(
  image("seven.png"),
  caption: [Seven-Step Computational Pipeline for Personalized Behavioral Intervention],
) <seven>

*Table 2:* Seven-Step Computational Pipeline for Theory-Driven Nutritional Chatbot

#table(
  columns: 6,
  align: (left, left, left, left, left, left),
  stroke: 0.5pt,
  [Step], [Component], [Description], [How it Uses Theory], [Open-Source Models/Tools], [Datasets],

  // Row 1
  [1],
  [Conversational Context Collection],
  [User chats about eating habits, preferences, barriers, schedule, budget, cooking skills, and food access],
  [Provides rich text + context for inferring psychological constructs and practical constraints @schueller2024digital],
  [Llama 3 / 3.1 (8B, 70B), Mistral 7B, Gemma 2 for conversational interface; fine-tune with Unsloth or LoRA for efficiency @sharma2025llm @unsloth2024],
  [Primary conversational logs collected during pilot testing; synthetic dialogue generation from openCHA framework demo scripts for initial prototyping @abbasian2025opencha],

  // Row 2
  [2],
  [TPB Construct Inference],
  [An NLP/LLM model takes recent conversation and outputs continuous scores for Attitude, Subjective Norms, and Perceived Behavioral Control toward target dietary behavior],
  [Implements TPB by turning free text into numeric constructs @armitage2005tpb @hamilton2021tpb],
  [RoBERTa, DeBERTa-v3, BERT-based models fine-tuned on TPB-labeled text; or instruction-tune Llama 3 / Mistral to extract TPB scores via prompting @li2023nlp @rahman2023tpbnlp],
  [TPB-labeled corpus created from the survey data (open-ended responses paired with TPB Likert-scale scores); this constitutes the primary training data],

  // Row 3
  [3],
  [Stage Estimation (TTM)],
  [Using conversation content + TPB scores, assign a stage: pre-contemplation, contemplation, preparation, action, maintenance, or relapse],
  [Uses TTM as a readiness label to stage-match interventions @prochaska1997ttm @prochaska2005transtheoretical],
  [Logistic regression or small classifier (XGBoost, scikit-learn) on top of TPB scores; or fine-tuned Llama/Mistral for stage classification from conversation @harris2024ttm @sharma2025llm],
  [TTM-annotated data from the preliminary survey (standard TTM staging questions paired with open-ended responses);],

  // Row 4
  [4],
  [Intervention Mode Selection],
  [Given the stage, choose a mode: awareness (pre-contemplation), ambivalence-resolution (contemplation), planning (preparation), coping (action), or relapse prevention (maintenance)],
  [Applies stage-appropriate strategies from TTM-based programs at a coarse level @kleis2021ttm @bridle2009stagematched],
  [Rule-based policy (simple stage→mode lookup table) or fine-tuned Llama/Mistral with instruction prompts specifying mode per stage @vaswani2024llms @hu2023finetuning],
  [TTM intervention literature as design guidelines; mode logic defined from systematic reviews @roman2023ttmphysical @kleis2021ttm],

  // Row 5
  [5],
  [TPB-Targeted Intervention Choice],
  [Within that mode, look at TPB scores and select what to target: attitude (persuasive framing), subjective norms (social proof), or PBC (skills/problem-solving)],
  [Uses TPB as the content selector, focusing on the weakest determinant @ajzen2020tpb @borraccino2016tpbmapping],
  [Rule-based policy (if PBC < threshold, prioritize barrier removal; if attitude low, add persuasive reframe) or instruction-tuned Llama 3 / Mistral that reasons over TPB scores @nayak2023personalized @sharma2025llm],
  [TPB intervention mapping from systematic reviews (McDermott et al., Close et al.) [3,28]; small labeled set derived from literature],

  // Row 6
  [6],
  [Feasible Dish/Plan Generation],
  [Before generating text, a recommender searches a dish/recipe database and filters by user constraints (time, budget, appliances, cooking skills, local availability), then ranks by healthiness and preferences],
  [Translates PBC / opportunity into concrete options: recommends only meals the user can realistically prepare [2]],
  [Content-based filtering with constraint rules; retrieval-augmented generation (RAG) from recipe DB with vector search (FAISS, Pinecone) @bien2020recipenlg],
  [RecipeNLG (2.2M recipes) [1,30,31]; Recipe1M+; Pan-Asian Culinary Dataset [32]; Filipino recipe datasets (kawalingpinoy.com, web scraping) [33,34]],

  // Row 7
  [7],
  [Response Generation],
  [The chat response is generated: follows chosen mode (from stage), targets selected TPB construct, and embeds specific feasible dishes from recommender],
  [Closes the loop by delivering stage- and TPB-tailored advice that is practically executable [35,36]],
  [Llama 3 / Mistral / Gemma 2 fine-tuned on health coaching dialogues; or openCHA framework orchestrator [8,37]],
  [Health coaching conversation datasets (openCHA demos, MHC-Coach synthetic data) for fine-tuning conversational tone [8,37]
  ],
)

The system proposed in this study directly addresses these gaps by embedding behavioral theory into every layer of its architecture and moving beyond static profiling to dynamic, conversation-driven psychological assessment that adapts to users' evolving needs.

== Requirements Analysis & Planning
By leveraging advances in natural language processing (NLP) and large language models (LLMs), this system applies decades of behavioral science knowledge in real time and translating theoretical constructs from TPB and TTM into a responsive, personalized coaching architecture.

*Primary Data Corpus:* The primary dataset comprises:
- Open-ended explanations collected during the Preliminary Survey, paired with their corresponding TPB Likert-scale scores and TTM stage classifications
- Corresponding weighted scores and demographic metadata
- Annotated conversational logs from pilot testing phases
- Synthetic dialogue data generated using the openCHA framework or MHC-Coach synthetic datasets for initial prototyping @abbasian2025opencha @mantena2025mhccoach

The study focuses on Filipino young adults and adults aged 18–40. Participants will be recruited from Davao City. This age range captures the transition from early adulthood through established adulthood, a period where dietary habits are both malleable and consequential for long-term health outcomes.

The preliminary phase is conducted in two sequential stages:

*Stage 1 - Qualitative Survey*
In collaboration with a registered nutritionist, open-ended survey prompts will be designed to ensure clinical relevance and capture salient beliefs specific to the target population. The qualitative survey will include:

Open-ended prompts to capture free-text expressions of dietary challenges, barriers, and motivations in participants' own words
Probing questions to elicit deeper explanations of specific barriers (e.g., "What makes it difficult for you to eat healthy on a typical day?")
Demographic and socioeconomic contextual variables to provide background for interpreting responses

Responses will be analyzed using thematic analysis to identify recurring patterns and barriers. Identified themes will then be systematically mapped to the three core TPB constructs, Attitude, Subjective Norms, and Perceived Behavioral Control, forming the theme taxonomy that the NLP inference models will use.

*Stage 2 - Quantitative Survey*
Using the themes identified in Stage 1 as a foundation, a quantitative survey instrument will be administered to establish empirically grounded ground truth scores. This survey will include:

Likert-scale items measuring the three TPB constructs (Attitude, Subjective Norms, Perceived Behavioral Control) and Behavioral Intention
Standard TTM staging questions to classify participants' current readiness for dietary change
Demographic and socioeconomic variables consistent with Stage 1 for cross-referencing

The open-ended responses from Stage 1 paired with their corresponding TPB scores and TTM stage classifications from Stage 2 form the primary labeled training corpus for the psychological inference models.


== Implementation

=== Programming and Development Environments:
The system will be developed using Python 3.9+ as the primary programming language, given its extensive ecosystem of libraries for natural language processing, machine learning, and conversational AI development. For computationally intensive tasks such as model training and fine-tuning, Google Colab (Premium/Pro) will be utilized to leverage cloud-based GPU resources, while lighter-weight components and local testing will be conducted in local development environments. All code, documentation, and project assets will be managed using Git for version control, enabling efficient collaboration, change tracking, and reproducibility across the development team.

#v(10pt)

=== Step 1: Conversational Context Collection
The pipeline establishes an ongoing, naturalistic dialogue with the user to gather rich contextual information about their dietary habits, challenges, social environment, resources, and goals. Rather than administering structured questionnaires, the system employs a conversational approach that embeds psychologically informed prompts within an organic exchange. This design choice is grounded in evidence that conversational agents elicit more thoughtful, detailed, and authentic responses than traditional surveys [@xiao2020; @aggarwalArtificialIntelligenceBased2023], while reducing assessment burden and improving user engagement [@schueller2024digital].

The conversational prompts are derived from the open-ended survey instruments developed during the preliminary phase (Section II). Formal Likert-scale items (e.g., “For me, eating a healthy diet over the next month would be: bad/good”) are reformulated into natural questions that invite free-text responses (e.g., “How do you feel about eating healthier, do you think it would make a difference for you?”). This transformation preserves the theoretical intent of the original items while making the interaction feel conversational rather than interrogative. The prompts systematically target the three TPB constructs (Attitude, Subjective Norms, Perceived Behavioral Control) and TTM stage indicators, ensuring that the data needed for subsequent inference steps are elicited organically.

Conversation flow is managed using the LangChain framework, which supports prompt chaining and context retention. A dialogue state tracker maintains a representation of which constructs have been sufficiently discussed, which constraints (e.g., time, budget, cooking skills) have been mentioned, and any outstanding clarifications needed. This tracker is updated after each user turn and informs the system’s next utterance. For example, if the user has not yet provided information about their social environment, the system might ask: “Do the people you live with influence what you eat?” The tracker also records metadata such as session duration, and turn count that could affect PBC, as highlighted [@bassett-gunterOhBabyMotivation2013].

*Input and Output Specifications.*
Input: Raw user utterances in natural language, captured via a chat interface.

Output: A structured conversation object containing:
- An array of turns, each with speaker (user/system), timestamp, and raw text.
- Extracted entities (e.g., named entities for foods, times, budgets) using a lightweight NER model (spaCy with custom training).
- A dialogue state record indicating coverage of TPB constructs, confidence levels, and any pending clarification questions.
- Session metadata (user ID, session start/end time, device type).

To handle ambiguous or incomplete responses, the system employs a confidence-based clarification mechanism. When the dialogue state tracker detects that a construct has not been adequately addressed (e.g., no mention of cooking confidence after several turns), or when an NER extraction yields low confidence, the system asks a targeted follow-up question. For instance, if the user says “I try to eat healthy but it’s hard,” the system might respond: “What part feels hardest for you, finding time, cooking skills, or something else?” This approach is inspired by the work of Dragoni et al. [@DRAGONI2020101840] on explainable AI for behavior change, where clarifying dialogue improves the system’s understanding and the user’s trust.

Following guidelines from health coaching conversational agents [@sharma2025llm; @abbasian2025opencha], the system adopts a supportive, non-judgmental tone. It uses empathetic phrasing (e.g., “That sounds really challenging, many people feel that way”) to build rapport and encourage continued disclosure. The system also avoids leading questions that could bias responses, instead favoring open-ended probes (e.g., “Tell me more about that”) to let the user’s own language drive the conversation.

The structured conversation object produced in Step 1 serves as the primary input for Step 2 (TPB Construct Inference). By capturing natural language that mirrors the qualitative survey data used for training, this step ensures that the subsequent NLP models operate on data with similar distribution and richness, thereby improving inference accuracy [@rahman2023tpbnlp; @li2023nlp].

*Table 3.1:* Sample Illustrative Mapping of Theoretical Constructs to Conversational Prompts
#table(
  columns: (auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, left),

  [*Theoretical Construct*], [*Illustrative Theme*], [*Conversational Prompt*], [*Targeted Information*],

  [Attitude (TPB)],
  [Health benefits (e.g., “I’d have more energy”)],
  [“How do you feel about eating healthier, do you think it would make a difference for you?”],
  [Instrumental attitude (perceived benefits)],

  [Subjective Norm (TPB)],
  [Peer influence (e.g., “my friends eat out a lot”)],
  [“How would your family react if you started preparing different foods?”],
  [Anticipated social response],

  [Perceived Behavioral Control (TPB)],
  [Time scarcity (e.g., “I don’t have time to cook”)],
  [“What gets in the way of eating the way you’d like to, time, money, cooking skills, something else?”],
  [Barriers and self-efficacy],

  [TTM Stage],
  [Ambivalence (e.g., “I know I should, but...”)],
  [“Where would you say you are with healthy eating—thinking about it, just starting, or already making changes?”],
  [Stage classification],
)

The illustrative themes listed above are examples only. Actual themes will be derived from thematic analysis of the preliminary survey’s open-ended responses. The mapping of themes to TPB constructs will be finalized after the preliminary phase.

*Table 3.2:* Dialogue State Tracking Variables

#table(
  columns: 5,
  stroke: 0.5pt,
  align: (left, left, left, left, left),

  [*Variable*], [*Type*], [*Example Values*], [*Purpose*], [*Update Trigger*],

  [attitude_coverage],
  [Boolean],
  [true / false],
  [Track if attitude has been sufficiently discussed],
  [After user response to attitude prompt],

  [attitude_sentiment], [Float], [-1.0 to 1.0], [Preliminary valence detection], [After each user turn],

  [norms_coverage], [Boolean], [true / false], [Track if social norms discussed], [After response to norms prompt],

  [pbc_coverage], [Boolean], [true / false], [Track if PBC discussed], [After response to PBC prompt],

  [pbc_barriers],
  [List],
  [["time", "cost", "skills"]],
  [Extracted barriers (themes from preliminary survey)],
  [After user mentions barriers],

  [stage_indicators], [List], [["planning", "action_past_tense"]], [Linguistic markers for TTM], [After each turn],

  [extracted \_constraints],
  [Dict],
  [{"max_time": 20, "budget": "low"}],
  [Practical constraints for Step 6],
  [After user mentions resources],

  [pending \_clarifications], [List], [["cooking \_confidence"]], [Topics needing follow-up], [When NER confidence low],

  [session_turn_count], [Integer], [1-50], [Conversation length], [After each turn],

  [inference \_confidence], [Float], [0.0-1.0], [Overall confidence in current state], [Continuously updated],
)

*Table 3.3:* Open-Source Tools and Datasets

#table(
  columns: (auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left),

  [*Component*], [*Tool/Model*], [*Purpose*],

  [Conversation Management],
  [LangChain],
  [Dialogue flow management, state tracking, and prompt chaining for conversational agents],

  [Language Model (Base)],
  [Llama 3 / 3.1 (8B, 70B) or Mistral 7B],
  [Core language model for response generation; can be fine-tuned for health coaching contexts],

  [Efficient Fine-tuning],
  [Unsloth or LoRA],
  [Parameter-efficient fine-tuning to adapt base models to health coaching domains with limited computational resources],

  [Named Entity Recognition (NER)],
  [bert-fda-nutrition-ner],
  [BERT-based model trained on FDA FoodData Central for extracting nutritional entities, ingredients, and food components from text ],

  [Medical Dialogue Data],
  [MedSynth],
  [10,000+ synthetic medical dialogue-note pairs covering over 2000 ICD-10 codes; useful for understanding clinical conversation structure],

  [Health Coaching Framework],
  [openCHA],
  [Open-source conversational health agent framework with behavioral theory integration; provides reference architecture for health coaching applications @abbasian2025opencha],

  [Health Coaching Dialogues],
  [MHC-Coach Dataset],
  [Synthetic health coaching conversation data for fine-tuning conversational tone in behavior change interventions @mantena2025mhccoach],
)

=== Step 2: TPB Construct Inference
The second step transforms the raw conversational data collected in Step 1 into quantitative scores for the three core TPB constructs: Attitude, Subjective Norms, and Perceived Behavioral Control. This inference process leverages the empirically derived theme taxonomy and population-specific weights established during the preliminary survey phase, converting natural language into psychologically meaningful measurements that drive subsequent intervention decisions.

The system first detects the presence and intensity of themes from the empirically derived taxonomy established in the preliminary phase. Each theme (e.g., "time scarcity," "cost concerns," "family pressure," "taste expectations") corresponds to a specific barrier or facilitator identified through thematic analysis of the open-ended survey responses. A fine-tuned DeBERTa-v3 model performs multi-label classification on the user's recent conversation window (typically the last 3–5 turns), outputting confidence scores for each theme's presence.

The model will be trained on the manually annotated corpus from the preliminary survey, where open-ended responses will be paired with theme labels identified by trained researchers. The dataset will be split 80/10/10 for training, validation, and testing. Training used binary cross-entropy loss with class weights to address imbalance in theme frequencies. Model performance is evaluated using precision, recall, and F1-score for each theme, with an acceptance threshold of F1 > 0.80 required for deployment.

Each theme in the taxonomy is mapped to one or more TPB constructs based on the theoretical framework and validated during the preliminary phase. This mapping matrix defines the contribution of theme $i$ to construct $c$ as a weight $m_{"ic"} in [0,1]$, where values indicate the strength of association (e.g., "time scarcity" maps primarily to PBC with weight $m_{"ic"} = 0.9$, but may also influence Attitude with $m_{"ic"} = 0.3$). The mapping was established through expert review by behavioral scientists during the preliminary phase and can be refined as additional data accumulate.

For each TPB construct, a continuous score is computed using a weighted aggregation of detected themes:


#align(center + horizon)[
  $"Score"_"construct" = frac(sum{i=1}^{n} ( w_i times m_{"ic"} times "confidence"i times "intensity"i ), sum{i=1}^{n} ( w_i times m{"ic"} times "max_intensity" ))$
]

where:
- $w_i$ represents the population-specific regression weight for theme $i$ (derived from the quantitative survey)
- $m_{"ic"}$ is the mapping weight of theme $i$ to the target construct $c$
- $"confidence"_i$ is the classifier's confidence score for theme $i$ (range 0–1)
- $"intensity"_i$ is the normalized frequency of theme-related language in the conversation window, computed as the proportion of utterances containing theme indicators relative to total utterances
- $"max_intensity"$ is the maximum possible intensity (typically 1.0 for a conversation fully focused on that theme)

The denominator normalizes scores to a 0–1 range, which can be scaled to match the original Likert-scale range (1–5 or 1–7) for consistency with the training data. This formula accounts for both the presence of themes and their relative prominence in the conversation, weighted by population-specific importance and theoretical mapping.

For contexts where theme intensities are not available or confidence is not tracked, a simplified version may be used during prototyping:

#align(center + horizon)[
  $"Score"_"construct" = frac(sum{i=1}^{n} ( w_i times "theme_intensity"i ), sum{i=1}^{n} w_i)$
]

where $"theme_intensity"_i$ represents the raw frequency or strength of theme $i$ in the conversation.

To improve robustness and handle the inherent ambiguity of natural language, the system employs an ensemble of three complementary approaches:

- Fine-tuned DeBERTa-v3 for multi-label theme classification: This serves as the primary model, leveraging its strong performance on natural language understanding tasks and ability to capture contextual nuances.
- Regression head on RoBERTa for direct construct scoring: An auxiliary model that bypasses explicit theme detection and directly predicts construct scores from text, trained on the same labeled corpus. This provides a check against theme detection errors and captures holistic patterns that may not reduce cleanly to discrete themes.
- A lightweight approach using keyword dictionaries derived from the thematic analysis, applied when neural model confidence falls below threshold (e.g., < 0.6) or for out-of-vocabulary expressions not well-represented in the training data.

Final construct scores are computed as weighted averages:

#align(center + horizon)[
  $"Score"_"final" = alpha times "Score"_"deberta" + beta times "Score"_"roberta" + gamma times "Score"_"rule"$
]

where $alpha = 0.6$, $beta = 0.3$, and $gamma = 0.1$ when $"confidence"_"deberta" > 0.85$. When confidence is lower, the system may trigger clarification questions (as described in Step 1) before finalizing scores.

Because psychological states are not static, the system maintains a rolling window of recent inferences to track changes over time. For each session, construct scores are computed at the turn level and then aggregated using exponential smoothing:

#align(center + horizon)[
  $"Score"_"smoothed" = lambda times "Score""current" + (1 - lambda) times "Score"_"previous"$
]

where $lambda = 0.3$ gives greater weight to recent utterances while preserving historical context. This approach, informed by longitudinal findings that PBC fluctuates with life circumstances [@bassett-gunterOhBabyMotivation2013], enables the system to detect gradual shifts and respond appropriately.

When the ensemble's confidence for any construct falls below a threshold (e.g., $0.6$), or when themes are detected but mapping weights are ambiguous, the system flags the need for clarification. This information is passed back to Step 1's dialogue state tracker, which may trigger follow-up questions in subsequent turns to disambiguate. For example, if PBC inference is low-confidence due to mixed signals about cooking skills, the system might ask: "You mentioned both feeling confident in the kitchen and struggling with meal prep, can you tell me more about that?"

The weights $w_i$ used in the scoring formula are derived from the multiple linear regression analysis conducted during the preliminary quantitative survey. As described in Section II, the regression model:

#align(center + horizon)[
  $"BI" = beta_0 + beta_1 A + beta_2 "SN" + beta_3 "PBC" + epsilon$
]

yields standardized coefficients that represent the relative contribution of each construct to behavioral intention in the target population. These coefficients are used to calibrate the importance of each theme within its associated construct, ensuring that the computational model reflects empirically observed relationships rather than arbitrary assumptions @rahman2023tpbnlp.

A vector of three continuous scores $"Score""Attitude"$, $"Score""SN"$, $"Score"_"PBC"$ with associated confidence levels, serves as a key input to Step 3 (TTM Stage Estimation). These scores provide the psychological context necessary for accurate stage classification, as they capture the specific barriers and facilitators that influence the user's readiness to change. Additionally, the theme-level detections are preserved for use in Step 5, where specific barriers are targeted with tailored interventions.

During system development and pilot testing, inferred construct scores will be periodically compared against ground truth scores obtained through brief survey administrations with a subset of users. This validation step ensures that the NLP inference maintains accuracy as the system interacts with users and that any drift in model performance is detected early. Mean Absolute Error (MAE) and Pearson correlation $r$ between inferred and survey-measured scores will be tracked as key quality metrics:

#v(10pt)

#align(center + horizon)[
  $"MAE" = frac(1, n) sum_{i=1}^{n} |y_i - hat{y}_i|$
]

#v(10pt)

#align(center + horizon)[
  $r = frac(sum_{i=1}^{n} (x_i - bar{x})(y_i - bar{y}), sqrt(sum_{i=1}^{n} (x_i - bar{x})^2 sum_{i=1}^{n} (y_i - bar{y})^2))$
]

#v(10pt)

*Table 4.1: *Example Theme-to-Construct Mapping Matrix

#table(
  columns: (auto, auto, auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, left, left, left),

  [*Theme Category*],
  [*Illustrative Theme*],
  [*Description*],
  [*Attitude Weight*],
  [*Subjective Norm Weight*],
  [*PBC Weight*],

  [Time Constraints], [Time Scarcity], ["I don't have time to cook"], [0.2], [0.1], [0.9],

  [Financial Barriers], [Cost Concerns], ["Healthy food is too expensive"], [0.3], [0.2], [0.8],

  [Social Environment], [Family Resistance], ["My family won't eat healthy food"], [0.2], [0.9], [0.3],

  [Skills & Knowledge], [Cooking Skills Deficit], ["I don't know how to cook"], [0.1], [0.1], [0.9],
)

*Table 4.3:* Open-Source Tools and Datasets

#table(
  columns: (auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left),

  [*Component*], [*Tool/Model*], [*Purpose*],

  [Theme Classification], [DeBERTa-v3 (large or base)], [Multi-label classification of themes],

  [Direct Regression], [RoBERTa-base with regression head], [Direct construct score prediction],

  [Training Framework], [PyTorch Lightning], [Model training and evaluation],

  [Ensemble Implementation], [Scikit-learn (VotingRegressor)], [Weighted averaging across models],

  [Primary Training Corpus],
  [Quali-quanti survey data],
  [Open-ended responses + TPB Likert scores (collected in preliminary phase)],

  [Validation Dataset], [Held-out survey responses (10%)], [Model evaluation and threshold tuning],

  [Synthetic Augmentation], [openCHA framework], [Additional training examples for rare themes @abbasian2025opencha],

  [Keyword Dictionaries], [Custom-built from thematic analysis], [Rule-based fallback],
)

#v(10pt)

=== Step 3: Stage Estimation (TTM)
The third step determines the user's current stage of change according to the Transtheoretical Model, classifying them into one of five stages: Pre-contemplation, Contemplation, Preparation, Action, or Maintenance. This stage classification determines which intervention mode will be selected in Step 4, ensuring that support is developmentally appropriate for the user's readiness to change.

Rather than implementing a complex ensemble, the system uses a simplified two-tier classification approach:
- Primary: Fine-tuned small language model for direct stage classification from conversation
- Fallback: Rule-based pattern matching for cases where model confidence is low

This simplified approach reduces computational overhead while maintaining accuracy sufficient for intervention matching. The system never presents direct staging questions to users unless confidence is low and clarification is needed.

A lightweight DistilBERT or BERT-small model is fine-tuned on the TTM-annotated corpus from the preliminary survey, where open-ended responses are paired with stage labels from standard TTM staging questions. The model takes as input the user's recent conversation window (typically the last 3-5 turns, up to 512 tokens) and outputs a probability distribution across the five stages.

#align(center)[
  $P("stage" = s | text) = "softmax"(W dot.op h + b)$
]

where $h$ is the hidden representation from the transformer, $W$ is a weight matrix, and $b$ is a bias term. The predicted stage is the one with highest probability:

#align(center)[
  $"stage"_"pred" = "argmax"_s P("stage" = s | text)$
]

When the fine-tuned model's confidence falls below threshold, the system falls back on rule-based pattern matching using linguistic markers identified in the literature [@horwathUsefulBasisInterventions2013; @wykerBehavioralChangeTheories2010]. Table 5.1 summarizes key markers for each stage.

Based on best practices in conversational AI for health coaching, the system uses the following confidence thresholds:

High confidence ($P_max >= 0.7$): Accept the model's classification and proceed to Step 4

Medium confidence ($0.5 <= P_max < 0.7$): Accept classification but flag for potential clarification in future turns if patterns persist

Low confidence ($P_max < 0.5$): Trigger a single, naturally-framed clarification question to confirm stage

The clarification question is designed to feel conversational rather than like a survey item. For example:

`Based on what you've shared, it sounds like you're thinking about making changes but haven't quite started yet. Would that be accurate?`

The user's response is then fed back into the classifier for updated prediction.

Following longitudinal evidence that stage transitions are meaningful indicators of progress [@horwathUsefulBasisInterventions2013], the system tracks stage classifications across sessions to detect forward movement, backsliding, or stalling.

For each session, the system computes:

#align(center)[
  $"stage"_"session" = "mode"("stage"_t "for" t in "session")$
]

where the mode (most frequent classification) across turns in a session provides a stable session-level estimate.

Stage transitions are detected when:

#align(center)[
  $"stage""session_current" != "stage""session_previous"$
]

and the change persists across at least two consecutive sessions to avoid oscillation. When forward movement is detected (e.g., Contemplation → Preparation), the system may offer positive reinforcement. When backsliding is detected (e.g., Action → Contemplation), the system may explore barriers and offer additional support.

The primary training data comes from the preliminary survey, where each participant provided:

Open-ended responses about their eating habits and readiness to change
- Standard TTM staging question responses (ground truth labels)
- The dataset is also split 80/10/10 for training, validation, and testing. Model performance is evaluated using accuracy, precision, recall, and F1-score for each stage, with an acceptance threshold of weighted F1 > 0.80 required for deployment.

*Table 5.1:* Linguistic Markers for TTM Stage Classification

#table(
  columns: (auto, auto, auto, 150pt, 70pt),
  stroke: 0.5pt,
  align: (left, left, left, left, left),

  [*Stage*], [*Description*], [*Linguistic Markers*], [*Example Utterances*], [*Key References*],

  [Pre-contemplation],
  [Not considering change; unaware or under-aware of need],
  [Lack of change-related language; present-tense focus; external attributions],
  [
    - "I don't need to change anything."
    - "My diet is fine the way it is."
    - "I've tried before and it didn't work."
  ],
  [@horwathUsefulBasisInterventions2013],

  [Contemplation],
  [Thinking about change; ambivalent; weighing pros and cons],
  ["Should" statements; conditional language; ambivalence markers],
  [
    - "I know I should eat better, but..."
    - "I've been thinking about it."
    - "Maybe someday."
  ],
  [@wykerBehavioralChangeTheories2010],

  [Preparation],
  [Intending to act soon; making small changes; planning],
  [Future tense with specific timing; action-oriented language; commitment markers],
  [
    - "I'm planning to start next week."
    - "I've been buying more vegetables."
    - "I'm going to meal prep on Sundays."
  ],
  [@horwathUsefulBasisInterventions2013],

  [Action],
  [Actively modifying behavior; recent changes (\<6 months)],
  [Past tense describing recent changes; specific behaviors; duration markers],
  [
    - "I've been cooking at home all week."
    - "I started meal prepping last month."
    - "I'm tracking what I eat now."
  ],
  [@prochaska1997ttm],

  [Maintenance],
  [Sustaining changes long-term (>6 months); relapse prevention],
  [Long-term duration markers; identity shifts; coping language],
  [
    - "I've been eating this way for years."
    - "It's just part of my routine now."
    - "When I'm stressed, I have strategies to stay on track."
  ],
  [@greeneBaselineTranstheoreticalDietary2013],
)

*Table 5.2:* Confidence Thresholds and Clarification Logic

#table(
  columns: (auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, left),

  [*Confidence Level*], [*Threshold*], [*Action*], [*Clarification Question Example*],

  [High], [$P_"max" >= 0.7$], [Accept classification; proceed to Step 4], [—],

  [Medium],
  [$0.5 <= P_"max" < 0.7$],
  [Accept classification but flag for monitoring; may ask clarification if pattern persists across sessions],
  ["You seem to be thinking about changes—would you say you're planning to start soon or still considering?"],

  [Low],
  [$P_"max" < 0.5$],
  [Trigger clarification question; use response to re-classify],
  ["Based on what you've shared, it sounds like you're thinking about making changes but haven't quite started yet. Would that be accurate?"],
)

*Table 5.3:* Open-Source Tools and Datasets

#table(
  columns: (auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left),

  [*Component*], [*Tool/Model*], [*Purpose*],

  [Lightweight Classifier], [DistilBERT or BERT-small], [Fine-tuned primary classifier for stage prediction],

  [Training Framework], [PyTorch Lightning or Hugging Face Transformers], [Model training and evaluation],

  [Primary Training Corpus], [TTM-annotated survey data], [Open-ended responses + stage labels from preliminary survey],

  [Validation Dataset], [Held-out survey responses (10%)], [Model evaluation and threshold tuning],

  [Rule-Based Pattern Matching],
  [Custom regex patterns from linguistic markers],
  [Fallback classifier for low-confidence cases],

  [Interpretability], [SHAP or LIME], [Feature importance analysis to validate linguistic markers],
)

#v(10pt)

=== Step 4: Intervention Mode Selection
The fourth step translates the user's TTM stage classification from Step 3 into a coarse intervention mode. This mode determines the general therapeutic approach appropriate for the user's current readiness, applies decades of clinical guidelines from the Transtheoretical Model. The mode serves as a high-level directive that structures the subsequent TPB-targeted intervention in Step 5.

Theoretical Grounding. The Transtheoretical Model posits that individuals at different stages of change require qualitatively different kinds of support [@prochaska1997ttm; @prochaska2005transtheoretical]. Interventions that match the individual's stage are more effective than one-size-fits-all approaches [@bridle2009stagematched; @kleis2021ttm]. Each stage is associated with specific processes of change that facilitate progression:
- Pre-contemplation: Consciousness raising, dramatic relief, environmental reevaluation
- Contemplation: Self-reevaluation, decisional balance
- Preparation: Self-liberation (commitment), helping relationships
- Action: Reinforcement management, counterconditioning, stimulus control
- Maintenance: Relapse prevention, lifestyle integration

These processes are grouped into broader intervention modes that guide the system's conversational strategy.

- Input Precondition: High-Confidence Stage Classification. Step 4 only executes when Step 3 has achieved a high-confidence stage classification ($P_"max" >= 0.7$). If Step 3 cannot reach this threshold after clarification attempts, the system continues clarification dialogue rather than proceeding. This ensures that all interventions are grounded in reliable stage assessments.
- Deterministic Stage-to-Mode Mapping. The system employs a simple rule-based lookup table derived from established TTM clinical guidelines [@bridle2009stagematched; @kleis2021ttm]. The mapping is deterministic and unconditional, ensuring consistent application of evidence-based principles. Table 4.1 presents the complete mapping.
- Mode Definition and Scope. Each mode encompasses a family of dialogue strategies and interaction patterns, but does not prescribe specific content, that is delegated to Step 5. The mode determines:
  - The primary goal of the conversation (e.g., raise awareness, resolve ambivalence)
  - The tone and framing (e.g., educational for pre-contemplation, supportive for action)
  - The type of content to prioritize (e.g., pros/cons for contemplation, skill-building for preparation)
  - The interaction length and depth (e.g., brief check-ins for maintenance)

The mode is selected immediately after stage classification. Since Step 3 only passes forward high-confidence classifications, no confidence flags are needed in Step 4.

Output Specification. Step 4 outputs a structured object containing:
- mode: string (one of: "awareness", "ambivalence-resolution", "planning", "coping", "relapse-prevention")
- stage_origin: string (the stage that produced this mode)
- goal: string (brief description of the mode's purpose)
- suggested_processes: list of strings (TTM processes associated with this mode)

When users return across multiple sessions, the system tracks stage changes and adjusts modes accordingly. Table 6.2 outlines the transition logic.

*Table 6.1:* Stage-to-Mode Mapping

#table(
  columns: (auto, auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, left, left),

  [*TTM Stage*], [*Intervention Mode*], [*Primary Goal*], [*Associated TTM Processes*], [*Key References*],

  [Pre-contemplation],
  [Awareness],
  [Raise consciousness about the need for change; provide personalized feedback],
  [Consciousness raising, dramatic relief, environmental reevaluation],
  [@bridle2009stagematched @prochaska1997ttm],

  [Contemplation],
  [Ambivalence-resolution],
  [Resolve ambivalence; tip the decisional balance toward change],
  [Self-reevaluation, decisional balance],
  [@kleis2021ttm @wykerBehavioralChangeTheories2010],

  [Preparation],
  [Planning],
  [Build commitment; create actionable plans; enhance self-efficacy],
  [Self-liberation (commitment), helping relationships],
  [@horwathUsefulBasisInterventions2013 @greeneBaselineTranstheoreticalDietary2013],

  [Action],
  [Coping],
  [Support active behavior change; problem-solve barriers; reinforce successes],
  [Reinforcement management, stimulus control],
  [@kleis2021ttm @sharma2025llm],

  [Maintenance],
  [Relapse-prevention],
  [Prevent relapse; consolidate gains; prepare for lapses],
  [Relapse prevention, lifestyle integration],
  [@bridle2009stagematched],
)

*Table 6.2:* Transition Logic Across Sessions

#table(
  columns: (auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left),

  [*Scenario*], [*Mode Adjustment*], [*Rationale*],

  [Forward movement detected (e.g., Contemplation → Preparation)],
  [Switch to new mode; optionally include a brief acknowledgment of progress],
  [Celebrate progress and provide stage-appropriate support],

  [Backsliding detected (e.g., Action → Contemplation)],
  [Switch to new mode; include non-judgmental exploration of barriers],
  [Address setbacks without discouragement; understand causes],

  [Same stage for multiple sessions],
  [Maintain mode but increase depth or vary examples; consider if progress is stalling],
  [Prevent boredom; intensify intervention if needed],
)

*Table 6.3:* Open-Source Tools and Datasets
#table(
  columns: (auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left),

  [*Component*], [*Tool/Model*], [*Purpose*],

  [Mode Selection Logic], [Rule-based Python dictionary / state machine], [Deterministic stage→mode mapping],

  [Prompt Template Management], [Jinja2 or LangChain prompt templates], [Store and render mode-specific system prompts],

  [TTM Intervention Guidelines],
  [Systematic reviews: @bridle2009stagematched @kleis2021ttm @greeneBaselineTranstheoreticalDietary2013],
  [Design of mode-specific strategies],
)

#v(10pt)

=== Step 5: TPB-Targeted Intervention Choice
This determines what to intervene on by identifying the weakest TPB determinant and selecting an appropriate behavioral change technique (BCT). This step integrates the psychological profile from Step 2 with the readiness context from Steps 3-4, ensuring that interventions are both psychologically precise and stage-appropriate.

The Behavior Change Technique Taxonomy (BCTTv1) provides a standardized vocabulary for characterizing intervention components [@teixeira2022health]. Mapping TPB constructs to specific BCTs enables reproducible, theory-grounded intervention design.

Inputs to Step 5. Step 5 receives:
- From Step 2: TPB construct scores: $"Score"_A$, $"Score""_SN"$, $"Score""_PBC"$ (raw scores, typically 1-5 scale)
- From Step 3: TTM stage classification (high confidence, $P_"max" >= 0.7$)
- From Step 4: Intervention mode (awareness, ambivalence-resolution, planning, coping, or relapse-prevention)

Weakest Link Identification. The system identifies the weakest TPB determinant by comparing raw scores:
$"WeakestDeterminant" = "argmin"_{c in {A, "SN", "PBC"}} "Score"_c$

In cases of ties, the system targets both determinants sequentially, prioritizing the one more amenable to change in the current stage (e.g., in Preparation, PBC may be addressed before Subjective Norms if tied).

As established in the theoretical framework, the balance of TPB vs. TTM influence shifts by stage:

- Pre-contemplation & Contemplation: TTM-led with TPB context. The primary goal is stage progression, not direct modification of TPB constructs. TPB scores provide context about why the user is stuck but do not drive intervention content directly. The system selects BCTs focused on consciousness raising, dramatic relief, or decisional balance.
- Preparation & Action: TPB-led with TTM support. The system identifies the weakest TPB determinant and targets it directly using stage-appropriate BCTs. TTM ensures the intervention maintains action-orientation and appropriate intensity.
- Maintenance: TTM-led relapse prevention with TPB monitoring. The focus is on sustaining change, but TPB scores are tracked for early signs of regression (e.g., declining PBC) that may trigger booster interventions.

The system references a predefined library mapping (Stage, Weak Determinant) pairs to specific BCTs and corresponding LLM prompt instructions. The library is populated from systematic reviews of TPB-based interventions [@mcdermott2015tpb; @borraccino2016tpbmapping] and the BCTTv1 taxonomy [@teixeira2022health].
Handling Multiple Weak Determinants. When two or more constructs have identical scores (or scores within a small tolerance, e.g., $|"Score""_c1" - "Score""_c2"| < 0.2$), the system addresses them sequentially across multiple turns.

This step outputs a structured object containing:
- weakest_determinant: string ("attitude", "subjective_norm", "pbc", or "multiple")
- bct_code: string (BCTTv1 taxonomy code, e.g., "4.1" for "Instruction on how to perform")
- bct_name: string (human-readable BCT name)
- targeting_strategy: string (brief description for LLM prompt construction)
- stage_context: string (current stage, for reference)
- confidence: float (inherited from Step 2 for the target construct)

If multiple determinants are targeted, the output includes a list of objects with an execution order.

The identified BCT and targeting strategy inform both Step 6 (feasible dish generation) and Step 7 (response generation). For example, if the target is PBC with BCT "4.1 Instruction on how to perform", Step 6 prioritizes simple, low-skill recipes with step-by-step instructions.

*Table 7.1:* Stage-Dependent Targeting Logic

#table(
  columns: (auto, auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, left, left),

  [*Stage Group*], [*Stages*], [*Primary Driver*], [*Role of TPB*], [*Role of TTM*],

  [Early Stages],
  [Pre-contemplation, Contemplation],
  [TTM-led],
  [Provides context about *why* user is stuck; informs exploration but does not drive content],
  [Selects processes (consciousness raising, decisional balance) to move user to next stage],

  [Middle Stages],
  [Preparation, Action],
  [TPB-led],
  [Identifies weakest determinant; selects BCTs to directly modify that construct],
  [Ensures action-orientation; provides stage-appropriate intensity and framing],

  [Late Stage],
  [Maintenance],
  [TTM-led with TPB monitoring],
  [Monitored for regression signs; triggers booster interventions if scores decline],
  [Focuses on relapse prevention, lifestyle integration, coping with high-risk situations],
)

*Table 7.2:* Open-Source Tools and References

#table(
  columns: (auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left),

  [*Component*], [*Tool/Reference*], [*Purpose*],

  [BCT Taxonomy],
  [BCTTv1 (Behavior Change Technique Taxonomy v1)],
  [Standardized vocabulary for intervention components @teixeira2022health],

  [TPB Intervention Guidelines],
  [Systematic reviews: @mcdermott2015tpb; @borraccino2016tpbmapping; @rich2018tpbreview],
  [Evidence-based mapping of TPB constructs to intervention strategies],

  [Targeting Logic],
  [Rule-based Python decision tree],
  [Implements weakest link identification and sequential targeting],

  [Jinja2 or LangChain prompt templates], [Store and render BCT-specific LLM instructions],

  [Optional LLM-based Selection],
  [Fine-tuned Llama 3 / Mistral with (stage, determinant) input],
  [Alternative approach for more nuanced strategy selection],
)

=== Step 6: Feasible Dish/Plan Generation
This step translates the intervention focus from Step 5 into concrete, actionable food recommendations that respect the user's real-world constraints. By grounding suggestions in the user's actual capabilities and resources, this step implements the Perceived Behavioral Control construct and ensures that interventions are not only theoretically appropriate but also practically executable.

Rather than relying solely on explicit statements, the system infers practical constraints from the user's PBC score and conversation history. Table 8.1 presents the inference mapping. This approach is grounded in the finding that PBC directly predicts actual behavior change [@bassett-gunterOhBabyMotivation2013] and that low PBC often manifests as specific practical barriers.

The primary recipe source is RecipeNLG, a large-scale dataset containing 2.2 million recipes with structured metadata including ingredients, instructions, preparation time, and nutritional information [@bien2020recipenlg]. Recipes are pre-filtered to include those culturally appropriate for the Filipino context, with supplementary recipes from Filipino sources where available. Each recipe in the index is stored with:

- Embedding vector (384-dim from all-MiniLM-L6-v2)
- Metadata: prep time, cook time, total time, difficulty level (1-5), equipment required, ingredients list, cuisine type, dietary tags, cost estimate (low/medium/high), health score
- Retrieval-Augmented Generation (RAG) Pipeline. The system implements a hybrid search architecture combining semantic similarity with metadata filtering:
- Query Embedding: The user's request or context (e.g., "something quick and healthy") is encoded using the same all-MiniLM-L6-v2 model to produce a 384-dim query vector.
- Initial Retrieval: FAISS IVF (Inverted File Index) performs approximate nearest neighbor search to retrieve the top $k = 100$ semantically similar recipes.

Retrieved recipes are filtered based on inferred constraints:
- $"max_time"$: total time <= user's available time
- $"max_difficulty"$: difficulty level <= user's skill level
- $"equipment"$: required equipment subset of user's available equipment
- $"budget"$: cost estimate matches user's budget
- $"dietary"$: satisfies any dietary restrictions

Filtered results are re-ranked using a multi-criteria scoring function:
$"FinalScore" = w_1 dot.op "HealthScore" + w_2 dot.op (1 - "Difficulty") + w_3 dot.op "PreferenceMatch" + w_4 dot.op "NoveltyBonus"$

where:
- $"HealthScore"$ is normalized nutrient density score (0-1) based on dietary guidelines
- $"Difficulty"$ is normalized recipe difficulty (0-1, where 1 is hardest)
- $"PreferenceMatch"$ is cosine similarity between recipe embedding and user preference profile
- $"NoveltyBonus"$ (0.1) is added if recipe hasn't been suggested in last 5 interactions
-
$w_1 = 0.4$, $w_2 = 0.3$, $w_3 = 0.2$, $w_4 = 0.1$ (weights determined via pilot testing)

Handling No Matches. If filtering yields zero recipes, the system relaxes constraints progressively:
- First relaxation: Increase max time by 50% and/or increase difficulty by 1 level
- Second relaxation: Suggest meal modifications (e.g., "You could try a simpler version using pre-cut vegetables")
- Final fallback: Provide general tips aligned with the BCT (e.g., time-saving strategies, budget-friendly shopping tips)

This step outputs a structured object containing:
- recipes: list of recipe objects (up to 3), each with:
- id: unique identifier
- name: recipe title
- ingredients: list with quantities
- instructions: step-by-step text
- prep_time: minutes
- difficulty: 1-5
- health_score: 0-1
- bct_alignment: string explaining why this recipe matches the BCT
- fallback_used: boolean indicating if constraints were relaxed
- general_tips: string (if no recipes found)


*Table 8.1:* Constraint Inference from PBC Scores
#table(
  columns: (auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, left),

  /* --- Header row --- */
  [*PBC Score Range*], [*Inferred Skill Level*], [*Inferred Time Availability*], [*Inferred Equipment Complexity*],

  /* --- Very Low PBC --- */
  [1.0 - 2.0 (Very Low)],
  [Beginner: needs step-by-step instruction, basic techniques only],
  [Very Limited: < 15 min per meal],
  [Basic only: stovetop, microwave, no specialized equipment],

  /* --- Low PBC --- */
  [2.1 - 3.0 (Low)],
  [Novice: can follow simple recipes, limited technique repertoire],
  [Limited: 15-30 min per meal],
  [Basic plus blender, basic baking sheets],

  /* --- Moderate PBC --- */
  [3.1 - 4.0 (Moderate)],
  [Intermediate: comfortable with common techniques, can adapt recipes],
  [Moderate: 30-45 min per meal],
  [Standard kitchen equipment: oven, stovetop, blender, food processor optional],

  /* --- High PBC --- */
  [4.1 - 5.0 (High)],
  [Advanced: confident with diverse techniques, can improvise],
  [Flexible: up to 60+ min when desired],
  [Full kitchen: all standard equipment, willing to use specialized tools],
)

*Table 8.2:* RAG Pipeline Parameters
#table(
  columns: (auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left),

  [*Component*], [*Parameter*], [*Value*],

  [Embedding Model], [Model], [all-MiniLM-L6-v2],

  [Embedding Dimension], [384],

  [Vector Index], [Index Type], [FAISS IVF (Inverted File Index) with 100 clusters],

  [Similarity Metric], [Inner product (cosine similarity on normalized vectors)],

  [Initial Candidates ($k$)], [100],

  [Metadata Filtering], [Time Filter], [$"total_time" <= "user_max_time"$],

  [Difficulty Filter], [$"difficulty" <= "user_skill_level"$],

  [Equipment Filter], [$"required_equipment" subset "user_equipment"$],

  [Budget Filter], [$"cost_estimate" = "user_budget"$],

  [Dietary Filter], ["dietary_tags" "satisfies" "user_restrictions"],

  [Re-ranking Weights], [Health Score ($w_1$)], [0.4],

  [Difficulty (inverse) ($w_2$)], [0.3],

  [Preference Match ($w_3$)], [0.2],

  [Novelty Bonus ($w_4$)], [0.1],
)

*Table 8.4:* Open-Source Tools and Datasets
#table(
  columns: (auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left),

  [*Component*], [*Tool/Model*], [*Purpose*],

  [Primary Recipe Dataset], [RecipeNLG @bien2020recipenlg], [2.2M recipes with structured metadata],

  [Embedding Model], [sentence-transformers/all-MiniLM-L6-v2], [384-dim embeddings for semantic search],

  [Vector Database], [FAISS (Facebook AI Similarity Search)], [Efficient similarity search at scale],

  [Constraint Extraction (fallback)], [spaCy with custom training], [Extract explicit constraints when mentioned],

  [Re-ranking], [Custom Python with NumPy/Pandas], [Multi-criteria scoring and filtering],

  [Health Score Reference], [USDA FoodData Central], [Nutrient density calculations],

  [Filipino Recipe Supplement],
  [Web-scraped from kawalingpinoy.com and similar sources],
  [Culturally familiar options for target population],
)

=== Step 7: Response Generation
The seventh and final step synthesizes all previous analyses into a coherent, natural language response delivered to the user. This step closes the loop by translating the stage-appropriate mode (Step 4), the targeted TPB construct with specific BCT (Step 5), and the feasible recipe recommendations (Step 6) into a supportive, personalized message that advances the user's change journey.

Step 7 receives:
- From Step 1: Conversation history (for context and coherence)
- From Step 4: Intervention mode and stage context
- From Step 5: Weakest determinant, BCT code and name, targeting strategy
- From Step 6: Recipe recommendations (structured objects) and/or general tips
- User metadata: Session count, user ID, any flags

Rather than using a single static prompt, the system assembles a custom prompt for the LLM that incorporates all relevant context. The prompt follows a structured template with the following components:
- System Role Definition: Establishes the assistant's identity and boundaries
- User Context Summary: Brief recap of user's stage, barriers, and goals
- Therapeutic Directive: The intervention mode and BCT to apply
- Concrete Materials: Recipe recommendations or tips from Step 6
- Conversation History: Recent turns for coherence
- Safety Guardrails: Explicit instructions on what to avoid

The primary response generator is Llama 3 8B, fine-tuned on health coaching dialogues using LoRA for parameter-efficient adaptation [@hu2023finetuning]. The fine-tuning dataset includes:

- MHC-Coach synthetic health coaching conversations [@mantena2025mhccoach]
- openCHA framework demonstration scripts [@abbasian2025opencha]
- Expert-written coaching responses paired with user queries from pilot testing
- For deployment scenarios with limited computational resources, a smaller distilled model (e.g., Llama 3.2 3B) may be substituted with minimal performance degradation.

Generated responses pass through a multi-stage validation pipeline before delivery:
- Recipe Validation: Verify that any mentioned recipes actually exist in the database and that nutritional claims are accurate
- Safety Filter: Detect harmful suggestions, medical advice, or triggering content using a BERT-based classifier
- Tone Check: Ensure language remains supportive, non-judgmental, and empathetic
- Hallucination Detection: Flag statements not grounded in the provided context
- Token Limit Enforcement: Truncate if necessary while preserving coherence

If any check fails, the system falls back to a templated response that acknowledges the limitation and redirects constructively.

The response generation component also updates the user's longitudinal record. After each interaction, the system:
- Stores the conversation turns
- Updates smoothed TPB scores using exponential smoothing ($lambda = 0.3$)
- Records any stage transitions detected
- Logs recipes suggested and user feedback (explicit or inferred)

This longitudinal data feeds back into Step 1 for future sessions, enabling the system to track changes over time as emphasized by Bassett-Gunter et al. [@bassett-gunterOhBabyMotivation2013] and Horwath et al. [@horwathUsefulBasisInterventions2013].

The generated response is delivered to the user, and their subsequent utterance returns the system to Step 1, continuing the conversational cycle. This closed-loop design enables continuous monitoring and adaptation, fulfilling the longitudinal tracking requirement identified in your literature review.

Table 9.1: Dynamic Prompt Template Structure

#table(
  columns: (auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left),

  [*Component*], [*Content*], [*Purpose*],

  [System Role],
  ["You are a supportive nutritional health coach applying the Transtheoretical Model and Theory of Planned Behavior. You are empathetic, non-judgmental, and focused on helping users make sustainable changes. You do not diagnose medical conditions or provide clinical advice."],
  [Establishes assistant identity and boundaries],

  [User Context],
  ["The user is a [age]-year-old in the [stage] stage of change. Their weakest TPB determinant is [determinant] with score [score]. They have mentioned barriers: [barriers]."],
  [Provides psychological profile for response tailoring],

  [Therapeutic Directive],
  ["Apply intervention mode: [mode]. Use BCT [bct_code]: [bct_name]. Targeting strategy: [strategy]. Maintain [mode-appropriate tone]."],
  [Ensures theoretical fidelity],

  [Concrete Materials],
  ["Recommend these recipes if appropriate: [recipe_names with brief descriptions]. General tips: [tips]. Explain why suggestions match their needs."],
  [Grounds response in feasible options],

  [Conversation History],
  ["Recent conversation:\nUser: [last_user_turn]\nAssistant: [last_assistant_turn]\nUser: [current_user_turn]"],
  [Maintains coherence and natural flow],

  [Safety Guardrails],
  ["Do not:\n- Diagnose medical conditions\n- Recommend extreme diets\n- Ignore mentions of disordered eating\n- Use shaming or judgmental language\n\nIf user mentions disordered eating, respond with: [crisis_response_template]"],
  [Prevents harmful outputs],
)

*Table 9.2:* Example Responses by Stage and BCT

#table(
  columns: (auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, left),

  [*Stage*], [*BCT*], [*User Input Context*], [*Example System Response*],

  [Pre-contemplation],
  [5.1 Information about health consequences],
  [User says: "I don't think my eating is that bad, I'm fine."],
  ["It sounds like you're feeling pretty okay with how things are, and that's completely valid. You mentioned you sometimes skip breakfast—did you know that eating something in the morning can help with energy and focus throughout the day? Just something to think about. No pressure at all."],

  [Contemplation],
  [9.2 Pros and cons],
  [User says: "I know I should eat better but I love my comfort foods."],
  ["That tension between what we know and what we love is so real. What do you think you'd miss most if you started making some changes? And on the flip side, what might be better if you ate a little differently—more energy, maybe, or feeling stronger?"],

  [Preparation],
  [4.1 Instruction on how to perform],
  [User says: "I'm ready to start meal prepping but I don't know where to begin."],
  ["That's exciting—taking that first step! Let's start super simple. Here's a 3-ingredient chicken and veggie sheet pan meal:\n\n1. Chop one chicken breast and one bell pepper into bite-sized pieces\n2. Toss with a little oil and your favorite seasoning\n3. Spread on a baking sheet and bake at 400°F for 20 minutes\n\nThat's it! How does that sound as a starting point?"],

  [Action],
  [1.2 Problem solving],
  [User says: "I've been cooking at home but yesterday I was too tired and ordered pizza."],
  ["First, great job cooking at home all those days! One slip doesn't erase progress. Being too tired is a real challenge—what could help on those low-energy days? Maybe having a frozen backup meal, or a super simple recipe like scrambled eggs with veggies that takes 5 minutes?"],

  [Maintenance],
  [1.4 Action planning],
  [User says: "I've been eating well for months but worried about the holidays."],
  ["It's smart to think ahead—that's exactly what helps people maintain changes long-term. Let's make a quick plan: What's one tricky situation you expect? If [situation] happens, then what could you do? Having a specific 'if-then' plan makes it much easier to cope in the moment."],
)

*Table 9.3: *Longitudinal Tracking Updates

#table(
  columns: (auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left),

  [*Data Element*], [*Update Method*], [*Purpose*],

  [Conversation History],
  [Append new turns to user session log],
  [Maintain context for future sessions; enable longitudinal analysis],

  [TPB Scores],
  [$"Score"_"smoothed" = 0.3 times "Score"_"current" + 0.7 times "Score"_"previous"$],
  [Track gradual changes in psychological state @bassett-gunterOhBabyMotivation2013],

  [TTM Stage],
  [If $"stage"_"session" != "stage"_"previous"$ and change persists 2+ sessions, update],
  [Detect forward movement or backsliding @horwathUsefulBasisInterventions2013],

  [Recipe Suggestions],
  [Log recipes suggested; infer engagement if user mentions trying them],
  [Improve future recommendations; track what works],
)

*Table 9.4:* Open-Source Tools and Datasets

#table(
  columns: (auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left),

  [*Component*], [*Tool/Model*], [*Purpose*],

  [Language Model], [Llama 3 8B (or 3.2 3B for lightweight deployment)], [Core response generation],

  [Fine-tuning Framework], [LoRA via Unsloth or Hugging Face PEFT], [Parameter-efficient adaptation to health coaching],

  [Fine-tuning Dataset], [MHC-Coach @mantena2025mhccoach], [Synthetic health coaching conversations],

  [Fine-tuning Dataset], [openCHA framework demos @abbasian2025opencha], [Reference implementations for health agents],

  [Safety Classifier],
  [BERT-based toxic comment classifier (fine-tuned on health contexts)],
  [Detect harmful or inappropriate content],

  [Tone Check], [Sentiment analysis models (e.g., cardiffnlp/twitter-roberta-base-sentiment)], [Ensure empathetic tone],

  [Prompt Templating], [LangChain or Jinja2], [Dynamic prompt construction],

  [Hallucination Detection], [Custom NER + fact-checking against recipe database], [Prevent fabricated recommendations],

  [Pipeline Orchestration], [openCHA framework @abbasian2025opencha], [Coordinate steps 1-7 in production],
)

#v(10pt)

== Testing and Evaluation Procedure

Intrinsic Evaluation (Technical Performance): Model performance will be measured using standard classification and regression metrics:

For classification tasks (e.g., theme classification, stage classification):

- Precision:
$ "Precision" = (T P) / (T P + F P) $
where $T P$ = true positives, $F P$ = false positives

- Recall:
$ "Recall" = (T P) / (T P + F N) $
where $F N$ = false negatives

- F1-Score:
$ "F1" = 2 times ("Precision" times "Recall") / ("Precision" + "Recall") $

- Accuracy:
$ "Accuracy" = (T P + T N) / (T P + T N + F P + F N) $
where $T N$ = true negatives

For regression tasks (e.g., TPB construct scoring):

- Mean Absolute Error (MAE): $ "MAE" = 1/n sum_(i=1)^n abs(y_i - hat(y)_i) $
  where $y_i$ = ground truth score, $hat(y)_i$ = predicted score, $n$ = number of samples

- Root Mean Square Error (RMSE): $ "RMSE" = sqrt(1/n sum_(i=1)^n (y_i - hat(y)_i)^2) $

- Coefficient of Determination ($R^2$): $ R^2 = 1 - ( sum_(i=1)^n (y_i - hat(y)_i)^2 ) / ( sum_(i=1)^n (y_i - bar(y))^2 ) $
  where $bar(y)$ = mean of ground truth values

- Pearson Correlation ($r$) between predicted and ground truth: formula as given in Section II

Cross-Validation: K-fold cross-validation ($k = 5$ or $10$) will be employed to ensure robustness of performance estimates.

Extrinsic Evaluation (Expert Validation):
- Nutritionist Review: Registered nutritionists will evaluate a stratified sample of chatbot responses for:
- Nutritional safety and accuracy
- Cultural appropriateness of recommendations
- Alignment with evidence-based dietary guidelines

- Theoretical Consistency Check: Behavioral science experts will verify that responses appropriately applying TPB and TTM principles

Extrinsic Evaluation (User Testing):

Usability Assessment:
- System Usability Scale (SUS): SUS score is computed as:
  - For odd-numbered items (1,3,5,7,9): subtract 1 from the user's response
  - For even-numbered items (2,4,6,8,10): subtract the user's response from 5
  - Sum these adjusted scores and multiply by 2.5 to obtain the SUS score (range 0–100)
  - Formula: $ "SUS" = 2.5 times ( sum_("odd items") ("response" - 1) + sum_("even items") (5 - "response") ) $
- Task Completion Rates: Proportion of user-initiated interactions resulting in successful task resolution
- Interaction Metrics: Session duration, conversation length, and dropout rates

Theoretical Impact Assessment:
- Pre-Post TTM Stage Assessment: Measurement of users' stage of change before and after interaction to detect progression (e.g., movement from Contemplation to Preparation). Statistical significance of stage shifts will be tested using McNemar's test or Stuart-Maxwell test for marginal homogeneity.
- Perceived Behavioral Control Change: Paired t-test or Wilcoxon signed-rank test to compare pre- and post-interaction PBC scores:
  $ t = bar(d) / (s_d / sqrt(n)) $
  where $bar(d)$ = mean difference, $s_d$ = standard deviation of differences, $n$ = sample size
- Determinant-Specific Satisfaction: Likert-scale items measuring user perception of how well the system addressed their specific weighted barriers; analyzed using descriptive statistics and thematic analysis of open-ended comments.

User Experience and Rapport:
- Therapeutic Alliance Measures: Adapted items assessing user trust, perceived empathy, and working alliance with the chatbot; scores will be averaged and compared to benchmark values.
- Qualitative Feedback: Open-ended user comments regarding helpfulness, areas for improvement, and emotional response to interactions; analyzed using content analysis.

Success Criteria: The system will be considered successful if it demonstrates:
1. Acceptable technical performance ($"F1" > 0.80$ for classification tasks; $"MAE" < 0.5$ on a 5-point scale for scoring tasks)
2. Expert validation ($≥ 85%$ of responses rated as nutritionally safe)
3. Positive user response ($"SUS" > 68$, above-average ratings for helpfulness)
4. Theoretical efficacy (demonstrable shift in TPB determinant scores or TTM stage progression with statistical significance at $alpha = 0.05$)

#v(10pt)


#bibliography("refs.bib")
