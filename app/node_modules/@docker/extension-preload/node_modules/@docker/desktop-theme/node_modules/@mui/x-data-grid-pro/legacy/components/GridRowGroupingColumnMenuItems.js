import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { useGridSelector, gridColumnLookupSelector } from '@mui/x-data-grid';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { gridRowGroupingSanitizedModelSelector } from '../hooks/features/rowGrouping/gridRowGroupingSelector';
import { getRowGroupingCriteriaFromGroupingField, GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD, isGroupingColumn } from '../hooks/features/rowGrouping/gridRowGroupingUtils';
import { jsx as _jsx } from "react/jsx-runtime";

var GridRowGroupingColumnMenuItems = function GridRowGroupingColumnMenuItems(props) {
  var column = props.column,
      onClick = props.onClick;
  var apiRef = useGridApiContext();
  var rowGroupingModel = useGridSelector(apiRef, gridRowGroupingSanitizedModelSelector);
  var columnsLookup = useGridSelector(apiRef, gridColumnLookupSelector);

  var renderUnGroupingMenuItem = function renderUnGroupingMenuItem(field) {
    var _columnsLookup$field$;

    var ungroupColumn = function ungroupColumn(event) {
      apiRef.current.removeRowGroupingCriteria(field);

      if (onClick) {
        onClick(event);
      }
    };

    var name = (_columnsLookup$field$ = columnsLookup[field].headerName) != null ? _columnsLookup$field$ : field;
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