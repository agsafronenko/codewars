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
  let number = parseInt(lastDigit, base); // 4 in dec
  let count = 0; // delete later
  let prevCut = "0";
  while (!conditions() && count < 25) {
    console.log(
      "#",
      count,
      "number",
      number.toString(base),
      "product",
      (number * lastDigit).toString(base),
      "replace",
      replace((number * lastDigit).toString(base))
    );
    number = parseInt(
      cut((number * lastDigit).toString(base), number.toString(base)),
      base
    );
    count++;
  }
  function replace(numberInBaseFormat) {
    let split = numberInBaseFormat.split("");
    let first = split.splice(0, 1);
    if (split[0] === "0") {
      split.push("11111111");
    }
    return split.concat(first).join("");
  }

  function cut(productInBaseFormat, numberInBaseFormat) {
    let split = productInBaseFormat.split("");
    let firstOmitted = split.slice(1);
    let currCut1 =
      firstOmitted[0] === "0" || split.length === 1
        ? split.concat(lastDigit.toString(base)).join("")
        : split.slice(1).concat(lastDigit.toString(base)).join("");
    let currCut2 =
      prevCut !== currCut1
        ? currCut1
        : split.slice().concat(lastDigit.toString(base)).join("");
    prevCut = currCut2;
    console.log(
      "split",
      split,
      "firstOmitted",
      firstOmitted,
      "currCut1",
      currCut1,
      "currCut2",
      currCut2,
      "prevCut",
      prevCut
    );
    return currCut2;

    // let cutRes =
    //   numberInBaseFormat ===
    //   split.slice(1).concat(lastDigit.toString(base)).join("")
    //     ? split.concat(lastDigit.toString(base)).join("")
    //     : split.slice(1).concat(lastDigit.toString(base)).join("");
    // return cutRes[0] === "0"
    //   ? split.concat(lastDigit.toString(base)).join("")
    //   : cutRes;
  }
  function lastDigitFunc(numberInBaseFormat) {
    let split = numberInBaseFormat.split("");
    let last = split.slice(-1);
    return last[0] === lastDigit.toString(base);
  }
  function conditions() {
    return [
      number.toString(base) === replace((number * lastDigit).toString(base)), // reviewed
      lastDigitFunc(number.toString(base)),
    ].every((x) => x === true);
  }

  console.log("final result:", number.toString(base));
  return number.toString(base);
}

// calculateSpecial(4, 10); // '102564'   --> 4  *  102564   = 410256
// calculateSpecial(4, 16); // '104'
// calculateSpecial(2, 8);
// calculateSpecial(3, 8); // <----
// calculateSpecial(4, 8);
// calculateSpecial(5, 8);
calculateSpecial(6, 8); // <----
// calculateSpecial(7, 8); // <----

function calculateSpecial2(n, base) {
  let curr = n,
    decimalStr = "",
    dn = base * n - 1,
    remainder;
  do {
    decimalStr += (~~(curr / dn)).toString(base);
    if (dn <= curr) {
      curr = remainder = curr % dn;
    }
    curr *= base;
  } while (remainder !== n);
  console.log("final 2:", decimalStr.slice(1));
  return decimalStr.slice(1); // excludes integer part
}

calculateSpecial2(2, 8); // 1042
calculateSpecial2(3, 8); // 10262054413
calculateSpecial2(4, 8); // 10204
calculateSpecial2(5, 8); // 1015
calculateSpecial2(6, 8); // 10127114202562304053446
calculateSpecial2(7, 8); // 10112362022474404517

console.log(10127114202562304053446 * 4);
console.log(10127114202562304053446n * 4n);
