import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { GridPreferencePanelsValue } from '../../../hooks/features/preferencesPanel/gridPreferencePanelsValue';
import { useGridApiContext } from '../../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

var GridColumnsMenuItem = function GridColumnsMenuItem(props) {
  var onClick = props.onClick;
  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var showColumns = React.useCallback(function (event) {
    onClick(event);
    apiRef.current.showPreferences(GridPreferencePanelsValue.columns);
  }, [apiRef, onClick]);

  if (rootProps.disableColumnSelector) {
    return null;
  }

  return /*#__PURE__*/_jsx(MenuItem, {
    onClick: showColumns,
    children: apiRef.current.getLocaleText('columnMenuShowColumns')
  });
};

process.env.NODE_ENV !== "production" ? GridColumnsMenuItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  column: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
} : void 0;
export { GridColumnsMenuItem };