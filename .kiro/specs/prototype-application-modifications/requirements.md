# Requirements Document

## Introduction

This document defines the requirements for transforming the NutriBot prototype (a React/TypeScript landing page with chatbot demo) into a fully functional nutrition assistant application based on the Theory of Planned Behavior (TPB) and Transtheoretical Model (TTM) theoretical framework. The prototype currently includes a landing page with Hero, Features, HowItWorks, ContactSection, Footer components, and a demo page with a ChatbotShowcase component using Material-UI styling with a green/teal health-focused color scheme.

The application will extend the prototype by:
1. Updating the homepage to accurately reflect the TPB/TTM-based conversational AI system for dietary behavior change targeting Filipino young adults and adults aged 18-40 in Davao City
2. Replacing the mock chatbot with a real AI-powered chatbot that implements the seven-step computational pipeline (Context Collection → TPB Inference → TTM Stage Estimation → Intervention Mode Selection → TPB-Targeted Intervention → Recipe Generation → Response Generation)
3. Adding backend integration, user authentication, persistent chat history, real nutrition data integration, meal planning capabilities, and progress tracking features while maintaining the existing design language and user experience

## Glossary

- **NutriBot_Application**: The complete nutrition assistant web application including frontend and backend
- **User**: A Filipino young adult or adult aged 18-40 in Davao City who interacts with the NutriBot application
- **Chat_System**: The conversational AI interface that implements the seven-step computational pipeline for personalized nutrition coaching
- **TPB**: Theory of Planned Behavior - a psychological framework that identifies Attitude, Subjective Norm, and Perceived Behavioral Control as determinants of behavioral intention
- **TTM**: Transtheoretical Model - a stage-based model of behavior change with five stages: Pre-contemplation, Contemplation, Preparation, Action, and Maintenance
- **Seven_Step_Pipeline**: The computational architecture consisting of: (1) Conversational Context Collection, (2) TPB Construct Inference, (3) TTM Stage Estimation, (4) Intervention Mode Selection, (5) TPB-Targeted Intervention Choice, (6) Feasible Dish/Plan Generation, (7) Response Generation
- **BCT**: Behavior Change Technique - specific, observable, replicable components of behavioral interventions designed to alter psychological determinants of behavior
- **Nutrition_Database**: External or internal data source containing food nutrition information (e.g., USDA FoodData Central, RecipeNLG)
- **Meal_Plan**: A structured set of meals and snacks for a specific time period
- **User_Profile**: Stored user information including dietary preferences, goals, health metrics, and TPB/TTM psychological constructs
- **Authentication_System**: The system that manages user login, registration, and session management
- **Progress_Tracker**: The system that records and displays user nutrition and health progress over time, including longitudinal TPB/TTM tracking
- **Backend_API**: The server-side application that handles data processing, storage, business logic, and AI model inference
- **AI_Language_Model**: The natural language processing system (e.g., OpenAI GPT-4, Llama 3, Mistral) that powers conversational understanding and response generation

## Requirements

### Requirement 0: Homepage Content Update for TPB/TTM Framework

**User Story:** As a visitor, I want the homepage to accurately describe the TPB/TTM-based conversational AI system, so that I understand the theoretical foundation and target population of the application.

#### Acceptance Criteria

1. THE Hero component SHALL describe the system as a TPB/TTM-based conversational AI for dietary behavior change
2. THE Hero component SHALL mention the target population: Filipino young adults and adults aged 18-40 in Davao City
3. THE Features component SHALL highlight the seven-step computational pipeline approach
4. THE Features component SHALL explain TPB constructs (Attitude, Subjective Norm, Perceived Behavioral Control) in user-friendly language
5. THE Features component SHALL explain TTM stages (Pre-contemplation, Contemplation, Preparation, Action, Maintenance) in user-friendly language
6. THE HowItWorks component SHALL describe the personalized intervention approach based on psychological barriers and readiness for change
7. THE HowItWorks component SHALL mention stage-matched interventions using Behavior Change Techniques (BCTs)
8. THE NutriBot_Application SHALL maintain the existing green/teal health-focused design while updating content
9. THE NutriBot_Application SHALL present the theoretical framework in accessible, non-academic language
10. THE Hero component SHALL emphasize the conversational, natural language approach to eliciting dietary habits and barriers

### Requirement 1: User Authentication and Profile Management

**User Story:** As a user, I want to create an account and log in, so that I can save my preferences, psychological profile (TPB/TTM constructs), and track my progress over time.

#### Acceptance Criteria

1. THE Authentication_System SHALL provide user registration with email and password
2. THE Authentication_System SHALL provide user login functionality
3. THE Authentication_System SHALL provide password reset capability via email
4. WHEN a user registers, THE Authentication_System SHALL create a User_Profile with default settings
5. THE User_Profile SHALL store dietary preferences (vegetarian, vegan, gluten-free, etc.)
6. THE User_Profile SHALL store health goals (weight loss, muscle gain, maintenance, etc.)
7. THE User_Profile SHALL store basic metrics (age, weight, height, activity level)
8. THE User_Profile SHALL store longitudinal TPB construct scores (Attitude, Subjective Norm, Perceived Behavioral Control) across sessions
9. THE User_Profile SHALL store TTM stage history to track behavior change progression
10. THE NutriBot_Application SHALL allow authenticated users to update their User_Profile
11. WHEN a user is not authenticated, THE NutriBot_Application SHALL restrict access to personalized features
12. THE Authentication_System SHALL maintain secure session management with token-based authentication

### Requirement 2: Backend API and Database Integration

**User Story:** As a developer, I want a robust backend infrastructure, so that the application can store and retrieve user data reliably.

#### Acceptance Criteria

1. THE Backend_API SHALL provide RESTful endpoints for all application features
2. THE Backend_API SHALL use a relational or document database for data persistence
3. THE Backend_API SHALL implement proper error handling and return appropriate HTTP status codes
4. THE Backend_API SHALL validate all incoming requests
5. THE Backend_API SHALL implement rate limiting to prevent abuse
6. THE Backend_API SHALL log all errors and critical operations
7. THE Backend_API SHALL use environment variables for configuration
8. THE Backend_API SHALL implement CORS policies for frontend communication

### Requirement 3: Persistent Chat History

**User Story:** As a user, I want my chat conversations to be saved with psychological construct tracking, so that I can review previous nutrition advice and the system can adapt interventions based on my progress.

#### Acceptance Criteria

1. WHEN an authenticated user sends a message, THE Chat_System SHALL store the message in the database
2. WHEN an authenticated user receives a bot response, THE Chat_System SHALL store the response with associated TPB/TTM inference metadata
3. WHEN an authenticated user opens the chat interface, THE Chat_System SHALL load their previous conversation history
4. THE Chat_System SHALL display chat history in chronological order
5. THE Chat_System SHALL allow users to delete individual conversations or entire chat history
6. THE Chat_System SHALL support pagination for long chat histories
7. WHEN a user is not authenticated, THE Chat_System SHALL provide temporary session-based chat without persistence
8. THE Chat_System SHALL store session-level TPB construct scores and TTM stage classifications for longitudinal tracking
9. THE Chat_System SHALL maintain conversation context across sessions to enable continuity in behavior change support

### Requirement 4: Real Nutrition Data Integration

**User Story:** As a user, I want accurate nutrition information about foods, so that I can make informed dietary decisions.

#### Acceptance Criteria

1. THE Nutrition_Database SHALL integrate with a nutrition API (such as USDA FoodData Central, Nutritionix, or Edamam)
2. WHEN a user asks about a specific food, THE Chat_System SHALL query the Nutrition_Database and return accurate macronutrient information
3. THE Nutrition_Database SHALL provide calorie, protein, carbohydrate, fat, fiber, and vitamin content
4. THE Chat_System SHALL handle cases where food items are not found in the Nutrition_Database
5. THE Nutrition_Database SHALL support searching by food name with fuzzy matching
6. THE Chat_System SHALL display nutrition information in a user-friendly format
7. THE NutriBot_Application SHALL cache frequently requested nutrition data to improve performance

### Requirement 5: Seven-Step Pipeline AI Chat System

**User Story:** As a user, I want the chatbot to understand my psychological barriers and readiness for change, so that I can receive personalized, theory-driven nutrition guidance that matches my current situation.

#### Acceptance Criteria

1. THE Chat_System SHALL integrate with an AI_Language_Model (such as OpenAI GPT-4, Llama 3, or Mistral) for natural language understanding and response generation
2. THE Chat_System SHALL implement Step 1 (Conversational Context Collection) to elicit dietary habits, barriers, social environment, resources, and goals through natural conversation
3. THE Chat_System SHALL implement Step 2 (TPB Construct Inference) to compute continuous scores for Attitude, Subjective Norm, and Perceived Behavioral Control from user utterances
4. THE Chat_System SHALL implement Step 3 (TTM Stage Estimation) to classify user readiness as Pre-contemplation, Contemplation, Preparation, Action, or Maintenance
5. THE Chat_System SHALL implement Step 4 (Intervention Mode Selection) to select appropriate intervention mode (Awareness, Ambivalence-resolution, Planning, Coping, or Relapse-prevention) based on TTM stage
6. THE Chat_System SHALL implement Step 5 (TPB-Targeted Intervention Choice) to identify the weakest TPB determinant and select appropriate Behavior Change Techniques (BCTs)
7. THE Chat_System SHALL implement Step 6 (Feasible Dish/Plan Generation) to recommend recipes filtered by user constraints (time, budget, skills, equipment)
8. THE Chat_System SHALL implement Step 7 (Response Generation) to synthesize all analyses into coherent, natural language responses
9. WHEN a user sends a message, THE Chat_System SHALL process it through all seven pipeline steps and generate a contextually relevant response
10. THE Chat_System SHALL consider the user's User_Profile when generating personalized responses
11. THE Chat_System SHALL provide responses within 10 seconds under normal conditions
12. IF the AI service is unavailable, THEN THE Chat_System SHALL return a fallback message and log the error
13. THE Chat_System SHALL maintain conversation context across multiple messages within a session
14. THE Chat_System SHALL track dialogue state to ensure comprehensive coverage of TPB constructs
15. THE Chat_System SHALL include disclaimers that advice is informational and not medical guidance
16. THE Chat_System SHALL operate in English, consistent with the target population's language context
17. THE Chat_System SHALL use confidence thresholds to trigger clarification questions when inference certainty is low

### Requirement 6: Meal Planning and Recipe Suggestions

**User Story:** As a user, I want to receive meal plans and recipe suggestions that match my constraints and psychological profile, so that I can easily follow a healthy diet aligned with my goals and current readiness for change.

#### Acceptance Criteria

1. WHEN a user requests a meal plan, THE Chat_System SHALL generate a Meal_Plan based on their User_Profile and current TTM stage
2. THE Meal_Plan SHALL include breakfast, lunch, dinner, and optional snacks
3. THE Meal_Plan SHALL meet the user's caloric and macronutrient targets
4. THE Meal_Plan SHALL respect dietary restrictions specified in the User_Profile
5. THE Chat_System SHALL use semantic search (FAISS) on the RecipeNLG database to find culturally appropriate recipes
6. THE Chat_System SHALL filter recipes by user constraints (preparation time, cooking difficulty, required equipment, budget)
7. THE Chat_System SHALL provide recipe details including ingredients, preparation steps, cooking time, and nutrition information
8. THE NutriBot_Application SHALL allow users to save favorite recipes
9. THE NutriBot_Application SHALL allow users to save generated meal plans for future reference
10. THE Chat_System SHALL suggest recipe substitutions for dietary restrictions or preferences
11. THE Chat_System SHALL prioritize Filipino recipes and culturally appropriate dishes for the target population
12. THE Chat_System SHALL frame recipe recommendations using stage-appropriate language based on TTM classification

### Requirement 7: Progress Tracking and Visualization

**User Story:** As a user, I want to track my nutrition intake and psychological progress (TPB/TTM constructs), so that I can stay motivated, see my behavior change journey, and adjust my habits.

#### Acceptance Criteria

1. THE Progress_Tracker SHALL allow users to log daily food intake
2. THE Progress_Tracker SHALL calculate daily totals for calories, protein, carbohydrates, and fats
3. THE Progress_Tracker SHALL display progress visualizations using charts or graphs
4. THE Progress_Tracker SHALL show trends over time (daily, weekly, monthly views)
5. THE Progress_Tracker SHALL compare actual intake against User_Profile goals
6. THE Progress_Tracker SHALL allow users to log weight measurements over time
7. THE Progress_Tracker SHALL provide insights and suggestions based on tracked data
8. THE NutriBot_Application SHALL display progress summaries on a dedicated dashboard page
9. THE Progress_Tracker SHALL visualize longitudinal TPB construct scores (Attitude, Subjective Norm, Perceived Behavioral Control) across sessions
10. THE Progress_Tracker SHALL display TTM stage progression over time to show behavior change journey
11. THE Progress_Tracker SHALL use exponential smoothing to track TPB construct changes while filtering momentary fluctuations
12. THE Progress_Tracker SHALL detect and highlight stage transitions (forward movement, backsliding, or stalling)
13. THE Progress_Tracker SHALL provide early warning indicators when TPB scores decline, signaling potential relapse risk

### Requirement 8: Enhanced UI Components and Navigation

**User Story:** As a user, I want intuitive navigation and additional pages, so that I can easily access all application features.

#### Acceptance Criteria

1. THE NutriBot_Application SHALL implement proper routing using React Router or similar
2. THE NutriBot_Application SHALL include a Dashboard page for authenticated users
3. THE NutriBot_Application SHALL include a Profile Settings page
4. THE NutriBot_Application SHALL include a Meal Plans page showing saved plans
5. THE NutriBot_Application SHALL include a Progress Tracking page with visualizations
6. THE NutriBot_Application SHALL update the TopBar component to show authentication status
7. WHEN a user is authenticated, THE TopBar SHALL display user menu with logout option
8. THE NutriBot_Application SHALL maintain the existing green/teal color scheme and Material-UI design language
9. THE NutriBot_Application SHALL be responsive and work on mobile, tablet, and desktop devices
10. THE NutriBot_Application SHALL provide loading states for asynchronous operations

### Requirement 9: Food Logging and Search

**User Story:** As a user, I want to search for foods and log them to my daily intake, so that I can track what I eat accurately.

#### Acceptance Criteria

1. THE NutriBot_Application SHALL provide a food search interface
2. WHEN a user searches for a food, THE Nutrition_Database SHALL return matching results
3. THE NutriBot_Application SHALL display search results with nutrition information preview
4. THE NutriBot_Application SHALL allow users to specify portion sizes when logging food
5. WHEN a user logs a food item, THE Progress_Tracker SHALL add it to the current day's intake
6. THE NutriBot_Application SHALL allow users to edit or delete logged food items
7. THE NutriBot_Application SHALL support creating custom food items with manual nutrition entry
8. THE NutriBot_Application SHALL allow users to save frequently eaten foods as favorites

### Requirement 10: Deployment and Environment Configuration

**User Story:** As a developer, I want proper deployment configuration, so that the application can be deployed to production environments.

#### Acceptance Criteria

1. THE NutriBot_Application SHALL include separate development and production build configurations
2. THE Backend_API SHALL include deployment instructions and configuration files
3. THE NutriBot_Application SHALL use environment variables for API endpoints and keys
4. THE NutriBot_Application SHALL include a production-ready build script
5. THE Backend_API SHALL include database migration scripts
6. THE NutriBot_Application SHALL include comprehensive README documentation
7. THE Backend_API SHALL implement HTTPS in production environments
8. THE NutriBot_Application SHALL implement proper error boundaries for React components

### Requirement 11: Real Chatbot Integration (Replacing Mock Implementation)

**User Story:** As a user, I want to interact with a real AI-powered chatbot instead of a mock demo, so that I can receive actual personalized nutrition guidance based on my conversations.

#### Acceptance Criteria

1. THE ChatbotShowcase component SHALL be refactored to remove all mock response generation logic
2. THE ChatbotShowcase component SHALL integrate with the Backend_API to send user messages and receive AI-generated responses
3. WHEN a user sends a message, THE ChatbotShowcase component SHALL call the Backend_API chat endpoint with the message content
4. THE Backend_API SHALL process the message through the seven-step pipeline and return the generated response
5. THE ChatbotShowcase component SHALL display loading indicators while waiting for AI responses
6. THE ChatbotShowcase component SHALL handle API errors gracefully and display user-friendly error messages
7. THE ChatbotShowcase component SHALL maintain conversation context by sending conversation history to the backend
8. THE ChatbotShowcase component SHALL remove hardcoded suggestion chips and replace with dynamic suggestions based on conversation state
9. IF the backend is unavailable, THEN THE ChatbotShowcase component SHALL display an appropriate offline message
10. THE ChatbotShowcase component SHALL display typing indicators that reflect actual processing time
11. THE ChatbotShowcase component SHALL support streaming responses if the AI_Language_Model provides streaming capabilities
12. THE Backend_API SHALL implement rate limiting on chat endpoints to prevent abuse
13. THE Backend_API SHALL log all chat interactions for system improvement and debugging
14. THE ChatbotShowcase component SHALL display disclaimers about the informational nature of the advice
