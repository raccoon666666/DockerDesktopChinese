import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef", "InputProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@mui/material/utils';
import { GridLoadIcon } from '../../icons';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
export var SUBMIT_FILTER_DATE_STROKE_TIME = 500;

function GridFilterInputDate(props) {
  var _item$value, _rootProps$components;

  var item = props.item,
      applyValue = props.applyValue,
      type = props.type,
      apiRef = props.apiRef,
      focusElementRef = props.focusElementRef,
      InputProps = props.InputProps,
      other = _objectWithoutProperties(props, _excluded);

  var filterTimeout = React.useRef();

  var _React$useState = React.useState((_item$value = item.value) != null ? _item$value : ''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      filterValueState = _React$useState2[0],
      setFilterValueState = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      applying = _React$useState4[0],
      setIsApplying = _React$useState4[1];

  var id = useId();
  var rootProps = useGridRootProps();
  var onFilterChange = React.useCallback(function (event) {
    var value = event.target.value;
    clearTimeout(filterTimeout.current);
    setFilterValueState(String(value));
    setIsApplying(true);
    filterTimeout.current = setTimeout(function () {
      applyValue(_extends({}, item, {
        value: value
      }));
      setIsApplying(false);
    }, SUBMIT_FILTER_DATE_STROKE_TIME);
  }, [applyValue, item]);
  React.useEffect(function () {
    return function () {
      clearTimeout(filterTimeout.current);
    };
  }, []);
  React.useEffect(function () {
    var _item$value2;

    var itemValue = (_item$value2 = item.value) != null ? _item$value2 : '';
    setFilterValueState(String(itemValue));
  }, [item.value]);
  return /*#__PURE__*/_jsx(rootProps.components.BaseTextField, _extends({
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
    InputProps: _extends({}, applying ? {
      endAdornment: /*#__PURE__*/_jsx(GridLoadIcon, {})
    } : {}, InputProps, {
      inputProps: _extends({
        max: type === 'datetime-local' ? '9999-12-31T23:59' : '9999-12-31'
      }, InputProps == null ? void 0 : InputProps.inputProps)
    })
  }, other, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.baseTextField));
}

process.env.NODE_ENV !== "production" ? GridFilterInputDate.propTypes = {
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
  }).isRequired
} : void 0;
export { GridFilterInputDate };