// 'use strict

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
  const mark1 = "mark1";
  const mark2 = "mark2";
  const mark3 = "mark3";
  const mark4 = "mark4";
  performance.mark(mark1);

  startingNum = "1";
  endingNum = "9";
  for (let i = 0; i < k - 1; i++) {
    startingNum += 0;
    endingNum += 9;
  }
  startingNum = Number(startingNum);
  endingNum = Number(endingNum);
  let satisfiedNum = [];

  performance.mark(mark2);

  for (let i = startingNum; i <= endingNum; i++) {
    let sumOfDigits = 0;
    let valueInQ = i + 0;
    let valueInQPrev = 9;
    let digit;
    while (valueInQ) {
      digit = valueInQ % 10;
      console.log("valueInQPrev:", valueInQPrev, "digit:", digit);
      sumOfDigits += digit;
      valueInQPrev = digit;
      valueInQ = Math.floor(valueInQ / 10);
    }
    if (sumOfDigits === n) {
      satisfiedNum.push(i);
    }
  }
  performance.mark(mark3);
  // satisfiedNum = satisfiedNum
  //   .map((n) =>
  //     n
  //       .toString()
  //       .split("")
  //       .map((n) => Number(n))
  //   )
  //   .filter((arr) => order(arr));

  // function order(arr) {
  //   for (let i = 1; i < arr.length; i++) {
  //     if (arr[i - 1] > arr[i]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  performance.mark(mark4);
  // satisfiedNum = satisfiedNum.map((arrOfNums) => arrOfNums.join(""));
  performance.measure("mark1 -> mark2:", mark1, mark2);
  performance.measure("mark2 -> mark3:", mark2, mark3);
  performance.measure("mark3 -> mark4:", mark3, mark4);
  console.log(
    performance.getEntriesByType("measure")[0],
    performance.getEntriesByType("measure")[1],
    performance.getEntriesByType("measure")[2]
  );
  return satisfiedNum.length > 0
    ? [
        satisfiedNum.length,
        Math.min(...satisfiedNum).toString(),
        Math.max(...satisfiedNum).toString(),
      ]
    : [];
}

console.log(findAll(10, 3)); // [8, 118, 334]
// console.log(findAll(27, 3)); // [1, "999", "999"])
// console.log(findAll(84, 4)); // []
// console.log(findAll(35, 6)); // [123, '116999', '566666'])
