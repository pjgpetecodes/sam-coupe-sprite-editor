const grid = document.querySelector('#grid');
const colorGrid = document.querySelector('#color-grid');
const colorPicker = document.querySelector('#color-picker');
const clearButton = document.querySelector('#clear');
const convertButton = document.querySelector('#convert');

const colors = [
    "#000000", // black
    "#0000aa", // deep blue
    "#aa0000", // deep red
    "#aa00aa", // magneta (purple)
    "#00aa00", // deep green
    "#00aaaa", // cyan (light blue)
    "#aa5500", // deep yellow
    "#aaaaaa", // white
    "#000000", // black
    "#0000ff", // bright blue
    "#ff0000", // bright red
    "#ff00ff", // bright magneta
    "#00ff00", // bright green
    "#00ffff", // bright cyan
    "#ffff00", // bright yellow
    "#ffffff", // bright white
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

// clear button click event
clearButton.addEventListener('click', () => {
    const selectedColorCell = document.querySelector('#color-grid .selected');
    const color = window.getComputedStyle(selectedColorCell).backgroundColor;
    const cells = document.querySelectorAll('#grid .cell');
    cells.forEach((cell) => {
      cell.style.backgroundColor = color;
    });
});

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
