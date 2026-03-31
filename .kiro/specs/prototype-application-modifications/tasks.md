# Implementation Plan: NutriBot Session-Only Demo

## Overview

This plan transforms the existing React/TypeScript prototype into a MINIMAL SESSION-ONLY demonstration focused on TPB/TTM inference and recipe recommendation. This is a DEMO to showcase the theoretical framework WITHOUT persistence, complex features, or production deployment.

**Key Characteristics:**
- All data kept in React state (in-memory only)
- Session resets on page reload or manual reset button
- No localStorage, no persistence across sessions
- Client-side TPB/TTM inference (keyword-based)
- Hardcoded recipe database (50+ Filipino dishes)
- All processing happens in the browser
- Maintains existing Material-UI design and green/teal color scheme

**What This Demo Demonstrates:**
- TPB score inference from conversation (Attitude, Subjective Norm, Perceived Behavioral Control)
- TTM stage classification (Pre-contemplation → Maintenance)
- Identification of weakest TPB determinant (main barrier)
- Recipe recommendations based on constraints and TTM stage
- Simple meal plan generation (displayed once, not saved)

**What This Demo DOES NOT Include:**
- No localStorage or any persistence
- No food logging or progress tracking
- No saved meal plans (just show generated plan once)
- No profile dialog (just ask in chat)
- Session resets completely on page reload

## Tasks

- [x] 0. Create TPB/TTM questionnaire prototype for data collection
  - [x] 0.1 Create self-contained HTML/JS questionnaire prototype
    - Create single HTML file with inline CSS and JavaScript (no external dependencies)
    - Implement 20 TPB questions covering Attitude, Subjective Norm, and Perceived Behavioral Control constructs
    - Implement 20 TTM questions covering all 5 stages (Pre-contemplation, Contemplation, Preparation, Action, Maintenance)
    - Each question should have unique ID, question text, and 1-5 Likert scale (Strongly Disagree to Strongly Agree)
    - Store questions and answers in JSON structure with numeric value and corresponding label
    - Create tabbed UI to display TPB questions, TTM questions, and sample dishes separately
    - Add progress bar showing completion percentage
    - Add Export JSON functionality (no save/load needed)
    - Include array of 20 Filipino dish examples (name, description, prep time, difficulty, calories)
    - Use green/teal color scheme matching the main application design
    - _Requirements: Research data collection for Iteration 1_

- [x] 1. Update homepage components for TPB/TTM framework
  - [x] 1.1 Update Hero component with TPB/TTM description
    - Update main heading to describe TPB/TTM-based conversational AI system
    - Add subtitle mentioning target population (Filipino young adults and adults aged 18-40 in Davao City)
    - Emphasize conversational, natural language approach to dietary behavior change
    - Add note that this is a session-only demo
    - Maintain existing green/teal design and Material-UI styling
    - _Requirements: 0.1, 0.2, 0.8, 0.9, 0.10_
  
  - [x] 1.2 Update Features component with seven-step pipeline and TPB/TTM constructs
    - Replace existing feature cards with seven-step pipeline explanation
    - Add card explaining TPB constructs (Attitude, Subjective Norm, Perceived Behavioral Control) in user-friendly language
    - Add card explaining TTM stages (Pre-contemplation, Contemplation, Preparation, Action, Maintenance) in user-friendly language
    - Present theoretical framework in accessible, non-academic language
    - Maintain existing card interaction patterns and green/teal design
    - _Requirements: 0.3, 0.4, 0.5, 0.8, 0.9_
  
  - [x] 1.3 Update HowItWorks component with intervention approach
    - Update steps to describe personalized intervention based on psychological barriers and readiness
    - Mention stage-matched interventions using Behavior Change Techniques (BCTs)
    - Explain how the system adapts to user's current situation
    - Clarify this is a session-only demo
    - Maintain existing three-step visual structure and animations
    - _Requirements: 0.6, 0.7, 0.8, 0.9_

- [ ] 2. Create hardcoded recipe database
  - [x] 2.1 Create recipe data module with Filipino dishes
    - Create src/data/recipes.ts with array of 50+ Filipino recipes
    - Each recipe should include: id, name, description, ingredients, instructions, prepTime, cookTime, difficulty, calories, protein, carbs, fat, tags (vegetarian, quick, budget-friendly, etc.)
    - Include variety: breakfast (tapsilog, champorado), lunch/dinner (adobo, sinigang, kare-kare), snacks (lumpia, turon)
    - Add constraint tags: time (quick: <30min, medium: 30-60min, long: >60min), budget (low, medium, high), difficulty (easy, medium, hard), equipment (basic, intermediate, advanced)
    - _Requirements: 6.5, 6.6, 6.11_
  
  - [x] 2.2 Create recipe search and filter functions
    - Implement searchRecipes(query: string) for text search
    - Implement filterByConstraints(recipes, constraints) for time, budget, difficulty, equipment
    - Implement filterByDietaryRestrictions(recipes, restrictions) for vegetarian, vegan, etc.
    - Implement calculateCalories(recipes, targetCalories) to find recipes matching caloric goals
    - _Requirements: 6.4, 6.5_

- [x] 3. Implement client-side TPB/TTM inference (simplified)
  - [x] 3.1 Create TPB scoring module
    - Create src/services/tpbInference.ts
    - Implement keyword-based scoring for Attitude (positive/negative food words)
    - Implement keyword-based scoring for Subjective Norm (social/family references)
    - Implement keyword-based scoring for Perceived Behavioral Control (confidence/difficulty words)
    - Return scores as continuous values (0-100)
    - _Requirements: 5.3, 1.8_
  
  - [x] 3.2 Create TTM stage classification module
    - Create src/services/ttmInference.ts
    - Implement rule-based classification using conversation history
    - Pre-contemplation: user expresses no interest in change
    - Contemplation: user considers change but hasn't committed
    - Preparation: user plans to change soon
    - Action: user is actively changing
    - Maintenance: user has sustained change
    - Return stage classification with confidence score
    - _Requirements: 5.4, 1.9_

- [x] 4. Create chatbot service with seven-step pipeline simulation
  - [x] 4.1 Create chatbot service with seven-step pipeline
    - Create src/services/chatbotService.ts
    - Implement Step 1: Extract dietary context from user message (keywords, patterns)
    - Implement Step 2: Calculate TPB scores using tpbInference module
    - Implement Step 3: Classify TTM stage using ttmInference module
    - Implement Step 4: Select intervention mode based on TTM stage
    - Implement Step 5: Choose BCT based on weakest TPB determinant
    - Implement Step 6: Filter recipes by user constraints and recommend top 3
    - Implement Step 7: Generate response text combining all analyses
    - Add response templates for each TTM stage
    - Include disclaimer in all responses
    - _Requirements: 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.15, 5.16_
  
  - [x] 4.2 Create response templates for each intervention mode
    - Create templates for Awareness interventions (Pre-contemplation)
    - Create templates for Ambivalence-resolution (Contemplation)
    - Create templates for Planning interventions (Preparation)
    - Create templates for Coping interventions (Action)
    - Create templates for Relapse-prevention (Maintenance)
    - Include BCT-specific language in templates
    - _Requirements: 5.5, 5.6_

- [x] 5. Update ChatbotShowcase component for session-only operation
  - [x] 5.1 Refactor ChatbotShowcase to use in-memory state only
    - Remove all mock API calls and hardcoded responses
    - Store messages in component state (useState)
    - Implement message sending using chatbotService (local processing)
    - Add loading indicator during processing (simulate 1-2 second delay)
    - Display TPB scores and TTM stage in sidebar panel
    - Add "Reset Session" button to clear all state
    - Add disclaimer banner about session-only demo
    - Remove authentication-related code
    - _Requirements: 3.7, 5.11, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 11.10_
  
  - [x] 5.2 Add dynamic suggestion chips based on TTM stage
    - Remove hardcoded suggestions
    - Generate suggestions based on current TTM stage
    - Pre-contemplation: "Tell me about healthy eating", "What are the benefits?"
    - Contemplation: "What are my barriers?", "How can I start?"
    - Preparation: "Help me plan meals", "What recipes are easy?"
    - Action: "Track my progress", "Give me tips"
    - Maintenance: "How do I stay on track?", "What if I slip?"
    - _Requirements: 11.8_
  
  - [x] 5.3 Add TPB/TTM visualization panel
    - Create collapsible panel showing current TPB scores (Attitude, Subjective Norm, PBC)
    - Display current TTM stage with description
    - Add tooltips explaining each construct
    - Style with Material-UI Accordion
    - _Requirements: 5.3, 5.4_

- [x] 6. Implement simple meal plan generator
  - [x] 6.1 Create meal plan generation service
    - Create src/services/mealPlanService.ts
    - Implement generateMealPlan(constraints, durationDays) function
    - Use recipe database and filter by user constraints
    - Calculate caloric distribution: breakfast 25%, lunch 35%, dinner 35%, snack 5%
    - Select recipes that meet caloric targets (within 10%)
    - Return meal plan with recipes for each day
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  
  - [x] 6.2 Create MealPlanView component
    - Create component to display generated meal plan
    - Show day-by-day breakdown with meal types
    - Display recipe cards with name, description, calories, macros
    - Add "View Recipe" button to show full details (ingredients, instructions)
    - Add "Generate New Plan" button
    - Style with Material-UI Cards and Grid
    - Note: Plans are NOT saved, just displayed once
    - _Requirements: 6.5, 6.7_

- [x] 7. Create simple routing and navigation
  - [x] 7.1 Install and configure React Router
    - Install react-router-dom
    - Create route configuration in App.tsx
    - Routes: / (home), /demo (chatbot)
    - No authentication guards (all routes public)
    - _Requirements: 8.1_
  
  - [x] 7.2 Update TopBar with navigation links
    - Add navigation buttons: Home, Demo
    - Highlight active route
    - Keep existing design and styling
    - _Requirements: 8.6_

- [x] 8. Add demo disclaimers and documentation
  - [x] 8.1 Add disclaimer banner to demo page
    - Create DisclaimerBanner component
    - Display: "This is a session-only demo. All data resets on page reload. No information is saved."
    - Add "Learn More" button with modal explaining demo limitations
    - Style with Material-UI Alert component
    - _Requirements: Prototype clarity_
  
  - [x] 8.2 Create About/Help dialog
    - Create HelpDialog component explaining how to use the demo
    - Explain seven-step pipeline concept
    - Explain TPB/TTM framework in simple terms
    - List demo limitations (no real AI, simplified inference, no persistence)
    - Add "Reset Session" button to clear all state
    - _Requirements: User guidance_

- [x] 9. Implement responsive design and mobile optimization
  - [x] 9.1 Ensure all components are responsive
    - Test ChatbotShowcase on mobile, tablet, desktop
    - Test MealPlanView on different screen sizes
    - Adjust layouts using Material-UI Grid and responsive props
    - Ensure dialogs are mobile-friendly
    - _Requirements: 8.9_

- [x] 10. Add loading states and error handling
  - [x] 10.1 Add loading indicators
    - Add loading spinner during chatbot response generation
    - Add loading state during meal plan generation
    - Add skeleton loaders for data loading
    - _Requirements: 8.10_
  
  - [x] 10.2 Add error boundaries
    - Create ErrorBoundary component
    - Wrap main sections (ChatbotShowcase, MealPlanView)
    - Display user-friendly error messages
    - Add "Try Again" functionality
    - _Requirements: 10.8_

- [x] 11. Final testing and polish
  - [x] 11.1 Test complete user flow
    - Test: Chat with bot → View TPB/TTM scores → Get recipe recommendations → Generate meal plan
    - Test: Reset session and verify complete state clear
    - Test: Page reload and verify session reset
    - _Requirements: All_
  
  - [x] 11.2 Test on multiple browsers
    - Test on Chrome, Firefox, Safari, Edge
    - Test responsive design on mobile browsers
    - _Requirements: Browser compatibility_
  
  - [x] 11.3 Polish UI and add finishing touches
    - Ensure consistent spacing and alignment
    - Verify color scheme consistency (green/teal)
    - Add smooth transitions and animations
    - Ensure all buttons have hover states
    - Add loading skeletons where appropriate
    - _Requirements: 8.8, 8.9_

- [x] 12. Create demo documentation
  - [x] 12.1 Update README with demo information
    - Explain this is a SESSION-ONLY DEMO
    - List what the demo demonstrates
    - List demo limitations (no real AI, no backend, no persistence)
    - Add setup instructions (npm install, npm run dev)
    - Add usage guide
    - _Requirements: Documentation_

## Notes

- This is a SESSION-ONLY DEMO with NO persistence
- All data stored in React component state (in-memory only)
- Session resets completely on page reload
- No localStorage, no backend, no database
- No user authentication or accounts
- No real AI integration (simplified rule-based inference)
- Hardcoded recipe database (50+ Filipino dishes)
- All processing happens client-side in the browser
- Maintains existing Material-UI design system and green/teal color scheme
- Demonstrates TPB/TTM inference and recipe recommendation concept
- Suitable for demonstrations and concept validation
- NOT suitable for production use or real dietary guidance

**Core Demo Flow:**
1. User chats with bot
2. Bot infers TPB scores (Attitude, Subjective Norm, PBC) from conversation
3. Bot classifies TTM stage (Pre-contemplation → Maintenance)
4. Bot identifies weakest TPB determinant (main barrier)
5. Bot recommends 3 recipes based on stage and constraints
6. User can generate meal plan (displayed once, not saved)
7. User can reset session to start over

**Removed from Original Plan:**
- All localStorage tasks (Task 2)
- Food logging and progress tracking (Task 9)
- Saved meal plans (just show generated plan, don't save)
- Profile dialog (just ask in chat)
- All backend setup
- All database tasks
- All authentication system tasks
- All API endpoint creation tasks
- All external API integrations
- All deployment tasks
- All persistent chat history
- All property-based tests

**Key Simplifications:**
- ChatbotShowcase: Uses in-memory state instead of localStorage
- Recipe recommendations: Uses hardcoded database
- Meal planning: Generated and displayed once, not saved
- TPB/TTM inference: Simplified keyword-based scoring
- No progress tracking or food logging features
- Session resets on page reload or manual reset button
