// Worst rank
function rank(score) {
    return score > 90 ? "A" : score > 80 ? "B" : score > 70 ? "C" : score > 60 ? "D" : "E"
}

function cursedRank(score) {
    return "EEEEEEDCBA".charAt(Math.floor(score/10))
}

console.log(rank(95), rank(75), rank(65), rank (40));
console.log(cursedRank(95), cursedRank(75), cursedRank(65), cursedRank (40));