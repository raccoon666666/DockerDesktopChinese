import { GRID_CHECKBOX_SELECTION_COL_DEF } from '../../../../colDef';
import { buildWarning } from '../../../../utils/warning';

var serialiseCellValue = function serialiseCellValue(value, delimiterCharacter) {
  if (typeof value === 'string') {
    var formattedValue = value.replace(/"/g, '""'); // Make sure value containing delimiter or line break won't be split into multiple rows

    if ([delimiterCharacter, '\n', '\r'].some(function (delimiter) {
      return formattedValue.includes(delimiter);
    })) {
      return "\"".concat(formattedValue, "\"");
    }

    return formattedValue;
  }

  return value;
};

var objectFormattedValueWarning = buildWarning(['MUI: When the value of a field is an object or a `renderCell` is provided, the CSV export might not display the value correctly.', 'You can provide a `valueFormatter` with a string representation to be used.']);

var serialiseRow = function serialiseRow(id, columns, getCellParams, delimiterCharacter) {
  return columns.map(function (column) {
    var cellParams = getCellParams(id, column.field);

    if (process.env.NODE_ENV !== 'production') {
      if (String(cellParams.formattedValue) === '[object Object]') {
        objectFormattedValueWarning();
      }
    }

    return serialiseCellValue(cellParams.formattedValue, delimiterCharacter);
  });
};

export function buildCSV(options) {
  var columns = options.columns,
      rowIds = options.rowIds,
      getCellParams = options.getCellParams,
      delimiterCharacter = options.delimiterCharacter,
      includeHeaders = options.includeHeaders;
  var CSVBody = rowIds.reduce(function (acc, id) {
    return "".concat(acc).concat(serialiseRow(id, columns, getCellParams, delimiterCharacter).join(delimiterCharacter), "\r\n");
  }, '').trim();

  if (!includeHeaders) {
    return CSVBody;
  }

  var CSVHead = "".concat(columns.filter(function (column) {
    return column.field !== GRID_CHECKBOX_SELECTION_COL_DEF.field;
  }).map(function (column) {
    return serialiseCellValue(column.headerName || column.field, delimiterCharacter);
  }).join(delimiterCharacter), "\r\n");
  return "".concat(CSVHead).concat(CSVBody).trim();
}