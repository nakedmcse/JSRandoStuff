// Chudnovsky Pi with Binary Splitting
function chudPiBS(digits) {
    const c = 640320n;
    const cCubeDiv24 = (c**3n)/24n;

    const bs = (a,b) => {
        let Pab,Qab,Tab;
        if (b - a === 1n) {
            if (a === 0n) {
                Pab = 1n;
                Qab = 1n;
            } else {
                Pab = (6n * a - 5n) * (2n * a - 1n) * (6n * a - 1n);
                Qab = (a * a * a * cCubeDiv24);
            }
            Tab = (a & 1n) === 1n ? 0n - Pab * (13591409n + 545140134n * a)
                : Pab * (13591409n + 545140134n * a);
        } else {
            let m = (a+b)/2n;  // Midpoint
            const [Pam, Qam, Tam] = bs(a,m);
            const [Pmb, Qmb, Tmb] = bs(m,b);
            Pab = Pam * Pmb;
            Qab = Qam * Qmb;
            Tab = Qmb * Tam + Pam * Tmb;
        }
        return [Pab, Qab, Tab]
    };

    const digitsPerTerm = Math.log10(Number(cCubeDiv24/6n/2n/6n));
    const n = BigInt(Math.floor(digits/digitsPerTerm)+1);
    const [P,Q,T] = bs(0n,n);
    const sqrC = bigSqrt(10005n*(10n**(2n*BigInt(digits))));
    return (Q * 426880n * sqrC)/T;
}

function bigSqrt(v) {
    if (v < 2n) return v;
    const bitLength = v.toString(2).length;
    let x0 = 1n << BigInt((bitLength + 1) >> 1);
    while (true) {
        const x1 = (x0 + v / x0) >> 1n;
        if (x0 === x1 || x0 === x1 - 1n) {
            return x0 <= x1 ? x0 : x1;
        }
        x0 = x1;
    }
}

console.time('Chud Pi BS');
console.log(chudPiBS(100000));
console.log('100,000 digits');
console.timeEnd('Chud Pi BS');