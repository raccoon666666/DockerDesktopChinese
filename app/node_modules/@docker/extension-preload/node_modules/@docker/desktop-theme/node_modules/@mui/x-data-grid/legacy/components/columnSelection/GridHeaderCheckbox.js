import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["field", "colDef"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { GridEvents } from '../../models/events';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { gridTabIndexColumnHeaderSelector } from '../../hooks/features/focus/gridFocusStateSelector';
import { gridSelectionStateSelector } from '../../hooks/features/selection/gridSelectionSelector';
import { isNavigationKey } from '../../utils/keyboardUtils';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { gridVisibleSortedRowIdsSelector } from '../../hooks/features/filter/gridFilterSelector';
import { gridPaginatedVisibleSortedGridRowIdsSelector } from '../../hooks/features/pagination/gridPaginationSelector';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['checkboxInput']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var GridHeaderCheckbox = /*#__PURE__*/React.forwardRef(function GridHeaderCheckbox(props, ref) {
  var _rootProps$components;

  var field = props.field,
      colDef = props.colDef,
      other = _objectWithoutProperties(props, _excluded);

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      forceUpdate = _React$useState2[1];

  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  var tabIndexState = useGridSelector(apiRef, gridTabIndexColumnHeaderSelector);
  var selection = useGridSelector(apiRef, gridSelectionStateSelector);
  var visibleRowIds = useGridSelector(apiRef, gridVisibleSortedRowIdsSelector);
  var paginatedVisibleRowIds = useGridSelector(apiRef, gridPaginatedVisibleSortedGridRowIdsSelector);
  var filteredSelection = React.useMemo(function () {
    if (typeof rootProps.isRowSelectable !== 'function') {
      return selection;
    }

    return selection.filter(function (id) {
      // The row might have been deleted
      if (!apiRef.current.getRow(id)) {
        return false;
      }

      return rootProps.isRowSelectable(apiRef.current.getRowParams(id));
    });
  }, [apiRef, rootProps.isRowSelectable, selection]); // All the rows that could be selected / unselected by toggling this checkbox

  var selectionCandidates = React.useMemo(function () {
    var rowIds = !rootProps.pagination || !rootProps.checkboxSelectionVisibleOnly ? visibleRowIds : paginatedVisibleRowIds; // Convert to an object to make O(1) checking if a row exists or not
    // TODO create selector that returns visibleRowIds/paginatedVisibleRowIds as an object

    return rowIds.reduce(function (acc, id) {
      acc[id] = true;
      return acc;
    }, {});
  }, [rootProps.pagination, rootProps.checkboxSelectionVisibleOnly, paginatedVisibleRowIds, visibleRowIds]); // Amount of rows selected and that are visible in the current page

  var currentSelectionSize = React.useMemo(function () {
    return filteredSelection.filter(function (id) {
      return selectionCandidates[id];
    }).length;
  }, [filteredSelection, selectionCandidates]);
  var isIndeterminate = currentSelectionSize > 0 && currentSelectionSize < Object.keys(selectionCandidates).length;
  var isChecked = currentSelectionSize > 0;

  var handleChange = function handleChange(event) {
    var params = {
      value: event.target.checked
    };
    apiRef.current.publishEvent(GridEvents.headerSelectionCheckboxChange, params);
  };

  var tabIndex = tabIndexState !== null && tabIndexState.field === props.field ? 0 : -1;
  React.useLayoutEffect(function () {
    var element = apiRef.current.getColumnHeaderElement(props.field);

    if (tabIndex === 0 && element) {
      element.tabIndex = -1;
    }
  }, [tabIndex, apiRef, props.field]);
  var handleKeyDown = React.useCallback(function (event) {
    if (event.key === ' ') {
      // imperative toggle the checkbox because Space is disable by some preventDefault
      apiRef.current.publishEvent(GridEvents.headerSelectionCheckboxChange, {
        value: !isChecked
      });
    } // TODO v6 remove columnHeaderNavigationKeyDown events which are not used internally anymore


    if (isNavigationKey(event.key) && !event.shiftKey) {
      apiRef.current.publishEvent(GridEvents.columnHeaderNavigationKeyDown, props, event);
    }
  }, [apiRef, props, isChecked]);
  var handleSelectionChange = React.useCallback(function () {
    forceUpdate(function (p) {
      return !p;
    });
  }, []);
  React.useEffect(function () {
    return apiRef.current.subscribeEvent(GridEvents.selectionChange, handleSelectionChange);
  }, [apiRef, handleSelectionChange]);
  var label = apiRef.current.getLocaleText(isChecked ? 'checkboxSelectionUnselectAllRows' : 'checkboxSelectionSelectAllRows');
  return /*#__PURE__*/_jsx(rootProps.components.BaseCheckbox, _extends({
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
process.env.NODE_ENV !== "production" ? GridHeaderCheckbox.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * The column of the current header component.
   */
  colDef: PropTypes.object.isRequired,

  /**
   * The column field of the column that triggered the event
   */
  field: PropTypes.string.isRequired
} : void 0;
export { GridHeaderCheckbox };