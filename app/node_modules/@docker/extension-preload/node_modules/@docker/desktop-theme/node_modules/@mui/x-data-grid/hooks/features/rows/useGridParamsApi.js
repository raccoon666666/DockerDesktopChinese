import * as React from 'react';
import { getGridCellElement, getGridColumnHeaderElement, getGridRowElement } from '../../../utils/domUtils';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { gridFocusCellSelector, gridTabIndexCellSelector } from '../focus/gridFocusStateSelector';
import { buildWarning } from '../../../utils/warning';
let warnedOnceMissingColumn = false;

function warnMissingColumn(field) {
  console.warn([`MUI: You are calling getValue('${field}') but the column \`${field}\` is not defined.`, `Instead, you can access the data from \`params.row.${field}\`.`].join('\n'));
  warnedOnceMissingColumn = true;
}

const getCellValueWarning = buildWarning([`MUI: You are calling getValue. This method is deprecated and will be removed in the next major version.`, 'Instead, you can access the data from `params.row`.']);
/**
 * @requires useGridColumns (method)
 * @requires useGridRows (method)
 * @requires useGridFocus (state)
 * @requires useGridEditing (method)
 * TODO: Impossible priority - useGridEditing also needs to be after useGridParamsApi
 * TODO: Impossible priority - useGridFocus also needs to be after useGridParamsApi
 */

export function useGridParamsApi(apiRef) {
  const getColumnHeaderParams = React.useCallback(field => ({
    field,
    colDef: apiRef.current.getColumn(field)
  }), [apiRef]);
  /**
   * We want to remove the `getValue` param from `getRowParams`, `getCellParams` and `getBaseCellParams`
   */

  const getCellValueWithDeprecationWarning = React.useCallback((...args) => {
    if (process.env.NODE_ENV !== 'production') {
      getCellValueWarning();
    }

    return apiRef.current.getCellValue(...args);
  }, [apiRef]);
  const getRowParams = React.useCallback(id => {
    const row = apiRef.current.getRow(id);

    if (!row) {
      throw new Error(`No row with id #${id} found`);
    }

    const params = {
      id,
      columns: apiRef.current.getAllColumns(),
      row,
      // TODO v6: remove
      getValue: getCellValueWithDeprecationWarning
    };
    return params;
  }, [apiRef, getCellValueWithDeprecationWarning]);
  const getBaseCellParams = React.useCallback((id, field) => {
    const row = apiRef.current.getRow(id);
    const rowNode = apiRef.current.getRowNode(id);

    if (!row || !rowNode) {
      throw new Error(`No row with id #${id} found`);
    }

    const cellFocus = gridFocusCellSelector(apiRef);
    const cellTabIndex = gridTabIndexCellSelector(apiRef);
    const params = {
      id,
      field,
      row,
      rowNode,
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
  const getCellParams = React.useCallback((id, field) => {
    const colDef = apiRef.current.getColumn(field);
    const value = apiRef.current.getCellValue(id, field);
    const row = apiRef.current.getRow(id);
    const rowNode = apiRef.current.getRowNode(id);

    if (!row || !rowNode) {
      throw new Error(`No row with id #${id} found`);
    }

    const cellFocus = gridFocusCellSelector(apiRef);
    const cellTabIndex = gridTabIndexCellSelector(apiRef);
    const params = {
      id,
      field,
      row,
      rowNode,
      colDef,
      cellMode: apiRef.current.getCellMode(id, field),
      // TODO v6: remove
      getValue: getCellValueWithDeprecationWarning,
      hasFocus: cellFocus !== null && cellFocus.field === field && cellFocus.id === id,
      tabIndex: cellTabIndex && cellTabIndex.field === field && cellTabIndex.id === id ? 0 : -1,
      value,
      formattedValue: value
    };

    if (colDef.valueFormatter) {
      params.formattedValue = colDef.valueFormatter({
        id,
        field: params.field,
        value: params.value,
        api: apiRef.current
      });
    }

    params.isEditable = colDef && apiRef.current.isCellEditable(params);
    return params;
  }, [apiRef, getCellValueWithDeprecationWarning]);
  const getCellValue = React.useCallback((id, field) => {
    const colDef = apiRef.current.getColumn(field);

    if (process.env.NODE_ENV !== 'production') {
      if (!colDef && !warnedOnceMissingColumn) {
        warnMissingColumn(field);
      }
    }

    if (!colDef || !colDef.valueGetter) {
      const rowModel = apiRef.current.getRow(id);

      if (!rowModel) {
        throw new Error(`No row with id #${id} found`);
      }

      return rowModel[field];
    }

    return colDef.valueGetter(getBaseCellParams(id, field));
  }, [apiRef, getBaseCellParams]);
  const getColumnHeaderElement = React.useCallback(field => {
    if (!apiRef.current.rootElementRef.current) {
      return null;
    }

    return getGridColumnHeaderElement(apiRef.current.rootElementRef.current, field);
  }, [apiRef]);
  const getRowElement = React.useCallback(id => {
    if (!apiRef.current.rootElementRef.current) {
      return null;
    }

    return getGridRowElement(apiRef.current.rootElementRef.current, id);
  }, [apiRef]);
  const getCellElement = React.useCallback((id, field) => {
    if (!apiRef.current.rootElementRef.current) {
      return null;
    }

    return getGridCellElement(apiRef.current.rootElementRef.current, {
      id,
      field
    });
  }, [apiRef]);
  const paramsApi = {
    getCellValue,
    getCellParams,
    getCellElement,
    getRowParams,
    getRowElement,
    getColumnHeaderParams,
    getColumnHeaderElement
  };
  useGridApiMethod(apiRef, paramsApi, 'GridParamsApi');
}