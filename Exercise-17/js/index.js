import locationData from "../assets/locations.json" assert { type: "json" };

$(function () {
  $("#tabs").tabs();
});

$(function () {
  $("#accordion").accordion({
    active: true,
  });
});

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

/**
 * This function dynamically adds the location details to the location tab
 */
function addLocationDetails() {
  const TABLE = createCustomElement("<table>", { class: "location-table" });
  for (let location of locationData) {
    const ROW = $("<tr>");
    const IMAGE = createCustomElement("<img>", { src: `assets/images/${location.country}.png` });
    ROW.append(createCustomElement("<td>", {}, IMAGE));
    ROW.append(createCustomElement("<td>", {}, location.state));
    ROW.append(createCustomElement("<td>", {}, location.city));
    ROW.append(createCustomElement("<td>", {}, location.contact));
    TABLE.append(ROW);
  }
  $("#tabs-3").append(TABLE);
}

addLocationDetails();
