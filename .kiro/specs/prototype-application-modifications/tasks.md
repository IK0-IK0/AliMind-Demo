# Implementation Plan: NutriBot Application Transformation

## Overview

This plan transforms the existing React/TypeScript prototype into a full-stack nutrition assistant application. The implementation adds backend infrastructure (Node.js/Express + PostgreSQL), authentication, persistent data storage, external API integrations (USDA FoodData Central, OpenAI GPT-4), and enhanced frontend features while maintaining the existing Material-UI design system.

## Tasks

- [ ] 1. Set up backend project structure and core dependencies
  - Create backend directory with TypeScript configuration
  - Install Express, PostgreSQL client (pg), Sequelize ORM, JWT libraries, bcrypt, express-validator
  - Configure TypeScript compiler options for Node.js
  - Set up environment variable management (.env file structure)
  - Create basic Express server with health check endpoint
  - _Requirements: 2.1, 2.7, 10.2, 10.3_

- [ ] 2. Configure database and implement schema
  - [ ] 2.1 Set up PostgreSQL connection and Sequelize configuration
    - Create database connection module with connection pooling
    - Configure Sequelize with environment-based settings
    - Implement database connection error handling
    - _Requirements: 2.2, 2.6_
  
  - [ ] 2.2 Create database migration files for all tables
    - Create migrations for users, user_profiles, conversations, messages tables
    - Create migrations for foods, food_logs, favorite_foods tables
    - Create migrations for meal_plans, meal_plan_items, weight_logs tables
    - Add indexes as specified in design document
    - _Requirements: 2.2, 10.5_
  
  - [ ] 2.3 Define Sequelize models matching database schema
    - Create User, UserProfile, Conversation, Message models
    - Create Food, FoodLog, FavoriteFood models
    - Create MealPlan, MealPlanItem, WeightLog models
    - Define model associations (foreign keys, cascades)
    - _Requirements: 2.2_

- [ ] 3. Implement authentication system
  - [ ] 3.1 Create authentication middleware and JWT utilities
    - Implement JWT token generation and verification functions
    - Create authentication middleware to protect routes
    - Implement password hashing with bcrypt
    - Create token refresh mechanism
    - _Requirements: 1.1, 1.2, 1.10_
  
  - [ ]* 3.2 Write property test for authentication round trip
    - **Property 2: Authentication Round Trip**
    - **Validates: Requirements 1.2, 1.10**
  
  - [ ] 3.3 Implement authentication API endpoints
    - POST /api/auth/register endpoint with validation
    - POST /api/auth/login endpoint with credential verification
    - POST /api/auth/logout endpoint
    - POST /api/auth/refresh endpoint for token renewal
    - GET /api/auth/me endpoint for current user info
    - _Requirements: 1.1, 1.2, 1.10_
  
  - [ ]* 3.4 Write property test for user registration creates profile
    - **Property 1: User Registration Creates Profile**
    - **Validates: Requirements 1.1, 1.4**
  
  - [ ]* 3.5 Write property test for unauthenticated access restriction
    - **Property 4: Unauthenticated Access Restriction**
    - **Validates: Requirements 1.9**

- [ ] 4. Implement user profile management
  - [ ] 4.1 Create user profile API endpoints
    - GET /api/profile endpoint to retrieve user profile
    - PUT /api/profile endpoint to update full profile
    - PATCH /api/profile/preferences endpoint for dietary preferences
    - PATCH /api/profile/goals endpoint for health goals and targets
    - _Requirements: 1.5, 1.6, 1.7, 1.8_
  
  - [ ]* 4.2 Write property test for profile data persistence
    - **Property 3: Profile Data Persistence**
    - **Validates: Requirements 1.5, 1.6, 1.7, 1.8**
  
  - [ ]* 4.3 Write unit tests for profile validation
    - Test validation of age, weight, height ranges
    - Test dietary preferences array handling
    - Test target calorie calculations
    - _Requirements: 1.5, 1.6, 1.7_

- [ ] 5. Implement backend middleware and error handling
  - [ ] 5.1 Create validation middleware and error handlers
    - Implement express-validator schemas for all endpoints
    - Create global error handling middleware
    - Implement rate limiting middleware with express-rate-limit
    - Configure CORS middleware for frontend communication
    - Set up Winston logger with file and console transports
    - _Requirements: 2.3, 2.4, 2.5, 2.6, 2.8_
  
  - [ ]* 5.2 Write property test for input validation rejection
    - **Property 5: Input Validation Rejection**
    - **Validates: Requirements 2.4**
  
  - [ ]* 5.3 Write property test for error status codes
    - **Property 6: Error Status Codes**
    - **Validates: Requirements 2.3**

- [ ] 6. Checkpoint - Ensure backend foundation is working
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Integrate external nutrition API (USDA FoodData Central)
  - [ ] 7.1 Create nutrition service module
    - Implement USDA FoodData Central API client with axios
    - Create food search function with query parameters
    - Create food details retrieval by FDC ID
    - Implement response caching mechanism
    - Add error handling for API failures and timeouts
    - _Requirements: 4.1, 4.2, 4.4, 4.5, 4.7_
  
  - [ ] 7.2 Create nutrition API endpoints
    - GET /api/nutrition/search endpoint with fuzzy matching
    - GET /api/nutrition/food/:fdcId endpoint for food details
    - POST /api/nutrition/custom endpoint for custom food creation
    - _Requirements: 4.1, 4.2, 9.1, 9.7_
  
  - [ ]* 7.3 Write property test for nutrition data structure
    - **Property 11: Nutrition Data Structure**
    - **Validates: Requirements 4.3**
  
  - [ ]* 7.4 Write property test for food search results
    - **Property 24: Food Search Results**
    - **Validates: Requirements 9.2**
  
  - [ ]* 7.5 Write unit tests for nutrition API error handling
    - Test API timeout handling
    - Test invalid FDC ID responses
    - Test empty search results
    - _Requirements: 4.4_

- [ ] 8. Integrate OpenAI GPT-4 for chat functionality
  - [ ] 8.1 Create chat service module with AI integration
    - Implement OpenAI API client with GPT-4 configuration
    - Create function to build conversation context from message history
    - Implement prompt engineering for nutrition-focused responses
    - Add user profile context injection into prompts
    - Implement response streaming or timeout handling (5 second limit)
    - Add fallback responses for API failures
    - Include disclaimer text in all bot responses
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_
  
  - [ ]* 8.2 Write property test for AI context preservation
    - **Property 12: AI Context Preservation**
    - **Validates: Requirements 5.6**
  
  - [ ]* 8.3 Write property test for disclaimer presence
    - **Property 13: Disclaimer Presence**
    - **Validates: Requirements 5.8**

- [ ] 9. Implement chat persistence and history
  - [ ] 9.1 Create chat API endpoints with database integration
    - POST /api/chat/message endpoint (create conversation if needed, store messages, call AI service)
    - GET /api/chat/history endpoint with pagination support
    - DELETE /api/chat/history/:conversationId endpoint
    - DELETE /api/chat/history endpoint (clear all history)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  
  - [ ]* 9.2 Write property test for message persistence
    - **Property 7: Message Persistence**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
  
  - [ ]* 9.3 Write property test for chat history deletion
    - **Property 8: Chat History Deletion**
    - **Validates: Requirements 3.5**
  
  - [ ]* 9.4 Write property test for chat pagination
    - **Property 9: Chat Pagination**
    - **Validates: Requirements 3.6**
  
  - [ ]* 9.5 Write property test for unauthenticated chat non-persistence
    - **Property 10: Unauthenticated Chat Non-Persistence**
    - **Validates: Requirements 3.7**

- [ ] 10. Implement meal planning functionality
  - [ ] 10.1 Create meal plan generation service
    - Implement meal plan generator using OpenAI API with structured prompts
    - Create function to calculate caloric distribution across meals
    - Implement dietary restriction filtering logic
    - Create recipe parser to extract ingredients, steps, nutrition from AI response
    - Validate generated meal plans meet caloric targets (within 10%)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.8_
  
  - [ ] 10.2 Create meal plan API endpoints
    - POST /api/meals/generate endpoint (generate plan based on user profile)
    - GET /api/meals endpoint (list user's saved meal plans)
    - GET /api/meals/:planId endpoint (get specific plan details)
    - POST /api/meals/:planId/save endpoint (save generated plan)
    - DELETE /api/meals/:planId endpoint
    - GET /api/meals/:planId/recipes/:recipeId endpoint
    - _Requirements: 6.1, 6.6, 6.7_
  
  - [ ]* 10.3 Write property test for meal plan generation
    - **Property 14: Meal Plan Generation**
    - **Validates: Requirements 6.1, 6.2**
  
  - [ ]* 10.4 Write property test for meal plan caloric accuracy
    - **Property 15: Meal Plan Caloric Accuracy**
    - **Validates: Requirements 6.3**
  
  - [ ]* 10.5 Write property test for dietary restriction compliance
    - **Property 16: Dietary Restriction Compliance**
    - **Validates: Requirements 6.4**
  
  - [ ]* 10.6 Write property test for recipe data completeness
    - **Property 17: Recipe Data Completeness**
    - **Validates: Requirements 6.5**

- [ ] 11. Checkpoint - Ensure AI integrations are working
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Implement progress tracking and food logging
  - [ ] 12.1 Create food logging API endpoints
    - POST /api/progress/log endpoint (log food with portion size)
    - GET /api/progress/daily endpoint (get daily nutrition totals)
    - GET /api/progress/range endpoint (get data for date range)
    - PUT /api/progress/log/:logId endpoint (edit food log)
    - DELETE /api/progress/log/:logId endpoint
    - _Requirements: 7.1, 7.2, 7.4, 9.5, 9.6_
  
  - [ ] 12.2 Create weight tracking and insights endpoints
    - POST /api/progress/weight endpoint (log weight measurement)
    - GET /api/progress/weight endpoint (get weight history for date range)
    - GET /api/progress/insights endpoint (calculate insights based on progress data)
    - _Requirements: 7.6, 7.7_
  
  - [ ]* 12.3 Write property test for food log persistence
    - **Property 19: Food Log Persistence**
    - **Validates: Requirements 7.1, 9.5**
  
  - [ ]* 12.4 Write property test for daily nutrition calculation
    - **Property 20: Daily Nutrition Calculation**
    - **Validates: Requirements 7.2**
  
  - [ ]* 12.5 Write property test for date range queries
    - **Property 21: Date Range Queries**
    - **Validates: Requirements 7.4**
  
  - [ ]* 12.6 Write property test for goal comparison accuracy
    - **Property 22: Goal Comparison Accuracy**
    - **Validates: Requirements 7.5**
  
  - [ ]* 12.7 Write property test for weight log persistence
    - **Property 23: Weight Log Persistence**
    - **Validates: Requirements 7.6**
  
  - [ ]* 12.8 Write property test for portion size scaling
    - **Property 25: Portion Size Scaling**
    - **Validates: Requirements 9.4**
  
  - [ ]* 12.9 Write property test for food log modification
    - **Property 26: Food Log Modification**
    - **Validates: Requirements 9.6**

- [ ] 13. Implement favorites functionality
  - [ ] 13.1 Create favorites API endpoints
    - GET /api/nutrition/favorites endpoint (list user's favorite foods)
    - POST /api/nutrition/favorites/:foodId endpoint (add to favorites)
    - DELETE /api/nutrition/favorites/:foodId endpoint (remove from favorites)
    - _Requirements: 6.6, 9.8_
  
  - [ ]* 13.2 Write property test for saved data retrieval
    - **Property 18: Saved Data Retrieval**
    - **Validates: Requirements 6.6, 6.7, 9.8**
  
  - [ ]* 13.3 Write property test for custom food creation
    - **Property 27: Custom Food Creation**
    - **Validates: Requirements 9.7**

- [ ] 14. Set up frontend routing and authentication context
  - [ ] 14.1 Install and configure React Router
    - Install react-router-dom
    - Create route configuration with protected routes
    - Implement route guards for authenticated pages
    - Update App.tsx to use BrowserRouter
    - _Requirements: 8.1_
  
  - [ ] 14.2 Create authentication context and API client
    - Create AuthContext with login, logout, register functions
    - Create axios instance with interceptors for JWT tokens
    - Implement token storage in httpOnly cookies
    - Create API client functions for all backend endpoints
    - Add automatic token refresh on 401 responses
    - _Requirements: 1.2, 1.10, 8.10_

- [ ] 15. Create authentication UI components
  - [ ] 15.1 Create AuthPage with login and registration forms
    - Create login form with email and password fields
    - Create registration form with email, password, name fields
    - Add client-side validation with error messages
    - Implement form submission handlers calling auth API
    - Add loading states during authentication
    - Style with Material-UI matching existing design
    - _Requirements: 1.1, 1.2, 8.8_
  
  - [ ]* 15.2 Write unit tests for AuthPage component
    - Test form validation
    - Test successful login flow
    - Test registration flow
    - Test error display
    - _Requirements: 1.1, 1.2_

- [ ] 16. Update TopBar component for authentication
  - [ ] 16.1 Modify TopBar to show authentication status
    - Add user menu dropdown when authenticated
    - Display user name and avatar/initials
    - Add logout button in dropdown
    - Add navigation links to Dashboard, Profile, Meal Plans, Progress
    - Show login/register buttons when not authenticated
    - _Requirements: 8.6, 8.7_
  
  - [ ]* 16.2 Write unit tests for TopBar authentication features
    - Test authenticated vs unauthenticated rendering
    - Test logout functionality
    - Test navigation links
    - _Requirements: 8.6, 8.7_

- [ ] 17. Create DashboardPage component
  - [ ] 17.1 Implement dashboard with quick stats and summaries
    - Create layout with grid of stat cards
    - Display today's calorie and macro totals
    - Show recent chat messages preview
    - Add quick action buttons (log food, start chat, view progress)
    - Fetch dashboard data from multiple API endpoints
    - Implement loading skeletons for data fetching
    - Style with Material-UI cards and green/teal theme
    - _Requirements: 8.2, 7.8, 8.8_
  
  - [ ]* 17.2 Write unit tests for DashboardPage
    - Test loading states
    - Test data display
    - Test quick action buttons
    - _Requirements: 8.2_

- [ ] 18. Create ProfileSettingsPage component
  - [ ] 18.1 Implement profile settings form
    - Create form sections for personal info, dietary preferences, health goals
    - Add input fields for age, weight, height, gender, activity level
    - Create multi-select for dietary preferences (vegetarian, vegan, etc.)
    - Add fields for health goal and target macros
    - Implement form validation
    - Add save button with loading state
    - Display success/error messages
    - Style with Material-UI form components
    - _Requirements: 8.3, 1.5, 1.6, 1.7, 1.8, 8.8_
  
  - [ ]* 18.2 Write unit tests for ProfileSettingsPage
    - Test form rendering
    - Test form validation
    - Test save functionality
    - Test error handling
    - _Requirements: 1.8_

- [ ] 19. Checkpoint - Ensure frontend authentication and profile work
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 20. Update ChatbotShowcase component for backend integration
  - [ ] 20.1 Modify ChatbotShowcase to use real API
    - Replace mock messages with API calls to /api/chat/message
    - Load chat history from /api/chat/history on component mount
    - Implement message sending with loading indicator
    - Add typing indicator while waiting for bot response
    - Display error messages for failed requests
    - Add delete conversation functionality
    - Ensure component works for both authenticated and unauthenticated users
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.7, 5.4_
  
  - [ ]* 20.2 Write unit tests for ChatbotShowcase integration
    - Test message sending
    - Test history loading
    - Test error handling
    - Test authenticated vs unauthenticated behavior
    - _Requirements: 3.1, 3.2, 3.7_

- [ ] 21. Create shared UI components
  - [ ] 21.1 Create FoodSearchDialog component
    - Create modal dialog with search input
    - Implement debounced search calling /api/nutrition/search
    - Display search results with nutrition preview
    - Add portion size input
    - Create select button to confirm food choice
    - Style with Material-UI Dialog and List components
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  
  - [ ] 21.2 Create NutritionCard component
    - Display calories, protein, carbs, fat in consistent format
    - Use progress bars or circular progress for macro breakdown
    - Add optional fiber, sugar, sodium display
    - Style with Material-UI Card
    - _Requirements: 4.6, 7.8_
  
  - [ ] 21.3 Create ProgressChart component
    - Implement line chart for trends over time
    - Implement bar chart for daily comparisons
    - Implement pie chart for macro distribution
    - Use Recharts library for visualizations
    - Add responsive sizing
    - _Requirements: 7.3, 7.4_
  
  - [ ] 21.4 Create LoadingSpinner component
    - Create reusable loading indicator with size variants
    - Add optional loading message
    - Style with Material-UI CircularProgress
    - _Requirements: 8.10_

- [ ] 22. Create MealPlansPage component
  - [ ] 22.1 Implement meal plans list and detail view
    - Create list view showing saved meal plans
    - Add "Generate New Plan" button calling /api/meals/generate
    - Implement meal plan detail view with day-by-day breakdown
    - Display recipes with ingredients and instructions
    - Add save and delete functionality
    - Show loading states during generation
    - Style with Material-UI cards and expansion panels
    - _Requirements: 8.4, 6.1, 6.2, 6.5, 6.6, 6.7, 8.8_
  
  - [ ]* 22.2 Write unit tests for MealPlansPage
    - Test meal plan list rendering
    - Test meal plan generation
    - Test recipe display
    - Test save/delete functionality
    - _Requirements: 6.6, 6.7_

- [ ] 23. Create ProgressTrackingPage component
  - [ ] 23.1 Implement progress visualization and food logging
    - Create date range selector (daily, weekly, monthly views)
    - Display ProgressChart components for calories and macros over time
    - Show goal comparison with visual indicators
    - Add food logging section with FoodSearchDialog integration
    - Display today's food log with edit/delete buttons
    - Show weight tracking chart
    - Display insights from /api/progress/insights
    - Style with Material-UI grid layout
    - _Requirements: 8.5, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 9.1, 9.5, 9.6, 8.8_
  
  - [ ]* 23.2 Write unit tests for ProgressTrackingPage
    - Test chart rendering
    - Test food logging
    - Test date range selection
    - Test edit/delete functionality
    - _Requirements: 7.1, 7.3, 9.6_

- [ ] 24. Implement responsive design and mobile optimization
  - [ ] 24.1 Ensure all pages are responsive
    - Test all pages on mobile, tablet, desktop breakpoints
    - Adjust layouts using Material-UI Grid and responsive props
    - Ensure navigation works on mobile (hamburger menu if needed)
    - Test forms on mobile devices
    - Verify charts are readable on small screens
    - _Requirements: 8.9_

- [ ] 25. Implement error boundaries and loading states
  - [ ] 25.1 Add error boundaries to major sections
    - Create ErrorBoundary component
    - Wrap Dashboard, Profile, MealPlans, Progress pages
    - Display user-friendly error messages
    - Add "Try Again" functionality
    - _Requirements: 10.8_
  
  - [ ] 25.2 Add loading states to all async operations
    - Add skeleton loaders for data fetching
    - Disable buttons during submissions
    - Show progress indicators for long operations
    - _Requirements: 8.10_

- [ ] 26. Checkpoint - Ensure all frontend features are working
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 27. Create deployment configuration
  - [ ] 27.1 Set up production build configuration
    - Create production environment variables template
    - Configure Vite for production builds
    - Set up backend production configuration
    - Create Docker configuration files (optional)
    - _Requirements: 10.1, 10.3, 10.4_
  
  - [ ] 27.2 Create deployment documentation
    - Write README with setup instructions
    - Document environment variables
    - Create database setup guide
    - Document API endpoint usage
    - Add troubleshooting section
    - _Requirements: 10.2, 10.6_
  
  - [ ] 27.3 Configure HTTPS and security headers
    - Set up HTTPS configuration for production
    - Add security headers (HSTS, CSP, etc.)
    - Configure secure cookie settings
    - _Requirements: 10.7_

- [ ] 28. Final integration and testing
  - [ ] 28.1 Run complete test suite
    - Run all unit tests (frontend and backend)
    - Run all property-based tests
    - Run integration tests
    - Verify test coverage meets goals (80% backend, 70% frontend)
    - _Requirements: All_
  
  - [ ] 28.2 Perform manual end-to-end testing
    - Test complete user journey: register → login → set profile → chat → log food → view progress → generate meal plan
    - Test error scenarios and edge cases
    - Test on multiple browsers
    - Test responsive design on different devices
    - _Requirements: All_

- [ ] 29. Final checkpoint - Application ready for deployment
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Property-based tests validate universal correctness properties using fast-check
- Unit tests validate specific examples and edge cases
- Checkpoints ensure incremental validation at major milestones
- The implementation maintains the existing Material-UI design system and green/teal color scheme
- All backend code uses TypeScript for type safety
- Frontend uses React 18 with TypeScript and Material-UI v7
