class MovableObject extends DrawableObject {
  /**
   * Creates an instance of `MovableObject`.
   * Initializes the movable object's properties and sets its initial state.
   */
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

  /**
   * Checks if the current object is colliding with another object.
   *
   * @param {Object} obj - The object to check for collision with. Should have `position_x`, `position_y`, `width`, `height`, `offset` properties.
   * @returns {boolean} - Returns `true` if the objects are colliding, otherwise `false`.
   */
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

  /**
   * Increases the player's coin count by 20, up to a maximum of 100 coins.
   */
  collectCoin() {
    this.coins += 20;
    if (this.coins > 100) {
      this.coins = 100;
    }
  }

  /**
   * Increases the player's poison count by 20, up to a maximum of 100 poison units.
   */
  collectPoisonbottle() {
    this.poison += 20;
    if (this.poison > 100) {
      this.poison = 100;
    }
  }

  /**
   * Processes a hit to the player, reducing hitpoints by 20. If the player is hit by poison,
   * the speed is temporarily reduced.
   *
   * @param {boolean} [poison=false] - Optional. If `true`, the hit is caused by poison and affects speed.
   */
  hit(poison) {
    this.hitpoints -= 20;
    if (this.hitpoints <= 0) {
      this.hitpoints = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
    if (poison) {
      this.speed_x = 1.2;
      setStoppableTimeout(() => {
        this.speed_x = 10;
      }, 1500);
    }
  }

  /**
   * Checks if the player is currently hurt, based on the time since the last hit.
   *
   * @returns {boolean} - Returns `true` if the player is still hurt (within 1.5 seconds of the last hit), otherwise `false`.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1.5;
  }

  /**
   * Checks if the player is dead, i.e., hitpoints are zero.
   *
   * @returns {boolean} - Returns `true` if the player is dead, otherwise `false`.
   */
  isDead() {
    return this.hitpoints == 0;
  }

  /**
   * Checks if the player is currently immune, based on the time since the last hit and the immunity duration.
   *
   * @returns {boolean} - Returns `true` if the player is immune (within the immunity duration), otherwise `false`.
   */
  isImmun() {
    let timePassedSinceLastHit = (new Date().getTime() - this.lastHit) / 1000;
    return timePassedSinceLastHit < this.immunityDuration;
  }

  /**
   * Moves the player upwards to the surface at a fixed rate.
   */
  riseToSurface() {
    setStoppableInterval(() => {
      if (this.position_y + (this.height - this.offset.top) >= 20) {
        this.position_y -= 8;
      }
    }, 50);
  }

  /**
   * Moves the player downwards to the ground at a fixed rate.
   */
  sinkToGround() {
    setStoppableInterval(() => {
      if (this.isAboveGround()) {
        this.position_y += 25;
      }
    }, 50);
  }

  /**
   * Checks if the player is above the ground, based on the y-coordinate.
   *
   * @returns {boolean} - Returns `true` if the player is above the ground (y-coordinate less than 250), otherwise `false`.
   */
  isAboveGround() {
    return this.position_y < 250;
  }

  /**
   * Moves the player to the right by the current speed.
   */
  swimRight() {
    this.position_x += this.speed_x;
  }

  /**
   * Moves the player to the left by the current speed.
   */
  swimLeft() {
    this.position_x -= this.speed_x;
  }

  /**
   * Moves the player upwards by the current speed.
   */
  swimUp() {
    this.position_y -= this.speed_x;
  }

  /**
   * Moves the player downwards by the current speed.
   */
  swimDown() {
    this.position_y += this.speed_x;
  }

  /**
   * Updates the camera position based on the player's x-coordinate.
   */
  updateCameraPosition() {
    this.world.camera_x = -this.position_x + 50;
  }

  /**
   * Updates the movement of JellyFish enemies based on their type and direction.
   * - **JellyFish_Green** and **JellyFish_Pink** update both horizontal and vertical movement.
   * - **JellyFish_Purple** and **JellyFish_Yellow** update only vertical movement.
   */
  updateJellyFishMovement() {
    if (this instanceof JellyFish_Green || this instanceof JellyFish_Pink) {
      this.updateHorizontalMovement();
      this.updateVerticalMovement();
    } else if (
      this instanceof JellyFish_Purple ||
      this instanceof JellyFish_Yellow
    ) {
      this.updateVerticalMovement();
    }
  }

  /**
   * Updates horizontal movement of JellyFish based on their direction.
   * - Moves left if direction is 'left', otherwise moves right.
   * - Changes direction if the JellyFish reaches the horizontal boundaries.
   */
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

  /**
   * Updates vertical movement of JellyFish based on their direction.
   * - Moves up if direction is 'up', otherwise moves down.
   * - Changes direction if the JellyFish reaches the vertical boundaries.
   */
  updateVerticalMovement() {
    if (this.direction_y === 'up') {
      this.swimUp();
      if (this.position_y <= 50) {
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
