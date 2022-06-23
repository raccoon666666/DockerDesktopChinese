import _extends from "@babel/runtime/helpers/esm/extends";
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

const hasActions = colDef => typeof colDef.getActions === 'function';

const GridActionsCell = props => {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const touchRippleRefs = React.useRef({});
  const menuId = useId();
  const buttonId = useId();
  const rootProps = useGridRootProps();
  const {
    colDef,
    id,
    api,
    hasFocus,
    position = 'bottom-end'
  } = props; // TODO apply the rest to the root element

  React.useLayoutEffect(() => {
    if (!hasFocus) {
      Object.entries(touchRippleRefs.current).forEach(([index, ref]) => {
        ref == null ? void 0 : ref.stop({}, () => {
          delete touchRippleRefs.current[index];
        });
      });
    }
  }, [hasFocus]);

  if (!hasActions(colDef)) {
    throw new Error('MUI: Missing the `getActions` property in the `GridColDef`.');
  }

  const showMenu = () => setOpen(true);

  const hideMenu = () => setOpen(false);

  const options = colDef.getActions(api.getRowParams(id));
  const iconButtons = options.filter(option => !option.props.showInMenu);
  const menuButtons = options.filter(option => option.props.showInMenu);

  const handleTouchRippleRef = index => instance => {
    touchRippleRefs.current[index] = instance;
  };

  return /*#__PURE__*/_jsxs("div", {
    className: gridClasses.actionsCell,
    children: [iconButtons.map((button, index) => /*#__PURE__*/React.cloneElement(button, {
      key: index,
      touchRippleRef: handleTouchRippleRef(index)
    })), menuButtons.length > 0 && /*#__PURE__*/_jsx(IconButton, {
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
        children: menuButtons.map((button, index) => /*#__PURE__*/React.cloneElement(button, {
          key: index
        }))
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
export const renderActionsCell = params => /*#__PURE__*/_jsx(GridActionsCell, _extends({}, params));