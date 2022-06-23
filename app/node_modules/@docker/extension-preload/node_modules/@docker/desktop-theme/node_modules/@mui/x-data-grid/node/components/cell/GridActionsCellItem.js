"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridActionsCellItem = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));

var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));

var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["label", "icon", "showInMenu", "onClick"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GridActionsCellItem = props => {
  const {
    label,
    icon,
    showInMenu,
    onClick
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);

  const handleClick = event => {
    if (onClick) {
      onClick(event);
    }
  };

  if (!showInMenu) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, (0, _extends2.default)({
      size: "small",
      "aria-label": label
    }, other, {
      onClick: handleClick,
      children: /*#__PURE__*/React.cloneElement(icon, {
        fontSize: 'small'
      })
    }));
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, (0, _extends2.default)({}, other, {
    onClick: onClick,
    children: [icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
      children: icon
    }), label]
  }));
};

exports.GridActionsCellItem = GridActionsCellItem;
process.env.NODE_ENV !== "production" ? GridActionsCellItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  icon: _propTypes.default.element,
  label: _propTypes.default.string.isRequired,
  showInMenu: _propTypes.default.bool
} : void 0;