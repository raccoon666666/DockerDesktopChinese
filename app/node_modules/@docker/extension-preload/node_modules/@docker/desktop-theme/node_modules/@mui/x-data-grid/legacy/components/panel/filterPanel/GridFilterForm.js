import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { capitalize, unstable_useId as useId } from '@mui/material/utils';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { gridFilterableColumnDefinitionsSelector } from '../../../hooks/features/columns/gridColumnsSelector';
import { useGridSelector } from '../../../hooks/utils/useGridSelector';
import { GridLinkOperator } from '../../../models/gridFilterItem';
import { useGridApiContext } from '../../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { getDataGridUtilityClass } from '../../../constants/gridClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['filterForm'],
    deleteIcon: ['filterFormDeleteIcon'],
    linkOperatorInput: ['filterFormLinkOperatorInput'],
    columnInput: ['filterFormColumnInput'],
    operatorInput: ['filterFormOperatorInput'],
    valueInput: ['filterFormValueInput']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

var GridFilterFormRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'FilterForm',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.filterForm;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'flex',
    padding: theme.spacing(1)
  };
});
var FilterFormDeleteIcon = styled(FormControl, {
  name: 'MuiDataGrid',
  slot: 'FilterFormDeleteIcon',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.filterFormDeleteIcon;
  }
})(function (_ref2) {
  var theme = _ref2.theme;
  return {
    flexShrink: 0,
    justifyContent: 'flex-end',
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.2)
  };
});
var FilterFormLinkOperatorInput = styled(FormControl, {
  name: 'MuiDataGrid',
  slot: 'FilterFormLinkOperatorInput',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.filterFormLinkOperatorInput;
  }
})({
  minWidth: 55,
  marginRight: 5,
  justifyContent: 'end'
});
var FilterFormColumnInput = styled(FormControl, {
  name: 'MuiDataGrid',
  slot: 'FilterFormColumnInput',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.filterFormColumnInput;
  }
})({
  width: 150
});
var FilterFormOperatorInput = styled(FormControl, {
  name: 'MuiDataGrid',
  slot: 'FilterFormOperatorInput',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.filterFormOperatorInput;
  }
})({
  width: 120
});
var FilterFormValueInput = styled(FormControl, {
  name: 'MuiDataGrid',
  slot: 'FilterFormValueInput',
  overridesResolver: function overridesResolver(_, styles) {
    return styles.filterFormValueInput;
  }
})({
  width: 190
});

var getLinkOperatorLocaleKey = function getLinkOperatorLocaleKey(linkOperator) {
  switch (linkOperator) {
    case GridLinkOperator.And:
      return 'filterPanelOperatorAnd';

    case GridLinkOperator.Or:
      return 'filterPanelOperatorOr';

    default:
      throw new Error('MUI: Invalid `linkOperator` property in the `GridFilterPanel`.');
  }
};

var getColumnLabel = function getColumnLabel(col) {
  return col.headerName || col.field;
};

var collator = new Intl.Collator();

function GridFilterForm(props) {
  var _rootProps$components, _rootProps$components2, _rootProps$components3, _rootProps$components4, _currentColumn$filter2;

  var item = props.item,
      hasMultipleFilters = props.hasMultipleFilters,
      deleteFilter = props.deleteFilter,
      applyFilterChanges = props.applyFilterChanges,
      multiFilterOperator = props.multiFilterOperator,
      showMultiFilterOperators = props.showMultiFilterOperators,
      disableMultiFilterOperator = props.disableMultiFilterOperator,
      applyMultiFilterOperatorChanges = props.applyMultiFilterOperatorChanges,
      focusElementRef = props.focusElementRef,
      _props$linkOperators = props.linkOperators,
      linkOperators = _props$linkOperators === void 0 ? [GridLinkOperator.And, GridLinkOperator.Or] : _props$linkOperators,
      columnsSort = props.columnsSort,
      _props$deleteIconProp = props.deleteIconProps,
      deleteIconProps = _props$deleteIconProp === void 0 ? {} : _props$deleteIconProp,
      _props$linkOperatorIn = props.linkOperatorInputProps,
      linkOperatorInputProps = _props$linkOperatorIn === void 0 ? {} : _props$linkOperatorIn,
      _props$operatorInputP = props.operatorInputProps,
      operatorInputProps = _props$operatorInputP === void 0 ? {} : _props$operatorInputP,
      _props$columnInputPro = props.columnInputProps,
      columnInputProps = _props$columnInputPro === void 0 ? {} : _props$columnInputPro,
      _props$valueInputProp = props.valueInputProps,
      valueInputProps = _props$valueInputProp === void 0 ? {} : _props$valueInputProp;
  var apiRef = useGridApiContext();
  var filterableColumns = useGridSelector(apiRef, gridFilterableColumnDefinitionsSelector);
  var columnSelectId = useId();
  var columnSelectLabelId = useId();
  var operatorSelectId = useId();
  var operatorSelectLabelId = useId();
  var rootProps = useGridRootProps();
  var ownerState = {
    classes: rootProps.classes
  };
  var classes = useUtilityClasses(ownerState);
  var valueRef = React.useRef(null);
  var filterSelectorRef = React.useRef(null);
  var hasLinkOperatorColumn = hasMultipleFilters && linkOperators.length > 0;
  var baseFormControlProps = ((_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseFormControl) || {};
  var sortedFilterableColumns = React.useMemo(function () {
    switch (columnsSort) {
      case 'asc':
        return filterableColumns.sort(function (a, b) {
          return collator.compare(getColumnLabel(a), getColumnLabel(b));
        });

      case 'desc':
        return filterableColumns.sort(function (a, b) {
          return -collator.compare(getColumnLabel(a), getColumnLabel(b));
        });

      default:
        return filterableColumns;
    }
  }, [filterableColumns, columnsSort]);
  var currentColumn = item.columnField ? apiRef.current.getColumn(item.columnField) : null;
  var currentOperator = React.useMemo(function () {
    var _currentColumn$filter;

    if (!item.operatorValue || !currentColumn) {
      return null;
    }

    return (_currentColumn$filter = currentColumn.filterOperators) == null ? void 0 : _currentColumn$filter.find(function (operator) {
      return operator.value === item.operatorValue;
    });
  }, [item, currentColumn]);
  var changeColumn = React.useCallback(function (event) {
    var columnField = event.target.value;
    var column = apiRef.current.getColumn(columnField);

    if (column.field === currentColumn.field) {
      // column did not change
      return;
    } // try to keep the same operator when column change


    var newOperator = column.filterOperators.find(function (operator) {
      return operator.value === item.operatorValue;
    }) || column.filterOperators[0]; // Erase filter value if the input component is modified

    var eraseItemValue = !newOperator.InputComponent || newOperator.InputComponent !== (currentOperator == null ? void 0 : currentOperator.InputComponent);
    applyFilterChanges(_extends({}, item, {
      columnField: columnField,
      operatorValue: newOperator.value,
      value: eraseItemValue ? undefined : item.value
    }));
  }, [apiRef, applyFilterChanges, item, currentColumn, currentOperator]);
  var changeOperator = React.useCallback(function (event) {
    var operatorValue = event.target.value;
    var newOperator = currentColumn == null ? void 0 : currentColumn.filterOperators.find(function (operator) {
      return operator.value === operatorValue;
    });
    var eraseItemValue = !(newOperator != null && newOperator.InputComponent) || (newOperator == null ? void 0 : newOperator.InputComponent) !== (currentOperator == null ? void 0 : currentOperator.InputComponent);
    applyFilterChanges(_extends({}, item, {
      operatorValue: operatorValue,
      value: eraseItemValue ? undefined : item.value
    }));
  }, [applyFilterChanges, item, currentColumn, currentOperator]);
  var changeLinkOperator = React.useCallback(function (event) {
    var linkOperator = event.target.value === GridLinkOperator.And.toString() ? GridLinkOperator.And : GridLinkOperator.Or;
    applyMultiFilterOperatorChanges(linkOperator);
  }, [applyMultiFilterOperatorChanges]);

  var handleDeleteFilter = function handleDeleteFilter() {
    if (rootProps.disableMultipleColumnsFiltering) {
      if (item.value === undefined) {
        deleteFilter(item);
      } else {
        // TODO v6: simplify the behavior by always remove the filter form
        applyFilterChanges(_extends({}, item, {
          value: undefined
        }));
      }
    } else {
      deleteFilter(item);
    }
  };

  React.useImperativeHandle(focusElementRef, function () {
    return {
      focus: function focus() {
        if (currentOperator != null && currentOperator.InputComponent) {
          var _valueRef$current;

          valueRef == null ? void 0 : (_valueRef$current = valueRef.current) == null ? void 0 : _valueRef$current.focus();
        } else {
          filterSelectorRef.current.focus();
        }
      }
    };
  }, [currentOperator]);
  return /*#__PURE__*/_jsxs(GridFilterFormRoot, {
    className: classes.root,
    children: [/*#__PURE__*/_jsx(FilterFormDeleteIcon, _extends({
      variant: "standard",
      as: rootProps.components.BaseFormControl
    }, baseFormControlProps, deleteIconProps, {
      className: clsx(classes.deleteIcon, baseFormControlProps.className, deleteIconProps.className),
      children: /*#__PURE__*/_jsx(IconButton, {
        "aria-label": apiRef.current.getLocaleText('filterPanelDeleteIconLabel'),
        title: apiRef.current.getLocaleText('filterPanelDeleteIconLabel'),
        onClick: handleDeleteFilter,
        size: "small",
        children: /*#__PURE__*/_jsx(rootProps.components.FilterPanelDeleteIcon, {
          fontSize: "small"
        })
      })
    })), /*#__PURE__*/_jsx(FilterFormLinkOperatorInput, _extends({
      variant: "standard",
      as: rootProps.components.BaseFormControl
    }, baseFormControlProps, linkOperatorInputProps, {
      sx: _extends({
        display: hasLinkOperatorColumn ? 'flex' : 'none',
        visibility: showMultiFilterOperators ? 'visible' : 'hidden'
      }, baseFormControlProps.sx || {}, linkOperatorInputProps.sx || {}),
      className: clsx(classes.linkOperatorInput, baseFormControlProps.className, linkOperatorInputProps.className),
      children: /*#__PURE__*/_jsx(rootProps.components.BaseSelect, _extends({
        inputProps: {
          'aria-label': apiRef.current.getLocaleText('filterPanelLinkOperator')
        },
        value: multiFilterOperator,
        onChange: changeLinkOperator,
        disabled: !!disableMultiFilterOperator || linkOperators.length === 1,
        native: true
      }, (_rootProps$components2 = rootProps.componentsProps) == null ? void 0 : _rootProps$components2.baseSelect, {
        children: linkOperators.map(function (linkOperator) {
          return /*#__PURE__*/_jsx("option", {
            value: linkOperator.toString(),
            children: apiRef.current.getLocaleText(getLinkOperatorLocaleKey(linkOperator))
          }, linkOperator.toString());
        })
      }))
    })), /*#__PURE__*/_jsxs(FilterFormColumnInput, _extends({
      variant: "standard",
      as: rootProps.components.BaseFormControl
    }, baseFormControlProps, columnInputProps, {
      className: clsx(classes.columnInput, baseFormControlProps.className, columnInputProps.className),
      children: [/*#__PURE__*/_jsx(InputLabel, {
        htmlFor: columnSelectId,
        id: columnSelectLabelId,
        children: apiRef.current.getLocaleText('filterPanelColumns')
      }), /*#__PURE__*/_jsx(rootProps.components.BaseSelect, _extends({
        labelId: columnSelectLabelId,
        id: columnSelectId,
        label: apiRef.current.getLocaleText('filterPanelColumns'),
        value: item.columnField || '',
        onChange: changeColumn,
        native: true
      }, (_rootProps$components3 = rootProps.componentsProps) == null ? void 0 : _rootProps$components3.baseSelect, {
        children: sortedFilterableColumns.map(function (col) {
          return /*#__PURE__*/_jsx("option", {
            value: col.field,
            children: getColumnLabel(col)
          }, col.field);
        })
      }))]
    })), /*#__PURE__*/_jsxs(FilterFormOperatorInput, _extends({
      variant: "standard",
      as: rootProps.components.BaseFormControl
    }, baseFormControlProps, operatorInputProps, {
      className: clsx(classes.operatorInput, baseFormControlProps.className, operatorInputProps.className),
      children: [/*#__PURE__*/_jsx(InputLabel, {
        htmlFor: operatorSelectId,
        id: operatorSelectLabelId,
        children: apiRef.current.getLocaleText('filterPanelOperators')
      }), /*#__PURE__*/_jsx(rootProps.components.BaseSelect, _extends({
        labelId: operatorSelectLabelId,
        label: apiRef.current.getLocaleText('filterPanelOperators'),
        id: operatorSelectId,
        value: item.operatorValue,
        onChange: changeOperator,
        native: true,
        inputRef: filterSelectorRef
      }, (_rootProps$components4 = rootProps.componentsProps) == null ? void 0 : _rootProps$components4.baseSelect, {
        children: currentColumn == null ? void 0 : (_currentColumn$filter2 = currentColumn.filterOperators) == null ? void 0 : _currentColumn$filter2.map(function (operator) {
          return /*#__PURE__*/_jsx("option", {
            value: operator.value,
            children: operator.label || apiRef.current.getLocaleText("filterOperator".concat(capitalize(operator.value)))
          }, operator.value);
        })
      }))]
    })), /*#__PURE__*/_jsx(FilterFormValueInput, _extends({
      variant: "standard",
      as: rootProps.components.BaseFormControl
    }, baseFormControlProps, valueInputProps, {
      className: clsx(classes.valueInput, baseFormControlProps.className, valueInputProps.className),
      children: currentOperator != null && currentOperator.InputComponent ? /*#__PURE__*/_jsx(currentOperator.InputComponent, _extends({
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
  applyFilterChanges: PropTypes.func.isRequired,
  applyMultiFilterOperatorChanges: PropTypes.func.isRequired,
  columnInputProps: PropTypes.any,
  columnsSort: PropTypes.oneOf(['asc', 'desc']),
  deleteFilter: PropTypes.func.isRequired,
  deleteIconProps: PropTypes.any,
  disableMultiFilterOperator: PropTypes.bool,
  focusElementRef: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.func, PropTypes.object]),
  hasMultipleFilters: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    columnField: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    operatorValue: PropTypes.string,
    value: PropTypes.any
  }).isRequired,
  linkOperatorInputProps: PropTypes.any,
  linkOperators: PropTypes.arrayOf(PropTypes.oneOf(['and', 'or']).isRequired),
  multiFilterOperator: PropTypes.oneOf(['and', 'or']),
  operatorInputProps: PropTypes.any,
  showMultiFilterOperators: PropTypes.bool,
  valueInputProps: PropTypes.any
} : void 0;
export { GridFilterForm };