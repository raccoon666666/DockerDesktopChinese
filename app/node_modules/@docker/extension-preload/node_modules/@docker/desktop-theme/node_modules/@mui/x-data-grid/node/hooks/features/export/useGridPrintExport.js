"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridPrintExport = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _utils = require("@mui/material/utils");

var _useGridLogger = require("../../utils/useGridLogger");

var _gridFilterSelector = require("../filter/gridFilterSelector");

var _gridColumnsSelector = require("../columns/gridColumnsSelector");

var _densitySelector = require("../density/densitySelector");

var _gridClasses = require("../../../constants/gridClasses");

var _useGridApiMethod = require("../../utils/useGridApiMethod");

var _gridRowsMetaSelector = require("../rows/gridRowsMetaSelector");

var _utils2 = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @requires useGridColumns (state)
 * @requires useGridFilter (state)
 * @requires useGridSorting (state)
 * @requires useGridParamsApi (method)
 */
const useGridPrintExport = (apiRef, props) => {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useGridPrintExport');
  const doc = React.useRef(null);
  const previousGridState = React.useRef(null);
  const previousColumnVisibility = React.useRef({});
  React.useEffect(() => {
    doc.current = (0, _utils.ownerDocument)(apiRef.current.rootElementRef.current);
  }, [apiRef]); // Returns a promise because updateColumns triggers state update and
  // the new state needs to be in place before the grid can be sized correctly

  const updateGridColumnsForPrint = React.useCallback((fields, allColumns) => new Promise(resolve => {
    if (!fields && !allColumns) {
      resolve();
      return;
    }

    const exportedColumnFields = (0, _utils2.getColumnsToExport)({
      apiRef,
      options: {
        fields,
        allColumns
      }
    }).map(column => column.field);
    const columns = (0, _gridColumnsSelector.gridColumnDefinitionsSelector)(apiRef);
    const newColumnVisibilityModel = {};
    columns.forEach(column => {
      newColumnVisibilityModel[column.field] = exportedColumnFields.includes(column.field);
    });
    apiRef.current.setColumnVisibilityModel(newColumnVisibilityModel);
    resolve();
  }), [apiRef]);
  const buildPrintWindow = React.useCallback(title => {
    const iframeEl = document.createElement('iframe');
    iframeEl.id = 'grid-print-window'; // Without this 'onload' event won't fire in some browsers

    iframeEl.src = window.location.href;
    iframeEl.style.position = 'absolute';
    iframeEl.style.width = '0px';
    iframeEl.style.height = '0px';
    iframeEl.title = title || document.title;
    return iframeEl;
  }, []);
  const handlePrintWindowLoad = React.useCallback((printWindow, options) => {
    var _printWindow$contentW, _querySelector, _querySelector2;

    const normalizeOptions = (0, _extends2.default)({
      copyStyles: true,
      hideToolbar: false,
      hideFooter: false
    }, options); // Some agents, such as IE11 and Enzyme (as of 2 Jun 2020) continuously call the
    // `onload` callback. This ensures that it is only called once.

    printWindow.onload = null;
    const printDoc = printWindow.contentDocument || ((_printWindow$contentW = printWindow.contentWindow) == null ? void 0 : _printWindow$contentW.document);

    if (!printDoc) {
      return;
    }

    const headerHeight = (0, _densitySelector.gridDensityHeaderHeightSelector)(apiRef);
    const rowsMeta = (0, _gridRowsMetaSelector.gridRowsMetaSelector)(apiRef.current.state);
    const gridRootElement = apiRef.current.rootElementRef.current;
    const gridClone = gridRootElement.cloneNode(true);
    const gridCloneViewport = gridClone.querySelector(`.${_gridClasses.gridClasses.virtualScroller}`); // Expand the viewport window to prevent clipping

    gridCloneViewport.style.height = 'auto';
    gridCloneViewport.style.width = 'auto';
    gridCloneViewport.parentElement.style.width = 'auto';
    gridCloneViewport.parentElement.style.height = 'auto'; // Allow to overflow to not hide the border of the last row

    const gridMain = gridClone.querySelector(`.${_gridClasses.gridClasses.main}`);
    gridMain.style.overflow = 'visible';
    const columnHeaders = gridClone.querySelector(`.${_gridClasses.gridClasses.columnHeaders}`);
    const columnHeadersInner = columnHeaders.querySelector(`.${_gridClasses.gridClasses.columnHeadersInner}`);
    columnHeadersInner.style.width = '100%';
    let gridToolbarElementHeight = ((_querySelector = gridRootElement.querySelector(`.${_gridClasses.gridClasses.toolbarContainer}`)) == null ? void 0 : _querySelector.clientHeight) || 0;
    let gridFooterElementHeight = ((_querySelector2 = gridRootElement.querySelector(`.${_gridClasses.gridClasses.footerContainer}`)) == null ? void 0 : _querySelector2.clientHeight) || 0;

    if (normalizeOptions.hideToolbar) {
      var _gridClone$querySelec;

      (_gridClone$querySelec = gridClone.querySelector(`.${_gridClasses.gridClasses.toolbarContainer}`)) == null ? void 0 : _gridClone$querySelec.remove();
      gridToolbarElementHeight = 0;
    }

    if (normalizeOptions.hideFooter) {
      var _gridClone$querySelec2;

      (_gridClone$querySelec2 = gridClone.querySelector(`.${_gridClasses.gridClasses.footerContainer}`)) == null ? void 0 : _gridClone$querySelec2.remove();
      gridFooterElementHeight = 0;
    } // Expand container height to accommodate all rows


    gridClone.style.height = `${rowsMeta.currentPageTotalHeight + headerHeight + gridToolbarElementHeight + gridFooterElementHeight}px`; // Remove all loaded elements from the current host

    printDoc.body.innerHTML = '';
    printDoc.body.appendChild(gridClone);
    const defaultPageStyle = typeof normalizeOptions.pageStyle === 'function' ? normalizeOptions.pageStyle() : normalizeOptions.pageStyle;

    if (typeof defaultPageStyle === 'string') {
      // TODO custom styles should always win
      const styleElement = printDoc.createElement('style');
      styleElement.appendChild(printDoc.createTextNode(defaultPageStyle));
      printDoc.head.appendChild(styleElement);
    }

    if (normalizeOptions.bodyClassName) {
      printDoc.body.classList.add(...normalizeOptions.bodyClassName.split(' '));
    }

    if (normalizeOptions.copyStyles) {
      const headStyleElements = doc.current.querySelectorAll("style, link[rel='stylesheet']");

      for (let i = 0; i < headStyleElements.length; i += 1) {
        const node = headStyleElements[i];

        if (node.tagName === 'STYLE') {
          const newHeadStyleElements = printDoc.createElement(node.tagName);
          const sheet = node.sheet;

          if (sheet) {
            let styleCSS = ''; // NOTE: for-of is not supported by IE

            for (let j = 0; j < sheet.cssRules.length; j += 1) {
              if (typeof sheet.cssRules[j].cssText === 'string') {
                styleCSS += `${sheet.cssRules[j].cssText}\r\n`;
              }
            }

            newHeadStyleElements.appendChild(printDoc.createTextNode(styleCSS));
            printDoc.head.appendChild(newHeadStyleElements);
          }
        } else if (node.getAttribute('href')) {
          // If `href` tag is empty, avoid loading these links
          const newHeadStyleElements = printDoc.createElement(node.tagName);

          for (let j = 0; j < node.attributes.length; j += 1) {
            const attr = node.attributes[j];

            if (attr) {
              newHeadStyleElements.setAttribute(attr.nodeName, attr.nodeValue || '');
            }
          }

          printDoc.head.appendChild(newHeadStyleElements);
        }
      }
    } // Trigger print


    if (process.env.NODE_ENV !== 'test') {
      printWindow.contentWindow.print();
    }
  }, [apiRef, doc]);
  const handlePrintWindowAfterPrint = React.useCallback(printWindow => {
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
  const exportDataAsPrint = React.useCallback(async options => {
    logger.debug(`Export data as Print`);

    if (!apiRef.current.rootElementRef.current) {
      throw new Error('MUI: No grid root element available.');
    }

    previousGridState.current = apiRef.current.exportState(); // It appends that the visibility model is not exported, especially if columnVisibility is not controlled

    previousColumnVisibility.current = (0, _gridColumnsSelector.gridColumnVisibilityModelSelector)(apiRef);

    if (props.pagination) {
      const visibleRowCount = (0, _gridFilterSelector.gridVisibleRowCountSelector)(apiRef);
      apiRef.current.setPageSize(visibleRowCount);
    }

    await updateGridColumnsForPrint(options == null ? void 0 : options.fields, options == null ? void 0 : options.allColumns);
    apiRef.current.unstable_disableVirtualization();
    const printWindow = buildPrintWindow(options == null ? void 0 : options.fileName);
    doc.current.body.appendChild(printWindow);

    if (process.env.NODE_ENV === 'test') {
      // In test env, run the all pipeline without waiting for loading
      handlePrintWindowLoad(printWindow, options);
      handlePrintWindowAfterPrint(printWindow);
    } else {
      printWindow.onload = () => handlePrintWindowLoad(printWindow, options);

      printWindow.contentWindow.onafterprint = () => handlePrintWindowAfterPrint(printWindow);
    }
  }, [props, logger, apiRef, buildPrintWindow, handlePrintWindowLoad, handlePrintWindowAfterPrint, updateGridColumnsForPrint]);
  const printExportApi = {
    exportDataAsPrint
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, printExportApi, 'GridPrintExportApi');
};

exports.useGridPrintExport = useGridPrintExport;