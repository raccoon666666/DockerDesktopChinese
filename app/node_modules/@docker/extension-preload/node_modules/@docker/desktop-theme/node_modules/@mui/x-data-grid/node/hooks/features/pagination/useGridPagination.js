"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridPagination = exports.paginationStateInitializer = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _useGridPageSize = require("./useGridPageSize");

var _useGridPage = require("./useGridPage");

const paginationStateInitializer = (state, props) => {
  var _props$initialState, _props$initialState$p, _ref, _props$page, _props$initialState2, _props$initialState2$, _props$rowCount, _props$rowCount2;

  let pageSize;

  if (props.pageSize != null) {
    pageSize = props.pageSize;
  } else if (((_props$initialState = props.initialState) == null ? void 0 : (_props$initialState$p = _props$initialState.pagination) == null ? void 0 : _props$initialState$p.pageSize) != null) {
    pageSize = props.initialState.pagination.pageSize;
  } else {
    pageSize = (0, _useGridPageSize.defaultPageSize)(props.autoPageSize);
  }

  return (0, _extends2.default)({}, state, {
    pagination: {
      pageSize,
      page: (_ref = (_props$page = props.page) != null ? _props$page : (_props$initialState2 = props.initialState) == null ? void 0 : (_props$initialState2$ = _props$initialState2.pagination) == null ? void 0 : _props$initialState2$.page) != null ? _ref : 0,
      pageCount: (0, _useGridPage.getPageCount)((_props$rowCount = props.rowCount) != null ? _props$rowCount : 0, pageSize),
      rowCount: (_props$rowCount2 = props.rowCount) != null ? _props$rowCount2 : 0
    }
  });
};
/**
 * @requires useGridFilter (state)
 * @requires useGridDimensions (event) - can be after
 */


exports.paginationStateInitializer = paginationStateInitializer;

const useGridPagination = (apiRef, props) => {
  (0, _useGridPageSize.useGridPageSize)(apiRef, props);
  (0, _useGridPage.useGridPage)(apiRef, props);
};

exports.useGridPagination = useGridPagination;