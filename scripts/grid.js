import { colors } from './colors.js';

const fillButton = document.querySelector('#fill');
var fillingMode = 0;

function moveGridRight() {

    // shift the values in each row to the right
    const grid = document.querySelector('#grid');
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        row.unshift(row.pop());
    }

    // update the cell background colors based on the new grid values
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        const row = Math.floor(i / 16);
        const col = i % 16;
        const colorIndex = grid[row][col];
        const color = colors[colorIndex];
        cells[i].style.backgroundColor = color;
    }
}

function setFillingMode(fillingModeValue) {
    fillingMode = fillingModeValue;

    if (fillingMode == 1) {
        fillButton.style.backgroundColor = "red";
        setAllCellsPointer("pointer");
    }
    else {
        fillButton.style.backgroundColor = "buttonface";
        setAllCellsPointer("default");
    }
}

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

function setAllCellsToDefaultColor() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = colors[15];
    });
}

function clearCells() {
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


export { createGrid, setAllCellsToDefaultColor, clearCells, RgbToHex, hexToRgb, setFillingMode, moveGridRight };
