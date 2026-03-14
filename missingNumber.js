// Given a string with numbers up to n with exactly one missing number, find the missing number
function generateTarget(n) {
    const retval = [];
    for (let i = 1; i <= n; i++) {
        retval.push(i.toString());
    }
    return retval.join('');
}

function generateFrequencyMap(s) {
    const frequencyMap = new Map([
        ["0",0], ["1",0], ["2",0], ["3",0], ["4",0],
        ["5",0], ["6",0], ["7",0], ["8",0], ["9",0]
    ]);
    for (let i = 0; i < s.length; i++) {
        let current = frequencyMap.get(s[i]);
        frequencyMap.set(s[i], ++current);
    }
    return frequencyMap;
}

function *permute(str, prefix = "") {
    if (str.length === 0) {
        yield prefix;
        return;
    }
    for (let i = 0; i < str.length; i++) {
        yield* permute(
            str.slice(0, i) + str.slice(i + 1),
            prefix + str[i]
        );
    }
}

function missingNumber(n, given) {
    const target = generateTarget(n);
    const missingSize = target.length - given.length;
    if (missingSize <= 0) {
        throw new RangeError("The given is longer or equal to the expected");
    }
    const givenCounts = generateFrequencyMap(given);
    const targetCounts = generateFrequencyMap(target);

    let missingNumerals = "";
    for (const [k,v] of targetCounts) {
        if (givenCounts.get(k) < v) missingNumerals += k;
    }

    const possibleNumbers = [];
    for (const p of permute(missingNumerals)) {
        if (parseInt(p,10) <= n) possibleNumbers.push(p);
    }

    let final = "";
    for (const c of possibleNumbers) {
        const appears = given.split(c).length-1;
        const shouldAppear = target.split(c).length-1;
        if (appears < shouldAppear) {
            final = c;
            break;
        }
    }
    return final;
}

function main() {
    console.log(`Missing in [1012345789],10 - should be 6: ${missingNumber(10,"1012345789")}`);
    console.log(`Missing in [10111314123456789],14 - should be 12: ${missingNumber(14,"10111314123456789")}`);
}

main();