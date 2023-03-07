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

const colorPicker = document.querySelector('#color-picker');
  
function createColorGrid() {
    const colorGrid = document.querySelector('#color-grid');
    
    for (let i = 0; i < colors.length; i++) {
        const colorCell = document.createElement('div');
        colorCell.classList.add('color-cell');
        colorCell.style.backgroundColor = colors[i];
        if (i === 15) {
            colorCell.classList.add('selected');
        }
        colorCell.addEventListener('click', () => {
            document.querySelector('.selected').classList.remove('selected');
            colorCell.classList.add('selected');
            document.querySelector('#color-picker').value = colors[i];
        });
        colorGrid.appendChild(colorCell);
    }
}

// set default color to white
colorPicker.value = colors[15];

export { colors, createColorGrid }
  