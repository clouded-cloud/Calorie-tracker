
// select DOM elements
const addMealInput = document.getElementById("Add-meal");
const addCalorieInput = document.getElementById("Add-calorie");
const addmealbutton = document.getElementById("meal-button");
const caloriestable = document.getElementById("calorie-table");
const caloriestablebody = document.getElementById("calorie-table-body");


//functions

function addMealInput() {
    const meal = mealInput.value.trim();
    const calories = calorieInput.value.trim();
    const date = dateInput.value.trim();


   meals.push({ meal, calories, date });
   mealinput.value = '';
   calorieinput.value = '';
   dateinput.value = '';
   updateTable();
}
  function deleteMeal(index) {
    meals.slice(index, 1);
    updateTable();
 }

 document.getElementById('Add-Meal-Button').addEventListener('click', addMeal);
  document.getElementById('Add-Calorie-Button').addEventListener('click', addMeal);
