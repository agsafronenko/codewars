"use strict";

// to set-up "live-server" for another html file use this command:
// "   live-server --port=1234 --open=public --entry-file=index2.html   "
// where index2.html is the name of html file.

// 4 kyu
// How many numbers III?

// DESCRIPTION:
// We want to generate all the numbers of three digits where:

// the sum of their digits is equal to 10
// their digits are in increasing order (the numbers may have two or more equal contiguous digits)
// The numbers that fulfill these constraints are: [118, 127, 136, 145, 226, 235, 244, 334]. There're 8 numbers in total with 118 being the lowest and 334 being the greatest.

// Task
// Implement a function which receives two arguments:

// the sum of digits (sum)
// the number of digits (count)
// This function should return three values:

// the total number of values which have count digits that add up to sum and are in increasing order
// the lowest such value
// the greatest such value
// Note: if there're no values which satisfy these constaints, you should return an empty value (refer to the examples to see what exactly is expected).

// Examples
// findAll(10, 3)  =>  [8, "118", "334"]
// findAll(27, 3)  =>  [1, "999", "999"]
// findAll(84, 4)  =>  []
// Features of the random tests:

// Number of tests: 112
// Sum of digits value between 20 and 65
// Amount of digits between 2 and 17

function findAll(n, k) {
  const start = performance.now();

  if (n / k > 9 || n / k < 1) {
    return [];
  }

  let endingDigits = "";
  let startingNum = Number(startingNumFunc(n, k));

  function startingNumFunc(n, k) {
    if (n === k) {
      return repeatStartingDigits(k) + endingDigits;
    } else {
      let digit;
      if ((n - 9) / (k - 1) >= 1) {
        digit = "9";
      } else {
        digit = String(n - k + 1);
      }
      endingDigits = digit + endingDigits;
      return startingNumFunc(n - digit, k - 1);
    }
  }

  function repeatStartingDigits(k) {
    let sum = "";
    for (let i = 1; i <= k; i++) {
      sum += "1";
    }
    return sum;
  }

  let startingDigits = "";
  let endingNum = Number(endingNumFunc(n, k));

  function endingNumFunc(n, k) {
    if (n % k === 0) {
      return startingDigits + repeatEndingDigits(n, k);
    } else {
      let digit = String(Math.floor(n / k));
      startingDigits += digit;
      return endingNumFunc(n - digit, k - 1);
    }
  }

  function repeatEndingDigits(n, k) {
    let sum = "";
    for (let i = 1; i <= k; i++) {
      sum += String(n / k);
    }
    return sum;
  }

  let satisfiedNum = [];

  for (let i = endingNum; i >= startingNum; i = i - 9) {
    let sumOfDigits = 0;
    let valueInQ = i + 0;
    let digit;
    let prevDigit = 9;
    while (valueInQ) {
      digit = valueInQ % 10;
      if (prevDigit < digit) {
        break;
      }
      sumOfDigits += digit;
      if (sumOfDigits > n) {
        break;
      }
      prevDigit = digit;
      valueInQ = Math.floor(valueInQ / 10);
      if (!valueInQ && sumOfDigits === n) {
        satisfiedNum.push(i);
      }
    }
  }
  const duration = performance.now() - start;
  console.log(duration);

  return [satisfiedNum.length, satisfiedNum[satisfiedNum.length - 1].toString(), satisfiedNum[0].toString()];
}

console.log(findAll(10, 3)); // [8, 118, 334]
// console.log(findAll(27, 3)); // [1, "999", "999"])
// console.log(findAll(84, 4)); // []
// console.log(findAll(35, 6)); // [123, '116999', '566666'])
