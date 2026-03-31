# TPB/TTM Questionnaire - Usage Guide

## Overview
This is a self-contained HTML questionnaire for collecting Theory of Planned Behavior (TPB) and Transtheoretical Model (TTM) data for nutrition research.

## File Location
`prototype/tpb-ttm-questionnaire.html`

## Features
- **20 TPB Questions** covering:
  - Attitude (8 questions)
  - Subjective Norm (6 questions)
  - Perceived Behavioral Control (6 questions)

- **20 TTM Questions** covering all 5 stages:
  - Pre-contemplation (4 questions)
  - Contemplation (4 questions)
  - Preparation (4 questions)
  - Action (4 questions)
  - Maintenance (4 questions)

- **20 Filipino Dish Examples** with:
  - Name and description
  - Preparation time
  - Difficulty level
  - Calorie information

## How to Use

### Opening the Questionnaire
1. Simply double-click `tpb-ttm-questionnaire.html` to open in your default browser
2. Or right-click and select "Open with" to choose a specific browser

### Answering Questions
1. Click on the tabs to navigate between TPB Questions, TTM Questions, and Sample Dishes
2. For each question, select a rating from 1 (Strongly Disagree) to 5 (Strongly Agree)
3. The progress bar at the top shows your completion percentage
4. Answers are automatically saved to your browser's local storage

### Exporting Data
1. Click the "Export JSON" button to download your responses
2. The exported file includes:
   - All your answers with numeric values and labels
   - Complete question metadata
   - Sample dishes information
   - Export timestamp
   - Completion statistics

### Managing Answers
- **Save Answers**: Click "Save Answers" to manually save to browser storage
- **Clear All**: Click "Clear All" to reset all answers (requires confirmation)

## Data Structure

### Answer Format
```json
{
  "questionId": {
    "value": 4,
    "label": "Agree",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### Export Format
```json
{
  "answers": { /* all answers */ },
  "tpbQuestions": [ /* TPB questions with construct metadata */ ],
  "ttmQuestions": [ /* TTM questions with stage metadata */ ],
  "dishes": [ /* Filipino dish examples */ ],
  "exportedAt": "2024-01-15T10:30:00.000Z",
  "summary": {
    "totalQuestions": 40,
    "answeredQuestions": 35,
    "completionPercentage": "87.50%"
  }
}
```

## Technical Details
- **No external dependencies**: All CSS and JavaScript are inline
- **Browser compatibility**: Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- **Responsive design**: Works on desktop, tablet, and mobile devices
- **Color scheme**: Green/teal theme matching the main NutriBot application
- **Data persistence**: Uses browser localStorage for automatic saving

## Research Purpose
This questionnaire is designed for Iteration 1 data collection to validate the TPB/TTM inference system in the NutriBot application. It targets Filipino young adults and adults aged 18-40 in Davao City.

## Privacy Note
All data is stored locally in your browser. No information is sent to any server unless you manually share the exported JSON file.
