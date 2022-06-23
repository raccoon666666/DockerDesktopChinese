import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "className", "classes"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { generateUtilityClasses } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { isEscapeKey } from '../../utils/keyboardUtils';
import { jsx as _jsx } from "react/jsx-runtime";
export var gridPanelClasses = generateUtilityClasses('MuiDataGrid', ['panel', 'paper']);
var GridPanelRoot = styled(Popper, {
  name: 'MuiDataGrid',
  slot: 'Panel',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.panel;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    zIndex: theme.zIndex.modal
  };
});
var GridPaperRoot = styled(Paper, {
  name: 'MuiDataGrid',
  slot: 'Paper',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.paper;
  }
})(function (_ref2) {
  var theme = _ref2.theme;
  return {
    backgroundColor: theme.palette.background.paper,
    minWidth: 300,
    maxHeight: 450,
    display: 'flex'
  };
});
var GridPanel = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _apiRef$current$colum;

  var children = props.children,
      className = props.className,
      classesProp = props.classes,
      other = _objectWithoutProperties(props, _excluded);

  var apiRef = useGridApiContext();
  var classes = gridPanelClasses;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isPlaced = _React$useState2[0],
      setIsPlaced = _React$useState2[1];

  var handleClickAway = React.useCallback(function () {
    apiRef.current.hidePreferences();
  }, [apiRef]);
  var handleKeyDown = React.useCallback(function (event) {
    if (isEscapeKey(event.key)) {
      apiRef.current.hidePreferences();
    }
  }, [apiRef]);
  var modifiers = React.useMemo(function () {
    return [{
      name: 'flip',
      enabled: false
    }, {
      name: 'isPlaced',
      enabled: true,
      phase: 'main',
      fn: function fn() {
        setIsPlaced(true);
      },
      effect: function effect() {
        return function () {
          setIsPlaced(false);
        };
      }
    }];
  }, []);
  var anchorEl = (_apiRef$current$colum = apiRef.current.columnHeadersContainerElementRef) == null ? void 0 : _apiRef$current$colum.current;

  if (!anchorEl) {
    return null;
  }

  return /*#__PURE__*/_jsx(GridPanelRoot, _extends({
    ref: ref,
    placement: "bottom-start",
    className: clsx(className, classes.panel),
    anchorEl: anchorEl,
    modifiers: modifiers
  }, other, {
    children: /*#__PURE__*/_jsx(ClickAwayListener, {
      onClickAway: handleClickAway,
      children: /*#__PURE__*/_jsx(GridPaperRoot, {
        className: classes.paper,
        elevation: 8,
        onKeyDown: handleKeyDown,
        children: isPlaced && children
      })
    })
  }));
});
process.env.NODE_ENV !== "production" ? GridPanel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired
} : void 0;
export { GridPanel };