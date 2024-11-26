// Given n (number of nodes) and edges (array of (node, destination))
// Find the top of the graph (node that does not appear in any other destination)
// If multiple tops, return -1

function topDag(n, edges) {
    const winners = [];
    for(let i = 0; i < n; i++) {
        const links = edges.filter(x => x[0] === i);
        const destinations = edges.filter(x => x[1] === i);
        if(links.length > 0 && destinations.length === 0) winners.push(i);
    }
    return winners.length === 1 ? winners[0] : -1
}

console.log(`Test case 1: n=3, [[0,1],[1,2]] - should be 0 - ${topDag(3, [[0,1],[1,2]])}`);
console.log(`Test case 2: n=4, [[0,2],[1,3],[1,2]] - should be -1 - ${topDag(4, [[0,2],[1,3],[1,2]])}`)