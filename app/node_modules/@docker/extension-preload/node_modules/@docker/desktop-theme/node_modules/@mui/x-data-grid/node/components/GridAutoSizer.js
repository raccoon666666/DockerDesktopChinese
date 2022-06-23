"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridAutoSizer = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("@mui/material/utils");

var _createDetectElementResize = _interopRequireDefault(require("../lib/createDetectElementResize"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "defaultHeight", "defaultWidth", "disableHeight", "disableWidth", "nonce", "onResize", "style"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const [state, setState] = React.useState({
    height: defaultHeight,
    width: defaultWidth
  });
  const rootRef = React.useRef(null);
  const parentElement = React.useRef(null);
  const handleResize = (0, _utils.useEventCallback)(() => {
    // Guard against AutoSizer component being removed from the DOM immediately after being added.
    // This can result in invalid style values which can result in NaN values if we don't handle them.
    // See issue #150 for more context.
    if (parentElement.current) {
      const height = parentElement.current.offsetHeight || 0;
      const width = parentElement.current.offsetWidth || 0;
      const win = (0, _utils.ownerWindow)(parentElement.current);
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
  (0, _utils.unstable_useEnhancedEffect)(() => {
    var _parentElement$curren;

    parentElement.current = rootRef.current.parentElement;

    if (!parentElement) {
      return undefined;
    }

    const win = (0, _utils.ownerWindow)((_parentElement$curren = parentElement.current) != null ? _parentElement$curren : undefined);
    const detectElementResize = (0, _createDetectElementResize.default)(nonce, win);
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

  const handleRef = (0, _utils.useForkRef)(rootRef, ref);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", (0, _extends2.default)({
    ref: handleRef,
    style: (0, _extends2.default)({}, outerStyle, style)
  }, other, {
    children: state.height === null && state.width === null ? null : children(childParams)
  }));
});
exports.GridAutoSizer = GridAutoSizer;
process.env.NODE_ENV !== "production" ? GridAutoSizer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * Default height to use for initial render; useful for SSR.
   * @default null
   */
  defaultHeight: _propTypes.default.number,

  /**
   * Default width to use for initial render; useful for SSR.
   * @default null
   */
  defaultWidth: _propTypes.default.number,

  /**
   * If `true`, disable dynamic :height property.
   * @default false
   */
  disableHeight: _propTypes.default.bool,

  /**
   * If `true`, disable dynamic :width property.
   * @default false
   */
  disableWidth: _propTypes.default.bool,

  /**
   * Nonce of the inlined stylesheet for Content Security Policy.
   */
  nonce: _propTypes.default.string,

  /**
   * Callback to be invoked on-resize.
   * @param {AutoSizerSize} size The grid's size.
   */
  onResize: _propTypes.default.func
} : void 0;