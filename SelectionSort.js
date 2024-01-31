// Selection sort
function swapIdx(arr,x,y) {
    let tmp = arr[x];
    arr[x] = arr[y];
    arr[y] = tmp;
}

function selectionSort(arr) {
    for(let i = 0; i<arr.length-1; i++) {
        let lowestNumberIdx = i;
        for(let j = i + 1; j<arr.length; j++) {
            if(arr[j] < arr[lowestNumberIdx]) lowestNumberIdx = j;
        }

        if(lowestNumberIdx !== i) swapIdx(arr,i,lowestNumberIdx);
    }
}

const selections = [10,99,3,100,5,11,45,65];
selectionSort(selections);
console.table(selections);
