import { createGrid, setAllCellsToDefaultColor, hexToRgb, RgbToHex, setFillingMode, moveGridRight } from './grid.js';
import { colors, createColorGrid, setSelectedColor } from './colors.js'

createColorGrid();
createGrid();
setSelectedColor(15);
setAllCellsToDefaultColor();
setSelectedColor(0);
setFillingMode(0);

const outputTextBox = document.querySelector('#output');
const currentGridDiv = document.querySelector('#currentGrid');

const clearButton = document.querySelector('#clear');

// Clear button click event
clearButton.addEventListener('click', () => {
    const color = colors[15];
    const cells = document.querySelectorAll('#grid .cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = color;
    });

    outputTextBox.value = '';
});

const clearToColourButton = document.querySelector('#clearToColour');

// Fill button click event
clearToColourButton.addEventListener('click', () => {
    const selectedColorCell = document.querySelector('#color-grid .selected');
    const color = window.getComputedStyle(selectedColorCell).backgroundColor;
    const cells = document.querySelectorAll('#grid .cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = color;
    });

    outputTextBox.value = '';
});

const fillButton = document.querySelector('#fill');

// Fill button click event
fillButton.addEventListener('click', () => {
    setFillingMode(1);
});

const convertButton = document.querySelector('#convert');

// convert button click event
convertButton.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    let bytes = '';
    for (let i = 0; i < cells.length; i += 2) {
        const highNibble = colors.indexOf(RgbToHex(cells[i].style.backgroundColor)).toString(16).toUpperCase();
        const lowNibble = colors.indexOf(RgbToHex(cells[i + 1].style.backgroundColor)).toString(16).toUpperCase();
        const byte = "0x" + highNibble + lowNibble;
        bytes += byte;
    }

    const hexArray = bytes.match(/.{1,64}/g);
    let output = '';

    for (let i = 0; i < hexArray.length; i++) {
        const linePrefix = `Sprite1_${i + 1}:`.padEnd(14, ' ');
        output += linePrefix + 'DEFB      ' + hexArray[i].match(/.{1,4}/g).join(', ') + '\r\n';
    }

    console.log(output);
    outputTextBox.value = output;

});

const importButton = document.querySelector('#import');

importButton.addEventListener('click', () => {
    const hexValues = outputTextBox.value.match(/0x([0-9A-Fa-f]{2})/g);
    const cells = document.querySelectorAll('.cell');
    hexValues.forEach((hexValue, i) => {
        const highNibble = parseInt(hexValue.charAt(2), 16);
        const lowNibble = parseInt(hexValue.charAt(3), 16);
        const cellIndex = i * 2;
        cells[cellIndex].style.backgroundColor = colors[highNibble];
        cells[cellIndex + 1].style.backgroundColor = colors[lowNibble];
    });
});

// add event listeners to the next and previous buttons
const nextButton = document.querySelector('#nextButton');
const prevButton = document.querySelector('#prevButton');

let currentGridIndex = 0;

function createEmptyGrid() {
    const grid = [];
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        grid.push(15);
    }
    return grid;
}

let savedGrids = [createEmptyGrid(), createEmptyGrid(), createEmptyGrid(), createEmptyGrid(), createEmptyGrid(), createEmptyGrid(), createEmptyGrid(), createEmptyGrid(), createEmptyGrid(), createEmptyGrid(), createEmptyGrid(), createEmptyGrid(), createEmptyGrid(), createEmptyGrid(), createEmptyGrid(), createEmptyGrid()];

// save the current grid to the savedGrids array
function saveGrid() {
    const cells = document.querySelectorAll('.cell');
    const grid = [];
    for (let i = 0; i < cells.length; i++) {
        const colorIndex = colors.indexOf(RgbToHex(cells[i].style.backgroundColor));
        grid.push(colorIndex);
    }
    savedGrids[currentGridIndex] = grid;
}

// load the current grid from the savedGrids array
function loadGrid() {
    const grid = savedGrids[currentGridIndex];
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
      const colorIndex = grid[i];
      cells[i].style.backgroundColor = colors[colorIndex];
    }

    currentGridDiv.innerHTML = currentGridIndex;
  }

// go to the next grid
nextButton.addEventListener('click', () => {
    saveGrid(); // save the current grid before moving to the next one
    currentGridIndex = (currentGridIndex + 1) % savedGrids.length;
    loadGrid();
});

// go to the previous grid
prevButton.addEventListener('click', () => {
    saveGrid(); // save the current grid before moving to the previous one
    currentGridIndex = (currentGridIndex - 1 + savedGrids.length) % savedGrids.length;
    loadGrid();
});

const moveRightButton = document.querySelector('#moveRight');

// Move Right button click event
moveRightButton.addEventListener('click', () => {
    moveGridRight();
});