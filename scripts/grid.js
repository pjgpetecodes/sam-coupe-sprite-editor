import { colors } from './colors.js';

let savedGrids = [];

const fillButton = document.querySelector('#fill');
const transparencyFillButton = document.querySelector('#fillTransparency');
const cutColumnButton = document.querySelector('#cutColumn');
const cutRowButton = document.querySelector('#cutRow');

let currentGridIndex = 0;
const currentGridDiv = document.querySelector('#currentGrid');
const spriteOutputHeader = document.querySelector('#sprite-output-header');
const spriteOutputTextBox = document.querySelector('#sprite-output');
const maskOutputHeader = document.querySelector('#mask-output-header');
const maskOutputTextBox = document.querySelector('#mask-output');

var fillingMode = 0;
var transparencyFillingMode = 0;
var cutColumnMode = 0;
var cutRowMode = 0;
var mouseIsDown = false;

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
 * Set Fill Mode On or Off
 * 
 * @param {*} TransparencyFillingModeValue 
 */
function setFillingTransparencyMode(TransparencyFillingModeValue) {
    transparencyFillingMode = TransparencyFillingModeValue;

    if (transparencyFillingMode == 1) {
        transparencyFillButton.style.backgroundColor = "red";
        setAllCellsPointer("url('images/cursor.cur'), auto");
    }
    else {
        transparencyFillButton.style.backgroundColor = "buttonface";
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

/**
 * 
 * Fill a whole area with a colour
 * 
 * @param {*} cell 
 */
function fillArea(cell) {

    var colorToFill = document.querySelector('#color-picker').value;

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

        var currentColor = RgbToHex(currentCell.style.backgroundColor);

        if (currentColor !== originalCellColour) {
            return;
        }

        currentCell.style.backgroundColor = colorToFill;
        currentCell.style.backgroundImage = '';
        currentCell.dataset.isNotSprite = false;

        if (col > 0) fill(row, col - 1); // left
        if (row > 0) fill(row - 1, col); // top
        if (col < 31) fill(row, col + 1); // right
        if (row < 31) fill(row + 1, col); // bottom
    }

    fill(row, col);

    setFillingMode(0);

}

/**
 * 
 * Fill a whole area with transparency (masking data)
 * 
 * @param {*} cell 
 */
function fillAreaWithTransparency(cell) {

    const cells = document.querySelectorAll('.cell');

    const index = Array.from(cells).indexOf(cell);
    const row = Math.floor(index / 32);
    const col = index % 32;

    const visited = new Set();

    const originalCellColour = RgbToHex(cell.style.backgroundColor);

    function fillWithTransparency(row, col) {
        const cellIndex = row * 32 + col;
        const currentCell = cells[cellIndex];
        if (visited.has(cellIndex)) {
            return;
        }
        visited.add(cellIndex);

        var currentColor = RgbToHex(currentCell.style.backgroundColor);

        if (currentColor !== originalCellColour) {
            return;
        }

        currentCell.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' viewBox=\'0 0 10 10\'%3E%3Cline x1=\'0\' y1=\'0\' x2=\'10\' y2=\'10\' stroke=\'red\' stroke-width=\'1\'/%3E%3C/svg%3E")';
        currentCell.dataset.isNotSprite = true;

        if (col > 0) fillWithTransparency(row, col - 1); // left
        if (row > 0) fillWithTransparency(row - 1, col); // top
        if (col < 31) fillWithTransparency(row, col + 1); // right
        if (row < 31) fillWithTransparency(row + 1, col); // bottom
    }

    fillWithTransparency(row, col);

    setFillingTransparencyMode(0);

}

/**
 * Create the main Sprite Grid
 */
function createGrid() {
    const grid = document.querySelector('#grid');
    for (let i = 0; i < 1024; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.originalColor = '';
        const col = i % 32;
        const row = Math.floor(i / 32);

        // added mouse events
        cell.addEventListener('mousedown', (event) => {
            event.preventDefault();

            if (fillingMode == 1) {
                mouseIsDown = false;
            }
            else if (transparencyFillingMode == 1) {
                mouseIsDown = false;
            }
            else if (cutColumnMode == 1) {
                mouseIsDown = false;
            }
            else if (cutRowMode == 1) {
                mouseIsDown = false;
            }
            else {
                mouseIsDown = true;
                cell.style.backgroundColor = document.querySelector('#color-picker').value;
                cell.dataset.isNotSprite = false;
                cell.style.backgroundImage = '';          
        }

        });

        cell.addEventListener('mouseover', (event) => {
            event.preventDefault();

            if (fillingMode == 1) {
                mouseIsDown = false;
            }
            else if (transparencyFillingMode == 1) {
                mouseIsDown = false;
            }
            else if (cutColumnMode == 1) {
                mouseIsDown = false;
            }
            else if (cutRowMode == 1) {
                mouseIsDown = false;
            }
            else {
                if (mouseIsDown) {
                    cell.style.backgroundColor = document.querySelector('#color-picker').value;
                    cell.dataset.isNotSprite = false;
                    cell.style.backgroundImage = '';          
                }
            }
        });

        cell.addEventListener('mouseup', () => {
            mouseIsDown = false;
        });

        cell.addEventListener('click', () => {

            if (fillingMode == 1) {
                fillArea(cell);
            }
            else if (transparencyFillingMode == 1) {
                fillAreaWithTransparency(cell);
            }
            else if (cutColumnMode == 1) {
                cutColumn(col);
            }
            else if (cutRowMode == 1) {
                cutRow(row);
            }
            else {
                const currentColor = cell.style.backgroundColor;
                cell.style.backgroundImage = '';            
                cell.dataset.isNotSprite = false;

                if (document.querySelector('#color-picker').value === RgbToHex(currentColor)) {
                    cell.style.backgroundColor = cell.dataset.previousColor;
                } else {
                    cell.dataset.previousColor = currentColor;
                    cell.style.backgroundColor = document.querySelector('#color-picker').value;
                }
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

/**
 * Set all cells to the default colour (Clear the canvas)
 */
function setAllCellsToDefaultColor() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = colors[15];
        cell.style.backgroundImage = '';       
        cell.dataset.isNotSprite = false;
    });
}

/**
 * Clear all cells to the selected colour (Clear the canvas to a colour)
 */
function clearCellsToColour() {
    const selectedColorCell = document.querySelector('#color-grid .selected');
    const color = window.getComputedStyle(selectedColorCell).backgroundColor;
    const cells = document.querySelectorAll('#grid .cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = color;
        cell.style.backgroundImage = '';       
        cell.dataset.isNotSprite = false;
    });
}

/**
 * 
 * Convert an RGB CSS Colour to Hex
 * 
 * @param {*} rgb 
 * @returns 
 */
function RgbToHex(rgb) {
    const [r, g, b] = rgb.substring(4, rgb.length - 1).split(", ");
    return `#${parseInt(r).toString(16).padStart(2, '0')}${parseInt(g).toString(16).padStart(2, '0')}${parseInt(b).toString(16).padStart(2, '0')}`;
}

/**
 * 
 * Convert a Hex CSS Colour to RGB
 * 
 * @param {*} hex 
 * @returns 
 */
function hexToRgb1(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
}

/**
 * 
 * Convert a Hex CSS Colour to RGB
 * 
 * @param {*} hex 
 * @returns 
 */
function hexToRgb(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return [r, g, b];
}

/**
 * 
 * Create an Empty Grid Array
 * 
 * @returns 
 */
function createEmptyGrid() {
    const grid = [];
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        const colorIndex = 15;
        const isNotSprite = 'false';
        grid.push({colorIndex, isNotSprite});
    }
    return grid;
}

/**
 *  * Save the Current Grid to the savedGrids Array
 */
function saveGrid() {
    const cells = document.querySelectorAll('.cell');
    const grid = [];
    for (let i = 0; i < cells.length; i++) {
        const colorIndex = colors.indexOf(RgbToHex(cells[i].style.backgroundColor));
        const isNotSprite = cells[i].dataset.isNotSprite;
        grid.push({colorIndex, isNotSprite});
    }
    savedGrids[currentGridIndex] = grid;
}

/**
 * Load the Current Grid from the savedGrids Array
 */
function loadGrid() {
    const grid = savedGrids[currentGridIndex];
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        const {colorIndex, isNotSprite} = grid[i];
        cells[i].style.backgroundColor = colors[colorIndex];
        if (isNotSprite === 'true')
        {
            cells[i].style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' viewBox=\'0 0 10 10\'%3E%3Cline x1=\'0\' y1=\'0\' x2=\'10\' y2=\'10\' stroke=\'red\' stroke-width=\'1\'/%3E%3C/svg%3E")';
            cells[i].dataset.isNotSprite = true;
        }
        else
        {
            cells[i].style.backgroundImage = '';
            cells[i].dataset.isNotSprite = false;
        }
    }

    currentGridDiv.innerHTML = currentGridIndex + 1;
    spriteOutputHeader.innerHTML = `Sprite ${currentGridIndex + 1} Data`;
    maskOutputHeader.innerHTML = `Mask ${currentGridIndex + 1} Data`;
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
        const linePrefix = `Sprite${currentGridIndex + 1}_${i + 1}:`.padEnd(14, ' ');
        output += linePrefix + 'DEFB      ' + hexArray[i].match(/.{1,4}/g).join(', ') + '\r\n';
    }

    return output;
}

/**
 * 
 * Generate the Sprite Mask Data
 * 
 * @returns 
 */
function generateMaskData() {
    const cells = document.querySelectorAll('.cell');
    let bytes = '';
    for (let i = 0; i < cells.length; i += 2) {

        var highNibble;
        if (cells[i].dataset.isNotSprite == 'true') {
            highNibble = 'F';
        }
        else {
            highNibble = '0'
        }

        var lowNibble;
        if (cells[i + 1].dataset.isNotSprite == 'true') {
            lowNibble = 'F';
        }
        else {
            lowNibble = '0'
        }

        const byte = "0x" + highNibble + lowNibble;
        bytes += byte;
    }

    const hexArray = bytes.match(/.{1,64}/g);
    let output = '';

    for (let i = 0; i < hexArray.length; i++) {
        const linePrefix = `Sprite${currentGridIndex + 1}_Mask_${i + 1}:`.padEnd(14, ' ');
        output += linePrefix + 'DEFB      ' + hexArray[i].match(/.{1,4}/g).join(', ') + '\r\n';
    }

    return output;
}

/**
 * 
 * Generate Sprite Data
 * 
 * @param {*} spriteData 
 * @param {*} maskData 
 */
function generateData() {
    var spriteOutput = generateSpriteData();
    console.log(spriteOutput);
    spriteOutputTextBox.value = spriteOutput;

    var maskOutput = generateMaskData();
    console.log(maskOutput);
    maskOutputTextBox.value = maskOutput;
}

/**
 * 
 * Import Sprite Data to the Grid
 * 
 * @param {*} spriteTextData 
 */
function importSpriteData(spriteTextData) {
    const hexValues = spriteTextData.match(/0x([0-9A-Fa-f]{2})/g);
    const cells = document.querySelectorAll('.cell');
    hexValues.forEach((hexValue, i) => {
        const highNibble = parseInt(hexValue.charAt(2), 16);
        const lowNibble = parseInt(hexValue.charAt(3), 16);
        const cellIndex = i * 2;
        cells[cellIndex].style.backgroundColor = colors[highNibble];
        cells[cellIndex + 1].style.backgroundColor = colors[lowNibble];
    });
}

/**
 * 
 * Import Sprite Mask Data to the Grid
 * 
 * @param {*} maskTextData 
 */
function importSpriteMaskData(maskTextData) {
    const hexValues = maskTextData.match(/0x([0-9A-Fa-f]{2})/g);
    const cells = document.querySelectorAll('.cell');
    hexValues.forEach((hexValue, i) => {
        const highNibble = parseInt(hexValue.charAt(2), 16);
        const lowNibble = parseInt(hexValue.charAt(3), 16);
        const cellIndex = i * 2;

        if (highNibble == 15)
        {
            cells[cellIndex].style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' viewBox=\'0 0 10 10\'%3E%3Cline x1=\'0\' y1=\'0\' x2=\'10\' y2=\'10\' stroke=\'red\' stroke-width=\'1\'/%3E%3C/svg%3E")';
            cells[cellIndex].dataset.isNotSprite = true;
        }
        else
        {
            cells[cellIndex].style.backgroundImage = '';
            cells[cellIndex].dataset.isNotSprite = false;
        }

        if (lowNibble == 15)
        {
            cells[cellIndex + 1].style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' viewBox=\'0 0 10 10\'%3E%3Cline x1=\'0\' y1=\'0\' x2=\'10\' y2=\'10\' stroke=\'red\' stroke-width=\'1\'/%3E%3C/svg%3E")';
            cells[cellIndex + 1].dataset.isNotSprite = true;
        }
        else
        {
            cells[cellIndex + 1].style.backgroundImage = '';
            cells[cellIndex + 1].dataset.isNotSprite = false;
        }

    });
}

/**
 * 
 * Import Sprite Data
 * 
 * @param {*} spriteData 
 * @param {*} maskData 
 */
function importData(spriteData, maskData) {
    importSpriteData(spriteData);
    importSpriteMaskData(maskData);
}

/**
 * 
 * Set The Cut Column Mode
 * 
 * @param {*} cutColumnModeValue 
 */
function setCutColumnMode(cutColumnModeValue) {

    if (cutColumnModeValue == 1) {
        cutColumnButton.style.backgroundColor = "red";
        setAllCellsPointer("url('images/cutCursor.cur'), auto");
    }
    else {
        cutColumnButton.style.backgroundColor = "buttonface";
        setAllCellsPointer("default");
    }

    cutColumnMode = cutColumnModeValue;
}

/**
 * 
 * Cut the Selected Column
 * 
 * @param {*} columnIndex 
 */
function cutColumn(columnIndex) {
    saveGrid();

    const grid = savedGrids[currentGridIndex];
    for (let col = columnIndex; col < 31; col++) {
        for (let row = 0; row < 32; row++) {
            const index = row * 32 + col;
            const nextIndex = row * 32 + col + 1;
            grid[index] = grid[nextIndex];
        }
    }

    // clear the last column
    for (let row = 0; row < 32; row++) {
        const index = row * 32 + 31;
        grid[index] = 15;
    }

    loadGrid();

    setCutColumnMode(0);
}

/**
 * 
 * Set The Cut Row Mode
 * 
 * @param {*} cutColumnModeValue 
 */
function setCutRowMode(cutRowModeValue) {

    if (cutRowModeValue == 1) {
        cutRowButton.style.backgroundColor = "red";
        setAllCellsPointer("url('images/cutCursor.cur'), auto");
    }
    else {
        cutRowButton.style.backgroundColor = "buttonface";
        setAllCellsPointer("default");
    }

    cutRowMode = cutRowModeValue;
}

/**
 * 
 * Cut the Selected Row
 * 
 * @param {*} rowIndex 
 */
function cutRow(rowIndex) {
    saveGrid();

    const grid = savedGrids[currentGridIndex];
    for (let i = rowIndex * 32; i < (rowIndex + 1) * 32; i++) {
        grid[i] = -1;
    }

    for (let i = (rowIndex + 1) * 32; i < grid.length; i++) {
        const prevIndex = i - 32;
        grid[prevIndex] = grid[i];
        grid[i] = -1;
    }

    loadGrid();

    setCutRowMode(0);
}

/**
 * 
 * Import a PNG
 * 
 * @param {*} PNGFile 
 */
function importPNG(PNGFile)
{
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        // get the pixel data for the top-left 32x32 square
        const imageData = context.getImageData(0, 0, 32, 32);

        // loop through each pixel and set the corresponding cell in the grid to the nearest color
        for (let i = 0; i < imageData.data.length; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            const a = imageData.data[i + 3];
            const nearestColor = findNearestColor(r, g, b); // replace with your own function to find nearest color
            const index = Math.floor(i / 4);
            const col = index % 32;
            const row = Math.floor(index / 32);
            const cell = document.querySelector(`#grid .cell:nth-child(${row * 32 + col + 1})`);
            cell.style.backgroundColor = nearestColor;

            if (a == 0)
            {    
                cell.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' viewBox=\'0 0 10 10\'%3E%3Cline x1=\'0\' y1=\'0\' x2=\'10\' y2=\'10\' stroke=\'red\' stroke-width=\'1\'/%3E%3C/svg%3E")';       
                cell.dataset.isNotSprite = true;
                cell.style.backgroundColor = "#FFFFFF";
            }
            else
            {
                cell.style.backgroundImage = '';       
                cell.dataset.isNotSprite = false;
            }
        }
    };
    img.src = URL.createObjectURL(PNGFile);
}

/**
 * 
 * Find the nearest colour from the current pallete to the imported PNG pixel colour
 * 
 * @param {*} r 
 * @param {*} g 
 * @param {*} b 
 * @returns 
 */
function findNearestColor(r, g, b) {
    let nearestColor = colors[0];
    let minDistance = Infinity;
    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        const [r2, g2, b2] = hexToRgb(color);
        const distance = Math.sqrt(Math.pow(r - r2, 2) + Math.pow(g - g2, 2) + Math.pow(b - b2, 2));
        if (distance < minDistance) {
            nearestColor = color;
            minDistance = distance;
        }
    }
    return nearestColor;
}

export {
    createGrid,
    setAllCellsToDefaultColor,
    clearCellsToColour,
    RgbToHex,
    hexToRgb,
    setFillingMode,
    setFillingTransparencyMode,
    moveGridLeft,
    moveGridRight,
    moveGridUp,
    moveGridDown,
    createEmptyGrids,
    nextGrid,
    previousGrid,
    generateSpriteData,
    generateMaskData,
    generateData,
    importSpriteData,
    importSpriteMaskData,
    importData,
    setCutColumnMode,
    setCutRowMode,
    importPNG
};
