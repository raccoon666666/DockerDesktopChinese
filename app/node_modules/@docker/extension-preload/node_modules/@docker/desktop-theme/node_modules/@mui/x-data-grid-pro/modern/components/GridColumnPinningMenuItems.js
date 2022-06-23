import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { GridPinnedPosition } from '../hooks/features/columnPinning';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const GridColumnPinningMenuItems = props => {
  const {
    column,
    onClick
  } = props;
  const apiRef = useGridApiContext();

  const pinColumn = side => event => {
    apiRef.current.pinColumn(column.field, side);

    if (onClick) {
      onClick(event);
    }
  };

  const unpinColumn = event => {
    apiRef.current.unpinColumn(column.field);

    if (onClick) {
      onClick(event);
    }
  };

  if (!column) {
    return null;
  }

  const side = apiRef.current.isColumnPinned(column.field);

  if (side) {
    const otherSide = side === GridPinnedPosition.right ? GridPinnedPosition.left : GridPinnedPosition.right;
    const label = otherSide === GridPinnedPosition.right ? 'pinToRight' : 'pinToLeft';
    return /*#__PURE__*/_jsxs(React.Fragment, {
      children: [/*#__PURE__*/_jsx(MenuItem, {
        onClick: pinColumn(otherSide),
        children: apiRef.current.getLocaleText(label)
      }), /*#__PURE__*/_jsx(MenuItem, {
        onClick: unpinColumn,
        children: apiRef.current.getLocaleText('unpin')
      })]
    });
  }

  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(MenuItem, {
      onClick: pinColumn(GridPinnedPosition.left),
      children: apiRef.current.getLocaleText('pinToLeft')
    }), /*#__PURE__*/_jsx(MenuItem, {
      onClick: pinColumn(GridPinnedPosition.right),
      children: apiRef.current.getLocaleText('pinToRight')
    })]
  });
};

process.env.NODE_ENV !== "production" ? GridColumnPinningMenuItems.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  column: PropTypes.object,
  onClick: PropTypes.func
} : void 0;
export { GridColumnPinningMenuItems };