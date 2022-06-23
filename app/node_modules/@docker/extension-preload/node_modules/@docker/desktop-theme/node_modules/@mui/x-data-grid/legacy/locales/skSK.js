import { skSK as skSKCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var skSKGrid = {
  // Root
  noRowsLabel: 'Žiadne záznamy',
  noResultsOverlayLabel: 'Nenašli sa žadne výsledky.',
  errorOverlayDefaultLabel: 'Stala sa nepredvídaná chyba.',
  // Density selector toolbar button text
  toolbarDensity: 'Hustota',
  toolbarDensityLabel: 'Hustota',
  toolbarDensityCompact: 'Kompaktná',
  toolbarDensityStandard: 'Štandartná',
  toolbarDensityComfortable: 'Komfortná',
  // Columns selector toolbar button text
  toolbarColumns: 'Stĺpce',
  toolbarColumnsLabel: 'Vybrať stĺpce',
  // Filters toolbar button text
  toolbarFilters: 'Filtre',
  toolbarFiltersLabel: 'Zobraziť filtre',
  toolbarFiltersTooltipHide: 'Skryť filtre ',
  toolbarFiltersTooltipShow: 'Zobraziť filtre',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    var pluralForm = 'aktívnych filtrov';

    if (count > 1 && count < 5) {
      pluralForm = 'aktívne filtre';
    } else if (count === 1) {
      pluralForm = 'aktívny filter';
    }

    return "".concat(count, " ").concat(pluralForm);
  },
  // Export selector toolbar button text
  toolbarExport: 'Export',
  toolbarExportLabel: 'Export',
  toolbarExportCSV: 'Stiahnuť ako CSV',
  toolbarExportPrint: 'Vytlačiť',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Nájsť stĺpec',
  columnsPanelTextFieldPlaceholder: 'Názov stĺpca',
  columnsPanelDragIconLabel: 'Usporiadť stĺpce',
  columnsPanelShowAllButton: 'Zobraziť všetko',
  columnsPanelHideAllButton: 'Skryť všetko',
  // Filter panel text
  filterPanelAddFilter: 'Pridať filter',
  filterPanelDeleteIconLabel: 'Odstrániť',
  // filterPanelLinkOperator: 'Logic operator',
  filterPanelOperators: 'Operátory',
  // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'A',
  filterPanelOperatorOr: 'Alebo',
  filterPanelColumns: 'Stĺpce',
  filterPanelInputLabel: 'Hodnota',
  filterPanelInputPlaceholder: 'Hodnota filtra',
  // Filter operators text
  filterOperatorContains: 'obsahuje',
  filterOperatorEquals: 'rovná sa',
  filterOperatorStartsWith: 'začína s',
  filterOperatorEndsWith: 'končí na',
  filterOperatorIs: 'je',
  filterOperatorNot: 'nie je',
  filterOperatorAfter: 'je po',
  filterOperatorOnOrAfter: 'je na alebo po',
  filterOperatorBefore: 'je pred',
  filterOperatorOnOrBefore: 'je na alebo skôr',
  filterOperatorIsEmpty: 'je prázdny',
  filterOperatorIsNotEmpty: 'nie je prázdny',
  // filterOperatorIsAnyOf: 'is any of',
  // Filter values text
  filterValueAny: 'akýkoľvek',
  filterValueTrue: 'áno',
  filterValueFalse: 'nie',
  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Zobraziť stĺpce',
  columnMenuFilter: 'Filter',
  columnMenuHideColumn: 'Skryť',
  columnMenuUnsort: 'Zrušiť filtre',
  columnMenuSortAsc: 'Zoradiť vzostupne',
  columnMenuSortDesc: 'Zoradiť zostupne',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    var pluralForm = 'aktívnych filtrov';

    if (count > 1 && count < 5) {
      pluralForm = 'aktívne filtre';
    } else if (count === 1) {
      pluralForm = 'aktívny filter';
    }

    return "".concat(count, " ").concat(pluralForm);
  },
  columnHeaderFiltersLabel: 'Zobraziť filtre',
  columnHeaderSortIconLabel: 'Filtrovať',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    var pluralForm = 'vybraných záznamov';

    if (count > 1 && count < 5) {
      pluralForm = 'vybrané záznamy';
    } else if (count === 1) {
      pluralForm = 'vybraný záznam';
    }

    return "".concat(count, " ").concat(pluralForm);
  },
  // Total row amount footer text
  footerTotalRows: 'Riadkov spolu:',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    var str = totalCount.toString();
    var firstDigit = str[0];
    var op = ['4', '6', '7'].includes(firstDigit) || firstDigit === '1' && str.length % 3 === 0 ? 'zo' : 'z';
    return "".concat(visibleCount.toLocaleString(), " ").concat(op, " ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Výber riadku',
  // checkboxSelectionSelectAllRows: 'Select all rows',
  // checkboxSelectionUnselectAllRows: 'Unselect all rows',
  // checkboxSelectionSelectRow: 'Select row',
  // checkboxSelectionUnselectRow: 'Unselect row',
  // Boolean cell text
  booleanCellTrueLabel: 'áno',
  booleanCellFalseLabel: 'nie',
  // Actions cell more text
  actionsCellMore: 'viac',
  // Column pinning text
  pinToLeft: 'Pripnúť na ľavo',
  pinToRight: 'Pripnúť na pravo',
  unpin: 'Odopnúť',
  // Tree Data
  treeDataGroupingHeaderName: 'Skupina',
  treeDataExpand: 'zobraziť potomkov',
  treeDataCollapse: 'skryť potomkov',
  // Grouping columns
  groupingColumnHeaderName: 'Skupina',
  groupColumn: function groupColumn(name) {
    return "Zoskupi\u0165 pod\u013Ea ".concat(name);
  },
  unGroupColumn: function unGroupColumn(name) {
    return "Presta\u0165 zoskupova\u0165 pod\u013Ea ".concat(name);
  } // Master/detail
  // expandDetailPanel: 'Expand',
  // collapseDetailPanel: 'Collapse',

};
export var skSK = getGridLocalization(skSKGrid, skSKCore);