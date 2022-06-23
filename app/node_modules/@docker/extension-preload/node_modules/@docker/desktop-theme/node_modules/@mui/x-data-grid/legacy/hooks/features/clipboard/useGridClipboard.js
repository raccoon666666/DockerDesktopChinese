import * as React from 'react';
import { useGridApiMethod, useGridNativeEventListener } from '../../utils';

function writeToClipboardPolyfill(data) {
  var span = document.createElement('span');
  span.style.whiteSpace = 'pre';
  span.style.userSelect = 'all';
  span.style.opacity = '0px';
  span.textContent = data;
  document.body.appendChild(span);
  var range = document.createRange();
  range.selectNode(span);
  var selection = window.getSelection();
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


export var useGridClipboard = function useGridClipboard(apiRef) {
  var copySelectedRowsToClipboard = React.useCallback(function () {
    var includeHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (apiRef.current.getSelectedRows().size === 0) {
      return;
    }

    var data = apiRef.current.getDataAsCsv({
      includeHeaders: includeHeaders,
      delimiter: '\t'
    });

    if (navigator.clipboard) {
      navigator.clipboard.writeText(data).catch(function () {
        writeToClipboardPolyfill(data);
      });
    } else {
      writeToClipboardPolyfill(data);
    }
  }, [apiRef]);
  var handleKeydown = React.useCallback(function (event) {
    var _window$getSelection;

    var isModifierKeyPressed = event.ctrlKey || event.metaKey || event.altKey; // event.key === 'c' is not enough as alt+c can lead to ©, ç, or other characters on macOS.
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
  useGridNativeEventListener(apiRef, apiRef.current.rootElementRef, 'keydown', handleKeydown);
  var clipboardApi = {
    unstable_copySelectedRowsToClipboard: copySelectedRowsToClipboard
  };
  useGridApiMethod(apiRef, clipboardApi, 'GridClipboardApi');
};