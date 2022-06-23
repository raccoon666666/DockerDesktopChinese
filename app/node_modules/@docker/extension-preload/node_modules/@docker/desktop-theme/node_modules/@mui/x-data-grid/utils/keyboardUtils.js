export const isEscapeKey = key => key === 'Escape'; // TODO remove

export const isEnterKey = key => key === 'Enter'; // TODO remove

export const isTabKey = key => key === 'Tab'; // TODO remove

export const isSpaceKey = key => key === ' ';
export const isArrowKeys = key => key.indexOf('Arrow') === 0;
export const isHomeOrEndKeys = key => key === 'Home' || key === 'End';
export const isPageKeys = key => key.indexOf('Page') === 0;
export const isDeleteKeys = key => key === 'Delete' || key === 'Backspace';
const printableCharRegex = /^(\p{L}|\p{M}\p{L}|\p{M}|\p{N}|\p{Z}|\p{S}|\p{P})$/iu;
export const isPrintableKey = key => printableCharRegex.test(key);
export const GRID_MULTIPLE_SELECTION_KEYS = ['Meta', 'Control', 'Shift'];
export const GRID_CELL_EXIT_EDIT_MODE_KEYS = ['Enter', 'Escape', 'Tab'];
export const GRID_CELL_EDIT_COMMIT_KEYS = ['Enter', 'Tab'];
export const isMultipleKey = key => GRID_MULTIPLE_SELECTION_KEYS.indexOf(key) > -1;
export const isCellEnterEditModeKeys = key => isEnterKey(key) || isDeleteKeys(key) || isPrintableKey(key);
export const isCellExitEditModeKeys = key => GRID_CELL_EXIT_EDIT_MODE_KEYS.indexOf(key) > -1;
export const isCellEditCommitKeys = key => GRID_CELL_EDIT_COMMIT_KEYS.indexOf(key) > -1;
export const isNavigationKey = key => isHomeOrEndKeys(key) || isArrowKeys(key) || isPageKeys(key) || isSpaceKey(key);
export const isKeyboardEvent = event => !!event.key;
export const isHideMenuKey = key => isTabKey(key) || isEscapeKey(key);