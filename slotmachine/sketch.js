const seperator = 188;
const Y_AXIS = 1;
const X_AXIS = 2;
const lever_size = 50;
bank = 105;

function preload() {
  img = loadImage('https://andyhoffman.codes/random-assets/img/slots/sprite5.png');
}

class Spinner {
  constructor(x) {
    this.offset = random(0, img.height);
    this.y1 = 0 + this.offset;
    this.y2 = -1 * img.height + this.offset;
    this.x = x;
    this.pos = this.offset/seperator;
  }

  next(speed) {
    this.y1+=speed;
    this.y2+=speed;
    this.pos += speed/188;
  }

  render() {
    image(img, this.x, this.y1);
    image(img, this.x, this.y2);
    if (this.y1 > img.height) {
      let delta = this.y1 - img.height;
      this.y1 = -1 * img.height + delta;
    } 
    if (this.y2 > img.height) {
      let delta = this.y2 - img.height;
      this.y2 = -1 * img.height + delta;
    }
  }
}


function setup() {
  createCanvas(img.width*3+lever_size, seperator*3);
  s1 = new Spinner(0);
  s2 = new Spinner(img.width);
  s3 = new Spinner(2*img.width);
  console.log(img.height);  

  //quit
  button = createButton('Quitter');
  //button.position(img.width*3/2 - button.size().width/2, 20);
  button.mousePressed(quit);
  //console.log(button.size());
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function r() {
  s1.render();
  s2.render();
  s3.render();
}

time = xmin = -120; //reset
const stretch = -0.007;
stop_time = 0; //reset
done = false; //reset
target = 0;
won = false; //reset
money_taken = false; //reset

function reset() {
  time = xmin;
  stop_time = 0;
  done = false;
  won = false;
  money_taken = false;
}

function quit() {
  alert("Voici votre score: " + bank + ". Retourne a la classe.")
}

function stop() {
  if (stop_time == 0) {
    formula = stretch*(xmin)*(-1*xmin);
    s1.next(stretch*(time-xmin)*(time+xmin)); s2.next(formula); s3.next(formula);
    time++;
    if (time==-1*xmin) {
      time = 0;
      stop_time = 1;
    }
  } else if (stop_time == 1) {
    formula = stretch*(xmin)*(-1*xmin);
    s1.next(0); s2.next(stretch*(time-xmin)*(time+xmin)); s3.next(formula);
    time++;
    if (time==-1*xmin) {
      time = 0;
      stop_time = 2;
    }
  } else if (stop_time == 2) {
    formula = stretch*(xmin)*(-1*xmin);
    s1.next(0); s2.next(0); s3.next(stretch*(time-xmin)*(time+xmin));
    time++;
    if (time==-1*xmin) {
      time = 0;
      done = true;
    }
  }
  // target = Math.round(s1.y1 / 188) * 188; 
  // if (target != 0) {
  //   console.log("Position: " + s1.y1 + " Target: " + target + " Lerp: " + (s1.y1 - target)/3);
  //   s1.next((s1.y1 - target)/3);
  // }
  
}

function spin() {
  if (!money_taken) bank -= 5;
  money_taken = true;
  var formula = 0;
  if (time < 0) {
    time++;
  } else {
    stop();
    return;
  } //other side of parabola (-1 * xmin)
  //formula = -0.007*Math.pow(time, 2)+100;
  formula = stretch*(time-xmin)*(time+xmin);
  s1.next(formula); s2.next(formula); s3.next(formula);
}

fruits = {
  0: "Hamburger",
  1: "Cherry", 
  2: "Corn",
  3: "Avocado",
  4: "Beer",
  5: "Banana",
  6: "Pinaple",
  7: "Brocoli",
  8: "Pizza",
  9: "Hamburger"
}

last = -1;
last_loop = 0;
function text_print() {
  if (last == 0 && last_loop > 0) {
    //win
    fill(20);
    textSize(32);
    textAlign(CENTER);
    stroke(0, 0, 0, 0);
    text("Tu as perdu $5", img.width*3/2, height/2);
    last_loop--;
  } else if (last == 1 && last_loop > 0) {
    //win
    fill(20);
    textSize(32);
    textAlign(CENTER);
    stroke(0, 0, 0, 0);
    text("Tu as gagné $100", img.width*3/2, height/2);
    last_loop--;
  }
}

lever_position = 50;
go = false;

function draw() {
  background(255);
  if (!done) {
    spin();
  } else {
    if (!won) {
      let a = fruits[Math.round(s1.pos%9)]; if (a == 9) a = 0;
      let b = fruits[Math.round(s2.pos%9)]; if (b == 9) b = 0;
      let c = fruits[Math.round(s3.pos%9)]; if (c == 9) c = 0;

      console.log(a + " " + b + " " + c);
      if (a==b && b==c) {
        console.log("WIN");
        bank += 100;
        last = 1;
        last_loop = 100;
      } else {
        console.log("LOSS");
        last = 0;
        last_loop = 100;
      }
      won = true;
    }
  }
  r();

  //seperators
  stroke(40, 40, 40);
  strokeWeight(5);
  line(img.width, 0, img.width, height);
  line(img.width*2, 0, img.width*2, height);

  //selector
  stroke(0, 0, 0, 0);
  fill(255, 0, 0, 27.5);
  rect(0, height/2-img.width/2, img.width*3, img.width);

  //triangles
  fill(0);
  let triangle_size = 10;
  triangle(0, height/2-triangle_size/2, 0, height/2+triangle_size/2, 8, height/2)
  triangle(img.width*3, height/2-triangle_size/2, img.width*3, height/2+triangle_size/2, img.width*3-8, height/2)

  //text
  text_print();
  
  //gradients
  setGradient(0, 0, img.width*3, seperator/2, color(50, 50, 50, 150), color(255, 255, 255, 0), Y_AXIS);
  setGradient(0, height-seperator/2, img.width*3, seperator/2, color(255, 255, 255, 0), color(50, 50, 50, 150), Y_AXIS);
  
  //bank
  fill(20);
  textAlign(LEFT);
  textSize(32);
  text("$" + bank, 10, 100);

  //lever
  const lever_height = 150;
  if (go && lever_position < lever_height) {
    lever_position+=7;
  } else {
    if (lever_position > 50) {
      lever_position-=6;
    }
    go = false;
  }
  line(img.width*3 + lever_size/2, lever_position, img.width*3 + lever_size/2, lever_height);
  line(img.width*3 + lever_size/2, lever_height, img.width*3, lever_height);
  fill(230, 0, 0);
  stroke(200, 0, 0);
  circle(img.width*3 + lever_size/2, lever_position, 35);
  
}
//188

function mousePressed() {
  if (event.type == 'touchstart') return true
  // Check if mouse is inside the circle
  let d = dist(mouseX, mouseY, img.width*3 + lever_size/2, 50);
  if (d < 50) {
    reset();
    lever_position = 50;
    go = true;
  }
}