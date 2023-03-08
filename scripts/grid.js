import { colors } from './colors.js';

let savedGrids = [];

const fillButton = document.querySelector('#fill');
var fillingMode = 0;

/**
 * Move the Grid to the Right
 */
function moveGridLeft() {

    saveGrid();

    // shift the values in each row to the right
    const grid = savedGrids[currentGridIndex];

    // shift the color values of each cell to the left
    for (let i = 0; i < grid.length; i++) {
        const row = Math.floor(i / 32);
        const col = i % 32;
        // shift the other cells to the left
        const index = row * 32 + col;
        grid[index - 1] = grid[index];
    }

    loadGrid();
}

function moveGridRight() {
    saveGrid();

    // shift the values in each row to the right
    const grid = savedGrids[currentGridIndex];

    // shift the color values of each cell to the right
    for (let i = grid.length - 1; i >= 0; i--) {
        const row = Math.floor(i / 32);
        const col = i % 32;
        // shift the other cells to the right
        const index = row * 32 + col;
        grid[index + 1] = grid[index];
    }

    loadGrid();
}

/**
 * Move the Grid Up
 */
function moveGridUp() {
    saveGrid();

    // shift the values in each column up
    const grid = savedGrids[currentGridIndex];

    // shift the color values of each cell up
    for (let col = 0; col < 32; col++) {
        const temp = grid[col];
        for (let row = 1; row < 32; row++) {
            const index = row * 32 + col;
            grid[index - 32] = grid[index];
        }
        grid[992 + col] = temp;
    }

    loadGrid();
}

/**
 * Move the Grid Down
 */
function moveGridDown() {
    saveGrid();

    // shift the values in each column down
    const grid = savedGrids[currentGridIndex];

    // shift the color values of each cell down
    for (let col = 0; col < 32; col++) {
        const temp = grid[992 + col];
        for (let row = 30; row >= 0; row--) {
            const index = row * 32 + col;
            grid[index + 32] = grid[index];
        }
        grid[col] = temp;
    }

    loadGrid();
}

/**
 * 
 * Set Fill Mode On or Off
 * 
 * @param {*} fillingModeValue 
 */
function setFillingMode(fillingModeValue) {
    fillingMode = fillingModeValue;

    if (fillingMode == 1) {
        fillButton.style.backgroundColor = "red";
        setAllCellsPointer("url('images/cursor.cur'), auto");
    }
    else {
        fillButton.style.backgroundColor = "buttonface";
        setAllCellsPointer("default");
    }
}

/**
 * 
 * Set all Cells to have the Pointer Cursor
 * 
 * (Used to set in fill mode)
 * 
 * @param {*} pointer 
 */
function setAllCellsPointer(pointer) {
    const cells = document.querySelectorAll('#grid .cell');
    cells.forEach((cell) => {
        cell.style.cursor = pointer;
    });
}

function fillArea(cell) {
    const colorToFill = document.querySelector('#color-picker').value;
    const cells = document.querySelectorAll('.cell');

    const index = Array.from(cells).indexOf(cell);
    const row = Math.floor(index / 32);
    const col = index % 32;

    const visited = new Set();

    const originalCellColour = RgbToHex(cell.style.backgroundColor);

    function fill(row, col) {
        const cellIndex = row * 32 + col;
        const currentCell = cells[cellIndex];
        if (visited.has(cellIndex)) {
            return;
        }
        visited.add(cellIndex);

        const currentColor = RgbToHex(currentCell.style.backgroundColor);

        if (currentColor !== originalCellColour) {
            return;
        }

        currentCell.style.backgroundColor = colorToFill;

        if (col > 0) fill(row, col - 1); // left
        if (row > 0) fill(row - 1, col); // top
        if (col < 31) fill(row, col + 1); // right
        if (row < 31) fill(row + 1, col); // bottom
    }

    fill(row, col);

    setFillingMode(0);

}

function createGrid() {
    const grid = document.querySelector('#grid');
    for (let i = 0; i < 1024; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.originalColor = '';
        cell.addEventListener('click', () => {

            if (fillingMode == 0) {
                const currentColor = cell.style.backgroundColor;
                if (document.querySelector('#color-picker').value === RgbToHex(currentColor)) {
                    cell.style.backgroundColor = cell.dataset.previousColor;
                } else {
                    cell.dataset.previousColor = currentColor;
                    cell.style.backgroundColor = document.querySelector('#color-picker').value;
                }
            }
            else {
                fillArea(cell);
            }
        });
        grid.appendChild(cell);
    }
}

/**
 * Create the Empty Grids
 */
function createEmptyGrids() {
    for (let i = 0; i < 16; i++) {
        savedGrids.push(createEmptyGrid());
    }
}

function setAllCellsToDefaultColor() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = colors[15];
    });
}

function clearCellsToColour() {
    const selectedColorCell = document.querySelector('#color-grid .selected');
    const color = window.getComputedStyle(selectedColorCell).backgroundColor;
    const cells = document.querySelectorAll('#grid .cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = color;
    });
}

function RgbToHex(rgb) {
    const [r, g, b] = rgb.substring(4, rgb.length - 1).split(", ");
    return `#${parseInt(r).toString(16).padStart(2, '0')}${parseInt(g).toString(16).padStart(2, '0')}${parseInt(b).toString(16).padStart(2, '0')}`;
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
}

let currentGridIndex = 0;
const currentGridDiv = document.querySelector('#currentGrid');

function createEmptyGrid() {
    const grid = [];
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        grid.push(15);
    }
    return grid;
}

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

/**
 * Move to the Next Grid
 */
function nextGrid() {
    saveGrid(); // save the current grid before moving to the next one
    currentGridIndex = (currentGridIndex + 1) % savedGrids.length;
    loadGrid();
}

/**
 * Move to the Previous Grid
 */
function previousGrid() {
    saveGrid(); // save the current grid before moving to the previous one
    currentGridIndex = (currentGridIndex - 1 + savedGrids.length) % savedGrids.length;
    loadGrid();
}

function generateSpriteData() {
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

    return output;
}

/**
 * 
 * Import Sprite Data to the Grid
 * 
 * @param {*} textData 
 */
function importSpriteData(textData) {
    const hexValues = textData.match(/0x([0-9A-Fa-f]{2})/g);
    const cells = document.querySelectorAll('.cell');
    hexValues.forEach((hexValue, i) => {
        const highNibble = parseInt(hexValue.charAt(2), 16);
        const lowNibble = parseInt(hexValue.charAt(3), 16);
        const cellIndex = i * 2;
        cells[cellIndex].style.backgroundColor = colors[highNibble];
        cells[cellIndex + 1].style.backgroundColor = colors[lowNibble];
    });
}

export { createGrid, setAllCellsToDefaultColor, clearCellsToColour, RgbToHex, hexToRgb, setFillingMode, moveGridLeft, moveGridRight, moveGridUp, moveGridDown, createEmptyGrids, nextGrid, previousGrid, generateSpriteData, importSpriteData };
