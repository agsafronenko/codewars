"use strict";

// Your task, is to create a NxN spiral with a given size.

// For example, spiral with size 5 should look like this:

// 00000
// ....0
// 000.0
// 0...0
// 00000
// and with the size 10:

// 0000000000
// .........0
// 00000000.0
// 0......0.0
// 0.0000.0.0
// 0.0..0.0.0
// 0.0....0.0
// 0.000000.0
// 0........0
// 0000000000

// Return value should contain array of arrays, of 0 and 1, with the first row being composed of 1s. For example for given size 5 result should be:

// [[1,1,1,1,1],[0,0,0,0,1],[1,1,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
// Because of the edge-cases for tiny spirals, the size will be at least 5.

// General rule-of-a-thumb is, that the snake made with '1' cannot touch to itself.

function spiralize(n) {
  // creating field & forming "fullArr" which contains: [field status ("0" - empty, "1" - filled by Kaa), field cell index, cell's row, cell's column]
  let fullArr = Array(n * n)
    .fill(0)
    .map((x, ind) => [x, ind]);

  for (let i = 0; i < n; i++) {
    for (let j = 0 + i * n; j < n + i * n; j++) {
      fullArr[j].push("row", i);
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0 + i; j < n * n; j = j + n) {
      fullArr[j].push("col", i);
    }
  }

  let currentPosition = 0; // Kaa's current position
  let stop = false; // if true, Kaa stops crawling forward

  // function to crawl clockwise until there is no empty field to move forward
  crawlingKaa();
  function crawlingKaa() {
    if (stop === true) {
      return fullArr;
    } else {
      crawl(fullArr, currentPosition, 3, 2, "rightDown");
    }
    if (stop === true) {
      return fullArr;
    } else {
      crawl(fullArr, currentPosition, 5, n * 2, "rightDown");
    }
    if (stop === true) {
      return fullArr;
    } else {
      crawl(fullArr, currentPosition, 3, -2);
    }
    if (stop === true) {
      return fullArr;
    } else {
      crawl(fullArr, currentPosition, 5, -n * 2);
    }
    crawlingKaa();
  }

  // function to determine where Kaa should crawl next
  function crawl(fullArr, curPos, lineNum, indentFromFilledCell, direction) {
    let indQ = fullArr[curPos];
    let lineQ = fullArr.filter((x) => x[lineNum] === indQ[lineNum]);
    let startingInd;
    let endingInd;
    if (direction === "rightDown") {
      startingInd = lineQ.find((x) => x[1] === indQ[1])[1];
      let sliceStart = lineQ.findIndex((x) => x[1] === indQ[1]) + 1;
      let occupied = lineQ.slice(sliceStart).findIndex((x) => x[0] === 1);
      endingInd = occupied === -1 ? lineQ[lineQ.length - 1][1] : lineQ.slice(sliceStart)[occupied][1] - indentFromFilledCell;
    } else {
      lineQ = lineQ.reverse();
      let sliceStart = lineQ.findIndex((x) => x[1] === indQ[1]) + 1;
      let occupied = lineQ.slice(sliceStart).findIndex((x) => x[0] === 1);
      startingInd = occupied === -1 ? lineQ[lineQ.length - 1][1] : lineQ.slice(sliceStart)[occupied][1] - indentFromFilledCell;
      endingInd = lineQ.find((x) => x[1] === indQ[1])[1];
    }

    let cellsToChange = lineQ.filter((x) => x[1] >= startingInd && x[1] <= endingInd).map((x) => x[1]);
    for (let i = 0; i < cellsToChange.length; i++) {
      fullArr[cellsToChange[i]][0] = 1;
    }
    if (cellsToChange.length <= 2) {
      stop = true;
    }
    currentPosition = cellsToChange[cellsToChange.length - 1];
    return fullArr;
  }

  // converting final fullArr into 2D array
  let snakeArr2D = [];
  let snakeArrFlatten = fullArr.map((x) => x[0]);

  makeItTwoD(snakeArrFlatten);
  function makeItTwoD(snakeArrFlatten) {
    if (snakeArrFlatten.length === 0) {
      return snakeArr2D;
    } else {
      snakeArr2D.push(snakeArrFlatten.splice(0, n));
      makeItTwoD(snakeArrFlatten);
    }
  }
  return snakeArr2D;
}

console.log(spiralize(10));
