import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["open", "target", "onClickAway", "children", "position", "className", "onExited"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { styled } from '@mui/material/styles';
import { HTMLElementType } from '@mui/utils';
import { getDataGridUtilityClass, gridClasses } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['menu']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridMenuRoot = styled(Popper, {
  name: 'MuiDataGrid',
  slot: 'Menu',
  overridesResolver: (props, styles) => styles.menu
})(({
  theme
}) => ({
  zIndex: theme.zIndex.modal,
  [`& .${gridClasses.menuList}`]: {
    outline: 0
  }
}));
const transformOrigin = {
  'bottom-start': 'top left',
  'bottom-end': 'top right'
};

const GridMenu = props => {
  var _rootProps$components;

  const {
    open,
    target,
    onClickAway,
    children,
    position,
    className,
    onExited
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const prevTarget = React.useRef(target);
  const prevOpen = React.useRef(open);
  const rootProps = useGridRootProps();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  React.useEffect(() => {
    if (prevOpen.current && prevTarget.current) {
      prevTarget.current.focus();
    }

    prevOpen.current = open;
    prevTarget.current = target;
  }, [open, target]);

  const handleExited = popperOnExited => node => {
    if (popperOnExited) {
      popperOnExited();
    }

    if (onExited) {
      onExited(node);
    }
  };

  return /*#__PURE__*/_jsx(GridMenuRoot, _extends({
    as: rootProps.components.BasePopper,
    className: clsx(className, classes.root),
    open: open,
    anchorEl: target,
    transition: true,
    placement: position
  }, other, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.basePopper, {
    children: ({
      TransitionProps,
      placement
    }) => /*#__PURE__*/_jsx(ClickAwayListener, {
      onClickAway: onClickAway,
      children: /*#__PURE__*/_jsx(Grow, _extends({}, TransitionProps, {
        style: {
          transformOrigin: transformOrigin[placement]
        },
        onExited: handleExited(TransitionProps == null ? void 0 : TransitionProps.onExited),
        children: /*#__PURE__*/_jsx(Paper, {
          children: children
        })
      }))
    })
  }));
};

process.env.NODE_ENV !== "production" ? GridMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  onClickAway: PropTypes.func.isRequired,
  onExited: PropTypes.func,

  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  target: HTMLElementType
} : void 0;
export { GridMenu };