/**
 * Conversational Questionnaire Service
 * 
 * Manages a conversational questionnaire flow where:
 * - Bot asks questions one by one in the chat
 * - User types free-text answers
 * - System infers scores from text using keyword matching
 * - 20 total questions: 15 TPB (5 per construct) + 5 TTM
 */

import { TPBScores } from './tpbInference';
import { TTMStage } from './ttmInference';

export type QuestionType = 'tpb-attitude' | 'tpb-subjective-norm' | 'tpb-perceived-control' | 'ttm';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  keywords: KeywordMapping;
}

export interface KeywordMapping {
  veryHigh: string[];  // Sample answers for score 100
  high: string[];      // Sample answers for score 75
  moderate: string[];  // Sample answers for score 50
  low: string[];       // Sample answers for score 25
  veryLow: string[];   // Sample answers for score 0
}

export interface QuestionnaireState {
  currentQuestionIndex: number;
  answers: Map<string, { text: string; score: number }>;
  isComplete: boolean;
  tpbScores: TPBScores | null;
  ttmStage: TTMStage | null;
  isActive: boolean;
  questionOrder: Question[]; // Randomized order of questions
}

const TPB_ATTITUDE_QUESTIONS: Question[] = [
  {
    id: 'tpb-att-1',
    type: 'tpb-attitude',
    text: 'How do you feel about eating healthy food?',
    keywords: {
      veryHigh: ['love', 'excellent', 'amazing', 'wonderful', 'excited', 'passionate', 'great', 'fantastic', 'adore'],
      high: ['like', 'good', 'positive', 'enjoy', 'interested', 'beneficial', 'helpful', 'nice'],
      moderate: ['okay', 'fine', 'neutral', 'alright', 'not sure', 'maybe', 'sometimes', 'decent'],
      low: ['not really', 'difficult', 'challenging', 'hard', 'skeptical', 'unsure', 'meh'],
      veryLow: ['hate', 'dislike', 'terrible', 'awful', 'bad', 'negative', 'don\'t like', 'not interested']
    }
  },
  {
    id: 'tpb-att-2',
    type: 'tpb-attitude',
    text: 'Do you believe healthy eating would improve your energy and wellbeing?',
    keywords: {
      veryHigh: ['definitely', 'absolutely', 'certainly', 'sure', 'of course', 'without doubt', 'completely'],
      high: ['yes', 'probably', 'likely', 'think so', 'believe', 'would help', 'should', 'agree'],
      moderate: ['maybe', 'possibly', 'might', 'not sure', 'could', 'perhaps', 'uncertain'],
      low: ['probably not', 'unlikely', 'doubt', 'not really', 'skeptical', 'questionable'],
      veryLow: ['no', 'definitely not', 'won\'t', 'don\'t believe', 'not at all', 'never']
    }
  },
  {
    id: 'tpb-att-3',
    type: 'tpb-attitude',
    text: 'How important is healthy eating to you personally?',
    keywords: {
      veryHigh: ['very important', 'extremely', 'crucial', 'essential', 'top priority', 'critical', 'vital'],
      high: ['important', 'matters', 'significant', 'care about', 'value', 'priority'],
      moderate: ['somewhat', 'moderately', 'okay', 'average', 'normal', 'fair'],
      low: ['not very', 'low priority', 'not much', 'minor', 'little'],
      veryLow: ['not important', 'don\'t care', 'doesn\'t matter', 'irrelevant', 'not at all']
    }
  },
  {
    id: 'tpb-att-4',
    type: 'tpb-attitude',
    text: 'How would you describe healthy food?',
    keywords: {
      veryHigh: ['delicious', 'tasty', 'amazing', 'wonderful', 'love it', 'flavorful', 'satisfying', 'yummy'],
      high: ['good', 'nice', 'enjoyable', 'pleasant', 'decent', 'appetizing', 'fresh'],
      moderate: ['okay', 'fine', 'alright', 'acceptable', 'not bad', 'average'],
      low: ['bland', 'boring', 'not great', 'meh', 'plain', 'uninteresting'],
      veryLow: ['disgusting', 'terrible', 'awful', 'tasteless', 'hate it', 'gross']
    }
  },
  {
    id: 'tpb-att-5',
    type: 'tpb-attitude',
    text: 'Do you think the benefits of healthy eating outweigh the effort?',
    keywords: {
      veryHigh: ['absolutely', 'definitely yes', 'totally worth it', 'for sure', 'without question'],
      high: ['yes', 'worth it', 'benefits outweigh', 'think so', 'probably', 'agree'],
      moderate: ['maybe', 'not sure', 'depends', 'sometimes', 'could be', 'possibly'],
      low: ['probably not', 'not really', 'doubt it', 'too much effort', 'questionable'],
      veryLow: ['no', 'not worth it', 'too hard', 'definitely not', 'waste of time']
    }
  }
];

const TPB_SUBJECTIVE_NORM_QUESTIONS: Question[] = [
  {
    id: 'tpb-sn-1',
    type: 'tpb-subjective-norm',
    text: 'Do your family and friends support you eating healthier?',
    keywords: {
      veryHigh: ['very supportive', 'fully support', 'encourage', 'help me', 'always support', 'great support'],
      high: ['yes', 'support', 'supportive', 'help', 'encourage me', 'positive', 'backing me'],
      moderate: ['sometimes', 'mixed', 'some do', 'okay', 'neutral', 'depends', 'varies'],
      low: ['not really', 'not much', 'don\'t care', 'indifferent', 'rarely', 'minimal'],
      veryLow: ['no', 'discourage', 'against it', 'don\'t support', 'negative', 'make it hard']
    }
  },
  {
    id: 'tpb-sn-2',
    type: 'tpb-subjective-norm',
    text: 'Do people important to you eat healthy themselves?',
    keywords: {
      veryHigh: ['yes all', 'everyone', 'most people', 'all of them', 'definitely', 'always'],
      high: ['yes', 'many', 'most', 'several', 'quite a few', 'majority'],
      moderate: ['some', 'a few', 'mixed', 'half', 'sometimes', 'occasionally'],
      low: ['not many', 'few', 'rarely', 'not really', 'hardly'],
      veryLow: ['no', 'nobody', 'none', 'no one', 'not at all', 'never']
    }
  },
  {
    id: 'tpb-sn-3',
    type: 'tpb-subjective-norm',
    text: 'Would your family be willing to eat healthy meals with you?',
    keywords: {
      veryHigh: ['definitely yes', 'absolutely', 'for sure', 'they would love to', 'very willing'],
      high: ['yes', 'probably', 'think so', 'willing', 'would', 'open to it'],
      moderate: ['maybe', 'possibly', 'not sure', 'might', 'depends', 'could'],
      low: ['probably not', 'unlikely', 'doubt it', 'not really', 'hesitant'],
      veryLow: ['no', 'definitely not', 'refuse', 'won\'t', 'never', 'against it']
    }
  },
  {
    id: 'tpb-sn-4',
    type: 'tpb-subjective-norm',
    text: 'How do people around you react when you talk about eating healthier?',
    keywords: {
      veryHigh: ['enthusiastic', 'excited', 'very positive', 'supportive', 'encouraging', 'love it'],
      high: ['positive', 'good', 'supportive', 'interested', 'encouraging', 'happy for me'],
      moderate: ['neutral', 'okay', 'mixed', 'indifferent', 'don\'t say much', 'varies'],
      low: ['negative', 'dismissive', 'skeptical', 'not interested', 'ignore', 'don\'t care'],
      veryLow: ['mock', 'laugh', 'discourage', 'criticize', 'make fun', 'hostile']
    }
  },
  {
    id: 'tpb-sn-5',
    type: 'tpb-subjective-norm',
    text: 'Do you have role models or people you look up to who eat healthy?',
    keywords: {
      veryHigh: ['yes many', 'lots', 'several', 'many people', 'definitely', 'all around me'],
      high: ['yes', 'some', 'a few', 'have', 'know people', 'friends do'],
      moderate: ['maybe', 'one or two', 'not many', 'few', 'occasionally see'],
      low: ['not really', 'hardly any', 'rarely', 'don\'t know many', 'very few'],
      veryLow: ['no', 'none', 'nobody', 'no one', 'not at all', 'never']
    }
  }
];

const TPB_PERCEIVED_CONTROL_QUESTIONS: Question[] = [
  {
    id: 'tpb-pc-1',
    type: 'tpb-perceived-control',
    text: 'How confident are you that you can prepare healthy meals?',
    keywords: {
      veryHigh: ['very confident', 'extremely confident', 'totally confident', 'absolutely', 'expert'],
      high: ['confident', 'can do', 'able', 'capable', 'know how', 'comfortable'],
      moderate: ['somewhat', 'moderately', 'okay', 'learning', 'getting there', 'decent'],
      low: ['not very', 'struggling', 'difficult', 'unsure', 'not confident', 'challenging'],
      veryLow: ['not confident', 'can\'t', 'unable', 'don\'t know how', 'impossible']
    }
  },
  {
    id: 'tpb-pc-2',
    type: 'tpb-perceived-control',
    text: 'Do you have the time, money, and resources to eat healthier?',
    keywords: {
      veryHigh: ['yes definitely', 'have everything', 'plenty', 'all resources', 'fully equipped'],
      high: ['yes', 'have', 'enough', 'sufficient', 'can manage', 'available'],
      moderate: ['some', 'limited', 'okay', 'manage', 'tight but possible', 'barely'],
      low: ['not much', 'struggling', 'limited', 'difficult', 'barely', 'scarce'],
      veryLow: ['no', 'none', 'can\'t afford', 'no time', 'no money', 'impossible']
    }
  },
  {
    id: 'tpb-pc-3',
    type: 'tpb-perceived-control',
    text: 'How easy or difficult is it for you to access healthy food?',
    keywords: {
      veryHigh: ['very easy', 'extremely easy', 'no problem', 'readily available', 'everywhere'],
      high: ['easy', 'accessible', 'available', 'can find', 'not hard', 'manageable'],
      moderate: ['okay', 'moderate', 'sometimes', 'depends', 'mixed', 'varies'],
      low: ['difficult', 'hard', 'challenging', 'not easy', 'limited', 'struggle'],
      veryLow: ['very difficult', 'impossible', 'can\'t access', 'unavailable', 'no access']
    }
  },
  {
    id: 'tpb-pc-4',
    type: 'tpb-perceived-control',
    text: 'Do you feel you have control over what you eat?',
    keywords: {
      veryHigh: ['full control', 'complete control', 'totally', 'absolutely', 'always', 'entirely'],
      high: ['yes', 'control', 'mostly', 'usually', 'generally', 'have control'],
      moderate: ['some', 'sometimes', 'partial', 'depends', 'mixed', 'varies'],
      low: ['not much', 'little', 'rarely', 'limited', 'struggling', 'difficult'],
      veryLow: ['no', 'no control', 'none', 'others decide', 'can\'t control', 'helpless']
    }
  },
  {
    id: 'tpb-pc-5',
    type: 'tpb-perceived-control',
    text: 'How capable do you feel in overcoming barriers to healthy eating?',
    keywords: {
      veryHigh: ['very capable', 'extremely capable', 'can overcome anything', 'strong', 'determined'],
      high: ['capable', 'can do', 'able', 'manage', 'handle', 'overcome'],
      moderate: ['somewhat', 'trying', 'learning', 'okay', 'working on it', 'decent'],
      low: ['struggling', 'difficult', 'hard', 'not very', 'challenging', 'overwhelmed'],
      veryLow: ['can\'t', 'unable', 'impossible', 'too hard', 'give up', 'hopeless']
    }
  }
];

const TTM_QUESTIONS: Question[] = [
  {
    id: 'ttm-1',
    type: 'ttm',
    text: 'Are you currently thinking about changing your eating habits?',
    keywords: {
      veryHigh: ['already changed', 'been doing', 'for months', 'for years', 'maintaining', 'lifestyle now'],
      high: ['yes doing', 'currently changing', 'started', 'actively', 'working on', 'in progress'],
      moderate: ['planning', 'about to', 'soon', 'next week', 'preparing', 'getting ready'],
      low: ['thinking', 'considering', 'maybe', 'not sure', 'contemplating', 'might'],
      veryLow: ['no', 'not interested', 'not thinking', 'don\'t want', 'not ready', 'not now']
    }
  },
  {
    id: 'ttm-2',
    type: 'ttm',
    text: 'When do you plan to start eating healthier (if not already)?',
    keywords: {
      veryHigh: ['already eating', 'been eating', 'for months', 'long time', 'already healthy'],
      high: ['already started', 'this week', 'now', 'currently', 'just started', 'recently'],
      moderate: ['next week', 'next month', 'soon', 'within month', 'planning to', 'about to'],
      low: ['someday', 'future', 'eventually', 'not sure when', 'thinking about', 'maybe later'],
      veryLow: ['no plans', 'not planning', 'don\'t know', 'not interested', 'never']
    }
  },
  {
    id: 'ttm-3',
    type: 'ttm',
    text: 'Have you taken any steps toward eating healthier?',
    keywords: {
      veryHigh: ['yes for long time', 'been doing', 'routine', 'habit', 'lifestyle', 'months', 'years'],
      high: ['yes', 'started', 'taking steps', 'actively', 'doing', 'making changes'],
      moderate: ['planning', 'researching', 'preparing', 'getting ready', 'learning', 'about to'],
      low: ['thinking', 'considering', 'not yet', 'just thinking', 'maybe', 'contemplating'],
      veryLow: ['no', 'haven\'t', 'not started', 'no steps', 'not interested', 'not planning']
    }
  },
  {
    id: 'ttm-4',
    type: 'ttm',
    text: 'How would you describe your current eating habits?',
    keywords: {
      veryHigh: ['healthy', 'very healthy', 'excellent', 'great', 'consistent', 'good habits'],
      high: ['improving', 'getting better', 'working on', 'changing', 'making progress', 'better'],
      moderate: ['mixed', 'okay', 'trying', 'starting', 'preparing', 'planning'],
      low: ['unhealthy but want', 'need improvement', 'not great', 'could be better', 'thinking about'],
      veryLow: ['unhealthy', 'bad', 'terrible', 'don\'t care', 'fine with it', 'not changing']
    }
  },
  {
    id: 'ttm-5',
    type: 'ttm',
    text: 'How long have you been eating healthy (if applicable)?',
    keywords: {
      veryHigh: ['months', 'years', 'long time', 'over 6 months', 'year', 'always', 'lifetime'],
      high: ['weeks', 'month', 'recently started', 'few weeks', 'just started', 'new'],
      moderate: ['about to start', 'starting soon', 'planning', 'next week', 'preparing'],
      low: ['thinking about', 'not started', 'considering', 'maybe', 'contemplating'],
      veryLow: ['haven\'t', 'not eating healthy', 'no', 'not applicable', 'not started', 'never']
    }
  }
];

export const ALL_QUESTIONS: Question[] = [
  ...TPB_ATTITUDE_QUESTIONS,
  ...TPB_SUBJECTIVE_NORM_QUESTIONS,
  ...TPB_PERCEIVED_CONTROL_QUESTIONS,
  ...TTM_QUESTIONS
];

/**
 * Fisher-Yates shuffle algorithm to randomize array
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function initializeQuestionnaire(): QuestionnaireState {
  // Randomize questions using Fisher-Yates shuffle
  const randomizedQuestions = shuffleArray(ALL_QUESTIONS);
  
  return {
    currentQuestionIndex: 0,
    answers: new Map(),
    isComplete: false,
    tpbScores: null,
    ttmStage: null,
    isActive: true,
    questionOrder: randomizedQuestions
  };
}

export function inferScoreFromText(text: string, keywords: KeywordMapping): number {
  const lowerText = text.toLowerCase().trim();
  
  // Simple prototype: check which sample answer category the user's answer is closest to
  // We'll use keyword matching as a simple similarity measure
  
  const levels = [
    { keywords: keywords.veryHigh, score: 100 },
    { keywords: keywords.high, score: 75 },
    { keywords: keywords.moderate, score: 50 },
    { keywords: keywords.low, score: 25 },
    { keywords: keywords.veryLow, score: 0 }
  ];
  
  // Count matches for each level
  let bestMatch = { score: 50, matchCount: 0 }; // Default to moderate
  
  for (const level of levels) {
    let matchCount = 0;
    for (const keyword of level.keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        matchCount++;
      }
    }
    
    // If this level has more matches, use it
    if (matchCount > bestMatch.matchCount) {
      bestMatch = { score: level.score, matchCount };
    }
  }
  
  return bestMatch.score;
}

export function answerQuestion(
  state: QuestionnaireState,
  questionId: string,
  userText: string
): QuestionnaireState {
  const question = state.questionOrder.find(q => q.id === questionId);
  if (!question) {
    throw new Error(`Question ${questionId} not found`);
  }
  
  const score = inferScoreFromText(userText, question.keywords);
  
  const newAnswers = new Map(state.answers);
  newAnswers.set(questionId, { text: userText, score });

  const nextIndex = state.currentQuestionIndex + 1;
  const isComplete = nextIndex >= state.questionOrder.length;

  let tpbScores = state.tpbScores;
  let ttmStage = state.ttmStage;

  if (isComplete) {
    tpbScores = calculateTPBScoresFromAnswers(newAnswers);
    ttmStage = calculateTTMStageFromAnswers(newAnswers);
  }

  return {
    currentQuestionIndex: nextIndex,
    answers: newAnswers,
    isComplete,
    tpbScores,
    ttmStage,
    isActive: !isComplete,
    questionOrder: state.questionOrder
  };
}

export function getCurrentQuestion(state: QuestionnaireState): Question | null {
  if (state.currentQuestionIndex >= state.questionOrder.length) {
    return null;
  }
  return state.questionOrder[state.currentQuestionIndex];
}

function calculateTPBScoresFromAnswers(answers: Map<string, { text: string; score: number }>): TPBScores {
  const attitudeScores = TPB_ATTITUDE_QUESTIONS.map(q => answers.get(q.id)?.score || 50);
  const attitude = Math.round(
    attitudeScores.reduce((sum, score) => sum + score, 0) / attitudeScores.length
  );

  const subjectiveNormScores = TPB_SUBJECTIVE_NORM_QUESTIONS.map(q => answers.get(q.id)?.score || 50);
  const subjectiveNorm = Math.round(
    subjectiveNormScores.reduce((sum, score) => sum + score, 0) / subjectiveNormScores.length
  );

  const perceivedControlScores = TPB_PERCEIVED_CONTROL_QUESTIONS.map(q => answers.get(q.id)?.score || 50);
  const perceivedControl = Math.round(
    perceivedControlScores.reduce((sum, score) => sum + score, 0) / perceivedControlScores.length
  );

  const confidence = Math.round((attitude + subjectiveNorm + perceivedControl) / 3);

  return {
    attitude,
    subjectiveNorm,
    perceivedControl,
    confidence
  };
}

function calculateTTMStageFromAnswers(answers: Map<string, { text: string; score: number }>): TTMStage {
  const ttmScores = TTM_QUESTIONS.map(q => {
    const score = answers.get(q.id)?.score || 50;
    return Math.round(score / 25);
  });
  
  const avgStage = ttmScores.reduce((sum, score) => sum + score, 0) / ttmScores.length;
  const variance = ttmScores.reduce((sum, score) => sum + Math.pow(score - avgStage, 2), 0) / ttmScores.length;
  const stdDev = Math.sqrt(variance);
  const confidence = Math.round(Math.max(50, 100 - (stdDev * 12.5)));

  const stageMap: Array<{ stage: TTMStage['stage']; description: string }> = [
    { stage: 'preContemplation', description: 'Not yet considering change' },
    { stage: 'contemplation', description: 'Thinking about making changes' },
    { stage: 'preparation', description: 'Getting ready to take action' },
    { stage: 'action', description: 'Actively making changes' },
    { stage: 'maintenance', description: 'Maintaining healthy habits' }
  ];

  const stageIndex = Math.round(avgStage);
  const { stage, description } = stageMap[stageIndex];

  return {
    stage,
    confidence,
    description
  };
}

export function getProgress(state: QuestionnaireState): number {
  return Math.round((state.currentQuestionIndex / state.questionOrder.length) * 100);
}

export function getQuestionNumberDisplay(state: QuestionnaireState): string {
  return `Question ${state.currentQuestionIndex + 1} of ${state.questionOrder.length}`;
}

/**
 * Calculate interim TPB/TTM scores based on answers so far
 * Used to show progress during questionnaire
 */
export function calculateInterimScores(state: QuestionnaireState): {
  tpbScores: TPBScores | null;
  ttmStage: TTMStage | null;
} {
  if (state.answers.size === 0) {
    return { tpbScores: null, ttmStage: null };
  }

  // Calculate partial TPB scores
  const attitudeAnswers = TPB_ATTITUDE_QUESTIONS
    .map(q => state.answers.get(q.id)?.score)
    .filter(score => score !== undefined) as number[];
  
  const subjectiveNormAnswers = TPB_SUBJECTIVE_NORM_QUESTIONS
    .map(q => state.answers.get(q.id)?.score)
    .filter(score => score !== undefined) as number[];
  
  const perceivedControlAnswers = TPB_PERCEIVED_CONTROL_QUESTIONS
    .map(q => state.answers.get(q.id)?.score)
    .filter(score => score !== undefined) as number[];

  const attitude = attitudeAnswers.length > 0
    ? Math.round(attitudeAnswers.reduce((sum, score) => sum + score, 0) / attitudeAnswers.length)
    : 50;

  const subjectiveNorm = subjectiveNormAnswers.length > 0
    ? Math.round(subjectiveNormAnswers.reduce((sum, score) => sum + score, 0) / subjectiveNormAnswers.length)
    : 50;

  const perceivedControl = perceivedControlAnswers.length > 0
    ? Math.round(perceivedControlAnswers.reduce((sum, score) => sum + score, 0) / perceivedControlAnswers.length)
    : 50;

  const confidence = Math.round((attitude + subjectiveNorm + perceivedControl) / 3);

  const tpbScores: TPBScores = {
    attitude,
    subjectiveNorm,
    perceivedControl,
    confidence
  };

  // Calculate partial TTM stage
  const ttmAnswers = TTM_QUESTIONS
    .map(q => state.answers.get(q.id)?.score)
    .filter(score => score !== undefined) as number[];

  let ttmStage: TTMStage | null = null;

  if (ttmAnswers.length > 0) {
    const ttmScores = ttmAnswers.map(score => Math.round(score / 25));
    const avgStage = ttmScores.reduce((sum, score) => sum + score, 0) / ttmScores.length;
    const variance = ttmScores.reduce((sum, score) => sum + Math.pow(score - avgStage, 2), 0) / ttmScores.length;
    const stdDev = Math.sqrt(variance);
    const confidence = Math.round(Math.max(50, 100 - (stdDev * 12.5)));

    const stageMap: Array<{ stage: TTMStage['stage']; description: string }> = [
      { stage: 'preContemplation', description: 'Not yet considering change' },
      { stage: 'contemplation', description: 'Thinking about making changes' },
      { stage: 'preparation', description: 'Getting ready to take action' },
      { stage: 'action', description: 'Actively making changes' },
      { stage: 'maintenance', description: 'Maintaining healthy habits' }
    ];

    const stageIndex = Math.round(avgStage);
    const { stage, description } = stageMap[stageIndex];

    ttmStage = {
      stage,
      confidence,
      description
    };
  }

  return { tpbScores, ttmStage };
}
