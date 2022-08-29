"use strict";

// Write a method that takes a field for well-known board game "Battleship" as an argument and returns true if it has a valid disposition of ships, false otherwise. Argument is guaranteed to be 10*10 two-dimension array. Elements in the array are numbers, 0 if the cell is free and 1 if occupied by ship.

// Battleship (also Battleships or Sea Battle) is a guessing game for two players. Each player has a 10x10 grid containing several "ships" and objective is to destroy enemy's forces by targetting individual cells on his field. The ship occupies one or more cells in the grid. Size and number of ships may differ from version to version. In this kata we will use Soviet/Russian version of the game.

// Before the game begins, players set up the board and place the ships accordingly to the following rules:
// There must be single battleship (size of 4 cells), 2 cruisers (size 3), 3 destroyers (size 2) and 4 submarines (size 1). Any additional ships are not allowed, as well as missing ships.
// Each ship must be a straight line, except for submarines, which are just single cell.

// The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner.

function validateBattlefield(field) {
  // forming full array: flattening all arrays into one and adding border from all sides filled with 0
  let fullArr = Array(12).fill(0);
  for (let i = 0; i < field.length; i++) {
    fullArr = fullArr.concat(0).concat(field[i]).concat(0);
  }
  fullArr = fullArr.concat(Array(12).fill(0));

  // first validation check: whether the total size of all ships is valid (4x1 + 3x2 + 2x3 + 1x4 = 20)
  if (fullArr.filter((x) => x === 1).length !== 20) {
    return false;
  } else {
    fullArr = fullArr.map((x, ind) => [x, ind]); // assign each pos it's index

    let rows = [];
    for (let i = 0; i < 12; i++) {
      // assigning each pos it's row
      rows[i] = [];
      for (let j = 0 + i * 12; j < 12 + i * 12; j++) {
        fullArr[j].push("row" + (i + 1));
        rows[i].push(fullArr[j][0]);
      }
    }
    let cols = [];
    for (let i = 0; i < 12; i++) {
      // assigning each pos it's column
      cols[i] = [];
      for (let j = 0 + i; j < 144; j = j + 12) {
        fullArr[j].push("col" + (i + 1));
        cols[i].push(fullArr[j][0]);
      }
    }

    // forming list of ships
    let fours = []; // list of all four-cell ships
    let threes = [];
    let twos = [];
    let ones = [];

    formingShips(rows);
    formingShips(cols);
    function formingShips(line) {
      let lineStr = line === rows ? "rows" : "cols";
      for (let i = 0; i < line.length; i++) {
        let ship = [];
        for (let j = 0; j < line[i].length; j++) {
          if (
            line[i][j] === 1 &&
            (line[i][j + 1] === 1 || line[i][j - 1] === 1)
          ) {
            ship.push(j);
          }
        }
        ship.length === 4
          ? fours.push([lineStr, i, ship])
          : ship.length === 3
          ? threes.push([lineStr, i, ship])
          : ship.length === 2
          ? twos.push([lineStr, i, ship])
          : "";
      }
    }

    // defining one-cell ships (immediate validation check: weather the one-cell ship is not in contact with any other ships neither by edge nor by corner; if it is in contact then it will not be added to one-cell ships array and therefore this array will not pass the next quantity validation check)
    for (let i = 0; i < 144; i++) {
      if (
        fullArr[i][0] === 1 &&
        fullArr[i + 1][0] === 0 &&
        fullArr[i - 1][0] === 0 &&
        fullArr[i + 12][0] === 0 &&
        fullArr[i - 12][0] === 0 &&
        fullArr[i - 13][0] === 0 &&
        fullArr[i - 11][0] === 0 &&
        fullArr[i + 13][0] === 0 &&
        fullArr[i + 11][0] === 0
      ) {
        ones.push(i);
      }
    }

    // second validation check: whether the quantity of ships (within each size group) is valid
    if (
      fours.length !== 1 ||
      threes.length !== 2 ||
      twos.length !== 3 ||
      ones.length !== 4
    ) {
      return false;
    } else {
      // third and last validation check for each size group (2-cells and more): whether the ships are not in contact with any other ships neither by edge nor by corner
      thirdValidation(fours);
      thirdValidation(threes);
      thirdValidation(twos);

      function thirdValidation(cells) {
        for (let i = 0; i < cells.length; i++) {
          let lineStr = cells[i][0] === "cols" ? cols : rows;
          let lineNum = cells[i][1];
          let lineInd = cells[i][2];

          (function validate(lineStr) {
            for (
              let i = lineInd[0] - 1;
              i <= lineInd[lineInd.length - 1] + 1;
              i++
            ) {
              if (
                lineStr[lineNum - 1][i] !== 0 ||
                lineStr[lineNum + 1][i] !== 0
              ) {
                return false;
              }
            }
          })(lineStr);
        }
      }
    }
  }
  return true;
}

var sample = [
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]; // must return "true"

console.log(validateBattlefield(sample));
