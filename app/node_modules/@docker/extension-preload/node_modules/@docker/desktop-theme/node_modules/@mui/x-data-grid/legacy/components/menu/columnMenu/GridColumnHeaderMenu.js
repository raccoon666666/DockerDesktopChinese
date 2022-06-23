import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementType } from '@mui/utils';
import { useGridApiContext } from '../../../hooks/utils/useGridApiContext';
import { GridMenu } from '../GridMenu';
import { jsx as _jsx } from "react/jsx-runtime";

function GridColumnHeaderMenu(_ref) {
  var columnMenuId = _ref.columnMenuId,
      columnMenuButtonId = _ref.columnMenuButtonId,
      ContentComponent = _ref.ContentComponent,
      contentComponentProps = _ref.contentComponentProps,
      field = _ref.field,
      open = _ref.open,
      target = _ref.target,
      onExited = _ref.onExited;
  var apiRef = useGridApiContext();
  var currentColumn = apiRef.current.getColumn(field);
  var hideMenu = React.useCallback(function (event) {
    // Prevent triggering the sorting
    event.stopPropagation();
    apiRef.current.hideColumnMenu();
  }, [apiRef]);

  if (!target) {
    return null;
  }

  return /*#__PURE__*/_jsx(GridMenu, {
    placement: "bottom-".concat(currentColumn.align === 'right' ? 'start' : 'end'),
    open: open,
    target: target,
    onClickAway: hideMenu,
    onExited: onExited,
    children: /*#__PURE__*/_jsx(ContentComponent, _extends({
      currentColumn: currentColumn,
      hideMenu: hideMenu,
      open: open,
      id: columnMenuId,
      labelledby: columnMenuButtonId
    }, contentComponentProps))
  });
}

process.env.NODE_ENV !== "production" ? GridColumnHeaderMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  columnMenuButtonId: PropTypes.string,
  columnMenuId: PropTypes.string,
  ContentComponent: PropTypes.elementType.isRequired,
  contentComponentProps: PropTypes.any,
  field: PropTypes.string.isRequired,
  onExited: PropTypes.func,
  open: PropTypes.bool.isRequired,
  target: HTMLElementType
} : void 0;
export { GridColumnHeaderMenu };