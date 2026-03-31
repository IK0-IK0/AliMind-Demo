# Design Document: NutriBot Application Transformation

## Overview

This design transforms the existing NutriBot prototype (a React/TypeScript landing page with demo chatbot) into a full-stack nutrition assistant application. The prototype currently uses React 18, TypeScript, Material-UI v7, and Vite, with a green/teal health-focused design system.

The transformation adds:
- **Backend Infrastructure**: Node.js/Express REST API with PostgreSQL database
- **Authentication System**: JWT-based authentication with secure session management
- **Persistent Data Layer**: User profiles, chat history, meal plans, and progress tracking
- **External Integrations**: Nutrition API (USDA FoodData Central) and AI language model (OpenAI GPT-4)
- **Enhanced Frontend**: New pages for dashboard, profile settings, meal plans, and progress tracking with React Router

The design maintains the existing Material-UI component library and green/teal color scheme while extending functionality from a static demo to a production-ready application.

### Key Design Decisions

1. **Backend Framework**: Node.js with Express for JavaScript ecosystem consistency and rapid development
2. **Database**: PostgreSQL for relational data integrity and complex query support
3. **Authentication**: JWT tokens with httpOnly cookies for security and stateless scalability
4. **Nutrition Data**: USDA FoodData Central API (free, comprehensive, government-maintained)
5. **AI Integration**: OpenAI GPT-4 API for natural language understanding and response generation
6. **State Management**: React Context API for authentication state, local component state for UI
7. **API Communication**: Axios for HTTP requests with interceptors for authentication

## Architecture

### System Architecture

The application follows a three-tier architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Landing  │  │Dashboard │  │  Profile │  │ Progress │  │
│  │   Page   │  │   Page   │  │   Page   │  │   Page   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│         │              │              │              │      │
│         └──────────────┴──────────────┴──────────────┘      │
│                        │                                     │
│                 ┌──────▼──────┐                             │
│                 │ Auth Context │                             │
│                 │  API Client  │                             │
│                 └──────┬──────┘                             │
└────────────────────────┼────────────────────────────────────┘
                         │ HTTPS/REST
┌────────────────────────▼────────────────────────────────────┐
│                Backend API (Express)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   Auth   │  │   Chat   │  │   Meal   │  │ Progress │  │
│  │  Routes  │  │  Routes  │  │  Routes  │  │  Routes  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │             │              │              │         │
│  ┌────▼─────────────▼──────────────▼──────────────▼─────┐  │
│  │              Middleware Layer                         │  │
│  │  (Auth, Validation, Rate Limiting, Error Handling)    │  │
│  └────┬──────────────────────────────────────────────────┘  │
│       │                                                      │
│  ┌────▼─────────────────────────────────────────────────┐  │
│  │              Service Layer                            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │   Auth   │  │   Chat   │  │Nutrition │           │  │
│  │  │ Service  │  │ Service  │  │ Service  │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  └────┬──────────────┬──────────────┬───────────────────┘  │
│       │              │              │                       │
│  ┌────▼──────────────▼──────────────▼───────────────────┐  │
│  │         SQL Connection Pool (pg-pool)                 │  │
│  │  (Manages pooled connections to PostgreSQL)           │  │
│  └────┬──────────────────────────────────────────────────┘  │
└───────┼──────────────┼──────────────┼──────────────────────┘
        │              │              │
┌───────▼──────┐  ┌────▼────┐  ┌─────▼──────┐
│  PostgreSQL  │  │ OpenAI  │  │    USDA    │
│   Database   │  │   API   │  │ FoodData   │
└──────────────┘  └─────────┘  └────────────┘
```

### Technology Stack

**Frontend:**
- React 18.3.1 with TypeScript 5.5.4
- Material-UI 7.3.7 for UI components
- React Router 6.x for navigation
- Axios for HTTP requests
- Recharts for data visualization
- Vite 5.2.0 for build tooling

**Backend:**
- Node.js 20.x LTS
- Express 4.x for REST API
- PostgreSQL 15.x for database
- SQL with connection pooling (e.g., pg with pg-pool, or similar)
- JWT (jsonwebtoken) for authentication
- bcrypt for password hashing
- express-validator for input validation
- express-rate-limit for rate limiting
- winston for logging

**External Services:**
- USDA FoodData Central API for nutrition data
- OpenAI GPT-4 API for conversational AI

### Data Flow

1. **Authentication Flow:**
   - User submits credentials → Backend validates → JWT token generated → Token stored in httpOnly cookie → Frontend receives auth status → Protected routes accessible

2. **Chat Flow:**
   - User sends message → Frontend sends to /api/chat → Backend retrieves user context → OpenAI API processes → Nutrition API queried if needed → Response stored in database → Response returned to frontend → UI updates

3. **Food Logging Flow:**
   - User searches food → Frontend queries /api/nutrition/search → Backend queries USDA API → Results cached → User selects food → Frontend posts to /api/progress/log → Database updated → Progress recalculated → UI refreshed

## Components and Interfaces

### Frontend Components

#### New Pages

**DashboardPage**
- Purpose: Main authenticated user landing page
- Features: Quick stats, recent chat messages, today's nutrition summary, quick actions
- Props: None (uses auth context)
- State: Dashboard data (calories, macros, recent activity)

**ProfileSettingsPage**
- Purpose: User profile and preferences management
- Features: Personal info, dietary preferences, health goals, account settings
- Props: None (uses auth context)
- State: Profile form data, validation errors, save status

**MealPlansPage**
- Purpose: View and manage saved meal plans
- Features: List of saved plans, plan details, recipe viewer, plan generator
- Props: None (uses auth context)
- State: Meal plans list, selected plan, loading state

**ProgressTrackingPage**
- Purpose: Visualize nutrition and health progress
- Features: Charts (line, bar, pie), date range selector, goal comparison, insights
- Props: None (uses auth context)
- State: Progress data, selected date range, chart type

**AuthPage**
- Purpose: Login and registration forms
- Features: Login form, registration form, password reset, form validation
- Props: None
- State: Form data, active tab (login/register), errors

#### Modified Components

**TopBar**
- New Features: User menu dropdown, authentication status, navigation links
- New Props: `isAuthenticated: boolean`, `user: User | null`, `onLogout: () => void`

**ChatbotShowcase**
- New Features: Backend integration, persistent history, typing indicators, error handling
- New Props: `userId?: string`, `onSendMessage: (message: string) => Promise<void>`
- State: Messages from database, connection status

#### New Shared Components

**FoodSearchDialog**
- Purpose: Search and select foods for logging
- Props: `open: boolean`, `onClose: () => void`, `onSelect: (food: Food) => void`
- State: Search query, results, selected food, portion size

**NutritionCard**
- Purpose: Display nutrition information in consistent format
- Props: `calories: number`, `protein: number`, `carbs: number`, `fat: number`, `fiber?: number`

**ProgressChart**
- Purpose: Reusable chart component for progress visualization
- Props: `data: ChartData[]`, `type: 'line' | 'bar' | 'pie'`, `title: string`

**LoadingSpinner**
- Purpose: Consistent loading state indicator
- Props: `size?: 'small' | 'medium' | 'large'`, `message?: string`

### Backend API Endpoints

#### Authentication Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me
```

#### User Profile Endpoints

```
GET    /api/profile
PUT    /api/profile
PATCH  /api/profile/preferences
PATCH  /api/profile/goals
```

#### Chat Endpoints

```
POST   /api/chat/message
GET    /api/chat/history?page=1&limit=50
DELETE /api/chat/history/:conversationId
DELETE /api/chat/history
```

#### Nutrition Endpoints

```
GET    /api/nutrition/search?q=chicken&limit=10
GET    /api/nutrition/food/:fdcId
POST   /api/nutrition/custom
GET    /api/nutrition/favorites
POST   /api/nutrition/favorites/:foodId
DELETE /api/nutrition/favorites/:foodId
```

#### Meal Plan Endpoints

```
POST   /api/meals/generate
GET    /api/meals
GET    /api/meals/:planId
POST   /api/meals/:planId/save
DELETE /api/meals/:planId
GET    /api/meals/:planId/recipes/:recipeId
```

#### Progress Tracking Endpoints

```
POST   /api/progress/log
GET    /api/progress/daily?date=2024-01-15
GET    /api/progress/range?start=2024-01-01&end=2024-01-31
PUT    /api/progress/log/:logId
DELETE /api/progress/log/:logId
POST   /api/progress/weight
GET    /api/progress/weight?start=2024-01-01&end=2024-01-31
GET    /api/progress/insights
```

### API Request/Response Formats

#### Authentication

**POST /api/auth/register**
```typescript
Request: {
  email: string;
  password: string;
  name: string;
}

Response: {
  success: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  };
  message: string;
}
```

**POST /api/auth/login**
```typescript
Request: {
  email: string;
  password: string;
}

Response: {
  success: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    profile: UserProfile;
  };
}
```

#### Chat

**POST /api/chat/message**
```typescript
Request: {
  message: string;
  conversationId?: string;
}

Response: {
  userMessage: {
    id: string;
    text: string;
    timestamp: string;
  };
  botResponse: {
    id: string;
    text: string;
    timestamp: string;
  };
  conversationId: string;
}
```

#### Nutrition

**GET /api/nutrition/search**
```typescript
Response: {
  foods: Array<{
    fdcId: number;
    description: string;
    brandName?: string;
    servingSize: number;
    servingUnit: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>;
  totalResults: number;
}
```

#### Progress

**POST /api/progress/log**
```typescript
Request: {
  foodId: string;
  servingSize: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date?: string; // ISO date, defaults to today
}

Response: {
  log: {
    id: string;
    foodName: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    timestamp: string;
  };
  dailyTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}
```

## Data Models

### Database Connection Configuration

The application uses PostgreSQL with pooled connections for efficient database access. Connection details should be configured via environment variables.

**Connection Pooling Library:**

The design uses the `pg` library with its built-in connection pooling (`Pool` class), but you can substitute any PostgreSQL connection pooling solution that fits your needs:
- `pg` with `Pool` (recommended, built-in)
- `pg-pool` (standalone pooling)
- `pgBouncer` (external connection pooler)
- Custom pooling implementation

The key requirement is that the connection pool supports:
- Parameterized queries for SQL injection prevention
- Transaction management (BEGIN, COMMIT, ROLLBACK)
- Connection lifecycle management (acquire, release)
- Error handling and reconnection logic

**Required Environment Variables:**
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nutribot
DB_USER=your_username
DB_PASSWORD=your_password
DB_POOL_MIN=2
DB_POOL_MAX=10
DB_IDLE_TIMEOUT_MS=30000
DB_CONNECTION_TIMEOUT_MS=2000
```

**Connection Pool Setup Example:**

```javascript
// config/database.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  min: process.env.DB_POOL_MIN || 2,
  max: process.env.DB_POOL_MAX || 10,
  idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT_MS || 30000,
  connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT_MS || 2000,
});

// Test connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = pool;
```

**Query Execution Pattern:**

```javascript
// Example: Parameterized query with connection pool
const getUserById = async (userId) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [userId];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Example: Transaction handling
const createUserWithProfile = async (userData, profileData) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const userQuery = 'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id';
    const userResult = await client.query(userQuery, [userData.email, userData.passwordHash, userData.name]);
    const userId = userResult.rows[0].id;
    
    const profileQuery = 'INSERT INTO user_profiles (user_id) VALUES ($1)';
    await client.query(profileQuery, [userId]);
    
    await client.query('COMMIT');
    return userId;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
```

**Connection Pool Best Practices:**
- Always use parameterized queries ($1, $2, etc.) to prevent SQL injection
- Release clients back to the pool after transactions
- Handle connection errors gracefully with retry logic
- Monitor pool metrics (active connections, idle connections, wait time)
- Set appropriate pool size based on expected concurrent load
- Use transactions for multi-step operations that must be atomic

**Database Migration Management:**

Since the application uses raw SQL instead of an ORM, database schema changes should be managed through migration scripts. Consider using a migration tool like `node-pg-migrate`, `db-migrate`, or custom migration scripts.

**Example Migration Structure:**
```
backend/
  migrations/
    001_create_users_table.sql
    002_create_user_profiles_table.sql
    003_create_conversations_table.sql
    004_create_messages_table.sql
    ...
```

**Migration Script Example:**
```sql
-- migrations/001_create_users_table.sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

**Running Migrations:**
```javascript
// scripts/migrate.js
const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

const runMigrations = async () => {
  const migrationsDir = path.join(__dirname, '../migrations');
  const files = fs.readdirSync(migrationsDir).sort();
  
  for (const file of files) {
    if (file.endsWith('.sql')) {
      console.log(`Running migration: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await pool.query(sql);
      console.log(`Completed: ${file}`);
    }
  }
  
  console.log('All migrations completed');
  process.exit(0);
};

runMigrations().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
```

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_users_email ON users(email);
```

#### User Profiles Table
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  age INTEGER,
  weight_kg DECIMAL(5,2),
  height_cm DECIMAL(5,2),
  gender VARCHAR(20),
  activity_level VARCHAR(50), -- sedentary, light, moderate, active, very_active
  dietary_preferences TEXT[], -- vegetarian, vegan, gluten_free, dairy_free, etc.
  health_goal VARCHAR(50), -- weight_loss, muscle_gain, maintenance, general_health
  target_calories INTEGER,
  target_protein INTEGER,
  target_carbs INTEGER,
  target_fat INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
```

#### Conversations Table
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_updated_at ON conversations(updated_at DESC);
```

#### Messages Table
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender VARCHAR(10) NOT NULL, -- 'user' or 'bot'
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
```

#### Foods Table (Cached Nutrition Data)
```sql
CREATE TABLE foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fdc_id INTEGER UNIQUE, -- USDA FoodData Central ID
  description VARCHAR(500) NOT NULL,
  brand_name VARCHAR(255),
  serving_size DECIMAL(10,2),
  serving_unit VARCHAR(50),
  calories DECIMAL(10,2),
  protein DECIMAL(10,2),
  carbs DECIMAL(10,2),
  fat DECIMAL(10,2),
  fiber DECIMAL(10,2),
  sugar DECIMAL(10,2),
  sodium DECIMAL(10,2),
  is_custom BOOLEAN DEFAULT false,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_foods_fdc_id ON foods(fdc_id);
CREATE INDEX idx_foods_description ON foods USING gin(to_tsvector('english', description));
CREATE INDEX idx_foods_created_by ON foods(created_by);
```

#### Food Logs Table
```sql
CREATE TABLE food_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  food_id UUID NOT NULL REFERENCES foods(id) ON DELETE CASCADE,
  serving_size DECIMAL(10,2) NOT NULL,
  meal_type VARCHAR(20) NOT NULL, -- breakfast, lunch, dinner, snack
  log_date DATE NOT NULL,
  calories DECIMAL(10,2) NOT NULL,
  protein DECIMAL(10,2) NOT NULL,
  carbs DECIMAL(10,2) NOT NULL,
  fat DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_food_logs_user_id ON food_logs(user_id);
CREATE INDEX idx_food_logs_log_date ON food_logs(log_date DESC);
CREATE INDEX idx_food_logs_user_date ON food_logs(user_id, log_date);
```

#### Favorite Foods Table
```sql
CREATE TABLE favorite_foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  food_id UUID NOT NULL REFERENCES foods(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, food_id)
);

CREATE INDEX idx_favorite_foods_user_id ON favorite_foods(user_id);
```

#### Meal Plans Table
```sql
CREATE TABLE meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  target_calories INTEGER,
  duration_days INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_meal_plans_user_id ON meal_plans(user_id);
```

#### Meal Plan Items Table
```sql
CREATE TABLE meal_plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  meal_type VARCHAR(20) NOT NULL,
  recipe_name VARCHAR(255) NOT NULL,
  recipe_description TEXT,
  ingredients TEXT NOT NULL, -- JSON array
  instructions TEXT NOT NULL, -- JSON array
  prep_time_minutes INTEGER,
  cook_time_minutes INTEGER,
  servings INTEGER,
  calories DECIMAL(10,2),
  protein DECIMAL(10,2),
  carbs DECIMAL(10,2),
  fat DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_meal_plan_items_meal_plan_id ON meal_plan_items(meal_plan_id);
```

#### Weight Logs Table
```sql
CREATE TABLE weight_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  weight_kg DECIMAL(5,2) NOT NULL,
  log_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, log_date)
);

CREATE INDEX idx_weight_logs_user_id ON weight_logs(user_id);
CREATE INDEX idx_weight_logs_log_date ON weight_logs(log_date DESC);
```

### TypeScript Interfaces

#### Frontend Types

```typescript
// User and Authentication
interface User {
  id: string;
  email: string;
  name: string;
  profile: UserProfile;
}

interface UserProfile {
  age?: number;
  weightKg?: number;
  heightCm?: number;
  gender?: string;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dietaryPreferences: string[];
  healthGoal?: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'general_health';
  targetCalories?: number;
  targetProtein?: number;
  targetCarbs?: number;
  targetFat?: number;
}

// Chat
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface Conversation {
  id: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

// Nutrition
interface Food {
  id: string;
  fdcId?: number;
  description: string;
  brandName?: string;
  servingSize: number;
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  isCustom: boolean;
}

interface FoodLog {
  id: string;
  food: Food;
  servingSize: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  logDate: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: string;
}

// Meal Planning
interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface MealPlanItem {
  id: string;
  dayNumber: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: Recipe;
}

interface MealPlan {
  id: string;
  name: string;
  description: string;
  targetCalories: number;
  durationDays: number;
  items: MealPlanItem[];
  createdAt: string;
}

// Progress Tracking
interface DailyNutrition {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  logs: FoodLog[];
}

interface WeightLog {
  id: string;
  weightKg: number;
  logDate: string;
  notes?: string;
}

interface ProgressInsight {
  type: 'success' | 'warning' | 'info';
  message: string;
  metric: string;
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified the following redundancies:
- Properties 1.5, 1.6, 1.7 (storing different profile fields) can be combined into one comprehensive property about profile data persistence
- Properties 3.1 and 3.2 (storing user messages and bot responses) can be combined into one property about message persistence
- Properties 6.6 and 6.7 (saving favorite recipes and meal plans) are similar save/retrieve patterns that can be tested with one property pattern
- Properties 9.6 (edit/delete food logs) and 9.8 (save favorites) are CRUD operations that follow similar patterns

The following properties represent the unique, non-redundant correctness requirements:

### Property 1: User Registration Creates Profile

*For any* valid email and password combination, when a user registers, the system should create both a user account and an associated user profile with default settings.

**Validates: Requirements 1.1, 1.4**

### Property 2: Authentication Round Trip

*For any* registered user, logging in with correct credentials should return a valid JWT token that can be used to access protected endpoints.

**Validates: Requirements 1.2, 1.10**

### Property 3: Profile Data Persistence

*For any* user profile update (dietary preferences, health goals, or basic metrics), storing the data and then retrieving the profile should return the same values.

**Validates: Requirements 1.5, 1.6, 1.7, 1.8**

### Property 4: Unauthenticated Access Restriction

*For any* protected endpoint, requests without a valid authentication token should be rejected with 401 Unauthorized status.

**Validates: Requirements 1.9**

### Property 5: Input Validation Rejection

*For any* API endpoint, sending invalid data (wrong types, missing required fields, out-of-range values) should return 400 Bad Request with validation error details.

**Validates: Requirements 2.4**

### Property 6: Error Status Codes

*For any* error condition (not found, unauthorized, validation failure, server error), the API should return the appropriate HTTP status code (404, 401, 400, 500).

**Validates: Requirements 2.3**

### Property 7: Message Persistence

*For any* authenticated chat conversation, all messages (both user and bot) should be stored in the database and retrievable in chronological order.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4**

### Property 8: Chat History Deletion

*For any* conversation or message, when a user deletes it, subsequent queries for that conversation should not return the deleted data.

**Validates: Requirements 3.5**

### Property 9: Chat Pagination

*For any* conversation with more than N messages, requesting page 1 with limit N should return exactly N messages, and page 2 should return the next set without duplicates.

**Validates: Requirements 3.6**

### Property 10: Unauthenticated Chat Non-Persistence

*For any* message sent without authentication, the message should not be stored in the database.

**Validates: Requirements 3.7**

### Property 11: Nutrition Data Structure

*For any* food item returned from the nutrition API, the response should contain all required fields: calories, protein, carbohydrates, fat, fiber, and serving information.

**Validates: Requirements 4.3**

### Property 12: AI Context Preservation

*For any* multi-message conversation, each subsequent message should include previous messages in the context sent to the AI API.

**Validates: Requirements 5.6**

### Property 13: Disclaimer Presence

*For any* bot response generated by the AI system, the response should include or be accompanied by a disclaimer that the advice is informational and not medical guidance.

**Validates: Requirements 5.8**

### Property 14: Meal Plan Generation

*For any* user with a complete profile (including caloric targets and dietary preferences), requesting a meal plan should generate a plan that includes breakfast, lunch, and dinner for each day.

**Validates: Requirements 6.1, 6.2**

### Property 15: Meal Plan Caloric Accuracy

*For any* generated meal plan, the total calories across all meals should be within 10% of the user's target calories.

**Validates: Requirements 6.3**

### Property 16: Dietary Restriction Compliance

*For any* user with dietary restrictions (vegetarian, vegan, gluten-free, etc.), generated meal plans should not include recipes containing restricted ingredients.

**Validates: Requirements 6.4**

### Property 17: Recipe Data Completeness

*For any* recipe in a meal plan, the recipe should include all required fields: ingredients list, preparation steps, cooking time, and nutrition information.

**Validates: Requirements 6.5**

### Property 18: Saved Data Retrieval

*For any* user data (favorite recipes, meal plans, food logs), saving the data and then querying for it should return the same data.

**Validates: Requirements 6.6, 6.7, 9.8**

### Property 19: Food Log Persistence

*For any* food item logged by a user, the log should be stored with the correct date, meal type, portion size, and calculated nutrition values.

**Validates: Requirements 7.1, 9.5**

### Property 20: Daily Nutrition Calculation

*For any* set of food logs for a given date, the daily totals for calories, protein, carbs, and fat should equal the sum of the individual log entries.

**Validates: Requirements 7.2**

### Property 21: Date Range Queries

*For any* date range (start and end dates), querying progress data should return only logs within that range, inclusive of boundaries.

**Validates: Requirements 7.4**

### Property 22: Goal Comparison Accuracy

*For any* user with defined nutrition goals, the progress comparison should accurately calculate the difference between actual intake and target values.

**Validates: Requirements 7.5**

### Property 23: Weight Log Persistence

*For any* weight measurement logged by a user, the log should be stored with the correct date and weight value, and retrievable in chronological order.

**Validates: Requirements 7.6**

### Property 24: Food Search Results

*For any* food search query, all returned results should have descriptions that contain the search term (case-insensitive) or be phonetically similar (fuzzy matching).

**Validates: Requirements 9.2**

### Property 25: Portion Size Scaling

*For any* food item logged with a portion size different from the standard serving, the calculated nutrition values should be proportionally scaled.

**Validates: Requirements 9.4**

### Property 26: Food Log Modification

*For any* food log, updating the portion size or meal type should persist the changes, and deleting the log should remove it from daily totals.

**Validates: Requirements 9.6**

### Property 27: Custom Food Creation

*For any* custom food item created with manual nutrition entry, the food should be stored and retrievable with all entered nutrition values intact.

**Validates: Requirements 9.7**


## Error Handling

### Frontend Error Handling

**Network Errors:**
- All API calls wrapped in try-catch blocks
- Network failures display user-friendly error messages
- Retry mechanism for transient failures (with exponential backoff)
- Offline detection with appropriate UI feedback

**Authentication Errors:**
- 401 responses trigger automatic logout and redirect to login page
- Token refresh attempted before logout
- Session expiration warnings displayed to user

**Validation Errors:**
- Form validation before submission (client-side)
- Server validation errors displayed inline on form fields
- Clear error messages indicating what needs to be corrected

**Component Errors:**
- React Error Boundaries wrap major sections
- Error boundaries catch rendering errors and display fallback UI
- Errors logged to console in development, sent to error tracking service in production

**Loading States:**
- Skeleton loaders for data fetching
- Disabled buttons during submission
- Progress indicators for long operations

### Backend Error Handling

**Request Validation:**
- express-validator middleware validates all inputs
- Validation errors return 400 with detailed error messages
- Schema validation for request bodies

**Authentication/Authorization Errors:**
- Invalid tokens return 401 Unauthorized
- Missing permissions return 403 Forbidden
- Clear error messages indicating auth issue

**Database Errors:**
- Connection errors caught and logged
- Constraint violations return 400 with user-friendly messages
- Transaction rollback on errors
- Database connection pooling with retry logic

**External API Errors:**
- Timeout handling for slow external APIs (5 second timeout)
- Fallback responses when external services unavailable
- Circuit breaker pattern for repeated failures
- Error logging with external service name and error details

**Rate Limiting:**
- Rate limit exceeded returns 429 Too Many Requests
- Response includes Retry-After header
- Different limits for authenticated vs unauthenticated users

**Server Errors:**
- Unhandled exceptions caught by global error handler
- 500 Internal Server Error returned to client
- Full error details logged server-side
- Generic error message sent to client (no sensitive info leaked)

**Logging:**
- Winston logger with different levels (error, warn, info, debug)
- Errors include stack traces, request IDs, user IDs
- Logs written to files and optionally to external service
- Sensitive data (passwords, tokens) never logged

### Error Response Format

All error responses follow consistent format:

```typescript
{
  success: false,
  error: {
    code: string,        // Machine-readable error code
    message: string,     // Human-readable error message
    details?: any,       // Additional error details (validation errors, etc.)
    requestId?: string   // Request ID for tracking
  }
}
```

### Error Codes

- `AUTH_INVALID_CREDENTIALS`: Login failed
- `AUTH_TOKEN_EXPIRED`: JWT token expired
- `AUTH_TOKEN_INVALID`: JWT token malformed or invalid
- `VALIDATION_ERROR`: Input validation failed
- `NOT_FOUND`: Resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `EXTERNAL_API_ERROR`: External service failure
- `DATABASE_ERROR`: Database operation failed
- `INTERNAL_ERROR`: Unexpected server error


## Testing Strategy

### Overview

The testing strategy employs a dual approach combining unit tests for specific examples and edge cases with property-based tests for universal correctness properties. This ensures both concrete behavior verification and comprehensive input coverage.

### Property-Based Testing

**Framework:** fast-check (JavaScript/TypeScript property-based testing library)

**Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Tag format: `Feature: prototype-application-modifications, Property {N}: {property description}`

**Property Test Coverage:**

Property-based tests will be written for all 27 correctness properties defined in this document. Each property test will:
1. Generate random valid inputs using fast-check arbitraries
2. Execute the system behavior
3. Assert the property holds for all generated inputs
4. Report any counterexamples that violate the property

**Example Property Test Structure:**

```typescript
// Feature: prototype-application-modifications, Property 1: User Registration Creates Profile
test('user registration creates profile', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.emailAddress(),
      fc.string({ minLength: 8, maxLength: 50 }),
      fc.string({ minLength: 2, maxLength: 100 }),
      async (email, password, name) => {
        const response = await registerUser({ email, password, name });
        expect(response.success).toBe(true);
        
        const profile = await getUserProfile(response.user.id);
        expect(profile).toBeDefined();
        expect(profile.userId).toBe(response.user.id);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing

**Frontend Testing:**
- **Framework:** Vitest + React Testing Library
- **Coverage:** Component rendering, user interactions, state management, API integration
- **Focus Areas:**
  - Component rendering with different props
  - User event handling (clicks, form submissions)
  - Conditional rendering based on auth state
  - Error boundary behavior
  - Loading states

**Backend Testing:**
- **Framework:** Jest + Supertest
- **Coverage:** API endpoints, middleware, service layer, database operations
- **Focus Areas:**
  - Endpoint response formats
  - Authentication middleware
  - Input validation
  - Database queries
  - External API mocking

**Unit Test Examples:**

```typescript
// Example: Password reset email generation
test('password reset generates valid token', async () => {
  const user = await createTestUser();
  const token = await generatePasswordResetToken(user.id);
  
  expect(token).toHaveLength(64);
  expect(await verifyPasswordResetToken(token)).toBe(user.id);
});

// Example: Rate limiting
test('rate limiter blocks excessive requests', async () => {
  const requests = Array(101).fill(null).map(() => 
    request(app).get('/api/nutrition/search?q=apple')
  );
  
  const responses = await Promise.all(requests);
  const tooManyRequests = responses.filter(r => r.status === 429);
  
  expect(tooManyRequests.length).toBeGreaterThan(0);
});

// Example: CORS headers
test('API includes CORS headers', async () => {
  const response = await request(app)
    .options('/api/auth/login')
    .set('Origin', 'http://localhost:5173');
  
  expect(response.headers['access-control-allow-origin']).toBeDefined();
  expect(response.headers['access-control-allow-methods']).toContain('POST');
});

// Example: Error boundary
test('error boundary catches component errors', () => {
  const ThrowError = () => { throw new Error('Test error'); };
  
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );
  
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});
```

### Integration Testing

**API Integration Tests:**
- Test complete request/response cycles
- Test authentication flows (register → login → access protected route)
- Test data persistence (create → read → update → delete)
- Test external API integration with mocked services

**Database Integration Tests:**
- Test migrations and schema
- Test SQL queries with parameterized inputs
- Test complex queries and joins
- Test transaction rollback on errors
- Test database constraints and foreign key relationships
- Test connection pool behavior under load

**Example Database Integration Tests:**

```javascript
// Test transaction rollback
test('transaction rolls back on error', async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    await client.query('INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)', 
      ['test@example.com', 'hash', 'Test User']);
    
    // This should fail due to duplicate email
    await expect(
      client.query('INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)', 
        ['test@example.com', 'hash2', 'Test User 2'])
    ).rejects.toThrow();
    
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
  
  // Verify no users were inserted
  const result = await pool.query('SELECT COUNT(*) FROM users WHERE email = $1', ['test@example.com']);
  expect(parseInt(result.rows[0].count)).toBe(0);
});

// Test parameterized queries prevent SQL injection
test('parameterized queries prevent SQL injection', async () => {
  const maliciousInput = "'; DROP TABLE users; --";
  
  await expect(
    pool.query('SELECT * FROM users WHERE email = $1', [maliciousInput])
  ).resolves.not.toThrow();
  
  // Verify users table still exists
  const result = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_name = 'users'");
  expect(result.rows.length).toBe(1);
});
```

### End-to-End Testing

**Framework:** Playwright or Cypress

**Coverage:**
- Critical user journeys (registration → login → food logging → view progress)
- Cross-browser compatibility
- Responsive design on different screen sizes
- Error scenarios (network failures, invalid inputs)

**E2E Test Examples:**
- User registration and login flow
- Complete food logging workflow
- Meal plan generation and saving
- Chat conversation with bot responses

### Test Data Management

**Test Database:**
- Separate test database instance
- Database reset before each test suite using SQL scripts
- Seed data for consistent test scenarios using INSERT statements
- Transaction rollback after each test or TRUNCATE tables between tests

**Database Setup for Tests:**

```javascript
// tests/setup.js
const pool = require('../config/database');
const fs = require('fs');
const path = require('path');

// Run before all tests
beforeAll(async () => {
  // Run migrations
  const schema = fs.readFileSync(path.join(__dirname, '../migrations/schema.sql'), 'utf8');
  await pool.query(schema);
});

// Run before each test
beforeEach(async () => {
  // Clear all tables
  await pool.query(`
    TRUNCATE TABLE 
      weight_logs, meal_plan_items, meal_plans, favorite_foods, 
      food_logs, foods, messages, conversations, user_profiles, users 
    RESTART IDENTITY CASCADE
  `);
});

// Run after all tests
afterAll(async () => {
  await pool.end();
});
```

**Test Fixtures:**
- Predefined user accounts with various profiles
- Sample food items with known nutrition values
- Example meal plans and recipes
- SQL seed scripts for common test scenarios

**Example Test Fixture:**

```javascript
// tests/fixtures/users.js
const createTestUser = async (pool, overrides = {}) => {
  const defaults = {
    email: 'test@example.com',
    password_hash: '$2b$10$...',  // bcrypt hash of 'password123'
    name: 'Test User'
  };
  
  const userData = { ...defaults, ...overrides };
  
  const result = await pool.query(
    'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING *',
    [userData.email, userData.password_hash, userData.name]
  );
  
  return result.rows[0];
};

module.exports = { createTestUser };
```

### Mocking Strategy

**External APIs:**
- Mock OpenAI API responses for predictable chat testing
- Mock USDA FoodData Central API for nutrition data
- Use nock or msw for HTTP mocking
- Provide realistic mock data based on actual API responses

**Time-Dependent Tests:**
- Mock Date.now() for consistent timestamps
- Use fixed dates for date range queries
- Test timezone handling

### Performance Testing

**Load Testing:**
- Test API endpoints under concurrent load
- Verify rate limiting effectiveness
- Test database connection pool under stress
- Measure response times for critical endpoints

**Benchmarks:**
- Chat response time < 5 seconds
- Food search response time < 500ms
- Dashboard load time < 2 seconds
- Database queries < 100ms for simple queries

### Test Coverage Goals

- **Backend:** 80% code coverage minimum
- **Frontend:** 70% code coverage minimum
- **Critical paths:** 100% coverage (authentication, data persistence, calculations)
- **Property tests:** All 27 correctness properties implemented

### Continuous Integration

**CI Pipeline:**
1. Lint code (ESLint, TypeScript compiler)
2. Run unit tests (frontend and backend)
3. Run property-based tests
4. Run integration tests
5. Generate coverage reports
6. Run E2E tests on staging environment
7. Build production artifacts

**Test Execution:**
- All tests run on every pull request
- Property tests run with 100 iterations in CI
- E2E tests run on main branch commits
- Nightly extended test runs with 1000 property test iterations

### Test Organization

```
backend/
  tests/
    unit/
      auth.test.ts
      chat.test.ts
      nutrition.test.ts
      progress.test.ts
    integration/
      api.test.ts
      database.test.ts
    properties/
      auth.properties.test.ts
      chat.properties.test.ts
      nutrition.properties.test.ts
      progress.properties.test.ts
    fixtures/
      users.ts
      foods.ts
      meals.ts

frontend/
  src/
    components/
      __tests__/
        DashboardPage.test.tsx
        ProfileSettingsPage.test.tsx
        ChatbotShowcase.test.tsx
    __tests__/
      integration/
        auth-flow.test.tsx
        food-logging.test.tsx
```

### Testing Best Practices

1. **Isolation:** Each test should be independent and not rely on other tests
2. **Clarity:** Test names clearly describe what is being tested
3. **Arrange-Act-Assert:** Follow AAA pattern for test structure
4. **Fast Execution:** Unit tests should run in milliseconds
5. **Deterministic:** Tests should produce same results every run
6. **Meaningful Assertions:** Assert on specific values, not just truthiness
7. **Error Messages:** Provide clear failure messages for debugging
8. **Cleanup:** Always clean up resources (database connections, file handles)

