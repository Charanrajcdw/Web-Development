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
 * This function dynamically adds the location details to the location tab
 */
function addLocationDetails() {
  const TABLE = $("<table>");
  TABLE.addClass("location-table");
  for (let location of locationData) {
    //creating rows and columns
    const ROW = $("<tr>");
    const IMAGE_COLUMN = $("<td>");
    const STATE_COLUMN = $("<td>");
    const CITY_COLUMN = $("<td>");
    const LOCATION_COLUMN = $("<td>");

    //adding image to row
    const IMAGE = $("<img>");
    IMAGE.attr("src", `assets/images/${location.country}.png`);
    IMAGE_COLUMN.append(IMAGE);
    ROW.append(IMAGE_COLUMN);

    //adding location details to row
    STATE_COLUMN.text(location.state);
    ROW.append(STATE_COLUMN);
    CITY_COLUMN.text(location.city);
    ROW.append(CITY_COLUMN);
    LOCATION_COLUMN.text(location.contact);
    ROW.append(LOCATION_COLUMN);

    //adding row to table
    TABLE.append(ROW);
  }

  $("#tabs-3").append(TABLE);
}

addLocationDetails();
