class AnimationObject extends MovableObject {
  /**
   * Creates an instance of `AnimationObject`.
   * Initializes the attack timer with the current timestamp.
   */
  movingLeft = false;
  isTransitioning = false;
  isPuffedUp = false;
  isJellyFishDead = false;
  isPufferFishDead = false;
  isEndbossHurt = false;
  attackTimer = 0;

  constructor() {
    super();
    this.attackTimer = new Date().getTime();
  }

  /**
   * Animates the endboss by managing its movement and animation states.
   * It handles endboss movement, attack animations, and reactions to being hurt or dead.
   */
  animateEndboss() {
    let endbossMovement = setStoppableInterval(() => {
      this.updateEndbossMovement();
    }, 150);

    let endbossAnimation = setStoppableInterval(() => {
      if (this.isDead()) {
        this.handleEndbossDeath(endbossAnimation, endbossMovement);
      } else if (this.shouldEndbossAttack()) {
        this.handleEndbossAttack();
      } else if (this.isEndbossHurt) {
        this.handleEndbossHurt();
      } else {
        this.playAnimation(this.MOTION_IMAGES);
      }
    }, 150);
  }

  /**
   * Animates the character by managing its movement and various action states.
   * It handles appropriate animations based on character state.
   */
  animateCharacter() {
    setStoppableInterval(() => {
      this.animateCharacterMovement();
    }, 1000 / 60);

    let characterAnimation = setStoppableInterval(() => {
      this.updateCharacterActions(characterAnimation);
    }, 100);
  }

  /**
   * Animates the character by managing its movement.
   * It handles swimming in different directions and plays appropriate animations based on character state.
   */
  animateCharacterMovement() {
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
  }

  /**
   * Animates the character's attack based on the given type.
   * Initializes the attack animation and sets up the appropriate intervals and actions.
   *
   * @param {string} type - The type of the attack action (e.g., 'bubble', 'poisonBubble', 'finslap').
   */
  animateCharacterAttack(type) {
    if (!this.isAttacking) {
      this.currentMotionImage = 0;

      let { interval, key, action } = this.getAttackParameters(type);

      if (interval && key && action) {
        this.startAttackAnimation(interval, key, action);
      }
    }
  }

  /**
   * Animates the pufferfish, handling its movement, animation, and transition states.
   * Manages movement intervals, direction changes, and transition animations for puffing up.
   *
   * @param {number} directionInterval - Interval for changing movement direction.
   * @param {number} transitionInterval - Delay before transitioning to the puffed-up state.
   */
  animatePufferFish(directionInterval, transitionInterval) {
    let pufferFishMovement = setStoppableInterval(() => {
      if (this.movingLeft) {
        this.swimLeft();
        this.otherDirection = false;
      } else {
        this.swimRight();
        this.otherDirection = true;
      }
    }, 1000 / 60);

    let pufferFishAnimation = setStoppableInterval(() => {
      if (this.isDead()) {
        this.animatePufferFishDeath();
        clearInterval(pufferFishMovement, pufferFishAnimation);
        this.clearDirectionAndTransitionInterval();
      } else if (!this.isTransitioning && !this.isPuffedUp) {
        this.offset.bottom = 18;
        this.playAnimation(this.MOTION_IMAGES);
      }
    }, 150);

    this.startDirectionInterval(directionInterval);
    this.startTransitionTimeout(transitionInterval);
  }

  /**
   * Handles the pufferfish's transition animation to the puffed-up state.
   * Plays transition animation and updates state after the transition is complete.
   */
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

      setStoppableTimeout(() => {
        this.isTransitioning = false;
        clearInterval(transitionAnimation);
        this.isPuffedUp = true;
        this.animatePufferFishPuffUp();
      }, 1000);
    }
  }

  /**
   * Animates the pufferfish puffing up after the transition.
   * Manages puff-up animation and handles the return to normal state after a delay.
   */
  animatePufferFishPuffUp() {
    if (this.isPuffedUp) {
      let puffUpAnimation = setStoppableInterval(() => {
        if (!this.isPufferFishDead) {
          this.playAnimation(this.PUFF_UP_IMAGES);
        } else {
          clearInterval(puffUpAnimation);
        }
      }, 150);

      setStoppableTimeout(() => {
        this.isPuffedUp = false;
        clearInterval(puffUpAnimation);
      }, 3000);

      setStoppableTimeout(() => {
        this.isTransitioning = true;
        this.animatePufferFishTransition();
      }, 5000);
    }
  }

  /**
   * Handles the animation of the pufferfish death.
   * Plays the death animation and updates the pufferfish's position.
   */
  animatePufferFishDeath() {
    this.currentMotionImage = 0;
    this.isPufferFishDead = true;
    setStoppableInterval(() => {
      this.playAnimation(this.DEAD_IMAGES);
      this.position_x += 20;
      this.position_y += 50;
    }, 150);
  }

  /**
   * Animates the jellyfish by managing its movement and animation states.
   * Handles animation and movement while the jellyfish is alive, stopping when dead.
   */
  animateJellyFish() {
    let animation = setStoppableInterval(() => {
      if (!this.isJellyFishDead) {
        this.playAnimation(this.MOTION_IMAGES);
      } else {
        clearInterval(animation);
      }
    }, 150);

    let movement = setStoppableInterval(() => {
      if (!this.isJellyFishDead) {
        this.updateJellyFishMovement();
      } else {
        clearInterval(movement);
      }
    }, 100);
  }

  /**
   * Handles the animation of the jellyfish death.
   * Plays the death animation and updates the jellyfish's state.
   */
  animateJellyFishDeath() {
    this.isJellyFishDead = true;
    setStoppableInterval(() => {
      this.playAnimation(this.DEAD_IMAGES);
    }, 150);
  }

  /**
   * Animates the coin by repeatedly playing the coin motion animation at specified intervals.
   * The animation is played every 250 milliseconds.
   */
  animateCoin() {
    setStoppableInterval(() => {
      this.playAnimation(this.MOTION_IMAGES);
    }, 250);
  }

  /**
   * Animates the character or object by repeatedly playing the motion animation at specified intervals.
   * The animation is played every 100 milliseconds.
   */
  animatePoisonBottle() {
    setStoppableInterval(() => {
      this.playAnimation(this.MOTION_IMAGES);
    }, 100);
  }
}
