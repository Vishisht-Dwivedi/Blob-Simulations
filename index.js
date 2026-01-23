const COLORS = ["#174EA6", "#4285F4", "#EA4335", "#FBBC04", "#34A853", "#D2E3FC", "#FAD2CF", "#FEEFC3", "#CEEAD6"];
const FRAME_RATE = 60;
const BLOB_COUNT = 10;
const THETA_DELTA = 0.01;
const PHASE_DELTA = 0.1;
const HEIGHT_FACTOR = 3;
const MAX_PEAKS = 10;
let ANIMATING = true;

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

class Blob {
    constructor(x, y, r, peak_count) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.peak_count = peak_count;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    translateX(theta, h = 0) {
        return this.x + (this.r + h) * Math.cos(theta);
    }
    translateY(theta, h = 0) {
        return this.y + (this.r + h) * Math.sin(theta);
    }
    draw(phase = 0) {
        let theta = 0;
        context.beginPath();
        context.moveTo(this.translateX(0), this.translateY(0));
        context.strokeStyle = "white";
        for (theta = 0; theta < 2 * Math.PI; theta += THETA_DELTA) {
            const c = this.r / this.peak_count;
            const h = Math.sin(this.r * theta / c + phase) * HEIGHT_FACTOR;
            const x = this.translateX(theta, h);
            const y = this.translateY(theta, h);
            context.lineTo(x, y);
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
            let peak_count = Math.floor(Math.random() * MAX_PEAKS) + 2;
            const blob = new Blob(x, y, r, peak_count);
            Blob.blobArray.push(blob);
        }
    }
    static drawBlobs(phase = 0) {
        for (let blob of Blob.blobArray) {
            blob.draw(phase);
        }
    }
}
function initialize() {
    ANIMATING = true;
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas.style.height = `${HEIGHT}px`;
    canvas.style.width = `${WIDTH}px`;
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    Blob.initializeBlobs();
    animate(0);
}
let timerId = null;
function animate(phase = 0) {
    if (!ANIMATING) return;

    context.clearRect(0, 0, WIDTH, HEIGHT);
    phase += PHASE_DELTA;
    phase %= 10000;
    Blob.drawBlobs(phase);
    timerId = setTimeout(() => {
        animate(phase);
    }, 1000 / FRAME_RATE);
}
initialize();
window.addEventListener("resize", () => {
    ANIMATING = false;
    clearTimeout(timerId);
    initialize();
})