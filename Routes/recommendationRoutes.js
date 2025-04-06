const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Health Metrics Calculation API
router.get("/", (req, res) => {
    const { weight, height, age, gender, activityLevel } = req.query;

    if (!weight || !height || !age || !gender || !activityLevel) {
        return res.status(400).json({ error: "Missing required parameters!" });
    }

    // Convert height to meters
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters ** 2)).toFixed(2);
    let category = "";

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal Weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    // ✅ Calculate BMR (Basal Metabolic Rate)
    let bmr;
    if (gender === "male") {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // ✅ Daily Caloric Needs Based on Activity Level
    const activityMultiplier = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9
    };
    
    const maintenanceCalories = (bmr * activityMultiplier[activityLevel]).toFixed(0);
    const weightLossCalories = (maintenanceCalories - 500).toFixed(0);
    const weightGainCalories = (parseInt(maintenanceCalories) + 500).toFixed(0);

    // ✅ Ideal Weight Range Calculation
    const minIdealWeight = (18.5 * (heightInMeters ** 2)).toFixed(1);
    const maxIdealWeight = (24.9 * (heightInMeters ** 2)).toFixed(1);
    let weightStatus = "Within Ideal Range";
    if (weight < minIdealWeight) weightStatus = "Underweight";
    if (weight > maxIdealWeight) weightStatus = "Overweight";

    // ✅ Macronutrient Recommendations
    const proteinIntake = (weight * 1.2).toFixed(1);  // 1.2g per kg
    const carbIntake = (maintenanceCalories * 0.55 / 4).toFixed(1);
    const fatIntake = (maintenanceCalories * 0.25 / 9).toFixed(1);
    const waterIntake = (weight * 0.04).toFixed(1); // 40ml per kg

    // ✅ Suggested Meals (Example)
    const meals = {
        breakfast: "Oats, banana, and nuts",
        lunch: "Quinoa salad with tofu",
        dinner: "Grilled vegetables with brown rice"
    };

    // ✅ Fitness Recommendations
    const stepsGoal = activityLevel === "sedentary" ? 5000 : 8000;
    const exercisePlan = activityLevel === "sedentary" 
        ? ["Start with light activities like walking and yoga."]
        : ["30 minutes of strength training", "20 minutes of cardio", "10 minutes of stretching"];

    // ✅ Final Response
    res.json({
        profile_summary: {
            weight: `${weight} kg`,
            height: `${height} cm`,
            age: `${age} years`,
            gender,
            activityLevel
        },
        health_metrics: {
            bmi,
            category,
            bmr: `${bmr.toFixed(0)} kcal/day`,
            daily_caloric_need: `${maintenanceCalories} kcal/day`,
            weight_loss_calories: `${weightLossCalories} kcal/day`,
            weight_gain_calories: `${weightGainCalories} kcal/day`
        },
        ideal_weight: {
            range: `${minIdealWeight} - ${maxIdealWeight} kg`,
            current_weight_status: weightStatus
        },
        nutrition_plan: {
            protein: `${proteinIntake}g/day`,
            carbohydrates: `${carbIntake}g/day`,
            fats: `${fatIntake}g/day`,
            water_intake: `${waterIntake}L/day`,
            meals
        },
        fitness_plan: {
            steps_goal: `${stepsGoal} steps/day`,
            exercises: exercisePlan
        }
    });
});

module.exports = router;



