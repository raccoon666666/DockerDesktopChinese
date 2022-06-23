"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGridNumericOperators = exports.getGridNumericColumnOperators = void 0;

var _GridFilterInputValue = require("../components/panel/filterPanel/GridFilterInputValue");

var _GridFilterInputMultipleValue = require("../components/panel/filterPanel/GridFilterInputMultipleValue");

var _warning = require("../utils/warning");

const parseNumericValue = value => {
  if (value == null) {
    return null;
  }

  return Number(value);
};

const getGridNumericOperators = () => [{
  label: '=',
  value: '=',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || Number.isNaN(filterItem.value)) {
      return null;
    }

    return ({
      value
    }) => {
      return parseNumericValue(value) === filterItem.value;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue,
  InputComponentProps: {
    type: 'number'
  }
}, {
  label: '!=',
  value: '!=',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || Number.isNaN(filterItem.value)) {
      return null;
    }

    return ({
      value
    }) => {
      return parseNumericValue(value) !== filterItem.value;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue,
  InputComponentProps: {
    type: 'number'
  }
}, {
  label: '>',
  value: '>',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || Number.isNaN(filterItem.value)) {
      return null;
    }

    return ({
      value
    }) => {
      if (value == null) {
        return false;
      }

      return parseNumericValue(value) > filterItem.value;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue,
  InputComponentProps: {
    type: 'number'
  }
}, {
  label: '>=',
  value: '>=',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || Number.isNaN(filterItem.value)) {
      return null;
    }

    return ({
      value
    }) => {
      if (value == null) {
        return false;
      }

      return parseNumericValue(value) >= filterItem.value;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue,
  InputComponentProps: {
    type: 'number'
  }
}, {
  label: '<',
  value: '<',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || Number.isNaN(filterItem.value)) {
      return null;
    }

    return ({
      value
    }) => {
      if (value == null) {
        return false;
      }

      return parseNumericValue(value) < filterItem.value;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue,
  InputComponentProps: {
    type: 'number'
  }
}, {
  label: '<=',
  value: '<=',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || Number.isNaN(filterItem.value)) {
      return null;
    }

    return ({
      value
    }) => {
      if (value == null) {
        return false;
      }

      return parseNumericValue(value) <= filterItem.value;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue,
  InputComponentProps: {
    type: 'number'
  }
}, {
  value: 'isEmpty',
  getApplyFilterFn: () => {
    return ({
      value
    }) => {
      return value == null;
    };
  }
}, {
  value: 'isNotEmpty',
  getApplyFilterFn: () => {
    return ({
      value
    }) => {
      return value != null;
    };
  }
}, {
  value: 'isAnyOf',
  getApplyFilterFn: filterItem => {
    if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
      return null;
    }

    return ({
      value
    }) => {
      return value != null && filterItem.value.includes(Number(value));
    };
  },
  InputComponent: _GridFilterInputMultipleValue.GridFilterInputMultipleValue,
  InputComponentProps: {
    type: 'number'
  }
}];
/**
 * @deprecated Use `getGridNumericOperators` instead.
 */


exports.getGridNumericOperators = getGridNumericOperators;
const getGridNumericColumnOperators = (0, _warning.wrapWithWarningOnCall)(getGridNumericOperators, ['MUI: The method getGridNumericColumnOperators is deprecated and will be removed in the next major version.', 'Use getGridNumericOperators instead.']);
exports.getGridNumericColumnOperators = getGridNumericColumnOperators;