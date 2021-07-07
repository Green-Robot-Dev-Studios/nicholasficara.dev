// reference: https://pet.timetocode.org/A02.1_string_rendering_v1.html
// author: Nicholas Ficara
"use strict";

const FRAMERATE = 30;
const ADJUSTMENT = 10;

let ball, slider, initVelocity, initAcceleration, p1, p2, p3, 
    trampoline, trampolinef, soccer, bounce, eloss, code, lines, frame, m, yOlder;


class Ball {
    constructor(y, initVelocity, initAcceleration, eloss) {
        this.x = width/2;
        this.y = y;

        this.acceleration = initAcceleration*ADJUSTMENT*ADJUSTMENT;
        this.velocity = initVelocity*ADJUSTMENT;
        this.eloss = eloss;
    }

    // compute physics and update coords
    next() {
        // apply acceleration to velocity
        var velOld = this.velocity;
        
        // apply velocity to postition
        var yOld = this.y;

        if (this.y == yOlder) {
            this.velocity = 0;
        } else {
            this.velocity += this.acceleration/FRAMERATE; // pixels/frame
        }

        yOlder = this.y;

        this.y -= this.velocity/FRAMERATE;
        
        // check the borders
        if (this.y < bounce && this.velocity != 0) {
            this.velocity = -this.velocity*Math.sqrt(1-this.eloss/100); // loose 20% like the other one
            this.y = bounce;
        } else if (this.y > height-bounce && this.velocity != 0) {
            this.velocity = -this.velocity*Math.sqrt(1-this.eloss/100);
            this.y = height-bounce;
        }
        
        lines += "\nVariables: ball_height, velocity, acceleration";
        lines += `\nAdd the accelertation of ${this.acceleration/(ADJUSTMENT*ADJUSTMENT)}m/s^2 to the velocity, which changes from ${Math.round(velOld)/ADJUSTMENT}m/s to ${Math.round(this.velocity)/ADJUSTMENT}m/s.`;
        lines += `\nUpdate the ball_height variable using velocity which changes it from ${(height-Math.round(yOld)-Math.round(bounce)+1)/ADJUSTMENT} to ${(height-Math.round(this.y)-Math.round(bounce)+1)/ADJUSTMENT}.`;
        
        //console.log(this.velocity, this.y);
    }

    // draw the circle
    draw() {
        fill(230, 20, 0);
        soccer.resize(50, 0);
        image(soccer, this.x, this.y)
        // circle(this.x, this.y, 10);
        // console.log("circle at ", this.x, this.y);
    }
}

function reset() {
    // create a ball based on the sliders
    ball = new Ball(height/2, initVelocity.value(), initAcceleration.value(), eloss.value());
}

function setup() {
    // boilerplate
    var c = createCanvas(600, 600);
    c.parent('simulation');
    frameRate(FRAMERATE);
    m = false; // is in manual mode

    // load eye candy super duper image
    trampoline = loadImage('trampoline.png');
    trampolinef = loadImage('trampoline_flip.png');
    soccer = loadImage('soccer.png');

    // velocity
    initVelocity = createSlider(0, 255, 120).parent('sliders');
    p1 = createP('Initial Velocity: ').parent('sliders');
    
    // acceleration
    initAcceleration = createSlider(-20.0, 20.0, -9.8).parent('sliders');
    initAcceleration.attribute("step", "0.1");
    p2 = createP('Acceleration: ').parent('sliders');

    // energy loss
    eloss = createSlider(0, 100, 20).parent('sliders');
    p3 = createP('Energy loss per bounce: ').parent('sliders');

    // apply changes button
    let button = createButton('Apply').parent('sliders');
    button.mousePressed(reset);

    // lines will store the lines to be appended
    code = createP('Step by step of the code:').parent('code');
    lines = "";

    // no loop button
    let button2 = createButton('Step through code').parent('code');
    button2.mousePressed(manual);

    // resume
    let button3 = createButton('Resume normal execution').parent('code');
    button3.mousePressed(auto);

    // frame counter out of framerate to slow down text
    frame = 0;

    graph();

    // apply changes
    reset();
}

function manual() {
    noLoop();
    m = true;
    redraw();
}

function auto() {
    m = false;
    loop();
}

function draw() {
    background(255);
    
    // old lines
    // this implementation will bounce up and down, not left to right
    // line(PADDING, PADDING, width-PADDING, PADDING);
    // line(PADDING, height-PADDING, width-PADDING, height-PADDING);

    // coords are now centered
    imageMode(CENTER);

    // place bottom trampoline
    trampoline.resize(width/2, 0);
    image(trampoline, width/2, height-trampoline.height/2);

    // place top trampoline
    trampolinef.resize(width/2, 0);
    image(trampolinef, width/2, trampoline.height/2);

    // where to bounce ball on trampoline
    bounce = trampoline.height/1.2;

    // create flavour text
    textSize(32);
    fill(0, 102, 153);
    textAlign(CENTER);
    text('The Bouncing Room', width/2, height/2);

    // move ball to next position
    ball.next();

    // draw circle
    ball.draw();

    // change html to show values
    p1.html('Initial Velocity: ' + initVelocity.value() + 'm/s');
    p2.html('Acceleration: ' + initAcceleration.value() + 'm/s^2');
    p3.html('Energy loss per bounce: ' + eloss.value() + '%');

    // update framerate variable and reset at framerate
    if (frame == FRAMERATE+1) frame = 0;

    if (frame % 5 == 0 || m) {
        code.html('Step by step of the code (positive means [up] negative means [down]):' + lines.replaceAll('\n', '<li>'));
    }

    // increment framerate and reset lines of code to be drawn
    frame++;
    lines = "<ol>";

    // draw graphs
    if (frame % 1 == 0) {
        updateData(ball.velocity/ADJUSTMENT, height-ball.y-bounce);
    }
}