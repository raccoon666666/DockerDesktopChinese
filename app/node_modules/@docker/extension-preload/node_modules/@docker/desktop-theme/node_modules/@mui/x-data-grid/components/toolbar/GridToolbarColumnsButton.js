import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["onClick"];
import * as React from 'react';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { gridPreferencePanelStateSelector } from '../../hooks/features/preferencesPanel/gridPreferencePanelSelector';
import { GridPreferencePanelsValue } from '../../hooks/features/preferencesPanel/gridPreferencePanelsValue';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
export const GridToolbarColumnsButton = /*#__PURE__*/React.forwardRef(function GridToolbarColumnsButton(props, ref) {
  var _rootProps$components;

  const {
    onClick
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const {
    open,
    openedPanelValue
  } = useGridSelector(apiRef, gridPreferencePanelStateSelector);

  const showColumns = event => {
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