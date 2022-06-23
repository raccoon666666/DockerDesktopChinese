"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridFilterInputSingleSelect = GridFilterInputSingleSelect;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("@mui/material/utils");

var _useGridRootProps = require("../../../hooks/utils/useGridRootProps");

var _filterPanelUtils = require("./filterPanelUtils");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function GridFilterInputSingleSelect(props) {
  var _item$value, _rootProps$components;

  const {
    item,
    applyValue,
    type,
    apiRef,
    focusElementRef
  } = props,
        others = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const [filterValueState, setFilterValueState] = React.useState((_item$value = item.value) != null ? _item$value : '');
  const id = (0, _utils.unstable_useId)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const currentColumn = item.columnField ? apiRef.current.getColumn(item.columnField) : null;
  const currentValueOptions = React.useMemo(() => {
    return typeof currentColumn.valueOptions === 'function' ? currentColumn.valueOptions({
      field: currentColumn.field
    }) : currentColumn.valueOptions;
  }, [currentColumn]);
  const onFilterChange = React.useCallback(event => {
    let value = event.target.value; // NativeSelect casts the value to a string.

    value = (0, _filterPanelUtils.getValueFromValueOptions)(value, currentValueOptions);
    setFilterValueState(String(value));
    applyValue((0, _extends2.default)({}, item, {
      value
    }));
  }, [applyValue, item, currentValueOptions]);
  React.useEffect(() => {
    var _itemValue;

    let itemValue;

    if (currentValueOptions !== undefined) {
      // sanitize if valueOptions are provided
      itemValue = (0, _filterPanelUtils.getValueFromValueOptions)(item.value, currentValueOptions);

      if (itemValue !== item.value) {
        applyValue((0, _extends2.default)({}, item, {
          value: itemValue
        }));
        return;
      }
    } else {
      itemValue = item.value;
    }

    itemValue = (_itemValue = itemValue) != null ? _itemValue : '';
    setFilterValueState(String(itemValue));
  }, [item, currentValueOptions, applyValue]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.BaseTextField, (0, _extends2.default)({
    id: id,
    label: apiRef.current.getLocaleText('filterPanelInputLabel'),
    placeholder: apiRef.current.getLocaleText('filterPanelInputPlaceholder'),
    value: filterValueState,
    onChange: onFilterChange,
    type: type || 'text',
    variant: "standard",
    InputLabelProps: {
      shrink: true
    },
    inputRef: focusElementRef,
    select: true,
    SelectProps: {
      native: true
    }
  }, others, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseTextField, {
    children: renderSingleSelectOptions(apiRef.current.getColumn(item.columnField), apiRef.current)
  }));
}

process.env.NODE_ENV !== "production" ? GridFilterInputSingleSelect.propTypes = {
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