import { GridLinkOperator } from '../../../models/gridFilterItem';
export var getDefaultGridFilterModel = function getDefaultGridFilterModel() {
  return {
    items: [],
    linkOperator: GridLinkOperator.And
  };
};