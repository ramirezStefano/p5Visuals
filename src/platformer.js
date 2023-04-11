// Define variables
let player;
let platforms = [];

// Set up canvas and player
function setup() {
  createCanvas(400, 400);
  player = new Player(50, 50, 20, 20);
  platforms.push(new Platform(0, height - 20, width, 20));
}

// Draw the game
function draw() {
  background(220);

  // Update and display player
  player.update();
  player.display();

  // Check for collision with platforms
  for (let i = 0; i < platforms.length; i++) {
    player.checkCollision(platforms[i]);
    platforms[i].display();
  }

  // Move player with arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    player.move(-1);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.move(1);
  }
  if (keyIsDown(UP_ARROW)) {
    player.jump();
  }
}

// Player class
class Player {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = 0.5;
  }

  // Update player position and velocity
  update() {
    this.velocityY += this.gravity;
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.velocityX *= 0.9;
    this.velocityY *= 0.9;

    // Keep player on screen
    if (this.x < 0) {
      this.x = 0;
      this.velocityX = 0;
    }
    if (this.x + this.w > width) {
      this.x = width - this.w;
      this.velocityX = 0;
    }
    if (this.y + this.h > height) {
      this.y = height - this.h;
      this.velocityY = 0;
    }
  }

  // Display the player
  display() {
    rect(this.x, this.y, this.w, this.h);
  }

  // Move player left or right
  move(direction) {
    this.velocityX += direction * 5;
  }

  // Make player jump
  jump() {
    if (this.velocityY === 0) {
      this.velocityY = -10;
    }
  }

  // Check for collision with a platform
  checkCollision(platform) {
    if (
      this.y + this.h >= platform.y &&
      this.y + this.h <= platform.y + platform.h &&
      this.x + this.w >= platform.x &&
      this.x <= platform.x + platform.w
    ) {
      this.y = platform.y - this.h;
      this.velocityY = 0;
    }
  }
}

// Platform class
class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  // Display the platform
  display() {
    rect(this.x, this.y, this.w, this.h);
  }
}
