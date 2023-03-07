import { createGrid, setAllCellsToDefaultColor, hexToRgb, RgbToHex } from './grid.js';
import { colors, createColorGrid } from './colors.js'

createGrid();
setAllCellsToDefaultColor();
createColorGrid();

const outputDiv = document.querySelector('#output');

const clearButton = document.querySelector('#clear');

// clear button click event
clearButton.addEventListener('click', () => {
    const selectedColorCell = document.querySelector('#color-grid .selected');
    const color = window.getComputedStyle(selectedColorCell).backgroundColor;
    const cells = document.querySelectorAll('#grid .cell');
    cells.forEach((cell) => {
      cell.style.backgroundColor = color;
    });

    outputDiv.innerHTML = '';
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
        const linePrefix = `Sprite1_${i+1}:`.padEnd(14, ' ');
        output += linePrefix + 'DEFB      ' + hexArray[i].match(/.{1,4}/g).join(', ') + '<br/>';
    }

    console.log(output);
    outputDiv.innerHTML = output;

  });
