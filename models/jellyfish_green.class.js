class JellyFish_Green extends AnimationObject {
  /**
   * Creates an instance of `JellyFish_Green`.
   * @param {number} position_x - The initial X position of the jellyfish.
   * @param {number} position_y - The initial Y position of the jellyfish.
   */
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
    this.animateJellyFish();
  }
}
