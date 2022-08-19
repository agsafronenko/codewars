// 'use strict

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

// You live in the city of Cartesia where all roads are laid out in a perfect grid. You arrived ten minutes too early to an appointment, so you decided to take the opportunity to go for a short walk. The city provides its citizens with a Walk Generating App on their phones -- everytime you press the button it sends you an array of one-letter strings representing directions to walk (eg. ['n', 's', 'w', 'e']). You always walk only a single block for each letter (direction) and you know it takes you one minute to traverse one city block, so create a function that will return true if the walk the app gives you will take you exactly ten minutes (you don't want to be early or late!) and will, of course, return you to your starting point. Return false otherwise.

// Note: you will always receive a valid array containing a random assortment of direction letters ('n', 's', 'e', or 'w' only). It will never give you an empty array (that's not a walk, that's standing still!).

function isValidWalk(walk) {
  let countN = 0,
    countS = 0,
    countW = 0,
    countE = 0;
  walk.map((x) =>
    x === "n"
      ? countN++
      : x === "s"
      ? countS++
      : x === "w"
      ? countW++
      : countE++
  );
  return walk.length === 10 && countN === countS && countW === countE;
}
console.log(isValidWalk(["n", "s", "n", "s", "n", "s", "n", "s", "w", "e"]));

// The Western Suburbs Croquet Club has two categories of membership, Senior and Open. They would like your help with an application form that will tell prospective members which category they will be placed.

// To be a senior, a member must be at least 55 years old and have a handicap greater than 7. In this croquet club, handicaps range from -2 to +26; the better the player the lower the handicap.

// Input
// Input will consist of a list of pairs. Each pair contains information for a single potential member. Information consists of an integer for the person's age and an integer for the person's handicap.

// Output
// Output will consist of a list of string values (in Haskell and C: Open or Senior) stating whether the respective member is to be placed in the senior or open category.

// Example
// input =  [[18, 20], [45, 2], [61, 12], [37, 6], [21, 21], [78, 9]]
// output = ["Open", "Open", "Senior", "Open", "Open", "Senior"]

function openOrSenior(data) {
  return data.map((x) => (x[0] >= 55 && x[1] > 7 ? "Senior" : "Open"));
}

console.log(
  openOrSenior([
    [3, 12],
    [55, 1],
    [91, -2],
    [53, 23],
  ])
);

// You are going to be given an array of integers. Your job is to take that array and find an index N where the sum of the integers to the left of N is equal to the sum of the integers to the right of N. If there is no index that would make this happen, return -1.

// For example:

// Let's say you are given the array {1,2,3,4,3,2,1}:
// Your function will return the index 3, because at the 3rd position of the array, the sum of left side of the index ({1,2,3}) and the sum of the right side of the index ({3,2,1}) both equal 6.

// Let's look at another one.
// You are given the array {1,100,50,-51,1,1}:
// Your function will return the index 1, because at the 1st position of the array, the sum of left side of the index ({1}) and the sum of the right side of the index ({50,-51,1,1}) both equal 1.

// Last one:
// You are given the array {20,10,-80,10,10,15,35}
// At index 0 the left side is {}
// The right side is {10,-80,10,10,15,35}
// They both are equal to 0 when added. (Empty arrays are equal to 0 in this problem)
// Index 0 is the place where the left side and right side are equal.

// Note: Please remember that in most programming/scripting languages the index of an array starts at 0.

// Input:
// An integer array of length 0 < arr < 1000. The numbers in the array can be any integer positive or negative.

// Output:
// The lowest index N where the side to the left of N is equal to the side to the right of N. If you do not find an index that fits these rules, then you will return -1.

// Note:
// If you are given an array with multiple answers, return the lowest correct index.

function findEvenIndex(arr) {
  return arr
    .map((x, ind) =>
      sum(arr.slice(0, ind)) === sum(arr.slice(ind + 1)) ? ind : -1
    )
    .findIndex((y) => y !== -1);
}

function sum(arr) {
  return arr.reduce((sum, y) => sum + y, 0);
}

console.log(findEvenIndex([1, 125, 50, -51, 1, 1]));

// 5 kyu
// How Many Numbers? II

// We want to find the numbers higher or equal than 1000 that the sum of every four consecutives digits cannot be higher than a certain given value. If the number is num = d1d2d3d4d5d6, and the maximum sum of 4 contiguous digits is maxSum, then:

// d1 + d2 + d3 + d4 <= maxSum
// d2 + d3 + d4 + d5 <= maxSum
// d3 + d4 + d5 + d6 <= maxSum
// For that purpose, we need to create a function, max_sumDig(), that receives nMax, as the max value of the interval to study (the range (1000, nMax) ), and a certain value, maxSum, the maximum sum that every four consecutive digits should be less or equal to. The function should output the following list with the data detailed bellow:

// [(1), (2), (3)]

// (1) - the amount of numbers that satisfy the constraint presented above

// (2) - the closest number to the mean of the results, if there are more than one, the smallest number should be chosen.

// (3) - the total sum of all the found numbers

// Let's see a case with all the details:

// max_sumDig(2000, 3) -------> [11, 1110, 12555]

// (1) -There are 11 found numbers: 1000, 1001, 1002, 1010, 1011, 1020, 1100, 1101, 1110, 1200 and 2000

// (2) - The mean of all the found numbers is:
//       (1000 + 1001 + 1002 + 1010 + 1011 + 1020 + 1100 + 1101 + 1110 + 1200 + 2000) /11 = 1141.36363,
//       so 1110 is the number that is closest to that mean value.

// (3) - 12555 is the sum of all the found numbers
//       1000 + 1001 + 1002 + 1010 + 1011 + 1020 + 1100 + 1101 + 1110 + 1200 + 2000 = 12555

// Finally, let's see another cases
// max_sumDig(2000, 4) -----> [21, 1120, 23665]

// max_sumDig(2000, 7) -----> [85, 1200, 99986]

// max_sumDig(3000, 7) -----> [141, 1600, 220756]

// ```

// Happy coding!!

function maxSumDig(nmax, maxsm) {
  let numSatisfied = [];
  for (let i = 1000; i <= nmax; i++) {
    let numAsArr = i.toString().split("");
    let fourAsArr = [];
    for (let j = 0; numAsArr.slice(j).length >= 4; j++) {
      fourAsArr.push(numAsArr.slice(j, j + 4));
    }
    if (
      fourAsArr.every(
        (four) =>
          four.reduce((total, digit) => total + Number(digit), 0) <= maxsm
      )
    ) {
      numSatisfied.push(i);
    }
  }

  let sumNum = numSatisfied.reduce((sum, b) => sum + b, 0);
  let avgNum = sumNum / numSatisfied.length;
  let closestToAvg = Math.min(
    ...numSatisfied.map((num) => Math.abs(num - avgNum))
  );
  console.log(closestToAvg);
  let closestNum = numSatisfied.filter(
    (num) => Math.abs(num - avgNum) === closestToAvg
  )[0];
  return [numSatisfied.length, closestNum, sumNum];
}

console.log(maxSumDig(36097, 5)); // [295, 14001, 4213464]    vs    [190, 11000, 2074429]

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
