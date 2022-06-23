import { bgBG as bgBGCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var bgBGGrid = {
  // Root
  noRowsLabel: 'Няма редове',
  noResultsOverlayLabel: 'Няма намерени резултати.',
  errorOverlayDefaultLabel: 'Възникна грешка.',
  // Density selector toolbar button text
  toolbarDensity: 'Гъстота',
  toolbarDensityLabel: 'Гъстота',
  toolbarDensityCompact: 'Компактна',
  toolbarDensityStandard: 'Стандартна',
  toolbarDensityComfortable: 'Комфортна',
  // Columns selector toolbar button text
  toolbarColumns: 'Колони',
  toolbarColumnsLabel: 'Покажи селектора на колони',
  // Filters toolbar button text
  toolbarFilters: 'Филтри',
  toolbarFiltersLabel: 'Покажи Филтрите',
  toolbarFiltersTooltipHide: 'Скрий Филтрите',
  toolbarFiltersTooltipShow: 'Покажи Филтрите',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return "".concat(count, " \u0430\u043A\u0442\u0438\u0432\u043D\u0438 \u0444\u0438\u043B\u0442\u0440\u0438");
  },
  // Export selector toolbar button text
  toolbarExport: 'Изтегли',
  toolbarExportLabel: 'Изтегли',
  toolbarExportCSV: 'Изтегли като CSV',
  toolbarExportPrint: 'Принтиране',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Намери колона',
  columnsPanelTextFieldPlaceholder: 'Заглавие на колона',
  columnsPanelDragIconLabel: 'Пренареди на колона',
  columnsPanelShowAllButton: 'Покажи Всички',
  columnsPanelHideAllButton: 'Скрий Всички',
  // Filter panel text
  filterPanelAddFilter: 'Добави Филтър',
  filterPanelDeleteIconLabel: 'Изтрий',
  // filterPanelLinkOperator: 'Logic operator',
  filterPanelOperators: 'Оператори',
  // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'И',
  filterPanelOperatorOr: 'Или',
  filterPanelColumns: 'Колони',
  filterPanelInputLabel: 'Стойност',
  filterPanelInputPlaceholder: 'Стойност на филтъра',
  // Filter operators text
  filterOperatorContains: 'съдържа',
  filterOperatorEquals: 'равно',
  filterOperatorStartsWith: 'започва с',
  filterOperatorEndsWith: 'завършва с',
  filterOperatorIs: 'е',
  filterOperatorNot: 'не е',
  filterOperatorAfter: 'е след',
  filterOperatorOnOrAfter: 'е на или след',
  filterOperatorBefore: 'е преди',
  filterOperatorOnOrBefore: 'е на или преди',
  filterOperatorIsEmpty: 'е празен',
  filterOperatorIsNotEmpty: 'не е празен',
  filterOperatorIsAnyOf: 'е някой от',
  // Filter values text
  filterValueAny: 'всякакви',
  filterValueTrue: 'вярно',
  filterValueFalse: 'невярно',
  // Column menu text
  columnMenuLabel: 'Меню',
  columnMenuShowColumns: 'Покажи колоните',
  columnMenuFilter: 'Филтри',
  columnMenuHideColumn: 'Скрий',
  columnMenuUnsort: 'Отмени сортирането',
  columnMenuSortAsc: 'Сортирай по възходящ ред',
  columnMenuSortDesc: 'Сортирай по низходящ ред',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return "".concat(count, " \u0430\u043A\u0442\u0438\u0432\u043D\u0438 \u0444\u0438\u043B\u0442\u0440\u0438");
  },
  columnHeaderFiltersLabel: 'Покажи Филтрите',
  columnHeaderSortIconLabel: 'Сортирай',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return count !== 1 ? "".concat(count.toLocaleString(), " \u0438\u0437\u0431\u0440\u0430\u043D\u0438 \u0440\u0435\u0434\u043E\u0432\u0435") : "".concat(count.toLocaleString(), " \u0438\u0437\u0431\u0440\u0430\u043D \u0440\u0435\u0434");
  },
  // Total row amount footer text
  footerTotalRows: 'Общо Rедове:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " \u043E\u0442 ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Избор на квадратче',
  checkboxSelectionSelectAllRows: 'Избери всички редове',
  checkboxSelectionUnselectAllRows: 'Отмени избора на всички редове',
  checkboxSelectionSelectRow: 'Избери ред',
  checkboxSelectionUnselectRow: 'Отмени избора на ред',
  // Boolean cell text
  booleanCellTrueLabel: 'да',
  booleanCellFalseLabel: 'не',
  // Actions cell more text
  actionsCellMore: 'още',
  // Column pinning text
  pinToLeft: 'Закачи в ляво',
  pinToRight: 'Закачи в дясно',
  unpin: 'Откачи',
  // Tree Data
  treeDataGroupingHeaderName: 'Група',
  treeDataExpand: 'виж деца',
  treeDataCollapse: 'скрий децата',
  // Grouping columns
  groupingColumnHeaderName: 'Група',
  groupColumn: function groupColumn(name) {
    return "\u0413\u0440\u0443\u043F\u0438\u0440\u0430\u0439 \u043F\u043E ".concat(name);
  },
  unGroupColumn: function unGroupColumn(name) {
    return "\u0421\u043F\u0440\u0438 \u0433\u0440\u0443\u043F\u0438\u0440\u0430\u043D\u0435 \u043F\u043E ".concat(name);
  },
  // Master/detail
  expandDetailPanel: 'Разгъване',
  collapseDetailPanel: 'Свиване'
};
export var bgBG = getGridLocalization(bgBGGrid, bgBGCore);