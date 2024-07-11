class AnimationObject extends MovableObject {
  movingLeft = false;
  isTransitioning = false;
  isPuffedUp = false;
  isJellyFishDead = false;
  isPufferFishDead = false;

  constructor() {
    super();
  }

  animateCharacterAttack(type) {
    if (!this.isAttacking) {
      this.currentMotionImage = 0;
      let interval, key, action;

      if (type === "bubble") {
        interval = 50;
        key = "SPACE";
        action = () => this.world.shootBubble();
      } else if (type === "poisonBubble") {
        interval = 50;
        key = "SPACE";
        action = () => this.world.shootPoisonBubble();
      } else if (type === "finslap") {
        interval = 150;
        key = "F";
        action = () => this.world.audios.finslap.play();
      }

      let attackAnimation = setStoppableInterval(() => {
        this.isAttacking = true;
        this.world.keyboard[key] = true;
      }, interval);

      setTimeout(() => {
        clearInterval(attackAnimation);
        this.isAttacking = false;
        this.world.keyboard[key] = false;
        action();
      }, 800);
    }
  }

  animatePufferFish(directionInterval, transitionInterval) {
    let movement,
    animation,
    direction,
    transition;

    let clearAllIntervals = () => {
      clearInterval(movement);
      clearInterval(animation);
      clearInterval(direction);
      clearTimeout(transition);
    };

    let checkIfDeadInterval = setInterval(() => {
      if (this.isPufferFishDead) {
        clearAllIntervals();
        clearInterval(checkIfDeadInterval);
      }
    }, 100);

    movement = setStoppableInterval(() => {
      if (this.movingLeft) {
        this.swimLeft();
        this.otherDirection = false;
      } else {
        this.swimRight();
        this.otherDirection = true;
      }
    }, 1000 / 60);

    animation = setStoppableInterval(() => {
      if (!this.isTransitioning && !this.isPuffedUp) {
        this.offset.bottom = 18;
        this.playAnimation(this.MOTION_IMAGES);
      }
    }, 150);

    direction = setStoppableInterval(() => {
      this.movingLeft = !this.movingLeft;
    }, directionInterval);

    transition = setTimeout(() => {
      this.isTransitioning = true;
      this.animatePufferFishTransition();
    }, transitionInterval);
  }

  animatePufferFishTransition() {
    this.currentMotionImage = 0;
    if (this.isTransitioning) {
      let transitionAnimation = setStoppableInterval(() => {
        if (!this.isPufferFishDead) {
          this.offset.bottom = 3;
          this.playAnimation(this.TRANSITION_IMAGES);
        } else {
          clearInterval(transitionAnimation);
        }
      }, 150);

      setTimeout(() => {
        this.isTransitioning = false;
        clearInterval(transitionAnimation);
        this.isPuffedUp = true;
        this.animatePufferFishPuffUp();
      }, 1000);
    }
  }

  animatePufferFishPuffUp() {
    if (this.isPuffedUp) {
      let puffUpAnimation = setStoppableInterval(() => {
        if (!this.isPufferFishDead) {
          this.playAnimation(this.PUFF_UP_IMAGES);
        } else {
          clearInterval(puffUpAnimation);
        }
      }, 150);

      setTimeout(() => {
        this.isPuffedUp = false;
        clearInterval(puffUpAnimation);
      }, 3000);

      setTimeout(() => {
        this.isTransitioning = true;
        this.animatePufferFishTransition();
      }, 5000);
    }
  }

  animatePufferFishDeath() {
    this.currentMotionImage = 0;
    this.isPufferFishDead = true;
    setInterval(() => {
      this.playAnimation(this.DEAD_IMAGES);
      this.position_x += 20;
      this.position_y += 50;
    }, 150);
  }

  animateJellyFish() {
    let animation = setInterval(() => {
      if (!this.isJellyFishDead) {
        this.playAnimation(this.MOTION_IMAGES);
      } else {
        clearInterval(animation);
      }
    }, 150);

    let movement = setInterval(() => {
      if (!this.isJellyFishDead) {
        this.updateJellyFishMovement();
      } else {
        clearInterval(movement);
      }
    }, 100);
  }

  animateJellyFishDeath() {
    this.isJellyFishDead = true;
    setInterval(() => {
      this.playAnimation(this.DEAD_IMAGES);
    }, 150);
  }

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
}
