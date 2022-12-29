/************************ CANVAS PRESETS ************************/
let canvas = document.getElementById('canvas')
let c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight



/************************ DOM ELEMENTS ************************/
let domTree = {
    ballsNumber: document.getElementById('balls-number')
}



/************************ BALLS' CONSTRUCTOR ************************/
let Ball = function(x, y, dx, dy, radius, gravity, color){
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.color = color
    
    this.up = () => { y -= 50; }
    
    this.draw = () => {
        c.beginPath()
        c.arc(x, y, radius, 0, Math.PI * 2, true)
        c.fillStyle = color
        c.fill() 
        c.stroke()
    }
    
    this.update = () =>{
        this.draw()
        
        if(y > canvas.height - radius - dy){
            dy = -dy * gravity
        } else {
            dy++
        }
        
        if(x > canvas.width - radius || x < radius){
            dx = -dx
        }
        
        //friction
        if(parseInt(y) === canvas.height - radius){
            if(dx > 0){
                dx -= 0.01
            } else if(dx < 0){
                dx += 0.01
            } else if (dx < 0.2 && dx > -0.2){
                dx = 0
            }
        }
        
        y += dy 
        x += dx
    }
}



/************************ SOURCES ************************/
let anima, radiusAndGravity
let ballsArr = []
let colorsArr = ['#FB7963', '#D24B47', '#A92C49', '#5B2055', '#2F163B']
let radiusesArr = [15, 20, 25, 30]
let gravitiesArr = [0.96, 0.94, 0.91, 0.88]
let velocitiesArr = [1, 2, 3, 4, -1, -2, -3, -4]


let generateBalls = (num) => {
    for(let i = num; i > 0; i--){
        radiusAndGravivty = Math.floor(Math.random() * 4)
        ballsArr.push(new Ball(Math.floor(Math.random() * (canvas.width - 160) + 80), Math.floor(Math.random() * (canvas.height - canvas.height/2) + 40), velocitiesArr[Math.floor(Math.random() * 8)], velocitiesArr[Math.floor(Math.random() * 8)], radiusesArr[radiusAndGravivty], gravitiesArr[radiusAndGravivty], colorsArr[Math.floor(Math.random() * 5)]))
    }
    domTree.ballsNumber.textContent = ballsArr.length
}

let animation = () =>{
    anima = requestAnimationFrame(animation)
    c.clearRect(0, 0, canvas.width, canvas.height)
    ballsArr.forEach(current => {
        current.update()
    })
}

generateBalls(50)
animation()

/************************ EVENT LISTENERS ************************/
document.addEventListener('keypress', event => {
    if(event.keyCode === 32){
        if(ballsArr.length >= 5000){
            alert(`DON'T LOAD YOUR MACHINE SO MUCH`)
        } else {
            generateBalls(30)
        }
        
    }
})

document.addEventListener('keydown', event => {
    if(event.keyCode === 38){
        ballsArr.forEach(current => current.up())
    }
})

