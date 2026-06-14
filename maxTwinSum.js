// Given a linked list of even length, then for given index from the start i,
// the same distance from end is its "twin", find the twin with the max sum

class listnode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }

    toArray() {
        const retval = [];
        let current = this;
        do {
            retval.push(current.value);
        } while (current.next ? current = current.next : 0);
        return retval;
    }

    fromArray(nums) {
        let current = this;
        for (let i = 0; i < nums.length; i++) {
            current.value = nums[i];
            if (i < nums.length - 1) {
                current.next = new listnode(0);
                current = current.next;
            }
        }
    }
}

function maxTwinSum(head) {
    if (!head) return null;
    const nums = head.toArray();
    const n = nums.length;
    if (n%2 !== 0) return null;

    let maxTwinValue = -Infinity;
    for (let i = 0; i < n / 2; i++) {
        maxTwinValue = Math.max(maxTwinValue, nums[i] + nums[n - 1 - i]);
    }
    return maxTwinValue;
}

function maxTwinSumListOnly(head) {
    if (!head) return null;
    // Find middle
    let middle = head;
    let end = head;
    do {
        [middle, end] = [middle.next, end.next.next];
    } while (end);

    // Reverse second half
    let prev = null;
    let current = middle;
    while (current) {
        const next = current.next;
        current.next = prev;
        [prev, current] = [current, next];
    }

    // Walk first half summing
    let left = head;
    let right = prev;
    let maxTwinValue = -Infinity;
    while (right) {
        maxTwinValue = Math.max(maxTwinValue, left.value + right.value);
        [right, left] = [right.next, left.next];
    }
    return maxTwinValue;
}

const test1 = new listnode(0);
test1.fromArray([5,4,2,1]);
console.log(maxTwinSum(test1), maxTwinSumListOnly(test1));

const test2 = new listnode(0);
test2.fromArray([4,2,2,3]);
console.log(maxTwinSum(test2), maxTwinSumListOnly(test2));

const test3 = new listnode(0);
test3.fromArray([1,100000]);
console.log(maxTwinSum(test3), maxTwinSumListOnly(test3));