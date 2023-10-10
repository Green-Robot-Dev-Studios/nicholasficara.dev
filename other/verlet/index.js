import { rands } from "./rands.js";
import { colors } from "./colors.js";

/** @type {HTMLCanvasElement} */
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let verlets = [];

document.getElementById("button").addEventListener("click", () => {
    let img = document.getElementById('test');
    let img_canvas = document.createElement('canvas');
    img_canvas.width = img.width;
    img_canvas.height = img.height;
    let img_ctx = img_canvas.getContext('2d')
    img_ctx.drawImage(img, 0, 0, img.width, img.height);

    let colors = [];
    verlets.forEach((vertlet) => {
        console.log(vertlet.pos.x, vertlet.pos.y)
        let pixel = img_ctx.getImageData(vertlet.pos.x, vertlet.pos.y, 1, 1).data;
        vertlet.color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        colors.push(vertlet.color);
    });
    console.log(colors);
});

let drawCircle = (x, y, radius = 5, color = null) => {
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
    ctx.fillStyle = color ? color : 'black';
    ctx.fill();
};

let drawVerlet = (verlet) => {
    drawCircle(verlet.pos.x, verlet.pos.y, verlet.size, verlet.color);
}

let updateVerlet = (verlet, dt) => {
    let dx = verlet.pos.x - verlet.prev.x;
    let dy = verlet.pos.y - verlet.prev.y;

    verlet.prev.x = verlet.pos.x;
    verlet.prev.y = verlet.pos.y;

    verlet.pos.x += dx + verlet.acceleration.x * dt * dt;
    verlet.pos.y += dy + verlet.acceleration.y * dt * dt;

    verlet.acceleration.x = 0;
    verlet.acceleration.y = 0;
}

let accelerate = (verlet, acceleration_x, acceleration_y) => {
    verlet.acceleration.x += acceleration_x;
    verlet.acceleration.y += acceleration_y;
};

let applyConstraints = (verlet) => {
    if (verlet.pos.x < 0) {
        verlet.pos.x = 0;
        verlet.prev.x = verlet.pos.x + (verlet.pos.x - verlet.prev.x);
    }
    if (verlet.pos.x > width) {
        verlet.pos.x = width;
        verlet.prev.x = verlet.pos.x + (verlet.pos.x - verlet.prev.x);
    }
    if (verlet.pos.y < 0) {
        verlet.pos.y = 0;
        verlet.prev.y = verlet.pos.y + (verlet.pos.y - verlet.prev.y);
    }
    if (verlet.pos.y > height - verlet.size) {
        verlet.pos.y = height - verlet.size;
        verlet.prev.y = verlet.pos.y + (verlet.pos.y - verlet.prev.y);
    }
}

let checkCollision = (verlet) => {
    const RESPONSE_COEFFICIENT = 0.9;

    verlets.forEach((other) => {
        if (verlet === other) return;
        let dx = verlet.pos.x - other.pos.x;
        let dy = verlet.pos.y - other.pos.y;
        let distance = dx * dx + dy * dy;
        if (distance < (verlet.size + other.size) ** 2) {
            distance = Math.sqrt(distance);
            let axis_x = dx / distance;
            let axis_y = dy / distance;

            let mass_ratio = verlet.size / (verlet.size + other.size);
            let mass_ratio_other = other.size / (verlet.size + other.size);

            let delta = RESPONSE_COEFFICIENT * 0.5 * (distance - (verlet.size + other.size));

            verlet.pos.x -= axis_x * delta * mass_ratio;
            verlet.pos.y -= axis_y * delta * mass_ratio;
            other.pos.x += axis_x * delta * mass_ratio_other;
            other.pos.y += axis_y * delta * mass_ratio_other;
        }
    });
}

let createVertlets2 = (i) => {
    if (i >= 1300) return;
    let x = 0.5 * width + rands.rand1[i];
    let y = 0.25 * height + rands.rand2[i];    
    // let x = 0.5 * width + Math.random();
    // let y = 0.25 * height + Math.random();
    let pos = {x, y};
    let prev = {x, y};
    let acceleration = {x: 0, y: 0};
    let size = 9;
    // let color = `rgb(${rands.rand1[i] * 255}, ${rands.rand1[i] * 255}, ${rands.rand1[i] * 255})`;
    let color = colors[i];
    let verlet = {
        pos, prev, acceleration, size, color, 
    };
    verlets.push(verlet);
}

let frame = 0;
const draw = () => {
    ctx.clearRect(0, 0, width, height);
    verlets.forEach((verlet) => {
        let substeps = 2;
        for (let i = 0; i < substeps; i++) {
            accelerate(verlet, 0, 1000);
            checkCollision(verlet);
            applyConstraints(verlet);
            updateVerlet(verlet, 0.016 / substeps);
            drawVerlet(verlet);
        };
    });
    createVertlets2(frame);
    frame++;
    requestAnimationFrame(draw);
}
draw();

let createVerlets = () => {
    for (let i = 0; i < 100; i++) {
        let x = Math.random() * width;
        let y = Math.random() * height;
        let pos = {x, y};
        let prev = {x, y};
        let acceleration = {x: 0, y: 0};
        let size = 10;
        let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        let verlet = {
            pos, prev, acceleration, size, color, 
        };
        verlets.push(verlet);
    } 
}


// createVerlets();
// createVertlets2();

// let rands = [];
// for (let i = 0; i < 1200; i++) {
//     rands.push(Math.random());
// }
// console.log(rands);
