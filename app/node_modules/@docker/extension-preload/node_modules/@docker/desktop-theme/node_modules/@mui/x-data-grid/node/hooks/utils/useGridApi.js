"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridApi = void 0;

var _warning = require("../../utils/warning");

const deprecationWarning = (0, _warning.buildWarning)(['MUI: The hook useGridApi is deprecated and will be removed in the next major version.', 'Access the ref content with apiRef.current instead']);
/**
 * @deprecated Use `apiRef.current` instead.
 */

const useGridApi = apiRef => {
  if (process.env.NODE_ENV !== 'production') {
    deprecationWarning();
  }

  return apiRef.current;
};

exports.useGridApi = useGridApi;