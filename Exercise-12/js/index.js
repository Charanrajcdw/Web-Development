// application data

const shapeInputs = {
  circle: "2. Enter Radius",
  triangle: "2. Enter Side (Base & Height)",
  square: "2. Enter Side",
};

const shapeFormulas = {
  circle: {
    0: "Circle",
    1: "r",
    2: "&pi;r<sup>2</sup>",
    3: "2&pi;r",
    getArea: (value) => 3.14 * value * value,
    getPerimeter: (value) => 2 * 3.14 * value,
  },
  triangle: {
    0: "Equilateral Triangle",
    1: "s",
    2: "0.433 <sup>*</sup> s <sup>*</sup> s",
    3: "3 <sup>*</sup> s",
    getArea: (value) => 0.433 * value * value,
    getPerimeter: (value) => 3 * value,
  },
  square: {
    0: "Square",
    1: "s",
    2: "s <sup>*</sup> s",
    3: "4 <sup>*</sup> s",
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
  shapeDataObject = JSON.parse(localStorage.getItem("shapeData"));
}

if (shapeDataObject.currentLayer == 0) {
  shapeLayer.style.display = "flex";
} else if (shapeDataObject.currentLayer == 1) {
  setInputLayerData();
} else {
  setOutputLayerData();
}

// shape layer operations

const shapes = document.querySelectorAll(".shape");
const ticks = document.querySelectorAll(".tick-icon");
const tickOnCircle = ticks[0];
const tickOnTriangle = ticks[1];
const tickOnSquare = ticks[2];
const nextButton = document.querySelector("#nextButton");

Array.from(shapes).forEach((shape) => {
  shape.addEventListener("click", (event) => {
    shapeID = event.target.getAttribute("id");
    shapeDataObject.selectedShape = shapeID;
    tickOnCircle.style.display = "none";
    tickOnTriangle.style.display = "none";
    tickOnSquare.style.display = "none";
    document.getElementById(shapeID).children[0].style.display = "block";
    nextButton.style.display = "block";
  });
});

function setInputLayerData() {
  document.querySelector("#inputText").innerText = shapeInputs[shapeDataObject["selectedShape"]];
  inputLayer.style.display = "flex";
}

nextButton.addEventListener("click", () => {
  shapeLayer.style.display = "none";
  tickOnCircle.style.display = "none";
  tickOnTriangle.style.display = "none";
  tickOnSquare.style.display = "none";
  nextButton.style.display = "none";
  shapeDataObject.currentLayer = 1;
  localStorage.setItem("shapeData", JSON.stringify(shapeDataObject));
  setInputLayerData();
});

// input layer operations

const calculateButton = document.querySelector("#calculateButton");
const inputField = document.querySelector("#inputNumber");

function setOutputLayerData() {
  document.querySelector("#shapeContainer").children[0].className = shapeDataObject["selectedShape"];
  const shapeData = shapeFormulas[shapeDataObject["selectedShape"]];
  document.querySelector("#shapeName").innerText = shapeData[0];
  let dataCount = 1;
  Array.from(resultTableRows).forEach((row) => {
    row.children[1].innerHTML = shapeData[dataCount++];
  });
  const shapeValue = shapeDataObject["shapeValue"];
  resultTableRows[0].children[2].innerText = shapeValue + " cm";
  resultTableRows[1].children[2].innerText = shapeData.getArea(shapeValue).toFixed(2) + " sq cm";
  resultTableRows[2].children[2].innerText = shapeData.getPerimeter(shapeValue).toFixed(2) + " cm";
  outputLayer.style.display = "flex";
}

calculateButton.addEventListener("click", () => {
  if (inputField.value == "") {
    window.alert("Enter a value!!!");
  } else {
    shapeDataObject.shapeValue = inputField.value;
    inputField.value = "";
    inputLayer.style.display = "none";
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
  outputLayer.style.display = "none";
  localStorage.removeItem("shapeData");
  shapeLayer.style.display = "flex";
});
