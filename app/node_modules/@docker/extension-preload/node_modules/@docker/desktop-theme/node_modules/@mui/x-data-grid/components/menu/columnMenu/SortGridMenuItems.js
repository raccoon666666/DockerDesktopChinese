import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { useGridSelector } from '../../../hooks/utils/useGridSelector';
import { gridSortModelSelector } from '../../../hooks/features/sorting/gridSortingSelector';
import { useGridApiContext } from '../../../hooks/utils/useGridApiContext';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const SortGridMenuItems = props => {
  const {
    column,
    onClick
  } = props;
  const apiRef = useGridApiContext();
  const sortModel = useGridSelector(apiRef, gridSortModelSelector);
  const sortDirection = React.useMemo(() => {
    if (!column) {
      return null;
    }

    const sortItem = sortModel.find(item => item.field === column.field);
    return sortItem == null ? void 0 : sortItem.sort;
  }, [column, sortModel]);
  const onSortMenuItemClick = React.useCallback(event => {
    onClick(event);
    const direction = event.currentTarget.getAttribute('data-value') || null;
    apiRef.current.sortColumn(column, direction);
  }, [apiRef, column, onClick]);

  if (!column || !column.sortable) {
    return null;
  }

  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(MenuItem, {
      onClick: onSortMenuItemClick,
      disabled: sortDirection == null,
      children: apiRef.current.getLocaleText('columnMenuUnsort')
    }), /*#__PURE__*/_jsx(MenuItem, {
      onClick: onSortMenuItemClick,
      "data-value": "asc",
      disabled: sortDirection === 'asc',
      children: apiRef.current.getLocaleText('columnMenuSortAsc')
    }), /*#__PURE__*/_jsx(MenuItem, {
      onClick: onSortMenuItemClick,
      "data-value": "desc",
      disabled: sortDirection === 'desc',
      children: apiRef.current.getLocaleText('columnMenuSortDesc')
    })]
  });
};

process.env.NODE_ENV !== "production" ? SortGridMenuItems.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  column: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
} : void 0;
export { SortGridMenuItems };