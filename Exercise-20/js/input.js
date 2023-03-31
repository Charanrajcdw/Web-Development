//input data
const inputValidationData = {
  noteTitle: {
    required: "Note Title is required",
    validation: "Title is too long, try to give within 100 characters",
    regex: /^[\w\s]{1,100}$/,
  },
  noteContent: {
    required: "Note Content is required",
    validation: "Note Content is not valid",
    regex: /^[\S\s]+$/,
  },
};

/**
 * This object will validate whether given input is valid or not
 *
 * @param {Object} input -  an input object to validate it
 * @returns Boolean value of whether input is valid or not
 */
function validateInput(input) {
  const elementId = input[0].id;
  const nextSibling = input[0].nextElementSibling;
  if (input[0].value === "") {
    nextSibling.classList.remove("hide");
    nextSibling.innerText = inputValidationData[elementId].required;
    input.addClass("warning-highlight");
    return false;
  } else if (!inputValidationData[elementId].regex.test(input[0].value)) {
    nextSibling.classList.remove("hide");
    nextSibling.innerText = inputValidationData[elementId].validation;
    input.addClass("warning-highlight");
    return false;
  } else {
    nextSibling.classList.add("hide");
    input.removeClass("warning-highlight");
    return true;
  }
}

/**
 * This function validates the form
 */
export function validate() {
  const isNameValid = validateInput(INPUT_TITLE);
  const isContentValid = validateInput(INPUT_CONTENT);
  if (isNameValid && isContentValid) $(MODAL_MODIFY_BUTTON).removeAttr("disabled");
  else $(MODAL_MODIFY_BUTTON).attr("disabled", "true");
}
