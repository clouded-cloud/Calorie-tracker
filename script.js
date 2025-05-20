
// select DOM elements
const EDAMAM_APP_ID = "29f56d92"; // Replace with your App ID
const EDAMAM_APP_KEY = "29f56d92"; // Replace with your App Key

const mealInput = document.getElementById("add-meal");
const dateInput = document.getElementById("date");
const addButton = document.getElementById("meal-button");
const tableBody = document.getElementById("calories-table-body");
const totalCalories = document.getElementById("total-amount-calories");

document.addEventListener("DOMContentLoaded", loadMeals);
addButton.addEventListener("click", addMeal);

// Add meal with API calorie lookup
async function addMeal() {
    const meal = mealInput.value.trim();
    const date = dateInput.value;

    if (!meal || !date) {
        alert("Please enter both meal and date.");
        return;
    }

    try {
        const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(meal)}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`);
        const data = await response.json();

        if (!data.parsed || data.parsed.length === 0 || !data.parsed[0].food.nutrients.ENERC_KCAL) {
            alert("Calorie data not found for this meal.");
            return;
        }

        const calories = Math.round(data.parsed[0].food.nutrients.ENERC_KCAL);

        const mealData = {
            id: Date.now(),
            meal,
            calories,
            date
        };

        const meals = getMealsFromStorage();
        meals.push(mealData);
        localStorage.setItem("meals", JSON.stringify(meals));

        addMealToTable(mealData);
        updateTotalCalories();

        // Clear inputs
        mealInput.value = "";
        dateInput.value = "";

    } catch (error) {
        console.error("Error fetching calorie data:", error);
        alert("Error retrieving calorie information.");
    }
}

// Add a single row to the table
function addMealToTable(mealData) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${mealData.meal}</td>
        <td>${mealData.calories}</td>
        <td>${mealData.date}</td>
        <td><button onclick="deleteMeal(${mealData.id})" class="text-red-500">Delete</button></td>
    `;
    row.dataset.id = mealData.id;
    tableBody.appendChild(row);
}

// Load meals from localStorage
function loadMeals() {
    const meals = getMealsFromStorage();
    meals.forEach(addMealToTable);
    updateTotalCalories();
}

// Get meals from localStorage
function getMealsFromStorage() {
    return JSON.parse(localStorage.getItem("meals")) || [];
}

// Delete a meal
function deleteMeal(id) {
    let meals = getMealsFromStorage();
    meals = meals.filter(meal => meal.id !== id);
    localStorage.setItem("meals", JSON.stringify(meals));

    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) row.remove();

    updateTotalCalories();
}

// Update total calorie count
function updateTotalCalories() {
    const meals = getMealsFromStorage();
    const total = meals.reduce((sum, meal) => sum + meal.calories, 0);
    totalCalories.textContent = total;
}
