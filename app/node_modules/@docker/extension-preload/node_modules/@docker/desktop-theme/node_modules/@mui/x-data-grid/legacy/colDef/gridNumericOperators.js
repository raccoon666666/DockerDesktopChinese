import { GridFilterInputValue } from '../components/panel/filterPanel/GridFilterInputValue';
import { GridFilterInputMultipleValue } from '../components/panel/filterPanel/GridFilterInputMultipleValue';
import { wrapWithWarningOnCall } from '../utils/warning';

var parseNumericValue = function parseNumericValue(value) {
  if (value == null) {
    return null;
  }

  return Number(value);
};

export var getGridNumericOperators = function getGridNumericOperators() {
  return [{
    label: '=',
    value: '=',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }

      return function (_ref) {
        var value = _ref.value;
        return parseNumericValue(value) === filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: {
      type: 'number'
    }
  }, {
    label: '!=',
    value: '!=',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }

      return function (_ref2) {
        var value = _ref2.value;
        return parseNumericValue(value) !== filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: {
      type: 'number'
    }
  }, {
    label: '>',
    value: '>',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }

      return function (_ref3) {
        var value = _ref3.value;

        if (value == null) {
          return false;
        }

        return parseNumericValue(value) > filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: {
      type: 'number'
    }
  }, {
    label: '>=',
    value: '>=',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }

      return function (_ref4) {
        var value = _ref4.value;

        if (value == null) {
          return false;
        }

        return parseNumericValue(value) >= filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: {
      type: 'number'
    }
  }, {
    label: '<',
    value: '<',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }

      return function (_ref5) {
        var value = _ref5.value;

        if (value == null) {
          return false;
        }

        return parseNumericValue(value) < filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: {
      type: 'number'
    }
  }, {
    label: '<=',
    value: '<=',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (filterItem.value == null || Number.isNaN(filterItem.value)) {
        return null;
      }

      return function (_ref6) {
        var value = _ref6.value;

        if (value == null) {
          return false;
        }

        return parseNumericValue(value) <= filterItem.value;
      };
    },
    InputComponent: GridFilterInputValue,
    InputComponentProps: {
      type: 'number'
    }
  }, {
    value: 'isEmpty',
    getApplyFilterFn: function getApplyFilterFn() {
      return function (_ref7) {
        var value = _ref7.value;
        return value == null;
      };
    }
  }, {
    value: 'isNotEmpty',
    getApplyFilterFn: function getApplyFilterFn() {
      return function (_ref8) {
        var value = _ref8.value;
        return value != null;
      };
    }
  }, {
    value: 'isAnyOf',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
        return null;
      }

      return function (_ref9) {
        var value = _ref9.value;
        return value != null && filterItem.value.includes(Number(value));
      };
    },
    InputComponent: GridFilterInputMultipleValue,
    InputComponentProps: {
      type: 'number'
    }
  }];
};
/**
 * @deprecated Use `getGridNumericOperators` instead.
 */

export var getGridNumericColumnOperators = wrapWithWarningOnCall(getGridNumericOperators, ['MUI: The method getGridNumericColumnOperators is deprecated and will be removed in the next major version.', 'Use getGridNumericOperators instead.']);