class World {
  character = new Character();
  statusBar = new StatusBar();
  coinBar = new Coinbar();
  poisonBar = new PoisonBar();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.drawObjects();
    this.setWorld();
    this.checkCollision();
  }

  setWorld() {
    this.character.world = this;
  }

  drawObjects() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
   
    this.addObjectArraysToCanvas(this.level.backgroundObjects);
    this.addObjectArraysToCanvas(this.level.enemies);
    this.addObjectArraysToCanvas(this.level.light);
    this.addObjectArraysToCanvas(this.level.coins);
    
    this.addToCanvas(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.addToCanvas(this.statusBar);
    this.addToCanvas(this.coinBar);
    this.addToCanvas(this.poisonBar);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.drawObjects();
    });
  }

  addToCanvas(displayedObject) {
    if(displayedObject.otherDirection){
      this.rotateImageHorizontally(displayedObject)
    }
  
    displayedObject.draw(this.ctx);
    displayedObject.drawCollisionBorderWithOffset(this.ctx)

    if(displayedObject.otherDirection) {
      this.restoreImageRotation(displayedObject);
    }
  }

  addObjectArraysToCanvas(objects) {
    objects.forEach(object => {
      this.addToCanvas(object);
    });
  }

  rotateImageHorizontally(displayedObject) {
    this.ctx.save();
    this.ctx.translate(displayedObject.width, 0);
    this.ctx.scale(-1, 1);
    displayedObject.position_x = displayedObject.position_x * -1;
  }

  restoreImageRotation(displayedObject) {
    this.ctx.restore();
    displayedObject.position_x = displayedObject.position_x * -1;
  }

  checkCollision() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if(this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.hitpoints)
          console.log('Collision with Character', enemy, this.character.hitpoints)
        }
        this.level.coins.forEach((coin) => {
          if (this.character.isColliding(coin)) {
            console.log('Character has collision with', coin)
          }
        })
      });
    }, 1000)
  }
}
