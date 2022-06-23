import _extends from "@babel/runtime/helpers/esm/extends";
import { GridLinkOperator } from '../../../models';
import { buildWarning } from '../../../utils/warning';

/**
 * Adds default values to the optional fields of a filter items.
 * @param {GridFilterItem} item The raw filter item.
 * @param {React.MutableRefObject<GridApiCommunity>} apiRef The API of the grid.
 * @return {GridFilterItem} The clean filter item with an uniq ID and an always-defined operatorValue.
 * TODO: Make the typing reflect the different between GridFilterInputItem and GridFilterItem.
 */
var cleanFilterItem = function cleanFilterItem(item, apiRef) {
  var cleanItem = _extends({}, item);

  if (cleanItem.id == null) {
    cleanItem.id = Math.round(Math.random() * 1e5);
  }

  if (cleanItem.operatorValue == null) {
    // we select a default operator
    var column = apiRef.current.getColumn(cleanItem.columnField);
    cleanItem.operatorValue = column && column.filterOperators[0].value;
  }

  return cleanItem;
};

var filterModelDisableMultiColumnsFilteringWarning = buildWarning(['MUI: The `filterModel` can only contain a single item when the `disableMultipleColumnsFiltering` prop is set to `true`.', 'If you are using the community version of the `DataGrid`, this prop is always `true`.'], 'error');
var filterModelMissingItemIdWarning = buildWarning("MUI: The 'id' field is required on `filterModel.items` when you use multiple filters.", 'error');
var filterModelMissingItemOperatorWarning = buildWarning(['MUI: One of your filtering item have no `operatorValue` provided.', 'This property will become required on `@mui/x-data-grid@6.X`.']);
export var sanitizeFilterModel = function sanitizeFilterModel(model, disableMultipleColumnsFiltering, apiRef) {
  var hasSeveralItems = model.items.length > 1;
  var items;

  if (hasSeveralItems && disableMultipleColumnsFiltering) {
    filterModelDisableMultiColumnsFilteringWarning();
    items = [model.items[0]];
  } else {
    items = model.items;
  }

  var hasItemsWithoutIds = hasSeveralItems && items.some(function (item) {
    return item.id == null;
  });
  var hasItemWithoutOperator = items.some(function (item) {
    return item.operatorValue == null;
  });

  if (hasItemsWithoutIds) {
    filterModelMissingItemIdWarning();
  }

  if (hasItemWithoutOperator) {
    filterModelMissingItemOperatorWarning();
  }

  if (hasItemWithoutOperator || hasItemsWithoutIds) {
    return _extends({}, model, {
      items: items.map(function (item) {
        return cleanFilterItem(item, apiRef);
      })
    });
  }

  if (model.items !== items) {
    return _extends({}, model, {
      items: items
    });
  }

  return model;
};
export var mergeStateWithFilterModel = function mergeStateWithFilterModel(filterModel, disableMultipleColumnsFiltering, apiRef) {
  return function (state) {
    return _extends({}, state, {
      filter: _extends({}, state.filter, {
        filterModel: sanitizeFilterModel(filterModel, disableMultipleColumnsFiltering, apiRef)
      })
    });
  };
};
/**
 * Generates a method to easily check if a row is matching the current filter model.
 * @param {GridFilterModel} filterModel The model with which we want to filter the rows.
 * @param {React.MutableRefObject<GridApiCommunity>} apiRef The API of the grid.
 * @returns {GridAggregatedFilterItemApplier | null} A method that checks if a row is matching the current filter model. If `null`, we consider that all the rows are matching the filters.
 */

export var buildAggregatedFilterApplier = function buildAggregatedFilterApplier(filterModel, apiRef) {
  var items = filterModel.items,
      _filterModel$linkOper = filterModel.linkOperator,
      linkOperator = _filterModel$linkOper === void 0 ? GridLinkOperator.And : _filterModel$linkOper;

  var getFilterCallbackFromItem = function getFilterCallbackFromItem(filterItem) {
    if (!filterItem.columnField || !filterItem.operatorValue) {
      return null;
    }

    var column = apiRef.current.getColumn(filterItem.columnField);

    if (!column) {
      return null;
    }

    var parsedValue;

    if (column.valueParser) {
      var _filterItem$value;

      var parser = column.valueParser;
      parsedValue = Array.isArray(filterItem.value) ? (_filterItem$value = filterItem.value) == null ? void 0 : _filterItem$value.map(function (x) {
        return parser(x);
      }) : parser(filterItem.value);
    } else {
      parsedValue = filterItem.value;
    }

    var newFilterItem = _extends({}, filterItem, {
      value: parsedValue
    });

    var filterOperators = column.filterOperators;

    if (!(filterOperators != null && filterOperators.length)) {
      throw new Error("MUI: No filter operators found for column '".concat(column.field, "'."));
    }

    var filterOperator = filterOperators.find(function (operator) {
      return operator.value === newFilterItem.operatorValue;
    });

    if (!filterOperator) {
      throw new Error("MUI: No filter operator found for column '".concat(column.field, "' and operator value '").concat(newFilterItem.operatorValue, "'."));
    }

    var applyFilterOnRow = filterOperator.getApplyFilterFn(newFilterItem, column);

    if (typeof applyFilterOnRow !== 'function') {
      return null;
    }

    var fn = function fn(rowId) {
      var cellParams = apiRef.current.getCellParams(rowId, newFilterItem.columnField);
      return applyFilterOnRow(cellParams);
    };

    return {
      fn: fn,
      item: newFilterItem
    };
  };

  var appliers = items.map(getFilterCallbackFromItem).filter(function (callback) {
    return !!callback;
  });

  if (appliers.length === 0) {
    return null;
  }

  return function (rowId, shouldApplyFilter) {
    var filteredAppliers = shouldApplyFilter ? appliers.filter(function (applier) {
      return shouldApplyFilter(applier.item);
    }) : appliers; // Return `false` as soon as we have a failing filter

    if (linkOperator === GridLinkOperator.And) {
      return filteredAppliers.every(function (applier) {
        return applier.fn(rowId);
      });
    } // Return `true` as soon as we have a passing filter


    return filteredAppliers.some(function (applier) {
      return applier.fn(rowId);
    });
  };
};