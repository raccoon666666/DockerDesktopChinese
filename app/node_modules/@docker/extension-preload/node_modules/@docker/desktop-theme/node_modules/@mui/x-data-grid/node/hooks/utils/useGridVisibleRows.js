"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridVisibleRows = exports.getVisibleRows = void 0;

var React = _interopRequireWildcard(require("react"));

var _gridPaginationSelector = require("../features/pagination/gridPaginationSelector");

var _gridFilterSelector = require("../features/filter/gridFilterSelector");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const getVisibleRows = (apiRef, props) => {
  let rows;
  let range;

  if (props.pagination && props.paginationMode === 'client') {
    range = (0, _gridPaginationSelector.gridPaginationRowRangeSelector)(apiRef);
    rows = (0, _gridPaginationSelector.gridPaginatedVisibleSortedGridRowEntriesSelector)(apiRef);
  } else {
    rows = (0, _gridFilterSelector.gridVisibleSortedRowEntriesSelector)(apiRef);

    if (rows.length === 0) {
      range = null;
    } else {
      range = {
        firstRowIndex: 0,
        lastRowIndex: rows.length - 1
      };
    }
  }

  return {
    rows,
    range
  };
};
/**
 * Computes the list of rows that are reachable by scroll.
 * Depending on whether pagination is enabled, it will return the rows in the current page.
 * - If the pagination is disabled or in server mode, it equals all the visible rows.
 * - If the row tree has several layers, it contains up to `state.pageSize` top level rows and all their descendants.
 * - If the row tree is flat, it only contains up to `state.pageSize` rows.
 */


exports.getVisibleRows = getVisibleRows;

const useGridVisibleRows = (apiRef, props) => {
  const response = getVisibleRows(apiRef, props);
  return React.useMemo(() => ({
    rows: response.rows,
    range: response.range
  }), [response.rows, response.range]);
};

exports.useGridVisibleRows = useGridVisibleRows;