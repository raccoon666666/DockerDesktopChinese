import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "defaultHeight", "defaultWidth", "disableHeight", "disableWidth", "nonce", "onResize", "style"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { useForkRef, ownerWindow, useEventCallback, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import createDetectElementResize from '../lib/createDetectElementResize'; // TODO replace with https://caniuse.com/resizeobserver.

import { jsx as _jsx } from "react/jsx-runtime";
const GridAutoSizer = /*#__PURE__*/React.forwardRef(function AutoSizer(props, ref) {
  const {
    children,
    defaultHeight = null,
    defaultWidth = null,
    disableHeight = false,
    disableWidth = false,
    nonce,
    onResize,
    style
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const [state, setState] = React.useState({
    height: defaultHeight,
    width: defaultWidth
  });
  const rootRef = React.useRef(null);
  const parentElement = React.useRef(null);
  const handleResize = useEventCallback(() => {
    // Guard against AutoSizer component being removed from the DOM immediately after being added.
    // This can result in invalid style values which can result in NaN values if we don't handle them.
    // See issue #150 for more context.
    if (parentElement.current) {
      const height = parentElement.current.offsetHeight || 0;
      const width = parentElement.current.offsetWidth || 0;
      const win = ownerWindow(parentElement.current);
      const computedStyle = win.getComputedStyle(parentElement.current);
      const paddingLeft = parseInt(computedStyle.paddingLeft, 10) || 0;
      const paddingRight = parseInt(computedStyle.paddingRight, 10) || 0;
      const paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;
      const paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;
      const newHeight = height - paddingTop - paddingBottom;
      const newWidth = width - paddingLeft - paddingRight;

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
  useEnhancedEffect(() => {
    var _parentElement$curren;

    parentElement.current = rootRef.current.parentElement;

    if (!parentElement) {
      return undefined;
    }

    const win = ownerWindow((_parentElement$curren = parentElement.current) != null ? _parentElement$curren : undefined);
    const detectElementResize = createDetectElementResize(nonce, win);
    detectElementResize.addResizeListener(parentElement.current, handleResize);
    handleResize();
    return () => {
      detectElementResize.removeResizeListener(parentElement.current, handleResize);
    };
  }, [nonce, handleResize]); // Outer div should not force width/height since that may prevent containers from shrinking.
  // Inner component should overflow and use calculated width/height.
  // See issue #68 for more information.

  const outerStyle = {
    overflow: 'visible'
  };
  const childParams = {};

  if (!disableHeight) {
    outerStyle.height = 0;
    childParams.height = state.height;
  }

  if (!disableWidth) {
    outerStyle.width = 0;
    childParams.width = state.width;
  }

  const handleRef = useForkRef(rootRef, ref);
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