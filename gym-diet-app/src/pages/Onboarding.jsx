import { useState } from 'react';
import { User, Scale, Target, Activity } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        goal: '',
        activity: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const calculateMetrics = () => {
        const heightInMeters = formData.height / 100;
        const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);

        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr;
        if (formData.gender === 'male') {
            bmr = (10 * formData.weight) + (6.25 * formData.height) - (5 * formData.age) + 5;
        } else {
            bmr = (10 * formData.weight) + (6.25 * formData.height) - (5 * formData.age) - 161;
        }

        // Calculate TDEE
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            very: 1.725
        };

        const tdee = bmr * activityMultipliers[formData.activity];

        // Calculate target calories
        let targetCalories;
        if (formData.goal === 'lose') {
            targetCalories = Math.round(tdee - 500);
        } else if (formData.goal === 'gain') {
            targetCalories = Math.round(tdee + 500);
        } else {
            targetCalories = Math.round(tdee);
        }

        return {
            ...formData,
            bmi: parseFloat(bmi),
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            targetCalories,
            workoutsCompleted: 0,
            totalMinutes: 0,
            streak: 0,
            caloriesBurnt: 0
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = calculateMetrics();
        onComplete(userData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                        <Activity className="w-8 h-8 text-primary-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">FitLife Pro</h1>
                    <p className="text-gray-600">Your Personal Fitness Coach</p>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${i <= step
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                    }`}
                            >
                                {i}
                            </div>
                            {i < 4 && (
                                <div
                                    className={`w-12 h-1 ${i < step ? 'bg-primary-600' : 'bg-gray-200'
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Information</h2>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="Age"
                                        min="10"
                                        max="120"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="input-field"
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="btn-primary w-full"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {/* Step 2: Physical Stats */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Body Measurements</h2>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Height (cm)
                                </label>
                                <input
                                    type="number"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Enter height in cm"
                                    min="50"
                                    max="250"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Weight (kg)
                                </label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Enter weight in kg"
                                    min="10"
                                    max="300"
                                    step="0.1"
                                    required
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className="btn-secondary flex-1"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="btn-primary flex-1"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Goals */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fitness Goal</h2>

                            <div className="space-y-3">
                                {[
                                    { value: 'lose', label: 'Lose Weight', desc: 'Burn fat and get lean' },
                                    { value: 'gain', label: 'Gain Weight', desc: 'Build muscle mass' },
                                    { value: 'maintain', label: 'Maintain', desc: 'Stay healthy and fit' }
                                ].map((goal) => (
                                    <label
                                        key={goal.value}
                                        className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.goal === goal.value
                                                ? 'border-primary-600 bg-primary-50'
                                                : 'border-gray-300 hover:border-primary-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="goal"
                                            value={goal.value}
                                            checked={formData.goal === goal.value}
                                            onChange={handleChange}
                                            className="sr-only"
                                            required
                                        />
                                        <div className="font-semibold text-gray-900">{goal.label}</div>
                                        <div className="text-sm text-gray-600">{goal.desc}</div>
                                    </label>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className="btn-secondary flex-1"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="btn-primary flex-1"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Activity Level */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Activity Level</h2>

                            <div className="space-y-3">
                                {[
                                    { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
                                    { value: 'light', label: 'Lightly Active', desc: 'Exercise 1-3 days/week' },
                                    { value: 'moderate', label: 'Moderately Active', desc: 'Exercise 3-5 days/week' },
                                    { value: 'very', label: 'Very Active', desc: 'Exercise 6-7 days/week' }
                                ].map((activity) => (
                                    <label
                                        key={activity.value}
                                        className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.activity === activity.value
                                                ? 'border-primary-600 bg-primary-50'
                                                : 'border-gray-300 hover:border-primary-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="activity"
                                            value={activity.value}
                                            checked={formData.activity === activity.value}
                                            onChange={handleChange}
                                            className="sr-only"
                                            required
                                        />
                                        <div className="font-semibold text-gray-900">{activity.label}</div>
                                        <div className="text-sm text-gray-600">{activity.desc}</div>
                                    </label>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className="btn-secondary flex-1"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary flex-1"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Onboarding;
