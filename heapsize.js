const v8 =require('v8');
let totalHeapSize = v8.getHeapStatistics().total_available_size;
let totalHeapSizeinGB = (totalHeapSize /1024/1024/1024).toFixed(2);
console.log(`Total heap size: ${totalHeapSizeinGB} GB`);

const buffer = new ArrayBuffer(4294967296);
buffer[0] = 1;
buffer[4294967295] = 1;

totalHeapSize = v8.getHeapStatistics().external_memory;
totalHeapSizeinGB = (totalHeapSize /1024/1024/1024).toFixed(2);
console.log(`Total heap size: ${totalHeapSizeinGB} GB`);