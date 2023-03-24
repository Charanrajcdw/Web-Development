document.getElementById("submitButton").addEventListener("click", (event) => {
  event.preventDefault();
  let count = 0;

  // input containers
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let email = document.getElementById("email");
  let contactNumber = document.getElementById("contactNumber");
  let pin = document.getElementById("pin");
  let cardNumber = document.getElementById("cardNumber");
  let expiryYear = document.getElementById("expiryYear");
  let cvv = document.getElementById("cvv");

  // warning containers
  let firstNameWarning = document.querySelector("#firstName + p.warning-message");
  let lastNameWarning = document.querySelector("#lastName + p.warning-message");
  let emailWarning = document.querySelector("#email + p.warning-message");
  let contactNumberWarning = document.querySelector("#contactNumber + p.warning-message");
  let pinWarning = document.querySelector("#pin + p.warning-message");
  let cardNumberWarning = document.querySelector("#cardNumber + p.warning-message");
  let expiryYearWarning = document.querySelector("#expiryYear + p.warning-message");
  let cvvWarning = document.querySelector("#cvv + p.warning-message");

  // first name validation
  if (firstName.value == "") {
    firstNameWarning.classList.remove("hide");
    firstNameWarning.innerText = "First Name is required";
    firstName.classList.add("red-box");
  } else if (!/^[a-zA-Z]{1,30}$/.test(firstName.value)) {
    firstNameWarning.classList.remove("hide");
    firstNameWarning.innerText = "First Name is not valid";
    firstName.classList.add("red-box");
  } else {
    firstNameWarning.classList.add("hide");
    firstName.classList.remove("red-box");
    count++;
  }

  // last name validation
  if (lastName.value == "") {
    lastNameWarning.classList.remove("hide");
    lastNameWarning.innerText = "Last Name is required";
    lastName.classList.add("red-box");
  } else if (!/^[a-zA-Z]{1,30}$/.test(lastName.value)) {
    lastNameWarning.classList.remove("hide");
    lastNameWarning.innerText = "Last Name is not valid";
    lastName.classList.add("red-box");
  } else {
    lastNameWarning.classList.add("hide");
    lastName.classList.remove("red-box");
    count++;
  }

  // email validation
  if (email.value == "") {
    emailWarning.classList.remove("hide");
    emailWarning.innerText = "Email is required";
    email.classList.add("red-box");
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    emailWarning.classList.remove("hide");
    emailWarning.innerText = "Email is not valid";
    email.classList.add("red-box");
  } else {
    emailWarning.classList.add("hide");
    email.classList.remove("red-box");
    count++;
  }

  // contact number validation
  if (contactNumber.value == "") {
    contactNumberWarning.classList.remove("hide");
    contactNumberWarning.innerText = "Contact Number is required";
    contactNumber.classList.add("red-box");
  } else if (!/^[0-9]{10}$/.test(contactNumber.value)) {
    contactNumberWarning.classList.remove("hide");
    contactNumberWarning.innerText = "Contact Number is not valid";
    contactNumber.classList.add("red-box");
  } else {
    contactNumberWarning.classList.add("hide");
    contactNumber.classList.remove("red-box");
    count++;
  }

  // pin number validation
  if (pin.value == "") {
    pinWarning.classList.remove("hide");
    pinWarning.innerText = "PIN Code is required";
    pin.classList.add("red-box");
  } else if (!/^[0-9]{6}$/.test(pin.value)) {
    pinWarning.classList.remove("hide");
    pinWarning.innerText = "PIN Code is not valid";
    pin.classList.add("red-box");
  } else {
    pinWarning.classList.add("hide");
    pin.classList.remove("red-box");
    count++;
  }

  // card number validation
  if (cardNumber.value == "") {
    cardNumberWarning.classList.remove("hide");
    cardNumberWarning.innerText = "Card Number is required";
    cardNumber.classList.add("red-box");
  } else if (!/^[0-9]{16}$/.test(cardNumber.value)) {
    cardNumberWarning.classList.remove("hide");
    cardNumberWarning.innerText = "Card Number is not valid";
    cardNumber.classList.add("red-box");
  } else {
    cardNumberWarning.classList.add("hide");
    cardNumber.classList.remove("red-box");
    count++;
  }

  // expiry year validation
  if (expiryYear.value == "") {
    expiryYearWarning.classList.remove("hide");
    expiryYearWarning.innerText = "Card Expiry is required";
    expiryYear.classList.add("red-box");
  } else if (!/^(?:20(?:2[3-9]|[3-9][0-9])|2[1-9][0-9][0-9]|[3-9][0-9][0-9][0-9])$/.test(expiryYear.value)) {
    expiryYearWarning.classList.remove("hide");
    expiryYearWarning.innerText = "Card Expiry is not valid";
    expiryYear.classList.add("red-box");
  } else {
    expiryYearWarning.classList.add("hide");
    expiryYear.classList.remove("red-box");
    count++;
  }

  // cvv number validation
  if (cvv.value == "") {
    cvvWarning.classList.remove("hide");
    cvvWarning.innerText = "CVV is required";
    cvv.classList.add("red-box");
  } else if (!/^[0-9]{3,4}$/.test(cvv.value)) {
    cvvWarning.classList.remove("hide");
    cvvWarning.innerText = "CVV is not valid";
    cvv.classList.add("red-box");
  } else {
    cvvWarning.classList.add("hide");
    cvv.classList.remove("red-box");
    count++;
  }

  // submit form if all validation passess
  if (count == 8) {
    document.getElementById("paymentForm").reset();
  }
});
