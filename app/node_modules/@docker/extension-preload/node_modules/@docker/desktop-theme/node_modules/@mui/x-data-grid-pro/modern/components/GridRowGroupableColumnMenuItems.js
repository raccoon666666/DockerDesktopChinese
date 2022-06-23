import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { gridColumnLookupSelector, useGridSelector } from '@mui/x-data-grid';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { gridRowGroupingSanitizedModelSelector } from '../hooks/features/rowGrouping/gridRowGroupingSelector';
import { jsx as _jsx } from "react/jsx-runtime";

const GridRowGroupableColumnMenuItems = props => {
  const {
    column,
    onClick
  } = props;
  const apiRef = useGridApiContext();
  const rowGroupingModel = useGridSelector(apiRef, gridRowGroupingSanitizedModelSelector);
  const columnsLookup = useGridSelector(apiRef, gridColumnLookupSelector);

  if (!column?.groupable) {
    return null;
  }

  const ungroupColumn = event => {
    apiRef.current.removeRowGroupingCriteria(column.field);

    if (onClick) {
      onClick(event);
    }
  };

  const groupColumn = event => {
    apiRef.current.addRowGroupingCriteria(column.field);

    if (onClick) {
      onClick(event);
    }
  };

  const name = columnsLookup[column.field].headerName ?? column.field;

  if (rowGroupingModel.includes(column.field)) {
    return /*#__PURE__*/_jsx(MenuItem, {
      onClick: ungroupColumn,
      children: apiRef.current.getLocaleText('unGroupColumn')(name)
    });
  }

  return /*#__PURE__*/_jsx(MenuItem, {
    onClick: groupColumn,
    children: apiRef.current.getLocaleText('groupColumn')(name)
  });
};

process.env.NODE_ENV !== "production" ? GridRowGroupableColumnMenuItems.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  column: PropTypes.object,
  onClick: PropTypes.func
} : void 0;
export { GridRowGroupableColumnMenuItems };