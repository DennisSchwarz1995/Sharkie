let canvas;
let world;
let keyboard = new Keyboard();
let assets = new Assets();
let audios;
let mute = true;
let fullscreen = false;
let gameStarted = false;
let intervalIds = [];
let isControlInfoOpen = false;

function init() {
  canvas = document.getElementById("canvas");
  audios = new Audios();
  world = new World(canvas, keyboard, assets, audios);
}

function startGame() {
  generateLevel();
  world.level = level1;
  world.drawObjects();
  world.setWorld();
  world.checkGameState();
  // world.playBackgroundMusic();
  hideStartScreen();
}

function hideStartScreen() {
  document.getElementById("startScreen").classList.add("d-none");
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  return id;
}

function toggleSoundSlider() {
  let slider = document.getElementById("volumeSlider");
  slider.classList.toggle("d-none");
}

function setAudioVolume(value) {
  let volume = value / 100;
  audios.setVolume(volume); 
  document.getElementById('sliderValue').innerText = value;
}

function toggleFullscreen() {
  let canvas = document.getElementById("canvas");
  let icon = document.getElementById("resizeButton");
  if (canvas.classList.contains("fullscreen")) {
    canvas.classList.remove("fullscreen");
    fullscreen = false;
    icon.src = "img/6.Botones/Full Screen/fullscreen-icon.png";
  } else {
    canvas.classList.add("fullscreen");
    fullscreen = true;
    icon.src = "img/6.Botones/Full Screen/fullscreen-exit-icon.png";
  }
}

function toggleControlInfo() {
  if (isControlInfoOpen) {
    document.getElementById("controls").classList.add("d-none");
    document.getElementById("startScreen").classList.remove("d-none");
    isControlInfoOpen = false;
  } else {
    document.getElementById("controls").classList.remove("d-none");
    document.getElementById("startScreen").classList.add("d-none");
    isControlInfoOpen = true;
  }
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

  if (event.keyCode == 70) {
    keyboard.F = true;
  }

  if (event.keyCode == 27 && fullscreen) {
    toggleFullscreen();
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

  if (event.keyCode == 70) {
    keyboard.F = false;
  }
});

// function stopGame() {
//   console.log(intervalIds)
//   intervalIds.forEach(id => clearInterval(id));

// }
