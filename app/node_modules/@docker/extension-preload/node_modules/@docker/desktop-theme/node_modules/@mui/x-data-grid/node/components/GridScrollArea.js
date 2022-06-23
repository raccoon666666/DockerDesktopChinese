"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridScrollArea = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _material = require("@mui/material");

var _styles = require("@mui/material/styles");

var _events = require("../models/events");

var _useGridApiEventHandler = require("../hooks/utils/useGridApiEventHandler");

var _useGridApiContext = require("../hooks/utils/useGridApiContext");

var _gridClasses = require("../constants/gridClasses");

var _useGridRootProps = require("../hooks/utils/useGridRootProps");

var _densitySelector = require("../hooks/features/density/densitySelector");

var _useGridSelector = require("../hooks/utils/useGridSelector");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CLIFF = 1;
const SLOP = 1.5;

const useUtilityClasses = ownerState => {
  const {
    scrollDirection,
    classes
  } = ownerState;
  const slots = {
    root: ['scrollArea', `scrollArea--${scrollDirection}`]
  };
  return (0, _material.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};

const GridScrollAreaRawRoot = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'ScrollArea',
  overridesResolver: (props, styles) => [{
    [`&.${_gridClasses.gridClasses['scrollArea--left']}`]: styles['scrollArea--left']
  }, {
    [`&.${_gridClasses.gridClasses['scrollArea--right']}`]: styles['scrollArea--right']
  }, styles.scrollArea]
})(() => ({
  position: 'absolute',
  top: 0,
  zIndex: 101,
  width: 20,
  bottom: 0,
  [`&.${_gridClasses.gridClasses['scrollArea--left']}`]: {
    left: 0
  },
  [`&.${_gridClasses.gridClasses['scrollArea--right']}`]: {
    right: 0
  }
}));

function GridScrollAreaRaw(props) {
  const {
    scrollDirection
  } = props;
  const rootRef = React.useRef(null);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const timeout = React.useRef();
  const [dragging, setDragging] = React.useState(false);
  const height = (0, _useGridSelector.useGridSelector)(apiRef, _densitySelector.gridDensityHeaderHeightSelector);
  const scrollPosition = React.useRef({
    left: 0,
    top: 0
  });
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = (0, _extends2.default)({}, props, {
    classes: rootProps.classes
  });
  const classes = useUtilityClasses(ownerState);
  const handleScrolling = React.useCallback(newScrollPosition => {
    scrollPosition.current = newScrollPosition;
  }, []);
  const handleDragOver = React.useCallback(event => {
    let offset;

    if (scrollDirection === 'left') {
      offset = event.clientX - rootRef.current.getBoundingClientRect().right;
    } else if (scrollDirection === 'right') {
      offset = Math.max(1, event.clientX - rootRef.current.getBoundingClientRect().left);
    } else {
      throw new Error('MUI: Wrong drag direction');
    }

    offset = (offset - CLIFF) * SLOP + CLIFF;
    clearTimeout(timeout.current); // Avoid freeze and inertia.

    timeout.current = setTimeout(() => {
      apiRef.current.scroll({
        left: scrollPosition.current.left + offset,
        top: scrollPosition.current.top
      });
    });
  }, [scrollDirection, apiRef]);
  React.useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);
  const toggleDragging = React.useCallback(() => {
    setDragging(prevDragging => !prevDragging);
  }, []);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, _events.GridEvents.rowsScroll, handleScrolling);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, _events.GridEvents.columnHeaderDragStart, toggleDragging);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, _events.GridEvents.columnHeaderDragEnd, toggleDragging);
  return dragging ? /*#__PURE__*/(0, _jsxRuntime.jsx)(GridScrollAreaRawRoot, {
    ref: rootRef,
    className: (0, _clsx.default)(classes.root),
    onDragOver: handleDragOver,
    style: {
      height
    }
  }) : null;
}

process.env.NODE_ENV !== "production" ? GridScrollAreaRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  scrollDirection: _propTypes.default.oneOf(['left', 'right']).isRequired
} : void 0;
const GridScrollArea = /*#__PURE__*/React.memo(GridScrollAreaRaw);
exports.GridScrollArea = GridScrollArea;