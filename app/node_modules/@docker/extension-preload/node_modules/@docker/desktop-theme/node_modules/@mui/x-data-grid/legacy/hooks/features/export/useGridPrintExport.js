import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import * as React from 'react';
import { ownerDocument } from '@mui/material/utils';
import { useGridLogger } from '../../utils/useGridLogger';
import { gridVisibleRowCountSelector } from '../filter/gridFilterSelector';
import { gridColumnDefinitionsSelector, gridColumnVisibilityModelSelector } from '../columns/gridColumnsSelector';
import { gridDensityHeaderHeightSelector } from '../density/densitySelector';
import { gridClasses } from '../../../constants/gridClasses';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { gridRowsMetaSelector } from '../rows/gridRowsMetaSelector';
import { getColumnsToExport } from './utils';

/**
 * @requires useGridColumns (state)
 * @requires useGridFilter (state)
 * @requires useGridSorting (state)
 * @requires useGridParamsApi (method)
 */
export var useGridPrintExport = function useGridPrintExport(apiRef, props) {
  var logger = useGridLogger(apiRef, 'useGridPrintExport');
  var doc = React.useRef(null);
  var previousGridState = React.useRef(null);
  var previousColumnVisibility = React.useRef({});
  React.useEffect(function () {
    doc.current = ownerDocument(apiRef.current.rootElementRef.current);
  }, [apiRef]); // Returns a promise because updateColumns triggers state update and
  // the new state needs to be in place before the grid can be sized correctly

  var updateGridColumnsForPrint = React.useCallback(function (fields, allColumns) {
    return new Promise(function (resolve) {
      if (!fields && !allColumns) {
        resolve();
        return;
      }

      var exportedColumnFields = getColumnsToExport({
        apiRef: apiRef,
        options: {
          fields: fields,
          allColumns: allColumns
        }
      }).map(function (column) {
        return column.field;
      });
      var columns = gridColumnDefinitionsSelector(apiRef);
      var newColumnVisibilityModel = {};
      columns.forEach(function (column) {
        newColumnVisibilityModel[column.field] = exportedColumnFields.includes(column.field);
      });
      apiRef.current.setColumnVisibilityModel(newColumnVisibilityModel);
      resolve();
    });
  }, [apiRef]);
  var buildPrintWindow = React.useCallback(function (title) {
    var iframeEl = document.createElement('iframe');
    iframeEl.id = 'grid-print-window'; // Without this 'onload' event won't fire in some browsers

    iframeEl.src = window.location.href;
    iframeEl.style.position = 'absolute';
    iframeEl.style.width = '0px';
    iframeEl.style.height = '0px';
    iframeEl.title = title || document.title;
    return iframeEl;
  }, []);
  var handlePrintWindowLoad = React.useCallback(function (printWindow, options) {
    var _printWindow$contentW, _querySelector, _querySelector2;

    var normalizeOptions = _extends({
      copyStyles: true,
      hideToolbar: false,
      hideFooter: false
    }, options); // Some agents, such as IE11 and Enzyme (as of 2 Jun 2020) continuously call the
    // `onload` callback. This ensures that it is only called once.


    printWindow.onload = null;
    var printDoc = printWindow.contentDocument || ((_printWindow$contentW = printWindow.contentWindow) == null ? void 0 : _printWindow$contentW.document);

    if (!printDoc) {
      return;
    }

    var headerHeight = gridDensityHeaderHeightSelector(apiRef);
    var rowsMeta = gridRowsMetaSelector(apiRef.current.state);
    var gridRootElement = apiRef.current.rootElementRef.current;
    var gridClone = gridRootElement.cloneNode(true);
    var gridCloneViewport = gridClone.querySelector(".".concat(gridClasses.virtualScroller)); // Expand the viewport window to prevent clipping

    gridCloneViewport.style.height = 'auto';
    gridCloneViewport.style.width = 'auto';
    gridCloneViewport.parentElement.style.width = 'auto';
    gridCloneViewport.parentElement.style.height = 'auto'; // Allow to overflow to not hide the border of the last row

    var gridMain = gridClone.querySelector(".".concat(gridClasses.main));
    gridMain.style.overflow = 'visible';
    var columnHeaders = gridClone.querySelector(".".concat(gridClasses.columnHeaders));
    var columnHeadersInner = columnHeaders.querySelector(".".concat(gridClasses.columnHeadersInner));
    columnHeadersInner.style.width = '100%';
    var gridToolbarElementHeight = ((_querySelector = gridRootElement.querySelector(".".concat(gridClasses.toolbarContainer))) == null ? void 0 : _querySelector.clientHeight) || 0;
    var gridFooterElementHeight = ((_querySelector2 = gridRootElement.querySelector(".".concat(gridClasses.footerContainer))) == null ? void 0 : _querySelector2.clientHeight) || 0;

    if (normalizeOptions.hideToolbar) {
      var _gridClone$querySelec;

      (_gridClone$querySelec = gridClone.querySelector(".".concat(gridClasses.toolbarContainer))) == null ? void 0 : _gridClone$querySelec.remove();
      gridToolbarElementHeight = 0;
    }

    if (normalizeOptions.hideFooter) {
      var _gridClone$querySelec2;

      (_gridClone$querySelec2 = gridClone.querySelector(".".concat(gridClasses.footerContainer))) == null ? void 0 : _gridClone$querySelec2.remove();
      gridFooterElementHeight = 0;
    } // Expand container height to accommodate all rows


    gridClone.style.height = "".concat(rowsMeta.currentPageTotalHeight + headerHeight + gridToolbarElementHeight + gridFooterElementHeight, "px"); // Remove all loaded elements from the current host

    printDoc.body.innerHTML = '';
    printDoc.body.appendChild(gridClone);
    var defaultPageStyle = typeof normalizeOptions.pageStyle === 'function' ? normalizeOptions.pageStyle() : normalizeOptions.pageStyle;

    if (typeof defaultPageStyle === 'string') {
      // TODO custom styles should always win
      var styleElement = printDoc.createElement('style');
      styleElement.appendChild(printDoc.createTextNode(defaultPageStyle));
      printDoc.head.appendChild(styleElement);
    }

    if (normalizeOptions.bodyClassName) {
      var _printDoc$body$classL;

      (_printDoc$body$classL = printDoc.body.classList).add.apply(_printDoc$body$classL, _toConsumableArray(normalizeOptions.bodyClassName.split(' ')));
    }

    if (normalizeOptions.copyStyles) {
      var headStyleElements = doc.current.querySelectorAll("style, link[rel='stylesheet']");

      for (var i = 0; i < headStyleElements.length; i += 1) {
        var node = headStyleElements[i];

        if (node.tagName === 'STYLE') {
          var newHeadStyleElements = printDoc.createElement(node.tagName);
          var sheet = node.sheet;

          if (sheet) {
            var styleCSS = ''; // NOTE: for-of is not supported by IE

            for (var j = 0; j < sheet.cssRules.length; j += 1) {
              if (typeof sheet.cssRules[j].cssText === 'string') {
                styleCSS += "".concat(sheet.cssRules[j].cssText, "\r\n");
              }
            }

            newHeadStyleElements.appendChild(printDoc.createTextNode(styleCSS));
            printDoc.head.appendChild(newHeadStyleElements);
          }
        } else if (node.getAttribute('href')) {
          // If `href` tag is empty, avoid loading these links
          var _newHeadStyleElements = printDoc.createElement(node.tagName);

          for (var _j = 0; _j < node.attributes.length; _j += 1) {
            var attr = node.attributes[_j];

            if (attr) {
              _newHeadStyleElements.setAttribute(attr.nodeName, attr.nodeValue || '');
            }
          }

          printDoc.head.appendChild(_newHeadStyleElements);
        }
      }
    } // Trigger print


    if (process.env.NODE_ENV !== 'test') {
      printWindow.contentWindow.print();
    }
  }, [apiRef, doc]);
  var handlePrintWindowAfterPrint = React.useCallback(function (printWindow) {
    var _previousGridState$cu, _previousGridState$cu2;

    // Remove the print iframe
    doc.current.body.removeChild(printWindow); // Revert grid to previous state

    apiRef.current.restoreState(previousGridState.current || {});

    if (!((_previousGridState$cu = previousGridState.current) != null && (_previousGridState$cu2 = _previousGridState$cu.columns) != null && _previousGridState$cu2.columnVisibilityModel)) {
      // if the apiRef.current.exportState(); did not exported the column visibility, we update it
      apiRef.current.setColumnVisibilityModel(previousColumnVisibility.current);
    }

    apiRef.current.unstable_enableVirtualization(); // Clear local state

    previousGridState.current = null;
    previousColumnVisibility.current = {};
  }, [apiRef]);
  var exportDataAsPrint = React.useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(options) {
      var visibleRowCount, printWindow;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              logger.debug("Export data as Print");

              if (apiRef.current.rootElementRef.current) {
                _context.next = 3;
                break;
              }

              throw new Error('MUI: No grid root element available.');

            case 3:
              previousGridState.current = apiRef.current.exportState(); // It appends that the visibility model is not exported, especially if columnVisibility is not controlled

              previousColumnVisibility.current = gridColumnVisibilityModelSelector(apiRef);

              if (props.pagination) {
                visibleRowCount = gridVisibleRowCountSelector(apiRef);
                apiRef.current.setPageSize(visibleRowCount);
              }

              _context.next = 8;
              return updateGridColumnsForPrint(options == null ? void 0 : options.fields, options == null ? void 0 : options.allColumns);

            case 8:
              apiRef.current.unstable_disableVirtualization();
              printWindow = buildPrintWindow(options == null ? void 0 : options.fileName);
              doc.current.body.appendChild(printWindow);

              if (process.env.NODE_ENV === 'test') {
                // In test env, run the all pipeline without waiting for loading
                handlePrintWindowLoad(printWindow, options);
                handlePrintWindowAfterPrint(printWindow);
              } else {
                printWindow.onload = function () {
                  return handlePrintWindowLoad(printWindow, options);
                };

                printWindow.contentWindow.onafterprint = function () {
                  return handlePrintWindowAfterPrint(printWindow);
                };
              }

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [props, logger, apiRef, buildPrintWindow, handlePrintWindowLoad, handlePrintWindowAfterPrint, updateGridColumnsForPrint]);
  var printExportApi = {
    exportDataAsPrint: exportDataAsPrint
  };
  useGridApiMethod(apiRef, printExportApi, 'GridPrintExportApi');
};