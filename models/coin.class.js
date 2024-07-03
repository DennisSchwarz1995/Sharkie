class Coin extends MovableObject {
  MOTION_IMAGES = [
    "img/4. Marcadores/1. Coins/1.png",
    "img/4. Marcadores/1. Coins/2.png",
    "img/4. Marcadores/1. Coins/3.png",
    "img/4. Marcadores/1. Coins/4.png",
  ];

  constructor(position_x, position_y) {
    super().loadImage("img/4. Marcadores/1. Coins/1.png");
    this.position_x = position_x;
    this.position_y = position_y;
    this.height = 40;
    this.width = 40;
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.animateCoin();
  }

  animateCoin() {
    setInterval(() => {
      this.playAnimation(this.MOTION_IMAGES);
    }, 250);
  }
}
