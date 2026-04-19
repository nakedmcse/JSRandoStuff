async function newKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );
    return keyPair;
}

async function exportKey(key, format){
    // format is "spki" for public and "pkcs8" for private
    const exported = await window.crypto.subtle.exportKey(format, key);
    const pemBody = btoa(String.fromCharCode.apply(null, new Uint8Array(exported)))
        .match(/.{1,64}/g).join("\n");
    const headerType = format === "spki" ? "PUBLIC KEY" : "PRIVATE KEY";
    return `-----BEGIN ${headerType}-----\n${pemBody}\n-----END ${headerType}-----`;
}

function generateKeyPair() {
    newKeyPair().then(x => {
        const publicElt = document.getElementById("publicKey");
        const privateElt = document.getElementById("privateKey");
        exportKey(x.publicKey, "spki").then(y => {
            publicElt.innerText = y;
            exportKey(x.privateKey, "pkcs8").then(z => {
                privateElt.innerText = z;
            });
        });
    })
}
