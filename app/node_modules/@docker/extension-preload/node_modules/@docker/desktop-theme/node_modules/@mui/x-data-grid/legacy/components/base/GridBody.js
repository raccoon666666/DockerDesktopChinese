import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import PropTypes from 'prop-types';
import { GridEvents } from '../../models/events';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { GridMainContainer } from '../containers/GridMainContainer';
import { GridAutoSizer } from '../GridAutoSizer';
import { GridOverlays } from './GridOverlays';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { gridDensityHeaderHeightSelector } from '../../hooks/features/density/densitySelector';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function GridBody(props) {
  var children = props.children,
      VirtualScrollerComponent = props.VirtualScrollerComponent,
      ColumnHeadersComponent = props.ColumnHeadersComponent;
  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var headerHeight = useGridSelector(apiRef, gridDensityHeaderHeightSelector);

  var _React$useState = React.useState(rootProps.disableVirtualization),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isVirtualizationDisabled = _React$useState2[0],
      setIsVirtualizationDisabled = _React$useState2[1];

  var disableVirtualization = React.useCallback(function () {
    setIsVirtualizationDisabled(true);
  }, []);
  var enableVirtualization = React.useCallback(function () {
    setIsVirtualizationDisabled(false);
  }, []); // The `useGridApiMethod` hook can't be used here, because it only installs the
  // method if it doesn't exist yet. Once installed, it's never updated again.
  // This break the methods above, since their closure comes from the first time
  // they were installed. Which means that calling `setIsVirtualizationDisabled`
  // will trigger a re-render, but it won't update the state. That can be solved
  // by migrating the virtualization status to the global state.

  apiRef.current.unstable_disableVirtualization = disableVirtualization;
  apiRef.current.unstable_enableVirtualization = enableVirtualization;
  var columnHeadersRef = React.useRef(null);
  var columnsContainerRef = React.useRef(null);
  var windowRef = React.useRef(null);
  var renderingZoneRef = React.useRef(null);
  apiRef.current.columnHeadersContainerElementRef = columnsContainerRef;
  apiRef.current.columnHeadersElementRef = columnHeadersRef;
  apiRef.current.windowRef = windowRef; // TODO rename, it's not attached to the window anymore

  apiRef.current.renderingZoneRef = renderingZoneRef; // TODO remove, nobody should have access to internal parts of the virtualization

  var handleResize = React.useCallback(function (size) {
    apiRef.current.publishEvent(GridEvents.resize, size);
  }, [apiRef]);
  return /*#__PURE__*/_jsxs(GridMainContainer, {
    children: [/*#__PURE__*/_jsx(GridOverlays, {}), /*#__PURE__*/_jsx(ColumnHeadersComponent, {
      ref: columnsContainerRef,
      innerRef: columnHeadersRef
    }), /*#__PURE__*/_jsx(GridAutoSizer, {
      nonce: rootProps.nonce,
      disableHeight: rootProps.autoHeight,
      onResize: handleResize,
      children: function children(size) {
        var style = {
          width: size.width,
          // If `autoHeight` is on, there will be no height value.
          // In this case, let the container to grow whatever it needs.
          height: size.height ? size.height - headerHeight : 'auto',
          marginTop: headerHeight
        };
        return /*#__PURE__*/_jsx(VirtualScrollerComponent, {
          ref: windowRef,
          style: style,
          disableVirtualization: isVirtualizationDisabled
        });
      }
    }), children]
  });
}

process.env.NODE_ENV !== "production" ? GridBody.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: PropTypes.node,
  ColumnHeadersComponent: PropTypes.elementType.isRequired,
  VirtualScrollerComponent: PropTypes.elementType.isRequired
} : void 0;
export { GridBody };