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
    this.animate();
  }

  animate() {
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
      if (this.isDead() && this.isHitByPufferfish) {
        this.deadFromPufferfish = true;
        this.triggerDeathAnimation(characterAnimation);
      } else if (this.isDead() && this.isHitByJellyfish) {
        this.deadFromJellyFish = true;
        this.triggerDeathAnimation(characterAnimation);
      } else if (
        this.world.keyboard.SPACE &&
        this.poison <= 0 &&
        !this.isDead()
      ) {
        this.animateCharacterAttack("bubble");
        this.playAnimation(this.assets.BUBBLE_ATTACK_IMAGES);
      } else if (
        this.world.keyboard.SPACE &&
        this.poison > 0 &&
        !this.isDead()
      ) {
        this.animateCharacterAttack("poisonBubble");
        this.playAnimation(this.assets.POISON_BUBBLE_ATTACK_IMAGES);
      } else if (this.world.keyboard.F && !this.isDead()) {
        this.animateCharacterAttack("finslap");
        this.playAnimation(this.assets.FINSLAP_ATTACK_IMAGES);
      } else if (this.isMoving() && !this.isHurt()) {
        this.playAnimation(this.assets.SWIMMING_IMAGES);
        this.world.audios.characterSwim.play();
      } else if (
        this.isHurt() &&
        this.isHitByPufferfish &&
        !this.isHitByJellyfish
      ) {
        this.playAnimation(this.assets.HURT_POISONED_IMAGES);
      } else if (
        this.isHurt() &&
        this.isHitByJellyfish &&
        !this.isHitByPufferfish
      ) {
        this.playAnimation(this.assets.HURT_SHOCKED_IMAGES);
      } else if (!this.isButtonPressed() && !this.isDead()) {
        this.playAnimation(this.assets.IDLE_IMAGES);
      }
    }, 100);
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
}
