import { frFR as frFRCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
var frFRGrid = {
  // Root
  noRowsLabel: 'Pas de résultats',
  noResultsOverlayLabel: 'Aucun résultat.',
  errorOverlayDefaultLabel: 'Une erreur est apparue.',
  // Density selector toolbar button text
  toolbarDensity: 'Densité',
  toolbarDensityLabel: 'Densité',
  toolbarDensityCompact: 'Compact',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Confortable',
  // Columns selector toolbar button text
  toolbarColumns: 'Colonnes',
  toolbarColumnsLabel: 'Choisir les colonnes',
  // Filters toolbar button text
  toolbarFilters: 'Filtres',
  toolbarFiltersLabel: 'Afficher les filtres',
  toolbarFiltersTooltipHide: 'Cacher les filtres',
  toolbarFiltersTooltipShow: 'Afficher les filtres',
  toolbarFiltersTooltipActive: function toolbarFiltersTooltipActive(count) {
    return count > 1 ? "".concat(count, " filtres actifs") : "".concat(count, " filtre actif");
  },
  // Export selector toolbar button text
  toolbarExport: 'Exporter',
  toolbarExportLabel: 'Exporter',
  toolbarExportCSV: 'Télécharger en CSV',
  toolbarExportPrint: 'Imprimer',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Chercher colonne',
  columnsPanelTextFieldPlaceholder: 'Titre de la colonne',
  columnsPanelDragIconLabel: 'Réorganiser la colonne',
  columnsPanelShowAllButton: 'Tout afficher',
  columnsPanelHideAllButton: 'Tout cacher',
  // Filter panel text
  filterPanelAddFilter: 'Ajouter un filtre',
  filterPanelDeleteIconLabel: 'Supprimer',
  filterPanelLinkOperator: 'Opérateur logique',
  filterPanelOperators: 'Opérateur',
  // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: 'Et',
  filterPanelOperatorOr: 'Ou',
  filterPanelColumns: 'Colonnes',
  filterPanelInputLabel: 'Valeur',
  filterPanelInputPlaceholder: 'Filtrer la valeur',
  // Filter operators text
  filterOperatorContains: 'contient',
  filterOperatorEquals: 'égal à',
  filterOperatorStartsWith: 'commence par',
  filterOperatorEndsWith: 'se termine par',
  filterOperatorIs: 'est',
  filterOperatorNot: "n'est pas",
  filterOperatorAfter: 'postérieur',
  filterOperatorOnOrAfter: 'égal ou postérieur',
  filterOperatorBefore: 'antérieur',
  filterOperatorOnOrBefore: 'égal ou antérieur',
  filterOperatorIsEmpty: 'est vide',
  filterOperatorIsNotEmpty: "n'est pas vide",
  filterOperatorIsAnyOf: 'fait parti de',
  // Filter values text
  filterValueAny: 'tous',
  filterValueTrue: 'vrai',
  filterValueFalse: 'faux',
  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Afficher les colonnes',
  columnMenuFilter: 'Filtrer',
  columnMenuHideColumn: 'Cacher',
  columnMenuUnsort: 'Annuler le tri',
  columnMenuSortAsc: 'Tri ascendant',
  columnMenuSortDesc: 'Tri descendant',
  // Column header text
  columnHeaderFiltersTooltipActive: function columnHeaderFiltersTooltipActive(count) {
    return count > 1 ? "".concat(count, " filtres actifs") : "".concat(count, " filtre actif");
  },
  columnHeaderFiltersLabel: 'Afficher les filtres',
  columnHeaderSortIconLabel: 'Trier',
  // Rows selected footer text
  footerRowSelected: function footerRowSelected(count) {
    return count > 1 ? "".concat(count.toLocaleString(), " lignes s\xE9lectionn\xE9es") : "".concat(count.toLocaleString(), " ligne s\xE9lectionn\xE9e");
  },
  // Total row amount footer text
  footerTotalRows: 'Lignes totales :',
  // Total visible row amount footer text
  footerTotalVisibleRows: function footerTotalVisibleRows(visibleCount, totalCount) {
    return "".concat(visibleCount.toLocaleString(), " sur ").concat(totalCount.toLocaleString());
  },
  // Checkbox selection text
  checkboxSelectionHeaderName: 'Sélection',
  // checkboxSelectionSelectAllRows: 'Select all rows',
  // checkboxSelectionUnselectAllRows: 'Unselect all rows',
  // checkboxSelectionSelectRow: 'Select row',
  // checkboxSelectionUnselectRow: 'Unselect row',
  // Boolean cell text
  booleanCellTrueLabel: 'vrai',
  booleanCellFalseLabel: 'faux',
  // Actions cell more text
  actionsCellMore: 'Plus',
  // Column pinning text
  pinToLeft: 'Épingler à gauche',
  pinToRight: 'Épingler à droite',
  unpin: 'Désépingler',
  // Tree Data
  treeDataGroupingHeaderName: 'Groupe',
  treeDataExpand: 'afficher les enfants',
  treeDataCollapse: 'masquer les enfants',
  // Grouping columns
  groupingColumnHeaderName: 'Groupe',
  groupColumn: function groupColumn(name) {
    return "Grouper par ".concat(name);
  },
  unGroupColumn: function unGroupColumn(name) {
    return "Arr\xEAter de grouper par ".concat(name);
  } // Master/detail
  // expandDetailPanel: 'Expand',
  // collapseDetailPanel: 'Collapse',

};
export var frFR = getGridLocalization(frFRGrid, frFRCore);