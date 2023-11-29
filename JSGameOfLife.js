// Game of Life

// Cells
class GOLCell {
    constructor(x,y,live) {
        this.x = x;
        this.y = y;
        this.live = live;
    }

    // Get 'live' neighboring cells
    liveNeighborsCount(arr) {
        let ystart = this.y-1 < 0 ? this.y : this.y-1;
        let yend = this.y+1 > arr.length ? this.y : this.y+1;
        let xstart = this.x-1 < 0 ? this.x : this.x-1;
        let xend = this.x+1 > arr[this.y].length ? this.x : this.x+1;

        let lives = this.live ? -1 : 0;
        for(let i = ystart; i<yend; i++) {
            lives += arr[i].slice(xstart,xend).filter(x => x.live).length;
        }
    
        return lives;
    }

    // Spawn the next generation of this cell
    spawnNext(arr) {
        let liveNeighbors = this.liveNeighborsCount(arr);

        if(!this.live && liveNeighbors == 3) {
            // Dead + 3 live neighbors => resurrected 
            return new GOLCell(this.x, this.y, true);
        }

        if(this.live) {
            switch(liveNeighbors) {
                case 1:
                    // 1 neighbor only - cell dies
                    return new GOLCell(this.x, this.y, false);
                    break;
                case 2:
                case 3:
                    // 2-3 neighbors - cell lives
                    return new GOLCell(this.x, this.y, true);
                    break;
                default:
                    // More than 3 - cell dies
                    return new GOLCell(this.x, this.y, false);
            }
        }

        // No rules match - return existing state
        return new GOLCell(this.x, this.y, this.live);
    }
}

// Render array to console
function renderGeneration(arr) {
    for(let x=0; x<arr.length; x++) {
        let outline = arr[x].reduce((acc,cur) => {return acc + (cur.live ? "*" : "-")},"");
        console.log(outline);
    }
}

// Check to see if entire array is dead
function colonyDead(arr) {
    for(let x=0; x<arr.length; x++) {
        if(arr[x].some((e) => e.live)) return false;
    }
    return true;
}

// Main Loop
let CurrentGeneration = [];
let generationNumber = 1;

// Create initial generation
for (let x = 0; x<20; x++) {
    CurrentGeneration[x]=[];
    for (let y = 0; y<20; y++) {
        CurrentGeneration[x][y] = new GOLCell(x, y, (Math.random() > 0.5))
    }
}

// Loop life
while(true) {
    // Render current generation
    console.log("Generation:",generationNumber);
    renderGeneration(CurrentGeneration);

    // Generate next generation
    let NextGeneration = [];
    for(let row=0; row<CurrentGeneration.length; row++) {
        NextGeneration[row] = CurrentGeneration[row].map(cell => {return cell.spawnNext(CurrentGeneration)});
    }
    generationNumber++;
    CurrentGeneration = NextGeneration;

    // Colony dies then exit loop
    if(colonyDead(CurrentGeneration)) {
        console.log("COLONY DEAD");
        break;
    }
}