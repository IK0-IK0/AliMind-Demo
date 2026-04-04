import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Chip,
  Stack,
  Fade,
  Typography,
  Button,
  Alert,
  Divider,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel } from
'@mui/material';
import {
  Send as SendIcon,
  SmartToy as SmartToyIcon,
  Person as PersonIcon,
  RestartAlt as RestartAltIcon,
  Home as HomeIcon,
  Science as ScienceIcon } from
'@mui/icons-material';
import { processChatMessage, ChatbotResponse } from '../services/chatbotService';
import { TPBScores } from '../services/tpbInference';
import { TTMStage } from '../services/ttmInference';
import {
  initializeQuestionnaire,
  answerQuestion,
  getCurrentQuestion,
  getProgress,
  getQuestionNumberDisplay,
  calculateInterimScores,
  QuestionnaireState
} from '../services/questionnaireService';
import { ShapeGrid } from './ShapeGrid';

type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  metadata?: {
    tpbScores?: TPBScores;
    ttmStage?: TTMStage;
    interventionMode?: string;
  };
};

type ChatbotShowcaseProps = {
  onResetSession?: () => void;
  initialTPBScores?: TPBScores;
  initialTTMStage?: TTMStage;
  onQuestionnaireStart?: () => void;
  isFullscreen?: boolean;
  onBackToHome?: () => void;
};

const INITIAL_MESSAGE: Message = {
  id: '1',
  text: "Hi there! I'm AliMind 🌱. Before we start, I'd like to ask you 20 questions to better understand your situation and readiness for change. This will help me provide personalized guidance. Ready to begin?",
  sender: 'bot'
};

// Generate personalized intervention based on TTM stage and TPB scores
function generateInterventionMessage(
  ttmStage: TTMStage | null,
  tpbScores: TPBScores | null,
  weakestDeterminant: 'attitude' | 'subjectiveNorm' | 'perceivedControl'
): string {
  if (!ttmStage || !tpbScores) {
    return "I'm here to support you on your nutrition journey. Feel free to ask me anything!";
  }

  const stage = ttmStage.stage;
  let message = "";

  // Conversational opening based on stage
  switch (stage) {
    case 'preContemplation':
      message += "I can see you're in the early stages of thinking about healthy eating. That's actually a really important first step - just being here and exploring this shows you're open to learning more.\n\n";
      break;
    case 'contemplation':
      message += "You're thinking about making changes to your eating habits, which is great! It's totally normal to have mixed feelings at this stage. Let's work through what might help you move forward.\n\n";
      break;
    case 'preparation':
      message += "You're getting ready to make some changes - that's exciting! You're at a point where planning and preparation can really set you up for success.\n\n";
      break;
    case 'action':
      message += "You're actively working on changing your eating habits - that's amazing! This is where the real work happens, and I'm here to help you stay on track.\n\n";
      break;
    case 'maintenance':
      message += "You've been maintaining healthy eating habits - congratulations! The focus now is on keeping up the great work and preventing any setbacks.\n\n";
      break;
  }

  // Stage-matched interventions based on weakest TPB determinant
  message += "💡 Here's what I think could help you most:\n\n";

  // LOW ATTITUDE interventions
  if (weakestDeterminant === 'attitude') {
    switch (stage) {
      case 'preContemplation':
        message += "🍎 Building Positive Feelings About Healthy Food\n\n";
        message += "I notice you might not feel very positive about healthy eating right now, and that's okay. The good news is we can start really small. Think about what healthy eating means to YOU - it doesn't have to be boring salads or giving up everything you enjoy!\n\n";
        message += "Try exploring foods you already like that happen to be nutritious. Maybe you enjoy fruit, or grilled chicken, or stir-fried vegetables. Start noticing those things. Also, learn a bit about how good nutrition can help you feel more energetic and focused throughout the day. The goal right now isn't to change what you eat, but just to help you see that healthy eating can actually be enjoyable and worthwhile. No pressure to do anything yet - just explore and learn at your own pace.";
        break;

      case 'contemplation':
        message += "🍎 Making Healthy Eating More Appealing\n\n";
        message += "You're thinking about change, but healthy eating might not seem very appealing yet. Let's work on that together. Here's what I'd suggest: try finding one new healthy recipe that looks genuinely delicious to you. Focus on adding foods you might enjoy rather than removing foods you love.\n\n";
        message += "Pay attention to how you feel after eating different foods - your energy levels, your mood, how satisfied you feel. Connect with the benefits that matter most to YOU, whether that's having more energy, looking better, or just feeling healthier. When healthy eating feels good and rewarding, it becomes much easier to commit to making changes.";
        break;

      case 'preparation':
        message += "🍎 Creating Positive Experiences with Healthy Food\n\n";
        message += "As you prepare to start, let's make sure healthy eating feels enjoyable from day one. Plan your meals around healthy foods you actually like or want to try - don't force yourself to eat things you hate just because they're 'healthy.' Find ways to make healthy food convenient for yourself, like doing some meal prep or keeping easy recipes on hand.\n\n";
        message += "Set up some rewards for yourself when you eat well (just not food rewards!). And keep reminding yourself why YOU want to do this - what personal benefits matter to you? Starting with foods and approaches you feel good about will help you stick with it when things get tough.";
        break;

      case 'action':
        message += "🍎 Keeping Healthy Eating Enjoyable\n\n";
        message += "You're making changes, but let's make sure you're actually enjoying the process. Experiment with new recipes and flavors to keep things interesting - healthy eating shouldn't be boring! Notice and celebrate how good you feel when you're eating well. Your energy, your mood, how your body feels.\n\n";
        message += "Allow yourself some flexibility too. Healthy eating doesn't mean perfection, and it's okay to enjoy treats sometimes. Focus on what you're gaining - more energy, better health, feeling good - rather than what you're giving up. If healthy eating feels like a constant chore, it's really hard to maintain long-term.";
        break;

      case 'maintenance':
        message += "🍎 Sustaining Your Positive Relationship with Food\n\n";
        message += "You've been doing well, but let's keep that positive attitude strong. Continue exploring new healthy foods and recipes to prevent boredom from creeping in. Regularly remind yourself of the benefits you've experienced - how much better you feel, the positive changes you've noticed.\n\n";
        message += "Share your favorite healthy meals with others, and allow yourself occasional treats without guilt. Balance is really key here. Maintaining a positive attitude toward healthy eating will help you sustain these habits for the long haul, not just for a few months.";
        break;
    }
  }

  // LOW SUBJECTIVE NORM interventions
  else if (weakestDeterminant === 'subjectiveNorm') {
    switch (stage) {
      case 'preContemplation':
        message += "👥 Building Your Support Network\n\n";
        message += "It looks like you might not have much support for healthy eating right now. That can definitely make things harder, but we can work on building that support. Start by looking for people in your life who eat relatively healthy - they might inspire you or give you ideas.\n\n";
        message += "You could also follow some social media accounts that share positive nutrition content. Notice that many people around you probably care about their health too, even if they don't talk about it much. You don't need everyone's support - just a few encouraging people can make a real difference. Right now, just start noticing who in your life might be supportive when you're ready to make changes.";
        break;

      case 'contemplation':
        message += "👥 Finding Your Support System\n\n";
        message += "Social support can make a huge difference when you're changing eating habits. Let's build yours up. Try talking to one trusted friend or family member about your thoughts on eating healthier - you might be surprised by their response. You could also join online communities focused on healthy eating, like forums or Facebook groups where people share tips and encouragement.\n\n";
        message += "Maybe you have a friend who might want to make changes with you? That can be really powerful. Remember that not everyone needs to support you - some people might not get it, and that's okay. Focus your energy on the people who do support you. Having even one supportive person can make the journey much easier and more enjoyable.";
        break;

      case 'preparation':
        message += "👥 Getting Your Support Team Ready\n\n";
        message += "Before you start, let's make sure you have people in your corner. Tell specific people about your plans and ask for their support - be direct about what would help you. Maybe invite family members to join you for healthy meals, or find an accountability partner who's also working on health goals.\n\n";
        message += "It's also smart to plan how you'll handle situations where others might not be supportive. Some people might offer you unhealthy food or make comments about your choices. Think about how you'll respond to that ahead of time. Starting with a support system in place will help you navigate these challenges more easily.";
        break;

      case 'action':
        message += "👥 Strengthening Your Support Network\n\n";
        message += "You're making changes, and having support will really help you keep going. Share your progress with supportive friends and family - they'll probably be excited for you! Try connecting with others who are also eating healthy, whether that's online or in person. It helps to know you're not alone in this.\n\n";
        message += "Don't be afraid to ask for specific help when you need it. Maybe someone could meal prep with you, or just give you encouragement when you're struggling. And honestly, if there are people who actively discourage your efforts, it might be worth spending less time with them right now. Your social environment can either support or undermine your efforts, so actively cultivate the support you need.";
        break;

      case 'maintenance':
        message += "👥 Maintaining Your Support Circle\n\n";
        message += "Keep nurturing the relationships that support your healthy habits. Continue sharing meals with people who support your choices, and be a role model for others who want to eat healthier. You've learned a lot on this journey, and sharing that can help others while reinforcing your own commitment.\n\n";
        message += "Stay connected with your health-focused community, whether that's online or in person. And take a moment to express gratitude to people who've supported your journey - they've been part of your success. The social support that helped you get here will help you stay here too.";
        break;
    }
  }

  // LOW PERCEIVED CONTROL interventions
  else {
    switch (stage) {
      case 'preContemplation':
        message += "💪 Building Your Confidence\n\n";
        message += "It seems like you might not feel very confident about your ability to eat healthy. That's actually a really common feeling, and the good news is it can change. First, know that healthy eating is a skill you can learn - nobody's born knowing how to do this stuff!\n\n";
        message += "Start noticing small things you already do that are healthy. Maybe you drink water sometimes, or eat fruit occasionally, or cook at home. Those count! Learn about simple, easy healthy eating strategies that don't require you to be a chef or nutrition expert. And remember that you don't have to be perfect - small changes really do count. Right now, focus on learning and building confidence rather than actually making changes. That will come later.";
        break;

      case 'contemplation':
        message += "💪 Identifying What You CAN Control\n\n";
        message += "You're thinking about change, but might feel uncertain about your ability to actually do it. Let's address that head-on. Start by identifying the specific barriers you face - is it time? Money? Cooking skills? Access to healthy food? Once you know what's in your way, you can brainstorm solutions.\n\n";
        message += "For each barrier, think of one possible solution. Maybe you don't have time to cook - could you do meal prep on weekends? Don't have cooking skills - could you learn a few simple recipes? Start with the easiest changes first to build your confidence gradually. And remember past successes in your life - you've overcome challenges before, even if they weren't about food. Feeling capable is crucial for making changes, so let's build that confidence step by step.";
        break;

      case 'preparation':
        message += "💪 Setting Yourself Up for Success\n\n";
        message += "Let's make sure you feel capable and prepared before you start. Begin with very small, achievable goals - like one healthy meal per day instead of trying to overhaul everything at once. Learn the basic skills you'll need, whether that's simple recipes, meal planning, or grocery shopping strategies.\n\n";
        message += "Identify potential obstacles before they happen and figure out solutions now. What will you do when you're tired? When you're stressed? When you're eating out? Gather resources that will help you succeed - recipes you like, shopping lists, meal prep containers, whatever you need. The more prepared you are, the more confident you'll feel when you actually start making changes.";
        break;

      case 'action':
        message += "💪 Building Your Capability\n\n";
        message += "You're taking action, but let's strengthen your confidence and skills along the way. Celebrate every success, no matter how small it seems. Made a healthy breakfast? That's a win! When you face obstacles, focus on problem-solving rather than giving up. What went wrong? What could you do differently next time?\n\n";
        message += "Learn from setbacks instead of letting them discourage you. Everyone has tough days - it's how you respond that matters. Gradually increase the difficulty as you build confidence. Start with easy changes, then add more challenging ones as you feel ready. Every challenge you overcome makes you more capable and confident in your ability to maintain these changes.";
        break;

      case 'maintenance':
        message += "💪 Maintaining Your Confidence\n\n";
        message += "You've proven you can do this - let's keep that confidence strong. Take some time to reflect on how far you've come and what you've learned along the way. You've developed real skills and knowledge that will serve you for life. Continue developing those skills by trying new recipes or techniques.\n\n";
        message += "Have a solid plan for handling difficult situations like travel, stress, or celebrations. These are the times when old habits can creep back in. And remember that occasional slip-ups don't mean you've lost your ability - they're just part of being human. You've built real capability here. Trust in your ability to maintain these habits, even when life gets challenging.";
        break;
    }
  }

  return message;
}

// Format TTM stage name for display
function formatStageName(stage: string): string {
  const stageNames: Record<string, string> = {
    'preContemplation': 'Pre-contemplation',
    'contemplation': 'Contemplation',
    'preparation': 'Preparation',
    'action': 'Action',
    'maintenance': 'Maintenance'
  };
  return stageNames[stage] || stage;
}


export function ChatbotShowcase({ onResetSession, initialTPBScores, initialTTMStage, onQuestionnaireStart, isFullscreen = false, onBackToHome }: ChatbotShowcaseProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTPBScores, setCurrentTPBScores] = useState<TPBScores | null>(initialTPBScores || null);
  const [currentTTMStage, setCurrentTTMStage] = useState<TTMStage | null>(initialTTMStage || null);
  const [questionnaireState, setQuestionnaireState] = useState<QuestionnaireState | null>(null);
  const [waitingForStart, setWaitingForStart] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Test dialog state
  const [testDialogOpen, setTestDialogOpen] = useState(false);
  const [testAttitude, setTestAttitude] = useState(50);
  const [testSubjectiveNorm, setTestSubjectiveNorm] = useState(50);
  const [testPerceivedControl, setTestPerceivedControl] = useState(50);
  const [testStage, setTestStage] = useState<'preContemplation' | 'contemplation' | 'preparation' | 'action' | 'maintenance'>('contemplation');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setCurrentTPBScores(null);
    setCurrentTTMStage(null);
    setInputValue('');
    setQuestionnaireState(null);
    setWaitingForStart(true);
    if (onResetSession) {
      onResetSession();
    }
  };

  const handleTestSubmit = () => {
    // Create test TPB scores
    const testTPBScores: TPBScores = {
      attitude: testAttitude,
      subjectiveNorm: testSubjectiveNorm,
      perceivedControl: testPerceivedControl,
      confidence: Math.round((testAttitude + testSubjectiveNorm + testPerceivedControl) / 3)
    };

    // Create test TTM stage
    const stageDescriptions: Record<string, string> = {
      'preContemplation': 'Not yet considering change',
      'contemplation': 'Thinking about making changes',
      'preparation': 'Getting ready to take action',
      'action': 'Actively making changes',
      'maintenance': 'Maintaining healthy habits'
    };

    const testTTMStage: TTMStage = {
      stage: testStage,
      confidence: 85,
      description: stageDescriptions[testStage]
    };

    // Set scores
    setCurrentTPBScores(testTPBScores);
    setCurrentTTMStage(testTTMStage);

    // Skip questionnaire
    setWaitingForStart(false);
    setQuestionnaireState(null);

    // Trigger fullscreen if needed
    if (onQuestionnaireStart) {
      onQuestionnaireStart();
    }

    // Generate intervention message
    const weakestDeterminant = 
      testTPBScores.attitude <= testTPBScores.subjectiveNorm && testTPBScores.attitude <= testTPBScores.perceivedControl ? 'attitude' :
      testTPBScores.subjectiveNorm <= testTPBScores.perceivedControl ? 'subjectiveNorm' : 'perceivedControl';
    
    const interventionMessage = generateInterventionMessage(testTTMStage, testTPBScores, weakestDeterminant);

    // Add completion message
    const completionMessage: Message = {
      id: Date.now().toString(),
      text: `Test scores loaded! 🧪\n\nHere's your test profile:\n\n📊 Your Behavioral Profile:\n• Attitude toward healthy eating: ${testTPBScores.attitude}/100\n• Social support: ${testTPBScores.subjectiveNorm}/100\n• Confidence in your ability: ${testTPBScores.perceivedControl}/100\n• Current stage: ${formatStageName(testTTMStage.stage)}\n\n${interventionMessage}`,
      sender: 'bot',
      metadata: {
        tpbScores: testTPBScores,
        ttmStage: testTTMStage
      }
    };

    setMessages([INITIAL_MESSAGE, completionMessage]);
    setTestDialogOpen(false);
  };

  const startQuestionnaire = () => {
    setWaitingForStart(false);
    const qState = initializeQuestionnaire();
    setQuestionnaireState(qState);
    
    // Trigger fullscreen animation
    if (onQuestionnaireStart) {
      onQuestionnaireStart();
    }
    
    // Ask first question after animation
    setTimeout(() => {
      const firstQuestion = getCurrentQuestion(qState);
      if (firstQuestion) {
        const botMessage: Message = {
          id: Date.now().toString(),
          text: firstQuestion.text,
          sender: 'bot'
        };
        setMessages(prev => [...prev, botMessage]);
      }
    }, 500);
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user'
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Check if waiting for user to start questionnaire
    if (waitingForStart) {
      const lowerText = text.toLowerCase();
      const affirmativePatterns = [
        'yes', 'yeah', 'yep', 'yup', 'ye', 'ya', 'sure', 'ok', 'okay',
        'ready', 'start', 'begin', 'let\'s go', 'lets go', 'go ahead',
        'affirmative', 'absolutely', 'definitely', 'of course', 'certainly',
        'proceed', 'continue', 'let\'s do it', 'lets do it', 'i\'m ready',
        'im ready', 'sounds good', 'alright', 'all right', 'fine', 'good'
      ];
      
      const isAffirmative = affirmativePatterns.some(pattern => lowerText.includes(pattern));
      
      if (isAffirmative) {
        setTimeout(() => {
          startQuestionnaire();
          setIsTyping(false);
          // Re-focus input
          setTimeout(() => inputRef.current?.focus(), 100);
        }, 500);
        return;
      } else {
        setTimeout(() => {
          const botMessage: Message = {
            id: Date.now().toString(),
            text: "No problem! Just let me know when you're ready to start by typing 'yes' or 'ready'.",
            sender: 'bot'
          };
          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
          // Re-focus input
          setTimeout(() => inputRef.current?.focus(), 100);
        }, 500);
        return;
      }
    }

    // Handle questionnaire flow
    if (questionnaireState && questionnaireState.isActive) {
      const currentQuestion = getCurrentQuestion(questionnaireState);
      if (currentQuestion) {
        // Process answer
        const newState = answerQuestion(questionnaireState, currentQuestion.id, text);
        setQuestionnaireState(newState);
        
        // Update interim scores in real-time
        const interimScores = calculateInterimScores(newState);
        if (interimScores.tpbScores) {
          setCurrentTPBScores(interimScores.tpbScores);
        }
        if (interimScores.ttmStage) {
          setCurrentTTMStage(interimScores.ttmStage);
        }

        setTimeout(() => {
          if (newState.isComplete) {
            // Questionnaire complete - Show interventions
            setCurrentTPBScores(newState.tpbScores);
            setCurrentTTMStage(newState.ttmStage);
            
            // Generate personalized intervention message
            const weakestDeterminant = newState.tpbScores ? 
              (newState.tpbScores.attitude <= newState.tpbScores.subjectiveNorm && newState.tpbScores.attitude <= newState.tpbScores.perceivedControl ? 'attitude' :
               newState.tpbScores.subjectiveNorm <= newState.tpbScores.perceivedControl ? 'subjectiveNorm' : 'perceivedControl') : 'attitude';
            
            const interventionMessage = generateInterventionMessage(newState.ttmStage, newState.tpbScores, weakestDeterminant);
            
            const completionMessage: Message = {
              id: Date.now().toString(),
              text: `Thanks for sharing all that with me! 🎉\n\nBased on your responses, here's what I learned about you:\n\n📊 Your Behavioral Profile:\n• Attitude toward healthy eating: ${newState.tpbScores?.attitude}/100\n• Social support: ${newState.tpbScores?.subjectiveNorm}/100\n• Confidence in your ability: ${newState.tpbScores?.perceivedControl}/100\n• Current stage: ${newState.ttmStage ? formatStageName(newState.ttmStage.stage) : 'Unknown'}\n\n${interventionMessage}`,
              sender: 'bot',
              metadata: {
                tpbScores: newState.tpbScores || undefined,
                ttmStage: newState.ttmStage || undefined
              }
            };
            setMessages(prev => [...prev, completionMessage]);
          } else {
            // Ask next question
            const nextQuestion = getCurrentQuestion(newState);
            if (nextQuestion) {
              const botMessage: Message = {
                id: Date.now().toString(),
                text: nextQuestion.text,
                sender: 'bot'
              };
              setMessages(prev => [...prev, botMessage]);
            }
          }
          setIsTyping(false);
          // Re-focus input after bot responds
          setTimeout(() => inputRef.current?.focus(), 100);
        }, 800);
        return;
      }
    }

    // Normal chat flow (after questionnaire) - NOW with personalized responses
    const delay = 1000 + Math.random() * 1000;
    
    setTimeout(async () => {
      try {
        // Use current TPB/TTM scores if available, otherwise infer from message
        const response: ChatbotResponse = await processChatMessage(text);
        
        // Update scores only if they changed (from message inference)
        if (!currentTPBScores) {
          setCurrentTPBScores(response.tpbScores);
        }
        if (!currentTTMStage) {
          setCurrentTTMStage(response.ttmStage);
        }

        // Add inference method indicator if using BERT
        let messageText = response.message;
        if (response.inferenceMethod === 'bert') {
          messageText += '\n\n✨ _Powered by AI (BERT)_';
        }

        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: messageText,
          sender: 'bot',
          metadata: {
            tpbScores: currentTPBScores || response.tpbScores,
            ttmStage: currentTTMStage || response.ttmStage,
            interventionMode: response.interventionMode
          }
        };
        setMessages((prev) => [...prev, botResponse]);
      } catch (error) {
        console.error('Error processing message:', error);
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I apologize, but I encountered an error processing your message. Please try again.',
          sender: 'bot'
        };
        setMessages((prev) => [...prev, errorResponse]);
      } finally {
        setIsTyping(false);
        // Re-focus input after bot responds
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }, delay);
  };
  return (
    <>
      <Box sx={{ 
        display: 'flex', 
        gap: isFullscreen ? 0 : 2, 
        flexDirection: { xs: 'column', lg: 'row' }, 
        flex: 1, 
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        {/* Main Chat Interface */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: isFullscreen ? 0 : 2,
            overflow: 'hidden',
            border: isFullscreen ? 'none' : '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            flex: 1,
            bgcolor: isFullscreen ? '#D5EDD8' : '#FAFAFA',
            position: 'relative'
          }}>
          
          {/* Circle Grid Background - Only in fullscreen */}
          {isFullscreen && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0,
                pointerEvents: 'none'
              }}>
              <ShapeGrid
                shape="circle"
                borderColor="#ffffff"
                squareSize={100}
                direction="right"
                speed={0.5}
              />
            </Box>
          )}
          
          {/* Chat Header */}
          <Box
            sx={{
              bgcolor: '#4CAF50',
              color: 'white',
              p: { xs: 1.5, sm: 2 },
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 2 },
              position: 'relative',
              zIndex: 1
            }}>
            
            <Avatar
              sx={{
                bgcolor: 'white',
                color: '#4CAF50',
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 }
              }}>
              
              <SmartToyIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.2,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}>
                
                AliMind
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.9,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  display: { xs: 'none', sm: 'block' }
                }}>
                
                TPB/TTM-Based Nutrition Assistant
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {isFullscreen && onBackToHome && (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<HomeIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
                  onClick={onBackToHome}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                    px: { xs: 1, sm: 2 },
                    minWidth: { xs: 'auto', sm: 'auto' },
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Back to Home</Box>
                  <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Home</Box>
                </Button>
              )}
              <Button
                variant="outlined"
                size="small"
                startIcon={<ScienceIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
                onClick={() => setTestDialogOpen(true)}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                  px: { xs: 1, sm: 2 },
                  minWidth: { xs: 'auto', sm: 'auto' },
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Test</Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Test</Box>
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<RestartAltIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
                onClick={handleReset}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                  px: { xs: 1, sm: 2 },
                  minWidth: { xs: 'auto', sm: 'auto' },
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Reset Session</Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Reset</Box>
              </Button>
            </Box>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              position: 'relative',
              zIndex: 1
            }}>
            
            {messages.map((msg) =>
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent:
                msg.sender === 'user' ? 'flex-end' : 'flex-start',
                gap: { xs: 1, sm: 1.5 }
              }}>
              
                {msg.sender === 'bot' &&
              <Avatar
                sx={{
                  bgcolor: '#E8F5E9',
                  color: '#4CAF50',
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 }
                }}>
                
                    <SmartToyIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
                  </Avatar>
              }
                <Box sx={{ maxWidth: { xs: '80%', sm: '75%' } }}>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mb: 0.5,
                      ml: msg.sender === 'user' ? 'auto' : 0,
                      mr: msg.sender === 'bot' ? 'auto' : 0,
                      color: '#666',
                      fontWeight: 600,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      textAlign: msg.sender === 'user' ? 'right' : 'left'
                    }}>
                    {msg.sender === 'bot' ? 'AliMind' : 'You'}
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 1.5, sm: 2 },
                      borderRadius:
                      msg.sender === 'user' ?
                      '12px 12px 4px 12px' :
                      '12px 12px 12px 4px',
                      bgcolor: msg.sender === 'user' ? '#00897B' : 'white',
                      color: msg.sender === 'user' ? 'white' : '#2E7D32',
                      border:
                      msg.sender === 'bot' ?
                      '1px solid rgba(0,0,0,0.05)' :
                      'none'
                    }}>
                
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.5,
                        whiteSpace: 'pre-line',
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }}>
                  
                      {msg.text}
                    </Typography>
                  </Paper>
                </Box>
                {msg.sender === 'user' &&
              <Avatar
                sx={{
                  bgcolor: '#00897B',
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 }
                }}>
                
                    <PersonIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
                  </Avatar>
              }
              </Box>
            )}

            {isTyping &&
            <Fade in={isTyping}>
                <Box
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  alignItems: 'center'
                }}>
                
                  <Avatar
                  sx={{
                    bgcolor: '#E8F5E9',
                    color: '#4CAF50',
                    width: 32,
                    height: 32
                  }}>
                  
                    <SmartToyIcon fontSize="small" />
                  </Avatar>
                  <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: '12px 12px 12px 4px',
                    bgcolor: 'white',
                    border: '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    gap: 0.5,
                    alignItems: 'center'
                  }}>
                  
                    <Box
                    sx={{
                      width: 6,
                      height: 6,
                      bgcolor: '#A5D6A7',
                      borderRadius: '50%',
                      animation: 'nutriPulse 1.5s infinite ease-in-out'
                    }} />
                  
                    <Box
                    sx={{
                      width: 6,
                      height: 6,
                      bgcolor: '#A5D6A7',
                      borderRadius: '50%',
                      animation: 'nutriPulse 1.5s infinite ease-in-out 0.2s'
                    }} />
                  
                    <Box
                    sx={{
                      width: 6,
                      height: 6,
                      bgcolor: '#A5D6A7',
                      borderRadius: '50%',
                      animation: 'nutriPulse 1.5s infinite ease-in-out 0.4s'
                    }} />
                  
                  </Paper>
                </Box>
              </Fade>
            }
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              bgcolor: 'white',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              position: 'relative',
              zIndex: 1
            }}>
            
            <Box
              sx={{
                display: 'flex',
                gap: 1
              }}>
              
              <TextField
                fullWidth
                placeholder="Tell me about your eating habits or nutrition goals..."
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(inputValue);
                    // Keep focus on input after sending
                    setTimeout(() => {
                      inputRef.current?.focus();
                    }, 0);
                  }
                }}
                disabled={isTyping}
                inputRef={inputRef}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    bgcolor: '#FAFAFA',
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  },
                  '& .MuiInputBase-input': {
                    py: { xs: 1.5, sm: 2 }
                  }
                }} />
              
              <IconButton
                color="primary"
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                sx={{
                  bgcolor: '#4CAF50',
                  color: 'white',
                  width: { xs: 48, sm: 56 },
                  height: { xs: 48, sm: 56 },
                  '&:hover': {
                    bgcolor: '#43A047'
                  },
                  '&.Mui-disabled': {
                    bgcolor: '#E0E0E0',
                    color: '#9E9E9E'
                  }
                }}
                aria-label="Send message">
                
                <SendIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Sidebar Panel - TPB/TTM Scores */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: isFullscreen ? 0 : 2,
            p: { xs: 2, sm: 3 },
            width: { xs: '100%', lg: '350px' },
            height: '100%',
            border: isFullscreen ? 'none' : '1px solid rgba(0,0,0,0.08)',
            borderLeft: isFullscreen ? '1px solid rgba(0,0,0,0.08)' : undefined,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflow: 'auto'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2E7D32', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Your Profile
          </Typography>

          <Divider />

          {/* Questionnaire Progress */}
          {questionnaireState && questionnaireState.isActive && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#555' }}>
                Questionnaire Progress
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                {getQuestionNumberDisplay(questionnaireState)}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={getProgress(questionnaireState)}
                sx={{
                  mt: 1,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#E0E0E0',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#4CAF50'
                  }
                }}
              />
              <Typography variant="caption" sx={{ color: '#4CAF50', fontWeight: 600, mt: 0.5, display: 'block' }}>
                {getProgress(questionnaireState)}% Complete
              </Typography>
            </Box>
          )}

          {questionnaireState && questionnaireState.isActive && <Divider />}

          {/* TTM Stage */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#555' }}>
              Readiness Stage (TTM)
            </Typography>
            {currentTTMStage ? (
              <Box>
                <Chip
                  label={formatStageName(currentTTMStage.stage)}
                  sx={{
                    bgcolor: '#E8F5E9',
                    color: '#2E7D32',
                    fontWeight: 600,
                    mb: 1,
                    width: '100%',
                    justifyContent: 'flex-start'
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Stage Progress
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {(() => {
                      const stageMap: Record<string, number> = {
                        'preContemplation': 20,
                        'contemplation': 40,
                        'preparation': 60,
                        'action': 80,
                        'maintenance': 100
                      };
                      return stageMap[currentTTMStage.stage] || 0;
                    })()}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(() => {
                    const stageMap: Record<string, number> = {
                      'preContemplation': 20,
                      'contemplation': 40,
                      'preparation': 60,
                      'action': 80,
                      'maintenance': 100
                    };
                    return stageMap[currentTTMStage.stage] || 0;
                  })()}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: '#E0E0E0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#4CAF50'
                    }
                  }}
                />
                <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem', display: 'block', mt: 0.5 }}>
                  Confidence: {currentTTMStage.confidence}%
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" sx={{ color: '#999', fontStyle: 'italic' }}>
                Start chatting to see your readiness stage
              </Typography>
            )}
          </Box>

          <Divider />

          {/* TPB Scores */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#555' }}>
              Behavioral Factors (TPB)
            </Typography>
            {currentTPBScores ? (
              <Stack spacing={2}>
                {/* Attitude */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      Attitude
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {currentTPBScores.attitude}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={currentTPBScores.attitude}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#E0E0E0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: currentTPBScores.attitude >= 67 ? '#4CAF50' : currentTPBScores.attitude >= 34 ? '#FFA726' : '#EF5350'
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
                    How you feel about healthy eating
                  </Typography>
                </Box>

                {/* Subjective Norm */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      Subjective Norm
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {currentTPBScores.subjectiveNorm}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={currentTPBScores.subjectiveNorm}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#E0E0E0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: currentTPBScores.subjectiveNorm >= 67 ? '#4CAF50' : currentTPBScores.subjectiveNorm >= 34 ? '#FFA726' : '#EF5350'
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
                    Support from family and friends
                  </Typography>
                </Box>

                {/* Perceived Control */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      Perceived Behavioral Control
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {currentTPBScores.perceivedControl}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={currentTPBScores.perceivedControl}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#E0E0E0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: currentTPBScores.perceivedControl >= 67 ? '#4CAF50' : currentTPBScores.perceivedControl >= 34 ? '#FFA726' : '#EF5350'
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
                    Your ability to make changes
                  </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                {/* Overall TPB Confidence */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                      Overall Confidence
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                      {currentTPBScores.confidence}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={currentTPBScores.confidence}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: '#E0E0E0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: currentTPBScores.confidence >= 67 ? '#4CAF50' : currentTPBScores.confidence >= 34 ? '#FFA726' : '#EF5350'
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
                    Average of all behavioral factors
                  </Typography>
                </Box>
              </Stack>
            ) : (
              <Typography variant="body2" sx={{ color: '#999', fontStyle: 'italic' }}>
                Start chatting to see your behavioral profile
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 'auto' }}>
            <Divider sx={{ mb: 2 }} />
            <Alert severity="warning" sx={{ fontSize: '0.75rem' }}>
              <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, mb: 0.5 }}>
                Disclaimer
              </Typography>
              <Typography variant="caption">
                This advice is for informational purposes only and is not medical guidance. Please consult with a healthcare professional for personalized advice.
              </Typography>
            </Alert>
          </Box>
        </Paper>
      </Box>

      {/* Test Dialog */}
      <Dialog open={testDialogOpen} onClose={() => setTestDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Test Mode - Set Scores</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Attitude Score"
              type="number"
              value={testAttitude}
              onChange={(e) => setTestAttitude(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
              inputProps={{ min: 0, max: 100 }}
              fullWidth
              helperText="0-100"
            />
            <TextField
              label="Subjective Norm Score"
              type="number"
              value={testSubjectiveNorm}
              onChange={(e) => setTestSubjectiveNorm(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
              inputProps={{ min: 0, max: 100 }}
              fullWidth
              helperText="0-100"
            />
            <TextField
              label="Perceived Control Score"
              type="number"
              value={testPerceivedControl}
              onChange={(e) => setTestPerceivedControl(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
              inputProps={{ min: 0, max: 100 }}
              fullWidth
              helperText="0-100"
            />
            <FormControl fullWidth>
              <InputLabel>TTM Stage</InputLabel>
              <Select
                value={testStage}
                label="TTM Stage"
                onChange={(e) => setTestStage(e.target.value as any)}
              >
                <MenuItem value="preContemplation">Pre-contemplation</MenuItem>
                <MenuItem value="contemplation">Contemplation</MenuItem>
                <MenuItem value="preparation">Preparation</MenuItem>
                <MenuItem value="action">Action</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTestDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleTestSubmit} variant="contained" color="primary">
            Load Test Scores
          </Button>
        </DialogActions>
      </Dialog>

      <style>
        {`
          @keyframes nutriPulse {
            0%, 100% { transform: scale(0.8); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 1; }
          }
        `}
      </style>
    </>);

}