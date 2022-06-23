import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
export function GridHeaderPlaceholder() {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const headerRef = React.useRef(null);
  apiRef.current.headerRef = headerRef;
  return /*#__PURE__*/_jsx("div", {
    ref: headerRef,
    children: /*#__PURE__*/_jsx(rootProps.components.Header, _extends({}, rootProps.componentsProps?.header))
  });
}