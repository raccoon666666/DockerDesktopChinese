import * as React from 'react';
import { getGridCellElement, getGridColumnHeaderElement, getGridRowElement } from '../../../utils/domUtils';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { gridFocusCellSelector, gridTabIndexCellSelector } from '../focus/gridFocusStateSelector';
import { buildWarning } from '../../../utils/warning';
var warnedOnceMissingColumn = false;

function warnMissingColumn(field) {
  console.warn(["MUI: You are calling getValue('".concat(field, "') but the column `").concat(field, "` is not defined."), "Instead, you can access the data from `params.row.".concat(field, "`.")].join('\n'));
  warnedOnceMissingColumn = true;
}

var getCellValueWarning = buildWarning(["MUI: You are calling getValue. This method is deprecated and will be removed in the next major version.", 'Instead, you can access the data from `params.row`.']);
/**
 * @requires useGridColumns (method)
 * @requires useGridRows (method)
 * @requires useGridFocus (state)
 * @requires useGridEditing (method)
 * TODO: Impossible priority - useGridEditing also needs to be after useGridParamsApi
 * TODO: Impossible priority - useGridFocus also needs to be after useGridParamsApi
 */

export function useGridParamsApi(apiRef) {
  var getColumnHeaderParams = React.useCallback(function (field) {
    return {
      field: field,
      colDef: apiRef.current.getColumn(field)
    };
  }, [apiRef]);
  /**
   * We want to remove the `getValue` param from `getRowParams`, `getCellParams` and `getBaseCellParams`
   */

  var getCellValueWithDeprecationWarning = React.useCallback(function () {
    var _apiRef$current;

    if (process.env.NODE_ENV !== 'production') {
      getCellValueWarning();
    }

    return (_apiRef$current = apiRef.current).getCellValue.apply(_apiRef$current, arguments);
  }, [apiRef]);
  var getRowParams = React.useCallback(function (id) {
    var row = apiRef.current.getRow(id);

    if (!row) {
      throw new Error("No row with id #".concat(id, " found"));
    }

    var params = {
      id: id,
      columns: apiRef.current.getAllColumns(),
      row: row,
      // TODO v6: remove
      getValue: getCellValueWithDeprecationWarning
    };
    return params;
  }, [apiRef, getCellValueWithDeprecationWarning]);
  var getBaseCellParams = React.useCallback(function (id, field) {
    var row = apiRef.current.getRow(id);
    var rowNode = apiRef.current.getRowNode(id);

    if (!row || !rowNode) {
      throw new Error("No row with id #".concat(id, " found"));
    }

    var cellFocus = gridFocusCellSelector(apiRef);
    var cellTabIndex = gridTabIndexCellSelector(apiRef);
    var params = {
      id: id,
      field: field,
      row: row,
      rowNode: rowNode,
      value: row[field],
      colDef: apiRef.current.getColumn(field),
      cellMode: apiRef.current.getCellMode(id, field),
      // TODO v6: remove
      getValue: getCellValueWithDeprecationWarning,
      api: apiRef.current,
      hasFocus: cellFocus !== null && cellFocus.field === field && cellFocus.id === id,
      tabIndex: cellTabIndex && cellTabIndex.field === field && cellTabIndex.id === id ? 0 : -1
    };
    return params;
  }, [apiRef, getCellValueWithDeprecationWarning]);
  var getCellParams = React.useCallback(function (id, field) {
    var colDef = apiRef.current.getColumn(field);
    var value = apiRef.current.getCellValue(id, field);
    var row = apiRef.current.getRow(id);
    var rowNode = apiRef.current.getRowNode(id);

    if (!row || !rowNode) {
      throw new Error("No row with id #".concat(id, " found"));
    }

    var cellFocus = gridFocusCellSelector(apiRef);
    var cellTabIndex = gridTabIndexCellSelector(apiRef);
    var params = {
      id: id,
      field: field,
      row: row,
      rowNode: rowNode,
      colDef: colDef,
      cellMode: apiRef.current.getCellMode(id, field),
      // TODO v6: remove
      getValue: getCellValueWithDeprecationWarning,
      hasFocus: cellFocus !== null && cellFocus.field === field && cellFocus.id === id,
      tabIndex: cellTabIndex && cellTabIndex.field === field && cellTabIndex.id === id ? 0 : -1,
      value: value,
      formattedValue: value
    };

    if (colDef.valueFormatter) {
      params.formattedValue = colDef.valueFormatter({
        id: id,
        field: params.field,
        value: params.value,
        api: apiRef.current
      });
    }

    params.isEditable = colDef && apiRef.current.isCellEditable(params);
    return params;
  }, [apiRef, getCellValueWithDeprecationWarning]);
  var getCellValue = React.useCallback(function (id, field) {
    var colDef = apiRef.current.getColumn(field);

    if (process.env.NODE_ENV !== 'production') {
      if (!colDef && !warnedOnceMissingColumn) {
        warnMissingColumn(field);
      }
    }

    if (!colDef || !colDef.valueGetter) {
      var rowModel = apiRef.current.getRow(id);

      if (!rowModel) {
        throw new Error("No row with id #".concat(id, " found"));
      }

      return rowModel[field];
    }

    return colDef.valueGetter(getBaseCellParams(id, field));
  }, [apiRef, getBaseCellParams]);
  var getColumnHeaderElement = React.useCallback(function (field) {
    if (!apiRef.current.rootElementRef.current) {
      return null;
    }

    return getGridColumnHeaderElement(apiRef.current.rootElementRef.current, field);
  }, [apiRef]);
  var getRowElement = React.useCallback(function (id) {
    if (!apiRef.current.rootElementRef.current) {
      return null;
    }

    return getGridRowElement(apiRef.current.rootElementRef.current, id);
  }, [apiRef]);
  var getCellElement = React.useCallback(function (id, field) {
    if (!apiRef.current.rootElementRef.current) {
      return null;
    }

    return getGridCellElement(apiRef.current.rootElementRef.current, {
      id: id,
      field: field
    });
  }, [apiRef]);
  var paramsApi = {
    getCellValue: getCellValue,
    getCellParams: getCellParams,
    getCellElement: getCellElement,
    getRowParams: getRowParams,
    getRowElement: getRowElement,
    getColumnHeaderParams: getColumnHeaderParams,
    getColumnHeaderElement: getColumnHeaderElement
  };
  useGridApiMethod(apiRef, paramsApi, 'GridParamsApi');
}