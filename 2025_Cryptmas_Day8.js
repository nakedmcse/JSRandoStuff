// 2025 Cryptmas Day 8
const cypherText = "1b01031f170d161c1d0a";
const cypherKey = "sno";

function xorCypher(text, key) {
    const cypherBytes =
        new Uint8Array([...text.matchAll(/../g)].map(m => parseInt(m[0], 16)));
    let result = "";
    for (let i = 0; i < cypherBytes.length; i++) {
        result +=  String.fromCharCode(cypherBytes[i] ^ key[i % key.length].charCodeAt(0));
    }
    return result;
}

// XOR with repeating key
let cleartext = xorCypher(cypherText,cypherKey);
console.log(`Day 8 Cleartext: ${cleartext}`);