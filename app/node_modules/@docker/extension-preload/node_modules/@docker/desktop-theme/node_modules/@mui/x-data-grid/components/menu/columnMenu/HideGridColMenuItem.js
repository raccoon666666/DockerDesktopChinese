import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { useGridApiContext } from '../../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { gridVisibleColumnDefinitionsSelector } from '../../../hooks/features/columns';
import { jsx as _jsx } from "react/jsx-runtime";

const HideGridColMenuItem = props => {
  const {
    column,
    onClick
  } = props;
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const timeoutRef = React.useRef();
  const visibleColumns = gridVisibleColumnDefinitionsSelector(apiRef);
  const columnsWithMenu = visibleColumns.filter(col => col.disableColumnMenu !== true); // do not allow to hide the last column with menu

  const disabled = columnsWithMenu.length === 1;
  const toggleColumn = React.useCallback(event => {
    /**
     * Disabled `MenuItem` would trigger `click` event
     * after imperative `.click()` call on HTML element.
     * Also, click is triggered in testing environment as well.
     */
    if (disabled) {
      return;
    }

    onClick(event); // time for the transition

    timeoutRef.current = setTimeout(() => {
      apiRef.current.setColumnVisibility(column == null ? void 0 : column.field, false);
    }, 100);
  }, [apiRef, column == null ? void 0 : column.field, onClick, disabled]);
  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  if (rootProps.disableColumnSelector) {
    return null;
  }

  if (column.hideable === false) {
    return null;
  }

  return /*#__PURE__*/_jsx(MenuItem, {
    onClick: toggleColumn,
    disabled: disabled,
    children: apiRef.current.getLocaleText('columnMenuHideColumn')
  });
};

process.env.NODE_ENV !== "production" ? HideGridColMenuItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  column: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
} : void 0;
export { HideGridColMenuItem };