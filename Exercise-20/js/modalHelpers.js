import { createCustomElement } from "./helpers.js";

/**
 * This function helps to close all center modals
 */
export function centerModalCloser() {
  MODAL_BG.addClass("hide");
  CENTER_MODAL.addClass("hide");
  $("body").css("overflow", "auto");
  $("#centerModalHeaderContent").text();
}

/**
 * This function helps to open all center modals
 *
 * @param {String} headerText - the text to display in modal header
 * @param {String} contentText - the text to display in modal content area
 * @param {String} buttonValue - the value of the modal button
 * @param {String} buttonText - the text to display in modal button
 */
export function centerModalOpener(headerText, contentText, buttonValue, buttonText) {
  MODAL_BG.removeClass("hide");
  CENTER_MODAL.removeClass("hide");
  $("body").css("overflow", "hidden");
  $("#centerModalHeaderContent").text(headerText);
  $("#centerModalContent").html(createCustomElement("<p>", {}, contentText));
  MODAL_DELETE_BUTTON.attr("value", buttonValue);
  MODAL_DELETE_BUTTON.text(buttonText);
}

/**
 * This function helps to close all center modals
 */
export function sideModalCloser() {
  MODAL_BG.addClass("hide");
  SIDE_MODAL.addClass("hide");
  SIDE_MODAL.css("right", "-35%");
  $("body").css("overflow", "auto");
  $(MODAL_MODIFY_BUTTON).attr("disabled", "true");
}

/**
 * This function helps to open all center modals
 *
 * @param {String} headerText - the text to display in modal header
 * @param {String} buttonValue - the value of the modal button
 * @param {String} buttonText - the text to display in modal button
 */
export function sideModalOpener(headerText, buttonValue, buttonText) {
  MODAL_BG.removeClass("hide");
  SIDE_MODAL.removeClass("hide");
  SIDE_MODAL.animate({ right: "0" }, "slow");
  $("body").css("overflow", "hidden");
  $("#sideModalHeaderContent").text(headerText);
  MODAL_MODIFY_BUTTON.attr("value", buttonValue);
  MODAL_MODIFY_BUTTON.text(buttonText);
}

/**
 * This function helps to clear all the inputs
 */
export function clearInputs() {
  INPUT_TITLE.val("");
  INPUT_CONTENT.val("");
  $("#imageURL").val("");
  INPUT_TITLE.removeClass("warning-highlight");
  INPUT_TITLE.next().addClass("hide");
  INPUT_CONTENT.removeClass("warning-highlight");
  INPUT_CONTENT.next().addClass("hide");
}
