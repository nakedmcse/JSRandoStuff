// Voronoi Canvas
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
let points = [];
for(let i=0; i<8; i++) {
    points.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height)
        }
    )
}

// Loop and fill point
const radius = 4;
window.requestAnimationFrame(drawVeronoi);

function drawVeronoi() {
    for(let l=0; l<100; l++) {
        let minDist = 9999;
        let minIdx = 8;
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        // Mutate points
        for (let i = 0; i < 8; i++) {
            // Mutate points here
            points[i].x = points[i].x + (Math.random() - 0.5 > 0 ? 1 : -1);
            points[i].y = points[i].y + (Math.random() - 0.5 > 0 ? 1 : -1);
            if (points[i].x < 0) points[i].x = 0;
            if (points[i].y < 0) points[i].y = 0;
            if (points[i].x > canvas.width) points[i].x = canvas.width;
            if (points[i].y > canvas.height) points[i].y = canvas.height;
            // Get distance - manhattan formula
            const d = Math.abs(x - points[i].x) + Math.abs(y - points[i].y);
            // Check for min and set minidx
            if (d < minDist) {
                minDist = d;
                minIdx = i;
            }
        }

        // Draw circle of minIdx color at x,y
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = colors[minIdx];
        ctx.fill();
    }

    window.requestAnimationFrame(drawVeronoi);
}