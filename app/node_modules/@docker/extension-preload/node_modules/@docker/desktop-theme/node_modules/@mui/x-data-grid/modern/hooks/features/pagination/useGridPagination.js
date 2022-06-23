import _extends from "@babel/runtime/helpers/esm/extends";
import { useGridPageSize, defaultPageSize } from './useGridPageSize';
import { useGridPage, getPageCount } from './useGridPage';
export const paginationStateInitializer = (state, props) => {
  let pageSize;

  if (props.pageSize != null) {
    pageSize = props.pageSize;
  } else if (props.initialState?.pagination?.pageSize != null) {
    pageSize = props.initialState.pagination.pageSize;
  } else {
    pageSize = defaultPageSize(props.autoPageSize);
  }

  return _extends({}, state, {
    pagination: {
      pageSize,
      page: props.page ?? props.initialState?.pagination?.page ?? 0,
      pageCount: getPageCount(props.rowCount ?? 0, pageSize),
      rowCount: props.rowCount ?? 0
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