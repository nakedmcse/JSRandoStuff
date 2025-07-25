class item {
    constructor(order, title) {
        this.order = order;
        this.title = title;
    }
}

items = [];
items.push(new item(0,'A'));
items.push(new item(1,'B'));
items.push(new item(2,'C'));
items.push(new item(3,'D'));
items.push(new item(4,'E'));

function changeOrder(oldOrder, newOrder) {
    for (let i = 0; i < items.length; i++) {
        if (items[i] === oldOrder) {
            items[i].order = newOrder;
        }
        else if (items[i] === newOrder) {
            items[i].order = oldOrder;
        }
        if (items[i].order > newOrder && items[i].order !== oldOrder) {
            items[i].order++;
        }
    }
}

function printItems() {
    for (let i = 0; i < items.length; i++) {
        console.log(`${items[i].order}:${items[i].title}`);
    }
}

changeOrder(4,2);
printItems();