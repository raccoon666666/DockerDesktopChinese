"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridInfiniteLoader = void 0;

var React = _interopRequireWildcard(require("react"));

var _xDataGrid = require("@mui/x-data-grid");

var _internals = require("@mui/x-data-grid/internals");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Only available in DataGridPro
 * @requires useGridColumns (state)
 * @requires useGridDimensions (method) - can be after
 * @requires useGridScroll (method
 */
const useGridInfiniteLoader = (apiRef, props) => {
  const visibleColumns = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridVisibleColumnDefinitionsSelector);
  const currentPage = (0, _internals.useGridVisibleRows)(apiRef, props);
  const rowsMeta = (0, _xDataGrid.useGridSelector)(apiRef, _xDataGrid.gridRowsMetaSelector);
  const contentHeight = Math.max(rowsMeta.currentPageTotalHeight, 1);
  const isInScrollBottomArea = React.useRef(false);
  const handleRowsScrollEnd = React.useCallback(scrollPosition => {
    const dimensions = apiRef.current.getRootDimensions();

    if (!dimensions) {
      return;
    }

    const scrollPositionBottom = scrollPosition.top + dimensions.viewportOuterSize.height;
    const viewportPageSize = apiRef.current.unstable_getViewportPageSize();

    if (scrollPositionBottom < contentHeight - props.scrollEndThreshold) {
      isInScrollBottomArea.current = false;
    }

    if (scrollPositionBottom >= contentHeight - props.scrollEndThreshold && !isInScrollBottomArea.current) {
      const rowScrollEndParam = {
        visibleColumns,
        viewportPageSize,
        virtualRowsCount: currentPage.rows.length
      };
      apiRef.current.publishEvent(_xDataGrid.GridEvents.rowsScrollEnd, rowScrollEndParam);
      isInScrollBottomArea.current = true;
    }
  }, [contentHeight, props.scrollEndThreshold, visibleColumns, apiRef, currentPage.rows.length]);
  const handleGridScroll = React.useCallback(({
    left,
    top
  }) => {
    handleRowsScrollEnd({
      left,
      top
    });
  }, [handleRowsScrollEnd]);
  (0, _xDataGrid.useGridApiEventHandler)(apiRef, _xDataGrid.GridEvents.rowsScroll, handleGridScroll);
  (0, _xDataGrid.useGridApiOptionHandler)(apiRef, _xDataGrid.GridEvents.rowsScrollEnd, props.onRowsScrollEnd);
};

exports.useGridInfiniteLoader = useGridInfiniteLoader;