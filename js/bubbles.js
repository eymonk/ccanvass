import state from '../components/state.js';

let gameProcess = false;
const canvas = document.querySelector('.canvas');
const c = canvas.getContext('2d');
const canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: 0,
    y: 0,
}



/***************************** BUBBLES' CONSTRUCTOR *****************************/
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
        c.arc(x, y, r, 0, Math.PI * 2, true);
        c.fillStyle = color;
        c.fill();
    }

    this.inflate = () => {
        const inflateRadius = 50;
        const shift = inflateRadius / 2;
        if((mouse.x < x + initialRadius + inflateRadius && mouse.x > x - inflateRadius)
            && (mouse.y - inflateRadius < y + initialRadius + inflateRadius && mouse.y > y)) {
            if (r < 50) r += 1.5;
        } else if (r > initialRadius) r--;
    }

    this.update = () => {
        this.draw();
        this.inflate();

        if (x < r || x > canvas.width - r) dx = -dx;
        else if(y < r || y > canvas.height - r) dy = -dy;

        x += dx;
        y += dy;
    }
}



/***************************** ELEMENTS' PROPERTIES *****************************/
const bubblesArr = [];
const velocitiesArr = [0.3, 0.6, 0.9, 1.2, -0.3, -0.6, -0.9, -1.2];
const radiusesArr = [4, 6, 8, 12];
const colors = ['#444','#f44', 'hsl(150, 100%, 40%)', '#fff'];
const inflateRadius = 70;


/***************************** BUBBLES CREATION *****************************/
const createBubbles = (num) => {
    for (let i = 0; i < num; i++) {
        bubblesArr.push(new Bubble((Math.random() * (canvas.width - 90)) + 45, (Math.random() * (canvas.height - 90)) + 45, velocitiesArr[Math.floor(Math.random() * 8)],  velocitiesArr[Math.floor(Math.random() * 8)], radiusesArr[Math.floor(Math.random() * 4)], colors[Math.floor(Math.random() * 4)]))
    }
}


/***************************** GAME START *****************************/
function animate() {
    state.animation = requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    bubblesArr.forEach(c => c.update());
    gameProcess = true;
}

function reset() {
    bubblesArr.length = 0;
}

function initiateBubbles() {
    reset();
    createBubbles(state.number);
    animate();
}


/***************************** EVENT LISTENERS *****************************/
////////////////// cursor position
document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})


export default initiateBubbles;