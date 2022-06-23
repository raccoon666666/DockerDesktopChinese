import { GridFilterInputBoolean } from '../components/panel/filterPanel/GridFilterInputBoolean';
export var getGridBooleanOperators = function getGridBooleanOperators() {
  return [{
    value: 'is',
    getApplyFilterFn: function getApplyFilterFn(filterItem) {
      if (!filterItem.value) {
        return null;
      }

      var valueAsBoolean = filterItem.value === 'true';
      return function (_ref) {
        var value = _ref.value;
        return Boolean(value) === valueAsBoolean;
      };
    },
    InputComponent: GridFilterInputBoolean
  }];
};