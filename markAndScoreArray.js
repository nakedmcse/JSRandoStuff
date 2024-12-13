// Given an array of integers, do the following until all elements are marked, and return the score.
// 1. Find smallest int not marked.  On tie use one with smallest index.
// 2. Add that to the score, and mark the element.
// 3. Mark both adjacent elements.

function markAndScoreArray(np) {
    const n = [...np];  // deep copy array to not destroy original
    let score = 0;
    while(n.some(x => x !== Infinity)) {
        // Find min idx
        let minidx = Infinity;
        let min = Infinity;
        for(let i = 0; i<n.length; i++) if(n[i]<min) {
            min = n[i];
            minidx = i;
        }
        // Score and mark
        score += min;
        n[minidx] = Infinity;
        if(minidx-1>=0) n[minidx-1] = Infinity;
        if(minidx+1<n.length) n[minidx+1] = Infinity;
    }
    return score;
}

console.log(`Test 1 - [2,1,3,4,5,2] - should return 7 - ${markAndScoreArray([2,1,3,4,5,2])}`);
console.log(`Test 2 - [2,3,5,1,3,2] - should return 5 - ${markAndScoreArray([2,3,5,1,3,2])}`);