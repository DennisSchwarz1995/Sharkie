class JellyFish_Purple extends AnimationObject {
    /**
   * Creates an instance of `JellyFish_Purple`.
   * @param {number} position_x - The initial X position of the jellyfish.
   * @param {number} position_y - The initial Y position of the jellyfish.
   */
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


  constructor(position_x, position_y) {
    super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.loadImagesForMotion(this.DEAD_IMAGES);
    this.width = 80;
    this.height = 80;
    this.offset.top = 6;
    this.offset.bottom = 10;
    this.offset.left = 5;
    this.offset.right = 5;
    this.position_x = position_x;
    this.position_y = position_y;
    this.direction_y = 'down';
    this.animateJellyFish();
  }
}
