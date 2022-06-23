"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderActionsCell = exports.GridActionsCell = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));

var _MenuList = _interopRequireDefault(require("@mui/material/MenuList"));

var _utils = require("@mui/material/utils");

var _gridClasses = require("../../constants/gridClasses");

var _GridMenu = require("../menu/GridMenu");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const hasActions = colDef => typeof colDef.getActions === 'function';

const GridActionsCell = props => {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const touchRippleRefs = React.useRef({});
  const menuId = (0, _utils.unstable_useId)();
  const buttonId = (0, _utils.unstable_useId)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const {
    colDef,
    id,
    api,
    hasFocus,
    position = 'bottom-end'
  } = props; // TODO apply the rest to the root element

  React.useLayoutEffect(() => {
    if (!hasFocus) {
      Object.entries(touchRippleRefs.current).forEach(([index, ref]) => {
        ref == null ? void 0 : ref.stop({}, () => {
          delete touchRippleRefs.current[index];
        });
      });
    }
  }, [hasFocus]);

  if (!hasActions(colDef)) {
    throw new Error('MUI: Missing the `getActions` property in the `GridColDef`.');
  }

  const showMenu = () => setOpen(true);

  const hideMenu = () => setOpen(false);

  const options = colDef.getActions(api.getRowParams(id));
  const iconButtons = options.filter(option => !option.props.showInMenu);
  const menuButtons = options.filter(option => option.props.showInMenu);

  const handleTouchRippleRef = index => instance => {
    touchRippleRefs.current[index] = instance;
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _gridClasses.gridClasses.actionsCell,
    children: [iconButtons.map((button, index) => /*#__PURE__*/React.cloneElement(button, {
      key: index,
      touchRippleRef: handleTouchRippleRef(index)
    })), menuButtons.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
      ref: buttonRef,
      id: buttonId,
      "aria-label": api.getLocaleText('actionsCellMore'),
      "aria-controls": menuId,
      "aria-expanded": open ? 'true' : undefined,
      "aria-haspopup": "true",
      size: "small",
      onClick: showMenu,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.MoreActionsIcon, {
        fontSize: "small"
      })
    }), menuButtons.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridMenu.GridMenu, {
      id: menuId,
      onClickAway: hideMenu,
      onClick: hideMenu,
      open: open,
      target: buttonRef.current,
      position: position,
      "aria-labelledby": buttonId,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuList.default, {
        className: _gridClasses.gridClasses.menuList,
        children: menuButtons.map((button, index) => /*#__PURE__*/React.cloneElement(button, {
          key: index
        }))
      })
    })]
  });
};

exports.GridActionsCell = GridActionsCell;
process.env.NODE_ENV !== "production" ? GridActionsCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * GridApi that let you manipulate the grid.
   * @deprecated Use the `apiRef` returned by `useGridApiContext` or `useGridApiRef` (only available in `@mui/x-data-grid-pro`)
   */
  api: _propTypes.default.any.isRequired,

  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: _propTypes.default.object.isRequired,

  /**
   * If true, the cell is the active element.
   */
  hasFocus: _propTypes.default.bool.isRequired,

  /**
   * The grid row id.
   */
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  position: _propTypes.default.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'])
} : void 0;

const renderActionsCell = params => /*#__PURE__*/(0, _jsxRuntime.jsx)(GridActionsCell, (0, _extends2.default)({}, params));

exports.renderActionsCell = renderActionsCell;