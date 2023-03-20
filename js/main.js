// 1. Build a Node class / factory. It should have an attribute for the data it stores as well as its left and right children.
const nodeFactory = (data, left = null, right = null) => {
  return {
    data,
    left,
    right,
  };
};

// 2. Build a Tree class / factory which accepts an array when initialized. The Tree class should have a root attribute which uses the return value of buildTree which you’ll write next.
const treeFactory = arr => {
  let root = buildTree(arr);

  return {
    root,
  };
};

// 3. Write a buildTree function which takes an array of data (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
const buildTree = arr => {
  if (arr.length === 0) return null;

  let sortedArray = sortArray(arr);
  let start = 0;
  let end = arr.length - 1;

  let mid = Math.floor((start + end) / 2);

  let root = nodeFactory(sortedArray[mid]);

  root.left = buildTree(sortedArray.slice(start, mid)); // arg left
  root.right = buildTree(sortedArray.slice(mid + 1)); // arg right

  return root;
};

// 4. Write an insert and delete function which accepts a value to insert/delete (you’ll have to deal with several cases for delete such as when a node has children or not). If you need additional resources, check out these two articles on inserting and deleting, or this video with several visual examples.
const insert = (node, value) => {
  if (!node) return nodeFactory(value);

  if (value === node.data) {
    return node;
  } else if (value < node.data) {
    if (!node.left) {
      node.left = nodeFactory(value);
    } else {
      insert(node.left, value);
    }
  } else if (value > node.data) {
    if (!node.right) {
      node.right = nodeFactory(value);
    } else {
      insert(node.right, value);
    }
  }
  return node;
};

const deleteNode = (node, value) => {
  if (node === null) return node;

  if (value < node.data) {
    node.left = deleteNode(node.left, value);
  } else if (value > node.data) {
    node.right = deleteNode(node.right, value);
  } else {
    if (node.left === null) {
      return node.right;
    } else if (node.right === null) {
      return node.left;
    }

    let minNode = findMinNode(node.right);
    node.data = minNode.data;
    node.right = deleteNode(node.right, minNode.data);
  }

  return node;
};

// 5. Write a find function which accepts a value and returns the node with the given value.
const find = (node, value) => {
  if (node === null) return node;

  if (node.data === value) return value;

  if (value < node.data) {
    return find(node.left, value);
  } else {
    return find(node.right, value);
  }
};

// 6. Write a levelOrder function which accepts another function as a parameter. levelOrder should traverse the tree in breadth-first level order and provide each node as the argument to the provided function. This function can be implemented using either iteration or recursion (try implementing both!). The method should return an array of values if no function is given. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list.
// Breadth first
const levelOrder = (node, callbackFunc) => {
  if (node === null) return node;

  let queue = [node];
  let arr = [];

  while (queue.length > 0) {
    let node = queue.shift();
    arr.push(node.data);

    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
  }

  return arr;
};

// 7. Write inorder (left, root, right), preorder (root, left, right), and postorder (left, right, root) functions that accept a function parameter. Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided function given as an argument. The functions should return an array of values if no function is given.
const inOrder = (node, callbackFunc) => {
  let result = [];

  if (node === null) return result;

  if (node.left !== null)
    result = [...result, ...inOrder(node.left, callbackFunc)];

  result.push(node.data);

  if (node.right !== null)
    result = [...result, ...inOrder(node.right, callbackFunc)];

  return result;
};

const preOrder = (node, callbackFunc) => {
  let result = [];

  if (node === null) return result;

  result.push(node.data);

  if (node.left !== null)
    result = [...result, ...preOrder(node.left, callbackFunc)];
  if (node.right !== null)
    result = [...result, ...preOrder(node.right, callbackFunc)];

  return result;
};

const postOrder = (node, callbackFunc) => {
  let result = [];

  if (node === null) return result;

  if (node.left !== null)
    result = [...result, ...postOrder(node.left, callbackFunc)];
  if (node.right !== null)
    result = [...result, ...postOrder(node.right, callbackFunc)];

  result.push(node.data);

  return result;
};

// 8. Write a height function which accepts a node and returns its height. Height is defined as the number of edges in longest path from a given node to a leaf node.
const height = node => {
  if (node === null) return 0;

  let leftHeight = height(node.left);
  let rightHeight = height(node.right);

  return 1 + Math.max(leftHeight, rightHeight);
};

// 9. Write a depth function which accepts a node and returns its depth. Depth is defined as the number of edges in path from a given node to the tree’s root node.
const depth = node => {
  if (!node) return 0;

  let leftDepth = depth(node.left);
  let rightDepth = depth(node.right);

  return Math.max(leftDepth, rightDepth) + 1;
};

// 10. Write a isBalanced function which checks if the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.
const isBalanced = node => {
  if (node === null) return true;

  let leftHeight = height(node.left);
  let rightHeight = height(node.right);

  if (
    leftHeight - rightHeight <= 1 &&
    isBalanced(node.left) &&
    isBalanced(node.right)
  ) {
    return true;
  } else {
    return false;
  }
};

// 11. Write a rebalance function which rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
// Steps to write a rebalance function:

const rebalance = node => {
  if (node === null) return null;
  if (isBalanced(node)) return node;

  let callOrder = inOrder(node, logNode);
  let balancedTree = buildTree(callOrder);

  return balancedTree;
};

// Helper functions
const sortArray = arr => {
  return [...new Set(arr)].sort((a, b) => a - b);
};

const logNode = node => {
  console.log(node.data);
};

const findMinNode = node => {
  while (node.left !== null) node = node.left;

  return node;
};

// prettyPrint() function will console.log your tree in a structured format. This function will expect to receive the root of your tree as the value for the node parameter.
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
  return `Root is ${node.data}`;
};

const array1 = [
  50, 30, 20, 70, 80, 85, 75, 60, 65, 40, 32, 34, 36, 36, 75, 85, 90, 91, 92,
  93, 94, 95, 120,
];
const tree1 = treeFactory(array1);
const root = tree1.root;
const insert1 = insert(root, 25);
const remove = deleteNode(root, 34);
const find1 = find(root, 50); // true
const find2 = find(root, 10); // false
const callLevelOrder = levelOrder(root, logNode);
const printTree1 = prettyPrint(root);
const array2 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const tree2 = treeFactory(array2);
const root2 = tree2.root;
const insert2 = insert(root2, 12);
const remove2 = deleteNode(root2, 7);
const find3 = find(root2, 6); // true
const find4 = find(root2, 50); // false
const callLevelOrder2 = levelOrder(root2);
const logCallback2 = levelOrder(root2, logNode);
const inOrder2 = inOrder(root2, logNode);
const preOrder2 = preOrder(root2, logNode);
const postOrder2 = postOrder(root2, logNode);
const height2 = height(root2);
const depth2 = depth(root2);
const balanced = isBalanced(root2);
const rebalance2 = rebalance(root);
const printTree2 = prettyPrint(root2);
console.log({ find1, find2, insert1, remove, printTree1, callLevelOrder });
console.log({
  find3,
  find4,
  insert2,
  remove2,
  callLevelOrder2,
  logCallback2,
  inOrder2,
  preOrder2,
  postOrder2,
  height2,
  depth2,
  balanced,
  rebalance2,
  printTree2,
});
