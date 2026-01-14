// Reality Evaluator
class decision {
    constructor(index, description, probability, previous_decision) {
        this.index = index;
        this.description = description;
        this.probability = probability;
        this.previous_decision = previous_decision;
    }
}

// Collapse given superposition fragment
function *collapse(f, i, reality, probability) {
    const next = f.filter(x => x.previous_decision === i);
    if (next.length === 0) {
        yield `${reality} ${probability}`.substring(2);
    }
    for (const event of next.sort((a,b) => (b.probabilty - a.probabilty))) {
        yield *collapse(f, event.index, `${reality}, ${event.description}`,
            probability * event.probability);
    }
}

// Featherine exists at this level and can edit
const fragment = [];
fragment.push(new decision(0,"vial breaks", 0.5, null));
fragment.push(new decision(1,"vial does not break", 0.5, null));
fragment.push(new decision(2,"cat dies", 0.9, 0));
fragment.push(new decision(3,"poison fails - cat lives", 0.1, 0));
fragment.push(new decision(4,"cat lives", 0.9, 1));
fragment.push(new decision(5,"cat suffocates - cat dies", 0.1, 1));

// Everyone else exists here
for (const reality of collapse(fragment, null, "", 1)) {
    console.log(reality);
}