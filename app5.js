"use strict";

// DESCRIPTION:
// Write a function that will solve a 9x9 Sudoku puzzle. The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.

// The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) and can be solved with a brute-force approach.

function sudoku(puzzle) {
  // forming 27 arrays based on: 9 rows, 9 cols, 9 sqrs
  let row = [];
  let col = [];
  let sqr = [];
  let fullArr = puzzle.flat();
  fullArr = fullArr.map((x, i) => [x, i]); // assigning each number indiviual index [0, ..., 80]

  for (let i = 0; i < 9; i++) {
    // delete later as it just clone of argument
    row[i] = [];
    for (let j = 0 + i * 9; j < 9 + i * 9; j++) {
      fullArr[j].push(i);
      row[i].push(fullArr[j][0]);
    }
  }
  for (let i = 0; i < 9; i++) {
    col[i] = [];
    for (let j = 0 + i; j < 81; j = j + 9) {
      fullArr[j].push(i);
      col[i].push(fullArr[j][0]);
    }
  }
  for (let i = 0; i < 9; i++) {
    let l = i >= 6 ? 36 : i >= 3 ? 18 : 0; // makes a jump between 3rd/4th and 6th/7th squares
    sqr[i] = [];
    for (let j = l + i * 3; sqr[i].length < 9; j = j + 9) {
      for (let k = 0; k < 3; k++) {
        fullArr[j + k].push(i);
        sqr[i].push(fullArr[j + k][0]);
      }
    }
  }
  // console.log("set-up:", fullArr);
  // brute-force approach:

  solve(fullArr);
  function solve(arr) {
    for (let i = 0; i < arr.length; i++) {
      console.log("i", i, arr);
      if (arr[i][0] !== 0) {
        continue;
      } else {
        let rowQ = row[arr[i][2]];
        let colQ = col[arr[i][3]];
        let sqrQ = sqr[arr[i][4]];
        for (let j = 1; j <= 9; j++) {
          if (rowQ.includes(j) || colQ.includes(j) || sqrQ.includes(j)) {
            continue;
          } else {
            arr[i].splice(0, 1, j);
            break;
          }
        }
      }
    }
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
