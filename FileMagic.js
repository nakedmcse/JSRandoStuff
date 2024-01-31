//Find file type from magic number
const fs = require('fs');

function checkMagic(buffer, offset, hexstr) {
        const hexBuffer = Buffer.from(hexstr,'hex');
        for (let i = 0; i < hexBuffer.length; i++) {
            if (buffer[offset + i] !== hexBuffer[i]) {
                return false;
            }
        }
        return true;
}

function findMimeType(mimeMagics, buffer) {
    for(let key in mimeMagics) {
        const currentType = mimeMagics[key].mime;
        for(let j = 0; j<mimeMagics[key].signs.length; j++) {
            const splitSign = mimeMagics[key].signs[j].split(',');
            if(checkMagic(buffer,parseInt(splitSign[0]),splitSign[1])) {
                return {key,currentType};
            }
        }
    }
    return "Unknown Type";
}

const mimeMagics = JSON.parse(fs.readFileSync('mimemagics.json'));
const bufferFile = fs.readFileSync('test.png');

console.log(findMimeType(mimeMagics,bufferFile));