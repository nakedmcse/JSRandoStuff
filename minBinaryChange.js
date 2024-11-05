// Given a binary sting of even length, find the minimum number of changes
// To make each substring of even length run of 1s or 0s

// DP version - problem can be decomposed to individual groups of two digits
function dpMinBinaryChange(s) {
    let changes = 0;
    for(let i = 0; i < s.length; i += 2) if(s[i] !== s[i+1]) changes++;
    return changes;
}

// Forward and reverse search
function minBinaryChange(s) {
    // Check run lengths forward
    let curRunLen = 0;
    let forwardChanges = 0;
    let prevChar = "";
    for(let i = 0; i < s.length; i++) {
        if(s[i] !== prevChar) {
            if(curRunLen % 2 !== 0) {
                forwardChanges++;
            } else {
                curRunLen = 0;
            }
        }
        curRunLen++;
        prevChar = s[i];
    }
    // Check run lengths reverse
    let reverseChanges = 0;
    curRunLen = 0;
    prevChar = "";
    for(let i = s.length-1; i >= 0; i--) {
        if(s[i] !== prevChar) {
            if(curRunLen % 2 !== 0) {
                reverseChanges++;
            } else {
                curRunLen = 0;
            }
        }
        curRunLen++;
        prevChar = s[i];
    }
    // Return min
    return Math.min(forwardChanges, reverseChanges);
}

console.log(`Example 1 - MinBinaryChanges for 1001 should return 2: ${minBinaryChange("1001")}`);
console.log(`Example 2 - MinBinaryChanges for 10 should return 1: ${minBinaryChange("10")}`);
console.log(`Example 3 - MinBinaryChanges for 0000 should return 0: ${minBinaryChange("0000")}`);
console.log(`Example 4 - MinBinaryChanges for 011111 should return 1: ${minBinaryChange("011111")}`);
console.log();

console.log(`Example 1 - dpMinBinaryChanges for 1001 should return 2: ${dpMinBinaryChange("1001")}`);
console.log(`Example 2 - dpMinBinaryChanges for 10 should return 1: ${dpMinBinaryChange("10")}`);
console.log(`Example 3 - dpMinBinaryChanges for 0000 should return 0: ${dpMinBinaryChange("0000")}`);
console.log(`Example 4 - dpMinBinaryChanges for 011111 should return 1: ${dpMinBinaryChange("011111")}`);