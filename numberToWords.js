function intToWords(num) {
    const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
        "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen",
        "nineteen"];
    const tens = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    if (num < 20) return ones[num];
    if (num < 100) {
        const remainder = (num-20) % 10;
        return tens[Math.floor((num-20)/10)] + (remainder > 0 ? " " + ones[remainder] : "");
    }
    if (num < 1000) {
        const remainder = num % 100;
        return ones[Math.floor(num/100)] + " hundred" + (remainder > 0 ? " " + intToWords(remainder) : "");
    }
    if (num < 20000) {
        const remainder = num % 1000;
        return ones[Math.floor(num/1000)] + " thousand" + (remainder > 0 ? " " + intToWords(remainder) : "");
    }
    if (num < 100000) {
        const remainder = (num-20000) % 10000;
        return tens[Math.floor((num-20000)/10000)] + " thousand" + (remainder > 0 ? " " + intToWords(remainder) : "");
    }
    if (num < 1000000) {
        const remainder = num % 100000;
        return ones[Math.floor(num/100000)] + " hundred thousand" + (remainder > 0 ? " " + intToWords(remainder) : "");
    }
    if (num < 1000000000) {
        const remainder = num % 1000000;
        return intToWords(Math.floor(num/1000000)) + " million" + (remainder > 0 ? " " + intToWords(remainder) : "");
    }
    const remainder = num % 1000000000;
    return intToWords(Math.floor(num/1000000000)) + " billion" + (remainder > 0 ? " " + intToWords(remainder) : "");
}

console.log(intToWords(1));
console.log(intToWords(14));
console.log(intToWords(35));
console.log(intToWords(105));
console.log(intToWords(1500));
console.log(intToWords(19000));
console.log(intToWords(50000));
console.log(intToWords(330333));
console.log(intToWords(300005000));
console.log(intToWords(2**31));