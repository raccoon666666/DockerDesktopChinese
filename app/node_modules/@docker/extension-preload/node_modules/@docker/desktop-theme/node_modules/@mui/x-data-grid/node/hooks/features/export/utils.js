"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumnsToExport = void 0;

var _columns = require("../columns");

const getColumnsToExport = ({
  apiRef,
  options
}) => {
  const columns = (0, _columns.gridColumnDefinitionsSelector)(apiRef);

  if (options.fields) {
    return options.fields.map(field => columns.find(column => column.field === field)).filter(column => !!column);
  }

  const validColumns = options.allColumns ? columns : (0, _columns.gridVisibleColumnDefinitionsSelector)(apiRef);
  return validColumns.filter(column => !column.disableExport);
};

exports.getColumnsToExport = getColumnsToExport;