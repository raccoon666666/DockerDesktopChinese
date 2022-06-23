import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { GridFilterInputDate } from '../components/panel/filterPanel/GridFilterInputDate';
var dateRegex = /(\d+)-(\d+)-(\d+)/;
var dateTimeRegex = /(\d+)-(\d+)-(\d+)T(\d+):(\d+)/;

function buildApplyFilterFn(filterItem, compareFn, showTime, keepHours) {
  if (!filterItem.value) {
    return null;
  }

  var _slice$map = filterItem.value.match(showTime ? dateTimeRegex : dateRegex).slice(1).map(Number),
      _slice$map2 = _slicedToArray(_slice$map, 5),
      year = _slice$map2[0],
      month = _slice$map2[1],
      day = _slice$map2[2],
      hour = _slice$map2[3],
      minute = _slice$map2[4];

  var time = new Date(year, month - 1, day, hour || 0, minute || 0).getTime();
  return function (_ref) {
    var value = _ref.value;

    if (!value) {
      return false;
    }

    var valueAsDate = value instanceof Date ? value : new Date(value.toString());

    if (keepHours) {
      return compareFn(valueAsDate.getTime(), time);
    } // Make a copy of the date to not reset the hours in the original object


    var dateCopy = value instanceof Date ? new Date(valueAsDate) : valueAsDate;
    var timeToCompare = dateCopy.setHours(showTime ? valueAsDate.getHours() : 0, showTime ? valueAsDate.getMinutes() : 0, 0, 0);
    return compareFn(timeToCompare, time);
  };
}

export var getGridDateOperators = function getGridDateOperators(showTime) {
  return [{
    value: 'is',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      return buildApplyFilterFn(filterItem, function (value1, value2) {
        return value1 === value2;
      }, showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: {
      type: showTime ? 'datetime-local' : 'date'
    }
  }, {
    value: 'not',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      return buildApplyFilterFn(filterItem, function (value1, value2) {
        return value1 !== value2;
      }, showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: {
      type: showTime ? 'datetime-local' : 'date'
    }
  }, {
    value: 'after',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      return buildApplyFilterFn(filterItem, function (value1, value2) {
        return value1 > value2;
      }, showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: {
      type: showTime ? 'datetime-local' : 'date'
    }
  }, {
    value: 'onOrAfter',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      return buildApplyFilterFn(filterItem, function (value1, value2) {
        return value1 >= value2;
      }, showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: {
      type: showTime ? 'datetime-local' : 'date'
    }
  }, {
    value: 'before',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      return buildApplyFilterFn(filterItem, function (value1, value2) {
        return value1 < value2;
      }, showTime, !showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: {
      type: showTime ? 'datetime-local' : 'date'
    }
  }, {
    value: 'onOrBefore',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      return buildApplyFilterFn(filterItem, function (value1, value2) {
        return value1 <= value2;
      }, showTime);
    },
    InputComponent: GridFilterInputDate,
    InputComponentProps: {
      type: showTime ? 'datetime-local' : 'date'
    }
  }, {
    value: 'isEmpty',
    getApplyFilterFn: function getApplyFilterFn() {
      return function (_ref2) {
        var value = _ref2.value;
        return value == null;
      };
    }
  }, {
    value: 'isNotEmpty',
    getApplyFilterFn: function getApplyFilterFn() {
      return function (_ref3) {
        var value = _ref3.value;
        return value != null;
      };
    }
  }];
};