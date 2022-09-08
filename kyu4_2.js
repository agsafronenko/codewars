"use strict";
// A format for expressing an ordered list of integers is to use a comma separated list of either

// individual integers
// or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'. The range includes all integers in the interval including both endpoints. It is not considered a range unless it spans at least 3 numbers. For example "12,13,15-17"
// Complete the solution so that it takes a list of integers in increasing order and returns a correctly formatted string in the range format.

// Example:

// solution([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
//  returns "-10--8,-6,-3-1,3-5,7-11,14,15,17-20"

function solution(list) {
  let delta = [];
  let group = [];
  let staticList = list.slice();
  for (let i = 0; i < list.length; i++) {
    delta.push([list[i], Math.abs(list[i] - list[i + 1])]);
  }
  delta = delta.map((x) => (isNaN(x[1]) ? [x[0], (x[1] = 0)] : [x[0], x[1]]));
  let count = 0;
  for (let i = 0; i < delta.length; i++) {
    if (delta[i][1] === 1) {
      count++;
      if (delta[i + 1][1] !== 1 && count > 1) {
        group.push([i - count + 1, i + 1]);
      }
    } else {
      count = 0;
    }
  }
  for (let i = group.length - 1; i >= 0; i--) {
    list.splice(group[i][0], group[i][1] - group[i][0] + 1, String(staticList[group[i][0]]) + "-" + String(staticList[group[i][1]]));
  }
  list = list.map((x) => String(x)).toString();
  return list;
}

console.log(solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20])); //  "-6,-3-1,3-5,7-11,14,15,17-20"
