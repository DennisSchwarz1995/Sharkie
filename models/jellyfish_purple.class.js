class JellyFish_Purple extends MovableObject {
  MOTION_IMAGES = [
    'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
  ];

  DEAD_IMAGES = [
    'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
    'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
    'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
    'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
  ];

  isDead = false;

  constructor(position_x, position_y) {
    super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.loadImagesForMotion(this.DEAD_IMAGES);
    this.width = 80;
    this.height = 80;
    this.offset.top = 6;
    this.offset.bottom = 10;
    this.position_x = position_x;
    this.position_y = position_y;
    this.direction_y = 'down';
    this.animate();
  }

  animate() {
    let animation = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.MOTION_IMAGES);
      } else {
        clearInterval(animation);
      }
    }, 150);

    let movement = setInterval(() => {
      if (!this.isDead) {
        this.updateVerticalMovement();
      } else {
        clearInterval(movement);
      }
    }, 100);
  }

  animateDeath() {
    this.isDead = true;
    setInterval(() => {
      this.playAnimation(this.DEAD_IMAGES);
    }, 150);
  }
}
