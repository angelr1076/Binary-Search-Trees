// Write a simple driver script that does the following:

// Create a binary search tree from an array of random numbers. You can create a function that returns an array of random numbers every time you call it, if you wish.
const buildArray = (num, assignLen) => {
  let counter = 0;
  let arr = [];

  while (counter < assignLen) {
    let newNum = Math.floor(Math.random() * num) + 1;
    arr.push(newNum);
    counter++;
  }

  return arr;
};

const callBuild = buildArray(100, 20);
console.log(callBuild);
// Confirm that the tree is balanced by calling isBalanced
// Print out all elements in level, pre, post, and in order
// Unbalance the tree by adding several numbers > 100
// Confirm that the tree is unbalanced by calling isBalanced
// Balance the tree by calling rebalance
// Confirm that the tree is balanced by calling isBalanced
// Print out all elements in level, pre, post, and in order
