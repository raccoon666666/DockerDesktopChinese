import * as React from 'react';
import { GridRootPropsContext } from '../../context/GridRootPropsContext';
export var useGridRootProps = function useGridRootProps() {
  var contextValue = React.useContext(GridRootPropsContext);

  if (!contextValue) {
    throw new Error('MUI: useGridRootProps should only be used inside the DataGrid/DataGridPro component.');
  }

  return contextValue;
};