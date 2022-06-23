"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridLocaleText = void 0;

var React = _interopRequireWildcard(require("react"));

var _useGridApiMethod = require("../utils/useGridApiMethod");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useGridLocaleText = (apiRef, props) => {
  const getLocaleText = React.useCallback(key => {
    if (props.localeText[key] == null) {
      throw new Error(`Missing translation for key ${key}.`);
    }

    return props.localeText[key];
  }, [props.localeText]);
  const localeTextApi = {
    getLocaleText
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, localeTextApi, 'LocaleTextApi');
};

exports.useGridLocaleText = useGridLocaleText;