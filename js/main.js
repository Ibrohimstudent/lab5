// Registan Travel · main.js (Booking page)

// 1. Get the elements we need
const form = document.getElementById("booking-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const tourSelect = document.getElementById("tour");
const travellersInput = document.getElementById("travellers");
const totalText = document.getElementById("total");
const message = document.getElementById("message");

// 2. Calculate the total price (groups of 5 or more get 10% off)
function calculateTotal() {
  const price = Number(tourSelect.value);
  const people = Number(travellersInput.value);
  let total = price * people;

  if (people >= 5) {
    total = total * 0.9;
  }

  return total;
}

// 3. Show the live price on the page
function showTotal() {
  const price = Number(tourSelect.value);
  const people = Number(travellersInput.value);

  if (people < 1 || people > 12) {
    totalText.textContent = "Please choose 1 to 12 travellers.";
    return;
  }

  const fullPrice = price * people;

  if (people >= 5) {
    totalText.textContent = "Total: " + people + " × " + price + " USD = " + fullPrice +
      " USD − 10% group discount = " + calculateTotal() + " USD";
  } else {
    totalText.textContent = "Total: " + people + " × " + price + " USD = " + fullPrice + " USD";
  }
}

// update the price when the tour or the number of travellers changes
tourSelect.addEventListener("change", showTotal);
travellersInput.addEventListener("input", showTotal);

// 4. Validation on submit
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  // remove old error styles
  nameInput.classList.remove("invalid");
  emailInput.classList.remove("invalid");
  travellersInput.classList.remove("invalid");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const people = Number(travellersInput.value);

  if (name === "") {
    showError(nameInput, "Please enter your name.");
    return;
  }

  if (!email.includes("@")) {
    showError(emailInput, "Please enter a valid email address (it must contain @).");
    return;
  }

  if (people < 1 || people > 12) {
    showError(travellersInput, "Number of travellers must be from 1 to 12.");
    return;
  }

  // everything is correct: green confirmation
  message.className = "message success";
  message.textContent = "Thank you, " + name + "! Your request has been sent. Total: " +
    calculateTotal() + " USD.";
});

// red message + highlight the wrong field
function showError(field, text) {
  field.classList.add("invalid");
  field.focus();
  message.className = "message error";
  message.textContent = text;
}
