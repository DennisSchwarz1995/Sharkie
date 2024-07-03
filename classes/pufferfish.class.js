class PufferFish extends MovableObject {
  height = 60;
  width = 50;
  MOTION_IMAGES = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png",
  ];
  offset = {
    top: 0,
    bottom: 12,
    left: 0,
    right: 0
  }

    
  constructor() {
    super().loadImage(
      "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png"
    );
    this.position_x = Math.random() * (100, 300) + 300;
    this.position_y = 400;
    this.speed_x = 0.15 + Math.random() * 0.25
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.animatePufferFish();
  }

  animatePufferFish() {
    setInterval(() => {
      this.swimLeft();
    }, 1000 / 60);
    
    setInterval(() => {
      this.playAnimation(this.MOTION_IMAGES);
    }, 150);
  }
}
