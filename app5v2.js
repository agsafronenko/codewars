"use strict";

// Sudoku solver

// Simplifications:
// 4x4 field
// only rows and cols of 4 are checked, sqr are excluded

function sudoku(puzzle) {
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
      fullArr[j].push(
        "col" + (i + 1),
        "lastChangeInd:",
        0,
        "lastChangeDig:",
        0
      );
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
      for (let j = startingDigit; j <= 4; j++) {
        if (rowQ.includes(j) || colQ.includes(j)) {
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
    // fullArr: n, i, row, col, "lastIndex", lastInd, "lastDig", lastDig
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
  [0, 4, 3, 1],
  [1, 0, 2, 4],
];

sudoku(puzzle);
