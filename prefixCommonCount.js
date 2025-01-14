// Given two arrays of same size, return a third array that each element is the count of common elements to that point
function prefixCommonCount(a, b) {
    const retval = [];
    for(let i=0; i<a.length; i++) {
        const setA = new Set(a.slice(0,i+1));
        const setB = new Set(b.slice(0,i+1));
        retval.push([...setA].filter(x => setB.has(x)).length);
    }
    return retval;
}

console.log(`Test case 1 - [1,3,2,4],[3,1,2,4] - should return [0,2,3,4] - ${prefixCommonCount([1,3,2,4],[3,1,2,4])}`);
console.log(`Test case 2 - [2,3,1],[3,1,2] - should return [0,1,3] - ${prefixCommonCount([2,3,1],[3,1,2])}`);