import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef"];
import * as React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { unstable_useId as useId } from '@mui/material/utils';
import { jsx as _jsx } from "react/jsx-runtime";

function GridFilterInputMultipleValue(props) {
  var item = props.item,
      applyValue = props.applyValue,
      type = props.type,
      apiRef = props.apiRef,
      focusElementRef = props.focusElementRef,
      other = _objectWithoutProperties(props, _excluded);

  var _React$useState = React.useState(item.value || []),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      filterValueState = _React$useState2[0],
      setFilterValueState = _React$useState2[1];

  var id = useId();
  React.useEffect(function () {
    var _item$value;

    var itemValue = (_item$value = item.value) != null ? _item$value : [];
    setFilterValueState(itemValue.map(String));
  }, [item.value]);
  var handleChange = React.useCallback(function (event, value) {
    setFilterValueState(value.map(String));
    applyValue(_extends({}, item, {
      value: _toConsumableArray(value)
    }));
  }, [applyValue, item]);
  return /*#__PURE__*/_jsx(Autocomplete, _extends({
    multiple: true,
    freeSolo: true,
    limitTags: 1,
    options: [],
    filterOptions: function filterOptions(options, params) {
      var inputValue = params.inputValue;
      return inputValue == null || inputValue === '' ? [] : [inputValue];
    },
    id: id,
    value: filterValueState,
    onChange: handleChange,
    renderTags: function renderTags(value, getTagProps) {
      return value.map(function (option, index) {
        return /*#__PURE__*/_jsx(Chip, _extends({
          variant: "outlined",
          size: "small",
          label: option
        }, getTagProps({
          index: index
        })));
      });
    },
    renderInput: function renderInput(params) {
      return /*#__PURE__*/_jsx(TextField, _extends({}, params, {
        label: apiRef.current.getLocaleText('filterPanelInputLabel'),
        placeholder: apiRef.current.getLocaleText('filterPanelInputPlaceholder'),
        InputLabelProps: _extends({}, params.InputLabelProps, {
          shrink: true
        }),
        inputRef: focusElementRef,
        type: type || 'text',
        variant: "standard"
      }));
    }
  }, other));
}

process.env.NODE_ENV !== "production" ? GridFilterInputMultipleValue.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: PropTypes.any.isRequired,
  applyValue: PropTypes.func.isRequired,
  focusElementRef: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.func, PropTypes.object]),
  item: PropTypes.shape({
    columnField: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    operatorValue: PropTypes.string,
    value: PropTypes.any
  }).isRequired,
  type: PropTypes.oneOf(['number', 'text'])
} : void 0;
export { GridFilterInputMultipleValue };