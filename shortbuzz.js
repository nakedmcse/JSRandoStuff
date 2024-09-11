function logfizzbuzz() {
    let i = -1
    while (++i<101) i % 15 == 0 ? console.log("FizzBuzz")
        : i % 3 == 0 ? console.log("Fizz")
        : i % 5 == 0 ? console.log("Buzz") : console.log(i)
}

logfizzbuzz()