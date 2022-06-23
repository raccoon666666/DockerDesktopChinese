import { gridColumnDefinitionsSelector, gridVisibleColumnDefinitionsSelector } from '../columns';
export var getColumnsToExport = function getColumnsToExport(_ref) {
  var apiRef = _ref.apiRef,
      options = _ref.options;
  var columns = gridColumnDefinitionsSelector(apiRef);

  if (options.fields) {
    return options.fields.map(function (field) {
      return columns.find(function (column) {
        return column.field === field;
      });
    }).filter(function (column) {
      return !!column;
    });
  }

  var validColumns = options.allColumns ? columns : gridVisibleColumnDefinitionsSelector(apiRef);
  return validColumns.filter(function (column) {
    return !column.disableExport;
  });
};