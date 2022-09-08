"use strict";

// DESCRIPTION:
// Write a function that will solve a 9x9 Sudoku puzzle. The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.

// The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) and can be solved with a brute-force approach.

// brute-force through loop (recursion will stuck at error "maximum call stack size exceeded")

function sudoku(puzzle) {
  // using arguments ("puzzle") to form full array: [digit, it's index, it's row, it's col, it's sqr]
  let fullArr = [];

  // making an array of all digits
  for (let i = 0; i < puzzle.length; i++) {
    fullArr = fullArr.concat(puzzle[i]); // using concat instead of flat() func as codewars don't consider flat() as a function
  }
  // fullArr = puzzle.flat();

  fullArr = fullArr.map((x, i) => [x, i]); // assigning each digit indiviual index [0, ..., 80]

  for (let i = 0; i < 9; i++) {
    // assigning each digit it's row
    for (let j = 0 + i * 9; j < 9 + i * 9; j++) {
      fullArr[j].push("row" + (i + 1));
    }
  }
  for (let i = 0; i < 9; i++) {
    // assigning each digit it's column
    for (let j = 0 + i; j < 81; j = j + 9) {
      fullArr[j].push("col" + (i + 1));
    }
  }

  let sqr = []; // assigning each digit it's square
  for (let i = 0; i < 9; i++) {
    let l = i >= 6 ? 36 : i >= 3 ? 18 : 0; // makes a jump between 3rd/4th and 6th/7th squares
    sqr[i] = [];
    for (let j = l + i * 3; sqr[i].length < 9; j = j + 9) {
      for (let k = 0; k < 3; k++) {
        fullArr[j + k].push("sqr" + (i + 1));
        sqr[i].push("x"); // array requires to stop the loop once it's length reaches 9
      }
    }
  }

  let changes = []; // storing all changes made to "puzzle"
  let lastChangeIndex; // storing the index of the last changed digit
  let lastChangeDigit; // storing the last digit that was changed
  let startingDigit = 1; // brute-force for a digit will start from this value (1: by default; lastChangeDigit + 1: in case the last changed digit led to breaking sudoku rules)

  for (let n = 0; n < 81; n++) {
    // brute-forcing
    if (fullArr[n][0] !== 0) {
      // pass the digits that were predifined at start
      startingDigit = 1;
      continue;
    } else {
      let indQ = fullArr[n]; // define row, col and sqr of the digit to be brute-forced
      let rowQ = fullArr.filter((x) => x[2] === indQ[2]).map((x) => x[0]);
      let colQ = fullArr.filter((x) => x[3] === indQ[3]).map((x) => x[0]);
      let sqrQ = fullArr.filter((x) => x[4] === indQ[4]).map((x) => x[0]);
      for (let j = startingDigit; j <= 9; j++) {
        if (rowQ.includes(j) || colQ.includes(j) || sqrQ.includes(j)) {
          // if the new value of the digit contradict the sudoku rules, continue with the next value
          continue;
        } else {
          changes.push([fullArr[n][0], fullArr[n][1], j]); // if the new value of the digit doesn't contradict the sudoku rules, set this value for the digit
          fullArr[n][0] = j;
          break;
        }
      }
      if (fullArr[n][0] === 0) {
        if (changes.length === 0) {
          // check whether the sudoku can be solved
          return "Check your digits! With current digits sudoku can't be solved.";
        }
        reverse(fullArr); // if all digits contradict the sudoku rules, revert the last change and continue brute-forcing for the last changed digit (not from default value "1", but from "lastChangedDigit + 1"):
        n = lastChangeIndex - 1;
        startingDigit = lastChangeDigit + 1;
      } else {
        startingDigit = 1;
      }
    }
  }

  function reverse(fullArr) {
    // revert fullArr to the state before the last change and delete the record of the last change from changes array
    // let lastChange = changes.splice(changes.length - 1).flat();
    let lastChange = [].concat(...changes.splice(changes.length - 1)); // using concat instead of flat() func as codewars don't consider flat() as a function
    fullArr[lastChange[1]][0] = lastChange[0];
    lastChangeIndex = lastChange[1];
    lastChangeDigit = lastChange[2];
    return fullArr;
  }

  let digitsOnly = fullArr.map((x) => x[0]); // make a 2D array from the final version of fullArr
  let finalArr = [];
  makesNineArrays(digitsOnly);
  function makesNineArrays(digitsOnly) {
    if (digitsOnly.length === 0) {
      return finalArr;
    } else {
      finalArr.push(digitsOnly.splice(0, 9));
      makesNineArrays(digitsOnly);
    }
  }

  return finalArr;
}

var puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

console.log(sudoku(puzzle));

/* Should return
[[5,3,4,6,7,8,9,1,2],
[6,7,2,1,9,5,3,4,8],
[1,9,8,3,4,2,5,6,7],
[8,5,9,7,6,1,4,2,3],
[4,2,6,8,5,3,7,9,1],
[7,1,3,9,2,4,8,5,6],
[9,6,1,5,3,7,2,8,4],
[2,8,7,4,1,9,6,3,5],
[3,4,5,2,8,6,1,7,9]] */
