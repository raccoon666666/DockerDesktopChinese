"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPagination = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _TablePagination = _interopRequireWildcard(require("@mui/material/TablePagination"));

var _styles = require("@mui/material/styles");

var _useGridSelector = require("../hooks/utils/useGridSelector");

var _useGridApiContext = require("../hooks/utils/useGridApiContext");

var _useGridRootProps = require("../hooks/utils/useGridRootProps");

var _gridPaginationSelector = require("../hooks/features/pagination/gridPaginationSelector");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GridPaginationRoot = (0, _styles.styled)(_TablePagination.default)(({
  theme
}) => ({
  [`& .${_TablePagination.tablePaginationClasses.selectLabel}`]: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  [`& .${_TablePagination.tablePaginationClasses.input}`]: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-flex'
    }
  }
}));
const GridPagination = /*#__PURE__*/React.forwardRef(function GridPagination(props, ref) {
  var _rootProps$rowsPerPag;

  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const paginationState = (0, _useGridSelector.useGridSelector)(apiRef, _gridPaginationSelector.gridPaginationSelector);
  const lastPage = React.useMemo(() => Math.floor(paginationState.rowCount / (paginationState.pageSize || 1)), [paginationState.rowCount, paginationState.pageSize]);
  const handlePageSizeChange = React.useCallback(event => {
    const newPageSize = Number(event.target.value);
    apiRef.current.setPageSize(newPageSize);
  }, [apiRef]);
  const handlePageChange = React.useCallback((event, page) => {
    apiRef.current.setPage(page);
  }, [apiRef]);

  if (process.env.NODE_ENV !== 'production') {
    var _rootProps$pageSize;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const warnedOnceMissingPageSizeInRowsPerPageOptions = React.useRef(false);

    if (!warnedOnceMissingPageSizeInRowsPerPageOptions.current && !rootProps.autoPageSize && !rootProps.rowsPerPageOptions.includes((_rootProps$pageSize = rootProps.pageSize) != null ? _rootProps$pageSize : paginationState.pageSize)) {
      var _rootProps$pageSize2;

      console.warn([`MUI: The page size \`${(_rootProps$pageSize2 = rootProps.pageSize) != null ? _rootProps$pageSize2 : paginationState.pageSize}\` is not preset in the \`rowsPerPageOptions\``, `Add it to show the pagination select.`].join('\n'));
      warnedOnceMissingPageSizeInRowsPerPageOptions.current = true;
    }
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GridPaginationRoot, (0, _extends2.default)({
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
exports.GridPagination = GridPagination;