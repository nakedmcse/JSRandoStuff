// Credit Card Validator
function validate_cc(cardnumber) {
    const replacements = "0246813579";
    let sum = 0;
    cardnumber = cardnumber.replace(/ /g, "");
    for(let i = 0; i < cardnumber.length; i++) {
        const val = i%2 === 0 ? replacements[cardnumber[i]] : cardnumber[i];
        sum += parseInt(val);
    }
    return sum%10 === 0;
}

console.log("4137 8947 1175 5904:", validate_cc("4137 8947 1175 5904"))
console.log("1234 5678 1234 5678:", validate_cc("1234 5678 1234 5678"))