import {
  buildTree,
  isBalanced,
  rebalance,
  levelOrder,
  preOrder,
  postOrder,
  insert,
  prettyPrint,
  inOrder,
} from './main.js';

// Write a simple driver script that does the following:
// Create a binary search tree from an array of random numbers. You can create a function that returns an array of random numbers every time you call it, if you wish.
const getRandomArray = (num, assignLen) =>
  Array.from({ length: assignLen }, () => Math.floor(Math.random() * num) + 1);

const randomNumbers = getRandomArray(100, 20);
const tree = buildTree(randomNumbers);
const prettyPrintTree = prettyPrint(tree);
// Confirm that the tree is balanced by calling isBalanced
const isBalanced1 = isBalanced(tree);
// Print out all elements in level, pre, post, and in order
const printLevelOrder = levelOrder(tree);
const printPreOrder = preOrder(tree);
const printPostOrder = postOrder(tree);
const printInOrder = inOrder(tree);
console.log({
  prettyPrintTree,
  isBalanced1,
  printLevelOrder,
  printPreOrder,
  printPostOrder,
  printInOrder,
});
// Unbalance the tree by adding several numbers > 100
insert(120);
insert(130);
insert(140);
// Confirm that the tree is unbalanced by calling isBalanced
const checkBalance2 = isBalanced(tree);
console.log({ checkBalance2 });
// Balance the tree by calling rebalance
const rebalanceTree = rebalance(tree);
console.log({ rebalanceTree });
// Confirm that the tree is balanced by calling isBalanced
const isBalanced2 = isBalanced(tree);
// Print out all elements in level, pre, post, and in order
const printPreOrder2 = preOrder(tree);
const printPostOrder2 = postOrder(tree);
const printInOrder2 = inOrder(tree);
const printLevelOrder2 = levelOrder(tree);

console.log({
  isBalanced2,
  printLevelOrder2,
  printPreOrder2,
  printPostOrder2,
  printInOrder2,
});
