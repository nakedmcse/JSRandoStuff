// One Time Time Based Codes
function generateOTC(username, salt, size, validityDuration) {
    const fnv1a = (target) => {
        let hash = 2166136261;
        const prime = 16777619;
        for (let i = 0; i < target.length; i++) {
            hash = Math.imul((hash ^ target.charCodeAt(i)),prime);
        }
        return hash;
    }

    const timeBlock = Math.floor(Date.now()/(validityDuration*1000));
    return fnv1a(`${salt}${username}${timeBlock}`).toString().slice(-size);
}

console.log(generateOTC("bob", "bobsalt", 6, 60));
console.log(generateOTC("bob", "newbobsalt", 6, 60));
console.log(generateOTC("bob", "bobsalt", 6, 60));

console.log(generateOTC("alice", "alicesalt", 6, 600));
console.log(generateOTC("alice", "newalicesalt", 6, 600));