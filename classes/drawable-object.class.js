class DrawableObject {
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

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImagesForMotion(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.motion[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position_x,
      this.position_y,
      this.width,
      this.height
    );
  }

  drawCollisionBorderWithOffset(ctx) {
    if (
      this instanceof Character ||
      this instanceof PufferFish ||
      this instanceof Endboss ||
      this instanceof Coin
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

  playAnimation(imageArray) {
    let imageIndex = this.currentMotionImage % imageArray.length;
    let path = imageArray[imageIndex];
    this.img = this.motion[path];
    this.currentMotionImage++;
  }


  setPercentage(percentage, imageArray) {
    this.percentage = percentage;
    let imagePath = imageArray[this.setImageForPercentage()];
    this.img = this.motion[imagePath];
  }

  setImageForPercentage() {
    if(this.percentage == 100)
        return 5
    if(this.percentage < 100 && this.percentage >=80)
        return 4
    if(this.percentage < 80 && this.percentage >=60)
        return 3
    if(this.percentage < 60 && this.percentage >=40)
        return 2
    if(this.percentage < 40 && this.percentage >0)
        return 1
    if(this.percentage <= 0)
        return 0
}


}
