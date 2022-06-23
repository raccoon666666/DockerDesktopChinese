"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridClipboard = void 0;

var React = _interopRequireWildcard(require("react"));

var _utils = require("../../utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function writeToClipboardPolyfill(data) {
  const span = document.createElement('span');
  span.style.whiteSpace = 'pre';
  span.style.userSelect = 'all';
  span.style.opacity = '0px';
  span.textContent = data;
  document.body.appendChild(span);
  const range = document.createRange();
  range.selectNode(span);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(span);
  }
}
/**
 * @requires useGridCsvExport (method)
 * @requires useGridSelection (method)
 */


const useGridClipboard = apiRef => {
  const copySelectedRowsToClipboard = React.useCallback((includeHeaders = false) => {
    if (apiRef.current.getSelectedRows().size === 0) {
      return;
    }

    const data = apiRef.current.getDataAsCsv({
      includeHeaders,
      delimiter: '\t'
    });

    if (navigator.clipboard) {
      navigator.clipboard.writeText(data).catch(() => {
        writeToClipboardPolyfill(data);
      });
    } else {
      writeToClipboardPolyfill(data);
    }
  }, [apiRef]);
  const handleKeydown = React.useCallback(event => {
    var _window$getSelection;

    const isModifierKeyPressed = event.ctrlKey || event.metaKey || event.altKey; // event.key === 'c' is not enough as alt+c can lead to ©, ç, or other characters on macOS.
    // event.code === 'KeyC' is not enough as event.code assume a QWERTY keyboard layout which would
    // be wrong with a Dvorak keyboard (as if pressing J).

    if (String.fromCharCode(event.keyCode) !== 'C' || !isModifierKeyPressed) {
      return;
    } // Do nothing if there's a native selection


    if (((_window$getSelection = window.getSelection()) == null ? void 0 : _window$getSelection.toString()) !== '') {
      return;
    }

    apiRef.current.unstable_copySelectedRowsToClipboard(event.altKey);
  }, [apiRef]);
  (0, _utils.useGridNativeEventListener)(apiRef, apiRef.current.rootElementRef, 'keydown', handleKeydown);
  const clipboardApi = {
    unstable_copySelectedRowsToClipboard: copySelectedRowsToClipboard
  };
  (0, _utils.useGridApiMethod)(apiRef, clipboardApi, 'GridClipboardApi');
};

exports.useGridClipboard = useGridClipboard;