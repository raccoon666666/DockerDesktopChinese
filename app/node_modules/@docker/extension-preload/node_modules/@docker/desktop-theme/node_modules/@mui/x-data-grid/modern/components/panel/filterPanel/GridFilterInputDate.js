import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["item", "applyValue", "type", "apiRef", "focusElementRef", "InputProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useId as useId } from '@mui/material/utils';
import { GridLoadIcon } from '../../icons';
import { useGridRootProps } from '../../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
export const SUBMIT_FILTER_DATE_STROKE_TIME = 500;

function GridFilterInputDate(props) {
  const {
    item,
    applyValue,
    type,
    apiRef,
    focusElementRef,
    InputProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const filterTimeout = React.useRef();
  const [filterValueState, setFilterValueState] = React.useState(item.value ?? '');
  const [applying, setIsApplying] = React.useState(false);
  const id = useId();
  const rootProps = useGridRootProps();
  const onFilterChange = React.useCallback(event => {
    const value = event.target.value;
    clearTimeout(filterTimeout.current);
    setFilterValueState(String(value));
    setIsApplying(true);
    filterTimeout.current = setTimeout(() => {
      applyValue(_extends({}, item, {
        value
      }));
      setIsApplying(false);
    }, SUBMIT_FILTER_DATE_STROKE_TIME);
  }, [applyValue, item]);
  React.useEffect(() => {
    return () => {
      clearTimeout(filterTimeout.current);
    };
  }, []);
  React.useEffect(() => {
    const itemValue = item.value ?? '';
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
      }, InputProps?.inputProps)
    })
  }, other, rootProps.componentsProps?.baseTextField));
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