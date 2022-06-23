"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_CHECKBOX_SELECTION_COL_DEF = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _GridCellCheckboxRenderer = require("../components/columnSelection/GridCellCheckboxRenderer");

var _GridHeaderCheckbox = require("../components/columnSelection/GridHeaderCheckbox");

var _gridSelectionSelector = require("../hooks/features/selection/gridSelectionSelector");

var _gridBooleanColDef = require("./gridBooleanColDef");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GRID_CHECKBOX_SELECTION_COL_DEF = (0, _extends2.default)({}, _gridBooleanColDef.GRID_BOOLEAN_COL_DEF, {
  field: '__check__',
  type: 'checkboxSelection',
  width: 50,
  resizable: false,
  sortable: false,
  filterable: false,
  disableColumnMenu: true,
  disableReorder: true,
  disableExport: true,
  valueGetter: params => {
    const selectionLookup = (0, _gridSelectionSelector.selectedIdsLookupSelector)(params.api.state, params.api.instanceId);
    return selectionLookup[params.id] !== undefined;
  },
  renderHeader: params => /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridHeaderCheckbox.GridHeaderCheckbox, (0, _extends2.default)({}, params)),
  renderCell: params => /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridCellCheckboxRenderer.GridCellCheckboxRenderer, (0, _extends2.default)({}, params))
});
exports.GRID_CHECKBOX_SELECTION_COL_DEF = GRID_CHECKBOX_SELECTION_COL_DEF;