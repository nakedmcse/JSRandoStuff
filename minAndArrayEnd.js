// Given n and x, create an array with n elements, each ints greater than the last
// Their bitwise and product must be x

function minAndArrayEnd(n, x) {
    const retval = [];
    retval.push(x);
    for(let i = 1; i < n; i++) {
        retval[i] = retval[i-1] + 1;
        while((retval[i] & x) !== x) retval[i]++;
    }
    return retval;
}

console.log(`Example 1: n=3, x=4 - should be [4,5,6]: ${minAndArrayEnd(3, 4)}`);
console.log(`Example 2: n=2, x=7 - should be [7,15]: ${minAndArrayEnd(2, 7)}`);