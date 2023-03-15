// Build a Node class / factory. It should have an attribute for the data it stores as well as its left and right children.
const nodeFactory = (data, left = null, right = null) => {
  return {
    data,
    left,
    right,
  };
};

// Build a Tree class / factory which accepts an array when initialized. The Tree class should have a root attribute which uses the return value of buildTree which you’ll write next.

const treeFactory = arr => {
  let root = buildTree(arr);

  return {
    root,
  };
};

const buildTree = arr => {
  let sortedArray = [...new Set(arr)].sort((a, b) => a - b);

  if (sortedArray.length === 0) return null;
  // let sortedArray = array;
  let start = 0;
  let end = sortedArray.length - 1;
  if (start > end) return null;

  let mid = Math.floor(sortedArray.length / 2);

  let root = nodeFactory(sortedArray[mid]);

  root.left = buildTree(sortedArray.slice(start, mid));
  root.right = buildTree(sortedArray.slice(mid + 1));
  return root;
};

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const tree = treeFactory([9, 8, 7, 6, 5, 4, 3, 2, 1, 3, 1, 3, 1]);
const printTree = prettyPrint(tree.root);
console.log(printTree);

// private static TreeNode createBST (int[] array,
// int start, int end) (
// if (start›end) return null;
// int mid = (start + end) /2;
// TreeNode root = new TreeNode (array [mid]) ;
// root.setLeft (createBST (array, start, mid-1)); root. setRight (createBST (array, mid+1, end));
// return root;
// }
