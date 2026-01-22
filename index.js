const colors = ["#174EA6", "#4285F4", "#EA4335", "#FBBC04", "#34A853", "#D2E3FC", "#FAD2CF", "#FEEFC3", "#CEEAD6"];
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const canvas = document.querySelector("canvas");
canvas.style.height = `${HEIGHT}px`;
canvas.style.width = `${WIDTH}px`;
canvas.height = HEIGHT;
canvas.width = WIDTH;
const context = canvas.getContext("2d");

class Blob {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = colors[Math.floor(Math.random() * (colors.length - 1))];
    }
    drawBlob() {

    }
}
for (let i = 0; i < 5; i++) {
    let r = Math.max(20, Math.floor(Math.random() * (WIDTH / 20)));
    let x = Math.floor(Math.random() * WIDTH);
    let y = Math.floor(Math.random() * HEIGHT);

    const blob = new Blob(x, y, r);
    context.beginPath();
    context.strokeStyle = blob.color;
    context.arc(blob.x, blob.y, blob.r, 0, 2 * Math.PI);

    context.stroke();
}

window.addEventListener("resize", () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas.style.height = `${HEIGHT}px`;
    canvas.style.width = `${WIDTH}px`;
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
})