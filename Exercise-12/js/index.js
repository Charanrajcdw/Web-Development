// application data

const shapesData = {
  circle: {
    inputText: "2. Enter Radius",
    name: "Circle",
    value: "r",
    areaFormula: "&pi;r<sup>2</sup>",
    perimeterFormula: "2&pi;r",
    getArea: (value) => 3.14 * value * value,
    getPerimeter: (value) => 2 * 3.14 * value,
  },
  triangle: {
    inputText: "2. Enter Side (Base & Height)",
    name: "Equilateral Triangle",
    value: "s",
    areaFormula: "0.433 * s * s",
    perimeterFormula: "3 * s",
    getArea: (value) => 0.433 * value * value,
    getPerimeter: (value) => 3 * value,
  },
  square: {
    inputText: "2. Enter Side",
    name: "Square",
    value: "s",
    areaFormula: "s * s",
    perimeterFormula: "4 * s",
    getArea: (value) => value * value,
    getPerimeter: (value) => 4 * value,
  },
};

const shapeDataObject = {
  selectedShape: "",
  shapeValue: 0,
  currentLayer: 0,
};

const shapeLayer = document.querySelector("#shapeLayer");
const inputLayer = document.querySelector("#inputLayer");
const outputLayer = document.querySelector("#outputLayer");
const resultTableRows = document.querySelector("#outputTable").children[0].children;

if (localStorage.getItem("shapeData") != null) {
  Object.assign(shapeDataObject, JSON.parse(localStorage.getItem("shapeData")));
}

if (shapeDataObject.currentLayer == 0) {
  shapeLayer.classList.remove("hide");
} else if (shapeDataObject.currentLayer == 1) {
  setInputLayerData();
} else {
  setOutputLayerData();
}

// shape layer operations

const shapes = document.querySelectorAll(".shape");
const ticks = document.querySelectorAll(".tick-icon");
const nextButton = document.querySelector("#nextButton");

Array.from(shapes).forEach((shape) => {
  // to display and hide ticks
  shape.addEventListener("click", (event) => {
    let shapeID = event.target.getAttribute("id");
    shapeDataObject.selectedShape = shapeID;
    ticks.forEach((tick) => {
      tick.classList.add("hide");
    });
    event.target.children[0].classList.remove("hide");
    nextButton.classList.remove("hide");
  });
});

/**
 * to dynamically add data to input page
 */
function setInputLayerData() {
  document.querySelector("#inputText").innerText = shapesData[shapeDataObject["selectedShape"]]["inputText"];
  inputLayer.classList.remove("hide");
}

nextButton.addEventListener("click", () => {
  shapeLayer.classList.add("hide");
  ticks.forEach((tick) => {
    tick.classList.add("hide");
  });
  nextButton.classList.add("hide");
  shapeDataObject.currentLayer = 1;
  localStorage.setItem("shapeData", JSON.stringify(shapeDataObject));
  setInputLayerData();
});

// input layer operations

const calculateButton = document.querySelector("#calculateButton");
const inputField = document.querySelector("#inputNumber");

/**
 * to dynamically add data to output page
 */
function setOutputLayerData() {
  document.querySelector("#shapeContainer").children[0].className = shapeDataObject["selectedShape"];
  const shapeData = shapesData[shapeDataObject["selectedShape"]];
  document.querySelector("#shapeName").innerText = shapeData["name"];
  resultTableRows[0].children[1].innerHTML = shapeData["value"];
  resultTableRows[1].children[1].innerHTML = shapeData["areaFormula"];
  resultTableRows[2].children[1].innerHTML = shapeData["perimeterFormula"];
  const shapeValue = shapeDataObject["shapeValue"];
  resultTableRows[0].children[2].innerText = shapeValue + " cm";
  resultTableRows[1].children[2].innerText = shapeData.getArea(shapeValue).toFixed(2) + " sq cm";
  resultTableRows[2].children[2].innerText = shapeData.getPerimeter(shapeValue).toFixed(2) + " cm";
  outputLayer.classList.remove("hide");
}

calculateButton.addEventListener("click", () => {
  if (inputField.value == "") {
    window.alert("Enter a value!!!");
  } else {
    shapeDataObject.shapeValue = inputField.value;
    inputField.value = "";
    inputLayer.classList.add("hide");
    shapeDataObject.currentLayer = 2;
    localStorage.setItem("shapeData", JSON.stringify(shapeDataObject));
    setOutputLayerData(shapeDataObject);
  }
});

//ouput layer operations

const startButton = document.querySelector("#startButton");

startButton.addEventListener("click", () => {
  shapeDataObject.selectedShape = "";
  shapeDataObject.shapeValue = "";
  shapeDataObject.currentLayer = 0;
  outputLayer.classList.add("hide");
  localStorage.removeItem("shapeData");
  shapeLayer.classList.remove("hide");
});
