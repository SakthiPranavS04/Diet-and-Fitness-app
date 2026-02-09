import { NavLink } from 'react-router-dom';
import { Home, Compass, Utensils, BarChart3, Settings } from 'lucide-react';

const Layout = ({ children, userData }) => {
    const navItems = [
        { path: '/training', label: 'Training', icon: Home },
        { path: '/discover', label: 'Discover', icon: Compass },
        { path: '/diet', label: 'Diet', icon: Utensils },
        { path: '/report', label: 'Report', icon: BarChart3 },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                    {userData.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">FitLife Pro</h1>
                                <p className="text-sm text-gray-500">Welcome, {userData.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-around">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex flex-col items-center py-3 px-4 transition-colors ${isActive
                                            ? 'text-primary-600'
                                            : 'text-gray-500 hover:text-primary-500'
                                        }`
                                    }
                                >
                                    <Icon className="w-6 h-6 mb-1" />
                                    <span className="text-xs font-medium">{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Add padding to prevent content from being hidden behind nav */}
            <div className="h-20"></div>
        </div>
    );
};

export default Layout;
