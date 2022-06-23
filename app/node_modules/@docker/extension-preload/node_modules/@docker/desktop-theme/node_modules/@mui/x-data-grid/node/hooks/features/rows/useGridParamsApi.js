"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridParamsApi = useGridParamsApi;

var React = _interopRequireWildcard(require("react"));

var _domUtils = require("../../../utils/domUtils");

var _useGridApiMethod = require("../../utils/useGridApiMethod");

var _gridFocusStateSelector = require("../focus/gridFocusStateSelector");

var _warning = require("../../../utils/warning");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let warnedOnceMissingColumn = false;

function warnMissingColumn(field) {
  console.warn([`MUI: You are calling getValue('${field}') but the column \`${field}\` is not defined.`, `Instead, you can access the data from \`params.row.${field}\`.`].join('\n'));
  warnedOnceMissingColumn = true;
}

const getCellValueWarning = (0, _warning.buildWarning)([`MUI: You are calling getValue. This method is deprecated and will be removed in the next major version.`, 'Instead, you can access the data from `params.row`.']);
/**
 * @requires useGridColumns (method)
 * @requires useGridRows (method)
 * @requires useGridFocus (state)
 * @requires useGridEditing (method)
 * TODO: Impossible priority - useGridEditing also needs to be after useGridParamsApi
 * TODO: Impossible priority - useGridFocus also needs to be after useGridParamsApi
 */

function useGridParamsApi(apiRef) {
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

    const cellFocus = (0, _gridFocusStateSelector.gridFocusCellSelector)(apiRef);
    const cellTabIndex = (0, _gridFocusStateSelector.gridTabIndexCellSelector)(apiRef);
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

    const cellFocus = (0, _gridFocusStateSelector.gridFocusCellSelector)(apiRef);
    const cellTabIndex = (0, _gridFocusStateSelector.gridTabIndexCellSelector)(apiRef);
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

    return (0, _domUtils.getGridColumnHeaderElement)(apiRef.current.rootElementRef.current, field);
  }, [apiRef]);
  const getRowElement = React.useCallback(id => {
    if (!apiRef.current.rootElementRef.current) {
      return null;
    }

    return (0, _domUtils.getGridRowElement)(apiRef.current.rootElementRef.current, id);
  }, [apiRef]);
  const getCellElement = React.useCallback((id, field) => {
    if (!apiRef.current.rootElementRef.current) {
      return null;
    }

    return (0, _domUtils.getGridCellElement)(apiRef.current.rootElementRef.current, {
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
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, paramsApi, 'GridParamsApi');
}