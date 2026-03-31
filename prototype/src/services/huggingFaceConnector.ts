/**
 * Hugging Face Connector
 * 
 * Connects to a Hugging Face conversational AI model for enhanced chatbot responses.
 * This service integrates with the questionnaire results to provide personalized
 * nutrition coaching powered by LLM.
 */

export interface HuggingFaceConfig {
  apiKey: string;
  modelId: string; // e.g., "facebook/blenderbot-400M-distill" or custom model
  apiUrl?: string; // Optional custom API endpoint
}

export interface HuggingFaceMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface HuggingFaceRequest {
  inputs: string;
  parameters?: {
    max_length?: number;
    temperature?: number;
    top_p?: number;
    do_sample?: boolean;
  };
  options?: {
    wait_for_model?: boolean;
    use_cache?: boolean;
  };
}

export interface HuggingFaceResponse {
  generated_text?: string;
  error?: string;
}

/**
 * Hugging Face API Client
 */
export class HuggingFaceConnector {
  private config: HuggingFaceConfig;
  private conversationHistory: HuggingFaceMessage[] = [];

  constructor(config: HuggingFaceConfig) {
    this.config = config;
  }

  /**
   * Initialize conversation with system context
   */
  initializeConversation(systemPrompt: string): void {
    this.conversationHistory = [
      {
        role: 'system',
        content: systemPrompt
      }
    ];
  }

  /**
   * Send a message to Hugging Face model
   */
  async sendMessage(
    userMessage: string,
    context?: {
      tpbScores?: { attitude: number; subjectiveNorm: number; perceivedControl: number };
      ttmStage?: string;
      interventionMode?: string;
    }
  ): Promise<string> {
    try {
      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      // Build context-aware prompt
      let prompt = this.buildPrompt(userMessage, context);

      // Make API request
      const response = await this.callHuggingFaceAPI(prompt);

      // Add assistant response to history
      if (response.generated_text) {
        this.conversationHistory.push({
          role: 'assistant',
          content: response.generated_text
        });
        return response.generated_text;
      } else if (response.error) {
        throw new Error(response.error);
      } else {
        throw new Error('No response from Hugging Face API');
      }
    } catch (error) {
      console.error('Hugging Face API error:', error);
      throw error;
    }
  }

  /**
   * Build context-aware prompt
   */
  private buildPrompt(
    userMessage: string,
    context?: {
      tpbScores?: { attitude: number; subjectiveNorm: number; perceivedControl: number };
      ttmStage?: string;
      interventionMode?: string;
    }
  ): string {
    let prompt = '';

    // Add conversation history
    for (const msg of this.conversationHistory) {
      if (msg.role === 'system') {
        prompt += `System: ${msg.content}\n\n`;
      } else if (msg.role === 'user') {
        prompt += `User: ${msg.content}\n\n`;
      } else {
        prompt += `Assistant: ${msg.content}\n\n`;
      }
    }

    // Add context if available
    if (context) {
      prompt += 'Context:\n';
      if (context.tpbScores) {
        prompt += `- Attitude: ${context.tpbScores.attitude}/100\n`;
        prompt += `- Social Support: ${context.tpbScores.subjectiveNorm}/100\n`;
        prompt += `- Confidence: ${context.tpbScores.perceivedControl}/100\n`;
      }
      if (context.ttmStage) {
        prompt += `- Readiness Stage: ${context.ttmStage}\n`;
      }
      if (context.interventionMode) {
        prompt += `- Intervention Mode: ${context.interventionMode}\n`;
      }
      prompt += '\n';
    }

    prompt += `User: ${userMessage}\n\nAssistant:`;

    return prompt;
  }

  /**
   * Call Hugging Face Inference API
   */
  private async callHuggingFaceAPI(prompt: string): Promise<HuggingFaceResponse> {
    const apiUrl = this.config.apiUrl || `https://api-inference.huggingface.co/models/${this.config.modelId}`;

    const request: HuggingFaceRequest = {
      inputs: prompt,
      parameters: {
        max_length: 500,
        temperature: 0.7,
        top_p: 0.9,
        do_sample: true
      },
      options: {
        wait_for_model: true,
        use_cache: false
      }
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Handle different response formats
    if (Array.isArray(data) && data.length > 0) {
      return { generated_text: data[0].generated_text };
    } else if (data.generated_text) {
      return { generated_text: data.generated_text };
    } else if (data.error) {
      return { error: data.error };
    } else {
      return { error: 'Unknown response format' };
    }
  }

  /**
   * Reset conversation history
   */
  resetConversation(): void {
    this.conversationHistory = [];
  }

  /**
   * Get conversation history
   */
  getHistory(): HuggingFaceMessage[] {
    return [...this.conversationHistory];
  }
}

/**
 * Create a nutrition coaching system prompt
 */
export function createNutritionCoachingPrompt(
  tpbScores?: { attitude: number; subjectiveNorm: number; perceivedControl: number },
  ttmStage?: string
): string {
  let prompt = `You are NutriBot, a compassionate and knowledgeable Filipino nutrition coach. Your role is to provide personalized, culturally-appropriate nutrition guidance based on behavioral science principles (Theory of Planned Behavior and Transtheoretical Model).

Guidelines:
- Be warm, supportive, and non-judgmental
- Use Filipino context and food examples
- Provide practical, actionable advice
- Match your approach to the user's readiness for change
- Address barriers and build confidence
- Keep responses concise and conversational (2-3 paragraphs max)
`;

  if (tpbScores) {
    prompt += `\nUser's Behavioral Profile:
- Attitude toward healthy eating: ${tpbScores.attitude}/100 (${interpretScore(tpbScores.attitude)})
- Social support: ${tpbScores.subjectiveNorm}/100 (${interpretScore(tpbScores.subjectiveNorm)})
- Confidence/ability: ${tpbScores.perceivedControl}/100 (${interpretScore(tpbScores.perceivedControl)})
`;
  }

  if (ttmStage) {
    prompt += `\nUser's Readiness Stage: ${ttmStage}
`;
    prompt += getStageGuidance(ttmStage);
  }

  return prompt;
}

function interpretScore(score: number): string {
  if (score < 34) return 'low';
  if (score < 67) return 'moderate';
  return 'high';
}

function getStageGuidance(stage: string): string {
  const guidance: Record<string, string> = {
    'preContemplation': '- Focus on awareness and benefits, not pressure to change',
    'contemplation': '- Help explore pros/cons and build motivation',
    'preparation': '- Assist with planning and building confidence',
    'action': '- Provide practical support and encouragement',
    'maintenance': '- Reinforce success and prevent relapse'
  };
  return guidance[stage] || '';
}

/**
 * Example usage and configuration
 */
export const EXAMPLE_CONFIG: HuggingFaceConfig = {
  apiKey: 'YOUR_HUGGING_FACE_API_KEY', // Replace with actual API key
  modelId: 'facebook/blenderbot-400M-distill', // Or use a custom fine-tuned model
  // Alternative models:
  // - 'microsoft/DialoGPT-medium'
  // - 'facebook/blenderbot-1B-distill'
  // - Your custom model: 'username/model-name'
};

/**
 * Initialize connector with environment variable
 */
export function createConnectorFromEnv(): HuggingFaceConnector | null {
  const apiKey = process.env.REACT_APP_HUGGINGFACE_API_KEY;
  const modelId = process.env.REACT_APP_HUGGINGFACE_MODEL_ID || 'facebook/blenderbot-400M-distill';

  if (!apiKey) {
    console.warn('Hugging Face API key not found in environment variables');
    return null;
  }

  return new HuggingFaceConnector({
    apiKey,
    modelId
  });
}
