import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["sortingOrder"];
import * as React from 'react';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
export const GridColumnUnsortedIcon = /*#__PURE__*/React.memo(function GridColumnHeaderSortIcon(props) {
  const {
    sortingOrder
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const rootProps = useGridRootProps();
  const [nextSortDirection] = sortingOrder;
  const Icon = nextSortDirection === 'asc' ? rootProps.components.ColumnSortedAscendingIcon : rootProps.components.ColumnSortedDescendingIcon;
  return Icon ? /*#__PURE__*/_jsx(Icon, _extends({}, other)) : null;
});