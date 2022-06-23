import * as React from 'react';
import { GridApiContext } from '../components/GridApiContext';
import { GridRootPropsContext } from './GridRootPropsContext';
import { jsx as _jsx } from "react/jsx-runtime";
export var GridContextProvider = function GridContextProvider(_ref) {
  var apiRef = _ref.apiRef,
      props = _ref.props,
      children = _ref.children;
  return /*#__PURE__*/_jsx(GridRootPropsContext.Provider, {
    value: props,
    children: /*#__PURE__*/_jsx(GridApiContext.Provider, {
      value: apiRef,
      children: children
    })
  });
};