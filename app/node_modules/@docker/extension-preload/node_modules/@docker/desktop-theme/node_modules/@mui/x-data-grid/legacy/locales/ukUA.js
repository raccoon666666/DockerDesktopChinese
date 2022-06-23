import { ukUA as ukUACore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';

var getPluralForm = function getPluralForm(count, options) {
  var pluralForm = options.many;
  var lastDigit = count % 10;

  if (lastDigit > 1 && lastDigit < 5) {
    pluralForm = options.few;
  } else if (lastDigit === 1) {
    pluralForm = options.one;
  }

  return "".concat(count, " ").concat(pluralForm);
};

var ukUAGrid = {
  // Root
  noRowsLabel: 'Немає рядків',
  noResultsOverlayLabel: 'Дані не знайдено.',
  errorOverlayDefaultLabel: 'Виявлено помилку.',
  // Density selector toolbar button text
  toolbarDensity: 'Висота рядка',
  toolbarDensityLabel: 'Висота рядка',
  toolbarDensityCompact: 'Компактний',
  toolbarDensityStandard: 'Стандартний',
  toolbarDensityComfortable: 'Комфортний',
  // Columns selector toolbar button text
  toolbarColumns: 'Стовпці',
  toolbarColumnsLabel: 'Виділіть стовпці',
  // Filters toolbar button text
  toolbarFilters: 'Фільтри',
  toolbarFiltersLabel: 'Показати фільтри',
  toolbarFiltersTooltipHide: 'Приховати фільтри',
  toolbarFiltersTooltipShow: 'Показати фільтри',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return getPluralForm(count, {
      one: 'активний фільтр',
      few: 'активні фільтри',
      many: 'активних фільтрів'
    });
  },
  // Export selector toolbar button text
  toolbarExport: 'Експорт',
  toolbarExportLabel: 'Експорт',
  toolbarExportCSV: 'Завантажити у форматі CSV',
  toolbarExportPrint: 'Друк',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Знайти стовпець',
  columnsPanelTextFieldPlaceholder: 'Заголовок стовпця',
  columnsPanelDragIconLabel: 'Змінити порядок стовпця',
  columnsPanelShowAllButton: 'Показати всі',
  columnsPanelHideAllButton: 'Приховати всі',
  // Filter panel text
  filterPanelAddFilter: 'Додати фільтр',
  filterPanelDeleteIconLabel: 'Видалити',
  // filterPanelLinkOperator: 'Logic operator',
  filterPanelOperators: 'Оператори',
  // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'І',
  filterPanelOperatorOr: 'Або',
  filterPanelColumns: 'Стовпці',
  filterPanelInputLabel: 'Значення',
  filterPanelInputPlaceholder: 'Значення фільтра',
  // Filter operators text
  filterOperatorContains: 'містить',
  filterOperatorEquals: 'дорівнює',
  filterOperatorStartsWith: 'починається з',
  filterOperatorEndsWith: 'закінчується на',
  filterOperatorIs: 'дорівнює',
  filterOperatorNot: 'не дорівнює',
  filterOperatorAfter: 'більше ніж',
  filterOperatorOnOrAfter: 'більше або дорівнює',
  filterOperatorBefore: 'менше ніж',
  filterOperatorOnOrBefore: 'менше або дорівнює',
  filterOperatorIsEmpty: 'порожній',
  filterOperatorIsNotEmpty: 'не порожній',
  // filterOperatorIsAnyOf: 'is any of',
  // Filter values text
  filterValueAny: 'будь-який',
  filterValueTrue: 'так',
  filterValueFalse: 'ні',
  // Column menu text
  columnMenuLabel: 'Меню',
  columnMenuShowColumns: 'Показати стовпці',
  columnMenuFilter: 'Фільтр',
  columnMenuHideColumn: 'Приховати',
  columnMenuUnsort: 'Скасувати сортування',
  columnMenuSortAsc: 'Сортувати за зростанням',
  columnMenuSortDesc: 'Сортувати за спаданням',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return getPluralForm(count, {
      one: 'активний фільтр',
      few: 'активні фільтри',
      many: 'активних фільтрів'
    });
  },
  columnHeaderFiltersLabel: 'Показати фільтри',
  columnHeaderSortIconLabel: 'Сортувати',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return getPluralForm(count, {
      one: 'вибраний рядок',
      few: 'вибрані рядки',
      many: 'вибраних рядків'
    });
  },
  // Total row amount footer text
  footerTotalRows: 'Усього рядків:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " \u0437 ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Вибір прапорця',
  // checkboxSelectionSelectAllRows: 'Select all rows',
  // checkboxSelectionUnselectAllRows: 'Unselect all rows',
  // checkboxSelectionSelectRow: 'Select row',
  // checkboxSelectionUnselectRow: 'Unselect row',
  // Boolean cell text
  booleanCellTrueLabel: 'так',
  booleanCellFalseLabel: 'ні',
  // Actions cell more text
  actionsCellMore: 'більше',
  // Column pinning text
  pinToLeft: 'Закріпити ліворуч',
  pinToRight: 'Закріпити праворуч',
  unpin: 'Відкріпити',
  // Tree Data
  treeDataGroupingHeaderName: 'Група',
  treeDataExpand: 'показати дочірні елементи',
  treeDataCollapse: 'приховати дочірні елементи' // Grouping columns
  // groupingColumnHeaderName: 'Group',
  // groupColumn: name => `Group by ${name}`,
  // unGroupColumn: name => `Stop grouping by ${name}`,
  // Master/detail
  // expandDetailPanel: 'Expand',
  // collapseDetailPanel: 'Collapse',

};
export var ukUA = getGridLocalization(ukUAGrid, ukUACore);