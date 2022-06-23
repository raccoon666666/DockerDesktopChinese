"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gridDimensionsApi = require("./gridDimensionsApi");

Object.keys(_gridDimensionsApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _gridDimensionsApi[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gridDimensionsApi[key];
    }
  });
});