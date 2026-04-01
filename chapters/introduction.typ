#import "@preview/fletcher:0.5.8" as fletcher: diagram, edge, node

= Introduction

#v(10pt)

Maintaining healthy eating habits remains a challenge worldwide. The World Health Organization reports that unhealthy diets are a major risk factor for the global burden of disease, contributing to millions of deaths annually from non-communicable diseases (NCDs) such as cardiovascular conditions and diabetes @who2025noncommunicable. Simultaneously, malnutrition in all its forms including undernutrition, micronutrient deficiencies, overweight and obesity which affects billions of people globally, with poor diets being a leading cause of death and disease burden worldwide @who2025malnutrition. Despite widespread awareness of dietary guidelines, a significant gap persists between knowledge and sustained behavioral change across diverse populations @briazu2024.

Consider Carlos, a 24-year-old call center agent in Davao City. He knows the importance of eating vegetables, but his 10-hour night shifts, limited budget, and the convenience of street food near his workplace make healthy eating feel impossible. His story is not unique, as in Davao City where rapid urbanization and the rise of the business process outsourcing (BPO) industry have created a demographic of young adults facing similar struggles. The 2023 DOH Healthy Philippines Lifestyle Survey (HPLS) Nutrition and Diet Policy Brief revealed a striking gap between perception and behavior: despite 83.8% of Filipino adults reporting that healthy eating is easy, 85.4% recently consumed high-sugar foods and 55.8% consumed high-salt foods, with this perception-behavior gap particularly pronounced among younger adults aged 18-45. Among the 16.2% who acknowledged difficulty eating healthily, the top barriers were money (57.3%), time (16.6%), and access (15.0%) @2023dietdoh.

In Davao City specifically, a study on millennial eating behaviors highlighted motivation challenges tied to busy lifestyles, suggesting education and supportive environments as solutions @laufente2023. Understanding and addressing these challenges in this specific population is the central motivation for this research. Practical barriers present significant obstacles to healthy eating. The cost of fresh produce often exceeds the budgets of low-income households, while demanding work schedules leave little time for meal preparation @darmon2008does. Beyond finances and time, the food environment itself can be limiting and many communities lack accessible grocery stores or affordable healthy options, leaving residents dependent on convenience stores stocked predominantly with processed foods. Social pressures further add to these challenges: family members may resist dietary changes, cultural food traditions may center less on nutritious staples, and peer eating habits can quietly undermine personal health goals @cruwys2015social. Regarding personal barriers, many individuals doubt their own cooking abilities, assume that healthy food is inherently bland or unsatisfying, or simply feel too exhausted after demanding days to invest effort in meal preparation @jabs2006time. Figure 1 shows this contrast between intention and actual conduct, emphasizing the psychological and practical influences that intervene.

#v(10pt)

#figure(
  fletcher.diagram(
    node-stroke: 1pt,
    node((0, 0), [Person wants \ to eat healthy], corner-radius: 2pt, name: <start>),
    edge(<start>, <center>, "--", stroke: 1pt),

    // Center diamond node
    node((2.5, 0), [#align(center)[*THE \ INTENTION \ ACTION \ GAP*]], name: <center>),

    // Top barriers connected to center
    node((2.5, 0.9), [HIGH COST], shape: rect, fill: none, corner-radius: 2pt, name: <cost>),
    node((2.5, 1.5), [TIME CONSTRAINTS], shape: rect, fill: none, corner-radius: 2pt, name: <time>),

    // Bottom barriers connected to center
    node((2.5, -0.9), [SOCIAL PRESSURE], shape: rect, fill: none, corner-radius: 2pt, name: <social>),
    node((2.5, -1.5), [LOW SELF-EFFICACY], shape: rect, fill: none, corner-radius: 2pt, name: <efficacy>),
    node((2.5, -2.2), [ENVIRONMENT], shape: rect, fill: none, corner-radius: 2pt, name: <env>),

    // Connect barriers to center diamond
    edge(<cost>, <center>, "--", stroke: 1pt),
    edge(<time>, <cost>, "--", stroke: 1pt),
    edge(<social>, <center>, "--", stroke: 1pt),
    edge(<efficacy>, <social>, "--", stroke: 1pt),
    edge(<env>, <efficacy>, "--", stroke: 1pt),

    // Right side: outcome
    node((4.5, 0), [Person eats \ healthy consistently], corner-radius: 2pt, name: <end>),
    edge(<center>, <end>, "--", stroke: 1pt),
  ),
  caption: [A conceptual diagram showing the gap between intention and action],
) <inteaction>

#v(10pt)

Even when people successfully formulate intentions to improve their diets, maintaining those intentions over an extended period proves exceptionally challenging. Eating healthy is not a singular choice but rather a long process, influenced by external factors, cravings, and conflicting obligations. Consequently, understanding how motivation and barriers change over time is essential. However, most current interventions conceptualize behavior change as a one-time occurrence rather than a continuous progression @prochaska1997transtheoretical @sheeran2016intention. A multitude of digital health tools have emerged in response to these challenges, offering meal planning apps, chatbot coaches, and gamified trackers, promising to make eating healthy foods much easier @seid2024. Yet these tools consistently miss the mark because they fail to understand the full psychological picture of why people struggle. They personalize recommendations based on food preferences or calorie goals but ignore the deeper drivers of behavior, the attitudes, social influences, and perceived control, that shape whether a person even attempts to make that change @mcdermott2015tpb. This gap between behavioral science knowledge and technological application represents both a failure and an opportunity. This study focuses on Filipino young adults and adults (ages 18-40) in Davao City, a demographic navigating the transition to independent living where dietary habits are still forming and intervention is most impactful @nelsondisparity. The system will operate in English, which is widely used in academic, professional, and digital contexts in the Philippines and is the medium of instruction in higher education @commission2012english. This choice also ensures compatibility with existing NLP models and training datasets, the majority of which are English-language resources. Future iterations may explore Filipino or Bisaya language support to further broaden accessibility.


The Theory of Planned Behavior (TPB) is one of the most extensively tested and validated frameworks for predicting human behavior across diverse domains, including health and nutrition @ajzen1991theory. Developed by Icek Ajzen, the theory posits that the immediate antecedent of behavior is the individual's intention to perform that behavior. Intention itself is shaped by three conceptually distinct psychological constructs. The first construct is attitude toward the behavior, which reflects the individual's overall evaluation of performing the behavior. Meta-analytic evidence shows that TPB accounts for 39% of the variance in intention and 27% of the variance in behavior across health-related actions @armitage2001EfficacyOT. However, TPB has its limitations where the model explains intention well but leaves a substantial portion of behavioral variance unexplained. People form intentions to eat healthy yet fail to act when real-world barriers emerge. This intention-behavior gap becomes particularly visible for long-term habits that require sustained effort @sniehotta2014time @sheeran2016intention. Understanding why some people translate intentions into lasting change while others do not requires accounting for an individual's readiness to change. The Transtheoretical Model (TTM) addresses this gap by conceptualizing behavior change as a process that unfolds through stages. Systematic reviews confirm that stage-matched interventions improve dietary outcomes across diverse populations @vanduyn1998. The application of both TPB and TTM creates a powerful framework. TPB identifies the specific beliefs holding someone back, while TTM determines how to address those beliefs based on readiness. For example, a person in contemplation who believes healthy food is expensive might receive pros-and-cons exploration, while someone in action with the same belief might receive specific budget-friendly recipes. The content of the barrier is the same, but the intervention strategy is completely different based on stage. This integration addresses both the content of barriers (from TPB) and the process of addressing them (from TTM). Longitudinal research suggests that such integrated approaches may be particularly valuable for supporting difficult stage transitions @wyker2010behavioral. For a conversational AI system, this means it can detect what is wrong and deliver the right type of help at the right time, rather than one-time intention measurement. Attrition being a major challenge in longitudinal health research, means the system must actively work to keep users engaged over long periods, something theory-driven personalization could help accomplish.

Young adults aged 18-40 represent a particularly important demographic for nutrition intervention, as this life stage marks the transition to independent living where dietary habits solidify and long-term health trajectories are established @nelsondisparity. This population is also uniquely positioned at the intersection of health challenges and digital opportunity. In the Philippines, 76.5% of the population has internet access, with 89.7% of internet users aged 16-64 using smartphones daily and spending an average of 10 hours and 27 minutes online each day @philippine2023digital. Smartphone adoption reached 71% in 2023, with mobile-first digital behavior dominant among young adults @gsma2023mobile. Globally, 97% of Americans aged 18-29 own smartphones, making mobile apps the primary digital interface for this demographic @pew2021smartphone. Young adults are the primary adopters of health apps, downloading nutrition trackers, meal planners, and fitness coaches with enthusiasm @litman2020young. However, this initial engagement rarely translates into sustained use. Studies consistently document attrition rates of 43-80% in digital health interventions, with young adults showing particularly high dropout rates @baumel2019objective. Users abandon apps not because they lose interest in health, but because the tools fail to address the psychological and practical realities of behavior change @schoeppe2016efficacy. This pattern reveals a critical gap: while young adults are digitally connected and health-conscious, existing apps are not theoretically grounded.

Despite decades of accumulated evidence about what drives behavior change, commercially available AI nutrition tools remain largely atheoretical. This disconnect between scientific knowledge and technological application represents a fundamental flaw in current approaches @michie2017developing. While these tools excel at personalizing recommendations based on stated preferences and scaling to reach thousands of users, they systematically fail to model the psychological factors that research identifies as critical to sustained behavior change. For a digital nutrition tool to be considered theoretically aligned with TPB, it must at minimum assess users' attitudes toward healthy eating, account for perceived social pressures, and evaluate perceived behavioral control, not merely stated preferences. For TTM alignment, the tool must detect or estimate readiness to change and deliver stage-matched content rather than uniform recommendations. These criteria form the basis for evaluating existing tools below.

#table(
  columns: (auto, auto, auto, auto, auto),
  stroke: 0.5pt,
  align: (left, left, left, center, center),

  /* --- Header row --- */
  [*Tool Category*], [*Examples*], [*Primary Strengths*], [*Assesses TPB Constructs?*], [*Implements TTM Stages?*],

  /* --- Calorie Tracking Apps --- */
  [Calorie Tracking Apps],
  [MyFitnessPal, Lose It!, Cronometer],
  [Extensive food databases, barcode scanning, progress visualization],
  [No],
  [No],

  /* --- Meal Planning Apps --- */
  [Meal Planning Apps],
  [Mealime, PlateJoy, Eat This Much],
  [Recipe recommendations, grocery lists, dietary preference filtering],
  [No],
  [No],

  /* --- Rule-Based Chatbots --- */
  [Rule-Based Chatbots],
  [Woebot (mental health), Roti @ali2024roti],
  [Predictable responses, low computational cost, 24/7 availability],
  [Yes],
  [No],

  /* --- LLM-Powered Chatbots --- */
  [LLM-Powered Chatbots],
  [ChatGPT-4o, Gemini, FiberMore @sze2025fibermore],
  [Natural dialogue, contextual understanding, high scalability],
  [Partial],
  [No],

  /* --- Research Prototypes --- */
  [Research Prototypes],
  [PROTEIN @kapsis2022proteina, Fridolin @weber2023fridolin],
  [Expert-designed interventions, evidence-based content],
  [Partial],
  [No]
)

Table 1 reveals a critical gap in existing digital nutrition tools. Calorie tracking apps like MyFitnessPal focus exclusively on quantitative intake monitoring without assessing the psychological determinants that drive eating behavior. Users can log every meal meticulously yet still fail to change their habits because the app never addresses why they struggle, whether it is negative attitudes toward healthy food, social pressures from family and peers, or perceived lack of cooking skills @baumel2019objective. Meal planning apps like Mealime and PlateJoy offer recipe recommendations based on stated dietary preferences but operate under the flawed assumption that intention automatically translates to action. They provide meal plans without detecting whether users are ready to follow them or identifying the specific barriers preventing adherence @mcdermott2015tpb. Rule-based chatbots deliver scripted responses that cannot adapt to individual psychological states. The Roti chatbot, for example, uses TPB to inform its 4-lesson dietary curriculum for South Asian Americans but delivers prescripted content based on a pre-intervention survey rather than performing real-time construct inference during conversation @ali2024roti. LLM-powered chatbots like ChatGPT-4o and Gemini, despite their conversational fluency, lack the theoretical grounding to systematically assess constructs like attitude, subjective norm, and perceived behavioral control. Even FiberMore, which uses a fine-tuned GPT-4o model for meal photo analysis and delivers personalized feedback to diabetes patients, employs TPB only to inform intervention design without real-time construct assessment or TTM stage detection @sze2025fibermore. A recent evaluation found that while these AI tools achieved satisfactory overall diet quality scores, they performed poorly on macronutrient balance and showed significant instability, with over 50% of Gemini's diet plans deviating from target calories by more than 20% @wang2025. Even research-backed prototypes like PROTEIN, which incorporate expert nutritionist input and evidence-based content, only partially assess TPB constructs through structured questionnaires rather than natural conversation @kapsis2022proteina. Similarly, Fridolin, a participatory-designed chatbot for elderly nutrition support, focuses on usability and engagement without integrating behavioral theory @weber2023fridolin. None of these research prototypes implement TTM stage detection or deliver stage-matched interventions.

No chatbot coaching tools directly combines inference of both TPB psychological constructs with TTM stage-matched intervention delivery and theory-driven recipe recommendation in a scalable conversational interface. While meal planning apps provide recipe suggestions based on dietary preferences, they fail to account for the psychological barriers that prevent users from following through. This disconnect between psychological assessment and practical food recommendations represents a critical gap in translating behavioral theory into actionable nutrition support. The theoretical gap has practical consequences. Research on AI-moderated conversational surveys demonstrates that chatbots can elicit more thoughtful, detailed responses than traditional questionnaires, with participants engaging more naturally and providing richer information @xiao2020tell. Yet this conversational capability has not been systematically applied to build theory-driven coaching models that continuously assess users' evolving psychological barriers and readiness for change, then translate those assessments into appropriate recipe recommendations. The result is evident in engagement data: research prototypes like PROTEIN show that only 3.9% of users maintain engagement beyond 15 days @kapsis2022proteina. These failures reflect a fundamental mismatch between what apps offer and what users need. People download nutrition apps with enthusiasm, use them briefly, and abandon them when the advice feels irrelevant to their actual lives, when a nutritionally optimal recipe requires expensive ingredients, advanced cooking skills, or time they do not have @yangValidatingAccuracyInternetBased2022. The apps fail because they personalize based on food preferences while ignoring the psychological and practical realities that determine whether behavior change actually occurs.


This study addresses these limitations by developing AliMind, a conversational AI system that integrates the Theory of Planned Behavior and Transtheoretical Model to provide personalized nutrition support. The name reflects the system's focus on both alimentation (nutrition and feeding) and mindfulness of the psychological barriers that prevent behavior change. Unlike existing tools that rely on structured questionnaires or generic advice, AliMind infers users' attitudes, social pressures, and perceived control through natural conversation, classifies their readiness to change, and delivers interventions matched to their psychological state and practical constraints. The system implements a seven-step pipeline that continuously assesses users' TPB constructs and TTM stages across multiple sessions, enabling detection of psychological changes over time. Based on this assessment, AliMind selects appropriate behavior change techniques and recommends recipes that are tailored to both the user's psychological barriers and practical constraints including time, budget, cooking skills, and dietary restrictions. For example, a user in the contemplation stage with negative attitudes toward healthy food might receive pros-and-cons exploration alongside recipes that demonstrate how healthy food can be flavorful and satisfying, while someone in the action stage struggling with low perceived behavioral control due to limited cooking skills would receive simple, beginner-friendly recipes with detailed step-by-step instructions. The recipe recommendations are not rigid meal plans but rather suggestions that respect user autonomy and address the specific barriers identified through TPB assessment. This research contributes to the challenge of making behavioral theory actionable in digital health applications. By developing NLP models that infer psychological constructs from conversational text, the study enables real-time barrier identification without the assessment burden that drives user attrition. The modular pipeline architecture allows each component to be independently evaluated and refined, supporting iterative development and future enhancements. For Filipino young adults in Davao City, who face specific challenges including time scarcity from shift work, limited budgets, and social eating pressures, AliMind provides culturally situated support that bridges universal behavioral theory with local context.

== Objectives

To develop and evaluate AliMind, a conversational AI system that integrates the Theory of Planned Behavior and Transtheoretical Model to provide personalized nutrition support for Filipino young adults in Davao City. Specifically, the study will:

#pad(left: 1em)[
  - Address the limitation of existing tools that rely on structured questionnaires which fail to capture nuanced psychological barriers and fail to maintain engagement.

  - Resolve the gap in real-time psychological barrier identification by developing NLP models that can infer TPB constructs from natural conversation without requiring users to complete lengthy assessments.

  - Enable stage-appropriate intervention delivery by developing a classification system that detects users' readiness for change from conversational cues rather than explicit stage self-reporting.

  - Bridge the gap between psychological assessment and actionable nutrition support by building an intervention engine that translates TPB/TTM insights into appropriate behavior change strategies and recipe recommendations.

  - Evaluate whether the integrated TPB-TTM approach improves both technical performance and user outcomes compared to existing atheoretical or single-theory approaches.
]
