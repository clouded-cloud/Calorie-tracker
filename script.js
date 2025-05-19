
// select DOM elements
const addMealInput = document.getElementById("Add-meal");
const addCalorieInput = document.getElementById("Add-calorie");
const addmealbutton = document.getElementById("meal-button");
const caloriestable = document.getElementById("calorie-table");
const caloriestablebody = document.getElementById("calorie-table-body");


//functions

function addmealbutton() 
    
    const meal = mealInput.value.trim();
    const calories = parseInt(calorieInput.value.trim());
    const date = dateInput.value;

 if (addMealInput||addCalorieInput||adddateinput)  {
     alert("please input,");
     return;
    
 }
  

