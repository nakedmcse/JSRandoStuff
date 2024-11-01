// Strip any repeating chars beyond the given number
function generateLongCode() {
    const outputSB = [];
    const choices = ['a','b','c','d'];
    for(let i = 0; i < 2**26; i++) outputSB.push(choices[Math.floor(Math.random() * choices.length)]);
    return outputSB.join('');
}

function stripchars(s, limit) {
    let retval = "";
    let prevchar = "";
    let runlength = 1;
    for(let i = 0; i < s.length; i++) {
        if(s[i] === prevchar) {
            runlength++;
        } else {
            runlength = 1;
            prevchar = s[i];
        }
        if(runlength < limit) retval += s[i];
    }
    return retval;
}

function stripcharsSB(s, limit) {
    const retvalSB = [];
    const prevchar = [];
    let runlength = 1;
    for(let i = 0; i < s.length; i++) {
        if(s[i] === prevchar[0]) {
            runlength++;
        } else {
            runlength = 1;
            prevchar[0] = s[i];
        }
        if(runlength < limit) retvalSB.push(s[i]);
    }
    return retvalSB.join('');
}

function stripcharsRegex(s, limit) {
    return s.replace(/(.)\1{2,}/g, "$1$1")
}

console.log(`Example 1: should return leetcode: ${stripcharsSB("leeetcode", 3)}`);
console.log(`Example 2: should return aabaa: ${stripcharsSB("aaabaaaa", 3)}`);
console.log(`Example 3: should return aab: ${stripcharsSB("aab", 3)}`);
const longtest = generateLongCode();
const startSB = performance.now();
const retSB = stripcharsSB(longtest, 3);
const endSB = performance.now()
console.log(`Stringbuilder pattern completed in ${endSB - startSB} ms`);
const startStr = performance.now();
const retStr = stripchars(longtest, 3);
const endStr = performance.now()
console.log(`String pattern completed in ${endStr - startStr} ms`);