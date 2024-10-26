// Traditional
try {
    console.log('Lets try a ref error')
    const val = x/10;
}
catch(e) {
    console.log(`In catch block ${e}`)
}
finally {
    console.log(`In finally block`);
    console.log();
}

// Async/Functional
Promise.resolve().then(() => {
    console.log('Lets try a functional ref error')
    const val = x/10;
})
.catch((e)=>{
    console.log(`In catch block ${e}`)
})
.finally(() => {
    console.log(`In finally block`);
    console.log()
})