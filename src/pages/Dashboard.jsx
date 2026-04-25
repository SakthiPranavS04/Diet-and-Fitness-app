// Dashboard Page Component
import { useState, useEffect } from 'react';
import { userService, workoutService, dietService } from '../services/api';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Get last 7 days data
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const [profileRes, workoutsRes, mealsRes] = await Promise.all([
        userService.getProfile(),
        workoutService.getWorkouts({
          startDate: sevenDaysAgo.toISOString(),
          endDate: now.toISOString(),
        }),
        dietService.getMeals({
          startDate: sevenDaysAgo.toISOString(),
          endDate: now.toISOString(),
        }),
      ]);

      setProfile(profileRes.data.user);
      setWorkouts(workoutsRes.data.data.workouts);
      setMeals(mealsRes.data.data.meals);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  const totalCaloriesBurned = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
  const totalCaloriesConsumed = meals.reduce((sum, m) => sum + m.calories, 0);
  const netCalories = totalCaloriesConsumed - totalCaloriesBurned;

  // Prepare data for charts
  const calorieData = [
    { name: 'Consumed', value: totalCaloriesConsumed, fill: '#EF4444' },
    { name: 'Burned', value: totalCaloriesBurned, fill: '#10B981' },
  ];

  const workoutChartData = workouts.map((w) => ({
    name: new Date(w.date).toLocaleDateString(),
    calories: w.caloriesBurned,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome, {profile?.name}! 👋
          </h1>
          <p className="text-gray-600">Here's your fitness progress overview</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* BMI Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">BMI</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{profile?.bmi || 'N/A'}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Height: {profile?.height} cm | Weight: {profile?.weight} kg
                </p>
              </div>
              <div className="text-5xl">📏</div>
            </div>
          </div>

          {/* Calories Burned Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Calories Burned</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{totalCaloriesBurned}</p>
                <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
              </div>
              <div className="text-5xl">🔥</div>
            </div>
          </div>

          {/* Calories Consumed Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Calories Consumed</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{totalCaloriesConsumed}</p>
                <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
              </div>
              <div className="text-5xl">🍽️</div>
            </div>
          </div>

          {/* Workouts Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Workouts</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{workouts.length}</p>
                <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
              </div>
              <div className="text-5xl">💪</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart - Calories */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Calorie Balance</h2>
            {totalCaloriesBurned > 0 || totalCaloriesConsumed > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={calorieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {calorieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                No data available yet
              </div>
            )}
          </div>

          {/* Bar Chart - Workouts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Workout Calories Burned</h2>
            {workoutChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workoutChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calories" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                No workout data available yet
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Workouts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Workouts</h2>
            {workouts.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {workouts.slice(0, 5).map((workout) => (
                  <div
                    key={workout._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{workout.exerciseName}</p>
                      <p className="text-sm text-gray-600">
                        {workout.duration} mins • {new Date(workout.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{workout.caloriesBurned} cal</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No workouts yet. Start tracking your fitness!
              </div>
            )}
          </div>

          {/* Recent Meals */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Meals</h2>
            {meals.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {meals.slice(0, 5).map((meal) => (
                  <div
                    key={meal._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{meal.mealName}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(meal.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">{meal.calories} cal</p>
                      <p className="text-xs text-gray-500">
                        P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No meals logged yet. Start tracking your diet!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
