const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')
const fps = document.querySelector('#fps')


canvas.width = window.innerWidth * 0.3
canvas.height = window.innerHeight * 0.3
canvas.style.background = 'tomato'

class Circle {
	constructor(x, y, radius, speed) {
		this.x = x
		this.y = y
		this.radius = radius
		this.speed = speed
		this.dx = 1 * this.speed
		this.dy = 1 * this.speed
	}
	draw(context) {
		context.beginPath()
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		context.fillStyle = 'blue'
		context.fill()
		context.closePath()
	}
	move() {
		this.draw(context)
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0){
            this.dx *= -1
        } 
        if (this.y + this.radius > canvas.height || this.y - this.radius <0){
            this.dy *= -1
        }
		this.x += this.dx
		this.y += this.dy
	}
}

let circles = []

const getDistance = (circle1, circle2) => {
    return Math.sqrt(Math.pow(circle2.x - circle1.x, 2) + Math.pow(circle2.y - circle1.y, 2));
}
const randomSpeed = () => Math.random() * 10 - 5 
const randomX = radius => Math.random() * (canvas.width - 2 * radius - 2) + radius + 1
const randomY = radius => Math.random() * (canvas.height - 2 * radius - 2) + radius + 1

let update = () => {
	requestAnimationFrame(update)
	context.clearRect(0, 0, window.innerWidth, window.innerHeight)
	circles.forEach(x => x.move())
    checkDistance()
    fps.innerHTML = 'FPS:' + checkFps()
}

const addNewCircle = () => {
	const circle = new Circle(randomX(10), randomY(10), 10, randomSpeed())
	circle.draw(context)
	circles.push(circle)
}

const checkDistance = () => {
    circles.forEach(x => {
        circles.forEach(y => {
            if (x !== y){
                if (getDistance(x, y) - x.radius - y.radius < 100){
                    context.beginPath()
                    context.moveTo(x.x, x.y)
                    context.lineTo(y.x, y.y)
                    context.strokeStyle = 'blue'
                    context.stroke()
                    context.closePath
                }
            }
        })
    })
}

let lastCalledTime=Date.now();
let tmpTime=Date.now();
let lastValue=0;

const checkFps=()=>{
    const now=Date.now();
    const value=(now-lastCalledTime);
    if (now-tmpTime>500){
        lastValue=Math.round(1000/value);
        tmpTime=now;
        lastCalledTime=now;
        return lastValue;
    }
    else{
        lastCalledTime=now;
        return lastValue
    }
}


update()

document.querySelector('#start').addEventListener('click', () => {
    const value = parseInt(document.querySelector('#circle').value)
    for (let i = 0; i < value; i++){
        addNewCircle()
    }
})
document.querySelector('#reset').addEventListener('click', () => {
    circles = []
})

document.querySelector('#go').addEventListener('click', () => {
    const xValue = document.querySelector('#xPole').value
    const yValue = document.querySelector('#yPole').value
    canvas.width = window.innerWidth * xValue / 100
    canvas.height = window.innerHeight * yValue / 100
})