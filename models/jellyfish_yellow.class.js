class JellyFish_Yellow extends MovableObject {
  MOTION_IMAGES = [
    'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
    'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
  ];

  DEAD_IMAGES = [
    'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
    'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
    'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
    'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png',
  ];

  isDead = false;

  constructor(position_x, position_y) {
    super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.loadImagesForMotion(this.DEAD_IMAGES);
    this.width = 80;
    this.height = 80;
    this.offset.top = 6;
    this.offset.bottom = 10;
    this.position_x = position_x;
    this.position_y = position_y;
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
