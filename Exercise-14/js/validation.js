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
    regex: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  },
  contactNumber: {
    required: "Contact Number is required",
    validation: "Contact Number is not valid",
    regex: /^[6-9][0-9]{9}$/,
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

/**
 * This object will validate whether given input is valid or not
 * 
 * @param {Object} input -  an input object to validate it
 * @returns boolean value of whether input is valid or not
 */
function validateInput(input) {
  const elementId = input.id;
  const nextSibling = input.nextElementSibling;
  if (input.value == "") {
    nextSibling.classList.remove("hide");
    nextSibling.innerText = inputMessages[elementId].required;
    input.classList.add("warning-highlight");
    return false;
  } else if (!inputMessages[elementId].regex.test(input.value)) {
    nextSibling.classList.remove("hide");
    nextSibling.innerText = inputMessages[elementId].validation;
    input.classList.add("warning-highlight");
    return false;
  } else {
    nextSibling.classList.add("hide");
    input.classList.remove("warning-highlight");
    return true;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isFormValid = true;
  //input field validation
  for (let input of inputs) {
    const validationValue = validateInput(input);
    isFormValid = isFormValid ? validationValue : false;
  }

  // submit form if all validation passess
  if (isFormValid) {
    form.reset();
  }
});

Array.from(inputs).forEach((input) => input.addEventListener("change", () => validateInput(input)));
