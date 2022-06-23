"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeFilterModel = exports.mergeStateWithFilterModel = exports.buildAggregatedFilterApplier = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _models = require("../../../models");

var _warning = require("../../../utils/warning");

/**
 * Adds default values to the optional fields of a filter items.
 * @param {GridFilterItem} item The raw filter item.
 * @param {React.MutableRefObject<GridApiCommunity>} apiRef The API of the grid.
 * @return {GridFilterItem} The clean filter item with an uniq ID and an always-defined operatorValue.
 * TODO: Make the typing reflect the different between GridFilterInputItem and GridFilterItem.
 */
const cleanFilterItem = (item, apiRef) => {
  const cleanItem = (0, _extends2.default)({}, item);

  if (cleanItem.id == null) {
    cleanItem.id = Math.round(Math.random() * 1e5);
  }

  if (cleanItem.operatorValue == null) {
    // we select a default operator
    const column = apiRef.current.getColumn(cleanItem.columnField);
    cleanItem.operatorValue = column && column.filterOperators[0].value;
  }

  return cleanItem;
};

const filterModelDisableMultiColumnsFilteringWarning = (0, _warning.buildWarning)(['MUI: The `filterModel` can only contain a single item when the `disableMultipleColumnsFiltering` prop is set to `true`.', 'If you are using the community version of the `DataGrid`, this prop is always `true`.'], 'error');
const filterModelMissingItemIdWarning = (0, _warning.buildWarning)("MUI: The 'id' field is required on `filterModel.items` when you use multiple filters.", 'error');
const filterModelMissingItemOperatorWarning = (0, _warning.buildWarning)(['MUI: One of your filtering item have no `operatorValue` provided.', 'This property will become required on `@mui/x-data-grid@6.X`.']);

const sanitizeFilterModel = (model, disableMultipleColumnsFiltering, apiRef) => {
  const hasSeveralItems = model.items.length > 1;
  let items;

  if (hasSeveralItems && disableMultipleColumnsFiltering) {
    filterModelDisableMultiColumnsFilteringWarning();
    items = [model.items[0]];
  } else {
    items = model.items;
  }

  const hasItemsWithoutIds = hasSeveralItems && items.some(item => item.id == null);
  const hasItemWithoutOperator = items.some(item => item.operatorValue == null);

  if (hasItemsWithoutIds) {
    filterModelMissingItemIdWarning();
  }

  if (hasItemWithoutOperator) {
    filterModelMissingItemOperatorWarning();
  }

  if (hasItemWithoutOperator || hasItemsWithoutIds) {
    return (0, _extends2.default)({}, model, {
      items: items.map(item => cleanFilterItem(item, apiRef))
    });
  }

  if (model.items !== items) {
    return (0, _extends2.default)({}, model, {
      items
    });
  }

  return model;
};

exports.sanitizeFilterModel = sanitizeFilterModel;

const mergeStateWithFilterModel = (filterModel, disableMultipleColumnsFiltering, apiRef) => state => (0, _extends2.default)({}, state, {
  filter: (0, _extends2.default)({}, state.filter, {
    filterModel: sanitizeFilterModel(filterModel, disableMultipleColumnsFiltering, apiRef)
  })
});
/**
 * Generates a method to easily check if a row is matching the current filter model.
 * @param {GridFilterModel} filterModel The model with which we want to filter the rows.
 * @param {React.MutableRefObject<GridApiCommunity>} apiRef The API of the grid.
 * @returns {GridAggregatedFilterItemApplier | null} A method that checks if a row is matching the current filter model. If `null`, we consider that all the rows are matching the filters.
 */


exports.mergeStateWithFilterModel = mergeStateWithFilterModel;

const buildAggregatedFilterApplier = (filterModel, apiRef) => {
  const {
    items,
    linkOperator = _models.GridLinkOperator.And
  } = filterModel;

  const getFilterCallbackFromItem = filterItem => {
    if (!filterItem.columnField || !filterItem.operatorValue) {
      return null;
    }

    const column = apiRef.current.getColumn(filterItem.columnField);

    if (!column) {
      return null;
    }

    let parsedValue;

    if (column.valueParser) {
      var _filterItem$value;

      const parser = column.valueParser;
      parsedValue = Array.isArray(filterItem.value) ? (_filterItem$value = filterItem.value) == null ? void 0 : _filterItem$value.map(x => parser(x)) : parser(filterItem.value);
    } else {
      parsedValue = filterItem.value;
    }

    const newFilterItem = (0, _extends2.default)({}, filterItem, {
      value: parsedValue
    });
    const filterOperators = column.filterOperators;

    if (!(filterOperators != null && filterOperators.length)) {
      throw new Error(`MUI: No filter operators found for column '${column.field}'.`);
    }

    const filterOperator = filterOperators.find(operator => operator.value === newFilterItem.operatorValue);

    if (!filterOperator) {
      throw new Error(`MUI: No filter operator found for column '${column.field}' and operator value '${newFilterItem.operatorValue}'.`);
    }

    const applyFilterOnRow = filterOperator.getApplyFilterFn(newFilterItem, column);

    if (typeof applyFilterOnRow !== 'function') {
      return null;
    }

    const fn = rowId => {
      const cellParams = apiRef.current.getCellParams(rowId, newFilterItem.columnField);
      return applyFilterOnRow(cellParams);
    };

    return {
      fn,
      item: newFilterItem
    };
  };

  const appliers = items.map(getFilterCallbackFromItem).filter(callback => !!callback);

  if (appliers.length === 0) {
    return null;
  }

  return (rowId, shouldApplyFilter) => {
    const filteredAppliers = shouldApplyFilter ? appliers.filter(applier => shouldApplyFilter(applier.item)) : appliers; // Return `false` as soon as we have a failing filter

    if (linkOperator === _models.GridLinkOperator.And) {
      return filteredAppliers.every(applier => applier.fn(rowId));
    } // Return `true` as soon as we have a passing filter


    return filteredAppliers.some(applier => applier.fn(rowId));
  };
};

exports.buildAggregatedFilterApplier = buildAggregatedFilterApplier;