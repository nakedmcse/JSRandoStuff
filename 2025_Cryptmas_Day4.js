// Cryptmas Day 4
const cypherText = "xvfakvra";
const cypherKey = "snow";

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

// Rotating Caeser cypher - try offsets based on the key, check for output as a dictionary word
const url = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json'
fetch(url)
    .then(res => res.json())
    .then(data => {
        const alpha = "abcdefghijklmnopqrstuvwxyz";
        let cleartext = "";
        for (let i = 0; i < cypherText.length; i++) {
            const offset = alpha.indexOf(cypherKey[i % cypherKey.length]);
            cleartext += caeserCypher(cypherText[i], 0-offset);
        }
        if (data[cleartext]) {
            console.log(`Day 4 Cleartext: ${cleartext}`);
        }
    })