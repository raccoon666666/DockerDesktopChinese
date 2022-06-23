"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFilterInputMultipleSingleSelect = GridFilterInputMultipleSingleSelect;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Autocomplete = _interopRequireWildcard(require("@mui/material/Autocomplete"));

var _Chip = _interopRequireDefault(require("@mui/material/Chip"));

var _TextField = _interopRequireDefault(require("@mui/material/TextField"));

var _utils = require("@mui/material/utils");

var _filterPanelUtils = require("./filterPanelUtils");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const isOptionEqualToValue = (option, value) => (0, _filterPanelUtils.getValueFromOption)(option) === (0, _filterPanelUtils.getValueFromOption)(value);

const filter = (0, _Autocomplete.createFilterOptions)();

function GridFilterInputMultipleSingleSelect(props) {
  const {
    item,
    applyValue,
    apiRef,
    focusElementRef
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const id = (0, _utils.unstable_useId)();
  const resolvedColumn = item.columnField ? apiRef.current.getColumn(item.columnField) : null;
  const resolvedValueOptions = React.useMemo(() => {
    return typeof (resolvedColumn == null ? void 0 : resolvedColumn.valueOptions) === 'function' ? resolvedColumn.valueOptions({
      field: resolvedColumn.field
    }) : resolvedColumn == null ? void 0 : resolvedColumn.valueOptions;
  }, [resolvedColumn]);
  const resolvedFormattedValueOptions = React.useMemo(() => {
    return resolvedValueOptions == null ? void 0 : resolvedValueOptions.map(_filterPanelUtils.getValueFromOption);
  }, [resolvedValueOptions]);
  const {
    valueFormatter,
    field
  } = apiRef.current.getColumn(item.columnField);

  const filterValueOptionFormatter = option => {
    if (typeof option === 'object') {
      return option.label;
    }

    return valueFormatter && option !== '' ? valueFormatter({
      value: option,
      field,
      api: apiRef.current
    }) : option;
  }; // The value is computed from the item.value and used directly
  // If it was done by a useEffect/useState, the Autocomplete could receive incoherent value and options


  const filterValues = React.useMemo(() => {
    if (!Array.isArray(item.value)) {
      return [];
    }

    if (resolvedValueOptions !== undefined) {
      const itemValueIndexes = item.value.map(element => {
        // get the index matching between values and valueoptions
        const formattedElement = (0, _filterPanelUtils.getValueFromOption)(element);
        const index = (resolvedFormattedValueOptions == null ? void 0 : resolvedFormattedValueOptions.findIndex(formatedOption => formatedOption === formattedElement)) || 0;
        return index;
      });
      return itemValueIndexes.filter(index => index >= 0).map(index => resolvedValueOptions[index]);
    }

    return item.value;
  }, [item.value, resolvedValueOptions, resolvedFormattedValueOptions]);
  React.useEffect(() => {
    if (!Array.isArray(item.value) || filterValues.length !== item.value.length) {
      // update the state if the filter value has been cleaned by the component
      applyValue((0, _extends2.default)({}, item, {
        value: filterValues.map(_filterPanelUtils.getValueFromOption)
      }));
    }
  }, [item, filterValues, applyValue]);
  const handleChange = React.useCallback((event, value) => {
    applyValue((0, _extends2.default)({}, item, {
      value: [...value.map(_filterPanelUtils.getValueFromOption)]
    }));
  }, [applyValue, item]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Autocomplete.default, (0, _extends2.default)({
    multiple: true,
    freeSolo: false,
    limitTags: 1,
    options: resolvedValueOptions // TODO: avoid `any`?
    ,
    isOptionEqualToValue: isOptionEqualToValue,
    filterOptions: filter,
    id: id,
    value: filterValues,
    onChange: handleChange,
    renderTags: (value, getTagProps) => value.map((option, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chip.default, (0, _extends2.default)({
      variant: "outlined",
      size: "small",
      label: filterValueOptionFormatter(option)
    }, getTagProps({
      index
    })))),
    renderInput: params => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextField.default, (0, _extends2.default)({}, params, {
      label: apiRef.current.getLocaleText('filterPanelInputLabel'),
      placeholder: apiRef.current.getLocaleText('filterPanelInputPlaceholder'),
      InputLabelProps: (0, _extends2.default)({}, params.InputLabelProps, {
        shrink: true
      }),
      inputRef: focusElementRef,
      type: 'singleSelect',
      variant: "standard"
    }))
  }, other));
}

process.env.NODE_ENV !== "production" ? GridFilterInputMultipleSingleSelect.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: _propTypes.default.shape({
    current: _propTypes.default.object.isRequired
  }).isRequired,
  applyValue: _propTypes.default.func.isRequired,
  focusElementRef: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.func, _propTypes.default.object]),
  item: _propTypes.default.shape({
    columnField: _propTypes.default.string.isRequired,
    id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    operatorValue: _propTypes.default.string,
    value: _propTypes.default.any
  }).isRequired,
  type: _propTypes.default.oneOf(['singleSelect'])
} : void 0;