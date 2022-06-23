import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["linkOperators", "columnsSort", "filterFormProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { GridLinkOperator } from '../../../models/gridFilterItem';
import { useGridApiContext } from '../../../hooks/utils/useGridApiContext';
import { GridAddIcon } from '../../icons';
import { GridPanelContent } from '../GridPanelContent';
import { GridPanelFooter } from '../GridPanelFooter';
import { GridPanelWrapper } from '../GridPanelWrapper';
import { GridFilterForm } from './GridFilterForm';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { useGridSelector } from '../../../hooks/utils/useGridSelector';
import { gridFilterModelSelector } from '../../../hooks/features/filter/gridFilterSelector';
import { gridFilterableColumnDefinitionsSelector } from '../../../hooks/features/columns/gridColumnsSelector';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function GridFilterPanel(props) {
  var _rootProps$components;

  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const filterModel = useGridSelector(apiRef, gridFilterModelSelector);
  const filterableColumns = useGridSelector(apiRef, gridFilterableColumnDefinitionsSelector);
  const lastFilterRef = React.useRef(null);

  const {
    linkOperators = [GridLinkOperator.And, GridLinkOperator.Or],
    columnsSort,
    filterFormProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const applyFilter = React.useCallback(item => {
    apiRef.current.upsertFilterItem(item);
  }, [apiRef]);
  const applyFilterLinkOperator = React.useCallback(operator => {
    apiRef.current.setFilterLinkOperator(operator);
  }, [apiRef]);
  const getDefaultItem = React.useCallback(() => {
    const firstColumnWithOperator = filterableColumns.find(colDef => {
      var _colDef$filterOperato;

      return (_colDef$filterOperato = colDef.filterOperators) == null ? void 0 : _colDef$filterOperato.length;
    });

    if (!firstColumnWithOperator) {
      return null;
    }

    return {
      columnField: firstColumnWithOperator.field,
      operatorValue: firstColumnWithOperator.filterOperators[0].value,
      id: Math.round(Math.random() * 1e5)
    };
  }, [filterableColumns]);
  const items = React.useMemo(() => {
    if (filterModel.items.length) {
      return filterModel.items;
    }

    const defaultItem = getDefaultItem();
    return defaultItem ? [defaultItem] : [];
  }, [filterModel.items, getDefaultItem]);
  const hasMultipleFilters = items.length > 1;

  const addNewFilter = () => {
    const defaultItem = getDefaultItem();

    if (!defaultItem) {
      return;
    }

    apiRef.current.setFilterModel(_extends({}, filterModel, {
      items: [...items, defaultItem]
    }));
  };

  const deleteFilter = React.useCallback(item => {
    const shouldCloseFilterPanel = items.length === 1;
    apiRef.current.deleteFilterItem(item);

    if (shouldCloseFilterPanel) {
      apiRef.current.hideFilterPanel();
    }
  }, [apiRef, items.length]);
  React.useEffect(() => {
    if (linkOperators.length > 0 && filterModel.linkOperator && !linkOperators.includes(filterModel.linkOperator)) {
      applyFilterLinkOperator(linkOperators[0]);
    }
  }, [linkOperators, applyFilterLinkOperator, filterModel.linkOperator]);
  React.useEffect(() => {
    if (items.length > 0) {
      lastFilterRef.current.focus();
    }
  }, [items.length]);
  return /*#__PURE__*/_jsxs(GridPanelWrapper, _extends({}, other, {
    children: [/*#__PURE__*/_jsx(GridPanelContent, {
      children: items.map((item, index) => /*#__PURE__*/_jsx(GridFilterForm, _extends({
        item: item,
        applyFilterChanges: applyFilter,
        deleteFilter: deleteFilter,
        hasMultipleFilters: hasMultipleFilters,
        showMultiFilterOperators: index > 0,
        multiFilterOperator: filterModel.linkOperator,
        disableMultiFilterOperator: index !== 1,
        applyMultiFilterOperatorChanges: applyFilterLinkOperator,
        focusElementRef: index === items.length - 1 ? lastFilterRef : null,
        linkOperators: linkOperators,
        columnsSort: columnsSort
      }, filterFormProps), item.id == null ? index : item.id))
    }), !rootProps.disableMultipleColumnsFiltering && /*#__PURE__*/_jsx(GridPanelFooter, {
      children: /*#__PURE__*/_jsx(rootProps.components.BaseButton, _extends({
        onClick: addNewFilter,
        startIcon: /*#__PURE__*/_jsx(GridAddIcon, {}),
        color: "primary"
      }, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseButton, {
        children: apiRef.current.getLocaleText('filterPanelAddFilter')
      }))
    })]
  }));
}

process.env.NODE_ENV !== "production" ? GridFilterPanel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  columnsSort: PropTypes.oneOf(['asc', 'desc']),
  filterFormProps: PropTypes.shape({
    columnInputProps: PropTypes.any,
    columnsSort: PropTypes.oneOf(['asc', 'desc']),
    deleteIconProps: PropTypes.any,
    linkOperatorInputProps: PropTypes.any,
    operatorInputProps: PropTypes.any,
    valueInputProps: PropTypes.any
  }),
  linkOperators: PropTypes.arrayOf(PropTypes.oneOf(['and', 'or']).isRequired),
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export { GridFilterPanel };