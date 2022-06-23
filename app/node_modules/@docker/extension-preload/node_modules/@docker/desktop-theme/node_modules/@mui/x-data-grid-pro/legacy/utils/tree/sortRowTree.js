import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
export var sortRowTree = function sortRowTree(params) {
  var rowIds = params.rowIds,
      rowTree = params.rowTree,
      disableChildrenSorting = params.disableChildrenSorting,
      sortRowList = params.sortRowList;
  var sortedRows = []; // Group the rows by parent

  var groupedByParentRows = new Map([[null, []]]);

  for (var i = 0; i < rowIds.length; i += 1) {
    var rowId = rowIds[i];
    var node = rowTree[rowId];
    var group = groupedByParentRows.get(node.parent);

    if (!group) {
      group = [];
      groupedByParentRows.set(node.parent, group);
    }

    group.push(node);
  } // Apply the sorting to each list of children


  var sortedGroupedByParentRows = new Map();
  groupedByParentRows.forEach(function (rowList, parent) {
    if (rowList.length === 0) {
      sortedGroupedByParentRows.set(parent, []);
    } else {
      var depth = rowList[0].depth;

      if (depth > 0 && disableChildrenSorting) {
        sortedGroupedByParentRows.set(parent, rowList.map(function (row) {
          return row.id;
        }));
      } else if (!sortRowList) {
        sortedGroupedByParentRows.set(parent, rowList.map(function (row) {
          return row.id;
        }));
      } else {
        sortedGroupedByParentRows.set(parent, sortRowList(rowList));
      }
    }
  }); // Flatten the sorted lists to have children just after their parent

  var insertRowListIntoSortedRows = function insertRowListIntoSortedRows(startIndex, rowList) {
    sortedRows = [].concat(_toConsumableArray(sortedRows.slice(0, startIndex)), _toConsumableArray(rowList), _toConsumableArray(sortedRows.slice(startIndex)));
    var treeSize = 0;
    rowList.forEach(function (rowId) {
      treeSize += 1;
      var children = sortedGroupedByParentRows.get(rowId);

      if (children != null && children.length) {
        var subTreeSize = insertRowListIntoSortedRows(startIndex + treeSize, children);
        treeSize += subTreeSize;
      }
    });
    return treeSize;
  };

  insertRowListIntoSortedRows(0, sortedGroupedByParentRows.get(null));
  return sortedRows;
};