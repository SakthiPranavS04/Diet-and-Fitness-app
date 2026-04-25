# FitLife Pro - React Fitness & Diet Planner

A modern, professional fitness and diet planning application built with React, Vite, and TailwindCSS.

## Features

### 🎯 Smart Onboarding
- 4-step user profile setup
- Automatic BMI, BMR, and TDEE calculations
- Personalized calorie targets based on goals

### 🏋️ Training (Home Page)
- Dashboard with key metrics (BMI, Target Calories, Workouts, Streak)
- Today's recommended workout
- Workout categories with images
- Quick stats overview

### 🔍 Discover
- Warm-up routines with video demonstrations
- New exercise library
- Search functionality
- YouTube video integration for exercise demos
- Difficulty levels (Beginner, Intermediate, Advanced)

### 📊 Report
- Total workout duration tracking
- Approximate calories burnt calculation
- Streak maintenance tracking
- Weekly activity chart
- Average performance metrics
- Achievement system
- BMI and body metrics tracking

### ⚙️ Settings
- User profile display
- Fitness information (BMR, TDEE, Target Calories)
- App settings (Notifications, Privacy, Help)
- Progress summary
- Logout functionality

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **LocalStorage** - Data persistence

## Design

- **Theme**: Clean blue and white color scheme
- **No unnecessary emojis**: Professional icon-based UI
- **Images**: Real workout images from Unsplash
- **Videos**: YouTube integration for exercise demonstrations
- **Responsive**: Works on desktop, tablet, and mobile

## Installation

```bash
# Navigate to project directory
cd gym-diet-app

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

1. **First Time**: Complete the 4-step onboarding process
2. **Training**: View your dashboard and start workouts
3. **Discover**: Explore warm-ups and new exercises with video demos
4. **Report**: Track your progress, calories burnt, and streaks
5. **Settings**: View your profile and manage app settings

## Data Storage

All user data is stored in browser's localStorage:
- User profile information
- BMI, BMR, TDEE calculations
- Workout statistics
- Streak tracking

## Calculations

### BMI (Body Mass Index)
```
BMI = weight (kg) / (height (m))²
```

### BMR (Basal Metabolic Rate) - Mifflin-St Jeor Equation
**Male:**
```
BMR = (10 × weight) + (6.25 × height) - (5 × age) + 5
```

**Female:**
```
BMR = (10 × weight) + (6.25 × height) - (5 × age) - 161
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

### Calories Burnt
```
Calories = Total Minutes × 10
```
(Approximate: 200 calories per 20-minute workout)

## Project Structure

```
src/
├── components/
│   └── Layout.jsx          # Main layout with navigation
├── pages/
│   ├── Onboarding.jsx      # 4-step user setup
│   ├── Training.jsx        # Home page with workouts
│   ├── Discover.jsx        # Exercise library with videos
│   ├── Report.jsx          # Progress tracking
│   └── Settings.jsx        # User settings
├── App.jsx                 # Main app component
├── main.jsx                # Entry point
└── index.css               # Tailwind styles
```

## Navigation

- **Training** (Home): Dashboard and workout categories
- **Discover**: Warm-ups and new exercises
- **Report**: Statistics and progress tracking
- **Settings**: Profile and app configuration

## Key Differences from Previous Version

✅ React + Vite instead of vanilla HTML/CSS/JS
✅ TailwindCSS for styling
✅ Blue-white theme (no purple gradients)
✅ Minimal emoji usage (professional icons)
✅ Real images for workouts
✅ YouTube video integration for exercises
✅ Proper navigation structure
✅ User data hidden after onboarding
✅ Calories burnt calculation
✅ Streak tracking
✅ Achievement system

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Future Enhancements

- [ ] Custom workout creation
- [ ] Meal planning integration
- [ ] Social sharing
- [ ] Export progress reports
- [ ] Dark mode
- [ ] Offline support with service workers
- [ ] Push notifications
- [ ] Integration with fitness trackers

## License

MIT License - Feel free to use for personal projects

---

**Made with ❤️ for your fitness journey!**
