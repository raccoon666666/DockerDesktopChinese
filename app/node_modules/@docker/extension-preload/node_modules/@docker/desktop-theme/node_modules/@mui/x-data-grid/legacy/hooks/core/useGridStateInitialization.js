import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
var _excluded = ["stateId"];
import * as React from 'react';
import { GridSignature } from '../utils/useGridApiEventHandler';
import { GridEvents } from '../../models/events';
import { useGridApiMethod } from '../utils';
import { isFunction } from '../../utils/utils';
export var useGridStateInitialization = function useGridStateInitialization(apiRef, props) {
  var controlStateMapRef = React.useRef({});

  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      rawForceUpdate = _React$useState2[1];

  var updateControlState = React.useCallback(function (controlStateItem) {
    var stateId = controlStateItem.stateId,
        others = _objectWithoutProperties(controlStateItem, _excluded);

    controlStateMapRef.current[stateId] = _extends({}, others, {
      stateId: stateId
    });
  }, []);
  var setState = React.useCallback(function (state) {
    var newState;

    if (isFunction(state)) {
      newState = state(apiRef.current.state);
    } else {
      newState = state;
    }

    if (apiRef.current.state === newState) {
      return false;
    }

    var ignoreSetState = false; // Apply the control state constraints

    var updatedControlStateIds = [];
    Object.keys(controlStateMapRef.current).forEach(function (stateId) {
      var controlState = controlStateMapRef.current[stateId];
      var oldSubState = controlState.stateSelector(apiRef.current.state, apiRef.current.instanceId);
      var newSubState = controlState.stateSelector(newState, apiRef.current.instanceId);

      if (newSubState === oldSubState) {
        return;
      }

      updatedControlStateIds.push({
        stateId: controlState.stateId,
        hasPropChanged: newSubState !== controlState.propModel
      }); // The state is controlled, the prop should always win

      if (controlState.propModel !== undefined && newSubState !== controlState.propModel) {
        ignoreSetState = true;
      }
    });

    if (updatedControlStateIds.length > 1) {
      // Each hook modify its own state, and it should not leak
      // Events are here to forward to other hooks and apply changes.
      // You are trying to update several states in a no isolated way.
      throw new Error("You're not allowed to update several sub-state in one transaction. You already updated ".concat(updatedControlStateIds[0].stateId, ", therefore, you're not allowed to update ").concat(updatedControlStateIds.map(function (el) {
        return el.stateId;
      }).join(', '), " in the same transaction."));
    }

    if (!ignoreSetState) {
      // We always assign it as we mutate rows for perf reason.
      apiRef.current.state = newState;

      if (apiRef.current.publishEvent) {
        apiRef.current.publishEvent(GridEvents.stateChange, newState);
      }
    }

    if (updatedControlStateIds.length === 1) {
      var _updatedControlStateI = updatedControlStateIds[0],
          stateId = _updatedControlStateI.stateId,
          hasPropChanged = _updatedControlStateI.hasPropChanged;
      var controlState = controlStateMapRef.current[stateId];
      var model = controlState.stateSelector(newState, apiRef.current.instanceId);

      if (controlState.propOnChange && hasPropChanged) {
        var details = props.signature === GridSignature.DataGridPro ? {
          api: apiRef.current
        } : {};
        controlState.propOnChange(model, details);
      }

      if (!ignoreSetState) {
        apiRef.current.publishEvent(controlState.changeEvent, model);
      }
    }

    return !ignoreSetState;
  }, [apiRef, props.signature]);
  var forceUpdate = React.useCallback(function () {
    return rawForceUpdate(function () {
      return apiRef.current.state;
    });
  }, [apiRef]);
  var stateApi = {
    setState: setState,
    forceUpdate: forceUpdate,
    unstable_updateControlState: updateControlState
  };
  useGridApiMethod(apiRef, stateApi, 'GridStateApi');
};