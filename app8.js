"use strict";

// This challenge is to compute a special set of parasitic numbers for various number bases.

// An n-parasitic number (in base 10) is a positive natural number which can be multiplied by n by moving the rightmost digit of its decimal representation to the front. Here n is itself a single-digit positive natural number. In other words, the decimal representation undergoes a right circular shift by one place. For example, 4 • 128205 = 512820, so 128205 is 4-parasitic

// Special Parasitic Numbers
// For some N there may be multiple N-parasitic numbers. This Kata is concerned with finding a special set of n-parasitic numbers where the trailing digit is also the 'N' in the N-parasitic number. In base-10, the above Wikipedia excerpt shows that 128205 is 4-parasitic since 4 • 128205 = 512820; however, the special number this Kata is looking for is the smallest 4-parasitic number that also ends in 4, which is 102564: 4 • 102564 = 410256.

// A Clarifying Anti-Example
// The "ending in N" portion of the requirements seems easily missed. While 5 • 142857 = 714285, this 142857 number is parasitic but it is not the number sought by this kata because it ends with a 7 in the ones' place rather than 'n' (which is 5 in this case).
//          v--- kata requires this digit to be 5 for n = 5
// 5 • 142857 = 714285
//              ^--- kata requires this digit to be 5 for n = 5
// While the product happens to end with a 5 in the one's place, that ends-with-N requirement is on the multiplicand not on the product. The answer sought is much bigger than 142857 for n = 5.

// Challenge
// Provide a method accepting two arguments: the special trailing digit and a number base. Your method should return the string representation of the smallest integer having the special parasitic number property as described above in the requested number-base (octal, decimal and hex.) Each number base will test for all trailing digits other than 0 and 1, giving a total of 28 test cases.

// Why the smallest?
// Consider how the special 4-parastic HEX number ending in 4 is 104.

// 104 Hex • 4 = 410 Hex.

// Repeating 104 twice and multiplying by 4 gives us 104104 Hex • 4 = 410410 Hex. This property holds regardless of how many times the set of digits is repeated (e.g., 104104 Hex • 4 = 410410 Hex, 104104104 Hex • 4 = 410410410 Hex, 104104104104 Hex • 4 = 410410410410 Hex, ...), leading to an infinite set of these special numbers in each case. Your task is to find only the smallest number that satisfies the special parasitic property. [This fact is a hint on one possible way to solve this problem.]

// Hints:
// Unless you can be clever about it, brute force techniques probably won't work.
// An answer exists satisfying the criteria for each of the trailing-digits tested.
// Leading zero-digits are not allowed.
// Test failures will reveal the inputs rather than the expected value.
// After you have solved it:
// Can you find two other algorithmically different approaches to solve this puzzle? The refrence solutions in JavaScript, C# and Python solve the puzzle in fundamentally different ways.

function calculateSpecial(lastDigit, base) {
  let number = lastDigit;
  let count = 0; // delete later
  while (!conditions() && count < 10000) {
    console.log(
      "count",
      count,
      "number",
      number,
      "replace",
      replace(number * lastDigit)
    );
    number = cut(number * lastDigit, number);
    count++;
  }
  function replace(number) {
    let split = number.toString().split("");
    let first = split.splice(0, 1);
    if (split[0] === "0") {
      split[1] = split[1] + 1;
    }
    return Number(split.concat(first).join(""));
  }
  function cut(product, number) {
    let split = product.toString().split("");
    return number === Number(split.slice(1).concat(lastDigit).join(""))
      ? Number(split.concat(lastDigit).join(""))
      : Number(split.slice(1).concat(lastDigit).join(""));
  }
  function lastDigitFunc(number) {
    let split = number.toString().split("");
    let last = Number(split.slice(-1));
    return last === lastDigit;
  }
  function conditions() {
    return [
      number === replace(number * lastDigit),
      lastDigitFunc(number),
    ].every((x) => x === true);
  }

  console.log("final result:", number.toString());
  return number.toString();
}

calculateSpecial(4, 10); // '102564'   --> 4  *  102564   = 410256
// calculateSpecial(4,16); // '104'
// calculateSpecial(2,8);
// calculateSpecial(3, 8);
// calculateSpecial(4, 8);
// calculateSpecial(5, 8);
// calculateSpecial(6, 8);
// calculateSpecial(7, 8);

let digit = 13244678;
let hex = digit.toString(16);
console.log(hex);
let dec = parseInt(hex, 16);
console.log(dec);
