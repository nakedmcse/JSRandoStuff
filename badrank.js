// Worst rank
function rank(score) {
    return score > 90 ? "A" : score > 80 ? "B" : score > 70 ? "C" : score > 60 ? "D" : "E"
}

console.log(rank(95), rank(75), rank(65), rank (40));