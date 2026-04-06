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
    text: 'Do you think eating healthier would improve your energy and overall wellbeing?',
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
    text: 'On a personal level, how important is healthy eating to you?',
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
    text: 'When you think about healthy food, what comes to mind? How would you describe it?',
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
    text: 'In your opinion, do the benefits of healthy eating outweigh the effort it takes?',
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
    text: 'Do your family and friends support you in eating healthier?',
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
    text: 'What about the people who matter most to you - do they eat healthy themselves?',
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
    text: 'If you decided to eat healthier, would your family be willing to join you for healthy meals?',
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
    text: 'When you mention eating healthier to people around you, how do they usually react?',
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
    text: 'Are there any role models or people you admire who eat healthy?',
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
    text: 'How confident do you feel about preparing healthy meals?',
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
    text: 'Thinking practically, do you have the time, money, and resources needed to eat healthier?',
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
    text: 'In your area, how easy or difficult is it to access healthy food options?',
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
    text: 'Generally speaking, do you feel like you have control over what you eat?',
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
    text: 'When you face obstacles to eating healthy, how capable do you feel in overcoming them?',
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
    text: 'If you\'re not already eating healthy, when do you think you might start?',
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
    text: 'Have you already taken any concrete steps toward eating healthier?',
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
    text: 'If you had to describe your current eating habits right now, what would you say?',
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
    text: 'If you\'re already eating healthy, how long have you been doing it?',
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

/**
 * Detect if an answer is low-quality/gibberish
 */
function isLowQualityAnswer(text: string): boolean {
  const lowerText = text.toLowerCase().trim();
  
  console.log('Checking answer quality for:', text);
  
  // Too short
  if (lowerText.length < 2) {
    console.log('  -> Low quality: too short');
    return true;
  }
  
  // Single letter
  if (/^[a-z]$/.test(lowerText)) {
    console.log('  -> Low quality: single letter');
    return true;
  }
  
  // No vowels (likely gibberish)
  if (!/[aeiou]/i.test(lowerText)) {
    console.log('  -> Low quality: no vowels');
    return true;
  }
  
  // Repeated characters (aaaa, 1111, etc.)
  if (/(.)\1{3,}/.test(lowerText)) {
    console.log('  -> Low quality: repeated characters');
    return true;
  }
  
  // No letters at all (just numbers/symbols)
  if (!/[a-z]/i.test(lowerText)) {
    console.log('  -> Low quality: no letters');
    return true;
  }
  
  // Random keyboard mashing patterns (expanded)
  const keyboardPatterns = [
    /asdf/i, /qwer/i, /zxcv/i, /hjkl/i, /uiop/i, /jkl/i, /fgh/i, // keyboard rows
    /(asd|sdf|dfg|fgh|ghj|hjk|jkl|qwe|wer|ert|rty|tyu|yui|uio|iop|zxc|xcv|cvb|vbn|bnm){2,}/i, // repeated keyboard sequences
    /[a-z]{10,}[0-9]{3,}/i, // long string followed by numbers
    /^[0-9]+$/  // only numbers
  ];
  if (keyboardPatterns.some(pattern => pattern.test(lowerText))) {
    console.log('  -> Low quality: keyboard pattern');
    return true;
  }
  
  // Very high consonant-to-vowel ratio (gibberish indicator)
  const consonants = (lowerText.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
  const vowels = (lowerText.match(/[aeiou]/gi) || []).length;
  if (vowels > 0 && consonants / vowels > 5) {
    console.log('  -> Low quality: high consonant ratio');
    return true;
  }
  
  // Excessive repeated patterns (lalala, hahaha, asdasd)
  if (/(\w{2,})\1{2,}/.test(lowerText)) {
    console.log('  -> Low quality: repeated pattern');
    return true;
  }
  
  // Check for alternating character patterns (ababab, adadad, etc.)
  if (/^([a-z]{1,3})\1{3,}$/i.test(lowerText)) {
    console.log('  -> Low quality: alternating pattern');
    return true;
  }
  
  // Very low vowel diversity (only one vowel repeated)
  const uniqueVowels = new Set(lowerText.match(/[aeiou]/gi) || []);
  if (lowerText.length > 5 && uniqueVowels.size === 1) {
    console.log('  -> Low quality: single vowel type');
    return true;
  }
  
  // Check for very low character diversity (using same few characters)
  const uniqueChars = new Set(lowerText.split(''));
  if (lowerText.length > 8 && uniqueChars.size < 4) {
    console.log('  -> Low quality: low character diversity');
    return true;
  }
  
  // No spaces and very long (likely keyboard mashing)
  if (lowerText.length > 15 && !lowerText.includes(' ')) {
    const charFrequency = new Map<string, number>();
    for (const char of lowerText) {
      charFrequency.set(char, (charFrequency.get(char) || 0) + 1);
    }
    // If any character appears more than 40% of the time, it's suspicious
    const maxFreq = Math.max(...Array.from(charFrequency.values()));
    if (maxFreq / lowerText.length > 0.4) {
      console.log('  -> Low quality: high character frequency');
      return true;
    }
  }
  
  console.log('  -> Quality OK');
  return false;
}

export function inferScoreFromText(text: string, keywords: KeywordMapping): number {
  const lowerText = text.toLowerCase().trim();
  
  // Don't penalize score for low-quality answers, just return neutral
  // Confidence will be reduced separately
  if (isLowQualityAnswer(text)) {
    return 50; // Neutral score
  }
  
  // Check for negation words that flip the meaning
  const negationWords = [
    'not', 'no', 'never', 'don\'t', 'dont', 'doesn\'t', 'doesnt', 
    'didn\'t', 'didnt', 'won\'t', 'wont', 'wouldn\'t', 'wouldnt',
    'can\'t', 'cant', 'cannot', 'isn\'t', 'isnt', 'aren\'t', 'arent',
    'wasn\'t', 'wasnt', 'weren\'t', 'werent', 'hardly', 'barely',
    'neither', 'nor', 'none', 'nobody', 'nothing', 'nowhere'
  ];
  
  const hasNegation = negationWords.some(neg => {
    // Check if negation word exists as a separate word (not part of another word)
    const regex = new RegExp(`\\b${neg}\\b`, 'i');
    return regex.test(lowerText);
  });
  
  // Simple prototype: check which sample answer category the user's answer is closest to
  // We'll use keyword matching as a simple similarity measure
  
  const levels = [
    { keywords: keywords.veryHigh, score: 100 },
    { keywords: keywords.high, score: 75 },
    { keywords: keywords.moderate, score: 50 },
    { keywords: keywords.low, score: 25 },
    { keywords: keywords.veryLow, score: 0 }
  ];
  
  // Count matches for each level and track which keywords matched
  let bestMatch = { score: 50, matchCount: 0, matchedKeywords: [] as string[] }; // Default to moderate
  
  for (const level of levels) {
    let matchCount = 0;
    const matchedKeywords: string[] = [];
    for (const keyword of level.keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        matchCount++;
        matchedKeywords.push(keyword.toLowerCase());
      }
    }
    
    // If this level has more matches, use it
    if (matchCount > bestMatch.matchCount) {
      bestMatch = { score: level.score, matchCount, matchedKeywords };
    }
  }
  
  // Check if the matched keyword itself contains negation (e.g., "no plans", "not interested")
  // If so, don't flip the score - the negation is already part of the intended meaning
  const matchedKeywordContainsNegation = bestMatch.matchedKeywords.some(keyword => 
    negationWords.some(neg => keyword.includes(neg))
  );
  
  // If negation detected and score is high/very high, flip to low/very low
  // If negation detected and score is low/very low, flip to high/very high
  // BUT only if the matched keyword doesn't already contain the negation
  if (hasNegation && bestMatch.matchCount > 0 && !matchedKeywordContainsNegation) {
    if (bestMatch.score === 100) {
      bestMatch.score = 0; // "not excellent" -> very low
    } else if (bestMatch.score === 75) {
      bestMatch.score = 25; // "not confident" -> low
    } else if (bestMatch.score === 0) {
      bestMatch.score = 100; // "not terrible" -> very high
    } else if (bestMatch.score === 25) {
      bestMatch.score = 75; // "not difficult" -> high
    }
    // Moderate (50) stays moderate even with negation
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

  // Calculate base confidence
  let confidence = Math.round((attitude + subjectiveNorm + perceivedControl) / 3);
  
  // Reduce confidence for low-quality answers
  const lowQualityCount = Array.from(answers.values()).filter(a => isLowQualityAnswer(a.text)).length;
  console.log('Low quality answers detected:', lowQualityCount);
  const qualityPenalty = lowQualityCount * 8; // Reduce confidence by 8% per low-quality answer
  confidence = Math.max(10, confidence - qualityPenalty);
  console.log('Final TPB confidence:', confidence, '(penalty:', qualityPenalty, ')');

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
  
  // Base confidence from variance
  let confidence = Math.round(Math.max(50, 100 - (stdDev * 12.5)));
  
  // Reduce confidence for low-quality answers
  const lowQualityCount = Array.from(answers.values()).filter(a => isLowQualityAnswer(a.text)).length;
  const qualityPenalty = lowQualityCount * 8; // Reduce confidence by 8% per low-quality answer
  confidence = Math.max(10, confidence - qualityPenalty);

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

  let confidence = Math.round((attitude + subjectiveNorm + perceivedControl) / 3);
  
  // Reduce confidence for low-quality answers in real-time
  const lowQualityCount = Array.from(state.answers.values()).filter(a => isLowQualityAnswer(a.text)).length;
  const qualityPenalty = lowQualityCount * 8;
  confidence = Math.max(10, confidence - qualityPenalty);

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
    let ttmConfidence = Math.round(Math.max(50, 100 - (stdDev * 12.5)));
    
    // Reduce TTM confidence for low-quality answers in real-time
    ttmConfidence = Math.max(10, ttmConfidence - qualityPenalty);

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
      confidence: ttmConfidence,
      description
    };
  }

  return { tpbScores, ttmStage };
}
