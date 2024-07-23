class Coin extends AnimationObject {
  /**
   * Creates an instance of `Coin`.
   * Sets the initial position, dimensions, and animates the coin.
   * @param {number} position_x - The initial horizontal position of the coin.
   */
  MOTION_IMAGES = [
    'img/4. Marcadores/1. Coins/1.png',
    'img/4. Marcadores/1. Coins/2.png',
    'img/4. Marcadores/1. Coins/3.png',
    'img/4. Marcadores/1. Coins/4.png',
  ];

  constructor(position_x) {
    super().loadImage('img/4. Marcadores/1. Coins/1.png');
    this.position_x = position_x;
    this.position_y = 40 + Math.random() * (400 - 40);
    this.height = 40;
    this.width = 40;
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.animateCoin();
  }
}
