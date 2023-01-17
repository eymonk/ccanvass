import state from '../state.js';

const canvas = document.querySelector('.canvas');
const c = canvas.getContext('2d');

const velocitiesArr = [1, 2, 3, 4, -1, -2, -3, -4];
const gravitiesArr = [0.96, 0.94, 0.91, 0.88];
const radiusesArr = [10, 20, 33, 57];
const ballsArr = [];


const Ball = function(x, y, dx, dy, radius, gravity, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.g = gravity;
    this.r = radius;
    this.color = color;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        c.fillStyle = this.color;
        c.fill() ;
        c.stroke();
    }
    
    this.update = () =>{
        this.draw();
        
        if (this.y > canvas.height - this.r - this.dy) this.dy = -this.dy * this.g;
        else this.dy++;
        
        if (this.x > canvas.width - this.r || this.x < this.r) this.dx = -this.dx;

        if (this.y >= canvas.height - this.r) {
            if (this.dx > 0) this.dx -= 0.01;
            else if (this.dx < 0) this.dx += 0.01;
            else if (this.dx < 0.2 && this.dx > -0.2) this.dx = 0;
        }

        this.y += this.dy;
        this.x += this.dx;
    }
}


const generateBalls = (num) => {
    for (let i = num; i > 0; i--) {
        const radiusAndGravityRandom = Math.floor(Math.random() * 4);
        const horizontalRandom = Math.floor(Math.random() * (canvas.width - 160) + 80);
        const verticalRandom = Math.floor(Math.random() * (canvas.height - canvas.height/2) + 40);
        const velocityXRandom = velocitiesArr[Math.floor(Math.random() * 8)];
        const velocityYRandom = velocitiesArr[Math.floor(Math.random() * 8)];
        const colorRandom = state.colors[Math.floor(Math.random() * state.colors.length)];

        ballsArr.push(new Ball(horizontalRandom, verticalRandom, velocityXRandom, velocityYRandom, radiusesArr[radiusAndGravityRandom], gravitiesArr[radiusAndGravityRandom], colorRandom));
    }
}

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    ballsArr.forEach(current => current.update());
    state.animation = requestAnimationFrame(animate);
    state.resetCurrentScreen = initiateGravity;
}

function reset(){
    ballsArr.length = 0;
}

function initiateGravity() {
    reset();
    generateBalls(state.number);
    state.animation = requestAnimationFrame(animate);
}
export default initiateGravity;

