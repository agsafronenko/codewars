"use strict";

// DESCRIPTION:
// Write a function that will solve a 9x9 Sudoku puzzle. The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.

// The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) and can be solved with a brute-force approach.

function sudoku(puzzle) {
  let sqr = [];
  let changes = [];
  let fullArr = puzzle.flat();
  fullArr = fullArr.map((x, i) => [x, i]); // assigning each number indiviual index [0, ..., 80]

  for (let i = 0; i < 9; i++) {
    for (let j = 0 + i * 9; j < 9 + i * 9; j++) {
      fullArr[j].push("row" + (i + 1));
    }
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0 + i; j < 81; j = j + 9) {
      fullArr[j].push("col" + (i + 1));
    }
  }
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

  // brute-force approach:
  let lastChangeIndex;
  let lastChangeDigit;

  findOneDigit(fullArr, 0, 1);

  function findOneDigit(fullArr, n, startingDigit) {
    if (n >= 81) {
      console.log("n >= 81", fullArr);
      return fullArr;
    }
    if (fullArr[n][0] !== 0) {
      findOneDigit(fullArr, n + 1, 1);
    } else {
      let indQ = fullArr[n];
      let rowQ = fullArr.filter((x) => x[2] === indQ[2]).map((x) => x[0]);
      let colQ = fullArr.filter((x) => x[3] === indQ[3]).map((x) => x[0]);
      let sqrQ = fullArr.filter((x) => x[4] === indQ[4]).map((x) => x[0]);
      for (let j = startingDigit; j <= 9; j++) {
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

// solve(fullArr);
//   function solve(arr) {
//     for (let i = 0; i < arr.length; i++) {
//       console.log("i", i, arr);
//       if (arr[i][0] !== 0) {
//         continue;
//       } else {
//         let rowQ = row[arr[i][2]];
//         let colQ = col[arr[i][3]];
//         let sqrQ = sqr[arr[i][4]];
//         for (let j = 1; j <= 9; j++) {
//           if (rowQ.includes(j) || colQ.includes(j) || sqrQ.includes(j)) {
//             continue;
//           } else {
//             arr[i].splice(0, 1, j);
//             break;
//           }
//         }
//       }
//     }
//   }
