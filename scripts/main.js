import {
    createGrid,
    setAllCellsToDefaultColor,
    clearCellsToColour,
    hexToRgb,
    RgbToHex,
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
} from './grid.js';

import { colors, createColorGrid, setSelectedColor } from './colors.js'
import { bustCaches } from './bustCache.js'

const spriteOutputTextBox = document.querySelector('#sprite-output');
const maskOutputTextBox = document.querySelector('#mask-output');

let useAmpersand = true;                    // Whether to use the Ampersand or 0xFF format
let interleaveMaskFirst = true;             // Mask or Sprite Byte First for Interleave Format

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

/**
 * Fill button Click Event
 */
const fillButton = document.querySelector('#fill');
fillButton.addEventListener('click', () => {
    setFillingMode(1);
    setFillingTransparencyMode(0);
});

/**
 * Fill button Click Event
 */
const fillTransparencyButton = document.querySelector('#fillTransparency');
fillTransparencyButton.addEventListener('click', () => {
    setFillingTransparencyMode(1);
    setFillingMode(0);
});

/**
 * Generate Sprite Data Click Event
 */
const generateSpriteDataButton = document.querySelector('#convert');
generateSpriteDataButton.addEventListener('click', () => {
    generateData(useAmpersand, interleaveMaskFirst);
});

/**
 * Import Sprite Data Click Event
 */
const importButton = document.querySelector('#import')
importButton.addEventListener('click', () => {
    importData(spriteOutputTextBox.value, maskOutputTextBox.value);
});

/**
 * Move to the Next Grid Click Event
 */
const nextButton = document.querySelector('#nextButton');
nextButton.addEventListener('click', () => {
    nextGrid();
    generateData(useAmpersand, interleaveMaskFirst);
});

/**
 * Move to the Previous Grid Click Event
 */
const prevButton = document.querySelector('#prevButton');
prevButton.addEventListener('click', () => {
    previousGrid();
    generateData(useAmpersand, interleaveMaskFirst);
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
 * Cut Column Button Click Event
 */
const cutColumnButton = document.querySelector('#cutColumn');
cutColumnButton.addEventListener('click', () => {
    setCutColumnMode(1);
});

/**
 * Cut Row Button Click Event
 */
const cutRowButton = document.querySelector('#cutRow');
cutRowButton.addEventListener('click', () => {
    setCutRowMode(1);
});

/**
 * Import PNG Click Event
 */
const fileInput = document.querySelector('#importPNG');
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    importPNG(file);
    event.target.value = '';
});


document.querySelectorAll('#hex-format input[type="radio"]').forEach((input) => {
    input.addEventListener('change', () => {
        useAmpersand = input.value === 'ampersand';
    });
});

document.querySelectorAll('#interleave-format input[type="radio"]').forEach((input) => {
    input.addEventListener('change', () => {
        interleaveMaskFirst = input.value === 'mask';
    });
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
importSpriteData(spriteOutputTextBox.value);
importSpriteMaskData(maskOutputTextBox.value);