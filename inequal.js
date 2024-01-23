// Stupid JS tricks - inequal is equal

const a = {
	b: 0,
	valueOf: function() { return ++this.b;}
};

console.log(a);

if (a==1 && a==2 && a==3) console.log("Yes, it does");
