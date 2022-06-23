"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFilterInputValue = GridFilterInputValue;
exports.SUBMIT_FILTER_STROKE_TIME = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("@mui/material/utils");

var _icons = require("../../icons");

var _useGridRootProps = require("../../../hooks/utils/useGridRootProps");

var _filterPanelUtils = require("./filterPanelUtils");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const warnedOnce = {};

function warnDeprecatedTypeSupport(type) {
  console.warn([`MUI: Using GridFilterInputValue with a "${type}" column is deprecated.`, 'Use GridFilterInputSingleSelect instead.'].join('\n'));
  warnedOnce[type] = true;
}

const renderSingleSelectOptions = ({
  valueOptions,
  valueFormatter,
  field
}, api) => {
  const iterableColumnValues = typeof valueOptions === 'function' ? ['', ...valueOptions({
    field
  })] : ['', ...(valueOptions || [])];
  return iterableColumnValues.map(option => typeof option === 'object' ? /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
    value: option.value,
    children: option.label
  }, option.value) : /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
    value: option,
    children: valueFormatter && option !== '' ? valueFormatter({
      value: option,
      field,
      api
    }) : option
  }, option));
};

const SUBMIT_FILTER_STROKE_TIME = 500;
exports.SUBMIT_FILTER_STROKE_TIME = SUBMIT_FILTER_STROKE_TIME;

function GridFilterInputValue(props) {
  var _item$value, _rootProps$components;

  const {
    item,
    applyValue,
    type,
    apiRef,
    focusElementRef
  } = props,
        others = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);

  if (process.env.NODE_ENV !== 'production' && ['date', 'datetime-local', 'singleSelect'].includes(type) && !warnedOnce[type]) {
    warnDeprecatedTypeSupport(type);
  }

  const filterTimeout = React.useRef();
  const [filterValueState, setFilterValueState] = React.useState((_item$value = item.value) != null ? _item$value : '');
  const [applying, setIsApplying] = React.useState(false);
  const id = (0, _utils.unstable_useId)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const singleSelectProps = type === 'singleSelect' ? {
    select: true,
    SelectProps: {
      native: true
    },
    children: renderSingleSelectOptions(apiRef.current.getColumn(item.columnField), apiRef.current)
  } : {};
  const onFilterChange = React.useCallback(event => {
    let value = event.target.value; // NativeSelect casts the value to a string.

    if (type === 'singleSelect') {
      const column = apiRef.current.getColumn(item.columnField);
      const columnValueOptions = typeof column.valueOptions === 'function' ? column.valueOptions({
        field: column.field
      }) : column.valueOptions;
      value = (0, _filterPanelUtils.getValueFromValueOptions)(value, columnValueOptions);
    }

    clearTimeout(filterTimeout.current);
    setFilterValueState(String(value));
    setIsApplying(true); // TODO singleSelect doesn't debounce

    filterTimeout.current = setTimeout(() => {
      applyValue((0, _extends2.default)({}, item, {
        value
      }));
      setIsApplying(false);
    }, SUBMIT_FILTER_STROKE_TIME);
  }, [apiRef, applyValue, item, type]);
  React.useEffect(() => {
    return () => {
      clearTimeout(filterTimeout.current);
    };
  }, []);
  React.useEffect(() => {
    var _item$value2;

    const itemValue = (_item$value2 = item.value) != null ? _item$value2 : '';
    setFilterValueState(String(itemValue));
  }, [item.value]);
  const InputProps = applying ? {
    endAdornment: /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.GridLoadIcon, {})
  } : others.InputProps;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseTextField, (0, _extends2.default)({
    id: id,
    label: apiRef.current.getLocaleText('filterPanelInputLabel'),
    placeholder: apiRef.current.getLocaleText('filterPanelInputPlaceholder'),
    value: filterValueState,
    onChange: onFilterChange,
    type: type || 'text',
    variant: "standard",
    InputProps: InputProps,
    InputLabelProps: {
      shrink: true
    },
    inputRef: focusElementRef
  }, singleSelectProps, others, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseTextField));
}

process.env.NODE_ENV !== "production" ? GridFilterInputValue.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: _propTypes.default.any.isRequired,
  applyValue: _propTypes.default.func.isRequired,
  focusElementRef: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.func, _propTypes.default.object]),
  item: _propTypes.default.shape({
    columnField: _propTypes.default.string.isRequired,
    id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    operatorValue: _propTypes.default.string,
    value: _propTypes.default.any
  }).isRequired
} : void 0;