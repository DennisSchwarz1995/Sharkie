class MovableObject extends DrawableObject {
  speed_x = 10;
  speed_y = 0;
  acceleration = 0.5;
  otherDirection = false;
  hitpoints = 100;
  lastHit = 5;
  timepassed = 0;

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
}
