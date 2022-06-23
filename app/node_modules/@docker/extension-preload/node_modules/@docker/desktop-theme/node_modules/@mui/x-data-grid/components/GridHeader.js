import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const GridHeader = /*#__PURE__*/React.forwardRef(function GridHeader(props, ref) {
  var _rootProps$components, _rootProps$components2;

  const rootProps = useGridRootProps();
  return /*#__PURE__*/_jsxs("div", _extends({
    ref: ref
  }, props, {
    children: [/*#__PURE__*/_jsx(rootProps.components.PreferencesPanel, _extends({}, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.preferencesPanel)), rootProps.components.Toolbar && /*#__PURE__*/_jsx(rootProps.components.Toolbar, _extends({}, (_rootProps$components2 = rootProps.componentsProps) == null ? void 0 : _rootProps$components2.toolbar))]
  }));
});