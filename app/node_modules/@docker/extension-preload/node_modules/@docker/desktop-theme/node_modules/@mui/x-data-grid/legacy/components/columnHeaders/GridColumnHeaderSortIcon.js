import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { GridIconButtonContainer } from './GridIconButtonContainer';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    icon: ['sortIcon']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

function getIcon(icons, direction, className, sortingOrder) {
  var Icon;
  var iconProps = {};

  if (direction === 'asc') {
    Icon = icons.ColumnSortedAscendingIcon;
  } else if (direction === 'desc') {
    Icon = icons.ColumnSortedDescendingIcon;
  } else {
    Icon = icons.ColumnUnsortedIcon;
    iconProps.sortingOrder = sortingOrder;
  }

  return Icon ? /*#__PURE__*/_jsx(Icon, _extends({
    fontSize: "small",
    className: className
  }, iconProps)) : null;
}

function GridColumnHeaderSortIconRaw(props) {
  var direction = props.direction,
      index = props.index,
      sortingOrder = props.sortingOrder;
  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();

  var ownerState = _extends({}, props, {
    classes: rootProps.classes
  });

  var classes = useUtilityClasses(ownerState);
  var iconElement = getIcon(rootProps.components, direction, classes.icon, sortingOrder);

  if (!iconElement) {
    return null;
  }

  var iconButton = /*#__PURE__*/_jsx(IconButton, {
    tabIndex: -1,
    "aria-label": apiRef.current.getLocaleText('columnHeaderSortIconLabel'),
    title: apiRef.current.getLocaleText('columnHeaderSortIconLabel'),
    size: "small",
    children: iconElement
  });

  return /*#__PURE__*/_jsxs(GridIconButtonContainer, {
    children: [index != null && /*#__PURE__*/_jsx(Badge, {
      badgeContent: index,
      color: "default",
      children: iconButton
    }), index == null && iconButton]
  });
}

var GridColumnHeaderSortIcon = /*#__PURE__*/React.memo(GridColumnHeaderSortIconRaw);
process.env.NODE_ENV !== "production" ? GridColumnHeaderSortIconRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  direction: PropTypes.oneOf(['asc', 'desc']),
  index: PropTypes.number,
  sortingOrder: PropTypes.arrayOf(PropTypes.oneOf(['asc', 'desc'])).isRequired
} : void 0;
export { GridColumnHeaderSortIcon };