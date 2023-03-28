let cardsData = [];
let currentCard;
let lastCardID = 0;
let currentColor = "color-pink";

/**
 * This functions helps to create a element with given attributes and innertext
 *
 * @param {String} tag - the element to create
 * @param {Object} attributes - the attributes of the element
 * @param {String|Object} content - the innertext or innerhtml of the element
 * @returns the created element
 */
function createCustomElement(tag, attributes, content) {
  const element = $(tag);
  for (let attributeName in attributes) {
    element.attr(attributeName, attributes[attributeName]);
  }
  if (content) {
    typeof content === String ? element.text(content) : element.append(content);
  }
  return element;
}

//containers
const EMPTY_CONTAINER = $("#emptyContainer");
const CARD_CONTAINER = $("#cardContainer");
const CARDS_CONTAINER = $("#cardsContainer");

//buttons
const LOAD_MORE_BUTTON = $("#loadMoreButton");
const BACK_BUTTON = $("#backButton");
const DELETE_BUTTON = $("#delete");
const DELETE_ALL_BUTTON = $("#deleteAll");
const INSERT_BUTTON = $("#insert");
const EDIT_BUTTON = $("#edit");
const CENTER_MODAL_CLOSE_BUTTON = $(".centerModalClose");
const SIDE_MODAL_CLOSE_BUTTON = $(".sideModalClose");
const MODAL_DELETE_BUTTON = $("#deleteButton");
const MODAL_MODIFY_BUTTON = $("#modifyButton");

//modals
const SIDE_MODAL = $("#sideModal");
const CENTER_MODAL = $("#centerModal");
const MODAL_BG = $("#modalBg");

//inputs
const INPUT_TITLE = $("#noteTitle");
const INPUT_CONTENT = $("#noteContent");
const COLOR_ICONS = $(".modal-color-icon");

//button event listeners
LOAD_MORE_BUTTON.click(() => {
  const CURRENT_CARDS_COUNT = $(".card").length;
  const END = CURRENT_CARDS_COUNT + (cardsData.length - CURRENT_CARDS_COUNT >= 10 ? 10 : cardsData.length - CURRENT_CARDS_COUNT);
  CARDS_CONTAINER.append(addCardsHelper(CURRENT_CARDS_COUNT, END));
  if (cardsData.length == $(".card").length) LOAD_MORE_BUTTON.addClass("hide");
});

/**
 * This function clears all data in CardContainer and goes to home page
 */
function goBack() {
  CARD_CONTAINER.addClass("hide");
  BACK_BUTTON.addClass("hide");
  CARDS_CONTAINER.removeClass("hide");
  DELETE_BUTTON.addClass("hide");
  EDIT_BUTTON.addClass("hide");
  DELETE_ALL_BUTTON.removeClass("hide");
  INSERT_BUTTON.removeClass("hide");
  CARD_CONTAINER.html("");
  cardsData.length != $(".card").length ? LOAD_MORE_BUTTON.removeClass("hide") : LOAD_MORE_BUTTON.addClass("hide");
}

BACK_BUTTON.click(() => goBack());

/**
 * This function helps to close all center modals
 */
function centerModalCloser() {
  MODAL_BG.addClass("hide");
  CENTER_MODAL.addClass("hide");
  $("body").css("overflow", "auto");
}
CENTER_MODAL_CLOSE_BUTTON.click(() => {
  if (MODAL_DELETE_BUTTON.val() !== "close") {
    centerModalCloser();
  } else {
    CENTER_MODAL.addClass("hide");
    SIDE_MODAL.removeClass("hide");
  }
});

DELETE_ALL_BUTTON.click(() => {
  MODAL_BG.removeClass("hide");
  CENTER_MODAL.removeClass("hide");
  $("body").css("overflow", "hidden");
  $("#centerModalHeaderContent").text("CONFIRM DELETE");
  $("#centerModalContent").html(createCustomElement("<p>", {}, "Are you sure want to delete all notes?"));
  MODAL_DELETE_BUTTON.attr("value", "deleteAll");
  MODAL_DELETE_BUTTON.text("YES, DELETE");
});

DELETE_BUTTON.click(() => {
  MODAL_BG.removeClass("hide");
  CENTER_MODAL.removeClass("hide");
  $("body").css("overflow", "hidden");
  $("#centerModalHeaderContent").text("CONFIRM DELETE");
  $("#centerModalContent").html(createCustomElement("<p>", {}, "Are you sure want to delete this note?"));
  MODAL_DELETE_BUTTON.attr("value", "delete");
  MODAL_DELETE_BUTTON.text("YES, DELETE");
});

/**
 * This function helps to clear all the inputs
 */
function clearInputs() {
  INPUT_TITLE.val("");
  INPUT_CONTENT.val("");
  $("#imageURL").val("");
  INPUT_TITLE.removeClass("warning-highlight");
  INPUT_TITLE.next().addClass("hide");
  INPUT_CONTENT.removeClass("warning-highlight");
  INPUT_CONTENT.next().addClass("hide");
}

MODAL_DELETE_BUTTON.click(function () {
  const DELETE_TYPE = $(this).val();
  if (DELETE_TYPE === "delete") {
    cardsData = cardsData.filter((card) => card.id !== currentCard);
    CARDS_CONTAINER.html("");
    goBack();
    addCardsToHome();
  } else if (DELETE_TYPE === "deleteAll") {
    cardsData = [];
    CARDS_CONTAINER.addClass("hide");
    LOAD_MORE_BUTTON.addClass("hide");
    DELETE_ALL_BUTTON.addClass("hide");
    CARDS_CONTAINER.html("");
    EMPTY_CONTAINER.removeClass("hide");
  } else {
    clearInputs();
  }
  centerModalCloser();
});

//input data
const inputValidationData = {
  noteTitle: {
    required: "Note Title is required",
    validation: "Note Title is not valid",
    regex: /^.{1,100}$/,
  },
  noteContent: {
    required: "Note Content is required",
    validation: "Note Content is not valid",
    regex: /^.{1,300}$/,
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
function validate() {
  const isNameValid = validateInput(INPUT_TITLE);
  const isContentValid = validateInput(INPUT_CONTENT);
  if (isNameValid && isContentValid) $(MODAL_MODIFY_BUTTON).removeAttr("disabled");
  else $(MODAL_MODIFY_BUTTON).attr("disabled", "true");
}

INPUT_TITLE.change(() => validate());
INPUT_CONTENT.change(() => validate());

Array.from(COLOR_ICONS).forEach((color) => {
  $(color).click(() => {
    const CURRENT_COLOR = $(`#${currentColor}`);
    if (currentColor !== $(color).attr("id")) {
      currentColor = $(color).attr("id");
      $(color).html(CURRENT_COLOR.html());
      CURRENT_COLOR.html("");
    }
  });
});

/**
 * This function helps to close all center modals
 */
function sideModalCloser() {
  MODAL_BG.addClass("hide");
  SIDE_MODAL.addClass("hide");
  $("body").css("overflow", "auto");
}
SIDE_MODAL_CLOSE_BUTTON.click(() => {
  SIDE_MODAL.addClass("hide");
  CENTER_MODAL.removeClass("hide");
  $("body").css("overflow", "hidden");
  $("#centerModalHeaderContent").text("CONFIRM");
  $("#centerModalContent").html(createCustomElement("<p>", {}, "Seems like you are in the middle of adding/editing content. Do you want to leave?"));
  MODAL_DELETE_BUTTON.attr("value", "close");
  MODAL_DELETE_BUTTON.text("YES, CLOSE");
});

INSERT_BUTTON.click(() => {
  MODAL_BG.removeClass("hide");
  SIDE_MODAL.removeClass("hide");
  $("body").css("overflow", "hidden");
  $("#sideModalHeaderContent").text("NEW NOTE");
  MODAL_MODIFY_BUTTON.attr("value", "add");
  MODAL_MODIFY_BUTTON.text("ADD");
});

EDIT_BUTTON.click(() => {
  const CARD_DATA = cardsData.find((card) => card.id === currentCard);
  MODAL_BG.removeClass("hide");
  SIDE_MODAL.removeClass("hide");
  $("body").css("overflow", "hidden");
  $("#sideModalHeaderContent").text("EDIT NOTE");
  MODAL_MODIFY_BUTTON.attr("value", "edit");
  MODAL_MODIFY_BUTTON.text("EDIT");
  $(MODAL_MODIFY_BUTTON).removeAttr("disabled");
  INPUT_TITLE.val(CARD_DATA.cardTitle);
  $("#imageURL").val(CARD_DATA.cardImage);
  INPUT_CONTENT.val(CARD_DATA.cardContent.trim());
  const CURRENT_COLOR = $(`#${currentColor}`);
  if (currentColor !== CARD_DATA.color) {
    currentColor = CARD_DATA.color;
    $(`#${currentColor}`).html(CURRENT_COLOR.html());
    CURRENT_COLOR.html("");
  }
});

MODAL_MODIFY_BUTTON.click(function () {
  const INSERT_TYPE = $(this).val();
  const noteObject = {};
  noteObject.cardTitle = INPUT_TITLE.val();
  noteObject.cardImage = $("#imageURL").val();
  noteObject.cardContent = INPUT_CONTENT.val();
  noteObject.color = currentColor;
  noteObject.dateCreated = new Date();
  if (INSERT_TYPE === "add") {
    if (cardsData.length == 0) {
      EMPTY_CONTAINER.addClass("hide");
      DELETE_ALL_BUTTON.removeClass("hide");
    }
    noteObject.id = lastCardID;
    lastCardID += 1;
  } else {
    noteObject.id = currentCard;
    cardsData = cardsData.filter((card) => card.id !== currentCard);
    goBack();
  }
  cardsData.unshift(noteObject);
  CARDS_CONTAINER.html("");
  addCardsToHome();
  clearInputs();
  sideModalCloser();
});

/**
 * This function helps to add cards within specified range in cardsData object
 * @param {*} start - starting index of cardsData object
 * @param {*} end - ending index of cardsData object
 * @returns - a card fragment with all the specified cards added inside it
 */
function addCardsHelper(start, end) {
  const CARD_FRAGMENT = $(document.createDocumentFragment());
  for (let cardIterator = start; cardIterator < end; cardIterator++) {
    const TITLE = createCustomElement("<p>", {}, cardsData[cardIterator].cardTitle);
    const DATE = createCustomElement("<span>", {}, cardsData[cardIterator].dateCreated.toDateString().slice(4));
    let image;
    if (cardsData[cardIterator].cardImage) image = createCustomElement("<img>", { src: cardsData[cardIterator].cardImage });
    const CONTENT = createCustomElement("<p>", {}, cardsData[cardIterator].cardContent);
    const CARD = createCustomElement("<div>", { class: `card ${cardsData[cardIterator].color}`, id: `${cardsData[cardIterator].id}` });
    CARD.append(TITLE, DATE, image, CONTENT);
    CARD.click(() => addCardClickAction(CARD));
    CARD_FRAGMENT.append(CARD);
  }
  return CARD_FRAGMENT;
}

/**
 * This function dynamically adds the note cards to the main container
 */
function addCardsToHome() {
  if (cardsData.length == 0) {
    EMPTY_CONTAINER.removeClass("hide");
    DELETE_ALL_BUTTON.addClass("hide");
  } else {
    CARDS_CONTAINER.removeClass("hide");
    const CARDS_LENGTH = cardsData.length >= 10 ? 10 : cardsData.length;
    CARDS_CONTAINER.append(addCardsHelper(0, CARDS_LENGTH));
    console.log(cardsData.length, $(".card").length);
    cardsData.length != $(".card").length ? LOAD_MORE_BUTTON.removeClass("hide") : LOAD_MORE_BUTTON.addClass("hide");
  }
}

/**
 * This function adds click event to cards, to open the card in full page on clicking a card
 */
function addCardClickAction(card) {
  CARDS_CONTAINER.addClass("hide");
  LOAD_MORE_BUTTON.addClass("hide");
  CARD_CONTAINER.removeClass("hide");
  BACK_BUTTON.removeClass("hide");
  DELETE_ALL_BUTTON.addClass("hide");
  INSERT_BUTTON.addClass("hide");
  DELETE_BUTTON.removeClass("hide");
  EDIT_BUTTON.removeClass("hide");
  const COLOR_ICON = createCustomElement("<div>", { class: `color-icon ${card[0].classList[card[0].classList.length - 1]}` });
  const CARD = createCustomElement("<div>", { class: "card" }, COLOR_ICON);
  CARD.append($(card).html());
  CARD_CONTAINER.append(CARD);
  const CARD_ID = $(card)[0].id;
  currentCard = cardsData.find((cardData) => cardData.id == CARD_ID).id;
}

addCardsToHome();
