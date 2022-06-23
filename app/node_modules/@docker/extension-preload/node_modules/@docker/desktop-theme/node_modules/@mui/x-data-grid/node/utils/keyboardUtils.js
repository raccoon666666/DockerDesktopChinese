"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTabKey = exports.isSpaceKey = exports.isPrintableKey = exports.isPageKeys = exports.isNavigationKey = exports.isMultipleKey = exports.isKeyboardEvent = exports.isHomeOrEndKeys = exports.isHideMenuKey = exports.isEscapeKey = exports.isEnterKey = exports.isDeleteKeys = exports.isCellExitEditModeKeys = exports.isCellEnterEditModeKeys = exports.isCellEditCommitKeys = exports.isArrowKeys = exports.GRID_MULTIPLE_SELECTION_KEYS = exports.GRID_CELL_EXIT_EDIT_MODE_KEYS = exports.GRID_CELL_EDIT_COMMIT_KEYS = void 0;

const isEscapeKey = key => key === 'Escape'; // TODO remove


exports.isEscapeKey = isEscapeKey;

const isEnterKey = key => key === 'Enter'; // TODO remove


exports.isEnterKey = isEnterKey;

const isTabKey = key => key === 'Tab'; // TODO remove


exports.isTabKey = isTabKey;

const isSpaceKey = key => key === ' ';

exports.isSpaceKey = isSpaceKey;

const isArrowKeys = key => key.indexOf('Arrow') === 0;

exports.isArrowKeys = isArrowKeys;

const isHomeOrEndKeys = key => key === 'Home' || key === 'End';

exports.isHomeOrEndKeys = isHomeOrEndKeys;

const isPageKeys = key => key.indexOf('Page') === 0;

exports.isPageKeys = isPageKeys;

const isDeleteKeys = key => key === 'Delete' || key === 'Backspace';

exports.isDeleteKeys = isDeleteKeys;
const printableCharRegex = /^(\p{L}|\p{M}\p{L}|\p{M}|\p{N}|\p{Z}|\p{S}|\p{P})$/iu;

const isPrintableKey = key => printableCharRegex.test(key);

exports.isPrintableKey = isPrintableKey;
const GRID_MULTIPLE_SELECTION_KEYS = ['Meta', 'Control', 'Shift'];
exports.GRID_MULTIPLE_SELECTION_KEYS = GRID_MULTIPLE_SELECTION_KEYS;
const GRID_CELL_EXIT_EDIT_MODE_KEYS = ['Enter', 'Escape', 'Tab'];
exports.GRID_CELL_EXIT_EDIT_MODE_KEYS = GRID_CELL_EXIT_EDIT_MODE_KEYS;
const GRID_CELL_EDIT_COMMIT_KEYS = ['Enter', 'Tab'];
exports.GRID_CELL_EDIT_COMMIT_KEYS = GRID_CELL_EDIT_COMMIT_KEYS;

const isMultipleKey = key => GRID_MULTIPLE_SELECTION_KEYS.indexOf(key) > -1;

exports.isMultipleKey = isMultipleKey;

const isCellEnterEditModeKeys = key => isEnterKey(key) || isDeleteKeys(key) || isPrintableKey(key);

exports.isCellEnterEditModeKeys = isCellEnterEditModeKeys;

const isCellExitEditModeKeys = key => GRID_CELL_EXIT_EDIT_MODE_KEYS.indexOf(key) > -1;

exports.isCellExitEditModeKeys = isCellExitEditModeKeys;

const isCellEditCommitKeys = key => GRID_CELL_EDIT_COMMIT_KEYS.indexOf(key) > -1;

exports.isCellEditCommitKeys = isCellEditCommitKeys;

const isNavigationKey = key => isHomeOrEndKeys(key) || isArrowKeys(key) || isPageKeys(key) || isSpaceKey(key);

exports.isNavigationKey = isNavigationKey;

const isKeyboardEvent = event => !!event.key;

exports.isKeyboardEvent = isKeyboardEvent;

const isHideMenuKey = key => isTabKey(key) || isEscapeKey(key);

exports.isHideMenuKey = isHideMenuKey;