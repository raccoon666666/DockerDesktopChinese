"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_DETAIL_PANEL_TOGGLE_FIELD = exports.GRID_DETAIL_PANEL_TOGGLE_COL_DEF = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _xDataGrid = require("@mui/x-data-grid");

var _GridDetailPanelToggleCell = require("../../../components/GridDetailPanelToggleCell");

var _gridDetailPanelSelector = require("./gridDetailPanelSelector");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GRID_DETAIL_PANEL_TOGGLE_FIELD = '__detail_panel_toggle__';
exports.GRID_DETAIL_PANEL_TOGGLE_FIELD = GRID_DETAIL_PANEL_TOGGLE_FIELD;
const GRID_DETAIL_PANEL_TOGGLE_COL_DEF = (0, _extends2.default)({}, _xDataGrid.GRID_STRING_COL_DEF, {
  field: GRID_DETAIL_PANEL_TOGGLE_FIELD,
  headerName: '',
  type: 'detailPanelToggle',
  editable: false,
  sortable: false,
  filterable: false,
  resizable: false,
  disableColumnMenu: true,
  disableReorder: true,
  disableExport: true,
  align: 'left',
  width: 40,
  valueGetter: params => {
    const expandedRowIds = (0, _gridDetailPanelSelector.gridDetailPanelExpandedRowIdsSelector)(params.api.state);
    return expandedRowIds.includes(params.id);
  },
  renderCell: params => /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridDetailPanelToggleCell.GridDetailPanelToggleCell, (0, _extends2.default)({}, params))
});
exports.GRID_DETAIL_PANEL_TOGGLE_COL_DEF = GRID_DETAIL_PANEL_TOGGLE_COL_DEF;