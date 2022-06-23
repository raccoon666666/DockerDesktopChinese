import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { GRID_STRING_COL_DEF } from '@mui/x-data-grid';
import { GridDetailPanelToggleCell } from '../../../components/GridDetailPanelToggleCell';
import { gridDetailPanelExpandedRowIdsSelector } from './gridDetailPanelSelector';
import { jsx as _jsx } from "react/jsx-runtime";
export var GRID_DETAIL_PANEL_TOGGLE_FIELD = '__detail_panel_toggle__';
export var GRID_DETAIL_PANEL_TOGGLE_COL_DEF = _extends({}, GRID_STRING_COL_DEF, {
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
  valueGetter: function valueGetter(params) {
    var expandedRowIds = gridDetailPanelExpandedRowIdsSelector(params.api.state);
    return expandedRowIds.includes(params.id);
  },
  renderCell: function renderCell(params) {
    return /*#__PURE__*/_jsx(GridDetailPanelToggleCell, _extends({}, params));
  }
});