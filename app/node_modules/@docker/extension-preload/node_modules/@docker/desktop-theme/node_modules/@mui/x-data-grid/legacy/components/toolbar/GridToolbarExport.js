import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["csvOptions", "printOptions"];
import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { GridToolbarExportContainer } from './GridToolbarExportContainer';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var GridCsvExportMenuItem = function GridCsvExportMenuItem(props) {
  var apiRef = useGridApiContext();
  var hideMenu = props.hideMenu,
      options = props.options;

  if (options != null && options.disableToolbarButton) {
    return null;
  }

  return /*#__PURE__*/_jsx(MenuItem, {
    onClick: function onClick() {
      apiRef.current.exportDataAsCsv(options);
      hideMenu == null ? void 0 : hideMenu();
    },
    children: apiRef.current.getLocaleText('toolbarExportCSV')
  });
};
export var GridPrintExportMenuItem = function GridPrintExportMenuItem(props) {
  var apiRef = useGridApiContext();
  var hideMenu = props.hideMenu,
      options = props.options;

  if (options != null && options.disableToolbarButton) {
    return null;
  }

  return /*#__PURE__*/_jsx(MenuItem, {
    onClick: function onClick() {
      apiRef.current.exportDataAsPrint(options);
      hideMenu == null ? void 0 : hideMenu();
    },
    children: apiRef.current.getLocaleText('toolbarExportPrint')
  });
};
var GridToolbarExport = /*#__PURE__*/React.forwardRef(function GridToolbarExport(props, ref) {
  var _props$csvOptions = props.csvOptions,
      csvOptions = _props$csvOptions === void 0 ? {} : _props$csvOptions,
      _props$printOptions = props.printOptions,
      printOptions = _props$printOptions === void 0 ? {} : _props$printOptions,
      other = _objectWithoutProperties(props, _excluded);

  if (csvOptions != null && csvOptions.disableToolbarButton && printOptions != null && printOptions.disableToolbarButton) {
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