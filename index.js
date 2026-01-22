const COLORS = ["#174EA6", "#4285F4", "#EA4335", "#FBBC04", "#34A853", "#D2E3FC", "#FAD2CF", "#FEEFC3", "#CEEAD6"];
const FRAME_RATE = 60;
const BLOB_COUNT = 5;

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
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    draw() {
        context.beginPath();
        context.strokeStyle = this.color;
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.stroke();
    }
    static blobArray = [];
    static initializeBlobs() {
        Blob.blobArray = [];
        for (let i = 0; i < BLOB_COUNT; i++) {
            let r = Math.max(50, Math.floor(Math.random() * (WIDTH / 10)));
            let x = Math.floor(Math.random() * WIDTH);
            let y = Math.floor(Math.random() * HEIGHT);

            const blob = new Blob(x, y, r);
            Blob.blobArray.push(blob);
        }
    }
    static drawBlobs() {
        for (let blob of Blob.blobArray) {
            blob.draw();
        }
    }
}
function initialize() {
    Blob.initializeBlobs();
    Blob.drawBlobs();
    // animate();
}
function animate() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    setTimeout(() => {
        animate();
    }, 1000 / FRAME_RATE);
}
initialize();
window.addEventListener("resize", () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas.style.height = `${HEIGHT}px`;
    canvas.style.width = `${WIDTH}px`;
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    initialize();
})