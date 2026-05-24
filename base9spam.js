function base9encode(string) {
    const letters = 'asdfghjkl';
    const bytes = new TextEncoder().encode(string);

    let number = 0n;
    bytes.toReversed().forEach((value) => {
        number <<= 8n;
        number += BigInt(value);
    });

    const encoded = number
        .toString(9)
        .split('')
        .map(v => letters[parseInt(v, 9)])
        .join('');

    return `sk${encoded}`;
}

function base9decode(encoded) {
    const letters = 'asdfghjkl';

    let number = 0n;
    const body = encoded.slice(2);

    for (const ch of body) {
        const digit = letters.indexOf(ch);
        if (digit === -1) continue;
        number = number * 9n + BigInt(digit);
    }

    const bytes = [];
    while (number > 0n) {
        bytes.push(Number(number & 0xffn));
        number >>= 8n;
    }
    return String.fromCharCode(...bytes);
}

console.log(base9encode('this is a test'));
console.log(base9decode("skkzhlshhyfgfjfsdaazlfdfgjffpgfslfjflghhufjs"));