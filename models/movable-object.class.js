class MovableObject extends DrawableObject {
  speed_x = 5;
  speed_y = 0;
  direction_x;
  direction_y;
  acceleration = 0.2;
  otherDirection = false;
  hitpoints = 100;
  coins = 0;
  poison = 0;
  lastHit = 5;
  lastMoved = 0;
  timepassed = 0;
  immunityDuration = 1.5;


  isColliding(obj) {
    return (
      this.position_x + this.width - this.offset.right >
        obj.position_x + obj.offset.left &&
      this.position_y + this.height - this.offset.bottom >
        obj.position_y + obj.offset.top &&
      this.position_x + this.offset.left <
        obj.position_x + obj.width - obj.offset.right &&
      this.position_y + this.offset.top <
        obj.position_y + obj.height - obj.offset.bottom
    );
  }

  collectCoin() {
    this.coins += 20;
    if (this.coins > 100) {
      this.coins = 100;
    }
  }

  collectPoisonbottle() {
    this.poison += 20;
    if (this.poison > 100) {
      this.poison = 100;
    }
  }

  hit() {
    this.hitpoints -= 20;
    if (this.hitpoints <= 0) {
      this.hitpoints = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1.5;
  }

  isDead() {
    return this.hitpoints == 0;
  }

  isImmun() {
    let timePassedSinceLastHit = (new Date().getTime() - this.lastHit) / 1000;
    return timePassedSinceLastHit < this.immunityDuration;
  }

  applyGravity() {
    setInterval(() => {
      if (this.position_y < 300) {
        this.position_y -= this.speed_y;
        this.speed_y -= this.acceleration;
      }
    }, 1000 / 25);
  }

  swimRight() {
    this.position_x += this.speed_x;
  }

  swimLeft() {
    this.position_x -= this.speed_x;
  }

  swimUp() {
    this.position_y -= this.speed_x;
  }

  swimDown() {
    this.position_y += this.speed_x;
  }

  updateCameraPosition() {
    this.world.camera_x = -this.position_x + 50;
  }

  mirrorMovement() {
    if (this.isHittingBarrier()) {
      this.speed_x = -this.speed_x;
      this.otherDirection = !this.otherDirection;
    }
  }

  isHittingBarrier() {
    return this.position_x <= 0 || this.position_x >= 1900;
  }

  updateHorizontalMovement() {
    if (this.direction_x === 'left') {
      this.swimLeft();
      if (this.position_x <= 0) {
        this.direction_x = 'right';
      }
    } else if (this.direction_x === 'right') {
      this.swimRight();
      if (this.position_x >= 1800) {
        this.direction_x = 'left';
      }
    }
  }

  updateVerticalMovement() {
    if (this.direction_y === 'up') {
      this.swimUp();
      if (this.position_y <= 0) {
        this.direction_y = 'down';
      }
    } else if (this.direction_y === 'down') {
      this.swimDown();
      if (this.position_y >= 480 - this.height) {
        this.direction_y = 'up';
      }
    }
  }

}
