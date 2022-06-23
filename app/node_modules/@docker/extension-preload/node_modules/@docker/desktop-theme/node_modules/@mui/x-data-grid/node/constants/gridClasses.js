"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataGridUtilityClass = getDataGridUtilityClass;
exports.gridClasses = void 0;

var _material = require("@mui/material");

function getDataGridUtilityClass(slot) {
  return (0, _material.generateUtilityClass)('MuiDataGrid', slot);
}

const gridClasses = (0, _material.generateUtilityClasses)('MuiDataGrid', ['actionsCell', 'autoHeight', 'booleanCell', 'cell--editable', 'cell--editing', 'cell--textCenter', 'cell--textLeft', 'cell--textRight', 'cell--withRenderer', 'cell', 'cellContent', 'cellCheckbox', 'checkboxInput', 'columnHeader--alignCenter', 'columnHeader--alignLeft', 'columnHeader--alignRight', 'columnHeader--dragging', 'columnHeader--moving', 'columnHeader--numeric', 'columnHeader--sortable', 'columnHeader--sorted', 'columnHeader--filtered', 'columnHeader', 'columnHeaderCheckbox', 'columnHeaderDraggableContainer', 'columnHeaderDropZone', 'columnHeaderTitle', 'columnHeaderTitleContainer', 'columnHeaderTitleContainerContent', 'columnHeaders', 'columnHeadersInner', 'columnHeadersInner--scrollable', 'columnSeparator--resizable', 'columnSeparator--resizing', 'columnSeparator--sideLeft', 'columnSeparator--sideRight', 'columnSeparator', 'columnsPanel', 'columnsPanelRow', 'detailPanel', 'detailPanels', 'detailPanelToggleCell', 'detailPanelToggleCell--expanded', 'panel', 'panelHeader', 'panelWrapper', 'panelContent', 'panelFooter', 'paper', 'editBooleanCell', 'editInputCell', 'filterForm', 'filterFormDeleteIcon', 'filterFormLinkOperatorInput', 'filterFormColumnInput', 'filterFormOperatorInput', 'filterFormValueInput', 'filterIcon', 'footerContainer', 'iconButtonContainer', 'iconSeparator', 'main', 'menu', 'menuIcon', 'menuIconButton', 'menuOpen', 'menuList', 'overlay', 'root', 'row--editable', 'row--editing', 'row', 'row--lastVisible', 'rowCount', 'scrollArea--left', 'scrollArea--right', 'scrollArea', 'selectedRowCount', 'sortIcon', 'toolbarContainer', 'toolbarFilterList', 'virtualScroller', 'virtualScrollerContent', 'virtualScrollerContent--overflowed', 'virtualScrollerRenderZone', 'pinnedColumns', 'pinnedColumns--left', 'pinnedColumns--right', 'pinnedColumnHeaders', 'pinnedColumnHeaders--left', 'pinnedColumnHeaders--right', 'withBorder', 'treeDataGroupingCell', 'treeDataGroupingCellToggle', 'groupingCriteriaCell', 'groupingCriteriaCellToggle']);
exports.gridClasses = gridClasses;