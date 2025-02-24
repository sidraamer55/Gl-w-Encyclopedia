// Create the main variables for rates:
const rateInput = document.getElementById("rateInput");
const addRateBtn = document.getElementById("addRateBtn");
const clearRatesBtn = document.getElementById("clearRatesBtn");
const rateList = document.getElementById("rateList");

// Returns rates from Local Storage:
let rates = JSON.parse(localStorage.getItem("rates")) || [];

// View the rates when we reload the page:
function displayRates() {
    rateList.innerHTML = ""; // Clear existing list to prevent duplicates
    rates.forEach(rate => addRateToDOM(rate));
}


// Call the functions to display rates:
displayRates();

// Add a new rate:
addRateBtn.addEventListener("click", function(){
    const rateText = rateInput.value.trim();
    if (rateText && rateText.length <= 400) { // Character limit
        rates.push(rateText);
        localStorage.setItem("rates", JSON.stringify(rates));
        addRateToDOM(rateText);
        rateInput.value = "";
    } else if (rateText.length > 400) {
        alert("Rate exceeds character limit of 400!"); // Notify user if input is too long
    } else {
        alert("Please enter a rate!"); // Notify user if input is empty
    }
});

// Allow adding rates with Enter key
rateInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission if inside a form
        addRateBtn.click(); // Trigger click event of the button
    }
});


// Add rate to DOM:
function addRateToDOM(rate){
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center"; // Bootstrap list item class
    li.textContent = rate;

    // Delete button:
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm delete-item"; // Bootstrap button classes
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function(){
        if (confirm("Are you sure you want to delete this rate?")) { // Confirmation dialog
            rates = rates.filter(r => r !== rate);
            localStorage.setItem("rates", JSON.stringify(rates));
            li.remove();
        }
    };

    li.appendChild(deleteBtn);
    rateList.appendChild(li);
}


// Clear all rates functionality:
clearRatesBtn.addEventListener("click", function() {
    if (confirm("Are you sure you want to clear all rates?")) { // Confirmation dialog
        rates = [];
        localStorage.setItem("rates", JSON.stringify(rates));
        rateList.innerHTML = ""; // Clear the displayed list
        alert("All rates have been cleared."); // Notify user
    }
});