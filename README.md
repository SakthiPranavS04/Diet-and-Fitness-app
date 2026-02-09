# FitLife - Home Workout & Diet Planner

A comprehensive fitness and nutrition web application that combines workout planning and diet tracking in one beautiful, user-friendly interface.

## Features

### 🎯 Smart Onboarding
- **4-Step User Profile Setup**
  - Personal information (name, age, gender)
  - Body measurements (height, weight)
  - Fitness goals (lose/gain/maintain weight)
  - Activity level assessment

### 📊 Personalized Metrics
- **BMI Calculator** - Automatic calculation with visual indicator
- **Calorie Calculator** - Based on Mifflin-St Jeor equation
- **TDEE Calculation** - Customized to activity level
- **Macro Breakdown** - Protein, carbs, and fats distribution

### 💪 Workout Planner
- **Age-Appropriate Workouts**
  - Children (< 13): Fun, engaging exercises
  - Teens (13-17): Intermediate difficulty
  - Adults (18-49): Advanced training
  - Seniors (50+): Low-impact, gentle exercises
  
- **Goal-Based Plans**
  - Weight loss: HIIT and cardio focus
  - Weight gain: Strength training
  - Maintenance: Balanced full-body workouts

- **Exercise Categories**
  - Abs, Chest, Arms, Legs, Back, Cardio
  - No equipment needed!

### 🥗 Diet Tracker
- **Daily Calorie Goal** with visual progress ring
- **Meal Planning**
  - Breakfast, Lunch, Snack, Dinner
  - Customized to fitness goals
  - Easy meal logging
  
- **Macro Tracking**
  - Protein, Carbohydrates, Fats
  - Real-time updates

### 📈 Progress Monitoring
- **Statistics Dashboard**
  - Total workouts completed
  - Total exercise minutes
  - Weight change tracking
  - Streak counter
  
- **Weight Progress Chart**
  - Visual weight tracking over time
  - Activity history log

## Design Philosophy

### 🎨 Modern UI/UX
- **Gradient Backgrounds** - Beautiful purple/pink gradients
- **Smooth Animations** - Engaging micro-interactions
- **Card-Based Layout** - Clean, organized interface
- **Responsive Design** - Works on all devices

### 👶 Age-Inclusive Design
The app is designed to be easy to use for all age groups:
- **Children (10+)**: Simple language, fun emojis, encouraging messages
- **Teens**: Motivational content, achievement tracking
- **Adults**: Comprehensive metrics, detailed tracking
- **Seniors**: Large text, clear buttons, gentle encouragement

## Technical Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - No dependencies
- **LocalStorage** - Data persistence

## How to Use

1. **Open `index.html`** in any modern web browser
2. **Complete the onboarding** - Fill in your personal information
3. **View your dashboard** - See your BMI and personalized plan
4. **Start working out** - Choose exercises and track progress
5. **Log your meals** - Track calories and macros
6. **Monitor progress** - View stats and weight trends

## Calculations

### BMI (Body Mass Index)
```
BMI = weight (kg) / (height (m))²
```

### BMR (Basal Metabolic Rate) - Mifflin-St Jeor Equation
**Male:**
```
BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
```

**Female:**
```
BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
```

### TDEE (Total Daily Energy Expenditure)
```
TDEE = BMR × Activity Multiplier
```

Activity Multipliers:
- Sedentary: 1.2
- Lightly Active: 1.375
- Moderately Active: 1.55
- Very Active: 1.725

### Target Calories
- **Weight Loss**: TDEE - 500 calories
- **Weight Gain**: TDEE + 500 calories
- **Maintenance**: TDEE

### Macros Distribution
- **Protein**: 30% of total calories (÷ 4 cal/g)
- **Carbohydrates**: 40% of total calories (÷ 4 cal/g)
- **Fats**: 30% of total calories (÷ 9 cal/g)

## Features Breakdown

### Onboarding Screen
- Beautiful gradient background
- Step-by-step form with validation
- Progress indicator dots
- Smooth transitions between steps

### Main Dashboard
- Personalized greeting based on time of day
- BMI card with visual indicator
- Tab navigation (Workout, Diet, Progress)
- Motivational messages

### Workout Tab
- Today's workout plan card
- Start workout button
- Exercise category grid
- Progress tracking

### Diet Tab
- Calorie ring progress indicator
- Macro breakdown visualization
- Meal plan cards
- Quick meal logging

### Progress Tab
- Statistics cards with icons
- Weight progress chart
- Activity history timeline

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## Data Storage

All user data is stored locally in the browser using `localStorage`. This means:
- ✅ No server required
- ✅ Privacy-focused (data never leaves your device)
- ✅ Works offline
- ⚠️ Clearing browser data will reset the app

## Reset App

To reset all data and start fresh:
1. Open browser console (F12)
2. Type: `resetApp()`
3. Confirm the reset

## Future Enhancements

- [ ] Exercise video demonstrations
- [ ] Custom workout creation
- [ ] Food database integration
- [ ] Export progress reports
- [ ] Social sharing features
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Voice guidance for workouts
- [ ] Integration with fitness trackers

## Inspiration

This app combines the best features from:
- **Home Workout - No Equipment** by Leap Fitness Group (workout interface)
- **Healthifyme Weight Loss Coach** (diet tracking interface)

## License

This project is open source and available for personal use.

## Credits

Created with ❤️ for fitness enthusiasts of all ages!

---

**Remember**: Consistency is key! 💪 Start your fitness journey today!
