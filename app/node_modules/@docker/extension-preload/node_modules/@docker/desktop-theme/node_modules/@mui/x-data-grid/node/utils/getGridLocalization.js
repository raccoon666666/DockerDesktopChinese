"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGridLocalization = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

const getGridLocalization = (gridTranslations, coreTranslations) => {
  var _coreTranslations$com, _coreTranslations$com2;

  return {
    components: {
      MuiDataGrid: {
        defaultProps: {
          localeText: (0, _extends2.default)({}, gridTranslations, {
            MuiTablePagination: (coreTranslations == null ? void 0 : (_coreTranslations$com = coreTranslations.components) == null ? void 0 : (_coreTranslations$com2 = _coreTranslations$com.MuiTablePagination) == null ? void 0 : _coreTranslations$com2.defaultProps) || {}
          })
        }
      }
    }
  };
};

exports.getGridLocalization = getGridLocalization;