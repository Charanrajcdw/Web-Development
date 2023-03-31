import { addCardClickAction } from "./cardHelpers.js";

/**
 * This function helps to store the data in local storage
 *
 * @param {*} appCardsData - the data of the notes cards
 * @param {*} appLastCardID - the id of the next card to be created
 * @param {*} appCurrentColor - the color of the card last created
 */
export function setLocalData(appCardsData, appLastCardID, appCurrentColor) {
  localStorage.setItem(
    "notesData",
    JSON.stringify({
      cardsData: appCardsData,
      lastCardID: appLastCardID,
      currentColor: appCurrentColor,
    })
  );
}

/**
 * This functions helps to create a element with given attributes and innertext
 *
 * @param {String} tag - the element to create
 * @param {Object} attributes - the attributes of the element
 * @param {String|Object} content - the innertext or innerhtml of the element
 * @returns the created element
 */
export function createCustomElement(tag, attributes, content) {
  const element = $(tag);
  for (let attributeName in attributes) {
    element.attr(attributeName, attributes[attributeName]);
  }
  if (content) {
    typeof content === String ? element.text(content) : element.append(content);
  }
  return element;
}

/**
 * This function helps to add cards within specified range in cardsData object
 * @param {*} start - starting index of cardsData object
 * @param {*} end - ending index of cardsData object
 * @returns - a card fragment with all the specified cards added inside it
 */
export function addCardsHelper(cardsData, start, end) {
  const CARD_FRAGMENT = $(document.createDocumentFragment());
  for (let cardIterator = start; cardIterator < end; cardIterator++) {
    const TITLE = createCustomElement("<p>", {}, cardsData[cardIterator].cardTitle);
    const DATE = createCustomElement("<span>", {}, new Date(cardsData[cardIterator].dateCreated).toDateString().slice(4));
    let image;
    if (cardsData[cardIterator].cardImage) image = createCustomElement("<img>", { src: cardsData[cardIterator].cardImage });
    const CONTENT = createCustomElement("<p>", {}, cardsData[cardIterator].cardContent);
    const CARD = createCustomElement("<div>", { class: `card ${cardsData[cardIterator].color}`, id: `${cardsData[cardIterator].id}` });
    CARD.append(TITLE, DATE, image, CONTENT);
    CARD.click(() => addCardClickAction(cardsData, CARD));
    CARD_FRAGMENT.append(CARD);
  }
  return CARD_FRAGMENT;
}
