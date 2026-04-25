// Diet Page Component
import { useState, useEffect } from 'react';
import { dietService } from '../services/api';
import toast from 'react-hot-toast';

export default function Diet() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    mealName: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      setLoading(true);
      const response = await dietService.getMeals();
      setMeals(response.data.data.meals);
    } catch (error) {
      toast.error('Failed to load meals');
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
      if (!formData.mealName || !formData.calories) {
        toast.error('Please fill in required fields');
        return;
      }

      await dietService.addMeal({
        mealName: formData.mealName,
        calories: parseInt(formData.calories),
        protein: parseInt(formData.protein) || 0,
        carbs: parseInt(formData.carbs) || 0,
        fats: parseInt(formData.fats) || 0,
        date: formData.date,
      });

      toast.success('Meal added successfully!');
      setFormData({
        mealName: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
        date: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
      loadMeals();
    } catch (error) {
      toast.error('Failed to add meal');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      try {
        await dietService.deleteMeal(id);
        toast.success('Meal deleted successfully!');
        loadMeals();
      } catch (error) {
        toast.error('Failed to delete meal');
        console.error(error);
      }
    }
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFats = meals.reduce((sum, m) => sum + m.fats, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Diet & Nutrition 🍽️</h1>
            <p className="text-gray-600 mt-2">Track your meals and nutrition intake</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            {showForm ? 'Cancel' : '+ Add Meal'}
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Meals</p>
            <p className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2">{meals.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Calories</p>
            <p className="text-3xl sm:text-4xl font-bold text-red-600 mt-2">{totalCalories}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Protein (g)</p>
            <p className="text-3xl sm:text-4xl font-bold text-green-600 mt-2">{totalProtein}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Carbs (g)</p>
            <p className="text-3xl sm:text-4xl font-bold text-yellow-600 mt-2">{totalCarbs}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <p className="text-xs sm:text-sm font-medium text-gray-600">Fats (g)</p>
            <p className="text-3xl sm:text-4xl font-bold text-orange-600 mt-2">{totalFats}</p>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Meal</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Name *
                </label>
                <input
                  type="text"
                  name="mealName"
                  value={formData.mealName}
                  onChange={handleChange}
                  placeholder="e.g., Breakfast, Lunch"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calories *
                </label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  placeholder="500"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Protein (g)
                </label>
                <input
                  type="number"
                  name="protein"
                  value={formData.protein}
                  onChange={handleChange}
                  placeholder="25"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  name="carbs"
                  value={formData.carbs}
                  onChange={handleChange}
                  placeholder="60"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fats (g)
                </label>
                <input
                  type="number"
                  name="fats"
                  value={formData.fats}
                  onChange={handleChange}
                  placeholder="15"
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
                Add Meal
              </button>
            </form>
          </div>
        )}

        {/* Meals List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : meals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Meal
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Calories
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Protein
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Carbs
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Fats
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
                  {meals.map((meal) => (
                    <tr key={meal._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-800">{meal.mealName}</td>
                      <td className="px-6 py-4 text-red-600 font-semibold">{meal.calories}</td>
                      <td className="px-6 py-4 text-green-600">{meal.protein}g</td>
                      <td className="px-6 py-4 text-yellow-600">{meal.carbs}g</td>
                      <td className="px-6 py-4 text-orange-600">{meal.fats}g</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(meal.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(meal._id)}
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
              No meals logged yet. Start tracking your nutrition!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
