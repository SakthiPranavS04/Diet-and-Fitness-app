import { useState, useEffect } from 'react';
import { Calendar, Flame, Clock, TrendingUp, Award } from 'lucide-react';

const Report = ({ userData }) => {
    const [timeRange, setTimeRange] = useState('week');

    // Calculate calories burnt based on workouts
    const calculateCaloriesBurnt = () => {
        // Average 200 calories per 20-minute workout
        return userData.totalMinutes * 10;
    };

    const caloriesBurnt = calculateCaloriesBurnt();

    // Mock data for chart - in real app, this would come from workout history
    const weeklyData = [
        { day: 'Mon', minutes: 20, calories: 200 },
        { day: 'Tue', minutes: 0, calories: 0 },
        { day: 'Wed', minutes: 30, calories: 300 },
        { day: 'Thu', minutes: 25, calories: 250 },
        { day: 'Fri', minutes: 0, calories: 0 },
        { day: 'Sat', minutes: 40, calories: 400 },
        { day: 'Sun', minutes: 20, calories: 200 },
    ];

    const monthlyStats = {
        totalWorkouts: userData.workoutsCompleted,
        totalMinutes: userData.totalMinutes,
        totalCalories: caloriesBurnt,
        avgDuration: userData.workoutsCompleted > 0 ? Math.round(userData.totalMinutes / userData.workoutsCompleted) : 0,
    };

    const achievements = [
        {
            id: 1,
            title: 'First Workout',
            description: 'Complete your first workout',
            icon: '🎯',
            unlocked: userData.workoutsCompleted >= 1,
        },
        {
            id: 2,
            title: '7-Day Streak',
            description: 'Maintain a 7-day workout streak',
            icon: '🔥',
            unlocked: userData.streak >= 7,
        },
        {
            id: 3,
            title: '10 Workouts',
            description: 'Complete 10 workouts',
            icon: '💪',
            unlocked: userData.workoutsCompleted >= 10,
        },
        {
            id: 4,
            title: '1000 Calories',
            description: 'Burn 1000 calories total',
            icon: '⚡',
            unlocked: caloriesBurnt >= 1000,
        },
    ];

    const maxMinutes = Math.max(...weeklyData.map(d => d.minutes), 1);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Report</h1>
                <p className="text-gray-600">Track your fitness journey</p>
            </div>

            {/* Time Range Selector */}
            <div className="flex space-x-2">
                {['week', 'month', 'year'].map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${timeRange === range
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <Calendar className="w-8 h-8" />
                    </div>
                    <p className="text-3xl font-bold mb-1">{monthlyStats.totalWorkouts}</p>
                    <p className="text-sm opacity-90">Total Workouts</p>
                </div>

                <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <Flame className="w-8 h-8" />
                    </div>
                    <p className="text-3xl font-bold mb-1">{monthlyStats.totalCalories}</p>
                    <p className="text-sm opacity-90">Calories Burnt</p>
                </div>

                <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <Clock className="w-8 h-8" />
                    </div>
                    <p className="text-3xl font-bold mb-1">{monthlyStats.totalMinutes}</p>
                    <p className="text-sm opacity-90">Total Minutes</p>
                </div>

                <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <p className="text-3xl font-bold mb-1">{userData.streak}</p>
                    <p className="text-sm opacity-90">Day Streak</p>
                </div>
            </div>

            {/* Weekly Activity Chart */}
            <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Activity</h2>
                <div className="space-y-4">
                    {weeklyData.map((day, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <div className="w-12 text-sm font-semibold text-gray-600">{day.day}</div>
                            <div className="flex-1">
                                <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-full flex items-center px-3 text-white text-sm font-semibold transition-all duration-500"
                                        style={{ width: `${(day.minutes / maxMinutes) * 100}%` }}
                                    >
                                        {day.minutes > 0 && `${day.minutes} min`}
                                    </div>
                                </div>
                            </div>
                            <div className="w-24 text-right text-sm text-gray-600">
                                {day.calories} kcal
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Average Stats */}
            <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Average Performance</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary-600">{monthlyStats.avgDuration}</p>
                        <p className="text-sm text-gray-600">Avg Duration (min)</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary-600">
                            {monthlyStats.totalWorkouts > 0 ? Math.round(monthlyStats.totalCalories / monthlyStats.totalWorkouts) : 0}
                        </p>
                        <p className="text-sm text-gray-600">Avg Calories/Workout</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary-600">
                            {Math.round((userData.streak / 30) * 100)}%
                        </p>
                        <p className="text-sm text-gray-600">Monthly Consistency</p>
                    </div>
                </div>
            </div>

            {/* Achievements */}
            <div className="card">
                <div className="flex items-center space-x-2 mb-6">
                    <Award className="w-6 h-6 text-primary-600" />
                    <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`p-4 rounded-lg border-2 text-center transition-all ${achievement.unlocked
                                    ? 'border-primary-500 bg-primary-50'
                                    : 'border-gray-300 bg-gray-50 opacity-50'
                                }`}
                        >
                            <div className="text-4xl mb-2">{achievement.icon}</div>
                            <h3 className="font-bold text-sm text-gray-900 mb-1">{achievement.title}</h3>
                            <p className="text-xs text-gray-600">{achievement.description}</p>
                            {achievement.unlocked && (
                                <div className="mt-2 text-xs font-semibold text-primary-600">Unlocked!</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* BMI Tracking */}
            <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Body Metrics</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Current BMI</p>
                        <p className="text-3xl font-bold text-gray-900">{userData.bmi}</p>
                        <p className="text-sm text-primary-600 font-semibold">
                            {userData.bmi < 18.5 ? 'Underweight' : userData.bmi < 25 ? 'Normal' : userData.bmi < 30 ? 'Overweight' : 'Obese'}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Target Calories</p>
                        <p className="text-3xl font-bold text-gray-900">{userData.targetCalories}</p>
                        <p className="text-sm text-gray-600">kcal/day</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
