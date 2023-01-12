"use strict";

// Connect Four
// Take a look at wiki description of Connect Four game:

// Wiki Connect Four

// The grid is 6 row by 7 columns, those being named from A to G.

// You will receive a list of strings showing the order of the pieces which dropped in columns:

//   piecesPositionList = ["A_Red",
//                         "B_Yellow",
//                         "A_Red",
//                         "B_Yellow",
//                         "A_Red",
//                         "B_Yellow",
//                         "G_Red",
//                         "B_Yellow"]
// The list may contain up to 42 moves and shows the order the players are playing.

// The first player who connects four items of the same color is the winner.

// You should return "Yellow", "Red" or "Draw" accordingly.

function whoIsWinner(piecesPositionList) {
  //return "Red", "Yellow" or "Draw"
  let countA = 0;
  let countB = 0;
  let countC = 0;
  let countD = 0;
  let countE = 0;
  let countF = 0;
  let countG = 0;
  let board = new Array(6 * 7).fill(0);
  for (let i = 0; i < piecesPositionList.length; i++) {
    if (piecesPositionList[i][0] === "A") {
      board[0 + 7 * countA] = piecesPositionList[i][2];
      countA++;
    } else if (piecesPositionList[i][0] === "B") {
      board[1 + 7 * countB] = piecesPositionList[i][2];
      countB++;
    } else if (piecesPositionList[i][0] === "C") {
      board[2 + 7 * countC] = piecesPositionList[i][2];
      countC++;
    } else if (piecesPositionList[i][0] === "D") {
      board[3 + 7 * countD] = piecesPositionList[i][2];
      countD++;
    } else if (piecesPositionList[i][0] === "E") {
      board[4 + 7 * countE] = piecesPositionList[i][2];
      countE++;
    } else if (piecesPositionList[i][0] === "F") {
      board[5 + 7 * countF] = piecesPositionList[i][2];
      countF++;
    } else if (piecesPositionList[i][0] === "G") {
      board[6 + 7 * countG] = piecesPositionList[i][2];
      countG++;
    }
    // winner validation should be declared here after the end of each loop
  }
  console.log(board);
}

// whoIsWinner([
"C_Yellow",
  "E_Red",
  "G_Yellow",
  "B_Red",
  "D_Yellow",
  "B_Red",
  "B_Yellow",
  "G_Red",
  "C_Yellow",
  "C_Red",
  "D_Yellow",
  "F_Red",
  "E_Yellow",
  "A_Red",
  "A_Yellow",
  "G_Red",
  "A_Yellow",
  "F_Red",
  "F_Yellow",
  "D_Red",
  "B_Yellow",
  "E_Red",
  "D_Yellow",
  "A_Red",
  "G_Yellow",
  "D_Red",
  "D_Yellow",
  "C_Red",
  // ]); // "Yellow"

  whoIsWinner(["A_Yellow", "B_Red", "B_Yellow", "C_Red", "G_Yellow", "C_Red", "C_Yellow", "D_Red", "G_Yellow", "D_Red", "G_Yellow", "D_Red", "F_Yellow", "E_Red", "D_Yellow"]); // "Red"
// whoIsWinner(["A_Red", "B_Yellow", "A_Red", "E_Yellow", "F_Red", "G_Yellow"]); // "Draw"
