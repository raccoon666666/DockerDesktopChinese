import * as React from 'react';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { gridFilteredSortedRowIdsSelector } from '../filter';
import { useGridLogger } from '../../utils/useGridLogger';
import { exportAs } from '../../../utils/exportAs';
import { buildCSV } from './serializers/csvSerializer';
import { getColumnsToExport } from './utils';

const defaultGetRowsToExport = ({
  apiRef
}) => {
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const selectedRows = apiRef.current.getSelectedRows();

  if (selectedRows.size > 0) {
    return filteredSortedRowIds.filter(id => selectedRows.has(id));
  }

  return filteredSortedRowIds;
};
/**
 * @requires useGridColumns (state)
 * @requires useGridFilter (state)
 * @requires useGridSorting (state)
 * @requires useGridSelection (state)
 * @requires useGridParamsApi (method)
 */


export const useGridCsvExport = apiRef => {
  const logger = useGridLogger(apiRef, 'useGridCsvExport');
  const getDataAsCsv = React.useCallback((options = {}) => {
    logger.debug(`Get data as CSV`);
    const exportedColumns = getColumnsToExport({
      apiRef,
      options
    });
    const getRowsToExport = options.getRowsToExport ?? defaultGetRowsToExport;
    const exportedRowIds = getRowsToExport({
      apiRef
    });
    return buildCSV({
      columns: exportedColumns,
      rowIds: exportedRowIds,
      getCellParams: apiRef.current.getCellParams,
      delimiterCharacter: options.delimiter || ',',
      includeHeaders: options.includeHeaders ?? true
    });
  }, [logger, apiRef]);
  const exportDataAsCsv = React.useCallback(options => {
    logger.debug(`Export data as CSV`);
    const csv = getDataAsCsv(options);
    const blob = new Blob([options?.utf8WithBom ? new Uint8Array([0xef, 0xbb, 0xbf]) : '', csv], {
      type: 'text/csv'
    });
    exportAs(blob, 'csv', options?.fileName);
  }, [logger, getDataAsCsv]);
  const csvExportApi = {
    getDataAsCsv,
    exportDataAsCsv
  };
  useGridApiMethod(apiRef, csvExportApi, 'GridCsvExportApi');
};