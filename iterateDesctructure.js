// Iterate dictionary
const capitals = {
    USA: "Washington DC",
    Poland: "Warsaw",
    Scotland: "Edinburgh"
}

for(const [country, capital] of Object.entries(capitals)) {
    console.log(`The capital of ${country} is ${capital}`)
}