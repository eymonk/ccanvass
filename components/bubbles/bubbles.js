import state from '../state.js';

const canvas = document.querySelector('.canvas');
const c = canvas.getContext('2d');

const velocitiesArr = [0.3, 0.6, 0.9, 1.2, -0.3, -0.6, -0.9, -1.2];
const radiusesArr = [6, 10, 14, 18];
const bubblesArr = [];

const mouse = {
    x: 0,
    y: 0,
}

const Bubble = function (x, y, dx, dy, r, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.r = r;
    this.color = color
    let initialRadius = r;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        c.fillStyle = color;
        c.fill();
    }

    this.inflate = () => {
        const inflateRadius = 50;
        if((mouse.x < this.x + initialRadius + inflateRadius && mouse.x > this.x - inflateRadius)
            &&
            (mouse.y - inflateRadius < this.y + initialRadius + inflateRadius && mouse.y > this.y)) {
            if (this.r < 50) this.r += 1.5;
        } else if (this.r > initialRadius) this.r--;
    }

    this.update = () => {
        this.draw();
        this.inflate();

        if (this.x < this.r || this.x > canvas.width - this.r) this.dx = -this.dx;
        else if(this.y < this.r || this.y > canvas.height - this.r) this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;
    }
}

const createBubbles = (num) => {
    for (let i = 0; i < num; i++) {
        const horizontalRandom = (Math.random() * (canvas.width - 90)) + 45;
        const verticalRandom = (Math.random() * (canvas.height - 90)) + 45;
        const randomVelocityX = velocitiesArr[Math.floor(Math.random() * 8)];
        const randomVelocityY = velocitiesArr[Math.floor(Math.random() * 8)];
        const randomRadius = radiusesArr[Math.floor(Math.random() * 4)];
        const randomColor = state.colors[Math.floor(Math.random() * state.colors.length)];

        bubblesArr.push(new Bubble(horizontalRandom, verticalRandom, randomVelocityX, randomVelocityY, randomRadius, randomColor));
    }
}

function animate() {
    c.clearRect(0,0,canvas.width,canvas.height);
    bubblesArr.forEach(c => c.update());
    state.animation = requestAnimationFrame(animate);
}

function reset() {
    bubblesArr.length = 0;
}

function initiateBubbles() {
    reset();
    createBubbles(state.number);
    state.animation = requestAnimationFrame(animate);
    state.resetCurrentScreen = initiateBubbles;
}


document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

export default initiateBubbles;