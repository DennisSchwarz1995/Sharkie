class Character extends AnimationObject {
  /**
   * Creates an instance of `Character`.
   * @param {World} world - The world object which contains information about the game world and entities within it.
   * @param {Object} assets - An object containing arrays of image paths for various character states and actions.
   */
  height = 200;
  width = 200;
  speed_x = 6;
  position_y = 200;
  world;
  assets;
  animationPlaying = false;
  isAttacking = false;
  isHitByJellyfish = false;
  isHitByPufferfish = false;
  isHitByEndboss = false;
  deadFromJellyFish = false;
  deadFromPufferfish = false;
  deadFromEndboss = false;
  offset = {
    top: 95,
    bottom: 45,
    left: 40,
    right: 40,
  };

  constructor(world, assets) {
    super().loadImage('img/1.Sharkie/3.Swim/1.png');
    this.world = world;
    this.assets = assets;
    this.loadImagesForMotion(this.assets.SWIMMING_IMAGES);
    this.loadImagesForMotion(this.assets.IDLE_IMAGES);
    this.loadImagesForMotion(this.assets.SLEEPING_IMAGES);
    this.loadImagesForMotion(this.assets.HURT_POISONED_IMAGES);
    this.loadImagesForMotion(this.assets.HURT_SHOCKED_IMAGES);
    this.loadImagesForMotion(this.assets.POISONED_DEAD_IMAGES);
    this.loadImagesForMotion(this.assets.SHOCKED_DEAD_IMAGES);
    this.loadImagesForMotion(this.assets.BUBBLE_ATTACK_IMAGES);
    this.loadImagesForMotion(this.assets.POISON_BUBBLE_ATTACK_IMAGES);
    this.loadImagesForMotion(this.assets.FINSLAP_ATTACK_IMAGES);
    this.animateCharacter();
  }

  /**
   * Triggers the death animation based on the cause of death.
   * Ensures that the animation is played only once and sets the appropriate death animation based on the cause of death.
   *
   * @param {number} characterAnimation - The interval ID for the character's animation, used to stop it during death animation.
   */
  triggerDeathAnimation(characterAnimation) {
    if (!this.animationPlaying) {
      this.animationPlaying = true;
      if (this.deadFromPufferfish || this.deadFromEndboss) {
        this.playDeathAnimationByPoison(characterAnimation);
      } else if (this.deadFromJellyFish) {
        this.playDeathAnimationByShock(characterAnimation);
      }
    }
  }

  /**
   * Plays the death animation for a character that has died from poison.
   * The character will be shown with poisoned death images and rise to the surface after a short delay.
   *
   * @param {number} characterAnimation - The interval ID for the character's animation, used to stop it during death animation.
   */
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

  /**
   * Plays the death animation for a character that has died from shock.
   * The character will be shown with shocked death images and sink to the ground after a short delay.
   *
   * @param {number} characterAnimation - The interval ID for the character's animation, used to stop it during death animation.
   */
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

  /**
   * Handles the death animation based on the type of hit the character received.
   * Sets flags for the cause of death and triggers the appropriate death animation.
   *
   * @param {number} characterAnimation - The interval ID for the character's animation, used to stop it during death animation.
   */
  handleDeathAnimation(characterAnimation) {
    if (this.isHitByPufferfish) {
      this.deadFromPufferfish = true;
    } else if (this.isHitByJellyfish) {
      this.deadFromJellyFish = true;
    } else if (this.isHitByEndboss) {
      this.deadFromEndboss = true;
    }
    this.triggerDeathAnimation(characterAnimation);
  }

  /**
   * Handles the bubble attack by triggering the appropriate animation and sound effect based on the poison level.
   */
  handleBubbleAttack() {
    if (this.poison <= 0) {
      this.animateCharacterAttack('bubble');
      this.playAnimation(this.assets.BUBBLE_ATTACK_IMAGES);
    } else {
      this.animateCharacterAttack('poisonBubble');
      this.playAnimation(this.assets.POISON_BUBBLE_ATTACK_IMAGES);
    }
  }

  /**
   * Handles the finslap attack by triggering the appropriate animation and sound effect.
   */
  handleFinslapAttack() {
    this.animateCharacterAttack('finslap');
    this.playAnimation(this.assets.FINSLAP_ATTACK_IMAGES);
  }

  /**
   * Handles the hurt animation based on the type of hit the character received.
   * Displays the appropriate hurt animation depending on the type of damage taken.
   */
  handleHurtAnimation() {
    if (
      (this.isHitByPufferfish && !this.isHitByJellyfish) ||
      (this.isHitByEndboss && !this.isHitByJellyfish)
    ) {
      this.playAnimation(this.assets.HURT_POISONED_IMAGES);
    } else if (this.isHitByJellyfish && !this.isHitByPufferfish) {
      this.playAnimation(this.assets.HURT_SHOCKED_IMAGES);
    }
  }

  /**
   * Checks if all necessary movement buttons are pressed.
   * Returns `true` if all movement keys and action keys are pressed, `false` otherwise.
   *
   * @returns {boolean} - `true` if all required keys are pressed, `false` otherwise.
   */
  isButtonPressed() {
    return (
      this.world.keyboard.RIGHT &&
      this.world.keyboard.LEFT &&
      this.world.keyboard.UP &&
      this.world.keyboard.DOWN &&
      this.world.keyboard.SPACE &&
      this.world.keyboard.F
    );
  }

  /**
   * Checks if the character is currently moving based on the pressed keys.
   * Returns `true` if any of the movement keys are pressed.
   *
   * @returns {boolean} - `true` if any movement keys are pressed, `false` otherwise.
   */
  isMoving() {
    if (this.world) {
      return (
        this.world.keyboard.RIGHT ||
        this.world.keyboard.LEFT ||
        this.world.keyboard.UP ||
        this.world.keyboard.DOWN
      );
    }
  }

  /**
   * Checks if the character is able to swim to the right.
   * The character can swim right if the right key is pressed, the character is within the world bounds, and is not dead.
   *
   * @returns {boolean} - `true` if the character can swim right, `false` otherwise.
   */
  isAbleToSwimRight() {
    return (
      this.world.keyboard.RIGHT &&
      this.position_x < this.world.level.level_end_x &&
      !this.isDead()
    );
  }

  /**
   * Checks if the character is able to swim to the left.
   * The character can swim left if the left key is pressed, the character is within the world bounds, and is not dead.
   *
   * @returns {boolean} - `true` if the character can swim left, `false` otherwise.
   */
  isAbleToSwimLeft() {
    return this.world.keyboard.LEFT && this.position_x > 0 && !this.isDead();
  }

  /**
   * Checks if the character is able to swim upward.
   * The character can swim up if the up key is pressed, the character is within the world bounds, and is not dead.
   *
   * @returns {boolean} - `true` if the character can swim up, `false` otherwise.
   */
  isAbleToSwimUp() {
    return this.world.keyboard.UP && this.position_y > -50 && !this.isDead();
  }

  /**
   * Checks if the character is able to swim downward.
   * The character can swim down if the down key is pressed, the character is within the world bounds, and is not dead.
   *
   * @returns {boolean} - `true` if the character can swim down, `false` otherwise.
   */
  isAbleToSwimDown() {
    return this.world.keyboard.DOWN && this.position_y < 300 && !this.isDead();
  }

  /**
   * Checks if the character is currently performing a bubble attack.
   *
   * @returns {boolean} - `true` if the space key is pressed, indicating a bubble attack, `false` otherwise.
   */
  isBubbleAttacking() {
    return this.world.keyboard.SPACE;
  }

  /**
   * Checks if the character is currently performing a finslap attack.
   *
   * @returns {boolean} - `true` if the F key is pressed, indicating a finslap attack, `false` otherwise.
   */
  isFinslapAttacking() {
    return this.world.keyboard.F;
  }
}
