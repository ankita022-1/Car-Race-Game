const score_div = document.getElementById("score");
const road = document.getElementById("road");
const sec1 = document.getElementById("sec1");
const sec2 = document.getElementById("sec2");
const btn = document.getElementById("btn");
const start = document.getElementById("start");

const body = document.getElementById('body');

let obj = {
    x: 0,
    y: 0,
    speed: 5,
    score: 0
}
let isPlaying = true;
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(keys.ArrowUp);
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
}
function endGame() {
    isPlaying = false;
    startGame();
}
function animate_roadlines() {
    let lines = document.querySelectorAll(".lines");
    let body_height = body.getBoundingClientRect().height;
    lines.forEach(function (element) {
        let pos = element.getBoundingClientRect().top;
        let top_position = Number(pos) + Number(obj.speed);
        if (top_position > body_height + 70) {
            top_position = 0;
        }
        console.log("top lines" + top_position);
        element.style.top = top_position + "px";
    });
}
function isCollide(enemycar) {
    let car = document.querySelector('.car');
    let carRect = car.getBoundingClientRect();
    let enemyCarRect = enemycar.getBoundingClientRect();
    //collision detection code
    if ((carRect.bottom > enemyCarRect.top) && (carRect.top < enemyCarRect.bottom) && (carRect.left < enemyCarRect.right) && (carRect.right > enemyCarRect.left)) {
        endGame();
        console.log("boom");
    }
}
function animate_enemycars() {
    let car = document.querySelector(".car");
    let enemycars = document.querySelectorAll(".enemycar");
    let body_height = body.getBoundingClientRect().height;
    enemycars.forEach(function (element) {
        let pos = element.getBoundingClientRect().top;
        let top_position = Number(pos) + Number(obj.speed);
        if (top_position > body_height + 70) {
            top_position = -20;
            let ran = Math.floor(Math.random() * (road.offsetWidth - car.offsetWidth - 4));
            element.style.left = ran + 'px';
            // changing images of cars
            let ran_img = Math.ceil(Math.random() * 6);
            switch (ran_img) {
                case 1: element.style.backgroundImage = "url('images/car1.jpg')";
                    break;
                case 2: element.style.backgroundImage = "url('images/car2.jpg')";
                    break;
                case 3: element.style.backgroundImage = "url('images/car3.jpg')";
                    break;
                case 4: element.style.backgroundImage = "url('images/car4.jpg')";
                    break;
                case 5: element.style.backgroundImage = "url('images/car5.jpg')";
                    break;
                case 6: element.style.backgroundImage = "url('images/car6.jpg')";
                    break;
            }
        }
        element.style.top = top_position + "px";
        isCollide(element);
    });
}
function startGame() {
    let car = document.querySelector(".car");
    obj.y = car.offsetTop;
    obj.x = car.offsetLeft;
    console.log("playing" + isPlaying);
    if (isPlaying) {
        console.log("playing" + isPlaying);
        animate_roadlines();
        animate_enemycars();
        if (keys.ArrowUp && obj.y > road.offsetTop + 80) {
            obj.y -= 5;
        }
        else if (keys.ArrowDown && obj.y < road.offsetTop + 650) {
            obj.y += 5;
        }
        else if (keys.ArrowLeft && obj.x > 0) {
            obj.x -= 5;
        }
        else if (keys.ArrowRight && obj.x < road.offsetWidth - car.offsetWidth-7) {
            console.log("road offsetwidth" + road.offsetWidth);
            obj.x += 5;
        }
        car.style.top = obj.y + 'px';
        car.style.left = obj.x + 'px';
        obj.score++;
        score_div.innerHTML = "Score : " + obj.score;
        window.requestAnimationFrame(startGame);
    }
    else {
        sec1.style.display = "flex";
        const para = document.getElementById("para");
        start.style.backgroundImage = "url('images/bg_carIMG.webp')";
        start.style.height = "61%";
        para.innerHTML = "Your Score :  " + obj.score;
        btn.innerHTML = "Play Again";

    }
}
// gameplay 
function gameplay() {
    isPlaying = true;
    obj.score = 0;
    road.innerHTML = "";

    window.requestAnimationFrame(startGame);
    // create roadlines
    for (let i = 0; i < 5; i++) {
        let l_top = i * 150;
        let roadlines = document.createElement('div');
        roadlines.setAttribute('class', 'lines');
        roadlines.style.top = l_top + 'px';
        road.appendChild(roadlines);
    }
    // create car
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    car.style.backgroundImage = "url('images/car5.png')";
    road.appendChild(car);
    // create enemy cars
    for (let i = 0; i < 3; i++) {
        let ran = Math.floor(Math.random() * (road.offsetWidth - car.offsetWidth));
        let l_top = (i * 250) * -1;
        let enemycars = document.createElement('div');
        enemycars.setAttribute('class', 'enemycar');
        enemycars.style.top = l_top + 'px';
        enemycars.style.left = ran + 'px';
        // background Image
        let ran_img = Math.ceil(Math.random() * 6);
        switch (ran_img) {
            case 1: enemycars.style.backgroundImage = "url('images/car1.jpg')";
                break;
            case 2: enemycars.style.backgroundImage = "url('images/car2.jpg')";
                break;
            case 3: enemycars.style.backgroundImage = "url('images/car3.jpg')";
                break;
            case 4: enemycars.style.backgroundImage = "url('images/car4.jpg')";
                break;
            case 5: enemycars.style.backgroundImage = "url('images/car5.jpg')";
                break;
            case 6: enemycars.style.backgroundImage = "url('images/car6.jpg')";
                break;
        }
        road.appendChild(enemycars);
    }
}
function func() {
    sec1.style.display = "none";
    gameplay();
}