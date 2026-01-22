const COLORS = ["#174EA6", "#4285F4", "#EA4335", "#FBBC04", "#34A853", "#D2E3FC", "#FAD2CF", "#FEEFC3", "#CEEAD6"];
const FRAME_RATE = 60;
const BLOB_COUNT = 5;

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

class Blob {
    constructor(x, y, r, cpts) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.cpts = cpts;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    translateX(theta) {
        return this.x + this.r * Math.cos(theta);
    }
    translateY(theta) {
        return this.y + this.r * Math.sin(theta);
    }
    draw() {
        const theta = 2 * Math.PI / this.cpts;
        context.beginPath();
        context.moveTo(this.translateX(0), this.translateY(0));
        context.strokeStyle = "white";
        for (let i = 0; i < this.cpts; i++) {
            let c1X = this.translateX(i * theta + theta / 2);
            let c1Y = this.translateY(i * theta + theta / 2);
            let c2X = this.translateX((i + 1) * theta + theta / 2);
            let c2Y = this.translateY((i + 1) * theta + theta / 2);
            let destX = this.translateX((i + 2) * theta);
            let destY = this.translateY((i + 2) * theta);
            context.bezierCurveTo(c1X, c1Y, c2X, c2Y, destX, destY);
        }

        context.fillStyle = this.color;
        context.fill();
        context.stroke();
    }
    static blobArray = [];
    static initializeBlobs() {
        Blob.blobArray = [];
        for (let i = 0; i < BLOB_COUNT; i++) {
            let r = Math.max(50, Math.floor(Math.random() * (WIDTH / 10)));
            let x = Math.floor(Math.random() * WIDTH);
            let y = Math.floor(Math.random() * HEIGHT);
            let pts = Math.floor(Math.random() * 10) + 2;
            const blob = new Blob(x, y, r, pts);
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
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas.style.height = `${HEIGHT}px`;
    canvas.style.width = `${WIDTH}px`;
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
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
    initialize();
})