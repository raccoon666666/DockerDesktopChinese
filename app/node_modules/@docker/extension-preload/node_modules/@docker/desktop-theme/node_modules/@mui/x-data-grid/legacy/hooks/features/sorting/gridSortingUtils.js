import _extends from "@babel/runtime/helpers/esm/extends";
import { buildWarning } from '../../../utils/warning';
var sortModelDisableMultiColumnsSortingWarning = buildWarning(['MUI: The `sortModel` can only contain a single item when the `disableMultipleColumnsSorting` prop is set to `true`.', 'If you are using the community version of the `DataGrid`, this prop is always `true`.'], 'error');
export var sanitizeSortModel = function sanitizeSortModel(model, disableMultipleColumnsSorting) {
  if (disableMultipleColumnsSorting && model.length > 1) {
    sortModelDisableMultiColumnsSortingWarning();
    return [model[0]];
  }

  return model;
};
export var mergeStateWithSortModel = function mergeStateWithSortModel(sortModel, disableMultipleColumnsSorting) {
  return function (state) {
    return _extends({}, state, {
      sorting: _extends({}, state.sorting, {
        sortModel: sanitizeSortModel(sortModel, disableMultipleColumnsSorting)
      })
    });
  };
};

var isDesc = function isDesc(direction) {
  return direction === 'desc';
};
/**
 * Transform an item of the sorting model into a method comparing two rows.
 * @param {GridSortItem} sortItem The sort item we want to apply.
 * @param {React.MutableRefObject<GridApiCommunity>} apiRef The API of the grid.
 * @returns {GridParsedSortItem | null} The parsed sort item. Returns `null` is the sort item is not valid.
 */


var parseSortItem = function parseSortItem(sortItem, apiRef) {
  var column = apiRef.current.getColumn(sortItem.field);

  if (!column) {
    return null;
  }

  var comparator = isDesc(sortItem.sort) ? function () {
    return -1 * column.sortComparator.apply(column, arguments);
  } : column.sortComparator;

  var getSortCellParams = function getSortCellParams(id) {
    return {
      id: id,
      field: column.field,
      rowNode: apiRef.current.getRowNode(id),
      value: apiRef.current.getCellValue(id, column.field),
      api: apiRef.current
    };
  };

  return {
    getSortCellParams: getSortCellParams,
    comparator: comparator
  };
};
/**
 * Compare two rows according to a list of valid sort items.
 * The `row1Params` and `row2Params` must have the same length as `parsedSortItems`,
 * and each of their index must contain the `GridSortCellParams` of the sort item with the same index.
 * @param {GridParsedSortItem[]} parsedSortItems All the sort items with which we want to compare the rows.
 * @param {GridSortCellParams} row1Params The params of the 1st row for each sort item.
 * @param {GridSortCellParams} row2Params The params of the 2nd row for each sort item.
 */


var compareRows = function compareRows(parsedSortItems, row1Params, row2Params) {
  return parsedSortItems.reduce(function (res, item, index) {
    if (res !== 0) {
      // return the results of the first comparator which distinguish the two rows
      return res;
    }

    var sortCellParams1 = row1Params[index];
    var sortCellParams2 = row2Params[index];
    res = item.comparator(sortCellParams1.value, sortCellParams2.value, sortCellParams1, sortCellParams2);
    return res;
  }, 0);
};
/**
 * Generates a method to easily sort a list of rows according to the current sort model.
 * @param {GridSortModel} sortModel The model with which we want to sort the rows.
 * @param {React.MutableRefObject<GridApiCommunity>} apiRef The API of the grid.
 * @returns {GridSortingModelApplier | null} A method that generates a list of sorted row ids from a list of rows according to the current sort model. If `null`, we consider that the rows should remain in the order there were provided.
 */


export var buildAggregatedSortingApplier = function buildAggregatedSortingApplier(sortModel, apiRef) {
  var comparatorList = sortModel.map(function (item) {
    return parseSortItem(item, apiRef);
  }).filter(function (comparator) {
    return !!comparator;
  });

  if (comparatorList.length === 0) {
    return null;
  }

  return function (rowList) {
    return rowList.map(function (value) {
      return {
        value: value,
        params: comparatorList.map(function (el) {
          return el.getSortCellParams(value.id);
        })
      };
    }).sort(function (a, b) {
      return compareRows(comparatorList, a.params, b.params);
    }).map(function (row) {
      return row.value.id;
    });
  };
};
export var getNextGridSortDirection = function getNextGridSortDirection(sortingOrder, current) {
  var currentIdx = sortingOrder.indexOf(current);

  if (!current || currentIdx === -1 || currentIdx + 1 === sortingOrder.length) {
    return sortingOrder[0];
  }

  return sortingOrder[currentIdx + 1];
};

var gridNillComparator = function gridNillComparator(v1, v2) {
  if (v1 == null && v2 != null) {
    return -1;
  }

  if (v2 == null && v1 != null) {
    return 1;
  }

  if (v1 == null && v2 == null) {
    return 0;
  }

  return null;
};

var collator = new Intl.Collator();
export var gridStringOrNumberComparator = function gridStringOrNumberComparator(value1, value2) {
  var nillResult = gridNillComparator(value1, value2);

  if (nillResult !== null) {
    return nillResult;
  }

  if (typeof value1 === 'string') {
    return collator.compare(value1.toString(), value2.toString());
  }

  return value1 - value2;
};
export var gridNumberComparator = function gridNumberComparator(value1, value2) {
  var nillResult = gridNillComparator(value1, value2);

  if (nillResult !== null) {
    return nillResult;
  }

  return Number(value1) - Number(value2);
};
export var gridDateComparator = function gridDateComparator(value1, value2) {
  var nillResult = gridNillComparator(value1, value2);

  if (nillResult !== null) {
    return nillResult;
  }

  if (value1 > value2) {
    return 1;
  }

  if (value1 < value2) {
    return -1;
  }

  return 0;
};