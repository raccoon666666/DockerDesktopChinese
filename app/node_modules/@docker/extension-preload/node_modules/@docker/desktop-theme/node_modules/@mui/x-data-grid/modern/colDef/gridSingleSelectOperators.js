import { GridFilterInputSingleSelect } from '../components/panel/filterPanel/GridFilterInputSingleSelect';
import { GridFilterInputMultipleSingleSelect } from '../components/panel/filterPanel/GridFilterInputMultipleSingleSelect';

const parseObjectValue = value => {
  if (value == null || typeof value !== 'object') {
    return value;
  }

  return value.value;
};

export const getGridSingleSelectOperators = () => [{
  value: 'is',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || filterItem.value === '') {
      return null;
    }

    return ({
      value
    }) => parseObjectValue(value) === parseObjectValue(filterItem.value);
  },
  InputComponent: GridFilterInputSingleSelect
}, {
  value: 'not',
  getApplyFilterFn: filterItem => {
    if (filterItem.value == null || filterItem.value === '') {
      return null;
    }

    return ({
      value
    }) => parseObjectValue(value) !== parseObjectValue(filterItem.value);
  },
  InputComponent: GridFilterInputSingleSelect
}, {
  value: 'isAnyOf',
  getApplyFilterFn: filterItem => {
    if (!Array.isArray(filterItem.value) || filterItem.value.length === 0) {
      return null;
    }

    const filterItemValues = filterItem.value.map(parseObjectValue);
    return ({
      value
    }) => filterItemValues.includes(parseObjectValue(value));
  },
  InputComponent: GridFilterInputMultipleSingleSelect
}];