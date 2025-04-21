// Given array of integers and two bounds lower and upper,
// A pair of indexes (i,j) is fair if:
// i < j
// lower <= nums[i] + nums[j] <= upper

function countFairPairs(nums, lower, upper) {
    let retval = 0;
    for (let i = 0; i<nums.length; i++) {
        for(let j = i+1; j<nums.length; j++) {
            const value = nums[i] + nums[j];
            if (lower <= value && value <= upper) {
                retval++;
            }
        }
    }
    return retval;
}

function countFairPairsFast(nums, lower, upper) {

    function binarySearch(arr, target, upper) {
        let low = 0, hi = arr.length;
        while (low < hi) {
            const mid = Math.floor((low + hi) / 2);
            if (arr[mid] < target && !upper) {
                low = mid + 1;
            } else if (arr[mid] <= target && upper) {
                low = mid + 1;
            } else {
                hi = mid;
            }
        }
        return low;
    }

    let retval = 0;
    nums.sort((a, b) => a - b);
    for (let i = 0; i<nums.length; i++) {
        const low = binarySearch(nums, lower - nums[i], false);
        const hi = binarySearch(nums, upper - nums[i], true);
        retval += hi - low;
        // remove the case where j <= i
        if (low <= i && i < hi) retval--;
    }
    return retval/2;
}

console.time('Array 1');
console.log(countFairPairsFast([0,1,7,4,4,5],3, 6));
console.timeEnd('Array 1');

console.time('Array 2');
console.log(countFairPairsFast([1,7,9,2,5],11, 11));
console.timeEnd('Array 2');

let bigarr = [];
for (let k=0; k<100000; k++) {
    bigarr.push(k-50000);
}
console.time('Big Array');
console.log(countFairPairsFast(bigarr,-10000, 10000));
console.timeEnd('Big Array');