// Diet controller - handles diet and nutrition tracking
const db = require('../db');

/**
 * Add a new meal
 * POST /api/diets
 */
exports.addMeal = async (req, res) => {
  try {
    const { mealName, calories, protein, carbs, fats, date } = req.body;

    // Validation
    if (!mealName || calories === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide mealName and calories',
      });
    }

    const meal = db.diets.create({
      userId: req.userId,
      mealName,
      calories: parseInt(calories),
      protein: parseInt(protein) || 0,
      carbs: parseInt(carbs) || 0,
      fats: parseInt(fats) || 0,
      date: date || new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: 'Meal added successfully',
      meal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get all meals for the user
 * GET /api/diets
 */
exports.getMeals = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let meals = db.diets.find({ userId: req.userId });

    // Filter by date range if provided
    if (startDate || endDate) {
      meals = meals.filter(m => {
        const mDate = new Date(m.date);
        if (startDate && mDate < new Date(startDate)) return false;
        if (endDate && mDate > new Date(endDate)) return false;
        return true;
      });
    }

    // Sort by date descending
    meals.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate summary
    const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
    const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
    const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
    const totalFats = meals.reduce((sum, m) => sum + m.fats, 0);

    res.status(200).json({
      success: true,
      data: {
        meals,
        summary: {
          totalCalories,
          totalProtein,
          totalCarbs,
          totalFats,
          mealCount: meals.length,
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
 * Delete a meal
 * DELETE /api/diets/:id
 */
exports.deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;

    const meals = db.diets.find({ userId: req.userId });
    const meal = meals.find(m => m._id === id);

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found',
      });
    }

    db.diets.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Meal deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
