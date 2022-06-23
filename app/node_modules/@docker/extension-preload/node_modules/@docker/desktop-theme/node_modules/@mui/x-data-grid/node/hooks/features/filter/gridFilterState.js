"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultGridFilterModel = void 0;

var _gridFilterItem = require("../../../models/gridFilterItem");

const getDefaultGridFilterModel = () => ({
  items: [],
  linkOperator: _gridFilterItem.GridLinkOperator.And
});

exports.getDefaultGridFilterModel = getDefaultGridFilterModel;