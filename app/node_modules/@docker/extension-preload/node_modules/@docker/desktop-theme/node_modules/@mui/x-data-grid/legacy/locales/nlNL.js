import { nlNL as nlNLCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var nlNLGrid = {
  // Root
  noRowsLabel: 'Geen resultaten.',
  noResultsOverlayLabel: 'Geen resultaten gevonden.',
  errorOverlayDefaultLabel: 'Er deed zich een fout voor.',
  // Density selector toolbar button text
  toolbarDensity: 'Grootte',
  toolbarDensityLabel: 'Grootte',
  toolbarDensityCompact: 'Compact',
  toolbarDensityStandard: 'Normaal',
  toolbarDensityComfortable: 'Breed',
  // Columns selector toolbar button text
  toolbarColumns: 'Kolommen',
  toolbarColumnsLabel: 'Kies kolommen',
  // Filters toolbar button text
  toolbarFilters: 'Filters',
  toolbarFiltersLabel: 'Toon filters',
  toolbarFiltersTooltipHide: 'Verberg filters',
  toolbarFiltersTooltipShow: 'Toon filters',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return count > 1 ? "".concat(count, " actieve filters") : "".concat(count, " filter actief");
  },
  // Export selector toolbar button text
  toolbarExport: 'Exporteren',
  toolbarExportLabel: 'Exporteren',
  toolbarExportCSV: 'Exporteer naar CSV',
  toolbarExportPrint: 'Print',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Zoek kolom',
  columnsPanelTextFieldPlaceholder: 'Kolomtitel',
  columnsPanelDragIconLabel: 'Kolom herschikken',
  columnsPanelShowAllButton: 'Alles tonen',
  columnsPanelHideAllButton: 'Alles verbergen',
  // Filter panel text
  filterPanelAddFilter: 'Filter toevoegen',
  filterPanelDeleteIconLabel: 'Verwijderen',
  // filterPanelLinkOperator: 'Logic operator',
  filterPanelOperators: 'Operatoren',
  // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'En',
  filterPanelOperatorOr: 'Of',
  filterPanelColumns: 'Kolommen',
  filterPanelInputLabel: 'Waarde',
  filterPanelInputPlaceholder: 'Filter waarde',
  // Filter operators text
  filterOperatorContains: 'bevat',
  filterOperatorEquals: 'gelijk aan',
  filterOperatorStartsWith: 'begint met',
  filterOperatorEndsWith: 'eindigt met',
  filterOperatorIs: 'is',
  filterOperatorNot: 'is niet',
  filterOperatorAfter: 'is na',
  filterOperatorOnOrAfter: 'is gelijk of er na',
  filterOperatorBefore: 'is voor',
  filterOperatorOnOrBefore: 'is gelijk of er voor',
  filterOperatorIsEmpty: 'is leeg',
  filterOperatorIsNotEmpty: 'is niet leeg',
  // filterOperatorIsAnyOf: 'is any of',
  // Filter values text
  filterValueAny: 'alles',
  filterValueTrue: 'waar',
  filterValueFalse: 'onwaar',
  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Toon kolommen',
  columnMenuFilter: 'Filteren',
  columnMenuHideColumn: 'Verbergen',
  columnMenuUnsort: 'Annuleer sortering',
  columnMenuSortAsc: 'Oplopend sorteren',
  columnMenuSortDesc: 'Aflopend sorteren',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return count > 1 ? "".concat(count, " actieve filters") : "".concat(count, " filter actief");
  },
  columnHeaderFiltersLabel: 'Toon filters',
  columnHeaderSortIconLabel: 'Sorteren',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return count > 1 ? "".concat(count.toLocaleString(), " rijen geselecteerd") : "".concat(count.toLocaleString(), " rij geselecteerd");
  },
  // Total row amount footer text
  footerTotalRows: 'Totaal:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " van ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Checkbox selectie',
  // checkboxSelectionSelectAllRows: 'Select all rows',
  // checkboxSelectionUnselectAllRows: 'Unselect all rows',
  // checkboxSelectionSelectRow: 'Select row',
  // checkboxSelectionUnselectRow: 'Unselect row',
  // Boolean cell text
  booleanCellTrueLabel: 'waar',
  booleanCellFalseLabel: 'onwaar',
  // Actions cell more text
  actionsCellMore: 'meer',
  // Column pinning text
  pinToLeft: 'Links vastzetten',
  pinToRight: 'Rechts vastzetten',
  unpin: 'Losmaken',
  // Tree Data
  treeDataGroupingHeaderName: 'Groep',
  treeDataExpand: 'Uitvouwen',
  treeDataCollapse: 'Inklappen',
  // Grouping columns
  groupingColumnHeaderName: 'Groep',
  groupColumn: function groupColumn(name) {
    return "Groepeer op ".concat(name);
  },
  unGroupColumn: function unGroupColumn(name) {
    return "Stop groeperen op ".concat(name);
  } // Master/detail
  // expandDetailPanel: 'Expand',
  // collapseDetailPanel: 'Collapse',

};
export var nlNL = getGridLocalization(nlNLGrid, nlNLCore);