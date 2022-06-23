import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { useGridApiContext } from '../../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

const GridFilterMenuItem = props => {
  const {
    column,
    onClick
  } = props;
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const showFilter = React.useCallback(event => {
    onClick(event);
    apiRef.current.showFilterPanel(column?.field);
  }, [apiRef, column?.field, onClick]);

  if (rootProps.disableColumnFilter || !column?.filterable) {
    return null;
  }

  return /*#__PURE__*/_jsx(MenuItem, {
    onClick: showFilter,
    children: apiRef.current.getLocaleText('columnMenuFilter')
  });
};

process.env.NODE_ENV !== "production" ? GridFilterMenuItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  column: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
} : void 0;
export { GridFilterMenuItem };