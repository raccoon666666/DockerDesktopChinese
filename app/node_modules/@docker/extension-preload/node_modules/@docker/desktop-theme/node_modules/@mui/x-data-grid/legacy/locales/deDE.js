import { deDE as deDECore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var deDEGrid = {
  // Root
  noRowsLabel: 'Keine Einträge',
  noResultsOverlayLabel: 'Keine Ergebnisse gefunden.',
  errorOverlayDefaultLabel: 'Ein unerwarteter Fehler ist aufgetreten.',
  // Density selector toolbar button text
  toolbarDensity: 'Zeilenhöhe',
  toolbarDensityLabel: 'Zeilenhöhe',
  toolbarDensityCompact: 'Kompakt',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Breit',
  // Columns selector toolbar button text
  toolbarColumns: 'Spalten',
  toolbarColumnsLabel: 'Zeige Spaltenauswahl',
  // Filters toolbar button text
  toolbarFilters: 'Filter',
  toolbarFiltersLabel: 'Zeige Filter',
  toolbarFiltersTooltipHide: 'Verberge Filter',
  toolbarFiltersTooltipShow: 'Zeige Filter',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " aktive Filter") : "".concat(count, " aktiver Filter");
  },
  // Export selector toolbar button text
  toolbarExport: 'Exportieren',
  toolbarExportLabel: 'Exportieren',
  toolbarExportCSV: 'Download als CSV',
  toolbarExportPrint: 'Drucken',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Finde Spalte',
  columnsPanelTextFieldPlaceholder: 'Spaltenüberschrift',
  columnsPanelDragIconLabel: 'Spalte umsortieren',
  columnsPanelShowAllButton: 'Zeige alle',
  columnsPanelHideAllButton: 'Verberge alle',
  // Filter panel text
  filterPanelAddFilter: 'Filter hinzufügen',
  filterPanelDeleteIconLabel: 'Löschen',
  // filterPanelLinkOperator: 'Logic operator',
  filterPanelOperators: 'Operatoren',
  // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'Und',
  filterPanelOperatorOr: 'Oder',
  filterPanelColumns: 'Spalten',
  filterPanelInputLabel: 'Wert',
  filterPanelInputPlaceholder: 'Wert filtern',
  // Filter operators text
  filterOperatorContains: 'enthält',
  filterOperatorEquals: 'ist gleich',
  filterOperatorStartsWith: 'beginnt mit',
  filterOperatorEndsWith: 'endet mit',
  filterOperatorIs: 'ist',
  filterOperatorNot: 'ist nicht',
  filterOperatorAfter: 'ist nach',
  filterOperatorOnOrAfter: 'ist am oder nach',
  filterOperatorBefore: 'ist vor',
  filterOperatorOnOrBefore: 'ist am oder vor',
  filterOperatorIsEmpty: 'ist leer',
  filterOperatorIsNotEmpty: 'ist nicht leer',
  // filterOperatorIsAnyOf: 'is any of',
  // Filter values text
  filterValueAny: 'Beliebig',
  filterValueTrue: 'Ja',
  filterValueFalse: 'Nein',
  // Column menu text
  columnMenuLabel: 'Menü',
  columnMenuShowColumns: 'Zeige alle Spalten',
  columnMenuFilter: 'Filter',
  columnMenuHideColumn: 'Verbergen',
  columnMenuUnsort: 'Sortierung deaktivieren',
  columnMenuSortAsc: 'Sortiere aufsteigend',
  columnMenuSortDesc: 'Sortiere absteigend',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " aktive Filter") : "".concat(count, " aktiver Filter");
  },
  columnHeaderFiltersLabel: 'Zeige Filter',
  columnHeaderSortIconLabel: 'Sortieren',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return count !== 1 ? "".concat(count.toLocaleString(), " Eintr\xE4ge ausgew\xE4hlt") : "".concat(count.toLocaleString(), " Eintrag ausgew\xE4hlt");
  },
  // Total row amount footer text
  footerTotalRows: 'Gesamt:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " von ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Checkbox Auswahl',
  checkboxSelectionSelectAllRows: 'Alle Zeilen auswählen',
  checkboxSelectionUnselectAllRows: 'Alle Zeilen abwählen',
  checkboxSelectionSelectRow: 'Zeile auswählen',
  checkboxSelectionUnselectRow: 'Zeile abwählen',
  // Boolean cell text
  booleanCellTrueLabel: 'Ja',
  booleanCellFalseLabel: 'Nein',
  // Actions cell more text
  actionsCellMore: 'Mehr',
  // Column pinning text
  pinToLeft: 'Links anheften',
  pinToRight: 'Rechts anheften',
  unpin: 'Loslösen',
  // Tree Data
  treeDataGroupingHeaderName: 'Gruppe',
  treeDataExpand: 'Kinder einblenden',
  treeDataCollapse: 'Kinder ausblenden',
  // Grouping columns
  groupingColumnHeaderName: 'Gruppierung',
  groupColumn: function groupColumn(name) {
    return "Gruppieren nach ".concat(name);
  },
  unGroupColumn: function unGroupColumn(name) {
    return "Gruppierung nach ".concat(name, " aufheben");
  },
  // Master/detail
  expandDetailPanel: 'Aufklappen',
  collapseDetailPanel: 'Zuklappen'
};
export var deDE = getGridLocalization(deDEGrid, deDECore);