import { gridColumnDefinitionsSelector, gridVisibleColumnDefinitionsSelector } from '../columns';
export const getColumnsToExport = ({
  apiRef,
  options
}) => {
  const columns = gridColumnDefinitionsSelector(apiRef);

  if (options.fields) {
    return options.fields.map(field => columns.find(column => column.field === field)).filter(column => !!column);
  }

  const validColumns = options.allColumns ? columns : gridVisibleColumnDefinitionsSelector(apiRef);
  return validColumns.filter(column => !column.disableExport);
};