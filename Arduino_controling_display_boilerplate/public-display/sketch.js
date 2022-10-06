let socket = io();
let character = {
    x: 0,
    y: 0
};
let speed = 10;

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    character.x = windowWidth / 2;
    character.y = windowHeight / 2;
}

function draw() {
    background(0, 10);
    fill(255);
    noStroke();
    ellipse(character.x, character.y, 50, 50);
}

socket.on('positions', (positions) => {

    character.x = map(positions.x, 0, 100, 0, windowWidth);
    character.y = map(positions.y, 0, 100, 0, windowHeight);

});