class PoisonBar extends DrawableObject {
  POISON_BAR_IMAGES = [
    'img/4. Marcadores/orange/0_ copia.png',
    'img/4. Marcadores/orange/20_ copia.png',
    'img/4. Marcadores/orange/40_ copia.png',
    'img/4. Marcadores/orange/60_ copia.png',
    'img/4. Marcadores/orange/80_ copia.png',
    'img/4. Marcadores/orange/100_ copia.png',
  ];

  constructor() {
    super();
    this.loadImagesForMotion(this.POISON_BAR_IMAGES);
    this.position_x = 500;
    this.position_y = 0;
    this.height = 40;
    this.width = 220;
    this.setPercentage(0, this.POISON_BAR_IMAGES);
  }
}
