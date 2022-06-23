import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
      open = ownerState.open;
  var slots = {
    root: ['menuIcon', open && 'menuOpen'],
    button: ['menuIconButton']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

export var ColumnHeaderMenuIcon = /*#__PURE__*/React.memo(function (props) {
  var column = props.column,
      open = props.open,
      columnMenuId = props.columnMenuId,
      columnMenuButtonId = props.columnMenuButtonId,
      iconButtonRef = props.iconButtonRef;
  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();

  var ownerState = _extends({}, props, {
    classes: rootProps.classes
  });

  var classes = useUtilityClasses(ownerState);
  var handleMenuIconClick = React.useCallback(function (event) {
    event.preventDefault();
    event.stopPropagation();
    apiRef.current.toggleColumnMenu(column.field);
  }, [apiRef, column.field]);
  return /*#__PURE__*/_jsx("div", {
    className: classes.root,
    children: /*#__PURE__*/_jsx(IconButton, {
      ref: iconButtonRef,
      tabIndex: -1,
      className: classes.button,
      "aria-label": apiRef.current.getLocaleText('columnMenuLabel'),
      title: apiRef.current.getLocaleText('columnMenuLabel'),
      size: "small",
      onClick: handleMenuIconClick,
      "aria-expanded": open ? 'true' : undefined,
      "aria-haspopup": "true",
      "aria-controls": columnMenuId,
      id: columnMenuButtonId,
      children: /*#__PURE__*/_jsx(rootProps.components.ColumnMenuIcon, {
        fontSize: "small"
      })
    })
  });
});