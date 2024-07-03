class JellyFish_Pink extends MovableObject {
  MOTION_IMAGES = [
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];

  constructor(position_x, position_y) {
    super().loadImage("img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png");
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.width = 90;
    this.height = 90;
    this.offset.top = 6;
    this.offset.bottom = 10;
    this.position_x = position_x;
    this.position_y = position_y;
    this.direction_x = "right";
    this.direction_y = "down";
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
