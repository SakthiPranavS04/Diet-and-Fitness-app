// ===== USER DATA =====
let userData = {
    name: '',
    age: 0,
    gender: '',
    height: 0,
    weight: 0,
    goal: '',
    activity: '',
    bmi: 0,
    bmr: 0,
    tdee: 0,
    targetCalories: 0,
    workoutsCompleted: 0,
    totalMinutes: 0,
    weightChange: 0,
    streak: 0,
    caloriesConsumed: 0,
    protein: 0,
    carbs: 0,
    fats: 0
};

// ===== ONBOARDING FLOW =====
let currentStep = 1;

function nextStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    
    // Validate current step
    const inputs = currentStepElement.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.type === 'radio') {
            const radioGroup = currentStepElement.querySelectorAll(`input[name="${input.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
            }
        } else if (!input.value) {
            isValid = false;
            input.style.borderColor = 'var(--danger-color)';
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Hide current step
    currentStepElement.classList.remove('active');
    
    // Update progress
    document.querySelector(`.progress-dot[data-step="${currentStep}"]`).classList.remove('active');
    
    // Move to next step
    currentStep++;
    
    // Show next step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.progress-dot[data-step="${currentStep}"]`).classList.add('active');
}

function prevStep() {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.progress-dot[data-step="${currentStep}"]`).classList.remove('active');
    
    // Move to previous step
    currentStep--;
    
    // Show previous step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.progress-dot[data-step="${currentStep}"]`).classList.add('active');
}

// ===== FORM SUBMISSION =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('onboarding-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect user data
        userData.name = document.getElementById('name').value;
        userData.age = parseInt(document.getElementById('age').value);
        userData.gender = document.querySelector('input[name="gender"]:checked').value;
        userData.height = parseFloat(document.getElementById('height').value);
        userData.weight = parseFloat(document.getElementById('weight').value);
        userData.goal = document.querySelector('input[name="goal"]:checked').value;
        userData.activity = document.querySelector('input[name="activity"]:checked').value;
        
        // Calculate BMI and calories
        calculateMetrics();
        
        // Save to localStorage
        saveUserData();
        
        // Show main screen
        showMainScreen();
    });
    
    // Check if user data exists
    loadUserData();
});

// ===== CALCULATIONS =====
function calculateMetrics() {
    // Calculate BMI
    const heightInMeters = userData.height / 100;
    userData.bmi = (userData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    
    // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
    if (userData.gender === 'male') {
        userData.bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) + 5;
    } else {
        userData.bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) - 161;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        very: 1.725
    };
    
    userData.tdee = userData.bmr * activityMultipliers[userData.activity];
    
    // Calculate target calories based on goal
    if (userData.goal === 'lose') {
        userData.targetCalories = Math.round(userData.tdee - 500); // 500 calorie deficit
    } else if (userData.goal === 'gain') {
        userData.targetCalories = Math.round(userData.tdee + 500); // 500 calorie surplus
    } else {
        userData.targetCalories = Math.round(userData.tdee);
    }
    
    // Calculate macros (40% carbs, 30% protein, 30% fat)
    const proteinCalories = userData.targetCalories * 0.30;
    const carbsCalories = userData.targetCalories * 0.40;
    const fatsCalories = userData.targetCalories * 0.30;
    
    userData.targetProtein = Math.round(proteinCalories / 4); // 4 calories per gram
    userData.targetCarbs = Math.round(carbsCalories / 4);
    userData.targetFats = Math.round(fatsCalories / 9); // 9 calories per gram
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

function getBMIIndicatorPosition(bmi) {
    // Map BMI to percentage (15-40 BMI range)
    if (bmi < 15) return 0;
    if (bmi > 40) return 100;
    return ((bmi - 15) / 25) * 100;
}

// ===== SCREEN MANAGEMENT =====
function showMainScreen() {
    document.getElementById('onboarding-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');
    
    // Update UI with user data
    updateUI();
}

function updateUI() {
    // Update greeting
    const hour = new Date().getHours();
    let greeting = 'Good Morning';
    if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
    if (hour >= 17) greeting = 'Good Evening';
    
    document.getElementById('greeting-text').textContent = `${greeting}, ${userData.name}!`;
    
    // Update avatar
    document.getElementById('user-avatar').textContent = userData.name.charAt(0).toUpperCase();
    
    // Update BMI
    document.getElementById('bmi-value').textContent = userData.bmi;
    document.getElementById('bmi-category').textContent = getBMICategory(parseFloat(userData.bmi));
    
    const indicatorPosition = getBMIIndicatorPosition(parseFloat(userData.bmi));
    document.getElementById('bmi-indicator').style.left = `calc(${indicatorPosition}% - 14px)`;
    
    // Update calories
    document.getElementById('calories-total').textContent = userData.targetCalories;
    updateCalorieProgress();
    
    // Update workout plan based on age and goal
    updateWorkoutPlan();
    
    // Update meal plan
    updateMealPlan();
    
    // Update progress stats
    updateProgressStats();
    
    // Update motivational text based on age
    updateMotivationalText();
}

function updateMotivationalText() {
    const motivationalTexts = {
        child: [
            "Let's have fun and get stronger! 🎮",
            "You're doing amazing! Keep it up! 🌟",
            "Exercise is fun! Let's play! 🎯"
        ],
        teen: [
            "Let's crush your goals today! 💪",
            "You're stronger than you think! 🔥",
            "Every workout counts! Let's go! 🚀"
        ],
        adult: [
            "Consistency is key! You've got this! 💪",
            "Your health is your wealth! 🌟",
            "One day at a time, one rep at a time! 🔥"
        ],
        senior: [
            "Stay active, stay healthy! 🌟",
            "Age is just a number! Keep moving! 💪",
            "Your dedication is inspiring! 🎯"
        ]
    };
    
    let ageGroup = 'adult';
    if (userData.age < 13) ageGroup = 'child';
    else if (userData.age < 18) ageGroup = 'teen';
    else if (userData.age >= 50) ageGroup = 'senior';
    
    const texts = motivationalTexts[ageGroup];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    document.getElementById('motivational-text').textContent = randomText;
}

function updateWorkoutPlan() {
    const workoutPlans = {
        child: {
            lose: { title: 'Fun Active Games', details: '8 exercises • 15 mins • Beginner', exercises: 8 },
            gain: { title: 'Strength Building Fun', details: '10 exercises • 20 mins • Beginner', exercises: 10 },
            maintain: { title: 'Daily Activity Mix', details: '7 exercises • 15 mins • Beginner', exercises: 7 }
        },
        teen: {
            lose: { title: 'Fat Burn Workout', details: '12 exercises • 25 mins • Intermediate', exercises: 12 },
            gain: { title: 'Muscle Building', details: '15 exercises • 30 mins • Intermediate', exercises: 15 },
            maintain: { title: 'Full Body Fitness', details: '10 exercises • 20 mins • Intermediate', exercises: 10 }
        },
        adult: {
            lose: { title: 'HIIT Fat Burner', details: '10 exercises • 30 mins • Advanced', exercises: 10 },
            gain: { title: 'Strength Training', details: '12 exercises • 35 mins • Advanced', exercises: 12 },
            maintain: { title: 'Full Body Workout', details: '8 exercises • 25 mins • Intermediate', exercises: 8 }
        },
        senior: {
            lose: { title: 'Low Impact Cardio', details: '8 exercises • 20 mins • Beginner', exercises: 8 },
            gain: { title: 'Gentle Strength', details: '10 exercises • 25 mins • Beginner', exercises: 10 },
            maintain: { title: 'Mobility & Balance', details: '7 exercises • 20 mins • Beginner', exercises: 7 }
        }
    };
    
    let ageGroup = 'adult';
    if (userData.age < 13) ageGroup = 'child';
    else if (userData.age < 18) ageGroup = 'teen';
    else if (userData.age >= 50) ageGroup = 'senior';
    
    const plan = workoutPlans[ageGroup][userData.goal];
    document.getElementById('workout-plan-title').textContent = plan.title;
    document.getElementById('workout-plan-details').textContent = plan.details;
}

function updateMealPlan() {
    const mealPlans = {
        lose: {
            breakfast: 'Oatmeal with berries & almonds',
            lunch: 'Grilled chicken salad',
            snack: 'Apple with peanut butter',
            dinner: 'Baked fish with vegetables'
        },
        gain: {
            breakfast: 'Scrambled eggs with whole wheat toast',
            lunch: 'Chicken breast with rice & vegetables',
            snack: 'Protein shake with banana',
            dinner: 'Lean beef with sweet potato'
        },
        maintain: {
            breakfast: 'Greek yogurt with granola',
            lunch: 'Turkey sandwich with vegetables',
            snack: 'Mixed nuts & fruit',
            dinner: 'Grilled salmon with quinoa'
        }
    };
    
    const plan = mealPlans[userData.goal];
    document.getElementById('breakfast-meal').textContent = plan.breakfast;
    document.getElementById('lunch-meal').textContent = plan.lunch;
    document.getElementById('snack-meal').textContent = plan.snack;
    document.getElementById('dinner-meal').textContent = plan.dinner;
}

function updateCalorieProgress() {
    const percentage = (userData.caloriesConsumed / userData.targetCalories) * 100;
    const circumference = 2 * Math.PI * 80; // radius is 80
    const offset = circumference - (percentage / 100) * circumference;
    
    document.getElementById('calorie-progress-ring').style.strokeDashoffset = offset;
    document.getElementById('calories-consumed').textContent = userData.caloriesConsumed;
    document.getElementById('protein-value').textContent = `${userData.protein}g`;
    document.getElementById('carbs-value').textContent = `${userData.carbs}g`;
    document.getElementById('fats-value').textContent = `${userData.fats}g`;
}

function updateProgressStats() {
    document.getElementById('total-workouts').textContent = userData.workoutsCompleted;
    document.getElementById('total-minutes').textContent = userData.totalMinutes;
    document.getElementById('weight-change').textContent = Math.abs(userData.weightChange).toFixed(1);
    document.getElementById('streak-days').textContent = userData.streak;
}

// ===== TAB SWITCHING =====
function switchTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// ===== WORKOUT FUNCTIONS =====
function startWorkout() {
    showNotification('Starting workout! Get ready! 💪', 'success');
    
    // Simulate workout completion
    setTimeout(() => {
        userData.workoutsCompleted++;
        userData.totalMinutes += 20;
        userData.streak++;
        
        // Update progress
        const currentProgress = parseInt(document.getElementById('workout-progress').style.width) || 0;
        const newProgress = Math.min(currentProgress + 14, 100); // ~7 exercises
        document.getElementById('workout-progress').style.width = `${newProgress}%`;
        document.getElementById('workout-progress-text').textContent = `${newProgress}% Complete`;
        
        updateProgressStats();
        saveUserData();
        
        showNotification('Great job! Workout completed! 🎉', 'success');
    }, 2000);
}

function viewAllWorkouts() {
    showNotification('Opening workout library...', 'info');
}

function selectCategory(category) {
    showNotification(`Opening ${category} exercises...`, 'info');
}

// ===== DIET FUNCTIONS =====
function logMeal(mealType) {
    const mealCalories = {
        breakfast: 350,
        lunch: 450,
        snack: 200,
        dinner: 500
    };
    
    const mealMacros = {
        breakfast: { protein: 15, carbs: 50, fats: 12 },
        lunch: { protein: 35, carbs: 40, fats: 15 },
        snack: { protein: 10, carbs: 25, fats: 8 },
        dinner: { protein: 40, carbs: 45, fats: 18 }
    };
    
    userData.caloriesConsumed += mealCalories[mealType];
    userData.protein += mealMacros[mealType].protein;
    userData.carbs += mealMacros[mealType].carbs;
    userData.fats += mealMacros[mealType].fats;
    
    updateCalorieProgress();
    saveUserData();
    
    showNotification(`${mealType.charAt(0).toUpperCase() + mealType.slice(1)} logged! 🍽️`, 'success');
}

function customizeMealPlan() {
    showNotification('Opening meal customization...', 'info');
}

// ===== PROFILE FUNCTIONS =====
function showProfile() {
    const profileInfo = `
Name: ${userData.name}
Age: ${userData.age}
Height: ${userData.height} cm
Weight: ${userData.weight} kg
BMI: ${userData.bmi}
Goal: ${userData.goal.charAt(0).toUpperCase() + userData.goal.slice(1)} Weight
Activity: ${userData.activity.charAt(0).toUpperCase() + userData.activity.slice(1)}
Daily Calories: ${userData.targetCalories} kcal
    `;
    
    alert(profileInfo);
}

function showBMIInfo() {
    const info = `
BMI Categories:
• Underweight: < 18.5
• Normal: 18.5 - 24.9
• Overweight: 25 - 29.9
• Obese: ≥ 30

Your BMI: ${userData.bmi} (${getBMICategory(parseFloat(userData.bmi))})
    `;
    
    alert(info);
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--primary-color)'};
        color: white;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== LOCAL STORAGE =====
function saveUserData() {
    localStorage.setItem('fitLifeUserData', JSON.stringify(userData));
}

function loadUserData() {
    const savedData = localStorage.getItem('fitLifeUserData');
    
    if (savedData) {
        userData = JSON.parse(savedData);
        showMainScreen();
    }
}

// ===== WEIGHT CHART =====
function initializeWeightChart() {
    const canvas = document.getElementById('weight-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 200;
    
    // Sample data
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const weights = [userData.weight, userData.weight - 0.5, userData.weight - 1, userData.weight - 1.5];
    
    // Draw chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 4; i++) {
        const y = (canvas.height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Draw line
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const pointSpacing = canvas.width / (weights.length - 1);
    
    weights.forEach((weight, index) => {
        const x = index * pointSpacing;
        const y = canvas.height - ((weight - (userData.weight - 2)) / 2) * canvas.height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Draw point
        ctx.fillStyle = '#667eea';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
    
    ctx.stroke();
}

// Initialize chart when progress tab is opened
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (document.getElementById('main-screen').classList.contains('active')) {
            initializeWeightChart();
        }
    }, 500);
});

// ===== RESET APP (for testing) =====
function resetApp() {
    if (confirm('Are you sure you want to reset all data?')) {
        localStorage.removeItem('fitLifeUserData');
        location.reload();
    }
}

// Add reset button to console
console.log('%cFitLife App', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cTo reset the app, type: resetApp()', 'color: #764ba2; font-size: 14px;');
