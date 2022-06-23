import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "className", "classes"];
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
export const gridPanelClasses = generateUtilityClasses('MuiDataGrid', ['panel', 'paper']);
const GridPanelRoot = styled(Popper, {
  name: 'MuiDataGrid',
  slot: 'Panel',
  overridesResolver: (props, styles) => styles.panel
})(({
  theme
}) => ({
  zIndex: theme.zIndex.modal
}));
const GridPaperRoot = styled(Paper, {
  name: 'MuiDataGrid',
  slot: 'Paper',
  overridesResolver: (props, styles) => styles.paper
})(({
  theme
}) => ({
  backgroundColor: theme.palette.background.paper,
  minWidth: 300,
  maxHeight: 450,
  display: 'flex'
}));
const GridPanel = /*#__PURE__*/React.forwardRef((props, ref) => {
  var _apiRef$current$colum;

  const {
    children,
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const apiRef = useGridApiContext();
  const classes = gridPanelClasses;
  const [isPlaced, setIsPlaced] = React.useState(false);
  const handleClickAway = React.useCallback(() => {
    apiRef.current.hidePreferences();
  }, [apiRef]);
  const handleKeyDown = React.useCallback(event => {
    if (isEscapeKey(event.key)) {
      apiRef.current.hidePreferences();
    }
  }, [apiRef]);
  const modifiers = React.useMemo(() => [{
    name: 'flip',
    enabled: false
  }, {
    name: 'isPlaced',
    enabled: true,
    phase: 'main',
    fn: () => {
      setIsPlaced(true);
    },
    effect: () => () => {
      setIsPlaced(false);
    }
  }], []);
  const anchorEl = (_apiRef$current$colum = apiRef.current.columnHeadersContainerElementRef) == null ? void 0 : _apiRef$current$colum.current;

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