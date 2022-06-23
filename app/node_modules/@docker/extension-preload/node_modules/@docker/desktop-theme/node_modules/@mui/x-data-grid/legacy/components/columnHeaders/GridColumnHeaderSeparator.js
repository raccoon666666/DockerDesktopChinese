import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["resizable", "resizing", "height", "side"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { capitalize } from '@mui/material/utils';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
var GridColumnHeaderSeparatorSides;

(function (GridColumnHeaderSeparatorSides) {
  GridColumnHeaderSeparatorSides["Left"] = "left";
  GridColumnHeaderSeparatorSides["Right"] = "right";
})(GridColumnHeaderSeparatorSides || (GridColumnHeaderSeparatorSides = {}));

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var resizable = ownerState.resizable,
      resizing = ownerState.resizing,
      classes = ownerState.classes,
      side = ownerState.side;
  var slots = {
    root: ['columnSeparator', resizable && 'columnSeparator--resizable', resizing && 'columnSeparator--resizing', side && "columnSeparator--side".concat(capitalize(side))],
    icon: ['iconSeparator']
  };
  return composeClasses(slots, getDataGridUtilityClass, classes);
};

function GridColumnHeaderSeparatorRaw(props) {
  var resizable = props.resizable,
      resizing = props.resizing,
      height = props.height,
      _props$side = props.side,
      side = _props$side === void 0 ? GridColumnHeaderSeparatorSides.Right : _props$side,
      other = _objectWithoutProperties(props, _excluded);

  var rootProps = useGridRootProps();

  var ownerState = _extends({}, props, {
    side: side,
    classes: rootProps.classes
  });

  var classes = useUtilityClasses(ownerState);
  var stopClick = React.useCallback(function (event) {
    event.preventDefault();
    event.stopPropagation();
  }, []);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    _jsx("div", _extends({
      className: classes.root,
      style: {
        minHeight: height,
        opacity: rootProps.showColumnRightBorder ? 0 : 1
      }
    }, other, {
      onClick: stopClick,
      children: /*#__PURE__*/_jsx(rootProps.components.ColumnResizeIcon, {
        className: classes.icon
      })
    }))
  );
}

var GridColumnHeaderSeparator = /*#__PURE__*/React.memo(GridColumnHeaderSeparatorRaw);
process.env.NODE_ENV !== "production" ? GridColumnHeaderSeparatorRaw.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  height: PropTypes.number.isRequired,
  resizable: PropTypes.bool.isRequired,
  resizing: PropTypes.bool.isRequired,
  side: PropTypes.oneOf(['left', 'right'])
} : void 0;
export { GridColumnHeaderSeparator, GridColumnHeaderSeparatorSides };