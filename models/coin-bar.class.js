class Coinbar extends DrawableObject {
  COIN_BAR_IMAGES = [
    "img/4. Marcadores/orange/0_  copia 2.png",
    "img/4. Marcadores/orange/20_  copia.png",
    "img/4. Marcadores/orange/40_  copia 2.png",
    "img/4. Marcadores/orange/60_  copia 2.png",
    "img/4. Marcadores/orange/80_  copia 2.png",
    "img/4. Marcadores/orange/100_ copia 2.png",
  ];

  constructor() {
    super();
    this.loadImagesForMotion(this.COIN_BAR_IMAGES);
    this.position_x = 250;
    this.position_y = 0;
    this.height = 40;
    this.width = 180;
    this.setPercentage(0, this.COIN_BAR_IMAGES);
  }
}
