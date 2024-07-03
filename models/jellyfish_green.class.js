class JellyFish_Green extends MovableObject {
  MOTION_IMAGES = [
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
    'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
  ];

  constructor(position_x, position_y) {
    super().loadImage('img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png');
    this.loadImagesForMotion(this.MOTION_IMAGES);
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
    setInterval(() => {
      this.playAnimation(this.MOTION_IMAGES);
    }, 150);

    setInterval(() => {
      this.updateHorizontalMovement();
      this.updateVerticalMovement();
    }, 100);
  }
}
