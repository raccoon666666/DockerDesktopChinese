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
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridFilterFormRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'FilterForm',
  overridesResolver: (props, styles) => styles.filterForm
})(({
  theme
}) => ({
  display: 'flex',
  padding: theme.spacing(1)
}));
const FilterFormDeleteIcon = styled(FormControl, {
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
const FilterFormLinkOperatorInput = styled(FormControl, {
  name: 'MuiDataGrid',
  slot: 'FilterFormLinkOperatorInput',
  overridesResolver: (_, styles) => styles.filterFormLinkOperatorInput
})({
  minWidth: 55,
  marginRight: 5,
  justifyContent: 'end'
});
const FilterFormColumnInput = styled(FormControl, {
  name: 'MuiDataGrid',
  slot: 'FilterFormColumnInput',
  overridesResolver: (_, styles) => styles.filterFormColumnInput
})({
  width: 150
});
const FilterFormOperatorInput = styled(FormControl, {
  name: 'MuiDataGrid',
  slot: 'FilterFormOperatorInput',
  overridesResolver: (_, styles) => styles.filterFormOperatorInput
})({
  width: 120
});
const FilterFormValueInput = styled(FormControl, {
  name: 'MuiDataGrid',
  slot: 'FilterFormValueInput',
  overridesResolver: (_, styles) => styles.filterFormValueInput
})({
  width: 190
});

const getLinkOperatorLocaleKey = linkOperator => {
  switch (linkOperator) {
    case GridLinkOperator.And:
      return 'filterPanelOperatorAnd';

    case GridLinkOperator.Or:
      return 'filterPanelOperatorOr';

    default:
      throw new Error('MUI: Invalid `linkOperator` property in the `GridFilterPanel`.');
  }
};

const getColumnLabel = col => col.headerName || col.field;

const collator = new Intl.Collator();

function GridFilterForm(props) {
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
    linkOperators = [GridLinkOperator.And, GridLinkOperator.Or],
    columnsSort,
    deleteIconProps = {},
    linkOperatorInputProps = {},
    operatorInputProps = {},
    columnInputProps = {},
    valueInputProps = {}
  } = props;
  const apiRef = useGridApiContext();
  const filterableColumns = useGridSelector(apiRef, gridFilterableColumnDefinitionsSelector);
  const columnSelectId = useId();
  const columnSelectLabelId = useId();
  const operatorSelectId = useId();
  const operatorSelectLabelId = useId();
  const rootProps = useGridRootProps();
  const ownerState = {
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  const valueRef = React.useRef(null);
  const filterSelectorRef = React.useRef(null);
  const hasLinkOperatorColumn = hasMultipleFilters && linkOperators.length > 0;
  const baseFormControlProps = rootProps.componentsProps?.baseFormControl || {};
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
    if (!item.operatorValue || !currentColumn) {
      return null;
    }

    return currentColumn.filterOperators?.find(operator => operator.value === item.operatorValue);
  }, [item, currentColumn]);
  const changeColumn = React.useCallback(event => {
    const columnField = event.target.value;
    const column = apiRef.current.getColumn(columnField);

    if (column.field === currentColumn.field) {
      // column did not change
      return;
    } // try to keep the same operator when column change


    const newOperator = column.filterOperators.find(operator => operator.value === item.operatorValue) || column.filterOperators[0]; // Erase filter value if the input component is modified

    const eraseItemValue = !newOperator.InputComponent || newOperator.InputComponent !== currentOperator?.InputComponent;
    applyFilterChanges(_extends({}, item, {
      columnField,
      operatorValue: newOperator.value,
      value: eraseItemValue ? undefined : item.value
    }));
  }, [apiRef, applyFilterChanges, item, currentColumn, currentOperator]);
  const changeOperator = React.useCallback(event => {
    const operatorValue = event.target.value;
    const newOperator = currentColumn?.filterOperators.find(operator => operator.value === operatorValue);
    const eraseItemValue = !newOperator?.InputComponent || newOperator?.InputComponent !== currentOperator?.InputComponent;
    applyFilterChanges(_extends({}, item, {
      operatorValue,
      value: eraseItemValue ? undefined : item.value
    }));
  }, [applyFilterChanges, item, currentColumn, currentOperator]);
  const changeLinkOperator = React.useCallback(event => {
    const linkOperator = event.target.value === GridLinkOperator.And.toString() ? GridLinkOperator.And : GridLinkOperator.Or;
    applyMultiFilterOperatorChanges(linkOperator);
  }, [applyMultiFilterOperatorChanges]);

  const handleDeleteFilter = () => {
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

  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      if (currentOperator?.InputComponent) {
        valueRef?.current?.focus();
      } else {
        filterSelectorRef.current.focus();
      }
    }
  }), [currentOperator]);
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
      }, rootProps.componentsProps?.baseSelect, {
        children: linkOperators.map(linkOperator => /*#__PURE__*/_jsx("option", {
          value: linkOperator.toString(),
          children: apiRef.current.getLocaleText(getLinkOperatorLocaleKey(linkOperator))
        }, linkOperator.toString()))
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
      }, rootProps.componentsProps?.baseSelect, {
        children: sortedFilterableColumns.map(col => /*#__PURE__*/_jsx("option", {
          value: col.field,
          children: getColumnLabel(col)
        }, col.field))
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
      }, rootProps.componentsProps?.baseSelect, {
        children: currentColumn?.filterOperators?.map(operator => /*#__PURE__*/_jsx("option", {
          value: operator.value,
          children: operator.label || apiRef.current.getLocaleText(`filterOperator${capitalize(operator.value)}`)
        }, operator.value))
      }))]
    })), /*#__PURE__*/_jsx(FilterFormValueInput, _extends({
      variant: "standard",
      as: rootProps.components.BaseFormControl
    }, baseFormControlProps, valueInputProps, {
      className: clsx(classes.valueInput, baseFormControlProps.className, valueInputProps.className),
      children: currentOperator?.InputComponent ? /*#__PURE__*/_jsx(currentOperator.InputComponent, _extends({
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