import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';
import { unstable_useId as useId } from '@mui/material/utils';
import { gridClasses } from '../../constants/gridClasses';
import { GridMenu } from '../menu/GridMenu';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var hasActions = function hasActions(colDef) {
  return typeof colDef.getActions === 'function';
};

var GridActionsCell = function GridActionsCell(props) {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var buttonRef = React.useRef(null);
  var touchRippleRefs = React.useRef({});
  var menuId = useId();
  var buttonId = useId();
  var rootProps = useGridRootProps();
  var colDef = props.colDef,
      id = props.id,
      api = props.api,
      hasFocus = props.hasFocus,
      _props$position = props.position,
      position = _props$position === void 0 ? 'bottom-end' : _props$position; // TODO apply the rest to the root element

  React.useLayoutEffect(function () {
    if (!hasFocus) {
      Object.entries(touchRippleRefs.current).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            index = _ref2[0],
            ref = _ref2[1];

        ref == null ? void 0 : ref.stop({}, function () {
          delete touchRippleRefs.current[index];
        });
      });
    }
  }, [hasFocus]);

  if (!hasActions(colDef)) {
    throw new Error('MUI: Missing the `getActions` property in the `GridColDef`.');
  }

  var showMenu = function showMenu() {
    return setOpen(true);
  };

  var hideMenu = function hideMenu() {
    return setOpen(false);
  };

  var options = colDef.getActions(api.getRowParams(id));
  var iconButtons = options.filter(function (option) {
    return !option.props.showInMenu;
  });
  var menuButtons = options.filter(function (option) {
    return option.props.showInMenu;
  });

  var handleTouchRippleRef = function handleTouchRippleRef(index) {
    return function (instance) {
      touchRippleRefs.current[index] = instance;
    };
  };

  return /*#__PURE__*/_jsxs("div", {
    className: gridClasses.actionsCell,
    children: [iconButtons.map(function (button, index) {
      return /*#__PURE__*/React.cloneElement(button, {
        key: index,
        touchRippleRef: handleTouchRippleRef(index)
      });
    }), menuButtons.length > 0 && /*#__PURE__*/_jsx(IconButton, {
      ref: buttonRef,
      id: buttonId,
      "aria-label": api.getLocaleText('actionsCellMore'),
      "aria-controls": menuId,
      "aria-expanded": open ? 'true' : undefined,
      "aria-haspopup": "true",
      size: "small",
      onClick: showMenu,
      children: /*#__PURE__*/_jsx(rootProps.components.MoreActionsIcon, {
        fontSize: "small"
      })
    }), menuButtons.length > 0 && /*#__PURE__*/_jsx(GridMenu, {
      id: menuId,
      onClickAway: hideMenu,
      onClick: hideMenu,
      open: open,
      target: buttonRef.current,
      position: position,
      "aria-labelledby": buttonId,
      children: /*#__PURE__*/_jsx(MenuList, {
        className: gridClasses.menuList,
        children: menuButtons.map(function (button, index) {
          return /*#__PURE__*/React.cloneElement(button, {
            key: index
          });
        })
      })
    })]
  });
};

process.env.NODE_ENV !== "production" ? GridActionsCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * GridApi that let you manipulate the grid.
   * @deprecated Use the `apiRef` returned by `useGridApiContext` or `useGridApiRef` (only available in `@mui/x-data-grid-pro`)
   */
  api: PropTypes.any.isRequired,

  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,

  /**
   * If true, the cell is the active element.
   */
  hasFocus: PropTypes.bool.isRequired,

  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  position: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'])
} : void 0;
export { GridActionsCell };
export var renderActionsCell = function renderActionsCell(params) {
  return /*#__PURE__*/_jsx(GridActionsCell, _extends({}, params));
};