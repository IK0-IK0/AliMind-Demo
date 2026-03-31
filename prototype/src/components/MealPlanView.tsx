import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Alert,
  CircularProgress,
  Skeleton
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  AccessTime as AccessTimeIcon,
  LocalFireDepartment as CaloriesIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { MealPlan, MealPlanItem } from '../services/mealPlanService';

interface MealPlanViewProps {
  mealPlan: MealPlan;
  onGenerateNew: () => void;
  isLoading?: boolean;
}

export function MealPlanView({ mealPlan, onGenerateNew, isLoading = false }: MealPlanViewProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<MealPlanItem | null>(null);

  const getMealTypeColor = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return '#FFA726';
      case 'lunch':
        return '#42A5F5';
      case 'dinner':
        return '#AB47BC';
      case 'snack':
        return '#66BB6A';
      default:
        return '#78909C';
    }
  };

  const getMealTypeLabel = (mealType: string) => {
    return mealType.charAt(0).toUpperCase() + mealType.slice(1);
  };

  const groupByDay = () => {
    const grouped: { [key: number]: MealPlanItem[] } = {};
    mealPlan.items.forEach((item) => {
      if (!grouped[item.day]) {
        grouped[item.day] = [];
      }
      grouped[item.day].push(item);
    });
    return grouped;
  };

  const dayGroups = groupByDay();

  const handleViewRecipe = (item: MealPlanItem) => {
    setSelectedRecipe(item);
  };

  const handleCloseDialog = () => {
    setSelectedRecipe(null);
  };

  return (
    <Box>
      {/* Loading State with Skeleton Loaders */}
      {isLoading && (
        <Box>
          {/* Loading Spinner and Message */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 4, mb: 4 }}>
            <CircularProgress 
              size={60} 
              thickness={4}
              sx={{ 
                color: '#4CAF50'
              }} 
            />
            <Typography variant="h6" sx={{ color: '#2E7D32', fontWeight: 600 }}>
              Generating Your Meal Plan...
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', maxWidth: 400 }}>
              We're creating a personalized meal plan based on your preferences and nutritional needs.
            </Typography>
          </Box>

          {/* Skeleton Loaders for Meal Plan Preview */}
          <Paper
            elevation={2}
            sx={{
              p: { xs: 2, sm: 3 },
              mb: 3,
              borderRadius: { xs: 2, sm: 3 },
              bgcolor: '#E8F5E9',
              border: '1px solid rgba(0,0,0,0.08)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="rectangular" width={180} height={40} sx={{ borderRadius: 1 }} />
            </Box>
            <Grid container spacing={2}>
              {[1, 2, 3, 4].map((i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <Skeleton variant="text" width={80} height={20} />
                  <Skeleton variant="text" width={120} height={32} />
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Skeleton Meal Cards */}
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((i) => (
              <Grid item xs={12} sm={6} lg={3} key={i}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    borderRadius: { xs: 2, sm: 3 },
                    border: '1px solid rgba(0,0,0,0.08)'
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 2 } }}>
                    <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1, mb: 1.5 }} />
                    <Skeleton variant="text" width="90%" height={32} />
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="80%" height={20} sx={{ mb: 2 }} />
                    <Skeleton variant="text" width={120} height={24} />
                    <Skeleton variant="text" width={150} height={20} />
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 1 }} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Content - Hidden during loading */}
      {!isLoading && (
        <>
      {/* Header with Alert */}
      <Alert 
        severity="info" 
        sx={{ 
          mb: 3, 
          borderRadius: { xs: 1, sm: 2 },
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
          Session-Only Demo
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          This meal plan is generated for demonstration purposes only and is not saved. Click "Generate New Plan" to create a different plan.
        </Typography>
      </Alert>

      {/* Meal Plan Summary */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: { xs: 2, sm: 3 },
          bgcolor: '#E8F5E9',
          border: '1px solid rgba(0,0,0,0.08)'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#2E7D32', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            Your Meal Plan
          </Typography>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={onGenerateNew}
            fullWidth={false}
            sx={{
              bgcolor: '#4CAF50',
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              px: { xs: 2, sm: 3 },
              width: { xs: '100%', sm: 'auto' },
              '&:hover': {
                bgcolor: '#43A047'
              }
            }}
          >
            Generate New Plan
          </Button>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="caption" sx={{ color: '#555', fontWeight: 600 }}>
                Duration
              </Typography>
              <Typography variant="h6" sx={{ color: '#2E7D32' }}>
                {mealPlan.durationDays} {mealPlan.durationDays === 1 ? 'Day' : 'Days'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="caption" sx={{ color: '#555', fontWeight: 600 }}>
                Daily Target
              </Typography>
              <Typography variant="h6" sx={{ color: '#2E7D32' }}>
                {mealPlan.totalDailyCalories} cal
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="caption" sx={{ color: '#555', fontWeight: 600 }}>
                Total Meals
              </Typography>
              <Typography variant="h6" sx={{ color: '#2E7D32' }}>
                {mealPlan.items.length}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="caption" sx={{ color: '#555', fontWeight: 600 }}>
                Meals per Day
              </Typography>
              <Typography variant="h6" sx={{ color: '#2E7D32' }}>
                {mealPlan.items.length / mealPlan.durationDays}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Day-by-Day Breakdown */}
      {Object.keys(dayGroups)
        .sort((a, b) => Number(a) - Number(b))
        .map((dayKey) => {
          const day = Number(dayKey);
          const dayItems = dayGroups[day];
          const dayCalories = dayItems.reduce((sum, item) => sum + item.recipe.calories, 0);
          const dayProtein = dayItems.reduce((sum, item) => sum + item.recipe.protein, 0);
          const dayCarbs = dayItems.reduce((sum, item) => sum + item.recipe.carbs, 0);
          const dayFat = dayItems.reduce((sum, item) => sum + item.recipe.fat, 0);

          return (
            <Box key={day} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2E7D32', mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Day {day}
              </Typography>

              {/* Day Summary */}
              <Paper
                elevation={1}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  mb: 2,
                  borderRadius: { xs: 1, sm: 2 },
                  bgcolor: '#FAFAFA',
                  border: '1px solid rgba(0,0,0,0.08)'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      Calories
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                      {Math.round(dayCalories)} cal
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      Protein
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                      {Math.round(dayProtein)}g
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      Carbs
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                      {Math.round(dayCarbs)}g
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      Fat
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                      {Math.round(dayFat)}g
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Meal Cards */}
              <Grid container spacing={2}>
                {dayItems
                  .sort((a, b) => {
                    const order = ['breakfast', 'snack', 'lunch', 'dinner'];
                    return order.indexOf(a.mealType) - order.indexOf(b.mealType);
                  })
                  .map((item, index) => (
                    <Grid item xs={12} sm={6} lg={3} key={index}>
                      <Card
                        elevation={2}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: { xs: 2, sm: 3 },
                          border: '1px solid rgba(0,0,0,0.08)',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 4
                          }
                        }}
                      >
                        <CardContent sx={{ flex: 1, pb: 1, p: { xs: 2, sm: 2 } }}>
                          <Chip
                            label={getMealTypeLabel(item.mealType)}
                            size="small"
                            sx={{
                              bgcolor: getMealTypeColor(item.mealType),
                              color: 'white',
                              fontWeight: 600,
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                              mb: 1.5
                            }}
                          />
                          
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: '#2E7D32',
                              mb: 1,
                              lineHeight: 1.3,
                              fontSize: { xs: '1rem', sm: '1.25rem' }
                            }}
                          >
                            {item.recipe.name}
                          </Typography>
                          
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#666',
                              mb: 2,
                              fontSize: { xs: '0.8rem', sm: '0.875rem' },
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {item.recipe.description}
                          </Typography>

                          <Divider sx={{ my: 1.5 }} />

                          {/* Nutrition Info */}
                          <Stack spacing={0.5}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CaloriesIcon sx={{ fontSize: { xs: 14, sm: 16 }, color: '#FF6F00' }} />
                              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                                {item.recipe.calories} cal
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, ml: 3 }}>
                              <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                P: {item.recipe.protein}g
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                C: {item.recipe.carbs}g
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                F: {item.recipe.fat}g
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                              <AccessTimeIcon sx={{ fontSize: { xs: 14, sm: 16 }, color: '#00897B' }} />
                              <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                {item.recipe.prepTime + item.recipe.cookTime} min total
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>

                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <Button
                            fullWidth
                            variant="outlined"
                            size="small"
                            startIcon={<RestaurantIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />}
                            onClick={() => handleViewRecipe(item)}
                            sx={{
                              borderColor: '#4CAF50',
                              color: '#4CAF50',
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              '&:hover': {
                                borderColor: '#43A047',
                                bgcolor: 'rgba(76, 175, 80, 0.04)'
                              }
                            }}
                          >
                            View Recipe
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          );
        })}

      {/* Recipe Detail Dialog */}
      <Dialog
        open={!!selectedRecipe}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={false}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 3 },
            m: { xs: 0, sm: 2 },
            maxHeight: { xs: '100%', sm: 'calc(100% - 64px)' }
          }
        }}
      >
        {selectedRecipe && (
          <>
            <DialogTitle sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                <RestaurantIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    {selectedRecipe.recipe.name}
                  </Typography>
                  <Chip
                    label={getMealTypeLabel(selectedRecipe.mealType)}
                    size="small"
                    sx={{
                      bgcolor: getMealTypeColor(selectedRecipe.mealType),
                      color: 'white',
                      fontWeight: 600,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      mt: 0.5
                    }}
                  />
                </Box>
              </Box>
            </DialogTitle>
            
            <DialogContent sx={{ mt: 2, p: { xs: 2, sm: 3 } }}>
              <Typography variant="body1" sx={{ color: '#666', mb: 3, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                {selectedRecipe.recipe.description}
              </Typography>

              {/* Recipe Info */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Prep Time
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                    {selectedRecipe.recipe.prepTime} min
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Cook Time
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                    {selectedRecipe.recipe.cookTime} min
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Difficulty
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize', fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                    {selectedRecipe.recipe.difficulty}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Calories
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                    {selectedRecipe.recipe.calories} cal
                  </Typography>
                </Grid>
              </Grid>

              {/* Macros */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  mb: 3,
                  bgcolor: '#FAFAFA',
                  borderRadius: { xs: 1, sm: 2 }
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
                  Macronutrients
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      Protein
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#2E7D32', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                      {selectedRecipe.recipe.protein}g
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      Carbs
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#2E7D32', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                      {selectedRecipe.recipe.carbs}g
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      Fat
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#2E7D32', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                      {selectedRecipe.recipe.fat}g
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Ingredients */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#2E7D32', fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                  Ingredients
                </Typography>
                <Stack spacing={0.5}>
                  {selectedRecipe.recipe.ingredients.map((ingredient, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: '#4CAF50',
                          mt: 1,
                          flexShrink: 0
                        }}
                      />
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{ingredient}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Instructions */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: '#2E7D32', fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                  Instructions
                </Typography>
                <Stack spacing={1.5}>
                  {selectedRecipe.recipe.instructions.map((instruction, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 } }}>
                      <Box
                        sx={{
                          width: { xs: 24, sm: 28 },
                          height: { xs: 24, sm: 28 },
                          borderRadius: '50%',
                          bgcolor: '#E8F5E9',
                          color: '#2E7D32',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          flexShrink: 0
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Typography variant="body2" sx={{ pt: 0.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                        {instruction}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: { xs: 2, sm: 2 }, pt: 0 }}>
              <Button 
                onClick={handleCloseDialog} 
                sx={{ 
                  color: '#4CAF50',
                  fontSize: { xs: '0.875rem', sm: '0.875rem' }
                }}
                fullWidth={false}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
        </>
      )}
    </Box>
  );
}
