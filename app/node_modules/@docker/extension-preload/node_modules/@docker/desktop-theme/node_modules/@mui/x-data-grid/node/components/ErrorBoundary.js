"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorBoundary = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.api.current) {
      this.logError(error); // Allows to trigger the Error event and all listener can run on Error

      this.props.api.current.showError({
        error,
        errorInfo
      });
    }
  }

  logError(error, errorInfo) {
    this.props.logger.error(`An unexpected error occurred. Error: ${error && error.message}. `, error, errorInfo);
  }

  render() {
    var _this$state;

    if (this.props.hasError || (_this$state = this.state) != null && _this$state.hasError) {
      // You can render any custom fallback UI
      return this.props.render(this.props.componentProps || this.state);
    }

    return this.props.children;
  }

}

exports.ErrorBoundary = ErrorBoundary;