import { setLocalData, createCustomElement, addCardsHelper } from "./helpers.js";
import { centerModalOpener, centerModalCloser, clearInputs, sideModalOpener, sideModalCloser } from "./modalHelpers.js";
import { addCardsToHome, goBack } from "./cardHelpers.js";
import { validate } from "./input.js";

if (localStorage.getItem("notesData") === null) {
  setLocalData([], 0, "color-pink");
}
let { cardsData, lastCardID, currentColor } = JSON.parse(localStorage.getItem("notesData"));
$(`#${currentColor}`).html(createCustomElement("<i>", { class: "fa-solid fa-check" }));

// common button event listeners
LOAD_MORE_BUTTON.click(() => {
  const CURRENT_CARDS_COUNT = $(".card").length;
  const END =
    CURRENT_CARDS_COUNT +
    (cardsData.length - CURRENT_CARDS_COUNT >= CARD_DISPLAY_COUNT ? CARD_DISPLAY_COUNT : cardsData.length - CURRENT_CARDS_COUNT);
  CARDS_CONTAINER.append(addCardsHelper(cardsData, CURRENT_CARDS_COUNT, END));
  if (cardsData.length == $(".card").length) LOAD_MORE_BUTTON.addClass("hide");
});

BACK_BUTTON.click(() => {
  goBack();
  cardsData.length != $(".card").length ? LOAD_MORE_BUTTON.removeClass("hide") : LOAD_MORE_BUTTON.addClass("hide");
});

// center modal button event listeners
CENTER_MODAL_CLOSE_BUTTON.click(() => {
  if (MODAL_DELETE_BUTTON.val() !== "close") {
    centerModalCloser();
  } else {
    CENTER_MODAL.addClass("hide");
    SIDE_MODAL.removeClass("hide");
    SIDE_MODAL.css("right", "0");
  }
});

DELETE_ALL_BUTTON.click(() => {
  centerModalOpener("CONFIRM DELETE", "Are you sure want to delete all notes?", "deleteAll", "YES, DELETE");
});

DELETE_BUTTON.click(() => {
  centerModalOpener("CONFIRM DELETE", "Are you sure want to delete all notes?", "delete", "YES, DELETE");
});

MODAL_DELETE_BUTTON.click(function () {
  const DELETE_TYPE = $(this).val();
  if (DELETE_TYPE === "delete") {
    cardsData = cardsData.filter((card) => card.id !== currentCard);
    CARDS_CONTAINER.html("");
    goBack();
    cardsData.length != $(".card").length ? LOAD_MORE_BUTTON.removeClass("hide") : LOAD_MORE_BUTTON.addClass("hide");
    addCardsToHome(cardsData);
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
  setLocalData(cardsData, lastCardID, currentColor);
  centerModalCloser();
});

// input form event listeners
INPUT_TITLE.on("keyup", () => validate());
INPUT_CONTENT.on("keyup", () => validate());

Array.from(COLOR_ICONS).forEach((color) => {
  $(color).click(function () {
    const CURRENT_COLOR = $(`#${currentColor}`);
    if (currentColor !== $(color).attr("id")) {
      currentColor = $(color).attr("id");
      $(color).html(CURRENT_COLOR.html());
      CURRENT_COLOR.html("");
    }
  });
});

//side modal button event listeners
SIDE_MODAL_CLOSE_BUTTON.click(() => {
  centerModalOpener("CONFIRM", "Seems like you are in the middle of adding/editing content. Do you want to leave?", "close", "YES, CLOSE");
  SIDE_MODAL.addClass("hide");
  SIDE_MODAL.css("right", "-35%");
});

INSERT_BUTTON.click(() => {
  sideModalOpener("NEW NOTE", "add", "ADD");
});

EDIT_BUTTON.click(() => {
  const CARD_DATA = cardsData.find((card) => card.id === currentCard);
  sideModalOpener("EDIT NOTE", "edit", "SAVE");
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
    cardsData.length != $(".card").length ? LOAD_MORE_BUTTON.removeClass("hide") : LOAD_MORE_BUTTON.addClass("hide");
    $(MODAL_MODIFY_BUTTON).attr("disabled", "disabled");
  }
  cardsData.unshift(noteObject);
  setLocalData(cardsData, lastCardID, currentColor);
  CARDS_CONTAINER.html("");
  addCardsToHome(cardsData);
  clearInputs();
  sideModalCloser();
});

addCardsToHome(cardsData);
