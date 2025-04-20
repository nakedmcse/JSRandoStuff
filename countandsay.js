// Take a given number n
// countAndSay(n) is the run length encoding of countAndSay(n-1)
// countAndSay(1) is "1"

function countAndSay(n) {
    let retval = "1";
    for (let i = 1; i < n; ++i) {
        retval = retval.replace(/(.)\1{0,8}/g, (match,p) => `${match.length}${p}`);
    }
    return retval;
}

console.time('Count and Say 1');
console.log(countAndSay(1));
console.timeEnd('Count and Say 1');

console.time('Count and Say 4');
console.log(countAndSay(4));
console.timeEnd('Count and Say 4');

console.time('Count and Say 30');
console.log(`Ending in ...${countAndSay(30).slice(-20)}`);
console.timeEnd('Count and Say 30');