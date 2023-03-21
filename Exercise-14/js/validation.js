const inputMessages = {
  firstName: {
    required: "First Name is required",
    validation: "First Name is not valid",
    regex: /^[a-zA-Z]{1,30}$/,
  },
  lastName: {
    required: "Last Name is required",
    validation: "Last Name is not valid",
    regex: /^[a-zA-Z]{1,30}$/,
  },
  email: {
    required: "Email is required",
    validation: "Email is not valid",
    regex: /^\S+@\S+\.\S+$/,
  },
  contactNumber: {
    required: "Contact Number is required",
    validation: "Contact Number is not valid",
    regex: /^[0-9]{10}$/,
  },
  pin: {
    required: "PIN Code is required",
    validation: "PIN Code is not valid",
    regex: /^[0-9]{6}$/,
  },
  cardNumber: {
    required: "Card Number is required",
    validation: "Card Number is not valid",
    regex: /^[0-9]{16}$/,
  },
  expiryYear: {
    required: "Card Expiry is required",
    validation: "Card Expiry is not valid",
    regex: /^(?:20(?:2[3-9]|[3-9][0-9])|2[1-9][0-9][0-9]|[3-9][0-9][0-9][0-9])$/,
  },
  cvv: {
    required: "CVV is required",
    validation: "CVV is not valid",
    regex: /^[0-9]{3,4}$/,
  },
};

const form = document.getElementById("paymentForm");
const inputs = document.querySelectorAll("input");

document.getElementById("submitButton").addEventListener("click", (event) => {
  event.preventDefault();
  let count = 0;

  //input field validation
  for (let input of inputs) {
    var elementId = input.id;
    var nextSibling = input.nextElementSibling;
    if (input.value == "") {
      nextSibling.classList.remove("hide");
      nextSibling.innerText = inputMessages[elementId].required;
      input.classList.add("red-box");
    } else if (!inputMessages[elementId].regex.test(input.value)) {
      nextSibling.classList.remove("hide");
      nextSibling.innerText = inputMessages[elementId].validation;
      input.classList.add("red-box");
    } else {
      nextSibling.classList.add("hide");
      input.classList.remove("red-box");
      count++;
    }
  }

  // submit form if all validation passess
  if (count == 8) {
    form.reset();
  }
});
