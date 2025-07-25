// Find max gain for removing substrings
// Given string s, and values x and y:
// Removing ab from the string yields x points
// Removing ba from the string yields y points
function maxGain(s, x, y) {
    let retval = 0;
    while (s.includes('ab') || s.includes('ba')) {
        if (x > y) {
            // Favour ab
            const abMatches = s.indexOf('ab');
            if(abMatches >= 0) {
                retval += x;
                s = s.replace('ab', '');
            } else {
                retval += y;
                s = s.replace('ba', '');
            }
        } else {
            // Favour ba
            const baMatches = s.indexOf('ba');
            if(baMatches >= 0) {
                retval += y;
                s = s.replace('ba', '');
            } else {
                retval += x;
                s = s.replace('ab', '');
            }
        }
    }
    return retval;
}

console.time('Example 1');
console.log("Example 1 - should be 19:", maxGain("cdbcbbaaabab",4,5));
console.timeEnd('Example 1');

console.time('Example 2');
console.log("Example 2 - should be 20:", maxGain("aabbaaxybbaabb",5,4));
console.timeEnd('Example 2');
