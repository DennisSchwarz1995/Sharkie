class PufferFish_Orange extends AnimationObject {
  height = 70;
  width = 75;
  offset = {
    top: 4,
    bottom: 18,
    left: 0,
    right: 5,
  };
  directionInterval = 3000;
  transitionInterval = 4750;

  MOTION_IMAGES = [
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
  ];

  TRANSITION_IMAGES = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",
  ];

  PUFF_UP_IMAGES = [
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png",
  ];

  DEAD_IMAGES = [
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png'
  ];

  constructor(position_x) {
    super().loadImage(
      'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png'
    );
    this.position_x = position_x;
    this.position_y = Math.random() * 125 + 125;
    this.speed_x = 0.95 + Math.random() * 0.25;
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.loadImagesForMotion(this.TRANSITION_IMAGES);
    this.loadImagesForMotion(this.PUFF_UP_IMAGES);
    this.loadImagesForMotion(this.DEAD_IMAGES);
    this.animatePufferFish(this.directionInterval, this.transitionInterval);
  }
}
