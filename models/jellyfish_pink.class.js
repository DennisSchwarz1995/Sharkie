class JellyFish_Pink extends AnimationObject {
    /**
   * Creates an instance of `JellyFish_Pink`.
   * @param {number} position_x - The initial X position of the jellyfish.
   * @param {number} position_y - The initial Y position of the jellyfish.
   */
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
    this.animateJellyFish();
  }
}
