class ThrowableObject extends MovableObject {
  /**
   * Creates an instance of `ThrowableObject`.
   * Initializes the object's position, appearance, and throwing behavior.
   * @param {number} position_x - The initial horizontal position of the object.
   * @param {number} position_y - The initial vertical position of the object.
   * @param {boolean} otherDirection - Indicates whether the object is thrown in the opposite direction.
   * @param {string} image - The path to the image representing the object's appearance.
   * @param {string} type - The type of the throwable object (e.g., 'bubble', 'bomb').
   */
  constructor(position_x, position_y, otherDirection, image, type) {
    super().loadImage(image);
    this.position_x = position_x;
    this.position_y = position_y;
    this.startPosition_x = position_x;
    this.maxDistance = 500;
    this.otherDirection = otherDirection;
    this.type = type;
    this.width = 40;
    this.height = 40;
    this.throwBubble();
  }

  /**
   * Throws a bubble in the direction the character is facing.
   *
   * If the character is facing the other direction (`this.otherDirection` is `true`),
   * the bubble is thrown to the left and continues to move left at a fixed rate.
   * If the character is not facing the other direction (`this.otherDirection` is `false`),
   * the bubble is thrown to the right and continues to move right at a fixed rate.
   */
  throwBubble() {
    if (this.otherDirection) {
      this.position_x -= 140;
      setStoppableInterval(() => {
        this.position_x -= 15;
      }, 50);
    } else if (!this.otherDirection) {
      setStoppableInterval(() => {
        this.position_x += 15;
      }, 50);
    }
  }
}
