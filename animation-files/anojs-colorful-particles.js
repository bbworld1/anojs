// handao16

var canvasDiv = document.getElementById('anojs-colorful-particles');
canvasDiv.innerHTML += "<canvas id='anojs-colorful-particles-canvas'></canvas>";
let canvas = document.getElementById("anojs-colorful-particles-canvas");

canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;


var c = canvas.getContext('2d');
c.fillStyle = '#ffcba6';
c.fillRect(0, 0, canvas.width, canvas.height);

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 5;

var colorArray = [
    'ANOJS_COLOR_1',
    'ANOJS_COLOR_2',
    'ANOJS_COLOR_3',
    'ANOJS_COLOR_4',
    'ANOJS_COLOR_5'
];
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    this.console.log(mouse);
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();

})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
        c.fill();
    }

    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - radius < 0) {
            this.dx = -this.dx;
        }

        if(this.y + this.radius > innerHeight || this.y - radius < 0) {
            this.dy = -this.dy
        }

        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) {
            if(this.radius < maxRadius)
            {
                this.radius += 1;
            }
        } else if(this.radius > this.minRadius){
            this.radius -=1;
        }

        this.draw();
    }
}



var circleArray = [];
function init() {
    circleArray = [];
    for(var i = 0; i < 900; i++) {
    var radius = (Math.random() * 4) + 1 ;
    var x = Math.random() * (innerWidth - radius *7) + radius;
    var y = Math.random() * (innerHeight - radius *7) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    circleArray.push(new Circle(x, y, dx, dy, radius))
}
}



function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}
animate();
init();
