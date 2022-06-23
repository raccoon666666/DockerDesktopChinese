import * as React from 'react';
import { debounce, ownerDocument, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import { GridEvents } from '../../../models/events';
import { useGridApiEventHandler, useGridApiOptionHandler } from '../../utils/useGridApiEventHandler';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { useGridLogger } from '../../utils/useGridLogger';
import { gridColumnsTotalWidthSelector } from '../columns';
import { gridDensityHeaderHeightSelector, gridDensityRowHeightSelector } from '../density';
import { useGridSelector } from '../../utils';
import { getVisibleRows } from '../../utils/useGridVisibleRows';
import { gridRowsMetaSelector } from '../rows/gridRowsMetaSelector';
var isTestEnvironment = process.env.NODE_ENV === 'test';

var hasScroll = function hasScroll(_ref) {
  var content = _ref.content,
      container = _ref.container,
      scrollBarSize = _ref.scrollBarSize;
  var hasScrollXIfNoYScrollBar = content.width > container.width;
  var hasScrollYIfNoXScrollBar = content.height > container.height;
  var hasScrollX = false;
  var hasScrollY = false;

  if (hasScrollXIfNoYScrollBar || hasScrollYIfNoXScrollBar) {
    hasScrollX = hasScrollXIfNoYScrollBar;
    hasScrollY = content.height + (hasScrollX ? scrollBarSize : 0) > container.height; // We recalculate the scroll x to consider the size of the y scrollbar.

    if (hasScrollY) {
      hasScrollX = content.width + scrollBarSize > container.width;
    }
  }

  return {
    hasScrollX: hasScrollX,
    hasScrollY: hasScrollY
  };
};

export function useGridDimensions(apiRef, props) {
  var logger = useGridLogger(apiRef, 'useResizeContainer');
  var warningShown = React.useRef(false);
  var rootDimensionsRef = React.useRef(null);
  var fullDimensionsRef = React.useRef(null);
  var rowsMeta = useGridSelector(apiRef, gridRowsMetaSelector);
  var headerHeight = useGridSelector(apiRef, gridDensityHeaderHeightSelector);
  var updateGridDimensionsRef = React.useCallback(function () {
    var _apiRef$current$rootE;

    var rootElement = (_apiRef$current$rootE = apiRef.current.rootElementRef) == null ? void 0 : _apiRef$current$rootE.current;
    var columnsTotalWidth = gridColumnsTotalWidthSelector(apiRef);

    if (!rootDimensionsRef.current) {
      return;
    }

    var scrollBarSize;

    if (props.scrollbarSize != null) {
      scrollBarSize = props.scrollbarSize;
    } else if (!columnsTotalWidth || !rootElement) {
      scrollBarSize = 0;
    } else {
      var doc = ownerDocument(rootElement);
      var scrollDiv = doc.createElement('div');
      scrollDiv.style.width = '99px';
      scrollDiv.style.height = '99px';
      scrollDiv.style.position = 'absolute';
      scrollDiv.style.overflow = 'scroll';
      scrollDiv.className = 'scrollDiv';
      rootElement.appendChild(scrollDiv);
      scrollBarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      rootElement.removeChild(scrollDiv);
    }

    var viewportOuterSize = {
      width: rootDimensionsRef.current.width,
      height: props.autoHeight ? rowsMeta.currentPageTotalHeight : rootDimensionsRef.current.height - headerHeight
    };

    var _hasScroll = hasScroll({
      content: {
        width: Math.round(columnsTotalWidth),
        height: rowsMeta.currentPageTotalHeight
      },
      container: viewportOuterSize,
      scrollBarSize: scrollBarSize
    }),
        hasScrollX = _hasScroll.hasScrollX,
        hasScrollY = _hasScroll.hasScrollY;

    var viewportInnerSize = {
      width: viewportOuterSize.width - (hasScrollY ? scrollBarSize : 0),
      height: viewportOuterSize.height - (hasScrollX ? scrollBarSize : 0)
    };
    var newFullDimensions = {
      viewportOuterSize: viewportOuterSize,
      viewportInnerSize: viewportInnerSize,
      hasScrollX: hasScrollX,
      hasScrollY: hasScrollY
    };
    var prevDimensions = fullDimensionsRef.current;
    fullDimensionsRef.current = newFullDimensions;

    if (newFullDimensions.viewportInnerSize.width !== (prevDimensions == null ? void 0 : prevDimensions.viewportInnerSize.width) || newFullDimensions.viewportInnerSize.height !== (prevDimensions == null ? void 0 : prevDimensions.viewportInnerSize.height)) {
      apiRef.current.publishEvent(GridEvents.viewportInnerSizeChange, newFullDimensions.viewportInnerSize);
    }
  }, [apiRef, props.scrollbarSize, props.autoHeight, headerHeight, rowsMeta.currentPageTotalHeight]);
  var resize = React.useCallback(function () {
    updateGridDimensionsRef();
    apiRef.current.publishEvent(GridEvents.debouncedResize, rootDimensionsRef.current);
  }, [apiRef, updateGridDimensionsRef]);
  var getRootDimensions = React.useCallback(function () {
    return fullDimensionsRef.current;
  }, []);
  var getViewportPageSize = React.useCallback(function () {
    var dimensions = apiRef.current.getRootDimensions();

    if (!dimensions) {
      return 0;
    }

    var currentPage = getVisibleRows(apiRef, {
      pagination: props.pagination,
      paginationMode: props.paginationMode
    }); // TODO: Use a combination of scrollTop, dimensions.viewportInnerSize.height and rowsMeta.possitions
    // to find out the maximum number of rows that can fit in the visible part of the grid

    if (props.getRowHeight) {
      var renderContext = apiRef.current.unstable_getRenderContext();
      var viewportPageSize = renderContext.lastRowIndex - renderContext.firstRowIndex;
      return Math.min(viewportPageSize - 1, currentPage.rows.length);
    }

    var maximumPageSizeWithoutScrollBar = Math.floor(dimensions.viewportInnerSize.height / gridDensityRowHeightSelector(apiRef));
    return Math.min(maximumPageSizeWithoutScrollBar, currentPage.rows.length);
  }, [apiRef, props.pagination, props.paginationMode, props.getRowHeight]);
  var dimensionsApi = {
    resize: resize,
    getRootDimensions: getRootDimensions,
    unstable_getViewportPageSize: getViewportPageSize
  };
  useGridApiMethod(apiRef, dimensionsApi, 'GridDimensionsApi');
  var debounceResize = React.useMemo(function () {
    return debounce(resize, 60);
  }, [resize]);
  var isFirstSizing = React.useRef(true);
  var handleResize = React.useCallback(function (size) {
    rootDimensionsRef.current = size; // jsdom has no layout capabilities

    var isJSDOM = /jsdom/.test(window.navigator.userAgent);

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
  useEnhancedEffect(function () {
    return updateGridDimensionsRef();
  }, [updateGridDimensionsRef]);
  useGridApiOptionHandler(apiRef, GridEvents.visibleRowsSet, updateGridDimensionsRef);
  useGridApiOptionHandler(apiRef, GridEvents.pageChange, updateGridDimensionsRef);
  useGridApiOptionHandler(apiRef, GridEvents.pageSizeChange, updateGridDimensionsRef);
  useGridApiOptionHandler(apiRef, GridEvents.columnsChange, updateGridDimensionsRef);
  useGridApiEventHandler(apiRef, GridEvents.resize, handleResize);
  useGridApiOptionHandler(apiRef, GridEvents.debouncedResize, props.onResize);
}