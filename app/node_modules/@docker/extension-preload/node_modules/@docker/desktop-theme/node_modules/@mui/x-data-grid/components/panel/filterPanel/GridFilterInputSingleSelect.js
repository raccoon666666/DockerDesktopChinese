import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@mui/material/utils';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { getValueFromValueOptions } from './filterPanelUtils';
import { jsx as _jsx } from "react/jsx-runtime";

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

function GridFilterInputSingleSelect(props) {
  var _item$value, _rootProps$components;

  const {
    item,
    applyValue,
    type,
    apiRef,
    focusElementRef
  } = props,
        others = _objectWithoutPropertiesLoose(props, _excluded);

  const [filterValueState, setFilterValueState] = React.useState((_item$value = item.value) != null ? _item$value : '');
  const id = useId();
  const rootProps = useGridRootProps();
  const currentColumn = item.columnField ? apiRef.current.getColumn(item.columnField) : null;
  const currentValueOptions = React.useMemo(() => {
    return typeof currentColumn.valueOptions === 'function' ? currentColumn.valueOptions({
      field: currentColumn.field
    }) : currentColumn.valueOptions;
  }, [currentColumn]);
  const onFilterChange = React.useCallback(event => {
    let value = event.target.value; // NativeSelect casts the value to a string.

    value = getValueFromValueOptions(value, currentValueOptions);
    setFilterValueState(String(value));
    applyValue(_extends({}, item, {
      value
    }));
  }, [applyValue, item, currentValueOptions]);
  React.useEffect(() => {
    var _itemValue;

    let itemValue;

    if (currentValueOptions !== undefined) {
      // sanitize if valueOptions are provided
      itemValue = getValueFromValueOptions(item.value, currentValueOptions);

      if (itemValue !== item.value) {
        applyValue(_extends({}, item, {
          value: itemValue
        }));
        return;
      }
    } else {
      itemValue = item.value;
    }

    itemValue = (_itemValue = itemValue) != null ? _itemValue : '';
    setFilterValueState(String(itemValue));
  }, [item, currentValueOptions, applyValue]);
  return /*#__PURE__*/_jsx(rootProps.components.BaseTextField, _extends({
    id: id,
    label: apiRef.current.getLocaleText('filterPanelInputLabel'),
    placeholder: apiRef.current.getLocaleText('filterPanelInputPlaceholder'),
    value: filterValueState,
    onChange: onFilterChange,
    type: type || 'text',
    variant: "standard",
    InputLabelProps: {
      shrink: true
    },
    inputRef: focusElementRef,
    select: true,
    SelectProps: {
      native: true
    }
  }, others, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseTextField, {
    children: renderSingleSelectOptions(apiRef.current.getColumn(item.columnField), apiRef.current)
  }));
}

process.env.NODE_ENV !== "production" ? GridFilterInputSingleSelect.propTypes = {
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
export { GridFilterInputSingleSelect };