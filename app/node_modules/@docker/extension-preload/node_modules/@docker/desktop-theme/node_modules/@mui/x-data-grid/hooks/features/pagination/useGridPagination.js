import _extends from "@babel/runtime/helpers/esm/extends";
import { useGridPageSize, defaultPageSize } from './useGridPageSize';
import { useGridPage, getPageCount } from './useGridPage';
export const paginationStateInitializer = (state, props) => {
  var _props$initialState, _props$initialState$p, _ref, _props$page, _props$initialState2, _props$initialState2$, _props$rowCount, _props$rowCount2;

  let pageSize;

  if (props.pageSize != null) {
    pageSize = props.pageSize;
  } else if (((_props$initialState = props.initialState) == null ? void 0 : (_props$initialState$p = _props$initialState.pagination) == null ? void 0 : _props$initialState$p.pageSize) != null) {
    pageSize = props.initialState.pagination.pageSize;
  } else {
    pageSize = defaultPageSize(props.autoPageSize);
  }

  return _extends({}, state, {
    pagination: {
      pageSize,
      page: (_ref = (_props$page = props.page) != null ? _props$page : (_props$initialState2 = props.initialState) == null ? void 0 : (_props$initialState2$ = _props$initialState2.pagination) == null ? void 0 : _props$initialState2$.page) != null ? _ref : 0,
      pageCount: getPageCount((_props$rowCount = props.rowCount) != null ? _props$rowCount : 0, pageSize),
      rowCount: (_props$rowCount2 = props.rowCount) != null ? _props$rowCount2 : 0
    }
  });
};
/**
 * @requires useGridFilter (state)
 * @requires useGridDimensions (event) - can be after
 */

export const useGridPagination = (apiRef, props) => {
  useGridPageSize(apiRef, props);
  useGridPage(apiRef, props);
};