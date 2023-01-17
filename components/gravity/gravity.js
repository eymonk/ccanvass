import state from '../state.js';
const canvas = document.querySelector('.canvas');
const c = canvas.getContext('2d');

/************************ BALLS' CONSTRUCTOR ************************/
const Ball = function(x, y, dx, dy, radius, gravity, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    
    this.draw = () => {
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, true);
        c.fillStyle = color;
        c.fill() ;
        c.stroke();
    }
    
    this.update = () =>{
        this.draw();
        
        if (y > canvas.height - radius - dy) dy = -dy * gravity;
        else dy++;
        
        if (x > canvas.width - radius || x < radius) dx = -dx;
        
        //friction
        if (parseInt(y) === canvas.height - radius) {
            if(dx > 0) dx -= 0.01;
            else if (dx < 0) dx += 0.01;
            else if (dx < 0.2 && dx > -0.2) dx = 0;
        }
        
        y += dy;
        x += dx;
    }
}


/************************ SOURCES ************************/
let radiusAndGravivty;
const ballsArr = [];
const radiusesArr = [10, 20, 33, 57];
const gravitiesArr = [0.96, 0.94, 0.91, 0.88];
const velocitiesArr = [1, 2, 3, 4, -1, -2, -3, -4];


const generateBalls = (num) => {
    for (let i = num; i > 0; i--) {
        radiusAndGravivty = Math.floor(Math.random() * 4);
        ballsArr.push(new Ball(Math.floor(Math.random() * (canvas.width - 160) + 80), Math.floor(Math.random() * (canvas.height - canvas.height/2) + 40), velocitiesArr[Math.floor(Math.random() * 8)], velocitiesArr[Math.floor(Math.random() * 8)], radiusesArr[radiusAndGravivty], gravitiesArr[radiusAndGravivty], state.colors[Math.floor(Math.random() * state.colors.length)]))
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

