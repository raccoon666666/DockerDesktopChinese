"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateLicence = generateLicence;

var _md = require("../encoding/md5");

var _base = require("../encoding/base64");

const licenseVersion = '1';

function getClearLicenseString(details) {
  return `ORDER:${details.orderNumber},EXPIRY=${details.expiryDate.getTime()},KEYVERSION=${licenseVersion}`;
}

function generateLicence(details) {
  const clearLicense = getClearLicenseString(details);
  return `${(0, _md.md5)((0, _base.base64Encode)(clearLicense))}${(0, _base.base64Encode)(clearLicense)}`;
}