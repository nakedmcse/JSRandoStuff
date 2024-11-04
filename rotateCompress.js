// Circular sentence - true is the last character of each word is the same as the first character of the next
// and the last character of the last word is the same as the first character of the first word
function isCircular(s) {
    const splitS = s.split(' ');
    if(splitS[0][0] !== splitS[splitS.length-1][splitS[splitS.length-1].length-1]) return false;  // first and last char do not match
    if(splitS.length === 1) return true; // first and last char match on a single word
    for(let i = 1; i < splitS.length; i++) {
        if(splitS[i][0] !== splitS[i-1][splitS[i-1].length-1]) return false;
    }
    return true;
}

// Rotate string - true only if s can be left shifted to g
function rotateString(s, g) {
    for(let i = 0; i < s.length; i++) {
        if(s === g) return true;
        s = s.slice(1) + s[0];
    }
    return false;
}

// Compress string - replace characters with number of repeats (1-9)+char
function compressedString(s) {
    return s.replace(/(.)\1{0,8}/g, (match, p) => `${match.length}${p}`);
}

// Run Tests
console.log(`Circular String: Example 1 s = "leetcode exercises sound delightful", should return true: ${isCircular("leetcode exercises sound delightful")}`);
console.log(`Circular String: Example 2 s = "eetcode", should return true: ${isCircular("eetcode")}`);
console.log(`Circular String: Example 3 s = "Leetcode is cool", should return false: ${isCircular("Leetcode is cool")}`);
console.log();
console.log(`Rotate String: Example 1 s = "abcde", g = "cdeab", should return true: ${rotateString("abcde", "cdeab")}`);
console.log(`Rotate String: Example 2 s = "abcde", g = "abced", should return false: ${rotateString("abcde", "abced")}`);
console.log();
console.log(`Compress String: Example 1 s = "abcde", should return "1a1b1c1d1e": ${compressedString("abcde")}`);
console.log(`Compress String: Example 2 s = "aaaaaaaaaaaaaabb":, should return "9a5a2b": ${compressedString("aaaaaaaaaaaaaabb")}`);