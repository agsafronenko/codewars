"use strict";
// Write a function that takes a positive integer and returns the next smaller positive integer containing the same digits.

// For example:

// nextSmaller(21) == 12
// nextSmaller(531) == 513
// nextSmaller(2071) == 2017
// Return -1 (for Haskell: return Nothing, for Rust: return None), when there is no smaller number that contains the same digits. Also return -1 when the next smaller number with the same digits would require the leading digit to be zero.

// nextSmaller(9) == -1
// nextSmaller(111) == -1
// nextSmaller(135) == -1
// nextSmaller(1027) == -1 // 0721 is out since we don't write numbers with leading zeros
// some tests will include very large numbers.
// test data only employs positive integers.

function nextSmaller(n) {
  let origNumArr = String(n).split("");
  let replaced = false;
  let result;
  let numToReplace;
  let arrToRearrange;
  for (let i = origNumArr.length - 1; i >= 0; i--) {
    if (origNumArr[i - 1] === undefined) {
      break;
    }
    if (origNumArr[i] >= origNumArr[i - 1]) {
      continue;
    } else {
      arrToRearrange = origNumArr.slice(i).map((x, i) => [Number(x), i]);
      let staticArrToRearrange = arrToRearrange.slice();
      numToReplace = arrToRearrange
        .sort((a, b) => b[0] - a[0])
        .filter((x) => origNumArr[i - 1] > x)[0];
      //   if (numToReplace[0] === 0) {
      //     break;
      //   }
      let tempValueStorage = origNumArr[i - 1];
      origNumArr[i - 1] = staticArrToRearrange[numToReplace[1]][0];
      staticArrToRearrange[numToReplace[1]][0] = Number(tempValueStorage);
      let rearranged = staticArrToRearrange
        .map((x) => x[0])
        .sort((a, b) => b - a);
      let stringResult = origNumArr.slice(0, i).concat(rearranged).join("");
      if (stringResult[0] === "0") {
        break;
      }
      result = Number(stringResult);
      replaced = true;
      break;
    }
  }

  return replaced === false ? -1 : result;
}

console.log(nextSmaller(1207)); // 1072
// console.log(nextSmaller(135)); // -1
// console.log(nextSmaller(2071)); // 2017
console.log(nextSmaller(1027)); // -1
// console.log(nextSmaller(123456789)); // -1
// console.log(nextSmaller(1234567908)); // 1234567890
// console.log(nextSmaller(97038)); // 93870
