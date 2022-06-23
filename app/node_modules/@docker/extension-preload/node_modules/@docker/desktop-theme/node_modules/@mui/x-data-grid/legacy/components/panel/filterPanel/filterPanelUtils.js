import _typeof from "@babel/runtime/helpers/esm/typeof";
export function getValueFromOption(option) {
  if (_typeof(option) === 'object' && option !== null) {
    return option.value;
  }

  return option;
}
export function getValueFromValueOptions(value, valueOptions) {
  if (valueOptions === undefined) {
    return undefined;
  }

  var result = valueOptions.find(function (option) {
    var optionValue = getValueFromOption(option);
    return String(optionValue) === String(value);
  });
  return getValueFromOption(result);
}