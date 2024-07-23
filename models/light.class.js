class Light extends MovableObject {
  /**
   * Creates an instance of `Light`.
   * The light object is initialized with an image and a specified horizontal position.
   *
   * @param {number} position_x - The horizontal position of the light object.
   */
  position_y = 0;
  height = 400;
  width = 600;

  constructor(position_x) {
    super().loadImage('img/3. Background/Layers/1. Light/1.png');
    this.position_x = position_x;
  }
}
