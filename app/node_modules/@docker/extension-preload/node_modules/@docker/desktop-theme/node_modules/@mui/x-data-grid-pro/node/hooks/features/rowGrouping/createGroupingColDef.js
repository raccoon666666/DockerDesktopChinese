"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGroupingColDefForOneGroupingCriteria = exports.createGroupingColDefForAllGroupingCriteria = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _xDataGrid = require("@mui/x-data-grid");

var _GridGroupingCriteriaCell = require("../../../components/GridGroupingCriteriaCell");

var _GridGroupingColumnLeafCell = require("../../../components/GridGroupingColumnLeafCell");

var _gridRowGroupingUtils = require("./gridRowGroupingUtils");

var _gridRowGroupingSelector = require("./gridRowGroupingSelector");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["leafField", "mainGroupingCriteria", "hideDescendantCount"],
      _excluded2 = ["leafField", "mainGroupingCriteria", "hideDescendantCount"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GROUPING_COL_DEF_DEFAULT_PROPERTIES = (0, _extends2.default)({}, _xDataGrid.GRID_STRING_COL_DEF, {
  disableReorder: true
});
const GROUPING_COL_DEF_FORCED_PROPERTIES = {
  type: 'rowGroupByColumnsGroup',
  editable: false,
  groupable: false
};
/**
 * When sorting two cells with different grouping criteria, we consider that the cell with the grouping criteria coming first in the model should be displayed below.
 * This can occur when some rows don't have all the fields. In which case we want the rows with the missing field to be displayed above.
 * TODO: Make this index comparator depth invariant, the logic should not be inverted when sorting in the "desc" direction (but the current return format of `sortComparator` does not support this behavior).
 */

const groupingFieldIndexComparator = (v1, v2, cellParams1, cellParams2) => {
  const model = (0, _gridRowGroupingSelector.gridRowGroupingSanitizedModelSelector)(cellParams1.api.state, cellParams1.api.instanceId);
  const groupingField1 = cellParams1.rowNode.groupingField;
  const groupingField2 = cellParams2.rowNode.groupingField;

  if (groupingField1 === groupingField2) {
    return 0;
  }

  if (groupingField1 == null) {
    return -1;
  }

  if (groupingField2 == null) {
    return 1;
  }

  if (model.indexOf(groupingField1) < model.indexOf(groupingField2)) {
    return -1;
  }

  return 1;
};

const getLeafProperties = leafColDef => {
  var _leafColDef$headerNam, _leafColDef$filterOpe;

  return {
    headerName: (_leafColDef$headerNam = leafColDef.headerName) != null ? _leafColDef$headerNam : leafColDef.field,
    sortable: leafColDef.sortable,
    filterable: leafColDef.filterable,
    filterOperators: (_leafColDef$filterOpe = leafColDef.filterOperators) == null ? void 0 : _leafColDef$filterOpe.map(operator => (0, _extends2.default)({}, operator, {
      getApplyFilterFn: (filterItem, column) => {
        const originalFn = operator.getApplyFilterFn(filterItem, column);

        if (!originalFn) {
          return null;
        }

        return params => {
          // We only want to filter leaves
          if (params.rowNode.groupingField != null) {
            return true;
          }

          return originalFn(params);
        };
      }
    })),
    sortComparator: (v1, v2, cellParams1, cellParams2) => {
      // We only want to sort the leaves
      if (cellParams1.rowNode.groupingField === null && cellParams2.rowNode.groupingField === null) {
        return leafColDef.sortComparator(v1, v2, cellParams1, cellParams2);
      }

      return groupingFieldIndexComparator(v1, v2, cellParams1, cellParams2);
    }
  };
};

const getGroupingCriteriaProperties = (groupedByColDef, applyHeaderName) => {
  var _groupedByColDef$filt;

  const properties = {
    sortable: groupedByColDef.sortable,
    filterable: groupedByColDef.filterable,
    sortComparator: (v1, v2, cellParams1, cellParams2) => {
      // We only want to sort the groups of the current grouping criteria
      if (cellParams1.rowNode.groupingField === groupedByColDef.field && cellParams2.rowNode.groupingField === groupedByColDef.field) {
        return groupedByColDef.sortComparator(v1, v2, cellParams1, cellParams2);
      }

      return groupingFieldIndexComparator(v1, v2, cellParams1, cellParams2);
    },
    filterOperators: (_groupedByColDef$filt = groupedByColDef.filterOperators) == null ? void 0 : _groupedByColDef$filt.map(operator => (0, _extends2.default)({}, operator, {
      getApplyFilterFn: (filterItem, column) => {
        const originalFn = operator.getApplyFilterFn(filterItem, column);

        if (!originalFn) {
          return null;
        }

        return params => {
          // We only want to filter the groups of the current grouping criteria
          if (params.rowNode.groupingField !== groupedByColDef.field) {
            return true;
          }

          return originalFn(params);
        };
      }
    }))
  };

  if (applyHeaderName) {
    var _groupedByColDef$head;

    properties.headerName = (_groupedByColDef$head = groupedByColDef.headerName) != null ? _groupedByColDef$head : groupedByColDef.field;
  }

  return properties;
};

/**
 * Creates the `GridColDef` for a grouping column that only takes care of a single grouping criteria
 */
const createGroupingColDefForOneGroupingCriteria = ({
  columnsLookup,
  groupedByColDef,
  groupingCriteria,
  colDefOverride
}) => {
  var _groupedByColDef$widt, _leafColDef$width;

  const _ref = colDefOverride != null ? colDefOverride : {},
        {
    leafField,
    mainGroupingCriteria,
    hideDescendantCount
  } = _ref,
        colDefOverrideProperties = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);

  const leafColDef = leafField ? columnsLookup[leafField] : null; // The properties that do not depend on the presence of a `leafColDef` and that can be overridden by `colDefOverride`

  const commonProperties = {
    width: Math.max(((_groupedByColDef$widt = groupedByColDef.width) != null ? _groupedByColDef$widt : _xDataGrid.GRID_STRING_COL_DEF.width) + 40, (_leafColDef$width = leafColDef == null ? void 0 : leafColDef.width) != null ? _leafColDef$width : 0),
    renderCell: params => {
      // Render leaves
      if (params.rowNode.groupingField == null) {
        if (leafColDef) {
          const leafParams = (0, _extends2.default)({}, params.api.getCellParams(params.id, leafField), {
            api: params.api
          });

          if (leafColDef.renderCell) {
            return leafColDef.renderCell(leafParams);
          }

          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridGroupingColumnLeafCell.GridGroupingColumnLeafCell, (0, _extends2.default)({}, leafParams));
        }

        return '';
      } // Render current grouping criteria groups


      if (params.rowNode.groupingField === groupingCriteria) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridGroupingCriteriaCell.GridGroupingCriteriaCell, (0, _extends2.default)({}, params, {
          hideDescendantCount: hideDescendantCount
        }));
      }

      return '';
    },
    valueGetter: params => {
      if (!params.rowNode) {
        return undefined;
      }

      if (params.rowNode.groupingField == null) {
        if (leafColDef) {
          return params.api.getCellValue(params.id, leafField);
        }

        return undefined;
      }

      if (params.rowNode.groupingField === groupingCriteria) {
        return params.rowNode.groupingKey;
      }

      return undefined;
    }
  }; // If we have a `mainGroupingCriteria` defined and matching the `groupingCriteria`
  // Then we apply the sorting / filtering on the groups of this column's grouping criteria based on the properties of `groupedByColDef`.
  // It can be useful to define a `leafField` for leaves rendering but still use the grouping criteria for the sorting / filtering
  //
  // If we have a `leafField` defined and matching an existing column
  // Then we apply the sorting / filtering on the leaves based on the properties of `leavesColDef`
  //
  // By default, we apply the sorting / filtering on the groups of this column's grouping criteria based on the properties of `groupedColDef`.

  let sourceProperties;

  if (mainGroupingCriteria && mainGroupingCriteria === groupingCriteria) {
    sourceProperties = getGroupingCriteriaProperties(groupedByColDef, true);
  } else if (leafColDef) {
    sourceProperties = getLeafProperties(leafColDef);
  } else {
    sourceProperties = getGroupingCriteriaProperties(groupedByColDef, true);
  } // The properties that can't be overridden with `colDefOverride`


  const forcedProperties = (0, _extends2.default)({
    field: (0, _gridRowGroupingUtils.getRowGroupingFieldFromGroupingCriteria)(groupingCriteria)
  }, GROUPING_COL_DEF_FORCED_PROPERTIES);
  return (0, _extends2.default)({}, GROUPING_COL_DEF_DEFAULT_PROPERTIES, commonProperties, sourceProperties, colDefOverrideProperties, forcedProperties);
};

exports.createGroupingColDefForOneGroupingCriteria = createGroupingColDefForOneGroupingCriteria;

/**
 * Creates the `GridColDef` for a grouping column that takes care of all the grouping criteria
 */
const createGroupingColDefForAllGroupingCriteria = ({
  apiRef,
  columnsLookup,
  rowGroupingModel,
  colDefOverride
}) => {
  var _leafColDef$width2;

  const _ref2 = colDefOverride != null ? colDefOverride : {},
        {
    leafField,
    mainGroupingCriteria,
    hideDescendantCount
  } = _ref2,
        colDefOverrideProperties = (0, _objectWithoutPropertiesLoose2.default)(_ref2, _excluded2);

  const leafColDef = leafField ? columnsLookup[leafField] : null; // The properties that do not depend on the presence of a `leafColDef` and that can be overridden by `colDefOverride`

  const commonProperties = {
    headerName: apiRef.current.getLocaleText('groupingColumnHeaderName'),
    width: Math.max(...rowGroupingModel.map(field => {
      var _columnsLookup$field$;

      return ((_columnsLookup$field$ = columnsLookup[field].width) != null ? _columnsLookup$field$ : _xDataGrid.GRID_STRING_COL_DEF.width) + 40;
    }), (_leafColDef$width2 = leafColDef == null ? void 0 : leafColDef.width) != null ? _leafColDef$width2 : 0),
    renderCell: params => {
      // Render the leaves
      if (params.rowNode.groupingField == null) {
        if (leafColDef) {
          const leafParams = (0, _extends2.default)({}, params.api.getCellParams(params.id, leafField), {
            api: params.api
          });

          if (leafColDef.renderCell) {
            return leafColDef.renderCell(leafParams);
          }

          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridGroupingColumnLeafCell.GridGroupingColumnLeafCell, (0, _extends2.default)({}, leafParams));
        }

        return '';
      } // Render the groups


      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridGroupingCriteriaCell.GridGroupingCriteriaCell, (0, _extends2.default)({}, params, {
        hideDescendantCount: hideDescendantCount
      }));
    },
    valueGetter: params => {
      if (!params.rowNode) {
        return undefined;
      }

      if (params.rowNode.groupingField == null) {
        if (leafColDef) {
          return params.api.getCellValue(params.id, leafField);
        }

        return undefined;
      }

      return params.rowNode.groupingKey;
    }
  }; // If we have a `mainGroupingCriteria` defined and matching one of the `orderedGroupedByFields`
  // Then we apply the sorting / filtering on the groups of this column's grouping criteria based on the properties of `columnsLookup[mainGroupingCriteria]`.
  // It can be useful to use another grouping criteria than the top level one for the sorting / filtering
  //
  // If we have a `leafField` defined and matching an existing column
  // Then we apply the sorting / filtering on the leaves based on the properties of `leavesColDef`
  //
  // By default, we apply the sorting / filtering on the groups of the top level grouping criteria based on the properties of `columnsLookup[orderedGroupedByFields[0]]`.

  let sourceProperties;

  if (mainGroupingCriteria && rowGroupingModel.includes(mainGroupingCriteria)) {
    sourceProperties = getGroupingCriteriaProperties(columnsLookup[mainGroupingCriteria], true);
  } else if (leafColDef) {
    sourceProperties = getLeafProperties(leafColDef);
  } else {
    sourceProperties = getGroupingCriteriaProperties(columnsLookup[rowGroupingModel[0]], rowGroupingModel.length === 1);
  } // The properties that can't be overridden with `colDefOverride`


  const forcedProperties = (0, _extends2.default)({
    field: _gridRowGroupingUtils.GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD
  }, GROUPING_COL_DEF_FORCED_PROPERTIES);
  return (0, _extends2.default)({}, GROUPING_COL_DEF_DEFAULT_PROPERTIES, commonProperties, sourceProperties, colDefOverrideProperties, forcedProperties);
};

exports.createGroupingColDefForAllGroupingCriteria = createGroupingColDefForAllGroupingCriteria;