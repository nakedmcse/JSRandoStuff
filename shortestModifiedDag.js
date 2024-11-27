// Given integer n nodes and a 2d array of modifications [node, destination]
// Initially each node is connected to the next
// modifications are applied one at a time
// return shortest path from 0 -> n-1 for each (including previous) as an array

function shortestModifiedDag(n, mods) {
    const dag = [];
    const retval = [];

    for(let i = 0; i < n; i++) dag.push(i+1);

    for(const mod of mods) {
        if(dag[mod[0]] < mod[1]) dag[mod[0]] = mod[1];
        let steps = 0;
        let loc = 0;
        while(loc < n) {
            loc = dag[loc];
            if(loc < n) steps++;
        }
        retval.push(steps);
    }
    return retval
}

console.log(`Test 1 - n=5, mods=[[2,4],[0,2],[0,4]] - should return [3,2,1] - ${shortestModifiedDag(5, [[2,4],[0,2],[0,4]])}`);
console.log(`Test 2 - n=4, mods=[[0,3],[0,2]] - should return [1,1] - ${shortestModifiedDag(4, [[0,3],[0,2]])}`);