class Water extends MovableObject {
  /**
   * Creates an instance of `Water`.
   * Initializes the water object with the provided image and horizontal position.
   * @param {string} imagePath - The path to the image representing the water.
   * @param {number} position_x - The initial horizontal position of the water element.
   */
  height = 480;
  width = 720;

  constructor(imagePath, position_x) {
    super().loadImage(imagePath);
    this.position_x = position_x;
    this.position_y = 480 - this.height;
  }
}
