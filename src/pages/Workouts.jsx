// Workouts Page Component
import { useState, useEffect } from 'react';
import { workoutService } from '../services/api';
import toast from 'react-hot-toast';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    exerciseName: '',
    duration: '',
    caloriesBurned: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      setLoading(true);
      const response = await workoutService.getWorkouts();
      setWorkouts(response.data.data.workouts);
    } catch (error) {
      toast.error('Failed to load workouts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.exerciseName || !formData.duration || !formData.caloriesBurned) {
        toast.error('Please fill in all fields');
        return;
      }

      await workoutService.addWorkout({
        ...formData,
        duration: parseInt(formData.duration),
        caloriesBurned: parseInt(formData.caloriesBurned),
      });

      toast.success('Workout added successfully!');
      setFormData({
        exerciseName: '',
        duration: '',
        caloriesBurned: '',
        date: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
      loadWorkouts();
    } catch (error) {
      toast.error('Failed to add workout');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await workoutService.deleteWorkout(id);
        toast.success('Workout deleted successfully!');
        loadWorkouts();
      } catch (error) {
        toast.error('Failed to delete workout');
        console.error(error);
      }
    }
  };

  const totalCalories = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Workout Tracker 💪</h1>
            <p className="text-gray-600 mt-2">Track your exercises and calories burned</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            {showForm ? 'Cancel' : '+ Add Workout'}
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Workouts</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{workouts.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Calories Burned</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{totalCalories}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Minutes</p>
            <p className="text-4xl font-bold text-purple-600 mt-2">{totalMinutes}</p>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Workout</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exercise Name
                </label>
                <input
                  type="text"
                  name="exerciseName"
                  value={formData.exerciseName}
                  onChange={handleChange}
                  placeholder="e.g., Running, Weight Lifting"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="30"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calories Burned
                </label>
                <input
                  type="number"
                  name="caloriesBurned"
                  value={formData.caloriesBurned}
                  onChange={handleChange}
                  placeholder="250"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="col-span-1 md:col-span-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Add Workout
              </button>
            </form>
          </div>
        )}

        {/* Workouts List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : workouts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Exercise
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Calories
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => (
                    <tr key={workout._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {workout.exerciseName}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{workout.duration} mins</td>
                      <td className="px-6 py-4 font-semibold text-green-600">
                        {workout.caloriesBurned} cal
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(workout.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(workout._id)}
                          className="text-red-600 hover:text-red-800 font-semibold transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No workouts yet. Start tracking your fitness journey!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
