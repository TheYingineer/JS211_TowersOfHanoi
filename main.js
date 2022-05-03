'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {

   //to target the property startStack insdie of stake
   console.log(stacks[startStack], stacks[endStack])

   // remove last item from the start stack
  let lastItem = stacks[startStack].pop() 
  // console.log(stacks)
  console.log(lastItem)

   // add remove item to endStack
  stacks[endStack].push(lastItem)
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {

  //for as long as if Startstack is not empty
  if(stacks[startStack].length>0){
      //if endstack is empty, return it true that can you move
      if(stacks[endStack].length==0){
        return true;
      }

     // .slice(-1) is the last element in the array
     // below is to compare the last element in startstack with the last element in the endstack, 
     // if the first stack's very last element is smaller than the end stack's very last element, return true that you can move
      if(stacks[startStack].slice(-1)<stacks[endStack].slice(-1)){
        return true;
      }

      else{
        return false;
      }
  }

}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
//check and see if b[1 2 3 4] or c[1 2 3 4] both have all 4 element as in an array
// if the length of the array is equal to 4, then it's full. I don't need to know if it's legal anymore because
// islegal function took care of that already. 
  if((stacks["b"].length ==4)||(stacks["c"].length == 4)){
    console.log("Hey you won! :)")
    return true;
    }
    else{
      return false;
    }
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {

if(isLegal(startStack, endStack)){
    movePiece(startStack, endStack)
  } 
  checkForWin()
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
