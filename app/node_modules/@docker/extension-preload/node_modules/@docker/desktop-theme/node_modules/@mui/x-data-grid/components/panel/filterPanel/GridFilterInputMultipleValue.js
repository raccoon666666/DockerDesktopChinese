import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef"];
import * as React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { unstable_useId as useId } from '@mui/material/utils';
import { jsx as _jsx } from "react/jsx-runtime";

function GridFilterInputMultipleValue(props) {
  const {
    item,
    applyValue,
    type,
    apiRef,
    focusElementRef
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const [filterValueState, setFilterValueState] = React.useState(item.value || []);
  const id = useId();
  React.useEffect(() => {
    var _item$value;

    const itemValue = (_item$value = item.value) != null ? _item$value : [];
    setFilterValueState(itemValue.map(String));
  }, [item.value]);
  const handleChange = React.useCallback((event, value) => {
    setFilterValueState(value.map(String));
    applyValue(_extends({}, item, {
      value: [...value]
    }));
  }, [applyValue, item]);
  return /*#__PURE__*/_jsx(Autocomplete, _extends({
    multiple: true,
    freeSolo: true,
    limitTags: 1,
    options: [],
    filterOptions: (options, params) => {
      const {
        inputValue
      } = params;
      return inputValue == null || inputValue === '' ? [] : [inputValue];
    },
    id: id,
    value: filterValueState,
    onChange: handleChange,
    renderTags: (value, getTagProps) => value.map((option, index) => /*#__PURE__*/_jsx(Chip, _extends({
      variant: "outlined",
      size: "small",
      label: option
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
      type: type || 'text',
      variant: "standard"
    }))
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