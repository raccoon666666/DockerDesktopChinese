import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["csvOptions", "printOptions"];
import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { GridToolbarExportContainer } from './GridToolbarExportContainer';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const GridCsvExportMenuItem = props => {
  const apiRef = useGridApiContext();
  const {
    hideMenu,
    options
  } = props;

  if (options?.disableToolbarButton) {
    return null;
  }

  return /*#__PURE__*/_jsx(MenuItem, {
    onClick: () => {
      apiRef.current.exportDataAsCsv(options);
      hideMenu?.();
    },
    children: apiRef.current.getLocaleText('toolbarExportCSV')
  });
};
export const GridPrintExportMenuItem = props => {
  const apiRef = useGridApiContext();
  const {
    hideMenu,
    options
  } = props;

  if (options?.disableToolbarButton) {
    return null;
  }

  return /*#__PURE__*/_jsx(MenuItem, {
    onClick: () => {
      apiRef.current.exportDataAsPrint(options);
      hideMenu?.();
    },
    children: apiRef.current.getLocaleText('toolbarExportPrint')
  });
};
const GridToolbarExport = /*#__PURE__*/React.forwardRef(function GridToolbarExport(props, ref) {
  const {
    csvOptions = {},
    printOptions = {}
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  if (csvOptions?.disableToolbarButton && printOptions?.disableToolbarButton) {
    return null;
  }

  return /*#__PURE__*/_jsxs(GridToolbarExportContainer, _extends({}, other, {
    ref: ref,
    children: [/*#__PURE__*/_jsx(GridCsvExportMenuItem, {
      options: csvOptions
    }), /*#__PURE__*/_jsx(GridPrintExportMenuItem, {
      options: printOptions
    })]
  }));
});
process.env.NODE_ENV !== "production" ? GridToolbarExport.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  csvOptions: PropTypes.object,
  printOptions: PropTypes.object
} : void 0;
export { GridToolbarExport };