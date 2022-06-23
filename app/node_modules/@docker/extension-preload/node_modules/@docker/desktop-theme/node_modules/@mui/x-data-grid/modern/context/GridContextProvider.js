import * as React from 'react';
import { GridApiContext } from '../components/GridApiContext';
import { GridRootPropsContext } from './GridRootPropsContext';
import { jsx as _jsx } from "react/jsx-runtime";
export const GridContextProvider = ({
  apiRef,
  props,
  children
}) => {
  return /*#__PURE__*/_jsx(GridRootPropsContext.Provider, {
    value: props,
    children: /*#__PURE__*/_jsx(GridApiContext.Provider, {
      value: apiRef,
      children: children
    })
  });
};