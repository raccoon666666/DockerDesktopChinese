import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef"];
import * as React from 'react';
import PropTypes from 'prop-types';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { unstable_useId as useId } from '@mui/material/utils';
import { getValueFromOption } from './filterPanelUtils';
import { jsx as _jsx } from "react/jsx-runtime";

var isOptionEqualToValue = function isOptionEqualToValue(option, value) {
  return getValueFromOption(option) === getValueFromOption(value);
};

var filter = createFilterOptions();

function GridFilterInputMultipleSingleSelect(props) {
  var item = props.item,
      applyValue = props.applyValue,
      type = props.type,
      apiRef = props.apiRef,
      focusElementRef = props.focusElementRef,
      other = _objectWithoutProperties(props, _excluded);

  var id = useId();
  var resolvedColumn = item.columnField ? apiRef.current.getColumn(item.columnField) : null;
  var resolvedValueOptions = React.useMemo(function () {
    return typeof (resolvedColumn == null ? void 0 : resolvedColumn.valueOptions) === 'function' ? resolvedColumn.valueOptions({
      field: resolvedColumn.field
    }) : resolvedColumn == null ? void 0 : resolvedColumn.valueOptions;
  }, [resolvedColumn]);
  var resolvedFormattedValueOptions = React.useMemo(function () {
    return resolvedValueOptions == null ? void 0 : resolvedValueOptions.map(getValueFromOption);
  }, [resolvedValueOptions]);

  var _apiRef$current$getCo = apiRef.current.getColumn(item.columnField),
      valueFormatter = _apiRef$current$getCo.valueFormatter,
      field = _apiRef$current$getCo.field;

  var filterValueOptionFormatter = function filterValueOptionFormatter(option) {
    if (_typeof(option) === 'object') {
      return option.label;
    }

    return valueFormatter && option !== '' ? valueFormatter({
      value: option,
      field: field,
      api: apiRef.current
    }) : option;
  }; // The value is computed from the item.value and used directly
  // If it was done by a useEffect/useState, the Autocomplete could receive incoherent value and options


  var filterValues = React.useMemo(function () {
    if (!Array.isArray(item.value)) {
      return [];
    }

    if (resolvedValueOptions !== undefined) {
      var itemValueIndexes = item.value.map(function (element) {
        // get the index matching between values and valueoptions
        var formattedElement = getValueFromOption(element);
        var index = (resolvedFormattedValueOptions == null ? void 0 : resolvedFormattedValueOptions.findIndex(function (formatedOption) {
          return formatedOption === formattedElement;
        })) || 0;
        return index;
      });
      return itemValueIndexes.filter(function (index) {
        return index >= 0;
      }).map(function (index) {
        return resolvedValueOptions[index];
      });
    }

    return item.value;
  }, [item.value, resolvedValueOptions, resolvedFormattedValueOptions]);
  React.useEffect(function () {
    if (!Array.isArray(item.value) || filterValues.length !== item.value.length) {
      // update the state if the filter value has been cleaned by the component
      applyValue(_extends({}, item, {
        value: filterValues.map(getValueFromOption)
      }));
    }
  }, [item, filterValues, applyValue]);
  var handleChange = React.useCallback(function (event, value) {
    applyValue(_extends({}, item, {
      value: _toConsumableArray(value.map(getValueFromOption))
    }));
  }, [applyValue, item]);
  return /*#__PURE__*/_jsx(Autocomplete, _extends({
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
    renderTags: function renderTags(value, getTagProps) {
      return value.map(function (option, index) {
        return /*#__PURE__*/_jsx(Chip, _extends({
          variant: "outlined",
          size: "small",
          label: filterValueOptionFormatter(option)
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
        type: 'singleSelect',
        variant: "standard"
      }));
    }
  }, other));
}

process.env.NODE_ENV !== "production" ? GridFilterInputMultipleSingleSelect.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired
  }).isRequired,
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
  type: PropTypes.oneOf(['singleSelect'])
} : void 0;
export { GridFilterInputMultipleSingleSelect };