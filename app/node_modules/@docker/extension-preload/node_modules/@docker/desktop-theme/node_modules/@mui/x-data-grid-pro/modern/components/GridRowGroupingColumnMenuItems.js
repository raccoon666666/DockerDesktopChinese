import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { useGridSelector, gridColumnLookupSelector } from '@mui/x-data-grid';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { gridRowGroupingSanitizedModelSelector } from '../hooks/features/rowGrouping/gridRowGroupingSelector';
import { getRowGroupingCriteriaFromGroupingField, GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD, isGroupingColumn } from '../hooks/features/rowGrouping/gridRowGroupingUtils';
import { jsx as _jsx } from "react/jsx-runtime";

const GridRowGroupingColumnMenuItems = props => {
  const {
    column,
    onClick
  } = props;
  const apiRef = useGridApiContext();
  const rowGroupingModel = useGridSelector(apiRef, gridRowGroupingSanitizedModelSelector);
  const columnsLookup = useGridSelector(apiRef, gridColumnLookupSelector);

  const renderUnGroupingMenuItem = field => {
    const ungroupColumn = event => {
      apiRef.current.removeRowGroupingCriteria(field);

      if (onClick) {
        onClick(event);
      }
    };

    const name = columnsLookup[field].headerName ?? field;
    return /*#__PURE__*/_jsx(MenuItem, {
      onClick: ungroupColumn,
      children: apiRef.current.getLocaleText('unGroupColumn')(name)
    }, field);
  };

  if (!column || !isGroupingColumn(column.field)) {
    return null;
  }

  if (column.field === GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD) {
    return /*#__PURE__*/_jsx(React.Fragment, {
      children: rowGroupingModel.map(renderUnGroupingMenuItem)
    });
  }

  return renderUnGroupingMenuItem(getRowGroupingCriteriaFromGroupingField(column.field));
};

process.env.NODE_ENV !== "production" ? GridRowGroupingColumnMenuItems.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  column: PropTypes.object,
  onClick: PropTypes.func
} : void 0;
export { GridRowGroupingColumnMenuItems };