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
  let number = lastDigit.toString(base);
  lastDigit = lastDigit.toString(base);
  let count = 0;
  let prevCut = "0";
  let multiplication = "";

  // core of the function: increases the number until all conditions are met
  // count is used for testing purposes to avoid infinite calculations
  while (!conditions() && count < 130) {
    number = cut(multiplication);
    count++;
  }

  console.log("args:", ...arguments, "final result:", number);
  return number;

  // unites two checks and returns boolean (true if both conditions are met)
  function conditions() {
    multiplication = multiply(number);
    return [replace(multiplication), lastDigitFunc(number)].every(
      (x) => x === true
    );
  }

  // 1st check: function takes multiplication (number * lastDigit), changes it's first and last digits and compares it with a given number
  function replace(product) {
    let split = product.split("");
    let first = split.splice(0, 1);
    return split.concat(first).join("") === number;
  }

  // 2nd: function checks whether the last digit of the parasitic number equals the lastDigit argument
  function lastDigitFunc(num) {
    let split = num.split("");
    let last = split.slice(-1);
    return last[0] === lastDigit;
  }

  // corkscrew method to find special number --> function slices the first digit and adds the last special digit to form a new number
  function cut(product) {
    let split = product.split("");
    let firstOmitted = split.slice(1);
    let currCut1 =
      firstOmitted[0] === "0" || split.length === 1
        ? split.concat(lastDigit).join("")
        : split.slice(1).concat(lastDigit).join("");
    let currCut2 =
      prevCut !== currCut1
        ? currCut1
        : split.slice().concat(lastDigit).join("");
    prevCut = currCut2;
    return currCut2;
  }

  // multiplying number and lastDigit
  /* note: since some numbers are much larger than the MAX_SAFE_INTEGER and using BigInt() is not allowed by terms of the challenge: 
      - parameters and result are stored as strings;
      - multiplying is performed for each char (one by one) from the end to the beggining of the strings */
  function multiply(num) {
    const product = Array(num.length + lastDigit.length).fill(0);
    for (let i = num.length - 1; i >= 0; i--) {
      let carry = 0;
      product[1 + i] =
        parseInt(product[1 + i], base) +
        carry +
        parseInt(num[i], base) * parseInt(lastDigit, base);
      carry = Math.floor(product[1 + i] / base);
      product[1 + i] = (product[1 + i] % base).toString(base);
      product[i] = (parseInt(product[i], base) + carry).toString(base);
    }
    return product.join("").replace(/^0*(.)/, "$1");
  }
}

calculateSpecial(4, 10); // '102564'   --> 4  *  102564   = 410256
calculateSpecial(5, 10); // 102040816326530612244897959183673469387755
calculateSpecial(6, 10); //1016949152542372881355932203389830508474576271186440677966
calculateSpecial(3, 16); // 10572620ae4c415c9882b93
calculateSpecial(4, 16); // 104
calculateSpecial(10, 16); // 1019c2d14ee4a
calculateSpecial(12, 16); // 101571ed3c506b39a22d9218202ae3da78a0d673445b24304055c7b4f141ace688b6486080ab8f69e28359cd116c90c
calculateSpecial(2, 8); // 1042
calculateSpecial(3, 8); // 10262054413
calculateSpecial(4, 8); // 10204
calculateSpecial(5, 8); // 1015
calculateSpecial(6, 8); // 10127114202562304053446
calculateSpecial(7, 8); // 10112362022474404517

// FUNCTION TO MULTIPLY TWO NUMBERS WITH BOTH HAVING LENGTH >= 2:

// multiply2("4", "4", 16); // 10
multiply2("4", "c", 16); // 30
// multiply2("1019c2d14ee4a", "a", 16);

function multiply2(a, b, base) {
  const product = Array(a.length + b.length).fill(0);
  for (let i = a.length - 1; i >= 0; i--) {
    let carry = 0;
    for (let j = b.length - 1; j >= 0; j--) {
      product[1 + i + j] = (
        parseInt(product[1 + i + j], base) +
        parseInt(carry, base) +
        parseInt(a[i], base) * parseInt(b[j], base)
      ).toString(base);
      carry = Math.floor(parseInt(product[1 + i + j], base) / base).toString(
        base
      );
      product[1 + i + j] = (parseInt(product[1 + i + j], base) % base).toString(
        base
      );
    }
    product[i] = (parseInt(product[i], base) + parseInt(carry, base)).toString(
      base
    );
  }
  console.log("FINAL product", product.join("").replace(/^0*(.)/, "$1"));
  return product.join("").replace(/^0*(.)/, "$1");
}
