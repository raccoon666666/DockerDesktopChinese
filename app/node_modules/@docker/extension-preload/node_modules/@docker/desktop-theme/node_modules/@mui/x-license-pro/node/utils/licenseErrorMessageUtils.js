"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showExpiredLicenseError = showExpiredLicenseError;
exports.showInvalidLicenseError = showInvalidLicenseError;
exports.showNotFoundLicenseError = showNotFoundLicenseError;

function showError(message) {
  console.error(['************************************************************', '*************************************************************', '', ...message, '', '*************************************************************', '*************************************************************'].join('\n'));
}

function showInvalidLicenseError() {
  showError(['MUI: Invalid license.', '', 'Your license for MUI X is not valid, please visit', 'https://mui.com/r/x-license to get a valid license.']);
}

function showNotFoundLicenseError() {
  showError(['MUI: License key not found.', '', 'This is a trial-only version of MUI X.', 'While all the features are unlocked, it is not licensed for', 'development use on projects intended for production.', '', 'To purchase a license, please visit', 'https://mui.com/r/x-license to get a valid license.']);
}

function showExpiredLicenseError() {
  showError(['MUI: License key expired.', '', 'Please visit https://mui.com/r/x-license to renew', 'your subscription and get the latest version of MUI X.']);
}