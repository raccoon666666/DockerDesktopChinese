import { getGridLocalization } from '../utils/getGridLocalization';
var elGRGrid = {
  // Root
  noRowsLabel: 'Δεν υπάρχουν καταχωρήσεις',
  noResultsOverlayLabel: 'Δεν βρέθηκαν αποτελέσματα.',
  errorOverlayDefaultLabel: 'Παρουσιάστηκε απρόβλεπτο σφάλμα.',
  // Density selector toolbar button text
  toolbarDensity: 'Ύψος σειράς',
  toolbarDensityLabel: 'Ύψος σειράς',
  toolbarDensityCompact: 'Συμπαγής',
  toolbarDensityStandard: 'Προκαθορισμένο',
  toolbarDensityComfortable: 'Πλατύ',
  // Columns selector toolbar button text
  toolbarColumns: 'Στήλες',
  toolbarColumnsLabel: 'Επιλέξτε στήλες',
  // Filters toolbar button text
  toolbarFilters: 'Φίλτρα',
  toolbarFiltersLabel: 'Εμφάνιση φίλτρων',
  toolbarFiltersTooltipHide: 'Απόκρυψη φίλτρων',
  toolbarFiltersTooltipShow: 'Εμφάνιση φίλτρων',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " \u03B5\u03BD\u03B5\u03C1\u03B3\u03AC \u03C6\u03AF\u03BB\u03C4\u03C1\u03B1") : "".concat(count, " \u03B5\u03BD\u03B5\u03C1\u03B3\u03CC \u03C6\u03AF\u03BB\u03C4\u03C1\u03BF");
  },
  // Export selector toolbar button text
  toolbarExport: 'Εξαγωγή',
  toolbarExportLabel: 'Εξαγωγή',
  toolbarExportCSV: 'Λήψη ως CSV',
  // toolbarExportPrint: 'Print',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Εύρεση στήλης',
  columnsPanelTextFieldPlaceholder: 'Επικεφαλίδα στήλης',
  columnsPanelDragIconLabel: 'Αναδιάταξη στήλης',
  columnsPanelShowAllButton: 'Προβολή όλων',
  columnsPanelHideAllButton: 'Απόκρυψη όλων',
  // Filter panel text
  filterPanelAddFilter: 'Προσθήκη φίλτρου',
  filterPanelDeleteIconLabel: 'Διαγραφή',
  // filterPanelLinkOperator: 'Logic operator',
  filterPanelOperators: 'Τελεστές',
  // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'Καί',
  filterPanelOperatorOr: 'Ή',
  filterPanelColumns: 'Στήλες',
  filterPanelInputLabel: 'Τιμή',
  filterPanelInputPlaceholder: 'Τιμή φίλτρου',
  // Filter operators text
  filterOperatorContains: 'περιέχει',
  filterOperatorEquals: 'ισούται',
  filterOperatorStartsWith: 'ξεκινάει με',
  filterOperatorEndsWith: 'τελειώνει με',
  filterOperatorIs: 'είναι',
  filterOperatorNot: 'δεν είναι',
  filterOperatorAfter: 'είναι μετά',
  filterOperatorOnOrAfter: 'είναι ίσο ή μετά',
  filterOperatorBefore: 'είναι πριν',
  filterOperatorOnOrBefore: 'είναι ίσο ή πριν',
  filterOperatorIsEmpty: 'είναι κενό',
  filterOperatorIsNotEmpty: 'δεν είναι κενό',
  // filterOperatorIsAnyOf: 'is any of',
  // Filter values text
  // filterValueAny: 'any',
  // filterValueTrue: 'true',
  // filterValueFalse: 'false',
  // Column menu text
  columnMenuLabel: 'Μενού',
  columnMenuShowColumns: 'Εμφάνιση στηλών',
  columnMenuFilter: 'Φίλτρο',
  columnMenuHideColumn: 'Απόκρυψη',
  columnMenuUnsort: 'Απενεργοποίηση ταξινόμησης',
  columnMenuSortAsc: 'Ταξινόμηση σε αύξουσα σειρά',
  columnMenuSortDesc: 'Ταξινόμηση σε φθίνουσα σειρά',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return count !== 1 ? "".concat(count, " \u03B5\u03BD\u03B5\u03C1\u03B3\u03AC \u03C6\u03AF\u03BB\u03C4\u03C1\u03B1") : "".concat(count, " \u03B5\u03BD\u03B5\u03C1\u03B3\u03CC \u03C6\u03AF\u03BB\u03C4\u03C1\u03BF");
  },
  columnHeaderFiltersLabel: 'Εμφάνιση φίλτρων',
  columnHeaderSortIconLabel: 'Ταξινόμηση',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return count !== 1 ? "".concat(count.toLocaleString(), " \u03B5\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03B5\u03C2 \u03B3\u03C1\u03B1\u03BC\u03BC\u03AD\u03C2") : "".concat(count.toLocaleString(), " \u03B5\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03B7 \u03B3\u03C1\u03B1\u03BC\u03BC\u03AE");
  },
  // Total row amount footer text
  footerTotalRows: 'Σύνολο Γραμμών:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " \u03B1\u03C0\u03CC ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  // checkboxSelectionHeaderName: 'Checkbox selection',
  // checkboxSelectionSelectAllRows: 'Select all rows',
  // checkboxSelectionUnselectAllRows: 'Unselect all rows',
  // checkboxSelectionSelectRow: 'Select row',
  // checkboxSelectionUnselectRow: 'Unselect row',
  // Boolean cell text
  // booleanCellTrueLabel: 'yes',
  // booleanCellFalseLabel: 'no',
  // Actions cell more text
  actionsCellMore: 'περισσότερα' // Column pinning text
  // pinToLeft: 'Pin to left',
  // pinToRight: 'Pin to right',
  // unpin: 'Unpin',
  // Tree Data
  // treeDataGroupingHeaderName: 'Group',
  // treeDataExpand: 'see children',
  // treeDataCollapse: 'hide children',
  // Grouping columns
  // groupingColumnHeaderName: 'Group',
  // groupColumn: name => `Group by ${name}`,
  // unGroupColumn: name => `Stop grouping by ${name}`,
  // Master/detail
  // expandDetailPanel: 'Expand',
  // collapseDetailPanel: 'Collapse',

};
export var elGR = getGridLocalization(elGRGrid);