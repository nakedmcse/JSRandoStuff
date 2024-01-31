const MIN_EXPIRATION = 30 * 24 * 60 * 60 * 1000;
const MAX_EXPIRATION = 365 * 24 * 60 * 60 * 1000;
const MAX_FILE_SIZE = 512 * 1024 * 1024;

function getExpiry(filesize) {
    const maxLifespan= Math.floor((MIN_EXPIRATION-MAX_EXPIRATION) * Math.pow((filesize/MAX_FILE_SIZE - 1),3));
    return maxLifespan;
}

const dayInMillis = 24 * 60 * 60 * 1000;

console.log("500MB file expires in: ", getExpiry(500*1024*1024)/dayInMillis);
console.log("400MB file expires in: ", getExpiry(400*1024*1024)/dayInMillis);
console.log("300MB file expires in: ", getExpiry(300*1024*1024)/dayInMillis);
console.log("200MB file expires in: ", getExpiry(200*1024*1024)/dayInMillis);
console.log("100MB file expires in: ", getExpiry(100*1024*1024)/dayInMillis);
console.log("10MB file expires in: ", getExpiry(10*1024*1024)/dayInMillis);
console.log("1MB file expires in: ", getExpiry(1024*1024)/dayInMillis);