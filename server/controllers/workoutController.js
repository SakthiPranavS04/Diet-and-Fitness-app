// Workout controller - handles workout tracking
const db = require('../db');

/**
 * Add a new workout
 * POST /api/workouts
 */
exports.addWorkout = async (req, res) => {
  try {
    const { exerciseName, duration, caloriesBurned, date } = req.body;

    // Validation
    if (!exerciseName || !duration || caloriesBurned === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide exerciseName, duration, and caloriesBurned',
      });
    }

    const workout = db.workouts.create({
      userId: req.userId,
      exerciseName,
      duration: parseInt(duration),
      caloriesBurned: parseInt(caloriesBurned),
      date: date || new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: 'Workout added successfully',
      workout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get all workouts for the user
 * GET /api/workouts
 */
exports.getWorkouts = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let workouts = db.workouts.find({ userId: req.userId });

    // Filter by date range if provided
    if (startDate || endDate) {
      workouts = workouts.filter(w => {
        const wDate = new Date(w.date);
        if (startDate && wDate < new Date(startDate)) return false;
        if (endDate && wDate > new Date(endDate)) return false;
        return true;
      });
    }

    // Sort by date descending
    workouts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate summary
    const totalWorkouts = workouts.length;
    const totalCalories = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
    const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);

    res.status(200).json({
      success: true,
      data: {
        workouts,
        summary: {
          totalWorkouts,
          totalCalories,
          totalMinutes,
        },
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
 * Delete a workout
 * DELETE /api/workouts/:id
 */
exports.deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const workouts = db.workouts.find({ userId: req.userId });
    const workout = workouts.find(w => w._id === id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found',
      });
    }

    db.workouts.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Workout deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
