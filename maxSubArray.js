// Given an array of +/- numbers, find the sub array slice that is the max of them added

function maxSubArray(nums) {
    let maxSeen = -Infinity;
    let currentSeen = 0;
    let maxLeft = 0;
    let maxRight = 0;

    for (let i = 0; i < nums.length; i++) {
        currentSeen += nums[i];
        if (currentSeen > maxSeen) {
            maxSeen = currentSeen;
            maxRight = i;
        }
        if (currentSeen < 0) {
            currentSeen = 0;
            maxLeft = i+1;
        }
    }

    return [...nums.slice(maxLeft, maxRight+1)];
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));