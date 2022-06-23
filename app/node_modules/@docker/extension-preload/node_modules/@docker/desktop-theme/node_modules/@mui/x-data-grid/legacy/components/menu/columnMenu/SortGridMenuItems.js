import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { useGridSelector } from '../../../hooks/utils/useGridSelector';
import { gridSortModelSelector } from '../../../hooks/features/sorting/gridSortingSelector';
import { useGridApiContext } from '../../../hooks/utils/useGridApiContext';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var SortGridMenuItems = function SortGridMenuItems(props) {
  var column = props.column,
      onClick = props.onClick;
  var apiRef = useGridApiContext();
  var sortModel = useGridSelector(apiRef, gridSortModelSelector);
  var sortDirection = React.useMemo(function () {
    if (!column) {
      return null;
    }

    var sortItem = sortModel.find(function (item) {
      return item.field === column.field;
    });
    return sortItem == null ? void 0 : sortItem.sort;
  }, [column, sortModel]);
  var onSortMenuItemClick = React.useCallback(function (event) {
    onClick(event);
    var direction = event.currentTarget.getAttribute('data-value') || null;
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