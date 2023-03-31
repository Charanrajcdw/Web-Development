import { addCardsHelper, createCustomElement } from "./helpers.js";

/**
 * This function adds click event to cards, to open the card in full page on clicking a card
 */
export function addCardClickAction(cardsData, card) {
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

/**
 * This function dynamically adds the note cards to the main container
 */
export function addCardsToHome(cardsData) {
  if (cardsData.length == 0) {
    EMPTY_CONTAINER.removeClass("hide");
    DELETE_ALL_BUTTON.addClass("hide");
  } else {
    CARDS_CONTAINER.removeClass("hide");
    const CARDS_LENGTH = cardsData.length >= CARD_DISPLAY_COUNT ? CARD_DISPLAY_COUNT : cardsData.length;
    CARDS_CONTAINER.append(addCardsHelper(cardsData, 0, CARDS_LENGTH));
    cardsData.length != $(".card").length ? LOAD_MORE_BUTTON.removeClass("hide") : LOAD_MORE_BUTTON.addClass("hide");
  }
}

/**
 * This function clears all data in CardContainer and goes to home page
 */
export function goBack() {
  CARD_CONTAINER.addClass("hide");
  BACK_BUTTON.addClass("hide");
  CARDS_CONTAINER.removeClass("hide");
  DELETE_BUTTON.addClass("hide");
  EDIT_BUTTON.addClass("hide");
  DELETE_ALL_BUTTON.removeClass("hide");
  INSERT_BUTTON.removeClass("hide");
  CARD_CONTAINER.html("");
}
