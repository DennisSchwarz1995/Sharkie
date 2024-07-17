class AnimationObject extends MovableObject {
  movingLeft = false;
  isTransitioning = false;
  isPuffedUp = false;
  isJellyFishDead = false;
  isPufferFishDead = false;

  constructor() {
    super();
  }



  animateEndbossIntroduction() {
    let introduction = setInterval(() => {
      if (this.isBossIntroduced) {
        clearInterval(introduction);
        this.animateEndboss();
      } else {
        this.playAnimation(this.INTRODUCE_IMAGES);
        this.world.audios.endbossIntro.play();
        setTimeout(() => {
          this.isBossIntroduced = true;
          this.world.audios.backgroundMusic.pause();
          this.world.audios.endbossBackgroundMusic.play();
          this.world.audios.endbossBackgroundMusic.loop = true;
        }, 800);
      }
    }, 100);
  }


  animateEndboss() {
    let endbossAnimation = setStoppableInterval(() => {
      if(this.isDead()) {
        this.animateEndbossDeath(endbossAnimation);
      } else if (!this.isDead()){
        this.playAnimation(this.MOTION_IMAGES);
        this.updateEndbossMovement();
        this.animateEndbossMotion();
      }
    }, 150);

    
  }

  animateEndbossDeath(endbossAnimation) {
    this.currentMotionImage = 0;
    let endbossDeathAnimation = setStoppableInterval(() => {
      this.playAnimation(this.DEAD_IMAGES);
    }, 200);

    setTimeout(() => {
      this.sinkToGround();
    }, 600);

    setTimeout(() => {
      clearInterval(endbossAnimation);
      clearInterval(endbossDeathAnimation);
    }, 2000);
  }

  animateEndbossMotion() {
    setStoppableInterval(() => {
 
    }, 100)

  } 

  animateCharacter() {
    setStoppableInterval(() => {
      if (this.isAbleToSwimRight()) {
        this.swimRight();
        this.otherDirection = false;
      }
      if (this.isAbleToSwimLeft()) {
        this.swimLeft();
        this.otherDirection = true;
      }
      if (this.isAbleToSwimUp()) {
        this.swimUp();
      }
      if (this.isAbleToSwimDown()) {
        this.swimDown();
      }
      this.updateCameraPosition();
    }, 1000 / 60);

    let characterAnimation = setStoppableInterval(() => {
      if (this.isDead()) {
        this.handleDeathAnimation(characterAnimation);
      } else if (this.isBubbleAttacking()) {
        this.handleBubbleAttack();
      } else if (this.isFinslapAttacking()) {
        this.handleFinslapAttack();
      } else if (this.isMoving() && !this.isHurt()) {
        this.playAnimation(this.assets.SWIMMING_IMAGES);
        this.world.audios.characterSwim.play();
      } else if (this.isHurt()) {
        this.handleHurtAnimation();
      } else {
        this.playAnimation(this.assets.IDLE_IMAGES);
      }
    }, 100);
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

  triggerDeathAnimation(characterAnimation) {
    if (!this.animationPlaying) {
      this.animationPlaying = true;
      if (this.deadFromPufferfish) {
        this.playDeathAnimationByPoison(characterAnimation);
      } else if (this.deadFromJellyFish) {
        this.playDeathAnimationByShock(characterAnimation);
      }
    }
  }

  playDeathAnimationByPoison(characterAnimation) {
    this.currentMotionImage = 0;
    let deathAnimation = setStoppableInterval(() => {
      this.playAnimation(this.assets.POISONED_DEAD_IMAGES);
    }, 200);

    setTimeout(() => {
      this.riseToSurface();
    }, 600);

    setTimeout(() => {
      clearInterval(characterAnimation);
      clearInterval(deathAnimation);
    }, 2000);
  }

  playDeathAnimationByShock(characterAnimation) {
    this.currentMotionImage = 0;
    let deathAnimation = setStoppableInterval(() => {
      this.playAnimation(this.assets.SHOCKED_DEAD_IMAGES);
    }, 200);

    setTimeout(() => {
      this.sinkToGround();
    }, 600);

    setTimeout(() => {
      clearInterval(characterAnimation);
      clearInterval(deathAnimation);
    }, 2000);
  }

  animatePufferFish(directionInterval, transitionInterval) {
    let movement, animation, direction, transition;

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
