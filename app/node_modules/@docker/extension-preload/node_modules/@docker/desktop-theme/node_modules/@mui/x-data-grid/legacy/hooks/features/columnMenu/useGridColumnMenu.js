import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { GridEvents } from '../../../models/events';
import { useGridLogger, useGridApiMethod, useGridApiEventHandler } from '../../utils';
import { gridColumnMenuSelector } from './columnMenuSelector';
export var columnMenuStateInitializer = function columnMenuStateInitializer(state) {
  return _extends({}, state, {
    columnMenu: {
      open: false
    }
  });
};
/**
 * @requires useGridColumnResize (event)
 * @requires useGridInfiniteLoader (event)
 */

export var useGridColumnMenu = function useGridColumnMenu(apiRef) {
  var logger = useGridLogger(apiRef, 'useGridColumnMenu');
  /**
   * API METHODS
   */

  var showColumnMenu = React.useCallback(function (field) {
    var shouldUpdate = apiRef.current.setState(function (state) {
      if (state.columnMenu.open && state.columnMenu.field === field) {
        return state;
      }

      logger.debug('Opening Column Menu');
      return _extends({}, state, {
        columnMenu: {
          open: true,
          field: field
        }
      });
    });

    if (shouldUpdate) {
      apiRef.current.hidePreferences();
      apiRef.current.forceUpdate();
    }
  }, [apiRef, logger]);
  var hideColumnMenu = React.useCallback(function () {
    var shouldUpdate = apiRef.current.setState(function (state) {
      if (!state.columnMenu.open && state.columnMenu.field === undefined) {
        return state;
      }

      logger.debug('Hiding Column Menu');
      return _extends({}, state, {
        columnMenu: _extends({}, state.columnMenu, {
          open: false,
          field: undefined
        })
      });
    });

    if (shouldUpdate) {
      apiRef.current.forceUpdate();
    }
  }, [apiRef, logger]);
  var toggleColumnMenu = React.useCallback(function (field) {
    logger.debug('Toggle Column Menu');
    var columnMenu = gridColumnMenuSelector(apiRef.current.state);

    if (!columnMenu.open || columnMenu.field !== field) {
      showColumnMenu(field);
    } else {
      hideColumnMenu();
    }
  }, [apiRef, logger, showColumnMenu, hideColumnMenu]);
  var columnMenuApi = {
    showColumnMenu: showColumnMenu,
    hideColumnMenu: hideColumnMenu,
    toggleColumnMenu: toggleColumnMenu
  };
  useGridApiMethod(apiRef, columnMenuApi, 'GridColumnMenuApi');
  /**
   * EVENTS
   */

  useGridApiEventHandler(apiRef, GridEvents.columnResizeStart, hideColumnMenu);
  useGridApiEventHandler(apiRef, GridEvents.rowsScroll, hideColumnMenu);
};