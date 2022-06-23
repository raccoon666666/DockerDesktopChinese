"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _verifyLicense = require("./verifyLicense");

Object.keys(_verifyLicense).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _verifyLicense[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _verifyLicense[key];
    }
  });
});