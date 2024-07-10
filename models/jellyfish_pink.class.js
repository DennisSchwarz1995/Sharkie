class JellyFish_Pink extends MovableObject {
  MOTION_IMAGES = [
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png',
  ];

  DEAD_IMAGES = [
    'img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
    'img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
    'img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
    'img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png',
  ];

  isDead = false;

  constructor(position_x, position_y) {
    super().loadImage('img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png');
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.loadImagesForMotion(this.DEAD_IMAGES);
    this.width = 90;
    this.height = 90;
    this.offset.top = 6;
    this.offset.bottom = 10;
    this.position_x = position_x;
    this.position_y = position_y;
    this.direction_x = 'right';
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
        this.updateHorizontalMovement();
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
