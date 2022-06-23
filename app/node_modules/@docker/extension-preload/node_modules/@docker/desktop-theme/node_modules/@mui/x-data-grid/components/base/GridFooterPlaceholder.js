import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
export function GridFooterPlaceholder() {
  var _rootProps$components;

  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const footerRef = React.useRef(null);
  apiRef.current.footerRef = footerRef;

  if (rootProps.hideFooter) {
    return null;
  }

  return /*#__PURE__*/_jsx("div", {
    ref: footerRef,
    children: /*#__PURE__*/_jsx(rootProps.components.Footer, _extends({}, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.footer))
  });
}