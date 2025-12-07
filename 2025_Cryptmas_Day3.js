// Cryptmas Day 3
const cypherText = "zahyspnoa";

function caeserCypher(text, offset) {
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    let output = "";
    for (let i = 0; i < text.length; i++) {
        const target = (alpha.indexOf(text[i])+offset) % alpha.length;
        output += alpha[target];
    }
    return output;
}

// Caeser cypher - try varying offsets, check for output as a dictionary word
const url = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json'
fetch(url)
    .then(res => res.json())
    .then(data => {
        for (let i = 1; i < 27; i++) {
            const cleartext = caeserCypher(cypherText, i);
            if (data[cleartext]) {
                console.log(`Day 3 Cleartext: ${cleartext}, Caeser Cypher: ${i}`);
            }
        }
    })