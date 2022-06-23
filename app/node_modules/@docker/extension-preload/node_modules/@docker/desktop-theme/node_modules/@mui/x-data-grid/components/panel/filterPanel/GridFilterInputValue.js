import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@mui/material/utils';
import { GridLoadIcon } from '../../icons';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { getValueFromValueOptions } from './filterPanelUtils';
import { jsx as _jsx } from "react/jsx-runtime";
const warnedOnce = {};

function warnDeprecatedTypeSupport(type) {
  console.warn([`MUI: Using GridFilterInputValue with a "${type}" column is deprecated.`, 'Use GridFilterInputSingleSelect instead.'].join('\n'));
  warnedOnce[type] = true;
}

const renderSingleSelectOptions = ({
  valueOptions,
  valueFormatter,
  field
}, api) => {
  const iterableColumnValues = typeof valueOptions === 'function' ? ['', ...valueOptions({
    field
  })] : ['', ...(valueOptions || [])];
  return iterableColumnValues.map(option => typeof option === 'object' ? /*#__PURE__*/_jsx("option", {
    value: option.value,
    children: option.label
  }, option.value) : /*#__PURE__*/_jsx("option", {
    value: option,
    children: valueFormatter && option !== '' ? valueFormatter({
      value: option,
      field,
      api
    }) : option
  }, option));
};

export const SUBMIT_FILTER_STROKE_TIME = 500;

function GridFilterInputValue(props) {
  var _item$value, _rootProps$components;

  const {
    item,
    applyValue,
    type,
    apiRef,
    focusElementRef
  } = props,
        others = _objectWithoutPropertiesLoose(props, _excluded);

  if (process.env.NODE_ENV !== 'production' && ['date', 'datetime-local', 'singleSelect'].includes(type) && !warnedOnce[type]) {
    warnDeprecatedTypeSupport(type);
  }

  const filterTimeout = React.useRef();
  const [filterValueState, setFilterValueState] = React.useState((_item$value = item.value) != null ? _item$value : '');
  const [applying, setIsApplying] = React.useState(false);
  const id = useId();
  const rootProps = useGridRootProps();
  const singleSelectProps = type === 'singleSelect' ? {
    select: true,
    SelectProps: {
      native: true
    },
    children: renderSingleSelectOptions(apiRef.current.getColumn(item.columnField), apiRef.current)
  } : {};
  const onFilterChange = React.useCallback(event => {
    let value = event.target.value; // NativeSelect casts the value to a string.

    if (type === 'singleSelect') {
      const column = apiRef.current.getColumn(item.columnField);
      const columnValueOptions = typeof column.valueOptions === 'function' ? column.valueOptions({
        field: column.field
      }) : column.valueOptions;
      value = getValueFromValueOptions(value, columnValueOptions);
    }

    clearTimeout(filterTimeout.current);
    setFilterValueState(String(value));
    setIsApplying(true); // TODO singleSelect doesn't debounce

    filterTimeout.current = setTimeout(() => {
      applyValue(_extends({}, item, {
        value
      }));
      setIsApplying(false);
    }, SUBMIT_FILTER_STROKE_TIME);
  }, [apiRef, applyValue, item, type]);
  React.useEffect(() => {
    return () => {
      clearTimeout(filterTimeout.current);
    };
  }, []);
  React.useEffect(() => {
    var _item$value2;

    const itemValue = (_item$value2 = item.value) != null ? _item$value2 : '';
    setFilterValueState(String(itemValue));
  }, [item.value]);
  const InputProps = applying ? {
    endAdornment: /*#__PURE__*/_jsx(GridLoadIcon, {})
  } : others.InputProps;
  return /*#__PURE__*/_jsx(rootProps.components.BaseTextField, _extends({
    id: id,
    label: apiRef.current.getLocaleText('filterPanelInputLabel'),
    placeholder: apiRef.current.getLocaleText('filterPanelInputPlaceholder'),
    value: filterValueState,
    onChange: onFilterChange,
    type: type || 'text',
    variant: "standard",
    InputProps: InputProps,
    InputLabelProps: {
      shrink: true
    },
    inputRef: focusElementRef
  }, singleSelectProps, others, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseTextField));
}

process.env.NODE_ENV !== "production" ? GridFilterInputValue.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: PropTypes.any.isRequired,
  applyValue: PropTypes.func.isRequired,
  focusElementRef: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.func, PropTypes.object]),
  item: PropTypes.shape({
    columnField: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    operatorValue: PropTypes.string,
    value: PropTypes.any
  }).isRequired
} : void 0;
export { GridFilterInputValue };