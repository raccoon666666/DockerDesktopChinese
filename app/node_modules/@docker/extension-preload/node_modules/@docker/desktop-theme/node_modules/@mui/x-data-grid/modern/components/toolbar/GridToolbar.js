import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "csvOptions", "printOptions"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { GridToolbarContainer } from '../containers/GridToolbarContainer';
import { GridToolbarColumnsButton } from './GridToolbarColumnsButton';
import { GridToolbarDensitySelector } from './GridToolbarDensitySelector';
import { GridToolbarFilterButton } from './GridToolbarFilterButton';
import { GridToolbarExport } from './GridToolbarExport';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const GridToolbar = /*#__PURE__*/React.forwardRef(function GridToolbar(props, ref) {
  const {
    csvOptions,
    printOptions
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const rootProps = useGridRootProps();

  if (rootProps.disableColumnFilter && rootProps.disableColumnSelector && rootProps.disableDensitySelector) {
    return null;
  }

  return /*#__PURE__*/_jsxs(GridToolbarContainer, _extends({
    ref: ref
  }, other, {
    children: [/*#__PURE__*/_jsx(GridToolbarColumnsButton, {}), /*#__PURE__*/_jsx(GridToolbarFilterButton, {}), /*#__PURE__*/_jsx(GridToolbarDensitySelector, {}), /*#__PURE__*/_jsx(GridToolbarExport, {
      csvOptions: csvOptions,
      printOptions: printOptions
    })]
  }));
});
process.env.NODE_ENV !== "production" ? GridToolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  csvOptions: PropTypes.object,
  printOptions: PropTypes.object
} : void 0;
export { GridToolbar };