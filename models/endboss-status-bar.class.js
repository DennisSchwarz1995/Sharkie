class EndbossStatusbar extends DrawableObject {
  /**
   * Creates an instance of `EndbossStatusbar`.
   * @param {World} world - The game world object that contains the status bar.
   */
  LIFE_BAR_IMAGES = [
    'img/4. Marcadores/orange/0_  copia.png',
    'img/4. Marcadores/orange/20_ copia 2.png',
    'img/4. Marcadores/orange/40_  copia.png',
    'img/4. Marcadores/orange/60_  copia.png',
    'img/4. Marcadores/orange/80_  copia.png',
    'img/4. Marcadores/orange/100_  copia.png',
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
  /**
   * Updates the position of the status bar relative to the endboss's position.
   * The status bar's position is recalculated and set every frame (60 times per second).
   *
   * The new position is set such that the status bar is horizontally centered above the endboss,
   * with its bottom edge aligned with the endboss's top edge, minus the height of the status bar.
   */
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
