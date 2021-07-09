// https://jacekjeznach.com/wp-content/themes/new/js/vendor/osciliator.js
// All credit goes to this website. I simply made my own version of it.

const canvas = document.getElementById("tendril");
const ctx = canvas.getContext("2d");

const settings = {
  numTendrils: 30,
  tendrilLength: 30,
  friction: 0.5,
  dampening: 0.25,
  tension: 0.98,
} 

var tendrils = [];
var mouseX = 0, mouseY = 0;

class Node {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
  }
}

class Tendril {
  constructor(spring) {
    this.spring = spring + Math.random() * 0.1 - 0.05;
    this.friction = settings.friction + Math.random() * 0.01 - 0.005;
    this.nodes = [];

    for (var i = 0; i < settings.tendrilLength; i++) {
      var node = new Node();
      node.x = mouseX;
      node.y = mouseY;
      this.nodes.push(node);
    }
  }

  update() {
    var cNode = this.nodes[0];
    var spring = this.spring;
    cNode.vx += (mouseX - cNode.x) * spring;
    cNode.vy += (mouseY - cNode.y) * spring;

    

    for (var i = 0; i < this.nodes.length; i++) {
      cNode = this.nodes[i];

      if (i > 0) {
        var pNode = this.nodes[i-1];

        cNode.vx += (pNode.x - cNode.x) * spring;
        cNode.vy += (pNode.y - cNode.y) * spring;
        cNode.vx += pNode.vx * settings.dampening;
        cNode.vy += pNode.vy * settings.dampening;
      }

      cNode.vx *= this.friction;
      cNode.vy *= this.friction;

      cNode.x += cNode.vx;
      cNode.y += cNode.vy;

      spring *= settings.tension;      
    }
  }

  draw() {
    var x = this.nodes[0].x;
    var y = this.nodes[0].y;
    var a, b;

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (var i = 1; i < this.nodes.length - 2; i++) {
      a = this.nodes[i];
      b = this.nodes[i + 1];
      x = (a.x + b.x) * 0.5;
      y = (a.y + b.y) * 0.5;

      ctx.quadraticCurveTo(a.x, a.y, x, y);
    }

    a = this.nodes[i];
    b = this.nodes[i + 1];

    ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);

    // ctx.strokeStyle = "#0FFF2050";
    // ctx.strokeStyle = "#392eabFF";
    // ctx.strokeStyle = "#23c19d90";
    ctx.strokeStyle = "#ea002790";

    ctx.stroke();
    ctx.closePath();
  }
}

function mouseMove(e) {
  if (e.touches) {
    mouseX = e.touches[0].pageX;
    mouseY = e.touches[0].pageY;
  } else {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  // e.preventDefault();
}

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function init() {
  for (var i = 0; i < settings.numTendrils; i++) {
    tendrils.push(new Tendril(0.45 + 0.025 * (i / settings.numTendrils)));
  }
  
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener("touchmove", mouseMove);
  window.addEventListener("resize", resize);

  resize();
  loop();
}

function loop() { 
  // reset
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#181818";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.globalCompositeOperation = "lighter";
  ctx.lineWidth = 1;

  for (const i of tendrils) {
    i.update();
    i.draw();
  }

  requestAnimationFrame(loop);
}

init();