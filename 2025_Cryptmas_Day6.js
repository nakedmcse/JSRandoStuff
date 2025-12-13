// Cryptmas Day 6
const cypherText = "aexnrxltn";
const cypherKey = "ice";

// Brute force
function* permute(str, prefix = "") {
    if (str.length === 0) {
        yield prefix;
        return;
    }
    for (let i = 0; i < str.length; i++) {
        yield* permute(
            str.slice(0, i) + str.slice(i + 1),
            prefix + str[i]
        );
    }
}

// Try permutations
const url = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json'
fetch(url)
    .then(res => res.json())
    .then(data => {
        let cleartext = new Set();
        for (const perm of permute(cypherText)) {
            for (let i = 6; i < perm.length; i++) {
                if (data[perm.substring(0,i)]) {
                    cleartext.add(perm.substring(0,i));
                }
            }
        }
        console.log(`Day 6 Cleartext Candidates: ${[...cleartext].join(',')}`);
    })