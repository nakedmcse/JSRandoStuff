// Voronai Canvas
document.body.style.backgroundColor = "#000000";
const canvas = document.createElement('canvas');
canvas.id = 'VoronaiCanvas';
canvas.width = 800; // Set the width of the canvas
canvas.height = 600; // Set the height of the canvas
canvas.style.backgroundColor = "#000000";
document.body.appendChild(canvas); // Append the canvas to the body of the document

// Colors for regions
const colors = ['red','green','blue','yellow','pink','brown','black','white'];

// Get the drawing context of the canvas
const ctx = canvas.getContext('2d');

// Set start points
const points = [];
for(let i=0; i<8; i++) {
    points[i] = [Math.floor(Math.random() * canvas.width),Math.floor(Math.random() * canvas.height)];
}

// Loop and fill point
const radius = 4;
while(true) {
    let minDist =9999;
    let minIdx = 8;
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);

    // Mutate points
    for(let i = 0; i<8; i++) {
        // Mutate points here
        // Get distance
        // Check for min and set minidx
    }

    // Draw circle of minIdx color at x,y
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colors[minIdx];
    ctx.fill();
}

// Get the drawing context of the canvas
/*
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
ctx.fillStyle = 'green';
ctx.fill();
ctx.lineWidth = 5;
ctx.strokeStyle = '#003300';
ctx.stroke();
*/