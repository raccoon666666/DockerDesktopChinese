"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _licenseErrorMessageUtils = require("./licenseErrorMessageUtils");

Object.keys(_licenseErrorMessageUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _licenseErrorMessageUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _licenseErrorMessageUtils[key];
    }
  });
});

var _licenseInfo = require("./licenseInfo");

Object.keys(_licenseInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _licenseInfo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _licenseInfo[key];
    }
  });
});

var _licenseStatus = require("./licenseStatus");

Object.keys(_licenseStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _licenseStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _licenseStatus[key];
    }
  });
});