import * as React from 'react';
import { gridPaginationRowRangeSelector, gridPaginatedVisibleSortedGridRowEntriesSelector } from '../features/pagination/gridPaginationSelector';
import { gridVisibleSortedRowEntriesSelector } from '../features/filter/gridFilterSelector';
export var getVisibleRows = function getVisibleRows(apiRef, props) {
  var rows;
  var range;

  if (props.pagination && props.paginationMode === 'client') {
    range = gridPaginationRowRangeSelector(apiRef);
    rows = gridPaginatedVisibleSortedGridRowEntriesSelector(apiRef);
  } else {
    rows = gridVisibleSortedRowEntriesSelector(apiRef);

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
    rows: rows,
    range: range
  };
};
/**
 * Computes the list of rows that are reachable by scroll.
 * Depending on whether pagination is enabled, it will return the rows in the current page.
 * - If the pagination is disabled or in server mode, it equals all the visible rows.
 * - If the row tree has several layers, it contains up to `state.pageSize` top level rows and all their descendants.
 * - If the row tree is flat, it only contains up to `state.pageSize` rows.
 */

export var useGridVisibleRows = function useGridVisibleRows(apiRef, props) {
  var response = getVisibleRows(apiRef, props);
  return React.useMemo(function () {
    return {
      rows: response.rows,
      range: response.range
    };
  }, [response.rows, response.range]);
};