"use strict";

// DESCRIPTION:
// Write a function that will solve a 9x9 Sudoku puzzle. The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.

// The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) and can be solved with a brute-force approach.

function sudoku(puzzle) {
  let sqr = [];
  let changes = [];
  let fullArr = puzzle.flat();
  fullArr = fullArr.map((x, i) => [x, i]);

  for (let i = 0; i < 4; i++) {
    for (let j = 0 + i * 4; j < 4 + i * 4; j++) {
      fullArr[j].push("row" + (i + 1));
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0 + i; j < 16; j = j + 4) {
      fullArr[j].push("col" + (i + 1));
    }
  }

  for (let i = 0; i < 4; i++) {
    let l = i >= 2 ? 4 : 0; // makes a jump between 2nd/3rd squares
    sqr[i] = [];
    for (let j = l + i * 2; sqr[i].length < 4; j = j + 4) {
      for (let k = 0; k < 2; k++) {
        fullArr[j + k].push("sqr" + (i + 1));
        sqr[i].push("x"); // array requires to stop the loop once it's length reaches 4
      }
    }
  }

  // brute-force approach:
  let lastChangeIndex;
  let lastChangeDigit;

  findOneDigit(fullArr, 0, 1);

  function findOneDigit(fullArr, n, startingDigit) {
    if (n >= 16) {
      console.log("n >= 16", fullArr);
      return fullArr;
    }
    if (fullArr[n][0] !== 0) {
      findOneDigit(fullArr, n + 1, 1);
    } else {
      let indQ = fullArr[n];
      let rowQ = fullArr.filter((x) => x[2] === indQ[2]).map((x) => x[0]);
      let colQ = fullArr.filter((x) => x[3] === indQ[3]).map((x) => x[0]);
      let sqrQ = fullArr.filter((x) => x[4] === indQ[4]).map((x) => x[0]);
      for (let j = startingDigit; j <= 4; j++) {
        if (rowQ.includes(j) || colQ.includes(j) || sqrQ.includes(j)) {
          continue;
        } else {
          changes.push([fullArr[n][0], fullArr[n][1], j]);
          fullArr[n][0] = j;
          break;
        }
      }
      if (fullArr[n][0] === 0) {
        reverse(fullArr);
        findOneDigit(fullArr, lastChangeIndex, lastChangeDigit + 1);
      } else {
        findOneDigit(fullArr, n + 1, 1);
      }
    }
  }

  function reverse(fullArr) {
    let lastChange = changes.splice(changes.length - 1).flat();
    // lastChange: 0, 1, 2     dig bef, ind, dig aft
    // fullArr: n, i, row, col, sqr
    fullArr[lastChange[1]][0] = lastChange[0];
    lastChangeIndex = lastChange[1];
    lastChangeDigit = lastChange[2];
    return fullArr;
  }
}

// var puzzle = [
//   [1, 0, 0, 0],
//   [0, 0, 3, 0],
//   [0, 0, 4, 2],
//   [2, 0, 0, 4],
// ];
var puzzle = [
  [0, 0, 1, 0],
  [0, 0, 0, 0],
  [0, 4, 0, 0],
  [1, 0, 2, 4],
];

sudoku(puzzle);

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
