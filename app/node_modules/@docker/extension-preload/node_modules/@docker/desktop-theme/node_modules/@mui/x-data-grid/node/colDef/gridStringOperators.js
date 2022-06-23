"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGridStringOperators = void 0;

var _GridFilterInputValue = require("../components/panel/filterPanel/GridFilterInputValue");

var _utils = require("../utils/utils");

var _GridFilterInputMultipleValue = require("../components/panel/filterPanel/GridFilterInputMultipleValue");

const getGridStringOperators = () => [{
  value: 'contains',
  getApplyFilterFn: filterItem => {
    if (!filterItem.value) {
      return null;
    }

    const filterRegex = new RegExp((0, _utils.escapeRegExp)(filterItem.value), 'i');
    return ({
      value
    }) => {
      return value != null ? filterRegex.test(value.toString()) : false;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue
}, {
  value: 'equals',
  getApplyFilterFn: filterItem => {
    if (!filterItem.value) {
      return null;
    }

    const collator = new Intl.Collator(undefined, {
      sensitivity: 'base',
      usage: 'search'
    });
    return ({
      value
    }) => {
      return value != null ? collator.compare(filterItem.value, value.toString()) === 0 : false;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue
}, {
  value: 'startsWith',
  getApplyFilterFn: filterItem => {
    if (!filterItem.value) {
      return null;
    }

    const filterRegex = new RegExp(`^${(0, _utils.escapeRegExp)(filterItem.value)}.*$`, 'i');
    return ({
      value
    }) => {
      return value != null ? filterRegex.test(value.toString()) : false;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue
}, {
  value: 'endsWith',
  getApplyFilterFn: filterItem => {
    if (!filterItem.value) {
      return null;
    }

    const filterRegex = new RegExp(`.*${(0, _utils.escapeRegExp)(filterItem.value)}$`, 'i');
    return ({
      value
    }) => {
      return value != null ? filterRegex.test(value.toString()) : false;
    };
  },
  InputComponent: _GridFilterInputValue.GridFilterInputValue
}, {
  value: 'isEmpty',
  getApplyFilterFn: () => {
    return ({
      value
    }) => {
      return value === '' || value == null;
    };
  }
}, {
  value: 'isNotEmpty',
  getApplyFilterFn: () => {
    return ({
      value
    }) => {
      return value !== '' && value != null;
    };
  }
}, {
  value: 'isAnyOf',
  getApplyFilterFn: filterItem => {
    if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
      return null;
    }

    const collator = new Intl.Collator(undefined, {
      sensitivity: 'base',
      usage: 'search'
    });
    return ({
      value
    }) => value != null ? filterItem.value.some(filterValue => {
      return collator.compare(filterValue, value.toString() || '') === 0;
    }) : false;
  },
  InputComponent: _GridFilterInputMultipleValue.GridFilterInputMultipleValue
}];

exports.getGridStringOperators = getGridStringOperators;