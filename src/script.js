const mainPanel = document.getElementById('mainPanel');

var mainWidth;
function receiveSizeChangeEvent() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    mainWidth = Math.min(windowWidth, windowHeight);
    mainPanel.style.width = mainPanel.style.height = mainWidth + 'px';
}
receiveSizeChangeEvent();

var tickTime = 1000 / 60;
var catTime = 3000;
var catTimer = 0;
var catWidth = 5;
var catAngleSpeed = 35;
var catFallSpeed = 5;
var snowflakeWidth = 3;

function Cat() {
    /** @type {HTMLImageElement} */
    this.img = null;
    this.y = -catWidth;
    this.angle = 360 * Math.random();
    this.alive = true;
    this.width = 0;
    this.angleSpeed = catAngleSpeed * (0.7 * Math.random() + 0.3);
    if (Math.random() < 0.5)
        this.angleSpeed = -this.angleSpeed;
}

/** @param angle {number} */
function clipAngle(angle) {
    while (angle >= 360)
        angle -= 360;
    while (angle < 0)
        angle += 360;
    return angle;
}

Cat.prototype.update = function() {
    this.angle += clipAngle(this.angleSpeed * tickTime / 1000);
    this.y += catFallSpeed * tickTime / 1000;
    this.img.style.transform = 'rotate(' + this.angle + 'deg)';
    this.img.style.top = this.y + '%';
    this.img.style.width = this.width + '%';
    if (this.y >= 100) {
        this.alive = false;
        this.img.remove();
    }
}

/** @type {Cat[]} */
var cats = [];

var waves = new Array(10);
for (var i = 0; i < 10; i++) {
    const img = document.createElement('img');
    img.src = './wave.svg';
    img.style.position = 'absolute';
    img.style.left = i * 10 + '%';
    img.style.width = '10%';
    img.style.bottom = 0;
    img.style.zIndex = 1;
    mainPanel.appendChild(img);
}

function main() {
    catTimer -= tickTime;
    if (catTimer <= 0) {
        catTimer = catTime;
        var img = document.createElement('img');
        img.src = './snowflake.png';
        img.style.position = 'absolute';
        img.style.left = Math.floor(Math.random() * (100 - catWidth)) + '%';
        mainPanel.appendChild(img);
        var cat = new Cat();
        cat.img = img;
        cat.width = snowflakeWidth;
        cats.push(cat);
        cat.img.style.transform = 'rotate(' + cat.angle + ')';
    }
    for (var i = 0; i < cats.length; i++) {
        var cat = cats[i];
        cat.update();
    }
    cats = cats.filter(cat => cat.alive);
}

window.addEventListener('resize', receiveSizeChangeEvent);
receiveSizeChangeEvent();
setInterval(main, 1000 / 60);
