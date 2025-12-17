// 2025 Cryptmas Day 12
const cypherText = "4a505b505a5b54544b424a5b";
const key1 = "snow";
const key2 = "eve";
const key3 = 0x23;

function columnCypher(text, key) {
    const columns = key.length;
    const rows = Math.ceil(text.length / columns);
    const collens = new Array(columns).fill(rows);
    const indices = [...key].map((ch, idx) => ({ ch, idx }));
    indices.sort((a, b) => (a.ch < b.ch ? -1 : a.ch > b.ch ? 1 : 0));

    const colData = new Array(columns);
    let pos = 0;
    for (const { idx } of indices) {
        const len = collens[idx];
        colData[idx] = text.slice(pos, pos + len).split("");
        pos += len;
    }

    const result= [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (r < colData[c].length) {
                result.push(colData[c][r]);
            }
        }
    }

    return result.join("").replaceAll('x','');
}

function caeserCypher(text, offset) {
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    let output = "";
    for (let i = 0; i < text.length; i++) {
        let target = (alpha.indexOf(text[i])+offset) % alpha.length;
        if (target < 0) target = 26 + target;
        output += alpha[target];
    }
    return output;
}

function viginereCypher(text, key) {
    let result = "";
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < text.length; i++) {
        const offset = alpha.indexOf(key[i % key.length]);
        result += caeserCypher(text[i], 0-offset);
    }
    return result;
}

function xorCypher(text, key) {
    const cypherBytes =
        new Uint8Array([...text.matchAll(/../g)].map(m => parseInt(m[0], 16)));
    let result = "";
    for (let i = 0; i < cypherBytes.length; i++) {
        result +=  String.fromCharCode(cypherBytes[i] ^ key[i % key.length].charCodeAt(0));
    }
    return result;
}

let cleartext = xorCypher(cypherText, String.fromCharCode(key3));
cleartext = columnCypher(cleartext, key1);
cleartext = viginereCypher(cleartext, key2);
console.log(`Day 12 Cleartext: ${cleartext}`);