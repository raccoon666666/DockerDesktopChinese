import { createSelector } from '../../../utils/createSelector';
import { wrapWithWarningOnCall } from '../../../utils/warning';
/**
 * @category Columns
 * @deprecated Use the selector returning exactly the value you are looking for.
 * @ignore - do not document.
 * TODO v6: Rename `gridColumnsStateSelector`
 */

export var gridColumnsSelector = function gridColumnsSelector(state) {
  return state.columns;
};
/**
 * Get the field of each column.
 * @category Columns
 */

export var gridColumnFieldsSelector = createSelector(gridColumnsSelector, function (columnsState) {
  return columnsState.all;
});
/**
 * Get the columns as a lookup (an object containing the field for keys and the definition for values).
 * @category Columns
 */

export var gridColumnLookupSelector = createSelector(gridColumnsSelector, function (columnsState) {
  return columnsState.lookup;
});
/**
 * Get the columns as an array.
 * @category Columns
 */

export var gridColumnDefinitionsSelector = createSelector(gridColumnFieldsSelector, gridColumnLookupSelector, function (allFields, lookup) {
  return allFields.map(function (field) {
    return lookup[field];
  });
});
/**
 * Get the column visibility model, containing the visibility status of each column.
 * If a column is not registered in the model, it is visible.
 * @category Visible Columns
 */

export var gridColumnVisibilityModelSelector = createSelector(gridColumnsSelector, function (columnsState) {
  return columnsState.columnVisibilityModel;
});
/**
 * Get the visible columns as a lookup (an object containing the field for keys and the definition for values).
 * @category Visible Columns
 */

export var gridVisibleColumnDefinitionsSelector = createSelector(gridColumnDefinitionsSelector, gridColumnVisibilityModelSelector, function (columns, columnVisibilityModel) {
  return columns.filter(function (column) {
    return columnVisibilityModel[column.field] !== false;
  });
});
/**
 * Get the field of each visible column.
 * @category Visible Columns
 */

export var gridVisibleColumnFieldsSelector = createSelector(gridVisibleColumnDefinitionsSelector, function (visibleColumns) {
  return visibleColumns.map(function (column) {
    return column.field;
  });
});
/**
 * Get the left position in pixel of each visible columns relative to the left of the first column.
 * @category Visible Columns
 */

export var gridColumnPositionsSelector = createSelector(gridVisibleColumnDefinitionsSelector, function (visibleColumns) {
  var positions = [];
  var currentPosition = 0;

  for (var i = 0; i < visibleColumns.length; i += 1) {
    positions.push(currentPosition);
    currentPosition += visibleColumns[i].computedWidth;
  }

  return positions;
});
/**
 * Get the summed width of all the visible columns.
 * @category Visible Columns
 */

export var gridColumnsTotalWidthSelector = createSelector(gridVisibleColumnDefinitionsSelector, gridColumnPositionsSelector, function (visibleColumns, positions) {
  var colCount = visibleColumns.length;

  if (colCount === 0) {
    return 0;
  }

  return positions[colCount - 1] + visibleColumns[colCount - 1].computedWidth;
});
/**
 * Get the filterable columns as an array.
 * @category Columns
 */

export var gridFilterableColumnDefinitionsSelector = createSelector(gridColumnDefinitionsSelector, function (columns) {
  return columns.filter(function (col) {
    return col.filterable;
  });
});
/**
 * Get the filterable columns as a lookup (an object containing the field for keys and the definition for values).
 * @category Columns
 */

export var gridFilterableColumnLookupSelector = createSelector(gridColumnDefinitionsSelector, function (columns) {
  return columns.reduce(function (acc, col) {
    if (col.filterable) {
      acc[col.field] = col;
    }

    return acc;
  }, {});
});
/**
 * @category Columns
 * @deprecated Use `gridColumnFieldsSelector` instead.
 * @ignore - do not document.
 */

export var allGridColumnsFieldsSelector = wrapWithWarningOnCall(gridColumnFieldsSelector, ['MUI: The method allGridColumnsFieldsSelector is deprecated and will be removed in the next major version.', 'Use gridColumnFieldsSelector instead']);
/**
 * @category Columns
 * @deprecated Use `gridColumnDefinitionsSelector` instead.
 * @ignore - do not document.
 */

export var allGridColumnsSelector = wrapWithWarningOnCall(gridColumnDefinitionsSelector, ['MUI: The method allGridColumnsSelector is deprecated and will be removed in the next major version.', 'Use gridColumnDefinitionsSelector instead']);
/**
 * @category Visible Columns
 * @deprecated Use `gridVisibleColumnDefinitionsSelector` instead.
 * @ignore - do not document.
 */

export var visibleGridColumnsSelector = wrapWithWarningOnCall(gridVisibleColumnDefinitionsSelector, ['MUI: The method visibleGridColumnsSelector is deprecated and will be removed in the next major version.', 'Use gridVisibleColumnDefinitionsSelector instead']);
/**
 * @category Columns
 * @deprecated Use `gridFilterableColumnDefinitionsSelector` instead.
 * @ignore - do not document.
 */

export var filterableGridColumnsSelector = wrapWithWarningOnCall(gridFilterableColumnDefinitionsSelector, ['MUI: The method filterableGridColumnsSelector is deprecated and will be removed in the next major version.', 'Use gridFilterableColumnDefinitionsSelector instead']);
/**
 * @category Columns
 * @deprecated Use `gridFilterableColumnLookupSelector` instead (not the same return format).
 * @ignore - do not document.
 */

export var filterableGridColumnsIdsSelector = wrapWithWarningOnCall(createSelector(gridFilterableColumnDefinitionsSelector, function (columns) {
  return columns.map(function (col) {
    return col.field;
  });
}), ['MUI: The method filterableGridColumnsIdsSelector is deprecated and will be removed in the next major version.', 'Use gridFilterableColumnDefinitionsSelector instead.', 'The return format is now a lookup, if you want to get the same output as before, use the following code:', '', 'const lookup = gridFilterableColumnLookupSelector(apiRef);', 'const fields = gridColumnFieldsSelector(apiRef).filter(field => lookup[field]);']);
/**
 * Get the amount of visible columns.
 * @category Visible Columns
 * @deprecated Use the length of the array returned by `gridVisibleColumnDefinitionsSelector` instead.
 * @ignore - do not document.
 */

export var visibleGridColumnsLengthSelector = wrapWithWarningOnCall(createSelector(gridVisibleColumnDefinitionsSelector, function (visibleColumns) {
  return visibleColumns.length;
}), ['MUI: The method visibleGridColumnsLengthSelector is deprecated and will be removed in the next major version.', 'Use the length of the array returned by gridVisibleColumnDefinitionsSelector instead.']);
/**
 * @category Visible Columns
 * @deprecated Use `gridColumnsTotalWidthSelector` or `gridColumnPositionsSelector` instead.
 * @ignore - do not document.
 */

export var gridColumnsMetaSelector = wrapWithWarningOnCall(createSelector(gridColumnPositionsSelector, gridColumnsTotalWidthSelector, function (positions, totalWidth) {
  return {
    totalWidth: totalWidth,
    positions: positions
  };
}), ['MUI: The method gridColumnsMetaSelector is deprecated and will be removed in the next major version.', 'Use gridColumnsTotalWidthSelector or gridColumnPositionsSelector instead']);