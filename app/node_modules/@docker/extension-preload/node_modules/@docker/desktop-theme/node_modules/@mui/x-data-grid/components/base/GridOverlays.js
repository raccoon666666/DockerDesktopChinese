import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { gridVisibleRowCountSelector } from '../../hooks/features/filter/gridFilterSelector';
import { gridRowCountSelector } from '../../hooks/features/rows/gridRowsSelector';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { gridDensityHeaderHeightSelector } from '../../hooks/features/density/densitySelector';
import { GridEvents } from '../../models/events';
import { jsx as _jsx } from "react/jsx-runtime";

function GridOverlayWrapper(props) {
  var _viewportInnerSize$he, _viewportInnerSize$wi;

  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const headerHeight = useGridSelector(apiRef, gridDensityHeaderHeightSelector);
  const [viewportInnerSize, setViewportInnerSize] = React.useState(() => {
    var _apiRef$current$getRo, _apiRef$current$getRo2;

    return (_apiRef$current$getRo = (_apiRef$current$getRo2 = apiRef.current.getRootDimensions()) == null ? void 0 : _apiRef$current$getRo2.viewportInnerSize) != null ? _apiRef$current$getRo : null;
  });
  const handleViewportSizeChange = React.useCallback(() => {
    var _apiRef$current$getRo3, _apiRef$current$getRo4;

    setViewportInnerSize((_apiRef$current$getRo3 = (_apiRef$current$getRo4 = apiRef.current.getRootDimensions()) == null ? void 0 : _apiRef$current$getRo4.viewportInnerSize) != null ? _apiRef$current$getRo3 : null);
  }, [apiRef]);
  useEnhancedEffect(() => {
    return apiRef.current.subscribeEvent(GridEvents.viewportInnerSizeChange, handleViewportSizeChange);
  }, [apiRef, handleViewportSizeChange]);
  let height = (_viewportInnerSize$he = viewportInnerSize == null ? void 0 : viewportInnerSize.height) != null ? _viewportInnerSize$he : 0;

  if (rootProps.autoHeight && height === 0) {
    height = 'auto';
  }

  if (!viewportInnerSize) {
    return null;
  }

  return /*#__PURE__*/_jsx("div", _extends({
    style: {
      height,
      width: (_viewportInnerSize$wi = viewportInnerSize == null ? void 0 : viewportInnerSize.width) != null ? _viewportInnerSize$wi : 0,
      position: 'absolute',
      top: headerHeight,
      bottom: height === 'auto' ? 0 : undefined
    }
  }, props));
}

export function GridOverlays() {
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const totalRowCount = useGridSelector(apiRef, gridRowCountSelector);
  const visibleRowCount = useGridSelector(apiRef, gridVisibleRowCountSelector);
  const showNoRowsOverlay = !rootProps.loading && totalRowCount === 0;
  const showNoResultsOverlay = !rootProps.loading && totalRowCount > 0 && visibleRowCount === 0;
  let overlay = null;

  if (showNoRowsOverlay) {
    var _rootProps$components;

    overlay = /*#__PURE__*/_jsx(rootProps.components.NoRowsOverlay, _extends({}, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.noRowsOverlay));
  }

  if (showNoResultsOverlay) {
    var _rootProps$components2;

    overlay = /*#__PURE__*/_jsx(rootProps.components.NoResultsOverlay, _extends({}, (_rootProps$components2 = rootProps.componentsProps) == null ? void 0 : _rootProps$components2.noResultsOverlay));
  }

  if (rootProps.loading) {
    var _rootProps$components3;

    overlay = /*#__PURE__*/_jsx(rootProps.components.LoadingOverlay, _extends({}, (_rootProps$components3 = rootProps.componentsProps) == null ? void 0 : _rootProps$components3.loadingOverlay));
  }

  if (overlay === null) {
    return null;
  }

  return /*#__PURE__*/_jsx(GridOverlayWrapper, {
    children: overlay
  });
}