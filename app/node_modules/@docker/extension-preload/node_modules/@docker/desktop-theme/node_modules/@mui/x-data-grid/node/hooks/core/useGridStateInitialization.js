"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridStateInitialization = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _useGridApiEventHandler = require("../utils/useGridApiEventHandler");

var _events = require("../../models/events");

var _utils = require("../utils");

var _utils2 = require("../../utils/utils");

const _excluded = ["stateId"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useGridStateInitialization = (apiRef, props) => {
  const controlStateMapRef = React.useRef({});
  const [, rawForceUpdate] = React.useState();
  const updateControlState = React.useCallback(controlStateItem => {
    const {
      stateId
    } = controlStateItem,
          others = (0, _objectWithoutPropertiesLoose2.default)(controlStateItem, _excluded);
    controlStateMapRef.current[stateId] = (0, _extends2.default)({}, others, {
      stateId
    });
  }, []);
  const setState = React.useCallback(state => {
    let newState;

    if ((0, _utils2.isFunction)(state)) {
      newState = state(apiRef.current.state);
    } else {
      newState = state;
    }

    if (apiRef.current.state === newState) {
      return false;
    }

    let ignoreSetState = false; // Apply the control state constraints

    const updatedControlStateIds = [];
    Object.keys(controlStateMapRef.current).forEach(stateId => {
      const controlState = controlStateMapRef.current[stateId];
      const oldSubState = controlState.stateSelector(apiRef.current.state, apiRef.current.instanceId);
      const newSubState = controlState.stateSelector(newState, apiRef.current.instanceId);

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
      throw new Error(`You're not allowed to update several sub-state in one transaction. You already updated ${updatedControlStateIds[0].stateId}, therefore, you're not allowed to update ${updatedControlStateIds.map(el => el.stateId).join(', ')} in the same transaction.`);
    }

    if (!ignoreSetState) {
      // We always assign it as we mutate rows for perf reason.
      apiRef.current.state = newState;

      if (apiRef.current.publishEvent) {
        apiRef.current.publishEvent(_events.GridEvents.stateChange, newState);
      }
    }

    if (updatedControlStateIds.length === 1) {
      const {
        stateId,
        hasPropChanged
      } = updatedControlStateIds[0];
      const controlState = controlStateMapRef.current[stateId];
      const model = controlState.stateSelector(newState, apiRef.current.instanceId);

      if (controlState.propOnChange && hasPropChanged) {
        const details = props.signature === _useGridApiEventHandler.GridSignature.DataGridPro ? {
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
  const forceUpdate = React.useCallback(() => rawForceUpdate(() => apiRef.current.state), [apiRef]);
  const stateApi = {
    setState,
    forceUpdate,
    unstable_updateControlState: updateControlState
  };
  (0, _utils.useGridApiMethod)(apiRef, stateApi, 'GridStateApi');
};

exports.useGridStateInitialization = useGridStateInitialization;