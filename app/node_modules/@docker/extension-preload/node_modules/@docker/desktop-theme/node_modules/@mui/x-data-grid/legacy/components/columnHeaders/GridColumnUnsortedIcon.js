import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["sortingOrder"];
import * as React from 'react';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
export var GridColumnUnsortedIcon = /*#__PURE__*/React.memo(function GridColumnHeaderSortIcon(props) {
  var sortingOrder = props.sortingOrder,
      other = _objectWithoutProperties(props, _excluded);

  var rootProps = useGridRootProps();

  var _sortingOrder = _slicedToArray(sortingOrder, 1),
      nextSortDirection = _sortingOrder[0];

  var Icon = nextSortDirection === 'asc' ? rootProps.components.ColumnSortedAscendingIcon : rootProps.components.ColumnSortedDescendingIcon;
  return Icon ? /*#__PURE__*/_jsx(Icon, _extends({}, other)) : null;
});