import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["onClick"];
import * as React from 'react';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { gridPreferencePanelStateSelector } from '../../hooks/features/preferencesPanel/gridPreferencePanelSelector';
import { GridPreferencePanelsValue } from '../../hooks/features/preferencesPanel/gridPreferencePanelsValue';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
export var GridToolbarColumnsButton = /*#__PURE__*/React.forwardRef(function GridToolbarColumnsButton(props, ref) {
  var _rootProps$components;

  var onClick = props.onClick,
      other = _objectWithoutProperties(props, _excluded);

  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();

  var _useGridSelector = useGridSelector(apiRef, gridPreferencePanelStateSelector),
      open = _useGridSelector.open,
      openedPanelValue = _useGridSelector.openedPanelValue;

  var showColumns = function showColumns(event) {
    if (open && openedPanelValue === GridPreferencePanelsValue.columns) {
      apiRef.current.hidePreferences();
    } else {
      apiRef.current.showPreferences(GridPreferencePanelsValue.columns);
    }

    onClick == null ? void 0 : onClick(event);
  }; // Disable the button if the corresponding is disabled


  if (rootProps.disableColumnSelector) {
    return null;
  }

  return /*#__PURE__*/_jsx(rootProps.components.BaseButton, _extends({
    ref: ref,
    size: "small",
    color: "primary",
    "aria-label": apiRef.current.getLocaleText('toolbarColumnsLabel'),
    startIcon: /*#__PURE__*/_jsx(rootProps.components.ColumnSelectorIcon, {})
  }, other, {
    onClick: showColumns
  }, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseButton, {
    children: apiRef.current.getLocaleText('toolbarColumns')
  }));
});