// Wellness Page Component
import { useState, useEffect } from 'react';
import { wellnessService } from '../services/api';
import toast from 'react-hot-toast';

export default function Wellness() {
  const [wellnessData, setWellnessData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    sleepHours: '',
    waterIntake: '',
    stressLevel: 'low',
    notes: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadWellnessData();
  }, []);

  const loadWellnessData = async () => {
    try {
      setLoading(true);
      const response = await wellnessService.getWellness();
      setWellnessData(response.data.data.wellnessData);
    } catch (error) {
      toast.error('Failed to load wellness data');
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
      await wellnessService.addWellness({
        sleepHours: parseFloat(formData.sleepHours) || 0,
        waterIntake: parseFloat(formData.waterIntake) || 0,
        stressLevel: formData.stressLevel,
        notes: formData.notes,
        date: formData.date,
      });

      toast.success('Wellness data added successfully!');
      setFormData({
        sleepHours: '',
        waterIntake: '',
        stressLevel: 'low',
        notes: '',
        date: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
      loadWellnessData();
    } catch (error) {
      toast.error('Failed to add wellness data');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await wellnessService.deleteWellness(id);
        toast.success('Wellness data deleted successfully!');
        loadWellnessData();
      } catch (error) {
        toast.error('Failed to delete wellness data');
        console.error(error);
      }
    }
  };

  const avgSleep =
    wellnessData.length > 0
      ? (wellnessData.reduce((sum, w) => sum + w.sleepHours, 0) / wellnessData.length).toFixed(1)
      : 0;
  const totalWater = wellnessData.reduce((sum, w) => sum + w.waterIntake, 0);
  const stressStats = {
    low: wellnessData.filter((w) => w.stressLevel === 'low').length,
    medium: wellnessData.filter((w) => w.stressLevel === 'medium').length,
    high: wellnessData.filter((w) => w.stressLevel === 'high').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Wellness Tracking 😴</h1>
            <p className="text-gray-600 mt-2">Monitor your sleep, hydration, and stress</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            {showForm ? 'Cancel' : '+ Add Entry'}
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Entries</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{wellnessData.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Avg Sleep</p>
            <p className="text-4xl font-bold text-purple-600 mt-2">{avgSleep}h</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Water Intake</p>
            <p className="text-4xl font-bold text-cyan-600 mt-2">{totalWater}L</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Low Stress Days</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{stressStats.low}</p>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Wellness Entry</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sleep Hours
                </label>
                <input
                  type="number"
                  step="0.5"
                  name="sleepHours"
                  value={formData.sleepHours}
                  onChange={handleChange}
                  placeholder="7"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Water Intake (liters)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="waterIntake"
                  value={formData.waterIntake}
                  onChange={handleChange}
                  placeholder="2.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stress Level
                </label>
                <select
                  name="stressLevel"
                  value={formData.stressLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="How are you feeling today?"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="col-span-1 md:col-span-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Add Entry
              </button>
            </form>
          </div>
        )}

        {/* Data List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : wellnessData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Sleep
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Water
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Stress
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Notes
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wellnessData.map((entry) => (
                    <tr key={entry._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-semibold text-purple-600">
                        {entry.sleepHours}h
                      </td>
                      <td className="px-6 py-4 font-semibold text-cyan-600">
                        {entry.waterIntake}L
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            entry.stressLevel === 'low'
                              ? 'bg-green-100 text-green-800'
                              : entry.stressLevel === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {entry.stressLevel.charAt(0).toUpperCase() + entry.stressLevel.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                        {entry.notes || '-'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(entry._id)}
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
              No wellness entries yet. Start tracking your wellness!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
