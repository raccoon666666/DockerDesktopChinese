"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridHeaderCheckbox = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _material = require("@mui/material");

var _events = require("../../models/events");

var _useGridSelector = require("../../hooks/utils/useGridSelector");

var _gridFocusStateSelector = require("../../hooks/features/focus/gridFocusStateSelector");

var _gridSelectionSelector = require("../../hooks/features/selection/gridSelectionSelector");

var _keyboardUtils = require("../../utils/keyboardUtils");

var _useGridApiContext = require("../../hooks/utils/useGridApiContext");

var _gridClasses = require("../../constants/gridClasses");

var _useGridRootProps = require("../../hooks/utils/useGridRootProps");

var _gridFilterSelector = require("../../hooks/features/filter/gridFilterSelector");

var _gridPaginationSelector = require("../../hooks/features/pagination/gridPaginationSelector");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["field", "colDef"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['checkboxInput']
  };
  return (0, _material.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};

const GridHeaderCheckbox = /*#__PURE__*/React.forwardRef(function GridHeaderCheckbox(props, ref) {
  var _rootProps$components;

  const other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const [, forceUpdate] = React.useState(false);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  const tabIndexState = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridTabIndexColumnHeaderSelector);
  const selection = (0, _useGridSelector.useGridSelector)(apiRef, _gridSelectionSelector.gridSelectionStateSelector);
  const visibleRowIds = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridVisibleSortedRowIdsSelector);
  const paginatedVisibleRowIds = (0, _useGridSelector.useGridSelector)(apiRef, _gridPaginationSelector.gridPaginatedVisibleSortedGridRowIdsSelector);
  const filteredSelection = React.useMemo(() => {
    if (typeof rootProps.isRowSelectable !== 'function') {
      return selection;
    }

    return selection.filter(id => {
      // The row might have been deleted
      if (!apiRef.current.getRow(id)) {
        return false;
      }

      return rootProps.isRowSelectable(apiRef.current.getRowParams(id));
    });
  }, [apiRef, rootProps.isRowSelectable, selection]); // All the rows that could be selected / unselected by toggling this checkbox

  const selectionCandidates = React.useMemo(() => {
    const rowIds = !rootProps.pagination || !rootProps.checkboxSelectionVisibleOnly ? visibleRowIds : paginatedVisibleRowIds; // Convert to an object to make O(1) checking if a row exists or not
    // TODO create selector that returns visibleRowIds/paginatedVisibleRowIds as an object

    return rowIds.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {});
  }, [rootProps.pagination, rootProps.checkboxSelectionVisibleOnly, paginatedVisibleRowIds, visibleRowIds]); // Amount of rows selected and that are visible in the current page

  const currentSelectionSize = React.useMemo(() => filteredSelection.filter(id => selectionCandidates[id]).length, [filteredSelection, selectionCandidates]);
  const isIndeterminate = currentSelectionSize > 0 && currentSelectionSize < Object.keys(selectionCandidates).length;
  const isChecked = currentSelectionSize > 0;

  const handleChange = event => {
    const params = {
      value: event.target.checked
    };
    apiRef.current.publishEvent(_events.GridEvents.headerSelectionCheckboxChange, params);
  };

  const tabIndex = tabIndexState !== null && tabIndexState.field === props.field ? 0 : -1;
  React.useLayoutEffect(() => {
    const element = apiRef.current.getColumnHeaderElement(props.field);

    if (tabIndex === 0 && element) {
      element.tabIndex = -1;
    }
  }, [tabIndex, apiRef, props.field]);
  const handleKeyDown = React.useCallback(event => {
    if (event.key === ' ') {
      // imperative toggle the checkbox because Space is disable by some preventDefault
      apiRef.current.publishEvent(_events.GridEvents.headerSelectionCheckboxChange, {
        value: !isChecked
      });
    } // TODO v6 remove columnHeaderNavigationKeyDown events which are not used internally anymore


    if ((0, _keyboardUtils.isNavigationKey)(event.key) && !event.shiftKey) {
      apiRef.current.publishEvent(_events.GridEvents.columnHeaderNavigationKeyDown, props, event);
    }
  }, [apiRef, props, isChecked]);
  const handleSelectionChange = React.useCallback(() => {
    forceUpdate(p => !p);
  }, []);
  React.useEffect(() => {
    return apiRef.current.subscribeEvent(_events.GridEvents.selectionChange, handleSelectionChange);
  }, [apiRef, handleSelectionChange]);
  const label = apiRef.current.getLocaleText(isChecked ? 'checkboxSelectionUnselectAllRows' : 'checkboxSelectionSelectAllRows');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseCheckbox, (0, _extends2.default)({
    ref: ref,
    indeterminate: isIndeterminate,
    checked: isChecked,
    onChange: handleChange,
    className: classes.root,
    color: "primary",
    inputProps: {
      'aria-label': label
    },
    tabIndex: tabIndex,
    onKeyDown: handleKeyDown
  }, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseCheckbox, other));
});
exports.GridHeaderCheckbox = GridHeaderCheckbox;
process.env.NODE_ENV !== "production" ? GridHeaderCheckbox.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * The column of the current header component.
   */
  colDef: _propTypes.default.object.isRequired,

  /**
   * The column field of the column that triggered the event
   */
  field: _propTypes.default.string.isRequired
} : void 0;