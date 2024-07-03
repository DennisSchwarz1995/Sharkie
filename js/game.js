let canvas;
let world;
let keyboard = new Keyboard();
let assets = new Assets();
let mute = true;
let fullscreen = false;
let gameStarted = false;
let intervalIds = [];



function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, assets);
}

function startGame() {
  generateLevel();
  world.level = level1;
  world.drawObjects();
  world.setWorld();
  world.checkGameState();
  hideStartScreen();
}

function hideStartScreen() {
  document.getElementById("startScreen").classList.add("d-none");
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (event.keyCode == 38) {
    keyboard.UP = true;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (event.keyCode == 83) {
    keyboard.DOWN = true;
  }

  if (event.keyCode == 68) {
    keyboard.RIGHT = true;
  }

  if (event.keyCode == 87) {
    keyboard.UP = true;
  }

  if (event.keyCode == 65) {
    keyboard.LEFT = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (event.keyCode == 38) {
    keyboard.UP = false;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (event.keyCode == 83) {
    keyboard.DOWN = false;
  }

  if (event.keyCode == 68) {
    keyboard.RIGHT = false;
  }

  if (event.keyCode == 87) {
    keyboard.UP = false;
  }

  if (event.keyCode == 65) {
    keyboard.LEFT = false;
  }
});

function toggleSound() {
  let muteButton = document.getElementById("muteButton");
  if (mute) {
    muteButton.textContent = "Enable Sound";
  } else {
    muteButton.textContent = "Mute Sound";
  }
  mute = !mute;
}

function toggleFullscreen() {
  let resizeButton = document.getElementById("resizeButton");
  if (fullscreen) {
    resizeButton.textContent = "Minimize";
  } else {
    resizeButton.textContent = "Fullscreen";
  }
  fullscreen = !fullscreen;
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  return id;
}

function stopGame() {
  console.log(intervalIds)
  intervalIds.forEach(id => clearInterval(id));
  
}


function toggleFullscreen() {
  let canvas = document.getElementById('canvas');
  if(canvas.classList.contains('fullscreen')) {
    canvas.classList.remove('fullscreen') 
  } else {
    canvas.classList.add('fullscreen')
  }
}
