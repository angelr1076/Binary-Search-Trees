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

// Write a buildTree function which takes an array of data (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
const buildTree = arr => {
  let sortedArray = [...new Set(arr)].sort((a, b) => a - b);

  if (sortedArray.length === 0) return null;
  let start = 0;

  let mid = Math.floor(sortedArray.length / 2);

  let root = nodeFactory(sortedArray[mid]);

  root.left = buildTree(sortedArray.slice(start, mid)); // arg left
  root.right = buildTree(sortedArray.slice(mid + 1)); // arg right

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

// const tree = treeFactory([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const tree2 = treeFactory([
  50, 30, 20, 70, 80, 85, 75, 60, 65, 40, 32, 34, 36, 36, 75, 85,
]);
// const printTree = prettyPrint(tree.root);
const printTree2 = prettyPrint(tree2.root);
// console.log(printTree);
console.log(printTree2);
