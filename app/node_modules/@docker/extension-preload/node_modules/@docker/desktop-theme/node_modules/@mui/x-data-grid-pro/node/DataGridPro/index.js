"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  DATA_GRID_PRO_PROPS_DEFAULT_VALUES: true
};
Object.defineProperty(exports, "DATA_GRID_PRO_PROPS_DEFAULT_VALUES", {
  enumerable: true,
  get: function () {
    return _useDataGridProProps.DATA_GRID_PRO_PROPS_DEFAULT_VALUES;
  }
});

var _DataGridPro = require("./DataGridPro");

Object.keys(_DataGridPro).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DataGridPro[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _DataGridPro[key];
    }
  });
});

var _useDataGridProProps = require("./useDataGridProProps");