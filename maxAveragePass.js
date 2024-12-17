// Given a list of passing student number and total student numbers for a set of classes and
// a number of extra passing students that can be added, return the max average pass ratio
function maxAveragePass(classes, extra) {
    function calcAvg(c) {
        let avgPassRatio = 0;
        c.forEach(x => { avgPassRatio += x[0]/x[1] });
        return avgPassRatio / c.length;
    }

    for(let i = 0; i < extra; i++) {
        let maxAvg = 0;
        let maxIdx = -1;
        for(let j = 0; j<classes.length; j++) {
            //const clprime = JSON.parse(JSON.stringify(classes));
            const clprime = [];
            classes.forEach(x => clprime.push([...x]));
            clprime[j][0]++;
            clprime[j][1]++;
            if(calcAvg(clprime) > maxAvg) {
                maxAvg = calcAvg(clprime);
                maxIdx = j;
            }
        }
        classes[maxIdx][0]++;
        classes[maxIdx][1]++;
    }

    return calcAvg(classes);
}

console.log(`Test 1 - [[1,2],[3,5],[2,2]] with 2 extra - should return 0.78333 - ${maxAveragePass([[1,2],[3,5],[2,2]], 2)}`)
console.log(`Test 2 - [[2,4],[3,9],[4,5],[2,10]] with 4 extra - should return 0.53485 - ${maxAveragePass([[2,4],[3,9],[4,5],[2,10]], 4)}`);