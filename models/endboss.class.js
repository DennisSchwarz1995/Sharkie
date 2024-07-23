class Endboss extends AnimationObject {
  /**
   * Creates an instance of `Endboss`.
   * Represents the final boss in the game with various states such as introducing, attacking, being hurt, and dying.
   */
  height = 300;
  width = 300;
  position_y = 100;
  isBossIntroduced = false;
  isAttacking = false;

  MOTION_IMAGES = [
    'img/2.Enemy/3 Final Enemy/2.floating/1.png',
    'img/2.Enemy/3 Final Enemy/2.floating/2.png',
    'img/2.Enemy/3 Final Enemy/2.floating/3.png',
    'img/2.Enemy/3 Final Enemy/2.floating/4.png',
    'img/2.Enemy/3 Final Enemy/2.floating/5.png',
    'img/2.Enemy/3 Final Enemy/2.floating/6.png',
    'img/2.Enemy/3 Final Enemy/2.floating/7.png',
    'img/2.Enemy/3 Final Enemy/2.floating/8.png',
    'img/2.Enemy/3 Final Enemy/2.floating/9.png',
    'img/2.Enemy/3 Final Enemy/2.floating/10.png',
    'img/2.Enemy/3 Final Enemy/2.floating/11.png',
    'img/2.Enemy/3 Final Enemy/2.floating/12.png',
    'img/2.Enemy/3 Final Enemy/2.floating/13.png',
  ];

  INTRODUCE_IMAGES = [
    'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
    'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
  ];

  ATTACK_IMAGES = [
    'img/2.Enemy/3 Final Enemy/Attack/1.png',
    'img/2.Enemy/3 Final Enemy/Attack/2.png',
    'img/2.Enemy/3 Final Enemy/Attack/3.png',
    'img/2.Enemy/3 Final Enemy/Attack/4.png',
    'img/2.Enemy/3 Final Enemy/Attack/5.png',
    'img/2.Enemy/3 Final Enemy/Attack/6.png',
  ];

  HURT_IMAGES = [
    'img/2.Enemy/3 Final Enemy/Hurt/1.png',
    'img/2.Enemy/3 Final Enemy/Hurt/2.png',
    'img/2.Enemy/3 Final Enemy/Hurt/3.png',
    'img/2.Enemy/3 Final Enemy/Hurt/4.png',
  ];

  DEAD_IMAGES = [
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
    'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
  ];

  offset = {
    top: 90,
    bottom: 60,
    left: 10,
    right: 10,
  };

  constructor() {
    super().loadImage(this.INTRODUCE_IMAGES[0]);
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.loadImagesForMotion(this.INTRODUCE_IMAGES);
    this.loadImagesForMotion(this.ATTACK_IMAGES);
    this.loadImagesForMotion(this.HURT_IMAGES);
    this.loadImagesForMotion(this.DEAD_IMAGES);
    this.direction_x = 'left';
    this.direction_y = 'up';
    this.position_x = 2800;
    this.checkEndbossIntroduction();
  }

  /**
   * Checks periodically if the endboss should appear and introduces it if conditions are met.
   * The check is performed every 100 milliseconds.
   * Once the endboss should appear (when the character's x position is >= 2400 and the character has at least 100 coins),
   * the introduction process is triggered.
   */
  checkEndbossIntroduction() {
    let checkAppearance = setInterval(() => {
      if (this.shouldAppear()) {
        clearInterval(checkAppearance);
        this.introduceEndboss();
      }
    }, 100);
  }

  /**
   * Determines if the endboss should appear based on the character's position and the number of coins.
   *
   * @returns {boolean} True if the character's x position is >= 2400 and the character has at least 100 coins, otherwise false.
   */
  shouldAppear() {
    return world.character.position_x >= 2400 && world.character.coins >= 100;
  }

  /**
   * Handles the introduction of the endboss by playing an introduction animation and music.
   * The endboss is introduced if `isBossIntroduced` is false.
   * After the introduction, the endboss's appearance animation and music are played,
   * and background music is switched to the endboss's theme.
   */
  introduceEndboss() {
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

  /**
   * Updates the endboss's movement based on the character's position.
   * The endboss adjusts its movement to follow the character:
   * - Moves left if the endboss's x position is greater than the character's x position.
   * - Moves right if the endboss's x position is less than the character's x position.
   * - Moves up if the endboss's y position is greater than the character's y position.
   * - Moves down if the endboss's y position is less than the character's y position plus the endboss's bottom offset.
   */
  updateEndbossMovement() {
    if (this.position_x > world.character.position_x) {
      this.swimLeft();
      this.otherDirection = false;
    } else if (this.position_x < world.character.position_x) {
      this.swimRight();
      this.otherDirection = true;
    }
    if (this.position_y > world.character.position_y) {
      this.swimUp();
    } else if (
      this.position_y + this.offset.bottom <
      world.character.position_y
    ) {
      this.swimDown();
    }
  }

  /**
   * Determines if the endboss should attack based on the time since the last attack and the current attack state.
   * The endboss is allowed to attack if at least 2 seconds have passed since the last attack and it is not currently attacking.
   *
   * @returns {boolean} True if the endboss should attack, otherwise false.
   */
  shouldEndbossAttack() {
    let timeSinceLastAttack = (new Date().getTime() - this.attackTimer) / 1000;
    return timeSinceLastAttack > 2 && !this.isEndbossAttacking;
  }

  /**
   * Handles the endboss's attack sequence.
   * If the endboss is not currently hurt or attacking, it starts the attack animation and sets the attacking state.
   * The attack state is reset after 900 milliseconds, and the attack timer is updated.
   */
  handleEndbossAttack() {
    if (!this.isEndbossHurt && !this.isEndbossAttacking) {
      this.isEndbossAttacking = true;
      this.playAnimation(this.ATTACK_IMAGES);

      setTimeout(() => {
        this.isEndbossAttacking = false;
        this.attackTimer = new Date().getTime();
      }, 900);
    }
  }

  /**
   * Handles the endboss's hurt state by playing the hurt animation.
   * The hurt state is reset after 500 milliseconds.
   */
  handleEndbossHurt() {
    if (this.isEndbossHurt) {
      this.playAnimation(this.HURT_IMAGES);
      setTimeout(() => {
        this.isEndbossHurt = false;
      }, 500);
    }
  }

  /**
   * Handles the endboss's death sequence, including playing the death animation and moving the endboss to the surface.
   * The death animation plays, and after a delay, the endboss rises to the surface.
   * The death animation interval is cleared after 800 milliseconds.
   *
   * @param {number} endbossAnimation - The interval ID for the endboss's animation.
   * @param {number} endbossMovement - The interval ID for the endboss's movement.
   */
  handleEndbossDeath(endbossAnimation, endbossMovement) {
    this.clearIntervals(endbossAnimation, endbossMovement);
    this.currentMotionImage = 0;

    let deathAnimation = setStoppableInterval(() => {
      this.playAnimation(this.DEAD_IMAGES);
    }, 200);

    setTimeout(() => {
      this.riseToSurface();
    }, 600);

    setTimeout(() => {
      clearInterval(deathAnimation);
    }, 800);
  }
}
