class PufferFish_Green extends AnimationObject {
  /**
   * Creates an instance of `Pufferfish_Green`.
   * @param {number} position_x - The initial X position of the jellyfish.
   */
  height = 70;
  width = 75;
  offset = {
    top: 4,
    bottom: 18,
    left: 0,
    right: 5,
  };
  directionInterval = 2500;
  transitionInterval = 3500;

  MOTION_IMAGES = [
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
  ];

  TRANSITION_IMAGES = [
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
  ];

  PUFF_UP_IMAGES = [
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
    'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png',
  ];

  DEAD_IMAGES = [
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
    'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
  ];

  constructor(position_x) {
    super().loadImage(
      'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png'
    );
    this.position_x = position_x;
    this.position_y = 30 + Math.random() * (125 - 30);
    this.speed_x = 1.15 + Math.random() * 0.25;
    this.loadImagesForMotion(this.MOTION_IMAGES);
    this.loadImagesForMotion(this.TRANSITION_IMAGES);
    this.loadImagesForMotion(this.PUFF_UP_IMAGES);
    this.loadImagesForMotion(this.DEAD_IMAGES);
    this.animatePufferFish(this.directionInterval, this.transitionInterval);
  }

  /**
   * Starts an interval to toggle the direction of the puffer fish.
   * The direction is toggled based on the specified interval time.
   *
   * @param {number} directionInterval - The time (in milliseconds) between direction toggles.
   */
  startDirectionInterval(directionInterval) {
    this.pufferFishDirection = setStoppableInterval(() => {
      this.movingLeft = !this.movingLeft;
    }, directionInterval);
  }

  /**
   * Starts a timeout to trigger the transition of the puffer fish.
   * After the specified timeout period, the puffer fish transition is activated.
   *
   * @param {number} transitionInterval - The time (in milliseconds) before triggering the transition.
   */
  startTransitionTimeout(transitionInterval) {
    this.pufferFishTransition = setStoppableTimeout(() => {
      this.isTransitioning = true;
      this.animatePufferFishTransition();
    }, transitionInterval);
  }

  /**
   * Clears the direction and transition intervals.
   * This stops any ongoing intervals and timeouts related to the puffer fish's direction and transition.
   */
  clearDirectionAndTransitionInterval() {
    clearInterval(this.pufferFishDirection);
    clearTimeout(this.pufferFishTransition);
  }
}
