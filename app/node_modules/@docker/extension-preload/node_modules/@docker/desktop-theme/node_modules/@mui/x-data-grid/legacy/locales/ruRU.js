import { ruRU as ruRUCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var ruRUGrid = {
  // Root
  noRowsLabel: 'Нет строк',
  noResultsOverlayLabel: 'Данные не найдены.',
  errorOverlayDefaultLabel: 'Обнаружена ошибка.',
  // Density selector toolbar button text
  toolbarDensity: 'Высота строки',
  toolbarDensityLabel: 'Высота строки',
  toolbarDensityCompact: 'Компактная',
  toolbarDensityStandard: 'Стандартная',
  toolbarDensityComfortable: 'Комфортная',
  // Columns selector toolbar button text
  toolbarColumns: 'Столбцы',
  toolbarColumnsLabel: 'Выделите столбцы',
  // Filters toolbar button text
  toolbarFilters: 'Фильтры',
  toolbarFiltersLabel: 'Показать фильтры',
  toolbarFiltersTooltipHide: 'Скрыть фильтры',
  toolbarFiltersTooltipShow: 'Показать фильтры',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    var pluralForm = 'активных фильтров';
    var lastDigit = count % 10;

    if (lastDigit > 1 && lastDigit < 5) {
      pluralForm = 'активных фильтра';
    } else if (lastDigit === 1) {
      pluralForm = 'активный фильтр';
    }

    return "".concat(count, " ").concat(pluralForm);
  },
  // Export selector toolbar button text
  toolbarExport: 'Экспорт',
  toolbarExportLabel: 'Экспорт',
  toolbarExportCSV: 'Скачать в формате CSV',
  toolbarExportPrint: 'Печать',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Найти столбец',
  columnsPanelTextFieldPlaceholder: 'Заголовок столбца',
  columnsPanelDragIconLabel: 'Изменить порядок столбца',
  columnsPanelShowAllButton: 'Показать все',
  columnsPanelHideAllButton: 'Скрыть все',
  // Filter panel text
  filterPanelAddFilter: 'Добавить фильтр',
  filterPanelDeleteIconLabel: 'Удалить',
  // filterPanelLinkOperator: 'Logic operator',
  filterPanelOperators: 'Операторы',
  // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'И',
  filterPanelOperatorOr: 'Или',
  filterPanelColumns: 'Столбцы',
  filterPanelInputLabel: 'Значение',
  filterPanelInputPlaceholder: 'Значение фильтра',
  // Filter operators text
  filterOperatorContains: 'содержит',
  filterOperatorEquals: 'равен',
  filterOperatorStartsWith: 'начинается с',
  filterOperatorEndsWith: 'заканчивается на',
  filterOperatorIs: 'равен',
  filterOperatorNot: 'не равен',
  filterOperatorAfter: 'больше чем',
  filterOperatorOnOrAfter: 'больше или равно',
  filterOperatorBefore: 'меньше чем',
  filterOperatorOnOrBefore: 'меньше или равно',
  filterOperatorIsEmpty: 'пустой',
  filterOperatorIsNotEmpty: 'не пустой',
  // filterOperatorIsAnyOf: 'is any of',
  // Filter values text
  filterValueAny: 'любой',
  filterValueTrue: 'истина',
  filterValueFalse: 'ложь',
  // Column menu text
  columnMenuLabel: 'Меню',
  columnMenuShowColumns: 'Показать столбцы',
  columnMenuFilter: 'Фильтр',
  columnMenuHideColumn: 'Скрыть',
  columnMenuUnsort: 'Отменить сортировку',
  columnMenuSortAsc: 'Сортировать по возрастанию',
  columnMenuSortDesc: 'Сортировать по убыванию',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    var pluralForm = 'активных фильтров';
    var lastDigit = count % 10;

    if (lastDigit > 1 && lastDigit < 5) {
      pluralForm = 'активных фильтра';
    } else if (lastDigit === 1) {
      pluralForm = 'активный фильтр';
    }

    return "".concat(count, " ").concat(pluralForm);
  },
  columnHeaderFiltersLabel: 'Показать фильтры',
  columnHeaderSortIconLabel: 'Сортировать',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    var pluralForm = 'строк выбрано';
    var lastDigit = count % 10;

    if (lastDigit > 1 && lastDigit < 5) {
      pluralForm = 'строки выбраны';
    } else if (lastDigit === 1) {
      pluralForm = 'строка выбрана';
    }

    return "".concat(count, " ").concat(pluralForm);
  },
  // Total row amount footer text
  footerTotalRows: 'Всего строк:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " \u0438\u0437 ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Выбор флажка',
  // checkboxSelectionSelectAllRows: 'Select all rows',
  // checkboxSelectionUnselectAllRows: 'Unselect all rows',
  // checkboxSelectionSelectRow: 'Select row',
  // checkboxSelectionUnselectRow: 'Unselect row',
  // Boolean cell text
  booleanCellTrueLabel: 'истина',
  booleanCellFalseLabel: 'ложь',
  // Actions cell more text
  actionsCellMore: 'ещё',
  // Column pinning text
  pinToLeft: 'Закрепить слева',
  pinToRight: 'Закрепить справа',
  unpin: 'Открепить',
  // Tree Data
  treeDataGroupingHeaderName: 'Группа',
  treeDataExpand: 'показать дочерние элементы',
  treeDataCollapse: 'скрыть дочерние элементы',
  // Grouping columns
  groupingColumnHeaderName: 'Группа',
  groupColumn: function groupColumn(name) {
    return "\u0421\u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E ".concat(name);
  },
  unGroupColumn: function unGroupColumn(name) {
    return "\u0420\u0430\u0437\u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E ".concat(name);
  } // Master/detail
  // expandDetailPanel: 'Expand',
  // collapseDetailPanel: 'Collapse',

};
export var ruRU = getGridLocalization(ruRUGrid, ruRUCore);