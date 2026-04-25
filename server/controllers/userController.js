// User controller - handles user profile and account management
const db = require('../db');

// Helper function to calculate BMI
const calculateBMI = (height, weight) => {
  if (!height || !weight) return null;
  return (weight / (height / 100) ** 2).toFixed(2);
};

/**
 * Get user profile
 * GET /api/users/profile
 */
exports.getProfile = async (req, res) => {
  try {
    const user = db.users.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Calculate BMI
    const bmi = calculateBMI(user.height, user.weight);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        height: user.height,
        weight: user.weight,
        goal: user.goal,
        bmi,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update user profile
 * PUT /api/users/profile
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, age, height, weight, goal } = req.body;

    // Find and update user
    const user = db.users.findByIdAndUpdate(req.userId, {
      name,
      age: parseInt(age) || 0,
      height: parseInt(height) || 0,
      weight: parseInt(weight) || 0,
      goal,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Calculate BMI
    const bmi = calculateBMI(user.height, user.weight);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        height: user.height,
        weight: user.weight,
        goal: user.goal,
        bmi,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
