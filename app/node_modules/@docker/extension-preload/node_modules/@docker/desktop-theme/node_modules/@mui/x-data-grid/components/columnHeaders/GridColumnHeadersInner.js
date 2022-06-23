import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["isDragging", "className"];
import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gridClasses, getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    isDragging,
    hasScrollX,
    classes
  } = ownerState;
  const slots = {
    root: ['columnHeadersInner', isDragging && 'columnHeaderDropZone', hasScrollX && 'columnHeadersInner--scrollable']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridColumnHeadersInnerRoot = styled('div', {
  name: 'MuiDataGrid',
  slot: 'columnHeadersInner',
  overridesResolver: (props, styles) => [{
    [`&.${gridClasses.columnHeaderDropZone}`]: styles.columnHeaderDropZone
  }, styles.columnHeadersInner]
})(() => ({
  display: 'flex',
  alignItems: 'center',
  [`&.${gridClasses.columnHeaderDropZone} .${gridClasses.columnHeaderDraggableContainer}`]: {
    cursor: 'move'
  },
  [`&.${gridClasses['columnHeadersInner--scrollable']} .${gridClasses.columnHeader}:last-child`]: {
    borderRight: 'none'
  }
}));
export const GridColumnHeadersInner = /*#__PURE__*/React.forwardRef(function GridColumnHeadersInner(props, ref) {
  var _apiRef$current$getRo, _apiRef$current$getRo2;

  const {
    isDragging,
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const ownerState = {
    isDragging,
    hasScrollX: (_apiRef$current$getRo = (_apiRef$current$getRo2 = apiRef.current.getRootDimensions()) == null ? void 0 : _apiRef$current$getRo2.hasScrollX) != null ? _apiRef$current$getRo : false,
    classes: rootProps.classes
  };
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(GridColumnHeadersInnerRoot, _extends({
    ref: ref,
    className: clsx(className, classes.root)
  }, other));
});