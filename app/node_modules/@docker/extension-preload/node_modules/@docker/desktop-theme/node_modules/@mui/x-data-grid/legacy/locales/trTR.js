import { trTR as trTRCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var trTRGrid = {
  // Root
  noRowsLabel: 'Satır yok',
  noResultsOverlayLabel: 'Sonuç bulunamadı.',
  errorOverlayDefaultLabel: 'Bir hata oluştu.',
  // Density selector toolbar button text
  toolbarDensity: 'Yoğunluk',
  toolbarDensityLabel: 'Yoğunluk',
  toolbarDensityCompact: 'Sıkı',
  toolbarDensityStandard: 'Standart',
  toolbarDensityComfortable: 'Rahat',
  // Columns selector toolbar button text
  toolbarColumns: 'Sütunlar',
  toolbarColumnsLabel: 'Sütun seç',
  // Filters toolbar button text
  toolbarFilters: 'Filtreler',
  toolbarFiltersLabel: 'Filtreleri göster',
  toolbarFiltersTooltipHide: 'Filtreleri gizle',
  toolbarFiltersTooltipShow: 'Filtreleri göster',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return "".concat(count, " aktif filtre");
  },
  // Export selector toolbar button text
  toolbarExport: 'Dışa aktar',
  toolbarExportLabel: 'Dışa aktar',
  toolbarExportCSV: 'CSV olarak aktar',
  toolbarExportPrint: 'Yazdır',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Sütun ara',
  columnsPanelTextFieldPlaceholder: 'Sütun adı',
  columnsPanelDragIconLabel: 'Sütunları yeniden sırala',
  columnsPanelShowAllButton: 'Hepsini göster',
  columnsPanelHideAllButton: 'Hepsini gizle',
  // Filter panel text
  filterPanelAddFilter: 'Filtre Ekle',
  filterPanelDeleteIconLabel: 'Kaldır',
  // filterPanelLinkOperator: 'Logic operator',
  filterPanelOperators: 'Operatör',
  // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'Ve',
  filterPanelOperatorOr: 'Veya',
  filterPanelColumns: 'Sütunlar',
  filterPanelInputLabel: 'Değer',
  filterPanelInputPlaceholder: 'Filtre değeri',
  // Filter operators text
  filterOperatorContains: 'içerir',
  filterOperatorEquals: 'eşittir',
  filterOperatorStartsWith: 'ile başlar',
  filterOperatorEndsWith: 'ile biter',
  filterOperatorIs: 'eşittir',
  filterOperatorNot: 'eşit değildir',
  filterOperatorAfter: 'büyük',
  filterOperatorOnOrAfter: 'büyük eşit',
  filterOperatorBefore: 'küçük',
  filterOperatorOnOrBefore: 'küçük eşit',
  filterOperatorIsEmpty: 'boş',
  filterOperatorIsNotEmpty: 'dolu',
  filterOperatorIsAnyOf: 'herhangi biri',
  // Filter values text
  // filterValueAny: 'any',
  // filterValueTrue: 'true',
  // filterValueFalse: 'false',
  // Column menu text
  columnMenuLabel: 'Menü',
  columnMenuShowColumns: 'Sütunları göster',
  columnMenuFilter: 'Filtre uygula',
  columnMenuHideColumn: 'Gizle',
  columnMenuUnsort: 'Sıralama',
  columnMenuSortAsc: 'Sırala - Artan',
  columnMenuSortDesc: 'Sırala - Azalan',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return "".concat(count, " filtre aktif");
  },
  columnHeaderFiltersLabel: 'Filtreleri göster',
  columnHeaderSortIconLabel: 'Sırala',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return "".concat(count.toLocaleString(), " sat\u0131r se\xE7ildi");
  },
  // Total row amount footer text
  footerTotalRows: 'Toplam Satır:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " / ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Seçim',
  // checkboxSelectionSelectAllRows: 'Select all rows',
  // checkboxSelectionUnselectAllRows: 'Unselect all rows',
  // checkboxSelectionSelectRow: 'Select row',
  // checkboxSelectionUnselectRow: 'Unselect row',
  // Boolean cell text
  // booleanCellTrueLabel: 'yes',
  // booleanCellFalseLabel: 'no',
  // Actions cell more text
  actionsCellMore: 'daha fazla',
  // Column pinning text
  pinToLeft: 'Sola sabitle',
  pinToRight: 'Sağa sabitle',
  unpin: 'Sabitlemeyi kaldır',
  // Tree Data
  treeDataGroupingHeaderName: 'Grup',
  treeDataExpand: 'göster',
  treeDataCollapse: 'gizle',
  // Grouping columns
  groupingColumnHeaderName: 'Grup',
  groupColumn: function groupColumn(name) {
    return "".concat(name, " i\xE7in grupla");
  },
  unGroupColumn: function unGroupColumn(name) {
    return "".concat(name, " i\xE7in gruplamay\u0131 kald\u0131r");
  },
  // Master/detail
  expandDetailPanel: 'Genişlet',
  collapseDetailPanel: 'Gizle'
};
export var trTR = getGridLocalization(trTRGrid, trTRCore);