class Character extends AnimationObject {
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
  deadFromJellyFish = false;
  deadFromPufferfish = false;
  offset = {
    top: 95,
    bottom: 40,
    left: 30,
    right: 30,
  };

  constructor(world, assets) {
    super().loadImage("img/1.Sharkie/3.Swim/1.png");
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

  handleDeathAnimation(characterAnimation) {
    if (this.isHitByPufferfish) {
      this.deadFromPufferfish = true;
    } else if (this.isHitByJellyfish) {
      this.deadFromJellyFish = true;
    }
    this.triggerDeathAnimation(characterAnimation);
  }

  handleBubbleAttack() {
    if (this.poison <= 0) {
      this.animateCharacterAttack("bubble");
      this.playAnimation(this.assets.BUBBLE_ATTACK_IMAGES);
    } else {
      this.animateCharacterAttack("poisonBubble");
      this.playAnimation(this.assets.POISON_BUBBLE_ATTACK_IMAGES);
    }
  }

  handleFinslapAttack() {
    this.animateCharacterAttack("finslap");
    this.playAnimation(this.assets.FINSLAP_ATTACK_IMAGES);
  }

  handleHurtAnimation() {
    if (this.isHitByPufferfish && !this.isHitByJellyfish) {
      this.playAnimation(this.assets.HURT_POISONED_IMAGES);
    } else if (this.isHitByJellyfish && !this.isHitByPufferfish) {
      this.playAnimation(this.assets.HURT_SHOCKED_IMAGES);
    }
  }

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

  riseToSurface() {
    setStoppableInterval(() => {
      if (this.position_y + (this.height - this.offset.top) >= 20) {
        this.position_y -= 8;
      }
    }, 50);
  }

  sinkToGround() {
    setStoppableInterval(() => {
      if (this.isAboveGround()) {
        this.position_y += 25;
      }
    }, 50);
  }

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

  isAbleToSwimRight() {
    return (
      this.world.keyboard.RIGHT &&
      this.position_x < this.world.level.level_end_x &&
      !this.isDead()
    );
  }

  isAbleToSwimLeft() {
    return this.world.keyboard.LEFT && this.position_x > 0 && !this.isDead();
  }

  isAbleToSwimUp() {
    return this.world.keyboard.UP && this.position_y > -80 && !this.isDead();
  }

  isAbleToSwimDown() {
    return this.world.keyboard.DOWN && this.position_y < 300 && !this.isDead();
  }

  isAboveGround() {
    return this.position_y < 250;
  }

  isBubbleAttacking() {
    return this.world.keyboard.SPACE;
  }

  isFinslapAttacking() {
    return this.world.keyboard.F;
  }
}
