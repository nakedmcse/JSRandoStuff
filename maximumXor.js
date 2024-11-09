// Find the number list that maximizes the xor end product of the list, limited to maxbits
function getMaxXor(nums, maxBit) {
    const retval = [];

    while(nums.length > 0) {
        const endXor = nums.reduce((a, v) => (a = a ^ v));
        let maxval = 0;
        let answer = 0;
        for (let i = (2 ** maxBit)-1; i >= 0; i--) {
            if ((endXor ^ i) > maxval) {
                maxval = endXor ^ i;
                answer = i;
            }
        }
        retval.push(answer);
        nums.pop();
    }
    return retval;
}

console.log(`Example 1: [0,1,1,3] with 2 max bits - should be [0,3,2,3]: ${getMaxXor([0,1,1,3], 2)}`);
console.log(`Example 2: [2,3,4,7] with 3 max bits - should be [5,2,6,5]: ${getMaxXor([2,3,4,7], 3)}`);
console.log(`Example 3: [0,1,2,2,5,7] with 3 max bits - should be [4,3,6,4,6,7]: ${getMaxXor([0,1,2,2,5,7], 3)}`);