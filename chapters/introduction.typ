= Introduction

#v(10pt)

Maintaining healthy eating habits remains a challenge worldwide. The World Health Organization reports that unhealthy diets are a major risk factor for the global burden of disease, contributing to millions of deaths annually from non-communicable diseases (NCDs) such as cardiovascular conditions and diabetes @who2020healthy. Despite widespread awareness of dietary guidelines, a significant gap persists between knowledge and sustained behavioral change across diverse populations @kelly2023barriers.

In the Philippines, this global challenge manifests in alarming local statistics. The 2018-2019 Expanded National Nutrition Survey (ENNS) by the Department of Science and Technology's Food and Nutrition Research Institute (DOST-FNRI) revealed that only 12.7% of Filipino households met recommended vegetable consumption levels, while fruit consumption was even lower at 8.9% @fnri2020enns. This nutritional inadequacy contributes to the country's dual burden of malnutrition, where undernutrition coexists with rising rates of overweight and obesity, particularly in urban centers @fnri2020enns.

//gonzales is a sussy baka
Consider Carlos, a 24-year-old call center agent in Davao City. He knows the importance of eating vegetables, but his 10-hour night shifts, limited budget, and the convenience of street food near his workplace make healthy eating feel impossible. His story is not unique. In Davao City, rapid urbanization and the rise of the business process outsourcing (BPO) industry have created a demographic of young adults facing similar struggles. A 2023 national survey in the Philippines identified money (57.3%), time (16.6%), and access as top barriers for adults trying to eat healthily, with lower-income groups facing heightened financial and availability issues. In Davao City specifically, a study on millennial eating behaviors highlighted motivation challenges tied to busy lifestyles, suggesting education and supportive environments as solutions @laufente2023. Understanding and addressing these challenges in this specific population is the central motivation for this research.

Practical barriers present significant obstacles to healthy eating. The cost of fresh produce often exceeds the budgets of low-income households, while demanding work schedules leave little time for meal preparation @darmon2008does. Beyond finances and time, the food environment itself can be limiting and many communities lack accessible grocery stores or affordable healthy options, leaving residents dependent on convenience stores stocked predominantly with processed foods. Social pressures further add to these challenges: family members may resist dietary changes, cultural food traditions may center less on nutritious staples, and peer eating habits can quietly undermine personal health goals @cruwys2021social. Regarding personal barriers, many individuals doubt their own cooking abilities, assume that healthy food is inherently bland or unsatisfying, or simply feel too exhausted after demanding days to invest effort in meal preparation @horton2022time. Figure 1 shows this contrast between intention and actual conduct, emphasizing the psychological and practical influences that intervene.

#v(10pt)

#figure(
  image("../figures/intAct.png"),
  caption: [A conceptual diagram showing the gap between intention and action],
) <inteaction>

#v(10pt)

Even when people successfully formulate intentions to improve their diets, maintaining those intentions over an extended period proves exceptionally challenging. Eating healthy is not a singular choice but rather a long process, influenced by external factors, cravings, and conflicting obligations @sheeran2016intention. Consequently, understanding how motivation and barriers change over time is essential. However, most current interventions conceptualize behavior change as a one-time occurrence rather than a continuous progression @prochaska1997transtheoretical @sheeran2016intention.

A multitude of digital health tools have emerged in response to these challenges, offering meal planning apps, chatbot coaches, and gamified trackers, promising to make eating healthy foods much easier @seid2024. Yet these tools consistently miss the mark because they fail to understand the full psychological picture of why people struggle. They personalize recommendations based on food preferences or calorie goals but ignore the deeper drivers of behavior, the attitudes, social influences, and perceived control, that shape whether a person even attempts to make that change @mcdermott2015tpb. This gap between behavioral science knowledge and technological application represents both a failure and an opportunity. This study focuses on Filipino young adults and adults (ages 18-40) in Davao City, a demographic navigating the transition to independent living where dietary habits are still forming and intervention is most impactful @nelsondisparity. The system will operate in English, which is widely used in academic, professional, and digital contexts in the Philippines and is the medium of instruction in higher education @commission2012english. This choice also ensures compatibility with existing NLP models and training datasets, the majority of which are English-language resources. Future iterations may explore Filipino or Bisaya language support to further broaden accessibility.


The Theory of Planned Behavior (TPB) is one of the most extensively tested and validated frameworks for predicting human behavior across diverse domains, including health and nutrition @ajzen1991theory. Developed by Icek Ajzen, the theory posits that the immediate antecedent of behavior is the individual's intention to perform that behavior. Intention itself is shaped by three conceptually distinct psychological constructs. The first construct is attitude toward the behavior, which reflects the individual's overall evaluation of performing the behavior. This encompasses both instrumental judgments (whether the behavior is beneficial or harmful) and experiential judgments (whether it is pleasant or unpleasant). The second construct is subjective norm, which captures perceived social pressure to perform or not perform the behavior. This includes beliefs about whether important others (family, friends, colleagues) think the individual should engage in the behavior. The third construct is perceived behavioral control (PBC), which refers to the individual's perception of how capable they are of performing the behavior. PBC incorporates both internal factors (skills, confidence, knowledge) and external factors (opportunities, barriers, resources) @armitage2001EfficacyOT. Meta-analytic evidence shows that TPB accounts for 39% of the variance in intention and 27% of the variance in behavior across health-related actions @armitage2001EfficacyOT.


However, TPB has limitations. The model explains intention well but leaves a substantial portion of behavioral variance unexplained @sniehotta2014time. People form intentions to eat healthy yet fail to act when real-world barriers emerge. This intention-behavior gap becomes particularly pronounced for long-term habits that require sustained effort @sheeran2016intention. Understanding why some people translate intentions into lasting change while others do not requires accounting for an individual's readiness to change.

The Transtheoretical Model (TTM) addresses this gap by conceptualizing behavior change as a process that unfolds through stages. Systematic reviews confirm that stage-matched interventions improve dietary outcomes across diverse populations @vanduyn1998.

The integration of TPB and TTM creates a powerful framework. TPB identifies the specific beliefs holding someone back, while TTM determines how to address those beliefs based on readiness. For example, a person in contemplation who believes healthy food is expensive might receive pros-and-cons exploration, while someone in action with the same belief might receive specific budget-friendly recipes. The content of the barrier is the same, but the intervention strategy is completely different based on stage.

This integration addresses both the content of barriers (from TPB) and the process of addressing them (from TTM). Longitudinal research suggests that such integrated approaches may be particularly valuable for supporting difficult stage transitions @wyker2010behavioral. For a conversational AI system, this means it can detect what is wrong and deliver the right type of help at the right time, rather than one-time intention measurement. Attrition being a major challenge in longitudinal health research, means the system must actively work to keep users engaged over long periods, something theory-driven personalization could help accomplish.

Despite decades of accumulated evidence about what drives behavior change, commercially available AI nutrition tools remain largely atheoretical. This disconnect between scientific knowledge and technological application represents a fundamental flaw in current approaches @michie2017developing. While these tools excel at personalizing recommendations based on stated preferences and scaling to reach thousands of users, they systematically fail to model the psychological factors that research identifies as critical to sustained behavior change. For a digital nutrition tool to be considered theoretically aligned with TPB, it must at minimum assess users' attitudes toward healthy eating, account for perceived social pressures, and evaluate perceived behavioral control — not merely stated preferences. For TTM alignment, the tool must detect or estimate readiness to change and deliver stage-matched content rather than uniform recommendations. These criteria form the basis for evaluating existing tools below.

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
  [Extensive databases, barcode scanning, charts],
  [No attitudes/norms; ignores skills/budget; 70-90% attrition @baumel2019objective],

  /* --- Meal Planning Apps --- */
  [Meal Planning Apps],
  [Mealime, PlateJoy, Eat This Much],
  [Recipes, grocery lists, filtering],
  [No stage detection; assumes intention=action @mcdermott2015tpb],

  /* --- Rule-Based Chatbots --- */
  [Rule-Based Chatbots],
  [Woebot, FAQ bots],
  [Predictable, low-cost],
  [No psychological adaptation @sniehotta2014time],

  /* --- LLM-Powered Chatbots --- */
  [LLM-Powered Chatbots],
  [Custom LLMs, ChatGPT coaches],
  [Natural dialogue, scalability],
  [Inconsistent accuracy; no theory @sniehotta2014time, @mcdermott2015tpb],

  /* --- Specialized Research-Backed Apps --- */
  [Specialized Research-Backed Apps],
  [PROTEIN, DIAITA, Fridolin],
  [Theory-informed research],
  [Prototypes; low scalability @kapsis2022proteina]
)

As Table 1 illustrates, current tools cluster at opposite ends of a spectrum. At one end are commercially successful apps that prioritize usability and scale but ignore psychological theory. At the other end are research-backed prototypes that incorporate expert knowledge but remain inaccessible to most users. Neither approach has successfully integrated real-time psychological assessment with scalable deployment.

//change
A study evaluating ChatGPT-4o, Microsoft Copilot, and Gemini found that while all achieved satisfactory overall diet quality scores (DQI-I > 70), they consistently performed poorly on macronutrient and fatty acid balance. Gemini showed particular instability, with over 50% of its diet plans deviating from target calories by more than 20% @wang2025. These findings demonstrate that current AI tools cannot be relied upon for precise nutritional guidance without human oversight. Research on AI-moderated conversational surveys demonstrates that chatbots can elicit more thoughtful, detailed responses than traditional questionnaires @xiao2020tell. Participants engage more naturally, provide richer information, and report greater satisfaction with conversational interfaces. Yet this approach has not been systematically applied to build real-time, theory-based coaching models that adapt to users' evolving psychological states.

The consequences of these limitations are evident in user engagement data. A study of the PROTEIN personalized nutrition app, developed through a European Union H2020 project, found that mHealth apps are often subject to dropout rates of up to 80 percent, with only 3.9 percent of participants using the apps for more than 15 days @kapsis2022proteina. Research on chatbot-based nutrition education similarly reports high attrition rates over relatively short study periods @aggarwal2023. These engagement failures are not merely technical problems; they reflect a fundamental mismatch between what apps offer and what users need. People download nutrition apps with enthusiasm, use them for a few weeks, and then abandon them when the advice feels irrelevant to their actual lives. The apps give recommendations that sound good in theory but prove impossible to follow, a nutritionally perfect recipe that requires expensive ingredients, specialized equipment, or advanced cooking skills that the user does not possess @yangValidatingAccuracyInternetBased2022.

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
