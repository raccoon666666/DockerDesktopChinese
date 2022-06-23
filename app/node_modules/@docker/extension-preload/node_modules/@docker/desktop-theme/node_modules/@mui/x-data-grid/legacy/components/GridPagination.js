import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import TablePagination, { tablePaginationClasses } from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import { useGridSelector } from '../hooks/utils/useGridSelector';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { gridPaginationSelector } from '../hooks/features/pagination/gridPaginationSelector';
import { jsx as _jsx } from "react/jsx-runtime";
var GridPaginationRoot = styled(TablePagination)(function (_ref) {
  var _ref2;

  var theme = _ref.theme;
  return _ref2 = {}, _defineProperty(_ref2, "& .".concat(tablePaginationClasses.selectLabel), _defineProperty({
    display: 'none'
  }, theme.breakpoints.up('sm'), {
    display: 'block'
  })), _defineProperty(_ref2, "& .".concat(tablePaginationClasses.input), _defineProperty({
    display: 'none'
  }, theme.breakpoints.up('sm'), {
    display: 'inline-flex'
  })), _ref2;
});
export var GridPagination = /*#__PURE__*/React.forwardRef(function GridPagination(props, ref) {
  var _rootProps$rowsPerPag;

  var apiRef = useGridApiContext();
  var rootProps = useGridRootProps();
  var paginationState = useGridSelector(apiRef, gridPaginationSelector);
  var lastPage = React.useMemo(function () {
    return Math.floor(paginationState.rowCount / (paginationState.pageSize || 1));
  }, [paginationState.rowCount, paginationState.pageSize]);
  var handlePageSizeChange = React.useCallback(function (event) {
    var newPageSize = Number(event.target.value);
    apiRef.current.setPageSize(newPageSize);
  }, [apiRef]);
  var handlePageChange = React.useCallback(function (event, page) {
    apiRef.current.setPage(page);
  }, [apiRef]);

  if (process.env.NODE_ENV !== 'production') {
    var _rootProps$pageSize;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    var warnedOnceMissingPageSizeInRowsPerPageOptions = React.useRef(false);

    if (!warnedOnceMissingPageSizeInRowsPerPageOptions.current && !rootProps.autoPageSize && !rootProps.rowsPerPageOptions.includes((_rootProps$pageSize = rootProps.pageSize) != null ? _rootProps$pageSize : paginationState.pageSize)) {
      var _rootProps$pageSize2;

      console.warn(["MUI: The page size `".concat((_rootProps$pageSize2 = rootProps.pageSize) != null ? _rootProps$pageSize2 : paginationState.pageSize, "` is not preset in the `rowsPerPageOptions`"), "Add it to show the pagination select."].join('\n'));
      warnedOnceMissingPageSizeInRowsPerPageOptions.current = true;
    }
  }

  return /*#__PURE__*/_jsx(GridPaginationRoot, _extends({
    ref: ref // @ts-ignore
    ,
    component: "div",
    count: paginationState.rowCount,
    page: paginationState.page <= lastPage ? paginationState.page : lastPage,
    rowsPerPageOptions: (_rootProps$rowsPerPag = rootProps.rowsPerPageOptions) != null && _rootProps$rowsPerPag.includes(paginationState.pageSize) ? rootProps.rowsPerPageOptions : [],
    rowsPerPage: paginationState.pageSize,
    onPageChange: handlePageChange,
    onRowsPerPageChange: handlePageSizeChange
  }, apiRef.current.getLocaleText('MuiTablePagination'), props));
});