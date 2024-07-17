class Endboss extends AnimationObject {
  height = 300;
  width = 300;
  position_y = 100;
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

  ATTACK_IMAGES = [
    "img/2.Enemy/3 Final Enemy/Attack/1.png",
    "img/2.Enemy/3 Final Enemy/Attack/2.png",
    "img/2.Enemy/3 Final Enemy/Attack/3.png",
    "img/2.Enemy/3 Final Enemy/Attack/4.png",
  ];

  HURT_IMAGES = [
    "img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];

  DEAD_IMAGES = [
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];

  offset = {
    top: 90,
    bottom: 60,
    left: 10,
    right: 10,
  };

  constructor() {
    super().loadImage(this.INTRODUCE_IMAGES[0]);
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.loadImagesForMotion(this.INTRODUCE_IMAGES);
    this.loadImagesForMotion(this.ATTACK_IMAGES);
    this.loadImagesForMotion(this.HURT_IMAGES);
    this.loadImagesForMotion(this.DEAD_IMAGES);
    this.direction_x = "left";
    this.direction_y = "up";
    this.position_x = 2800;
    this.checkEndbossIntroduction();
  }

  checkEndbossIntroduction() {
    let checkAppearance = setInterval(() => {
      if (this.shouldAppear()) {
        clearInterval(checkAppearance);
        this.animateEndbossIntroduction();
      }
    }, 100);
  }

  updateEndbossMovement() {
    if (this.position_x > world.character.position_x) {
      this.swimLeft();
      this.otherDirection = false;
    } else if (this.position_x < world.character.position_x) {
      this.swimRight();
      this.otherDirection = true;
    }
    if (this.position_y > world.character.position_y) {
      this.swimUp();
    } else if (this.position_y < world.character.position_y) {
      this.swimDown();
    }
  }

  shouldAppear() {
    return world.character.position_x >= 2400 && world.character.coins >= 100;
  }
}
