function spread(arr,val,cond) {
    return cond ? [val, ...arr] : [...arr, val];
}

function common(arr,val,cond) {
    return cond ? arr.unshift(val) : arr.push(val);
}

function concatarr(arr,val,cond) {
    return cond ? [val].concat(arr) : arr.concat(val);
}

for(let i = 0; i < 3; i++) {
    const arr1 = [];
    const arr2 = [];
    for(let j = 0; j < 1000000; j++) {
        arr1.push(j);
        arr2.push(j);
    }

    if(i === 0) {
        console.time('Spread');
        spread(arr1,999,true);
        spread(arr2, 999, false);
        console.timeEnd('Spread');
    } else if(i === 1) {
        console.time('Common');
        common(arr1,999,true);
        common(arr2, 999, false);
        console.timeEnd('Common');
    } else {
        console.time('Concat');
        concatarr(arr1,999,true);
        concatarr(arr2, 999, false);
        console.timeEnd('Concat');
    }
}