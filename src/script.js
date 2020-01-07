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
var catTime = 5000;
var catTimer = 0;
var catWidth = 5;
var catAngleSpeed = 45;
var catFallSpeed = 5;

function Cat() {
    /** @type {HTMLImageElement} */
    this.img = null;
    this.y = -catWidth;
    this.angle = 360 * Math.random();
}

Cat.prototype.update = function() {
    this.angle += catAngleSpeed * tickTime / 1000;
    while (this.angle >= 360)
        this.angle -= 360;
    this.y += catFallSpeed * tickTime / 1000;
    this.img.style.transform = 'rotate(' + this.angle + 'deg)';
    this.img.style.top = this.y + '%';
}

/** @type {Cat[]} */
var cats = [];

function main() {
    catTimer -= tickTime;
    if (catTimer <= 0) {
        catTimer = catTime;
        var img = document.createElement('img');
        img.src = 'transparent-cat.png';
        img.style.position = 'absolute';
        img.style.left = Math.floor(Math.random() * (100 - catWidth)) + '%';
        img.style.width = catWidth + '%';
        mainPanel.append(img);
        var cat = new Cat();
        cat.img = img;
        cats.push(cat);
        cat.img.style.transform = 'rotate(' + cat.angle + ')';
    }
    for (var i = 0; i < cats.length; i++) {
        var cat = cats[i];
        cat.update();
    }
}

window.addEventListener('resize', receiveSizeChangeEvent);
receiveSizeChangeEvent();
setInterval(main, 1000 / 60);
