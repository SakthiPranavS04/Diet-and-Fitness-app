import { User, LogOut, Info, Bell, Shield, HelpCircle } from 'lucide-react';

const Settings = ({ userData, onLogout }) => {
    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout? Your data will be cleared.')) {
            onLogout();
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                <p className="text-gray-600">Manage your account and preferences</p>
            </div>

            {/* Profile Card */}
            <div className="card">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-3xl">
                            {userData.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                        <p className="text-gray-600">{userData.age} years old • {userData.gender}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                    <div>
                        <p className="text-sm text-gray-600">Height</p>
                        <p className="text-lg font-semibold text-gray-900">{userData.height} cm</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Weight</p>
                        <p className="text-lg font-semibold text-gray-900">{userData.weight} kg</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">BMI</p>
                        <p className="text-lg font-semibold text-gray-900">{userData.bmi}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Goal</p>
                        <p className="text-lg font-semibold text-gray-900 capitalize">{userData.goal}</p>
                    </div>
                </div>
            </div>

            {/* Fitness Goals */}
            <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Fitness Information</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <div>
                            <p className="font-semibold text-gray-900">Activity Level</p>
                            <p className="text-sm text-gray-600 capitalize">{userData.activity}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <div>
                            <p className="font-semibold text-gray-900">Target Calories</p>
                            <p className="text-sm text-gray-600">{userData.targetCalories} kcal/day</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <div>
                            <p className="font-semibold text-gray-900">BMR (Basal Metabolic Rate)</p>
                            <p className="text-sm text-gray-600">{userData.bmr} kcal/day</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-3">
                        <div>
                            <p className="font-semibold text-gray-900">TDEE (Total Daily Energy Expenditure)</p>
                            <p className="text-sm text-gray-600">{userData.tdee} kcal/day</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* App Settings */}
            <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">App Settings</h2>
                <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="font-semibold text-gray-900">Notifications</span>
                        </div>
                        <span className="text-gray-400">›</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-gray-600" />
                            <span className="font-semibold text-gray-900">Privacy</span>
                        </div>
                        <span className="text-gray-400">›</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                            <HelpCircle className="w-5 h-5 text-gray-600" />
                            <span className="font-semibold text-gray-900">Help & Support</span>
                        </div>
                        <span className="text-gray-400">›</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                            <Info className="w-5 h-5 text-gray-600" />
                            <span className="font-semibold text-gray-900">About</span>
                        </div>
                        <span className="text-gray-400">›</span>
                    </button>
                </div>
            </div>

            {/* Workout Stats Summary */}
            <div className="card bg-blue-50 border-2 border-blue-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Workouts Completed</p>
                        <p className="text-2xl font-bold text-primary-600">{userData.workoutsCompleted}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Total Minutes</p>
                        <p className="text-2xl font-bold text-primary-600">{userData.totalMinutes}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Current Streak</p>
                        <p className="text-2xl font-bold text-primary-600">{userData.streak} days</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Calories Burnt</p>
                        <p className="text-2xl font-bold text-primary-600">{userData.caloriesBurnt || 0}</p>
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
            </button>

            {/* App Version */}
            <div className="text-center text-sm text-gray-500 pb-4">
                <p>FitLife Pro v1.0.0</p>
                <p className="mt-1">Made with ❤️ for your fitness journey</p>
            </div>
        </div>
    );
};

export default Settings;
