"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFilterForm = GridFilterForm;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _material = require("@mui/material");

var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));

var _InputLabel = _interopRequireDefault(require("@mui/material/InputLabel"));

var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));

var _utils = require("@mui/material/utils");

var _styles = require("@mui/material/styles");

var _clsx = _interopRequireDefault(require("clsx"));

var _gridColumnsSelector = require("../../../hooks/features/columns/gridColumnsSelector");

var _useGridSelector = require("../../../hooks/utils/useGridSelector");

var _gridFilterItem = require("../../../models/gridFilterItem");

var _useGridApiContext = require("../../../hooks/utils/useGridApiContext");

var _useGridRootProps = require("../../../hooks/utils/useGridRootProps");

var _gridClasses = require("../../../constants/gridClasses");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['filterForm'],
    deleteIcon: ['filterFormDeleteIcon'],
    linkOperatorInput: ['filterFormLinkOperatorInput'],
    columnInput: ['filterFormColumnInput'],
    operatorInput: ['filterFormOperatorInput'],
    valueInput: ['filterFormValueInput']
  };
  return (0, _material.unstable_composeClasses)(slots, _gridClasses.getDataGridUtilityClass, classes);
};

const GridFilterFormRoot = (0, _styles.styled)('div', {
  name: 'MuiDataGrid',
  slot: 'FilterForm',
  overridesResolver: (props, styles) => styles.filterForm
})(({
  theme
}) => ({
  display: 'flex',
  padding: theme.spacing(1)
}));
const FilterFormDeleteIcon = (0, _styles.styled)(_FormControl.default, {
  name: 'MuiDataGrid',
  slot: 'FilterFormDeleteIcon',
  overridesResolver: (_, styles) => styles.filterFormDeleteIcon
})(({
  theme
}) => ({
  flexShrink: 0,
  justifyContent: 'flex-end',
  marginRight: theme.spacing(0.5),
  marginBottom: theme.spacing(0.2)
}));
const FilterFormLinkOperatorInput = (0, _styles.styled)(_FormControl.default, {
  name: 'MuiDataGrid',
  slot: 'FilterFormLinkOperatorInput',
  overridesResolver: (_, styles) => styles.filterFormLinkOperatorInput
})({
  minWidth: 55,
  marginRight: 5,
  justifyContent: 'end'
});
const FilterFormColumnInput = (0, _styles.styled)(_FormControl.default, {
  name: 'MuiDataGrid',
  slot: 'FilterFormColumnInput',
  overridesResolver: (_, styles) => styles.filterFormColumnInput
})({
  width: 150
});
const FilterFormOperatorInput = (0, _styles.styled)(_FormControl.default, {
  name: 'MuiDataGrid',
  slot: 'FilterFormOperatorInput',
  overridesResolver: (_, styles) => styles.filterFormOperatorInput
})({
  width: 120
});
const FilterFormValueInput = (0, _styles.styled)(_FormControl.default, {
  name: 'MuiDataGrid',
  slot: 'FilterFormValueInput',
  overridesResolver: (_, styles) => styles.filterFormValueInput
})({
  width: 190
});

const getLinkOperatorLocaleKey = linkOperator => {
  switch (linkOperator) {
    case _gridFilterItem.GridLinkOperator.And:
      return 'filterPanelOperatorAnd';

    case _gridFilterItem.GridLinkOperator.Or:
      return 'filterPanelOperatorOr';

    default:
      throw new Error('MUI: Invalid `linkOperator` property in the `GridFilterPanel`.');
  }
};

const getColumnLabel = col => col.headerName || col.field;

const collator = new Intl.Collator();

function GridFilterForm(props) {
  var _rootProps$components, _rootProps$components2, _rootProps$components3, _rootProps$components4, _currentColumn$filter2;

  const {
    item,
    hasMultipleFilters,
    deleteFilter,
    applyFilterChanges,
    multiFilterOperator,
    showMultiFilterOperators,
    disableMultiFilterOperator,
    applyMultiFilterOperatorChanges,
    focusElementRef,
    linkOperators = [_gridFilterItem.GridLinkOperator.And, _gridFilterItem.GridLinkOperator.Or],
    columnsSort,
    deleteIconProps = {},
    linkOperatorInputProps = {},
    operatorInputProps = {},
    columnInputProps = {},
    valueInputProps = {}
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const filterableColumns = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridFilterableColumnDefinitionsSelector);
  const columnSelectId = (0, _utils.unstable_useId)();
  const columnSelectLabelId = (0, _utils.unstable_useId)();
  const operatorSelectId = (0, _utils.unstable_useId)();
  const operatorSelectLabelId = (0, _utils.unstable_useId)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  const valueRef = React.useRef(null);
  const filterSelectorRef = React.useRef(null);
  const hasLinkOperatorColumn = hasMultipleFilters && linkOperators.length > 0;
  const baseFormControlProps = ((_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseFormControl) || {};
  const sortedFilterableColumns = React.useMemo(() => {
    switch (columnsSort) {
      case 'asc':
        return filterableColumns.sort((a, b) => collator.compare(getColumnLabel(a), getColumnLabel(b)));

      case 'desc':
        return filterableColumns.sort((a, b) => -collator.compare(getColumnLabel(a), getColumnLabel(b)));

      default:
        return filterableColumns;
    }
  }, [filterableColumns, columnsSort]);
  const currentColumn = item.columnField ? apiRef.current.getColumn(item.columnField) : null;
  const currentOperator = React.useMemo(() => {
    var _currentColumn$filter;

    if (!item.operatorValue || !currentColumn) {
      return null;
    }

    return (_currentColumn$filter = currentColumn.filterOperators) == null ? void 0 : _currentColumn$filter.find(operator => operator.value === item.operatorValue);
  }, [item, currentColumn]);
  const changeColumn = React.useCallback(event => {
    const columnField = event.target.value;
    const column = apiRef.current.getColumn(columnField);

    if (column.field === currentColumn.field) {
      // column did not change
      return;
    } // try to keep the same operator when column change


    const newOperator = column.filterOperators.find(operator => operator.value === item.operatorValue) || column.filterOperators[0]; // Erase filter value if the input component is modified

    const eraseItemValue = !newOperator.InputComponent || newOperator.InputComponent !== (currentOperator == null ? void 0 : currentOperator.InputComponent);
    applyFilterChanges((0, _extends2.default)({}, item, {
      columnField,
      operatorValue: newOperator.value,
      value: eraseItemValue ? undefined : item.value
    }));
  }, [apiRef, applyFilterChanges, item, currentColumn, currentOperator]);
  const changeOperator = React.useCallback(event => {
    const operatorValue = event.target.value;
    const newOperator = currentColumn == null ? void 0 : currentColumn.filterOperators.find(operator => operator.value === operatorValue);
    const eraseItemValue = !(newOperator != null && newOperator.InputComponent) || (newOperator == null ? void 0 : newOperator.InputComponent) !== (currentOperator == null ? void 0 : currentOperator.InputComponent);
    applyFilterChanges((0, _extends2.default)({}, item, {
      operatorValue,
      value: eraseItemValue ? undefined : item.value
    }));
  }, [applyFilterChanges, item, currentColumn, currentOperator]);
  const changeLinkOperator = React.useCallback(event => {
    const linkOperator = event.target.value === _gridFilterItem.GridLinkOperator.And.toString() ? _gridFilterItem.GridLinkOperator.And : _gridFilterItem.GridLinkOperator.Or;
    applyMultiFilterOperatorChanges(linkOperator);
  }, [applyMultiFilterOperatorChanges]);

  const handleDeleteFilter = () => {
    if (rootProps.disableMultipleColumnsFiltering) {
      if (item.value === undefined) {
        deleteFilter(item);
      } else {
        // TODO v6: simplify the behavior by always remove the filter form
        applyFilterChanges((0, _extends2.default)({}, item, {
          value: undefined
        }));
      }
    } else {
      deleteFilter(item);
    }
  };

  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      if (currentOperator != null && currentOperator.InputComponent) {
        var _valueRef$current;

        valueRef == null ? void 0 : (_valueRef$current = valueRef.current) == null ? void 0 : _valueRef$current.focus();
      } else {
        filterSelectorRef.current.focus();
      }
    }
  }), [currentOperator]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(GridFilterFormRoot, {
    className: classes.root,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(FilterFormDeleteIcon, (0, _extends2.default)({
      variant: "standard",
      as: rootProps.components.BaseFormControl
    }, baseFormControlProps, deleteIconProps, {
      className: (0, _clsx.default)(classes.deleteIcon, baseFormControlProps.className, deleteIconProps.className),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
        "aria-label": apiRef.current.getLocaleText('filterPanelDeleteIconLabel'),
        title: apiRef.current.getLocaleText('filterPanelDeleteIconLabel'),
        onClick: handleDeleteFilter,
        size: "small",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.FilterPanelDeleteIcon, {
          fontSize: "small"
        })
      })
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(FilterFormLinkOperatorInput, (0, _extends2.default)({
      variant: "standard",
      as: rootProps.components.BaseFormControl
    }, baseFormControlProps, linkOperatorInputProps, {
      sx: (0, _extends2.default)({
        display: hasLinkOperatorColumn ? 'flex' : 'none',
        visibility: showMultiFilterOperators ? 'visible' : 'hidden'
      }, baseFormControlProps.sx || {}, linkOperatorInputProps.sx || {}),
      className: (0, _clsx.default)(classes.linkOperatorInput, baseFormControlProps.className, linkOperatorInputProps.className),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseSelect, (0, _extends2.default)({
        inputProps: {
          'aria-label': apiRef.current.getLocaleText('filterPanelLinkOperator')
        },
        value: multiFilterOperator,
        onChange: changeLinkOperator,
        disabled: !!disableMultiFilterOperator || linkOperators.length === 1,
        native: true
      }, (_rootProps$components2 = rootProps.componentsProps) == null ? void 0 : _rootProps$components2.baseSelect, {
        children: linkOperators.map(linkOperator => /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
          value: linkOperator.toString(),
          children: apiRef.current.getLocaleText(getLinkOperatorLocaleKey(linkOperator))
        }, linkOperator.toString()))
      }))
    })), /*#__PURE__*/(0, _jsxRuntime.jsxs)(FilterFormColumnInput, (0, _extends2.default)({
      variant: "standard",
      as: rootProps.components.BaseFormControl
    }, baseFormControlProps, columnInputProps, {
      className: (0, _clsx.default)(classes.columnInput, baseFormControlProps.className, columnInputProps.className),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputLabel.default, {
        htmlFor: columnSelectId,
        id: columnSelectLabelId,
        children: apiRef.current.getLocaleText('filterPanelColumns')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseSelect, (0, _extends2.default)({
        labelId: columnSelectLabelId,
        id: columnSelectId,
        label: apiRef.current.getLocaleText('filterPanelColumns'),
        value: item.columnField || '',
        onChange: changeColumn,
        native: true
      }, (_rootProps$components3 = rootProps.componentsProps) == null ? void 0 : _rootProps$components3.baseSelect, {
        children: sortedFilterableColumns.map(col => /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
          value: col.field,
          children: getColumnLabel(col)
        }, col.field))
      }))]
    })), /*#__PURE__*/(0, _jsxRuntime.jsxs)(FilterFormOperatorInput, (0, _extends2.default)({
      variant: "standard",
      as: rootProps.components.BaseFormControl
    }, baseFormControlProps, operatorInputProps, {
      className: (0, _clsx.default)(classes.operatorInput, baseFormControlProps.className, operatorInputProps.className),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputLabel.default, {
        htmlFor: operatorSelectId,
        id: operatorSelectLabelId,
        children: apiRef.current.getLocaleText('filterPanelOperators')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseSelect, (0, _extends2.default)({
        labelId: operatorSelectLabelId,
        label: apiRef.current.getLocaleText('filterPanelOperators'),
        id: operatorSelectId,
        value: item.operatorValue,
        onChange: changeOperator,
        native: true,
        inputRef: filterSelectorRef
      }, (_rootProps$components4 = rootProps.componentsProps) == null ? void 0 : _rootProps$components4.baseSelect, {
        children: currentColumn == null ? void 0 : (_currentColumn$filter2 = currentColumn.filterOperators) == null ? void 0 : _currentColumn$filter2.map(operator => /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
          value: operator.value,
          children: operator.label || apiRef.current.getLocaleText(`filterOperator${(0, _utils.capitalize)(operator.value)}`)
        }, operator.value))
      }))]
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(FilterFormValueInput, (0, _extends2.default)({
      variant: "standard",
      as: rootProps.components.BaseFormControl
    }, baseFormControlProps, valueInputProps, {
      className: (0, _clsx.default)(classes.valueInput, baseFormControlProps.className, valueInputProps.className),
      children: currentOperator != null && currentOperator.InputComponent ? /*#__PURE__*/(0, _jsxRuntime.jsx)(currentOperator.InputComponent, (0, _extends2.default)({
        apiRef: apiRef,
        item: item,
        applyValue: applyFilterChanges,
        focusElementRef: valueRef
      }, currentOperator.InputComponentProps)) : null
    }))]
  });
}

process.env.NODE_ENV !== "production" ? GridFilterForm.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  applyFilterChanges: _propTypes.default.func.isRequired,
  applyMultiFilterOperatorChanges: _propTypes.default.func.isRequired,
  columnInputProps: _propTypes.default.any,
  columnsSort: _propTypes.default.oneOf(['asc', 'desc']),
  deleteFilter: _propTypes.default.func.isRequired,
  deleteIconProps: _propTypes.default.any,
  disableMultiFilterOperator: _propTypes.default.bool,
  focusElementRef: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.func, _propTypes.default.object]),
  hasMultipleFilters: _propTypes.default.bool.isRequired,
  item: _propTypes.default.shape({
    columnField: _propTypes.default.string.isRequired,
    id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    operatorValue: _propTypes.default.string,
    value: _propTypes.default.any
  }).isRequired,
  linkOperatorInputProps: _propTypes.default.any,
  linkOperators: _propTypes.default.arrayOf(_propTypes.default.oneOf(['and', 'or']).isRequired),
  multiFilterOperator: _propTypes.default.oneOf(['and', 'or']),
  operatorInputProps: _propTypes.default.any,
  showMultiFilterOperators: _propTypes.default.bool,
  valueInputProps: _propTypes.default.any
} : void 0;