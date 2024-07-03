class Endboss extends MovableObject {
  height = 400;
  width = 400;
  position_y = 0;
  isBossIntroduced = false;

  MOTION_IMAGES = [
    "img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];

  INTRODUCE_IMAGES = [
    "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];

  offset = {
    top: 140,
    bottom: 60,
    left: 10,
    right: 10
  }

  constructor() {
    super().loadImage(this.INTRODUCE_IMAGES[0]);
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.loadImagesForMotion(this.INTRODUCE_IMAGES);
    this.position_x = 2000;
    this.animateEndboss();
  }

  animateEndboss() {
    let i = 0;
    setInterval(() => {
      if (i < 10) {
        this.playAnimation(this.INTRODUCE_IMAGES);
      } else {
        this.playAnimation(this.MOTION_IMAGES);
      }
      i++;
      this.isBossIntroduced = true;
    }, 200);
  }
}
