"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridEvents = useGridEvents;

var _events = require("../../../models/events");

var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");

/**
 * @requires useGridFocus (event) - can be after, async only
 * @requires useGridColumns (event) - can be after, async only
 */
function useGridEvents(apiRef, props) {
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.columnHeaderClick, props.onColumnHeaderClick);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.columnHeaderDoubleClick, props.onColumnHeaderDoubleClick);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.columnHeaderOver, props.onColumnHeaderOver);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.columnHeaderOut, props.onColumnHeaderOut);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.columnHeaderEnter, props.onColumnHeaderEnter);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.columnHeaderLeave, props.onColumnHeaderLeave);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.columnOrderChange, props.onColumnOrderChange);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.cellClick, props.onCellClick);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.cellDoubleClick, props.onCellDoubleClick);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.cellKeyDown, props.onCellKeyDown);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.cellFocusOut, props.onCellFocusOut);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.rowDoubleClick, props.onRowDoubleClick);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.rowClick, props.onRowClick);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.componentError, props.onError);
  (0, _useGridApiEventHandler.useGridApiOptionHandler)(apiRef, _events.GridEvents.stateChange, props.onStateChange);
}