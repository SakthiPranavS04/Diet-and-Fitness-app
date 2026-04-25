// Home Page Component
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Your Fitness Journey Starts Here 💪
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Track workouts, monitor nutrition, and achieve your wellness goals with FitWell -
              your complete fitness companion.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="text-2xl">📊</div>
                <p className="text-gray-700">Real-time fitness analytics and progress tracking</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl">🍽️</div>
                <p className="text-gray-700">Comprehensive nutrition and diet tracking</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl">😴</div>
                <p className="text-gray-700">Sleep, water intake, and stress monitoring</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl">🔐</div>
                <p className="text-gray-700">Secure authentication and private data</p>
              </div>
            </div>

            {/* CTA Buttons */}
            {!isAuthenticated && (
              <div className="flex gap-4">
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="text-center">
            <div className="text-8xl mb-4">🏋️‍♂️</div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Start Your Wellness Journey</h3>
              <p className="text-gray-600 mb-6">
                Join thousands of users tracking their fitness goals with FitWell. Get personalized
                insights, maintain consistency, and achieve your health objectives.
              </p>
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your workouts, calories, and wellness metrics with detailed analytics
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Set Goals</h3>
            <p className="text-gray-600">
              Define your fitness goals and work towards them with our comprehensive tracking tools
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Achieve Results</h3>
            <p className="text-gray-600">
              Stay motivated and achieve your health objectives with personalized insights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
