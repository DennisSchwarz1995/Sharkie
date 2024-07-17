class EndbossStatusbar extends DrawableObject {
  LIFE_BAR_IMAGES = [
    "img/4. Marcadores/orange/0_  copia.png",
    "img/4. Marcadores/orange/20_ copia 2.png",
    "img/4. Marcadores/orange/40_  copia.png",
    "img/4. Marcadores/orange/60_  copia.png",
    "img/4. Marcadores/orange/80_  copia.png",
    "img/4. Marcadores/orange/100_  copia.png",
  ];

  world;

  constructor(world) {
    super();
    this.loadImagesForMotion(this.LIFE_BAR_IMAGES);
    this.setPercentage(100, this.LIFE_BAR_IMAGES);
    this.world = world;
    this.height = 40;
    this.width = 180;
    this.updateStatusBarPosition();
  }

  updateStatusBarPosition() {
    setInterval(() => {
      this.position_x = this.world.endboss.position_x + this.width / 2;
      this.position_y =
        this.world.endboss.position_y +
        this.world.endboss.offset.top -
        this.height;
    }, 1000 / 60);
  }
}
