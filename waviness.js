// Given two integers representing an inclusive range find:
// Count of peaks and valleys
// Peak is digit whose value is greater than either of its neighbours
// Valley is digit whose value is less than either of its neighbours
// first or last cannot be either
// less than three digits is 0

function waviness(start, end) {
    function toDigits(num) {
        const digits = [];
        while (num > 0) {
            digits.unshift(num % 10);
            num = Math.floor(num / 10);
        }
        return digits;
    }

    const wavyMemo = new Map();
    function isWavy(digits, loc) {
        if (loc === 0 || loc === digits.length - 1) return 0;
        const n = (digits[loc-1] * 100) + (digits[loc] * 10) + digits[loc+1];
        if (wavyMemo.has(n)) return wavyMemo.get(n);

        const valley = digits[loc]<digits[loc+1] && digits[loc]<digits[loc-1];
        const peak = digits[loc]>digits[loc+1] && digits[loc]>digits[loc-1];
        if (valley || peak) {
            wavyMemo.set(n, 1);
            return 1;
        }
        wavyMemo.set(n, 0);
        return 0;
    }

    let retval = 0;
    for (let i = start; i <= end; i++) {
        const digits = toDigits(i);
        for (let j = 0; j < digits.length; j++) retval += isWavy(digits,j);
    }
    return retval;
}

console.log(waviness(120,130));
console.log(waviness(198,202));
console.log(waviness(4848,4848));
console.log(waviness(Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER));