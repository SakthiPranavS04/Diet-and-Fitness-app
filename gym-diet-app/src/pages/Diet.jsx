import { useState } from 'react';
import { Utensils, Flame, TrendingDown, TrendingUp, Minus } from 'lucide-react';

const Diet = ({ userData }) => {
    const [selectedMeal, setSelectedMeal] = useState(null);

    // Goal-based meal plans with images
    const mealPlans = {
        lose: {
            title: 'Weight Loss Meal Plan',
            icon: TrendingDown,
            color: 'from-orange-500 to-red-500',
            caloriesPerDay: userData?.targetCalories || 1800,
            meals: [
                {
                    id: 1,
                    name: 'Breakfast',
                    time: '7:00 AM - 9:00 AM',
                    title: 'Oatmeal with Berries',
                    description: 'Steel-cut oats topped with fresh berries, chia seeds, and a drizzle of honey',
                    calories: 350,
                    protein: 12,
                    carbs: 58,
                    fats: 8,
                    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=600&h=400&fit=crop',
                    ingredients: ['1 cup oats', '1/2 cup mixed berries', '1 tbsp chia seeds', '1 tsp honey', '1 cup almond milk'],
                },
                {
                    id: 2,
                    name: 'Mid-Morning Snack',
                    time: '10:30 AM',
                    title: 'Greek Yogurt & Almonds',
                    description: 'Low-fat Greek yogurt with a handful of almonds',
                    calories: 200,
                    protein: 15,
                    carbs: 12,
                    fats: 10,
                    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop',
                    ingredients: ['1 cup Greek yogurt', '10 almonds', '1 tsp honey'],
                },
                {
                    id: 3,
                    name: 'Lunch',
                    time: '12:30 PM - 2:00 PM',
                    title: 'Grilled Chicken Salad',
                    description: 'Mixed greens with grilled chicken breast, cherry tomatoes, cucumber, and balsamic vinaigrette',
                    calories: 400,
                    protein: 35,
                    carbs: 25,
                    fats: 18,
                    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
                    ingredients: ['150g chicken breast', '2 cups mixed greens', '1 cup cherry tomatoes', '1 cucumber', 'Light dressing'],
                },
                {
                    id: 4,
                    name: 'Afternoon Snack',
                    time: '4:00 PM',
                    title: 'Apple with Peanut Butter',
                    description: 'Fresh apple slices with natural peanut butter',
                    calories: 180,
                    protein: 5,
                    carbs: 22,
                    fats: 9,
                    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&h=400&fit=crop',
                    ingredients: ['1 medium apple', '1 tbsp peanut butter'],
                },
                {
                    id: 5,
                    name: 'Dinner',
                    time: '7:00 PM - 8:30 PM',
                    title: 'Baked Salmon with Vegetables',
                    description: 'Herb-crusted salmon with roasted broccoli, bell peppers, and quinoa',
                    calories: 450,
                    protein: 38,
                    carbs: 35,
                    fats: 18,
                    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop',
                    ingredients: ['150g salmon fillet', '1 cup broccoli', '1 bell pepper', '1/2 cup quinoa', 'Herbs & spices'],
                },
            ],
        },
        gain: {
            title: 'Weight Gain Meal Plan',
            icon: TrendingUp,
            color: 'from-green-500 to-emerald-600',
            caloriesPerDay: userData?.targetCalories || 2800,
            meals: [
                {
                    id: 1,
                    name: 'Breakfast',
                    time: '7:00 AM - 9:00 AM',
                    title: 'Protein Pancakes',
                    description: 'Whole wheat pancakes with banana, peanut butter, and maple syrup',
                    calories: 550,
                    protein: 25,
                    carbs: 75,
                    fats: 18,
                    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&h=400&fit=crop',
                    ingredients: ['2 eggs', '1 cup whole wheat flour', '1 banana', '2 tbsp peanut butter', 'Maple syrup'],
                },
                {
                    id: 2,
                    name: 'Mid-Morning Snack',
                    time: '10:30 AM',
                    title: 'Protein Shake',
                    description: 'Whey protein shake with banana, oats, and almond butter',
                    calories: 400,
                    protein: 30,
                    carbs: 45,
                    fats: 12,
                    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&h=400&fit=crop',
                    ingredients: ['1 scoop whey protein', '1 banana', '1/4 cup oats', '1 tbsp almond butter', '1 cup milk'],
                },
                {
                    id: 3,
                    name: 'Lunch',
                    time: '12:30 PM - 2:00 PM',
                    title: 'Chicken Rice Bowl',
                    description: 'Grilled chicken breast with brown rice, avocado, and roasted vegetables',
                    calories: 650,
                    protein: 45,
                    carbs: 70,
                    fats: 22,
                    image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=600&h=400&fit=crop',
                    ingredients: ['200g chicken breast', '1.5 cups brown rice', '1 avocado', 'Mixed vegetables', 'Olive oil'],
                },
                {
                    id: 4,
                    name: 'Afternoon Snack',
                    time: '4:00 PM',
                    title: 'Trail Mix & Dried Fruits',
                    description: 'Mixed nuts, dried fruits, and dark chocolate',
                    calories: 350,
                    protein: 10,
                    carbs: 35,
                    fats: 20,
                    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&h=400&fit=crop',
                    ingredients: ['1/4 cup mixed nuts', '1/4 cup dried fruits', '1 oz dark chocolate'],
                },
                {
                    id: 5,
                    name: 'Dinner',
                    time: '7:00 PM - 8:30 PM',
                    title: 'Steak with Sweet Potato',
                    description: 'Lean beef steak with baked sweet potato and green beans',
                    calories: 700,
                    protein: 50,
                    carbs: 60,
                    fats: 25,
                    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop',
                    ingredients: ['200g lean beef', '1 large sweet potato', '1 cup green beans', 'Butter', 'Spices'],
                },
                {
                    id: 6,
                    name: 'Before Bed',
                    time: '10:00 PM',
                    title: 'Cottage Cheese & Berries',
                    description: 'Low-fat cottage cheese with mixed berries',
                    calories: 250,
                    protein: 20,
                    carbs: 25,
                    fats: 5,
                    image: 'https://images.unsplash.com/photo-1571212515935-f988f9a39d3e?w=600&h=400&fit=crop',
                    ingredients: ['1 cup cottage cheese', '1/2 cup mixed berries'],
                },
            ],
        },
        maintain: {
            title: 'Maintenance Meal Plan',
            icon: Minus,
            color: 'from-blue-500 to-indigo-600',
            caloriesPerDay: userData?.targetCalories || 2200,
            meals: [
                {
                    id: 1,
                    name: 'Breakfast',
                    time: '7:00 AM - 9:00 AM',
                    title: 'Avocado Toast & Eggs',
                    description: 'Whole grain toast with mashed avocado and poached eggs',
                    calories: 450,
                    protein: 18,
                    carbs: 45,
                    fats: 22,
                    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop',
                    ingredients: ['2 slices whole grain bread', '1 avocado', '2 eggs', 'Cherry tomatoes', 'Spices'],
                },
                {
                    id: 2,
                    name: 'Mid-Morning Snack',
                    time: '10:30 AM',
                    title: 'Fresh Fruit Smoothie',
                    description: 'Blended smoothie with mixed berries, banana, and yogurt',
                    calories: 250,
                    protein: 8,
                    carbs: 45,
                    fats: 5,
                    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&h=400&fit=crop',
                    ingredients: ['1 cup mixed berries', '1 banana', '1/2 cup yogurt', '1/2 cup almond milk'],
                },
                {
                    id: 3,
                    name: 'Lunch',
                    time: '12:30 PM - 2:00 PM',
                    title: 'Turkey Wrap',
                    description: 'Whole wheat wrap with turkey, hummus, and fresh vegetables',
                    calories: 500,
                    protein: 30,
                    carbs: 55,
                    fats: 18,
                    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop',
                    ingredients: ['Whole wheat wrap', '150g turkey breast', '2 tbsp hummus', 'Lettuce, tomato, cucumber'],
                },
                {
                    id: 4,
                    name: 'Afternoon Snack',
                    time: '4:00 PM',
                    title: 'Veggie Sticks & Hummus',
                    description: 'Fresh carrot and celery sticks with homemade hummus',
                    calories: 200,
                    protein: 6,
                    carbs: 20,
                    fats: 10,
                    image: 'https://images.unsplash.com/photo-1623428187425-5d9e2e4a5b0c?w=600&h=400&fit=crop',
                    ingredients: ['1 cup carrot sticks', '1 cup celery sticks', '1/4 cup hummus'],
                },
                {
                    id: 5,
                    name: 'Dinner',
                    time: '7:00 PM - 8:30 PM',
                    title: 'Grilled Fish Tacos',
                    description: 'Grilled white fish tacos with cabbage slaw and avocado',
                    calories: 550,
                    protein: 35,
                    carbs: 50,
                    fats: 20,
                    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=400&fit=crop',
                    ingredients: ['150g white fish', '2 corn tortillas', '1 cup cabbage', '1/2 avocado', 'Lime & cilantro'],
                },
            ],
        },
    };

    const currentPlan = mealPlans[userData?.goal || 'maintain'];
    const Icon = currentPlan.icon;

    const totalCalories = currentPlan.meals.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = currentPlan.meals.reduce((sum, meal) => sum + meal.protein, 0);
    const totalCarbs = currentPlan.meals.reduce((sum, meal) => sum + meal.carbs, 0);
    const totalFats = currentPlan.meals.reduce((sum, meal) => sum + meal.fats, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className={`bg-gradient-to-r ${currentPlan.color} text-white rounded-xl p-6`}>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <Icon className="w-8 h-8" />
                            <h1 className="text-3xl font-bold">{currentPlan.title}</h1>
                        </div>
                        <p className="text-white/90">Personalized for your {userData?.goal} weight goal</p>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-bold">{totalCalories}</div>
                        <div className="text-sm text-white/90">Total kcal/day</div>
                    </div>
                </div>
            </div>

            {/* Daily Summary */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-sm text-gray-600 mb-1">Protein</div>
                    <div className="text-2xl font-bold text-pink-600">{totalProtein}g</div>
                    <div className="text-xs text-gray-500">30% of calories</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-sm text-gray-600 mb-1">Carbs</div>
                    <div className="text-2xl font-bold text-blue-600">{totalCarbs}g</div>
                    <div className="text-xs text-gray-500">45% of calories</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-sm text-gray-600 mb-1">Fats</div>
                    <div className="text-2xl font-bold text-yellow-600">{totalFats}g</div>
                    <div className="text-xs text-gray-500">25% of calories</div>
                </div>
            </div>

            {/* Meal Cards */}
            <div className="space-y-4">
                {currentPlan.meals.map((meal) => (
                    <div
                        key={meal.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => setSelectedMeal(meal)}
                    >
                        <div className="md:flex">
                            {/* Image */}
                            <div className="md:w-1/3">
                                <img
                                    src={meal.image}
                                    alt={meal.title}
                                    className="w-full h-48 md:h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 md:w-2/3">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="text-sm font-semibold text-primary-600 mb-1">{meal.name}</div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{meal.title}</h3>
                                        <p className="text-sm text-gray-600">{meal.time}</p>
                                    </div>
                                    <div className="flex items-center space-x-1 bg-orange-100 px-3 py-1 rounded-full">
                                        <Flame className="w-4 h-4 text-orange-600" />
                                        <span className="font-semibold text-orange-600">{meal.calories}</span>
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-4">{meal.description}</p>

                                {/* Macros */}
                                <div className="flex space-x-4">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">Protein: {meal.protein}g</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">Carbs: {meal.carbs}g</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">Fats: {meal.fats}g</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Meal Detail Modal */}
            {selectedMeal && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedMeal(null)}
                >
                    <div
                        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedMeal.image}
                            alt={selectedMeal.title}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-sm font-semibold text-primary-600 mb-1">{selectedMeal.name}</div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedMeal.title}</h2>
                                    <p className="text-gray-600">{selectedMeal.time}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedMeal(null)}
                                    className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                                >
                                    ×
                                </button>
                            </div>

                            <p className="text-gray-700 mb-6">{selectedMeal.description}</p>

                            {/* Nutrition Info */}
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <div className="text-center p-4 bg-orange-50 rounded-lg">
                                    <div className="text-2xl font-bold text-orange-600">{selectedMeal.calories}</div>
                                    <div className="text-xs text-gray-600">Calories</div>
                                </div>
                                <div className="text-center p-4 bg-pink-50 rounded-lg">
                                    <div className="text-2xl font-bold text-pink-600">{selectedMeal.protein}g</div>
                                    <div className="text-xs text-gray-600">Protein</div>
                                </div>
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">{selectedMeal.carbs}g</div>
                                    <div className="text-xs text-gray-600">Carbs</div>
                                </div>
                                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                    <div className="text-2xl font-bold text-yellow-600">{selectedMeal.fats}g</div>
                                    <div className="text-xs text-gray-600">Fats</div>
                                </div>
                            </div>

                            {/* Ingredients */}
                            <div>
                                <h3 className="font-bold text-gray-900 mb-3">Ingredients</h3>
                                <ul className="space-y-2">
                                    {selectedMeal.ingredients.map((ingredient, index) => (
                                        <li key={index} className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                                            <span className="text-gray-700">{ingredient}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                                onClick={() => setSelectedMeal(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tips */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                    <Utensils className="w-5 h-5 mr-2 text-primary-600" />
                    Nutrition Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Drink at least 8 glasses of water throughout the day</li>
                    <li>• Meal prep on Sundays to stay on track during the week</li>
                    <li>• Listen to your body - eat when hungry, stop when satisfied</li>
                    <li>• {userData?.goal === 'lose' && 'Focus on high-protein, low-calorie foods to stay full'}
                        {userData?.goal === 'gain' && 'Eat every 2-3 hours and include calorie-dense foods'}
                        {userData?.goal === 'maintain' && 'Balance your meals with variety and moderation'}</li>
                </ul>
            </div>
        </div>
    );
};

export default Diet;
