import { useState } from 'react';
import { Play, Clock, Zap, Search } from 'lucide-react';

const Discover = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTab, setSelectedTab] = useState('warmups');

    const warmups = [
        {
            id: 1,
            name: 'Dynamic Stretching',
            duration: '5 min',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/g_tea8ZNk5A',
            thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
        },
        {
            id: 2,
            name: 'Cardio Warm-up',
            duration: '10 min',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI',
            thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        },
        {
            id: 3,
            name: 'Mobility Routine',
            duration: '8 min',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/qULTwquOuT4',
            thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
        },
    ];

    const newExercises = [
        {
            id: 1,
            name: 'Burpees',
            category: 'Full Body',
            duration: '30 sec',
            difficulty: 'Advanced',
            videoUrl: 'https://www.youtube.com/embed/JZQA08SlJnM',
            thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
        },
        {
            id: 2,
            name: 'Mountain Climbers',
            category: 'Cardio',
            duration: '45 sec',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/nmwgirgXLYM',
            thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        },
        {
            id: 3,
            name: 'Plank',
            category: 'Core',
            duration: '60 sec',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/pSHjTRCQxIw',
            thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
        },
        {
            id: 4,
            name: 'Jump Squats',
            category: 'Legs',
            duration: '40 sec',
            difficulty: 'Advanced',
            videoUrl: 'https://www.youtube.com/embed/A-cFYWvaHr0',
            thumbnail: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop',
        },
        {
            id: 5,
            name: 'Push-ups',
            category: 'Chest',
            duration: '30 sec',
            difficulty: 'Beginner',
            videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4',
            thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
        },
        {
            id: 6,
            name: 'Lunges',
            category: 'Legs',
            duration: '45 sec',
            difficulty: 'Intermediate',
            videoUrl: 'https://www.youtube.com/embed/QOVaHwm-Q6U',
            thumbnail: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop',
        },
    ];

    const [selectedVideo, setSelectedVideo] = useState(null);

    const currentList = selectedTab === 'warmups' ? warmups : newExercises;
    const filteredList = currentList.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner':
                return 'bg-green-100 text-green-700';
            case 'Intermediate':
                return 'bg-yellow-100 text-yellow-700';
            case 'Advanced':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover</h1>
                <p className="text-gray-600">Explore new exercises and warm-up routines</p>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                />
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 border-b border-gray-200">
                <button
                    onClick={() => setSelectedTab('warmups')}
                    className={`px-6 py-3 font-semibold transition-colors ${selectedTab === 'warmups'
                            ? 'text-primary-600 border-b-2 border-primary-600'
                            : 'text-gray-600 hover:text-primary-500'
                        }`}
                >
                    Warm-ups
                </button>
                <button
                    onClick={() => setSelectedTab('exercises')}
                    className={`px-6 py-3 font-semibold transition-colors ${selectedTab === 'exercises'
                            ? 'text-primary-600 border-b-2 border-primary-600'
                            : 'text-gray-600 hover:text-primary-500'
                        }`}
                >
                    New Exercises
                </button>
            </div>

            {/* Exercise Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredList.map((item) => (
                    <div key={item.id} className="card cursor-pointer hover:scale-105 transition-transform duration-200">
                        <div
                            className="relative h-48 mb-4 rounded-lg overflow-hidden group"
                            onClick={() => setSelectedVideo(item)}
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play className="w-8 h-8 text-primary-600 ml-1" />
                                </div>
                            </div>
                        </div>

                        <h3 className="font-bold text-lg text-gray-900 mb-2">{item.name}</h3>

                        <div className="flex items-center justify-between mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(item.difficulty)}`}>
                                {item.difficulty}
                            </span>
                            <span className="flex items-center text-sm text-gray-600">
                                <Clock className="w-4 h-4 mr-1" />
                                {item.duration}
                            </span>
                        </div>

                        {item.category && (
                            <div className="flex items-center text-sm text-gray-600">
                                <Zap className="w-4 h-4 mr-1" />
                                {item.category}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div
                        className="bg-white rounded-xl max-w-4xl w-full p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedVideo.name}</h2>
                                <p className="text-gray-600">{selectedVideo.duration} • {selectedVideo.difficulty}</p>
                            </div>
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>

                        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                            <iframe
                                width="100%"
                                height="100%"
                                src={selectedVideo.videoUrl}
                                title={selectedVideo.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="mt-4">
                            <button className="btn-primary w-full">
                                Add to My Workout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Discover;
