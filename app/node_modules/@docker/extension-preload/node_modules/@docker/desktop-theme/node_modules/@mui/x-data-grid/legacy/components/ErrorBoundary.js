import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import * as React from 'react';
export var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);

  var _super = _createSuper(ErrorBoundary);

  function ErrorBoundary() {
    _classCallCheck(this, ErrorBoundary);

    return _super.apply(this, arguments);
  }

  _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      if (this.props.api.current) {
        this.logError(error); // Allows to trigger the Error event and all listener can run on Error

        this.props.api.current.showError({
          error: error,
          errorInfo: errorInfo
        });
      }
    }
  }, {
    key: "logError",
    value: function logError(error, errorInfo) {
      this.props.logger.error("An unexpected error occurred. Error: ".concat(error && error.message, ". "), error, errorInfo);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state;

      if (this.props.hasError || (_this$state = this.state) != null && _this$state.hasError) {
        // You can render any custom fallback UI
        return this.props.render(this.props.componentProps || this.state);
      }

      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return {
        hasError: true,
        error: error
      };
    }
  }]);

  return ErrorBoundary;
}(React.Component);