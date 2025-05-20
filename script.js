
// select DOM elements
const mealInput = document.getElementById("add-meal");
const calorieInput = document.getElementById("add-calorie");
const dateInput = document.getElementById("date");
const addButton = document.getElementById("meal-button");
const tableBody = document.getElementById("calories-table-body");
const totalCalories = document.getElementById("total-amount-calories");

document.addEventListener("DOMContentLoaded", loadMeals);

addButton.addEventListener("click", addMeal);

//functions add meal
function addMeal() {
    const meal = mealInput.value.trim();
    const calories = parseInt(calorieInput.value.trim());
    const date = dateInput.value;

    if (!meal || isNaN(calories) || !date) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const mealData = {
        id: Date.now(),
        meal,
        calories,
        date
    };

    // Save to localStorage
    const meals = getMealsFromStorage();
    meals.push(mealData);
    localStorage.setItem("meals", JSON.stringify(meals));

    // Add to UI
    addMealToTable(mealData);

    // Update total
    updateTotalCalories();

    // Clear input fields
    mealInput.value = "";
    calorieInput.value = "";
    dateInput.value = "";
}

// Add single row to table
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

// Load and display meals
function loadMeals() {
    const meals = getMealsFromStorage();
    meals.forEach(addMealToTable);
    updateTotalCalories();
}

// Get meals from localStorage
function getMealsFromStorage() {
    return JSON.parse(localStorage.getItem("meals")) || [];
}

// Delete meal
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


