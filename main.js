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
const levelOrder = (node, callbackFunc = null) => {
  if (node === null) return node;

  let queue = [node];
  let arr = [];

  while (queue.length > 0) {
    let node = queue.shift();
    arr.push(node.data);

    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }

  return arr;
};

// Helper functions
const sortArray = arr => {
  return [...new Set(arr)].sort((a, b) => a - b);
};

const findMinNode = node => {
  while (node.left !== null) {
    node = node.left;
  }

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

const array1 = [50, 30, 20, 70, 80, 85, 75, 60, 65, 40, 32, 34, 36, 36, 75, 85];
const tree2 = treeFactory(array1);
const root = tree2.root;
const insert1 = insert(root, 25);
const remove = deleteNode(root, 34);
const callLevelOrder = levelOrder(root);
const find1 = find(root, 50);
const find2 = find(root, 10);
const printTree2 = prettyPrint(tree2.root);
console.log({ find1, find2, insert1, remove, printTree2, callLevelOrder });
