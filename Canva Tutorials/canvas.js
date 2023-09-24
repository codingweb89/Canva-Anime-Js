let canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

let context = canvas.getContext("2d");
let mouse = {
    x: undefined,
    y: undefined
}

let colorArray = [
    "#2C3E50",
    "#E74C3C",
    "#ECF0F1",
    "#349808",
    "#290009"
]

let maxRadius = 40;
let minRadius = 2;

window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
})

//draw circle function
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        // context.stroke();
        context.fill();
    }

    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //inactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radius < maxRadius) {
                this.radius += 1;
            }
        }else if(this.radius > this.minRadius) {
            this.radius -= 1;
        }
    
        this.draw();
    }
}

let circleArray = [];

//determine the numbers of circles
function init() {
    circleArray = [];
    
    for(var i = 0; i < 2000; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
        
    
        var circleClasses = new Circle(x, y, dx, dy, radius);
        circleArray.push(circleClasses)
    
    }
}
init()

//request animation frame
function circle() {
    requestAnimationFrame(circle);
    context.clearRect(0, 0, innerWidth, innerHeight)
    // circleClasses.update();
    for(var i = 0; i < circleArray.length; i++) {
        circleArray[i].update(i)
    }
}
circle();


// window.addEventListener("resize", (e) => {
//     canvas.width = innerWidth;
//     canvas.height = innerHeight;

//     init();
// })