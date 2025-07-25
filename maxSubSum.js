// Find maximal sum of a subarray after removing duplicate entries
function maxSubSum(arr) {
    const uniqueSet = new Set(arr);
    if (Math.min(...uniqueSet) >= 0) return [...uniqueSet].reduce((a, v) => a + v, 0);  // >0 min - all pos - return sum of set
    if (Math.max(...uniqueSet) <= 0) return Math.max(...uniqueSet);                     // <0 max - all neg - return max single element
    return [...uniqueSet].filter(x => x > 0).reduce((a, v) => a + v, 0);                // mixed - return only sum of positives
}

console.time('Example 1');
console.log("Example 1 - should be 15:", maxSubSum([1,2,3,4,5]));
console.timeEnd('Example 1');

console.time('Example 2');
console.log("Example 2 - should be 1:", maxSubSum([1,1,0,1,1]));
console.timeEnd('Example 2');

console.time('Example 3');
console.log("Example 3 - should be 3:", maxSubSum([1,2,-1,-2,1,0,-1]));
console.timeEnd('Example 3');