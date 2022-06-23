import * as React from 'react';
import Box from '@mui/material/Box';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";

const GridGroupingColumnLeafCell = props => {
  const {
    rowNode
  } = props;
  const rootProps = useGridRootProps();
  const marginLeft = rootProps.rowGroupingColumnMode === 'multiple' ? 1 : rowNode.depth * 2;
  return /*#__PURE__*/_jsx(Box, {
    sx: {
      ml: marginLeft
    },
    children: props.formattedValue ?? props.value
  });
};

export { GridGroupingColumnLeafCell };