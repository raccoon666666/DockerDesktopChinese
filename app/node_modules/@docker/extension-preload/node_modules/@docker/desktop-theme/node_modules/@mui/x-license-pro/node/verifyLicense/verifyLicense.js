"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateReleaseInfo = generateReleaseInfo;
exports.verifyLicense = verifyLicense;

var _base = require("../encoding/base64");

var _md = require("../encoding/md5");

var _licenseStatus = require("../utils/licenseStatus");

function generateReleaseInfo() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (0, _base.base64Encode)(today.getTime().toString());
}

const expiryReg = /^.*EXPIRY=([0-9]+),.*$/;

function verifyLicense(releaseInfo, encodedLicense) {
  if (!releaseInfo) {
    throw new Error('MUI: The release information is missing. Not able to validate license.');
  }

  if (!encodedLicense) {
    return _licenseStatus.LicenseStatus.NotFound;
  }

  const hash = encodedLicense.substr(0, 32);
  const encoded = encodedLicense.substr(32);

  if (hash !== (0, _md.md5)(encoded)) {
    return _licenseStatus.LicenseStatus.Invalid;
  }

  const clearLicense = (0, _base.base64Decode)(encoded);
  let expiryTimestamp = 0;

  try {
    expiryTimestamp = parseInt(clearLicense.match(expiryReg)[1], 10);

    if (!expiryTimestamp || Number.isNaN(expiryTimestamp)) {
      console.error('Error checking license. Expiry timestamp not found or invalid!');
      return _licenseStatus.LicenseStatus.Invalid;
    }
  } catch (err) {
    console.error('Error extracting license expiry timestamp.', err);
    return _licenseStatus.LicenseStatus.Invalid;
  }

  const pkgTimestamp = parseInt((0, _base.base64Decode)(releaseInfo), 10);

  if (Number.isNaN(pkgTimestamp)) {
    throw new Error('MUI: The release information is invalid. Not able to validate license.');
  }

  if (expiryTimestamp < pkgTimestamp) {
    return _licenseStatus.LicenseStatus.Expired;
  }

  return _licenseStatus.LicenseStatus.Valid;
}