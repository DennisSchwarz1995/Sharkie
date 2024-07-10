class JellyFish_Green extends MovableObject {
  MOTION_IMAGES = [
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
  ];

  DEAD_IMAGES = [
    'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
    'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
    'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
    'img/2.Enemy/2 Jelly fish/Dead/green/g4.png',
  ];

  isDead = false;

  constructor(position_x, position_y) {
    super().loadImage('img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png');
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.loadImagesForMotion(this.DEAD_IMAGES);
    this.width = 90;
    this.height = 90;
    this.offset.top = 6;
    this.offset.bottom = 10;
    this.position_x = position_x;
    this.position_y = position_y;
    this.direction_x = 'left';
    this.direction_y = 'up';
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
