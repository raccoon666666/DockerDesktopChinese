import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["item", "applyValue", "apiRef", "focusElementRef"];
import * as React from 'react';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function GridFilterInputBoolean(props) {
  var _rootProps$components;

  var item = props.item,
      applyValue = props.applyValue,
      apiRef = props.apiRef,
      focusElementRef = props.focusElementRef,
      others = _objectWithoutProperties(props, _excluded);

  var _React$useState = React.useState(item.value || ''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      filterValueState = _React$useState2[0],
      setFilterValueState = _React$useState2[1];

  var rootProps = useGridRootProps();
  var onFilterChange = React.useCallback(function (event) {
    var value = event.target.value;
    setFilterValueState(value);
    applyValue(_extends({}, item, {
      value: value
    }));
  }, [applyValue, item]);
  React.useEffect(function () {
    setFilterValueState(item.value || '');
  }, [item.value]);
  return /*#__PURE__*/_jsxs(rootProps.components.BaseTextField, _extends({
    label: apiRef.current.getLocaleText('filterPanelInputLabel'),
    value: filterValueState,
    onChange: onFilterChange,
    variant: "standard",
    select: true,
    SelectProps: {
      native: true
    },
    InputLabelProps: {
      shrink: true
    },
    inputRef: focusElementRef
  }, others, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseTextField, {
    children: [/*#__PURE__*/_jsx("option", {
      value: "",
      children: apiRef.current.getLocaleText('filterValueAny')
    }), /*#__PURE__*/_jsx("option", {
      value: "true",
      children: apiRef.current.getLocaleText('filterValueTrue')
    }), /*#__PURE__*/_jsx("option", {
      value: "false",
      children: apiRef.current.getLocaleText('filterValueFalse')
    })]
  }));
}