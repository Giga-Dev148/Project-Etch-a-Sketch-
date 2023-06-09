const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.querySelector(".color_mode");
const rainbowBtn = document.querySelector(".rainbow_mode");
const eraserBtn = document.querySelector(".eraser");
const clearBtn = document.querySelector(".clear");
const sizeValue = document.querySelector("#sizeValue");
const sizeSlider = document.querySelector("#range");
const grid = document.querySelector(".board");

colorPicker.addEventListener("input", (e) => {
  setCurrentColor(e.target.value);
});

colorBtn.addEventListener("click", () => {
  setCurrentMode("color");
});

rainbowBtn.addEventListener("click", () => {
  setCurrentMode("rainbow");
});

eraserBtn.addEventListener("click", () => {
  setCurrentMode("eraser");
});

clearBtn.addEventListener("click", () => {
  reloadGrid();
});

sizeSlider.addEventListener("input", (e) => {
  updateSizeValue(e.target.value);
});

sizeSlider.addEventListener("mouseup", (e) => {
  changeSize(e.target.value);
});

sizeSlider.addEventListener("change", (e) => {
  changeSize(e.target.value);
});

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} X ${value}`;
}

function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

function clearGrid() {
  grid.innerHTML = "";
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.style.backgroundColor = "#fff";
    gridElement.addEventListener("mouseover", changeColor);
    gridElement.addEventListener("mousedown", changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
}

function activateButton(newMode) {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

// Firefox fix for not resetting scrollbar ball
window.addEventListener("load", function () {
  const rangeInput = document.getElementById("range");
  rangeInput.value = rangeInput.getAttribute("value");
});

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};
