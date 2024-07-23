class BackgroundObject extends MovableObject {
  /**
   * Creates an instance of `BackgroundObject`.
   * @param {string} imagePath - The path to the image file to be used for this background object.
   * @param {number} position_x - The initial horizontal position of the background object.
   */
  height = 480;
  width = 720;

  constructor(imagePath, position_x) {
    super().loadImage(imagePath);
    this.position_x = position_x;
    this.position_y = 480 - this.height;
  }
}
