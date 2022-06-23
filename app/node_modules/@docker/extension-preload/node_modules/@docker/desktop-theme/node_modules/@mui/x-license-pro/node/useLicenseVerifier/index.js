"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useLicenseVerifier = require("./useLicenseVerifier");

Object.keys(_useLicenseVerifier).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useLicenseVerifier[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useLicenseVerifier[key];
    }
  });
});