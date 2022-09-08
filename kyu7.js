"use strict";

// Welcome. In this kata, you are asked to square every digit of a number and concatenate them.

// For example, if we run 9119 through the function, 811181 will come out, because 9^2 is 81 and 1^2 is 1.

// Note: The function accepts an integer and returns an integer

function squareDigits(num) {
  return Number(
    num
      .toString()
      .split("")
      .map((n) => Math.pow(Number(n), 2))
      .join("")
  );
}

console.log(squareDigits(547));
