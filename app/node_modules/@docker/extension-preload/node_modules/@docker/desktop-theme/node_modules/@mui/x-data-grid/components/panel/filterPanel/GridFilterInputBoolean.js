import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["item", "applyValue", "apiRef", "focusElementRef"];
import * as React from 'react';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function GridFilterInputBoolean(props) {
  var _rootProps$components;

  const {
    item,
    applyValue,
    apiRef,
    focusElementRef
  } = props,
        others = _objectWithoutPropertiesLoose(props, _excluded);

  const [filterValueState, setFilterValueState] = React.useState(item.value || '');
  const rootProps = useGridRootProps();
  const onFilterChange = React.useCallback(event => {
    const value = event.target.value;
    setFilterValueState(value);
    applyValue(_extends({}, item, {
      value
    }));
  }, [applyValue, item]);
  React.useEffect(() => {
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