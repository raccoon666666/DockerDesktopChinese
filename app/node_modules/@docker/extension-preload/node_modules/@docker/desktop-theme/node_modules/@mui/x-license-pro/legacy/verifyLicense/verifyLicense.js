import { base64Decode, base64Encode } from '../encoding/base64';
import { md5 } from '../encoding/md5';
import { LicenseStatus } from '../utils/licenseStatus';
export function generateReleaseInfo() {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return base64Encode(today.getTime().toString());
}
var expiryReg = /^.*EXPIRY=([0-9]+),.*$/;
export function verifyLicense(releaseInfo, encodedLicense) {
  if (!releaseInfo) {
    throw new Error('MUI: The release information is missing. Not able to validate license.');
  }

  if (!encodedLicense) {
    return LicenseStatus.NotFound;
  }

  var hash = encodedLicense.substr(0, 32);
  var encoded = encodedLicense.substr(32);

  if (hash !== md5(encoded)) {
    return LicenseStatus.Invalid;
  }

  var clearLicense = base64Decode(encoded);
  var expiryTimestamp = 0;

  try {
    expiryTimestamp = parseInt(clearLicense.match(expiryReg)[1], 10);

    if (!expiryTimestamp || Number.isNaN(expiryTimestamp)) {
      console.error('Error checking license. Expiry timestamp not found or invalid!');
      return LicenseStatus.Invalid;
    }
  } catch (err) {
    console.error('Error extracting license expiry timestamp.', err);
    return LicenseStatus.Invalid;
  }

  var pkgTimestamp = parseInt(base64Decode(releaseInfo), 10);

  if (Number.isNaN(pkgTimestamp)) {
    throw new Error('MUI: The release information is invalid. Not able to validate license.');
  }

  if (expiryTimestamp < pkgTimestamp) {
    return LicenseStatus.Expired;
  }

  return LicenseStatus.Valid;
}