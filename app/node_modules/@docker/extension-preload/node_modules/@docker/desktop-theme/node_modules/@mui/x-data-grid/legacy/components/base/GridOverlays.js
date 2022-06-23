import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
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

  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var headerHeight = useGridSelector(apiRef, gridDensityHeaderHeightSelector);

  var _React$useState = React.useState(function () {
    var _apiRef$current$getRo, _apiRef$current$getRo2;

    return (_apiRef$current$getRo = (_apiRef$current$getRo2 = apiRef.current.getRootDimensions()) == null ? void 0 : _apiRef$current$getRo2.viewportInnerSize) != null ? _apiRef$current$getRo : null;
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      viewportInnerSize = _React$useState2[0],
      setViewportInnerSize = _React$useState2[1];

  var handleViewportSizeChange = React.useCallback(function () {
    var _apiRef$current$getRo3, _apiRef$current$getRo4;

    setViewportInnerSize((_apiRef$current$getRo3 = (_apiRef$current$getRo4 = apiRef.current.getRootDimensions()) == null ? void 0 : _apiRef$current$getRo4.viewportInnerSize) != null ? _apiRef$current$getRo3 : null);
  }, [apiRef]);
  useEnhancedEffect(function () {
    return apiRef.current.subscribeEvent(GridEvents.viewportInnerSizeChange, handleViewportSizeChange);
  }, [apiRef, handleViewportSizeChange]);
  var height = (_viewportInnerSize$he = viewportInnerSize == null ? void 0 : viewportInnerSize.height) != null ? _viewportInnerSize$he : 0;

  if (rootProps.autoHeight && height === 0) {
    height = 'auto';
  }

  if (!viewportInnerSize) {
    return null;
  }

  return /*#__PURE__*/_jsx("div", _extends({
    style: {
      height: height,
      width: (_viewportInnerSize$wi = viewportInnerSize == null ? void 0 : viewportInnerSize.width) != null ? _viewportInnerSize$wi : 0,
      position: 'absolute',
      top: headerHeight,
      bottom: height === 'auto' ? 0 : undefined
    }
  }, props));
}

export function GridOverlays() {
  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var totalRowCount = useGridSelector(apiRef, gridRowCountSelector);
  var visibleRowCount = useGridSelector(apiRef, gridVisibleRowCountSelector);
  var showNoRowsOverlay = !rootProps.loading && totalRowCount === 0;
  var showNoResultsOverlay = !rootProps.loading && totalRowCount > 0 && visibleRowCount === 0;
  var overlay = null;

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