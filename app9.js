"use strict";

// In a grid of 6 by 6 squares you want to place a skyscraper in each square with only some clues:

// The height of the skyscrapers is between 1 and 6
// No two skyscrapers in a row or column may have the same number of floors
// A clue is the number of skyscrapers that you can see in a row or column from the outside
// Higher skyscrapers block the view of lower skyscrapers located behind them

// Can you write a program that can solve each 6 by 6 puzzle?

// Example:

// To understand how the puzzle works, this is an example of a row with 2 clues. Seen from the left there are 6 buildings visible while seen from the right side only 1:

//  6	  	  	  	  	  	  	 1

// There is only one way in which the skyscrapers can be placed. From left-to-right all six buildings must be visible and no building may hide behind another building:

//  6	 1	 2	 3	 4	 5	 6	 1

// Example of a 6 by 6 puzzle with the solution:

//   	   	   	   	2	2

//  3
//   	  	  	  	  	  	  	 6
//  4	  	  	  	  	  	  	 3
//  4
//   	  	  	  	  	4

//   	  	  	  	 2	 2
//   	 5	 6	 1	 4	 3	 2
//   	 4	 1	 3	 2	 6	 5
//  3	 2	 3	 6	 1	 5	 4
//   	 6	 5	 4	 3	 2	 1	 6
//  4	 1	 2	 5	 6	 4	 3	 3
//  4	 3	 4	 2	 5	 1	 6
//   	  	  	  	  	4

// Task:

// Finish:
// function solvePuzzle(clues)
// Pass the clues in an array of 24 items. The clues are in the array around the clock. Index:
//   	 0	 1	 2	 3	 4	 5
//  23	  	  	  	  	  	  	 6
//  22	  	  	  	  	  	  	 7
//  21	  	  	  	  	  	  	 8
//  20	  	  	  	  	  	  	 9
//  19	  	  	  	  	  	  	 10
//  18	  	  	  	  	  	  	 11
//   	17	16	15	14	13	12
// If no clue is available, add value `0`
// Each puzzle has only one possible solution
// `SolvePuzzle()` returns matrix `int[][]`. The first indexer is for the row, the second indexer for the column. Python returns a 6-tuple of 6-tuples, Ruby a 6-Array of 6-Arrays.

function solvePuzzle(clues) {
  // clues = clues.map((x) => (x === 0 ? 9 : x));
  let fullArr = Array(36).fill(0);
  fullArr = fullArr.map((x, i) => [x, i]); // assigning each digit indiviual index [0, ..., 80]

  // assigning each digit it's row
  for (let i = 0; i < 6; i++) {
    for (let j = 0 + i * 6; j < 6 + i * 6; j++) {
      fullArr[j].push("row" + (i + 1));
    }
  }
  // assigning each digit it's column
  for (let i = 0; i < 6; i++) {
    for (let j = 0 + i; j < 36; j = j + 6) {
      fullArr[j].push("col" + (i + 1));
    }
  }
  // assigning each digit clue
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 36; i = i + 6) {
      fullArr[i + j].push("north", clues[0 + j], "east", clues[6 + i / 6], "south", clues[17 - j], "west", clues[23 - i / 6]);
    }
  }

  // defining digits using clues = 1 or 6:
  fullArr[0][0] = clues[0] === 1 ? 6 : 0;
  fullArr[1][0] = clues[1] === 1 ? 6 : 0;
  fullArr[2][0] = clues[2] === 1 ? 6 : 0;
  fullArr[3][0] = clues[3] === 1 ? 6 : 0;
  fullArr[4][0] = clues[4] === 1 ? 6 : 0;
  fullArr[5][0] = clues[5] === 1 ? 6 : 0;
  fullArr[5][0] = clues[6] === 1 ? 6 : 0;
  fullArr[11][0] = clues[7] === 1 ? 6 : 0;
  fullArr[17][0] = clues[8] === 1 ? 6 : 0;
  fullArr[23][0] = clues[9] === 1 ? 6 : 0;
  fullArr[29][0] = clues[10] === 1 ? 6 : 0;
  fullArr[35][0] = clues[11] === 1 ? 6 : 0;
  fullArr[35][0] = clues[12] === 1 ? 6 : 0;
  fullArr[34][0] = clues[13] === 1 ? 6 : 0;
  fullArr[33][0] = clues[14] === 1 ? 6 : 0;
  fullArr[32][0] = clues[15] === 1 ? 6 : 0;
  fullArr[31][0] = clues[16] === 1 ? 6 : 0;
  fullArr[30][0] = clues[17] === 1 ? 6 : 0;
  fullArr[30][0] = clues[18] === 1 ? 6 : 0;
  fullArr[24][0] = clues[19] === 1 ? 6 : 0;
  fullArr[18][0] = clues[20] === 1 ? 6 : 0;
  fullArr[12][0] = clues[21] === 1 ? 6 : 0;
  fullArr[6][0] = clues[22] === 1 ? 6 : 0;
  fullArr[0][0] = clues[23] === 1 ? 6 : 0;

  for (let i = 0; i < 6; i++) {
    if (clues[i] === 6) {
      for (let j = 0; j < 36; j = j + 6) {
        fullArr[j + i][0] = j / 6 + 1;
      }
    }
    if (clues[i + 6] === 6) {
      for (let j = 0; j < 36; j = j + 6) {
        fullArr[j / 6 + i * 6][0] = 6 - j / 6;
      }
    }
    if (clues[i + 12] === 6) {
      for (let j = 0; j < 36; j = j + 6) {
        fullArr[35 - j - i][0] = j / 6 + 1;
      }
    }
    if (clues[i + 18] === 6) {
      for (let j = 0; j < 36; j = j + 6) {
        fullArr[30 + j / 6 - i * 6][0] = j / 6 + 1;
      }
    }
  }

  // YOU LEFT HERE - CHECK THE CODE WITH THE CURRENT SELECTED CLUES
  // for (let i = 0; i < 6; i++) {
  //   if (clues[i] + clues[17 - i] === 7) {
  //     fullArr[i + (clues[i] - 1) * 6] = 6;
  //   }
  // }

  console.log(fullArr);

  let changes = []; // storing all changes made to "puzzle"
  let lastChangeIndex; // storing the index of the last changed digit
  let lastChangeDigit; // storing the last digit that was changed
  let startingDigit = 1; // brute-force for a digit will start from this value (1: by default; lastChangeDigit + 1: in case the last changed digit led to breaking sudoku rules)
  let count2 = 0;

  for (let n = 0; n < 36 && count2 < 8000000; n++) {
    // brute-forcing
    if (fullArr[n][0] !== 0) {
      // pass the digits that has already been defined (clues = 1 or 6)
      startingDigit = 1;
      continue;
    } else {
      count2++;
      let indQ = fullArr[n]; // define row and col of the digit to be brute-forced
      let rowQ = fullArr.filter((x) => x[2] === indQ[2]).map((x) => x[0]);
      let colQ = fullArr.filter((x) => x[3] === indQ[3]).map((x) => x[0]);
      for (let j = startingDigit; j <= 6; j++) {
        if (rowQ.includes(j) || colQ.includes(j)) {
          // if the new value of the digit contradict the challenge rules, continue with the next value
          continue;
        } else {
          changes.push([fullArr[n][0], fullArr[n][1], j]); // if the new value of the digit doesn't contradict the challenge rules, set this value for the digit
          fullArr[n][0] = j;
          break;
        }
      }
      rowQ = fullArr.filter((x) => x[2] === indQ[2]).map((x) => x[0]);
      colQ = fullArr.filter((x) => x[3] === indQ[3]).map((x) => x[0]);
      let cluesRowQ = [indQ[11], indQ[7]];
      let cluesColQ = [indQ[5], indQ[9]];
      if (!cluesCheck(rowQ, cluesRowQ, n) || !cluesCheck(colQ, cluesColQ, n) || !cluesCheckReverse(rowQ, cluesRowQ, n) || !cluesCheckReverse(colQ, cluesColQ, n) || fullArr[n][0] === 0) {
        reverse(fullArr); // revert the last change and continue brute-forcing for the last changed digit (not from default value "1", but from "lastChangedDigit + 1"):
        n = lastChangeIndex - 1;
        startingDigit = lastChangeDigit + 1;
      } else {
        startingDigit = 1;
      }
    }
  }

  function cluesCheckReverse(lineQ, clues, n) {
    if (clues[1] === 0) {
      return true;
    } else {
      let count = 1;
      let max = lineQ[5];
      if (lineQ.includes(0)) {
        return true;
      } else {
        for (let i = 4; i >= 0; i--) {
          if (lineQ[i] > max) {
            max = lineQ[i];
            count++;
          }
        }
        return fullArr[n][0] === 4 && !lineQ.includes(6) ? count <= clues[1] - 1 : fullArr[n][0] === 5 && !lineQ.includes(6) ? count === clues[1] - 1 : fullArr[n][0] === 6 ? count === clues[1] : lineQ.includes(0) ? clues[1] >= count : clues[1] === count;
      }
    }
  }

  function cluesCheck(lineQ, clues, n) {
    if (clues[0] === 0) {
      return true;
    } else {
      let count = 1;
      let max = lineQ[0];
      for (let i = 1; i < 6; i++) {
        if (lineQ[i] > max) {
          max = lineQ[i];
          count++;
        }
      }
      if (fullArr[n][0] === 5) {
        // console.log(
        //   "count2",
        //   count2,
        //   "n",
        //   n,
        //   "j",
        //   fullArr[n][0],
        //   "count",
        //   count,
        //   "clues[0]",
        //   clues[0] - 1,
        //   clues[0] - 1 === count
        // );
      }
      return fullArr[n][0] === 4 && !lineQ.includes(6) ? count <= clues[0] - 1 : fullArr[n][0] === 5 && !lineQ.includes(6) ? count === clues[0] - 1 : fullArr[n][0] === 6 ? count === clues[0] : lineQ.includes(0) ? clues[0] >= count : clues[0] === count;
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
      finalArr.push(digitsOnly.splice(0, 6));
      makesNineArrays(digitsOnly);
    }
  }
  console.log(finalArr, "count2", count2);
  return finalArr;
}

// var clues = [
//   3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4,
// ];
// [[ 2, 1, 4, 3, 5, 6],
// [ 1, 6, 3, 2, 4, 5],
// [ 4, 3, 6, 5, 1, 2],
// [ 6, 5, 2, 1, 3, 4],
// [ 5, 4, 1, 6, 2, 3],
// [ 3, 2, 5, 4, 6, 1]];

// var clues = [
//   0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0,
// ];
// [
//   [5, 6, 1, 4, 3, 2],
//   [4, 1, 3, 2, 6, 5],
//   [2, 3, 6, 1, 5, 4],
//   [6, 5, 4, 3, 2, 1],
//   [1, 2, 5, 6, 4, 3],
//   [3, 4, 2, 5, 1, 6],
// ];

// var clues = [
// 0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0,
// ];

// [ [5, 2, 6, 1, 4, 3],
//   [6, 4, 3, 2, 5, 1],
//   [3, 1, 5, 4, 6, 2],
//   [2, 6, 1, 5, 3, 4],
//   [4, 3, 2, 6, 1, 5],
//   [1, 5, 4, 3, 2, 6]];

// solvePuzzle([3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4]);
// solvePuzzle([0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0]);
// solvePuzzle([0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0]);
// solvePuzzle([0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0]);
// solvePuzzle([3, 2, 0, 3, 1, 0, 0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3]);
solvePuzzle([4, 3, 2, 5, 1, 5, 2, 2, 2, 2, 3, 1, 1, 3, 2, 3, 3, 3, 5, 4, 1, 2, 3, 4]);
// solvePuzzle([2, 2, 2, 2, 3, 1, 1, 3, 2, 3, 3, 3, 5, 4, 1, 2, 3, 4, 4, 3, 2, 5, 1, 5]);
// solvePuzzle([0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0, 0, 3, 0, 5, 3, 4]);
// solvePuzzle([1, 3, 2, 3, 3, 3, 5, 4, 1, 2, 3, 4, 4, 3, 2, 5, 1, 5, 2, 2, 2, 2, 3, 1]);
// solvePuzzle([1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4, 3, 2, 2, 3, 2, 1]);
// solvePuzzle([3, 2, 1, 2, 2, 4, 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3]);
// solvePuzzle([0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0]);
// solvePuzzle([0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0, 0, 0, 0, 2, 2, 0]);
// solvePuzzle([0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0]);
// solvePuzzle([0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0, 0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1]);
