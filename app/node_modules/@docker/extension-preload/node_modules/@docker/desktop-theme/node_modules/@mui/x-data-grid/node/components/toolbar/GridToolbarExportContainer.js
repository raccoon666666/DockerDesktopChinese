"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridToolbarExportContainer = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _utils = require("@mui/material/utils");

var _MenuList = _interopRequireDefault(require("@mui/material/MenuList"));

var _keyboardUtils = require("../../utils/keyboardUtils");

var _useGridApiContext = require("../../hooks/utils/useGridApiContext");

var _GridMenu = require("../menu/GridMenu");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _gridClasses = require("../../constants/gridClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "onClick"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GridToolbarExportContainer = /*#__PURE__*/React.forwardRef(function GridToolbarExportContainer(props, ref) {
  var _rootProps$components;

  const {
    children,
    onClick
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const buttonId = (0, _utils.unstable_useId)();
  const menuId = (0, _utils.unstable_useId)();
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const handleRef = (0, _utils.useForkRef)(ref, buttonRef);

  const handleMenuOpen = event => {
    setOpen(true);
    onClick == null ? void 0 : onClick(event);
  };

  const handleMenuClose = () => setOpen(false);

  const handleListKeyDown = event => {
    if ((0, _keyboardUtils.isTabKey)(event.key)) {
      event.preventDefault();
    }

    if ((0, _keyboardUtils.isHideMenuKey)(event.key)) {
      handleMenuClose();
    }
  };

  if (children == null) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseButton, (0, _extends2.default)({
      ref: handleRef,
      color: "primary",
      size: "small",
      startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.ExportIcon, {}),
      "aria-expanded": open ? 'true' : undefined,
      "aria-label": apiRef.current.getLocaleText('toolbarExportLabel'),
      "aria-haspopup": "menu",
      "aria-labelledby": menuId,
      id: buttonId
    }, other, {
      onClick: handleMenuOpen
    }, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseButton, {
      children: apiRef.current.getLocaleText('toolbarExport')
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridMenu.GridMenu, {
      open: open,
      target: buttonRef.current,
      onClickAway: handleMenuClose,
      position: "bottom-start",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuList.default, {
        id: menuId,
        className: _gridClasses.gridClasses.menuList,
        "aria-labelledby": buttonId,
        onKeyDown: handleListKeyDown,
        autoFocusItem: open,
        children: React.Children.map(children, child => {
          if (! /*#__PURE__*/React.isValidElement(child)) {
            return child;
          }

          return /*#__PURE__*/React.cloneElement(child, {
            hideMenu: handleMenuClose
          });
        })
      })
    })]
  });
});
exports.GridToolbarExportContainer = GridToolbarExportContainer;