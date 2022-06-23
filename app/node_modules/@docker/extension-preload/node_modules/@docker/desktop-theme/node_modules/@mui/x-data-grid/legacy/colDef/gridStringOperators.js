import { GridFilterInputValue } from '../components/panel/filterPanel/GridFilterInputValue';
import { escapeRegExp } from '../utils/utils';
import { GridFilterInputMultipleValue } from '../components/panel/filterPanel/GridFilterInputMultipleValue';
export var getGridStringOperators = function getGridStringOperators() {
  return [{
    value: 'contains',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (!filterItem.value) {
        return null;
      }

      var filterRegex = new RegExp(escapeRegExp(filterItem.value), 'i');
      return function (_ref) {
        var value = _ref.value;
        return value != null ? filterRegex.test(value.toString()) : false;
      };
    },
    InputComponent: GridFilterInputValue
  }, {
    value: 'equals',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (!filterItem.value) {
        return null;
      }

      var collator = new Intl.Collator(undefined, {
        sensitivity: 'base',
        usage: 'search'
      });
      return function (_ref2) {
        var value = _ref2.value;
        return value != null ? collator.compare(filterItem.value, value.toString()) === 0 : false;
      };
    },
    InputComponent: GridFilterInputValue
  }, {
    value: 'startsWith',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (!filterItem.value) {
        return null;
      }

      var filterRegex = new RegExp("^".concat(escapeRegExp(filterItem.value), ".*$"), 'i');
      return function (_ref3) {
        var value = _ref3.value;
        return value != null ? filterRegex.test(value.toString()) : false;
      };
    },
    InputComponent: GridFilterInputValue
  }, {
    value: 'endsWith',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (!filterItem.value) {
        return null;
      }

      var filterRegex = new RegExp(".*".concat(escapeRegExp(filterItem.value), "$"), 'i');
      return function (_ref4) {
        var value = _ref4.value;
        return value != null ? filterRegex.test(value.toString()) : false;
      };
    },
    InputComponent: GridFilterInputValue
  }, {
    value: 'isEmpty',
    getApplyFilterFn: function getApplyFilterFn() {
      return function (_ref5) {
        var value = _ref5.value;
        return value === '' || value == null;
      };
    }
  }, {
    value: 'isNotEmpty',
    getApplyFilterFn: function getApplyFilterFn() {
      return function (_ref6) {
        var value = _ref6.value;
        return value !== '' && value != null;
      };
    }
  }, {
    value: 'isAnyOf',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
        return null;
      }

      var collator = new Intl.Collator(undefined, {
        sensitivity: 'base',
        usage: 'search'
      });
      return function (_ref7) {
        var value = _ref7.value;
        return value != null ? filterItem.value.some(function (filterValue) {
          return collator.compare(filterValue, value.toString() || '') === 0;
        }) : false;
      };
    },
    InputComponent: GridFilterInputMultipleValue
  }];
};