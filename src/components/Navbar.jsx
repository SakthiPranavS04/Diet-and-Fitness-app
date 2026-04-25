// Navbar Component
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold">💪</div>
            <div className="font-bold text-lg hidden sm:block">FitWell</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  to="/workouts"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Workouts
                </Link>
                <Link
                  to="/diet"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Diet
                </Link>
                <Link
                  to="/wellness"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Wellness
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-blue-700 rounded"
                >
                  Dashboard
                </Link>
                <Link
                  to="/workouts"
                  className="block px-4 py-2 hover:bg-blue-700 rounded"
                >
                  Workouts
                </Link>
                <Link
                  to="/diet"
                  className="block px-4 py-2 hover:bg-blue-700 rounded"
                >
                  Diet
                </Link>
                <Link
                  to="/wellness"
                  className="block px-4 py-2 hover:bg-blue-700 rounded"
                >
                  Wellness
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-blue-700 rounded"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-blue-700 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 hover:bg-blue-700 rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
