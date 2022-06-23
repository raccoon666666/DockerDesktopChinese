import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef"];
import * as React from 'react';
import PropTypes from 'prop-types';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { unstable_useId as useId } from '@mui/material/utils';
import { getValueFromOption } from './filterPanelUtils';
import { jsx as _jsx } from "react/jsx-runtime";

const isOptionEqualToValue = (option, value) => getValueFromOption(option) === getValueFromOption(value);

const filter = createFilterOptions();

function GridFilterInputMultipleSingleSelect(props) {
  const {
    item,
    applyValue,
    apiRef,
    focusElementRef
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const id = useId();
  const resolvedColumn = item.columnField ? apiRef.current.getColumn(item.columnField) : null;
  const resolvedValueOptions = React.useMemo(() => {
    return typeof resolvedColumn?.valueOptions === 'function' ? resolvedColumn.valueOptions({
      field: resolvedColumn.field
    }) : resolvedColumn?.valueOptions;
  }, [resolvedColumn]);
  const resolvedFormattedValueOptions = React.useMemo(() => {
    return resolvedValueOptions?.map(getValueFromOption);
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
        const formattedElement = getValueFromOption(element);
        const index = resolvedFormattedValueOptions?.findIndex(formatedOption => formatedOption === formattedElement) || 0;
        return index;
      });
      return itemValueIndexes.filter(index => index >= 0).map(index => resolvedValueOptions[index]);
    }

    return item.value;
  }, [item.value, resolvedValueOptions, resolvedFormattedValueOptions]);
  React.useEffect(() => {
    if (!Array.isArray(item.value) || filterValues.length !== item.value.length) {
      // update the state if the filter value has been cleaned by the component
      applyValue(_extends({}, item, {
        value: filterValues.map(getValueFromOption)
      }));
    }
  }, [item, filterValues, applyValue]);
  const handleChange = React.useCallback((event, value) => {
    applyValue(_extends({}, item, {
      value: [...value.map(getValueFromOption)]
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
    renderTags: (value, getTagProps) => value.map((option, index) => /*#__PURE__*/_jsx(Chip, _extends({
      variant: "outlined",
      size: "small",
      label: filterValueOptionFormatter(option)
    }, getTagProps({
      index
    })))),
    renderInput: params => /*#__PURE__*/_jsx(TextField, _extends({}, params, {
      label: apiRef.current.getLocaleText('filterPanelInputLabel'),
      placeholder: apiRef.current.getLocaleText('filterPanelInputPlaceholder'),
      InputLabelProps: _extends({}, params.InputLabelProps, {
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