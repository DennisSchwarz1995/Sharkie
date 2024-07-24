class StatusBar extends DrawableObject {
  /**
   * Creates an instance of `StatusBar`.
   * Initializes the status bar's properties, loads the images, and sets the initial percentage.
   */
  LIFE_BAR_IMAGES = [
    'img/4. Marcadores/orange/0_  copia.png',
    'img/4. Marcadores/orange/20_ copia 2.png',
    'img/4. Marcadores/orange/40_  copia.png',
    'img/4. Marcadores/orange/60_  copia.png',
    'img/4. Marcadores/orange/80_  copia.png',
    'img/4. Marcadores/orange/100_  copia.png',
  ];

  constructor() {
    super();
    this.loadImagesForMotion(this.LIFE_BAR_IMAGES);
    this.position_x = 0;
    this.position_y = 0;
    this.height = 40;
    this.width = 140;
    this.setPercentage(100, this.LIFE_BAR_IMAGES);
  }
}
