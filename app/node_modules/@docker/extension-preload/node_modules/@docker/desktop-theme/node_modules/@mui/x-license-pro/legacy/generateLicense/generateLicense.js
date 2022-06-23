import { md5 } from '../encoding/md5';
import { base64Encode } from '../encoding/base64';
var licenseVersion = '1';

function getClearLicenseString(details) {
  return "ORDER:".concat(details.orderNumber, ",EXPIRY=").concat(details.expiryDate.getTime(), ",KEYVERSION=").concat(licenseVersion);
}

export function generateLicence(details) {
  var clearLicense = getClearLicenseString(details);
  return "".concat(md5(base64Encode(clearLicense))).concat(base64Encode(clearLicense));
}