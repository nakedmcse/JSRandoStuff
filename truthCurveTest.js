const NOTHING = 0;
const NOTRUTH = 1;
const BLUETRUTH = 2;
const PURPLETRUTH = 2.2;
const REDTRUTH = 3;
const GOLDTRUTH = 3.3;
const K = 2;

function truthCurve(P, N) {
    return 50 + (50 * Math.tanh((P-N)/K));
}

console.log(`No Truth, with love: ${truthCurve(NOTRUTH,NOTRUTH)}`);
console.log(`Blue Truth, with love: ${truthCurve(BLUETRUTH,NOTRUTH)}`);
console.log(`Purple Truth, with love: ${truthCurve(PURPLETRUTH,NOTRUTH)}`);
console.log(`Red Truth, with love: ${truthCurve(REDTRUTH,NOTRUTH)}`);
console.log(`Gold Truth, with love: ${truthCurve(GOLDTRUTH,NOTRUTH)}`);
console.log();
console.log(`No Truth, without love: ${truthCurve(NOTRUTH,NOTRUTH)}`);
console.log(`Blue Truth, without love: ${truthCurve(NOTRUTH,BLUETRUTH)}`);
console.log(`Purple Truth, without love: ${truthCurve(NOTRUTH,PURPLETRUTH)}`);
console.log(`Red Truth, without love: ${truthCurve(NOTRUTH,REDTRUTH)}`);
console.log(`Gold Truth, without love: ${truthCurve(NOTRUTH,GOLDTRUTH)}`);
console.log();
console.log(`No Truth, with love, no negative: ${truthCurve(NOTRUTH,NOTHING)}`);
console.log(`Blue Truth, with love, no negative: ${truthCurve(BLUETRUTH,NOTHING)}`);
console.log(`Purple Truth, with love, no negative: ${truthCurve(PURPLETRUTH,NOTHING)}`);
console.log(`Red Truth, with love, no negative: ${truthCurve(REDTRUTH,NOTHING)}`);
console.log(`Gold Truth, with love, no negative: ${truthCurve(GOLDTRUTH,NOTHING)}`);
console.log();
console.log(`No Truth, without love, no positive: ${truthCurve(NOTHING,NOTRUTH)}`);
console.log(`Blue Truth, without love, no positive: ${truthCurve(NOTHING,BLUETRUTH)}`);
console.log(`Purple Truth, without love, no positive: ${truthCurve(NOTHING,PURPLETRUTH)}`);
console.log(`Red Truth, without love, no positive: ${truthCurve(NOTHING,REDTRUTH)}`);
console.log(`Gold Truth, without love, no positive: ${truthCurve(NOTHING,GOLDTRUTH)}`);