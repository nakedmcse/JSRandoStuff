// Andys Lexical tricks
function getDeffered() {
    let resolve, reject;
    new Promise((res,rej) => {
        resolve = res;
        reject = rej;
    }).then(console.log,console.error);
    return [resolve,reject];
}

const [resolve,reject] = getDeffered();

resolve(1);
reject(2);