var text = document.getElementById("bkashreveal");
var display = 0;

function displayText() {
  if (display == 1) {
    text.style.display = "inline-flex";
    text1.style.display = "none";
    text2.style.display = "none";
    display = 0;
  } else {
    text.style.display = "none";
    text1.style.display = "none";
    text2.style.display = "none";
    display = 1;
  }
}

var text1 = document.getElementById("rocketreveal");
var display1 = 0;

function displayText1() {
  if (display1 == 1) {
    text1.style.display = "inline-flex";
    text.style.display = "none";
    text2.style.display = "none";
    display1 = 0;
  } else {
    text1.style.display = "none";
    text.style.display = "none";
    text2.style.display = "none";
    display1 = 1;
  }
}

var text2 = document.getElementById("nagadreveal");
var display2 = 0;

function displayText2() {
  if (display2 == 1) {
    text2.style.display = "inline-flex";
    text.style.display = "none";
    text1.style.display = "none";
    display2 = 0;
  } else {
    text2.style.display = "none";
    text.style.display = "none";
    text1.style.display = "none";
    display2 = 1;
  }
}

const optionMenu = document.querySelector(".select-menu"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".option"),
  sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active")
);

options.forEach((option) => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option-text").innerText;
    sBtn_text.innerText = selectedOption;
    selectProduct(selectedOption);
    displayCart();
    optionMenu.classList.remove("active");
  });
});

const product = [
  {
    title: "Web Development Fundamentals",
    price: 4000,
  },
  {
    title: "Machine Learning for Beginners",
    price: 3500,
  },
  {
    title: "Cybersecurity Essentials",
    price: 3900,
  },
];

let selectedProduct = null;
let promoApplied = false;

function selectProduct(title) {
  selectedProduct = product.find((item) => item.title === title);
  displayCart();
}
let promobtn = document.getElementById("promobtn");
promobtn.addEventListener("click", promo);
function promo(event) {
  event.preventDefault(); // Prevent default behavior of button click event
  console.log("Promo function called");
  let promocode = document.getElementById("promocode").value;
  console.log("Promo code entered:", promocode);
  if (promocode === "1234") {
    console.log("Correct promo code entered");
    promoApplied = true;
    displayCart(); // Update the total price display
    alert("Promo Code Applied!");
  } else {
    console.log("Incorrect promo code entered");
    promoApplied = false;
    displayCart(); // Update the total price display
    alert("Enter Correct Promo Code!");
  }
}

function displayCart() {
  console.log("Display Cart function called");
  let total = 0;
  if (selectedProduct) {
    total = selectedProduct.price;
    console.log("Product price:", total);
    if (promoApplied) {
      console.log("Promo code applied");
      total -= 50; // Apply promo code discount
      console.log("Total after discount:", total);
    }
  }

  document.getElementById("totalB").innerHTML = "TK " + total.toFixed(2);
}

// Function to reset promo code and related variables
function resetPromo() {
  promoApplied = false; // Reset promoApplied variable
  // Reset any other variables related to promo code if needed
}

// Function to handle course selection
function selectProduct(title) {
  selectedProduct = product.find((item) => item.title === title);
  resetPromo(); // Reset promo code when a new course is selected
  displayCart();
}
