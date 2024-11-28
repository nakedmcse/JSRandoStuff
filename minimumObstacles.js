// Given a grid of open (0) or blocked (1) cells as a 2d int array
// Find the minimum number of blocks to remove to make it from 0,0 to x-1, y-1

function minimumObstacles(grid) {
    const endX = grid[0].length;
    const endY = grid.length;
    const queue = [];
    const winners = [];

    queue.push([[0,0,0]]);
    while(queue.length > 0) {
        const cur = queue.pop();
        // check for endpoint
        const y = cur[cur.length-1][0];
        const x = cur[cur.length-1][1];
        const cost = cur[cur.length-1][2];
        if(y === endY-1 && x === endX-1) {
            winners.push([...cur]);
            continue;
        }
        // explore
        if(y - 1 >= 0 && cur.filter(h => h[0] === y-1 && h[1] === x).length === 0) {
            const up = [...cur];
            up.push([y-1, x, cost + grid[y-1][x]]);
            queue.push(up);
        }
        if(y + 1 < endY && cur.filter(h => h[0] === y+1 && h[1] === x).length === 0) {
            const down = [...cur];
            down.push([y+1, x, cost + grid[y+1][x]]);
            queue.push(down);
        }
        if(x - 1 >= 0 && cur.filter(h => h[0] === y && h[1] === x-1).length === 0) {
            const left = [...cur];
            left.push([y, x-1, cost + grid[y][x-1]]);
            queue.push(left);
        }
        if(x + 1 < endX && cur.filter(h => h[0] === y && h[1] === x+1).length === 0) {
            const right = [...cur];
            right.push([y, x+1, cost + grid[y][x+1]]);
            queue.push(right);
        }
    }

    let minRemovals = Infinity;
    winners.forEach(h => {if(h[h.length-1][2] < minRemovals) minRemovals = h[h.length-1][2]});
    return minRemovals;
}

console.log(`Test 1 - grid=[[0,1,1],[1,1,0],[1,1,0]] - should return 2 - ${minimumObstacles([[0,1,1],[1,1,0],[1,1,0]])}`);
console.log(`Test 2 - grid=[[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]] - should return 0 - ${minimumObstacles([[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]])}`);