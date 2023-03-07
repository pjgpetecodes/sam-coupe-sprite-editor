import { colors } from './colors.js';

function createGrid() {
  const grid = document.querySelector('#grid');
  for (let i = 0; i < 1024; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.originalColor = '';
    cell.addEventListener('click', () => {
      const currentColor = cell.style.backgroundColor;
      if (document.querySelector('#color-picker').value === RgbToHex(currentColor)) {
        cell.style.backgroundColor = cell.dataset.previousColor;
      } else {
        cell.dataset.previousColor = currentColor;
        cell.style.backgroundColor = document.querySelector('#color-picker').value;
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


export { createGrid, setAllCellsToDefaultColor, clearCells, RgbToHex, hexToRgb};
