const grid = document.querySelector('#grid');
const colorGrid = document.querySelector('#color-grid');
const colorPicker = document.querySelector('#color-picker');
const clearButton = document.querySelector('#clear');
const convertButton = document.querySelector('#convert');

const colors = [
    "rgb(0, 0, 0)", // black
    "rgb(0, 0, 170)", // deep blue
    "rgb(170, 0, 0)", // deep red
    "rgb(170, 0, 170)", // magneta (purple)
    "rgb(0, 170, 0)", // deep green
    "rgb(0, 170, 170)", // cyan (light blue)
    "rgb(170, 85, 0)", // deep yellow
    "rgb(170, 170, 170)", // white
    "rgb(0, 0, 0)", // black
    "rgb(0, 0, 255)", // bright blue
    "rgb(255, 0, 0)", // bright red
    "rgb(255, 0, 255)", // bright magneta
    "rgb(0, 255, 0)", // bright green
    "rgb(0, 255, 255)", // bright cyan
    "rgb(255, 255, 0)", // bright yellow
    "rgb(255, 255, 255)", // bright white
  ];

// create the color grid
for (let i = 0; i < colors.length; i++) {
  const colorCell = document.createElement('div');
  colorCell.classList.add('color-cell');
  colorCell.style.backgroundColor = colors[i];
  if (i === 0) {
    colorCell.classList.add('selected');
  }
  colorCell.addEventListener('click', () => {
    document.querySelector('.selected').classList.remove('selected');
    colorCell.classList.add('selected');
    colorPicker.value = colors[i];
  });
  colorGrid.appendChild(colorCell);
}

// set default color to white
colorPicker.value = colors[15];

// create the main grid
for (let i = 0; i < 1024; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.originalColor = '';
    cell.addEventListener('click', () => {
        const currentColor = cell.style.backgroundColor;
        if (hexToRgb(colorPicker.value) === currentColor) {
          cell.style.backgroundColor = cell.dataset.previousColor;
        } else {
          cell.dataset.previousColor = currentColor;
          cell.style.backgroundColor = colorPicker.value;
        }
      });
      
    grid.appendChild(cell);
}

// set all cells to default color
const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
  cell.style.backgroundColor = colors[15];
});

// clear button click event
clearButton.addEventListener('click', () => {
    clearCells();
});

clearCells = function() {
    const selectedColorCell = document.querySelector('#color-grid .selected');
    const color = window.getComputedStyle(selectedColorCell).backgroundColor;
    const cells = document.querySelectorAll('#grid .cell');
    cells.forEach((cell) => {
      cell.style.backgroundColor = color;
    });
}

// convert button click event
convertButton.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    let bytes = '';
    for (let i = 0; i < cells.length; i += 2) {
        const highNibble = colors.indexOf(cells[i].style.backgroundColor).toString(16).toUpperCase();
        const lowNibble = colors.indexOf(cells[i + 1].style.backgroundColor).toString(16).toUpperCase();
        const byte = (highNibble.length === 2 ? highNibble : '0' + highNibble) + (lowNibble.length === 2 ? lowNibble : '0' + lowNibble);
        bytes += byte;
    }

    const hexArray = bytes.match(/.{1,32}/g);
    let output = '';

    for (let i = 0; i < hexArray.length; i++) {
    const linePrefix = `Sprite1_${i+1}:`.padEnd(14, ' ');
    output += linePrefix + 'DEFB      ' + hexArray[i].match(/.{1,4}/g).join(', ') + '\n';
    }

    console.log(output);

  });
  

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
  }
