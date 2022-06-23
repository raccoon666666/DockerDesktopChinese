"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridDimensions = useGridDimensions;

var React = _interopRequireWildcard(require("react"));

var _utils = require("@mui/material/utils");

var _events = require("../../../models/events");

var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");

var _useGridApiMethod = require("../../utils/useGridApiMethod");

var _useGridLogger = require("../../utils/useGridLogger");

var _columns = require("../columns");

var _density = require("../density");

var _utils2 = require("../../utils");

var _useGridVisibleRows = require("../../utils/useGridVisibleRows");

var _gridRowsMetaSelector = require("../rows/gridRowsMetaSelector");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const isTestEnvironment = process.env.NODE_ENV === 'test';

const hasScroll = ({
  content,
  container,
  scrollBarSize
}) => {
  const hasScrollXIfNoYScrollBar = content.width > container.width;
  const hasScrollYIfNoXScrollBar = content.height > container.height;
  let hasScrollX = false;
  let hasScrollY = false;

  if (hasScrollXIfNoYScrollBar || hasScrollYIfNoXScrollBar) {
    hasScrollX = hasScrollXIfNoYScrollBar;
    hasScrollY = content.height + (hasScrollX ? scrollBarSize : 0) > container.height; // We recalculate the scroll x to consider the size of the y scrollbar.

    if (hasScrollY) {
      hasScrollX = content.width + scrollBarSize > container.width;
    }
  }

  return {
    hasScrollX,
    hasScrollY
  };
};

function useGridDimensions(apiRef, props) {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useResizeContainer');
  const warningShown = React.useRef(false);
  const rootDimensionsRef = React.useRef(null);
  const fullDimensionsRef = React.useRef(null);
  const rowsMeta = (0, _utils2.useGridSelector)(apiRef, _gridRowsMetaSelector.gridRowsMetaSelector);
  const headerHeight = (0, _utils2.useGridSelector)(apiRef, _density.gridDensityHeaderHeightSelector);
  const updateGridDimensionsRef = React.useCallback(() => {
    var _apiRef$current$rootE;

    const rootElement = (_apiRef$current$rootE = apiRef.current.rootElementRef) == null ? void 0 : _apiRef$current$rootE.current;
    const columnsTotalWidth = (0, _columns.gridColumnsTotalWidthSelector)(apiRef);

    if (!rootDimensionsRef.current) {
      return;
    }

    let scrollBarSize;

    if (props.scrollbarSize != null) {
      scrollBarSize = props.scrollbarSize;
    } else if (!columnsTotalWidth || !rootElement) {
      scrollBarSize = 0;
    } else {
      const doc = (0, _utils.ownerDocument)(rootElement);
      const scrollDiv = doc.createElement('div');
      scrollDiv.style.width = '99px';
      scrollDiv.style.height = '99px';
      scrollDiv.style.position = 'absolute';
      scrollDiv.style.overflow = 'scroll';
      scrollDiv.className = 'scrollDiv';
      rootElement.appendChild(scrollDiv);
      scrollBarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      rootElement.removeChild(scrollDiv);
    }

    const viewportOuterSize = {
      width: rootDimensionsRef.current.width,
      height: props.autoHeight ? rowsMeta.currentPageTotalHeight : rootDimensionsRef.current.height - headerHeight
    };
    const {
      hasScrollX,
      hasScrollY
    } = hasScroll({
      content: {
        width: Math.round(columnsTotalWidth),
        height: rowsMeta.currentPageTotalHeight
      },
      container: viewportOuterSize,
      scrollBarSize
    });
    const viewportInnerSize = {
      width: viewportOuterSize.width - (hasScrollY ? scrollBarSize : 0),
      height: viewportOuterSize.height - (hasScrollX ? scrollBarSize : 0)
    };
    const newFullDimensions = {
      viewportOuterSize,
      viewportInnerSize,
      hasScrollX,
      hasScrollY
    };
    const prevDimensions = fullDimensionsRef.current;
    fullDimensionsRef.current = newFullDimensions;

    if (newFullDimensions.viewportInnerSize.width !== (prevDimensions == null ? void 0 : prevDimensions.viewportInnerSize.width) || newFullDimensions.viewportInnerSize.height !== (prevDimensions == null ? void 0 : prevDimensions.viewportInnerSize.height)) {
      apiRef.current.publishEvent(_events.GridEvents.viewportInnerSizeChange, newFullDimensions.viewportInnerSize);
    }
  }, [apiRef, props.scrollbarSize, props.autoHeight, headerHeight, rowsMeta.currentPageTotalHeight]);
  const resize = React.useCallback(() => {
    updateGridDimensionsRef();
    apiRef.current.publishEvent(_events.GridEvents.debouncedResize, rootDimensionsRef.current);
  }, [apiRef, updateGridDimensionsRef]);
  const getRootDimensions = React.useCallback(() => fullDimensionsRef.current, []);
  const getViewportPageSize = React.useCallback(() => {
    const dimensions = apiRef.current.getRootDimensions();

    if (!dimensions) {
      return 0;
    }

    const currentPage = (0, _useGridVisibleRows.getVisibleRows)(apiRef, {
      pagination: props.pagination,
      paginationMode: props.paginationMode
    }); // TODO: Use a combination of scrollTop, dimensions.viewportInnerSize.height and rowsMeta.possitions
    // to find out the maximum number of rows that can fit in the visible part of the grid

    if (props.getRowHeight) {
      const renderContext = apiRef.current.unstable_getRenderContext();
      const viewportPageSize = renderContext.lastRowIndex - renderContext.firstRowIndex;
      return Math.min(viewportPageSize - 1, currentPage.rows.length);
    }

    const maximumPageSizeWithoutScrollBar = Math.floor(dimensions.viewportInnerSize.height / (0, _density.gridDensityRowHeightSelector)(apiRef));
    return Math.min(maximumPageSizeWithoutScrollBar, currentPage.rows.length);
  }, [apiRef, props.pagination, props.paginationMode, props.getRowHeight]);
  const dimensionsApi = {
    resize,
    getRootDimensions,
    unstable_getViewportPageSize: getViewportPageSize
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, dimensionsApi, 'GridDimensionsApi');
  const debounceResize = React.useMemo(() => (0, _utils.debounce)(resize, 60), [resize]);
  const isFirstSizing = React.useRef(true);
  const handleResize = React.useCallback(size => {
    rootDimensionsRef.current = size; // jsdom has no layout capabilities

    const isJSDOM = /jsdom/.test(window.navigator.userAgent);

    if (size.height === 0 && !warningShown.current && !props.autoHeight && !isJSDOM) {
      logger.warn(['The parent of the grid has an empty height.', 'You need to make sure the container has an intrinsic height.', 'The grid displays with a height of 0px.', '', 'You can find a solution in the docs:', 'https://mui.com/components/data-grid/layout/'].join('\n'));
      warningShown.current = true;
    }

    if (size.width === 0 && !warningShown.current && !isJSDOM) {
      logger.warn(['The parent of the grid has an empty width.', 'You need to make sure the container has an intrinsic width.', 'The grid displays with a width of 0px.', '', 'You can find a solution in the docs:', 'https://mui.com/components/data-grid/layout/'].join('\n'));
      warningShown.current = true;
    }

    if (isTestEnvironment) {
      // We don't need to debounce the resize for tests.
      resize();
      isFirstSizing.current = false;
      return;
    }

    if (isFirstSizing.current) {
      // We want to initialize the grid dimensions as soon as possible to avoid flickering
      resize();
      isFirstSizing.current = false;
      return;
    }

    debounceResize();
  }, [props.autoHeight, debounceResize, logger, resize]);
  (0, _utils.unstable_useEnhancedEffect)(() => updateGridDimensionsRef(), [updateGridDimensionsRef]);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.visibleRowsSet, updateGridDimensionsRef);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.pageChange, updateGridDimensionsRef);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.pageSizeChange, updateGridDimensionsRef);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.columnsChange, updateGridDimensionsRef);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, _events.GridEvents.resize, handleResize);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.debouncedResize, props.onResize);
}