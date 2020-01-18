var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

//var audio = new Audio("ost-battleinthesky-1.mp3");
//audio.play();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ma = new Image();
var bgImage = new Image();
var enemyImage = new Image(); 


ma.src = "./img/spaceship_low.png";
bgImage.src = "./img/Space_low.png";
enemyImage.src = "./img/enemy1.png";

canvas.addEventListener('touchmove', function (event) {

    player.x = event.touches[0].pageX - player.pW / 2;
    player.y = event.touches[0].pageY - player.pH * 2;

}, false);

var playerShot = false;
canvas.addEventListener('touchstart', function (event) {
    playerShot = true;
}, false);


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var i = 0;
var bullet = [];
var enemy = [];


var backgroundImage = {
    bgX: 0,
    bgY: 0,
    draw: function () {
        ctx.drawImage(bgImage, this.bgX, this.bgY);
    }  
}


var player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    pW: 80,
    pH: 78,
    timer: 0,
    bullets: 0,
    bulletsShot: 0,
    hits: 0,
    drawAirplane: function () {
        ctx.drawImage(ma, this.x, this.y);
    }
}

var dEnemy = {
    enemyX: (canvas.width / 2) - 32,
    enemyY: 30,
    enemyW: 65,
    enemyH: 67,
    draw: function () {
        ctx.beginPath();
        ctx.rect(this.enemyX, this.enemyY, this.enemyW, this.enemyH);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    },
    drawEnemyImage: function () {
        ctx.drawImage(enemyImage, this.enemyX, this.enemyY);
    },
    drawStar: function (cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.strokeSyle = "#000";
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius)
        for (i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y)
            rot += step

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y)
            rot += step
        }
        ctx.lineTo(cx, cy - outerRadius)
        ctx.closePath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.fillStyle = 'yellow';
        ctx.fill();

    }
}

var dBullet = {
    draw: function () {
        ctx.beginPath();
        ctx.rect(bullet[i].x, bullet[i].y, 5, 5);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }
}

function drawWin() {
    ctx.font = "32px Arial";
    ctx.fillStyle = "chartreuse";
    ctx.fillText("Ты выиграл!", canvas.width / 2 - 100, canvas.height / 2 + 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();
    player.drawAirplane();


    for (i = 0; i < bullet.length; i++) {
        bullet[i].x += bullet[i].vx;
        bullet[i].y -= bullet[i].vy
        dBullet.draw();
        if (bullet[i].x > dEnemy.enemyX && bullet[i].x < dEnemy.enemyX + dEnemy.enemyW) {
            if (bullet[i].y < 50 && bullet[i].y > 30) {
                player.hits++;

                if (player.hits == 30) {
                    clearInterval(timerId);
                    drawWin();
                }

                dEnemy.drawStar(dEnemy.enemyX + dEnemy.enemyW / 2, dEnemy.enemyY + dEnemy.enemyW / 2, 10, dEnemy.enemyW, dEnemy.enemyW / 2);
                dEnemy.enemyY = getRandomInt(10, 60);
                dEnemy.enemyX = getRandomInt(10, 270);
            }
        }
    }
    if (playerShot) {
        if (player.bullets < 5) {
            bullet.push
                ({
                    x: player.x + player.pW / 2 - 5/2,
                    y: player.y,
                    vx: 0,
                    vy: 10,
                });
            player.bulletsShot++;
            player.bullets++;
        }
    }

    player.timer++;
    if (player.timer % 12 == 0) {
        player.bullets = 0;
    }

    dEnemy.drawEnemyImage();
}

var timerId = setInterval(draw, 20);