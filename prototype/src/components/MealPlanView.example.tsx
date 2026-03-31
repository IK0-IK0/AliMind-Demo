/**
 * MealPlanView Component Example
 * 
 * This example demonstrates how to use the MealPlanView component
 * to display a generated meal plan with recipe details.
 */

import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { MealPlanView } from './MealPlanView';
import { generateMealPlan, MealPlanConstraints } from '../services/mealPlanService';

export function MealPlanViewExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(() => {
    // Generate initial meal plan
    const constraints: MealPlanConstraints = {
      targetCalories: 2000,
      dietaryRestrictions: [],
      maxPrepTime: 60,
      maxCookTime: 60,
      budget: 'medium',
      difficulty: 'easy',
      equipment: 'basic'
    };
    return generateMealPlan(constraints, 1);
  });

  const handleGenerateNew = () => {
    // Show loading state
    setIsLoading(true);
    
    // Simulate async meal plan generation
    setTimeout(() => {
      const constraints: MealPlanConstraints = {
        targetCalories: 2000,
        dietaryRestrictions: [],
        maxPrepTime: 60,
        maxCookTime: 60,
        budget: 'medium',
        difficulty: 'easy',
        equipment: 'basic'
      };
      const newPlan = generateMealPlan(constraints, 1);
      setMealPlan(newPlan);
      setIsLoading(false);
    }, 2000); // 2 second delay to show loading state
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#2E7D32' }}>
        Meal Plan View Example
      </Typography>
      
      <MealPlanView 
        mealPlan={mealPlan} 
        onGenerateNew={handleGenerateNew}
        isLoading={isLoading}
      />
    </Container>
  );
}

/**
 * Example with multi-day meal plan
 */
export function MultiDayMealPlanExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(() => {
    const constraints: MealPlanConstraints = {
      targetCalories: 2200,
      dietaryRestrictions: ['vegetarian'],
      maxPrepTime: 45,
      budget: 'low',
      difficulty: 'easy',
      equipment: 'basic'
    };
    return generateMealPlan(constraints, 3); // 3-day plan
  });

  const handleGenerateNew = () => {
    setIsLoading(true);
    setTimeout(() => {
      const constraints: MealPlanConstraints = {
        targetCalories: 2200,
        dietaryRestrictions: ['vegetarian'],
        maxPrepTime: 45,
        budget: 'low',
        difficulty: 'easy',
        equipment: 'basic'
      };
      const newPlan = generateMealPlan(constraints, 3);
      setMealPlan(newPlan);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#2E7D32' }}>
        3-Day Vegetarian Meal Plan
      </Typography>
      
      <MealPlanView 
        mealPlan={mealPlan} 
        onGenerateNew={handleGenerateNew}
        isLoading={isLoading}
      />
    </Container>
  );
}

/**
 * Example with high-protein meal plan
 */
export function HighProteinMealPlanExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(() => {
    const constraints: MealPlanConstraints = {
      targetCalories: 2500,
      dietaryRestrictions: [],
      maxPrepTime: 90,
      maxCookTime: 90,
      budget: 'high',
      difficulty: 'medium',
      equipment: 'intermediate'
    };
    return generateMealPlan(constraints, 1);
  });

  const handleGenerateNew = () => {
    setIsLoading(true);
    setTimeout(() => {
      const constraints: MealPlanConstraints = {
        targetCalories: 2500,
        dietaryRestrictions: [],
        maxPrepTime: 90,
        maxCookTime: 90,
        budget: 'high',
        difficulty: 'medium',
        equipment: 'intermediate'
      };
      const newPlan = generateMealPlan(constraints, 1);
      setMealPlan(newPlan);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#2E7D32' }}>
        High-Calorie Meal Plan (2500 cal)
      </Typography>
      
      <MealPlanView 
        mealPlan={mealPlan} 
        onGenerateNew={handleGenerateNew}
        isLoading={isLoading}
      />
    </Container>
  );
}
