"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFilterPanel = GridFilterPanel;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _gridFilterItem = require("../../../models/gridFilterItem");

var _useGridApiContext = require("../../../hooks/utils/useGridApiContext");

var _icons = require("../../icons");

var _GridPanelContent = require("../GridPanelContent");

var _GridPanelFooter = require("../GridPanelFooter");

var _GridPanelWrapper = require("../GridPanelWrapper");

var _GridFilterForm = require("./GridFilterForm");

var _useGridRootProps = require("../../../hooks/utils/useGridRootProps");

var _useGridSelector = require("../../../hooks/utils/useGridSelector");

var _gridFilterSelector = require("../../../hooks/features/filter/gridFilterSelector");

var _gridColumnsSelector = require("../../../hooks/features/columns/gridColumnsSelector");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["linkOperators", "columnsSort", "filterFormProps"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function GridFilterPanel(props) {
  var _rootProps$components;

  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const filterModel = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridFilterModelSelector);
  const filterableColumns = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridFilterableColumnDefinitionsSelector);
  const lastFilterRef = React.useRef(null);
  const {
    linkOperators = [_gridFilterItem.GridLinkOperator.And, _gridFilterItem.GridLinkOperator.Or],
    columnsSort,
    filterFormProps
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
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

    apiRef.current.setFilterModel((0, _extends2.default)({}, filterModel, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_GridPanelWrapper.GridPanelWrapper, (0, _extends2.default)({}, other, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_GridPanelContent.GridPanelContent, {
      children: items.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridFilterForm.GridFilterForm, (0, _extends2.default)({
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
    }), !rootProps.disableMultipleColumnsFiltering && /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridPanelFooter.GridPanelFooter, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseButton, (0, _extends2.default)({
        onClick: addNewFilter,
        startIcon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.GridAddIcon, {}),
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
  columnsSort: _propTypes.default.oneOf(['asc', 'desc']),
  filterFormProps: _propTypes.default.shape({
    columnInputProps: _propTypes.default.any,
    columnsSort: _propTypes.default.oneOf(['asc', 'desc']),
    deleteIconProps: _propTypes.default.any,
    linkOperatorInputProps: _propTypes.default.any,
    operatorInputProps: _propTypes.default.any,
    valueInputProps: _propTypes.default.any
  }),
  linkOperators: _propTypes.default.arrayOf(_propTypes.default.oneOf(['and', 'or']).isRequired),
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;