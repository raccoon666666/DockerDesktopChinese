import _typeof from "@babel/runtime/helpers/esm/typeof";
import { GridFilterInputSingleSelect } from '../components/panel/filterPanel/GridFilterInputSingleSelect';
import { GridFilterInputMultipleSingleSelect } from '../components/panel/filterPanel/GridFilterInputMultipleSingleSelect';

var parseObjectValue = function parseObjectValue(value) {
  if (value == null || _typeof(value) !== 'object') {
    return value;
  }

  return value.value;
};

export var getGridSingleSelectOperators = function getGridSingleSelectOperators() {
  return [{
    value: 'is',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (filterItem.value == null || filterItem.value === '') {
        return null;
      }

      return function (_ref) {
        var value = _ref.value;
        return parseObjectValue(value) === parseObjectValue(filterItem.value);
      };
    },
    InputComponent: GridFilterInputSingleSelect
  }, {
    value: 'not',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (filterItem.value == null || filterItem.value === '') {
        return null;
      }

      return function (_ref2) {
        var value = _ref2.value;
        return parseObjectValue(value) !== parseObjectValue(filterItem.value);
      };
    },
    InputComponent: GridFilterInputSingleSelect
  }, {
    value: 'isAnyOf',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
        return null;
      }

      var filterItemValues = filterItem.value.map(parseObjectValue);
      return function (_ref3) {
        var value = _ref3.value;
        return filterItemValues.includes(parseObjectValue(value));
      };
    },
    InputComponent: GridFilterInputMultipleSingleSelect
  }];
};