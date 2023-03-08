import { createGrid, setAllCellsToDefaultColor, clearCellsToColour, hexToRgb, RgbToHex, setFillingMode, moveGridLeft, moveGridRight, moveGridUp, moveGridDown, createEmptyGrids, nextGrid, previousGrid, generateSpriteData, importSpriteData } from './grid.js';
import { colors, createColorGrid, setSelectedColor } from './colors.js'

const outputTextBox = document.querySelector('#output');

/**
 * Clear button click event
 */ 
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    setAllCellsToDefaultColor();
});


/**
 * Clear to Colour button Click Event
 */
const clearToColourButton = document.querySelector('#clearToColour');
clearToColourButton.addEventListener('click', () => {
    clearCellsToColour();
});

// 
/**
 * Fill button Click Event
 */
const fillButton = document.querySelector('#fill');
fillButton.addEventListener('click', () => {
    setFillingMode(1);
});


/**
 * Generate Sprite Data Click Event
 */
const generateSpriteDataButton = document.querySelector('#convert');
generateSpriteDataButton.addEventListener('click', () => {    
    var output = generateSpriteData();
    console.log(output);
    outputTextBox.value = output;
});

/**
 * Import Sprite Data Click Event
 */
const importButton = document.querySelector('#import');
importButton.addEventListener('click', () => {
    importSpriteData(outputTextBox.value);
});

/**
 * Move to the Next Grid Click Event
 */
const nextButton = document.querySelector('#nextButton');
nextButton.addEventListener('click', () => {
    nextGrid();
});

/**
 * Move to the Previous Grid Click Event
 */
const prevButton = document.querySelector('#prevButton');
prevButton.addEventListener('click', () => {
    previousGrid()
});

/**
 * Move Left Click Event
 */
const moveLeftButton = document.querySelector('#moveLeft');
moveLeftButton.addEventListener('click', () => {
    moveGridLeft();
});

/**
 * Move Right Click Event
 */
const moveRightButton = document.querySelector('#moveRight');
moveRightButton.addEventListener('click', () => {
    moveGridRight();
});

/**
 * Move Up Click Event
 */
const moveUpButton = document.querySelector('#moveUp');
moveUpButton.addEventListener('click', () => {
    moveGridUp();
});

/**
 * Move Down Click Event
 */
const moveDownButton = document.querySelector('#moveDown');
moveDownButton.addEventListener('click', () => {
    moveGridDown();
});

/**
 * Main Application
 */
createColorGrid();
createGrid();
createEmptyGrids();
setSelectedColor(15);
setAllCellsToDefaultColor();
setSelectedColor(0);
setFillingMode(0);