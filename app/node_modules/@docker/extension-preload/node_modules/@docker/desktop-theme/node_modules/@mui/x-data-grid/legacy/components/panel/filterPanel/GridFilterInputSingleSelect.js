import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
var _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@mui/material/utils';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { getValueFromValueOptions } from './filterPanelUtils';
import { jsx as _jsx } from "react/jsx-runtime";

var renderSingleSelectOptions = function renderSingleSelectOptions(_ref, api) {
  var valueOptions = _ref.valueOptions,
      valueFormatter = _ref.valueFormatter,
      field = _ref.field;
  var iterableColumnValues = typeof valueOptions === 'function' ? [''].concat(_toConsumableArray(valueOptions({
    field: field
  }))) : [''].concat(_toConsumableArray(valueOptions || []));
  return iterableColumnValues.map(function (option) {
    return _typeof(option) === 'object' ? /*#__PURE__*/_jsx("option", {
      value: option.value,
      children: option.label
    }, option.value) : /*#__PURE__*/_jsx("option", {
      value: option,
      children: valueFormatter && option !== '' ? valueFormatter({
        value: option,
        field: field,
        api: api
      }) : option
    }, option);
  });
};

function GridFilterInputSingleSelect(props) {
  var _item$value, _rootProps$components;

  var item = props.item,
      applyValue = props.applyValue,
      type = props.type,
      apiRef = props.apiRef,
      focusElementRef = props.focusElementRef,
      others = _objectWithoutProperties(props, _excluded);

  var _React$useState = React.useState((_item$value = item.value) != null ? _item$value : ''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      filterValueState = _React$useState2[0],
      setFilterValueState = _React$useState2[1];

  var id = useId();
  var rootProps = useGridRootProps();
  var currentColumn = item.columnField ? apiRef.current.getColumn(item.columnField) : null;
  var currentValueOptions = React.useMemo(function () {
    return typeof currentColumn.valueOptions === 'function' ? currentColumn.valueOptions({
      field: currentColumn.field
    }) : currentColumn.valueOptions;
  }, [currentColumn]);
  var onFilterChange = React.useCallback(function (event) {
    var value = event.target.value; // NativeSelect casts the value to a string.

    value = getValueFromValueOptions(value, currentValueOptions);
    setFilterValueState(String(value));
    applyValue(_extends({}, item, {
      value: value
    }));
  }, [applyValue, item, currentValueOptions]);
  React.useEffect(function () {
    var _itemValue;

    var itemValue;

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