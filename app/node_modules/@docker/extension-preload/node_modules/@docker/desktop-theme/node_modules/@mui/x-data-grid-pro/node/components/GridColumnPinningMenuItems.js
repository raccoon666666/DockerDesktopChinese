"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnPinningMenuItems = void 0;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));

var _columnPinning = require("../hooks/features/columnPinning");

var _useGridApiContext = require("../hooks/utils/useGridApiContext");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GridColumnPinningMenuItems = props => {
  const {
    column,
    onClick
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();

  const pinColumn = side => event => {
    apiRef.current.pinColumn(column.field, side);

    if (onClick) {
      onClick(event);
    }
  };

  const unpinColumn = event => {
    apiRef.current.unpinColumn(column.field);

    if (onClick) {
      onClick(event);
    }
  };

  if (!column) {
    return null;
  }

  const side = apiRef.current.isColumnPinned(column.field);

  if (side) {
    const otherSide = side === _columnPinning.GridPinnedPosition.right ? _columnPinning.GridPinnedPosition.left : _columnPinning.GridPinnedPosition.right;
    const label = otherSide === _columnPinning.GridPinnedPosition.right ? 'pinToRight' : 'pinToLeft';
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
        onClick: pinColumn(otherSide),
        children: apiRef.current.getLocaleText(label)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
        onClick: unpinColumn,
        children: apiRef.current.getLocaleText('unpin')
      })]
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
      onClick: pinColumn(_columnPinning.GridPinnedPosition.left),
      children: apiRef.current.getLocaleText('pinToLeft')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
      onClick: pinColumn(_columnPinning.GridPinnedPosition.right),
      children: apiRef.current.getLocaleText('pinToRight')
    })]
  });
};

exports.GridColumnPinningMenuItems = GridColumnPinningMenuItems;
process.env.NODE_ENV !== "production" ? GridColumnPinningMenuItems.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  column: _propTypes.default.object,
  onClick: _propTypes.default.func
} : void 0;