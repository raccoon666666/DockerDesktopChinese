import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "defaultHeight", "defaultWidth", "disableHeight", "disableWidth", "nonce", "onResize", "style"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { useForkRef, ownerWindow, useEventCallback, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import createDetectElementResize from '../lib/createDetectElementResize'; // TODO replace with https://caniuse.com/resizeobserver.

import { jsx as _jsx } from "react/jsx-runtime";
var GridAutoSizer = /*#__PURE__*/React.forwardRef(function AutoSizer(props, ref) {
  var children = props.children,
      _props$defaultHeight = props.defaultHeight,
      defaultHeight = _props$defaultHeight === void 0 ? null : _props$defaultHeight,
      _props$defaultWidth = props.defaultWidth,
      defaultWidth = _props$defaultWidth === void 0 ? null : _props$defaultWidth,
      _props$disableHeight = props.disableHeight,
      disableHeight = _props$disableHeight === void 0 ? false : _props$disableHeight,
      _props$disableWidth = props.disableWidth,
      disableWidth = _props$disableWidth === void 0 ? false : _props$disableWidth,
      nonce = props.nonce,
      onResize = props.onResize,
      style = props.style,
      other = _objectWithoutProperties(props, _excluded);

  var _React$useState = React.useState({
    height: defaultHeight,
    width: defaultWidth
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  var rootRef = React.useRef(null);
  var parentElement = React.useRef(null);
  var handleResize = useEventCallback(function () {
    // Guard against AutoSizer component being removed from the DOM immediately after being added.
    // This can result in invalid style values which can result in NaN values if we don't handle them.
    // See issue #150 for more context.
    if (parentElement.current) {
      var height = parentElement.current.offsetHeight || 0;
      var width = parentElement.current.offsetWidth || 0;
      var win = ownerWindow(parentElement.current);
      var computedStyle = win.getComputedStyle(parentElement.current);
      var paddingLeft = parseInt(computedStyle.paddingLeft, 10) || 0;
      var paddingRight = parseInt(computedStyle.paddingRight, 10) || 0;
      var paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;
      var paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;
      var newHeight = height - paddingTop - paddingBottom;
      var newWidth = width - paddingLeft - paddingRight;

      if (!disableHeight && state.height !== newHeight || !disableWidth && state.width !== newWidth) {
        setState({
          height: newHeight,
          width: newWidth
        });

        if (onResize) {
          onResize({
            height: newHeight,
            width: newWidth
          });
        }
      }
    }
  });
  useEnhancedEffect(function () {
    var _parentElement$curren;

    parentElement.current = rootRef.current.parentElement;

    if (!parentElement) {
      return undefined;
    }

    var win = ownerWindow((_parentElement$curren = parentElement.current) != null ? _parentElement$curren : undefined);
    var detectElementResize = createDetectElementResize(nonce, win);
    detectElementResize.addResizeListener(parentElement.current, handleResize);
    handleResize();
    return function () {
      detectElementResize.removeResizeListener(parentElement.current, handleResize);
    };
  }, [nonce, handleResize]); // Outer div should not force width/height since that may prevent containers from shrinking.
  // Inner component should overflow and use calculated width/height.
  // See issue #68 for more information.

  var outerStyle = {
    overflow: 'visible'
  };
  var childParams = {};

  if (!disableHeight) {
    outerStyle.height = 0;
    childParams.height = state.height;
  }

  if (!disableWidth) {
    outerStyle.width = 0;
    childParams.width = state.width;
  }

  var handleRef = useForkRef(rootRef, ref);
  return /*#__PURE__*/_jsx("div", _extends({
    ref: handleRef,
    style: _extends({}, outerStyle, style)
  }, other, {
    children: state.height === null && state.width === null ? null : children(childParams)
  }));
});
process.env.NODE_ENV !== "production" ? GridAutoSizer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * Default height to use for initial render; useful for SSR.
   * @default null
   */
  defaultHeight: PropTypes.number,

  /**
   * Default width to use for initial render; useful for SSR.
   * @default null
   */
  defaultWidth: PropTypes.number,

  /**
   * If `true`, disable dynamic :height property.
   * @default false
   */
  disableHeight: PropTypes.bool,

  /**
   * If `true`, disable dynamic :width property.
   * @default false
   */
  disableWidth: PropTypes.bool,

  /**
   * Nonce of the inlined stylesheet for Content Security Policy.
   */
  nonce: PropTypes.string,

  /**
   * Callback to be invoked on-resize.
   * @param {AutoSizerSize} size The grid's size.
   */
  onResize: PropTypes.func
} : void 0;
export { GridAutoSizer };