const canvas = document.getElementById("mandelbrot");
const ctx = canvas.getContext("2d");

const width = canvas.offsetWidth;
const height = canvas.offsetHeight;

function fillPixel(x, y, color) {
    ctx.fillStyle = `rgb(${color}, 0, 0)`;
    ctx.fillRect(x, y, 1, 1);
}

function plot(maxIteration) {
    for (let Px = 0; Px < width; Px++) {
        for (let Py = 0; Py < height; Py++) {
            let x0 = (Px / width) * (2.0 + 0.47) - 2.0;
            let y0 = (Py / height) * (1.12 + 1.12) - 1.12;

            let x = 0;
            let y = 0;
            let iteration = 0;
            
            while (x * x + y * y <= 4 && iteration < maxIteration) {
                let xtemp = x * x - y * y + x0;
                y = 2 * x * y + y0;
                x = xtemp;
                iteration++;
            }

            const color = (1.0 - iteration / maxIteration) * 255.0;
            fillPixel(Px, Py, color);
        }
    }
}

plot(35)
