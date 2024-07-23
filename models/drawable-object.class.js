class DrawableObject {
  /**
   * Represents a drawable object in the game.
   * This is a base class that provides common properties and methods
   * for objects that can be drawn on the canvas.
   */
  position_x = 150;
  position_y = 300;
  height;
  width;
  img;
  motion = {};
  currentMotionImage = 0;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  percentage = 100;

  /**
   * Loads an image from the specified path and assigns it to the `img` property.
   * @param {string} path - The file path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads images for motion animations from an array of paths and stores them in the `motion` property.
   * Each path in the array corresponds to an image used for animation.
   * @param {string[]} array - An array of image file paths.
   */
  loadImagesForMotion(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.motion[path] = img;
    });
  }

  /**
   * Draws the current image on the provided canvas rendering context (`ctx`).
   * The image is drawn at the position specified by `position_x` and `position_y`,
   * and with the dimensions specified by `width` and `height`.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position_x,
      this.position_y,
      this.width,
      this.height
    );
  }

  /**
   * Draws a collision border around the object on the provided canvas rendering context (`ctx`),
   * using a red line. The border takes into account the object's offset.
   * The border is only drawn for specific object types.
   * Used to make the collisiondetection better.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
  drawCollisionBorderWithOffset(ctx) {
    if (
      this instanceof Character ||
      this instanceof PufferFish_Green ||
      this instanceof PufferFish_Red ||
      this instanceof PufferFish_Orange ||
      this instanceof JellyFish_Green ||
      this instanceof JellyFish_Pink ||
      this instanceof JellyFish_Yellow ||
      this instanceof JellyFish_Purple ||
      this instanceof Endboss ||
      this instanceof Coin ||
      this instanceof PoisonBottle ||
      this instanceof ThrowableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = '1';
      ctx.strokeStyle = 'red';
      ctx.rect(
        this.position_x + this.offset.left,
        this.position_y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  /**
   * Plays an animation by cycling through the provided array of image paths.
   * The current image is set based on the `currentMotionImage` index,
   * and the `currentMotionImage` counter is incremented.
   * @param {string[]} imageArray - An array of image file paths used for animation.
   */
  playAnimation(imageArray) {
    let imageIndex = this.currentMotionImage % imageArray.length;
    let path = imageArray[imageIndex];
    this.img = this.motion[path];
    this.currentMotionImage++;
  }

  /**
   * Sets the image based on a percentage value from the provided array of image paths.
   * The `percentage` determines which image to select from the array.
   * @param {number} percentage - The percentage value used to determine the image.
   * @param {string[]} imageArray - An array of image file paths.
   */
  setPercentage(percentage, imageArray) {
    this.percentage = percentage;
    let imagePath = imageArray[this.setImageForPercentage()];
    this.img = this.motion[imagePath];
  }

  /**
   * Determines the index of the image to use based on the `percentage` value.
   * @returns {number} - The index of the image in the `imageArray` based on the `percentage`.
   */
  setImageForPercentage() {
    if (this.percentage == 100) return 5;
    if (this.percentage < 100 && this.percentage >= 80) return 4;
    if (this.percentage < 80 && this.percentage >= 60) return 3;
    if (this.percentage < 60 && this.percentage >= 40) return 2;
    if (this.percentage < 40 && this.percentage > 0) return 1;
    if (this.percentage <= 0) return 0;
  }
}
