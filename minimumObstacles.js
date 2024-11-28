// Given a grid of open (0) or blocked (1) cells as a 2d int array
// Find the minimum number of blocks to remove to make it from 0,0 to x-1, y-1

function minimumObstacles(grid) {
    const endX = grid[0].length;
    const endY = grid.length;
    const queue = [];
    const winners = [];

    queue.push([[0,0,0]]);
    let minlen = Infinity;

    while(queue.length > 0) {
        const cur = queue.pop();
        // check for endpoint
        const y = cur[cur.length-1][0];
        const x = cur[cur.length-1][1];
        const cost = cur[cur.length-1][2];
        if(cost > minlen) continue;  // Already found a better path
        if(y === endY-1 && x === endX-1) {
            winners.push([...cur]);  // Hit endpoint
            if(cost < minlen) minlen = cost;
            continue;
        }
        // explore
        const explore = [];
        if(y - 1 >= 0 && cur.filter(h => h[0] === y-1 && h[1] === x).length === 0) {
            const up = [...cur];
            up.push([y-1, x, cost + grid[y-1][x]]);
            explore.push(up);
        }
        if(y + 1 < endY && cur.filter(h => h[0] === y+1 && h[1] === x).length === 0) {
            const down = [...cur];
            down.push([y+1, x, cost + grid[y+1][x]]);
            explore.push(down);
        }
        if(x - 1 >= 0 && cur.filter(h => h[0] === y && h[1] === x-1).length === 0) {
            const left = [...cur];
            left.push([y, x-1, cost + grid[y][x-1]]);
            explore.push(left);
        }
        if(x + 1 < endX && cur.filter(h => h[0] === y && h[1] === x+1).length === 0) {
            const right = [...cur];
            right.push([y, x+1, cost + grid[y][x+1]]);
            explore.push(right);
        }
        explore.sort((a,b) => (a[a.length-1][2] - b[b.length-1][2]));  // Explore non blocked first
        explore.forEach(x => queue.push([...x]));
    }

    return minlen;
}

function generateRandomArray(rows, cols) {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.random() < 0.5 ? 0 : 1)
    );
}

console.log(`Test 1 - grid=[[0,1,1],[1,1,0],[1,1,0]] - should return 2 - ${minimumObstacles([[0,1,1],[1,1,0],[1,1,0]])}`);
console.log(`Test 2 - grid=[[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]] - should return 0 - ${minimumObstacles([[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]])}`);
console.time();
const ra = generateRandomArray(10,10);
console.log(`Random 10x10 - ${minimumObstacles(ra)}`);
console.timeEnd();