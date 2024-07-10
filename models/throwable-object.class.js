class ThrowableObject extends MovableObject {
  constructor(position_x, position_y, otherDirection, image) {
    super().loadImage(image);
    this.position_x = position_x;
    this.position_y = position_y;
    this.otherDirection = otherDirection;
    this.width = 40;
    this.height = 40;
    this.throwBubble();
  }

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
