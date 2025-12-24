// Compare two files using hamming distance
import { Jimp } from 'jimp';

function hammingDistance(a,b) {
    return (a ^ b).toString(2).split('').filter(c => c === '1').length;
}

function hammingCompare(image1, image2) {
    const len1 = image1.bitmap.data.length;
    const len2 = image2.bitmap.data.length;
    const compareLen = Math.min(len1, len2);
    const extraLen = Math.abs(len2 - len1);

    let hammingDiff = 0;
    for (let i = 0; i < compareLen; i++) {
        hammingDiff += hammingDistance(image1.bitmap.data[i], image2.bitmap.data[i]);
    }
    hammingDiff += extraLen*8;
    return 1 - (hammingDiff / ((compareLen + extraLen)*8));
}

const testFile1 = "test1.jpeg";
const testFile2 = "test2.jpeg";
const testFile3 = "test3.jpeg";

const buf1 = await Jimp.read(testFile1);
const buf2 = await Jimp.read(testFile2);
const buf3 = await Jimp.read(testFile3);

console.time('SimilarityCompare');
console.log(`Similarity of test1 and test2 is ${hammingCompare(buf1, buf2)}`);
console.log(`Similarity of test1 and test3 is ${hammingCompare(buf1, buf3)}`);
console.timeEnd('SimilarityCompare');