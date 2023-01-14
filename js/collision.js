import state from '../components/state.js';

const canvas = document.querySelector('.canvas');
const c = canvas.getContext('2d');
const mainColor = 'hsla(150, 100%, 50%, 0.3)';
const collisionColor = 'hsla(0, 100%, 50%, 0.7)';
const radius = 20;
const diameter = radius * 2;

c.strokeStyle = '#fff';
c.fillStyle = mainColor;


/************************ CIRCLES' CONSTRUCTOR ************************/
const Particle = function(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }

    this.update = particles => {
        this.draw();

        //bounce of the wall
        if (this.x < 0 + this.radius || this.x > canvas.width - radius) this.dx = -this.dx;
        else if(this.y < 0 + this.radius || this.y > canvas.height - radius) this.dy = -this.dy;

        //bounce of each other
        for (let i = 0; i < particles.length; i++) {
            if(this === particles[i]) continue;
            if(getDistance(this.x, this.y, particles[i].x, particles[i].y) < radius * 2) {
                this.color = collisionColor;
                particles[i].color = collisionColor;

                //collision physics implementation according to "spicy yoghurt"
                const vectorCollision = {
                  x: this.x - particles[i].x,
                  y: this.y - particles[i].y,
                }

                const distanceCollision = getDistance(this.x, this.y, particles[i].x, particles[i].y);
                const normalVectorCollision = { //direction
                    x: vectorCollision.x / distanceCollision,
                    y: vectorCollision.y / distanceCollision
                }

                const relativeVelocity = {
                    xv: this.dx - particles[i].dx,
                    yv: this.dy - particles[i].dy
                }
                const speed = normalVectorCollision.x * relativeVelocity.xv + normalVectorCollision.y * relativeVelocity.yv;


                this.dx -= speed * normalVectorCollision.x;
                this.dy -= speed * normalVectorCollision.y;
                particles[i].dx += speed * normalVectorCollision.x;
                particles[i].dy += speed * normalVectorCollision.y;
            } else this.color = mainColor;
        }

        this.x += this.dx;
        this.y += this.dy;
    }
}



/************************ SOURCES ************************/
const getDistance = (x1, y1, x2, y2) => {
    const xDist = x1 - x2;
    const yDist = y1 - y2;

    return Math.sqrt(Math.pow(xDist ,2) + Math.pow(yDist ,2));
}


const particlesArray = [];
const velocitiesArray = [ 0.3, 0.6, 0.9, 1.2, -0.3, -0.6, -0.9, -1.2];

let generateParticles = (num) => {
    for (let i = 0; i < num; i++) {
        const x = Math.floor((Math.random() * (canvas.width - 100)) + 50);
        const y = Math.floor((Math.random() * (canvas.height - 100)) + 50);
        let exists = false;

        particlesArray.forEach(particle => {
            if (getDistance(x, y, particle.x, particle.y) < diameter) exists = true;
        });

        if (exists) {
            i--;
            continue;
        }

        const xVelocity = velocitiesArray[Math.floor(Math.random() * 8)];
        const yVelocity = velocitiesArray[Math.floor(Math.random() * 8)];
        particlesArray.push(new Particle(x, y, xVelocity, yVelocity, radius, mainColor));
    }
}

function animate() {
    state.animation = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update(particlesArray);
}


function reset() {
    particlesArray.length = 0;
}

function initiateCollision() {
    reset();
    generateParticles(state.number);
    animate();
}
export default initiateCollision;