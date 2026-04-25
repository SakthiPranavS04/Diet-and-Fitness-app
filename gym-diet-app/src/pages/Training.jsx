import { useState } from 'react';
import { Play, Clock, Flame, TrendingUp } from 'lucide-react';

const Training = ({ userData }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const workoutCategories = [
        {
            id: 'abs',
            name: 'Abs Workout',
            duration: '15 min',
            calories: '120 kcal',
            exercises: 12,
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
        },
        {
            id: 'chest',
            name: 'Chest & Arms',
            duration: '20 min',
            calories: '180 kcal',
            exercises: 15,
            image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
        },
        {
            id: 'legs',
            name: 'Leg Workout',
            duration: '25 min',
            calories: '200 kcal',
            exercises: 14,
            image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=300&fit=crop',
        },
        {
            id: 'fullbody',
            name: 'Full Body',
            duration: '30 min',
            calories: '250 kcal',
            exercises: 18,
            image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
        },
        {
            id: 'cardio',
            name: 'Cardio Blast',
            duration: '20 min',
            calories: '220 kcal',
            exercises: 10,
            image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop',
        },
        {
            id: 'back',
            name: 'Back & Shoulders',
            duration: '18 min',
            calories: '160 kcal',
            exercises: 11,
            image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop',
        },
    ];

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600' };
        if (bmi < 25) return { label: 'Normal', color: 'text-green-600' };
        if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-600' };
        return { label: 'Obese', color: 'text-red-600' };
    };

    const bmiCategory = getBMICategory(userData.bmi);

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">BMI</p>
                            <p className="text-2xl font-bold text-gray-900">{userData.bmi}</p>
                            <p className={`text-xs font-semibold ${bmiCategory.color}`}>
                                {bmiCategory.label}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-primary-600" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Target</p>
                            <p className="text-2xl font-bold text-gray-900">{userData.targetCalories}</p>
                            <p className="text-xs text-gray-500">kcal/day</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <Flame className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Workouts</p>
                            <p className="text-2xl font-bold text-gray-900">{userData.workoutsCompleted}</p>
                            <p className="text-xs text-gray-500">completed</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Streak</p>
                            <p className="text-2xl font-bold text-gray-900">{userData.streak}</p>
                            <p className="text-xs text-gray-500">days</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Clock className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Today's Recommended Workout */}
            <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Workout</h2>
                <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg p-6 text-white">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Full Body Strength</h3>
                            <div className="flex items-center space-x-4 text-sm">
                                <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    30 min
                                </span>
                                <span className="flex items-center">
                                    <Flame className="w-4 h-4 mr-1" />
                                    250 kcal
                                </span>
                            </div>
                        </div>
                        <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Start Now
                        </button>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>0%</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                            <div className="bg-white h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Workout Categories */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Workout Programs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {workoutCategories.map((category) => (
                        <div
                            key={category.id}
                            className="card cursor-pointer hover:scale-105 transition-transform duration-200"
                            onClick={() => setSelectedCategory(category)}
                        >
                            <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white">
                                    <h3 className="font-bold text-lg">{category.name}</h3>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {category.duration}
                                </span>
                                <span className="flex items-center">
                                    <Flame className="w-4 h-4 mr-1" />
                                    {category.calories}
                                </span>
                                <span>{category.exercises} exercises</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Tips */}
            <div className="card bg-blue-50 border-2 border-blue-200">
                <h3 className="font-bold text-gray-900 mb-2">💡 Today's Tip</h3>
                <p className="text-gray-700">
                    Stay hydrated! Drink at least 8 glasses of water throughout the day to support your fitness goals.
                </p>
            </div>
        </div>
    );
};

export default Training;
