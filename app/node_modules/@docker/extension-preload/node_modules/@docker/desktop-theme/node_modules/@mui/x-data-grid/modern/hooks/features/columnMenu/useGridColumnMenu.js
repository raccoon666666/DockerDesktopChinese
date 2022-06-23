import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { GridEvents } from '../../../models/events';
import { useGridLogger, useGridApiMethod, useGridApiEventHandler } from '../../utils';
import { gridColumnMenuSelector } from './columnMenuSelector';
export const columnMenuStateInitializer = state => _extends({}, state, {
  columnMenu: {
    open: false
  }
});
/**
 * @requires useGridColumnResize (event)
 * @requires useGridInfiniteLoader (event)
 */

export const useGridColumnMenu = apiRef => {
  const logger = useGridLogger(apiRef, 'useGridColumnMenu');
  /**
   * API METHODS
   */

  const showColumnMenu = React.useCallback(field => {
    const shouldUpdate = apiRef.current.setState(state => {
      if (state.columnMenu.open && state.columnMenu.field === field) {
        return state;
      }

      logger.debug('Opening Column Menu');
      return _extends({}, state, {
        columnMenu: {
          open: true,
          field
        }
      });
    });

    if (shouldUpdate) {
      apiRef.current.hidePreferences();
      apiRef.current.forceUpdate();
    }
  }, [apiRef, logger]);
  const hideColumnMenu = React.useCallback(() => {
    const shouldUpdate = apiRef.current.setState(state => {
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
  const toggleColumnMenu = React.useCallback(field => {
    logger.debug('Toggle Column Menu');
    const columnMenu = gridColumnMenuSelector(apiRef.current.state);

    if (!columnMenu.open || columnMenu.field !== field) {
      showColumnMenu(field);
    } else {
      hideColumnMenu();
    }
  }, [apiRef, logger, showColumnMenu, hideColumnMenu]);
  const columnMenuApi = {
    showColumnMenu,
    hideColumnMenu,
    toggleColumnMenu
  };
  useGridApiMethod(apiRef, columnMenuApi, 'GridColumnMenuApi');
  /**
   * EVENTS
   */

  useGridApiEventHandler(apiRef, GridEvents.columnResizeStart, hideColumnMenu);
  useGridApiEventHandler(apiRef, GridEvents.rowsScroll, hideColumnMenu);
};