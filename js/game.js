let canvas;
let world;
let keyboard = new Keyboard();
let assets = new Assets();
let audios = new Audios();
let fullscreen = false;
let gameStarted = false;
let intervalIds = [];
let timeoutIds = [];
let isInfoOpen = false;
let isOverlayShown = false;
let isStopButtonShown = false;

/**
 * Initializes the game canvas and world, and sets the initial audio volume.
*/
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, assets, audios);
  let sliderValue = document.getElementById("slider").value;
  setAudioVolume(sliderValue);
}

/**
 * Initializes all event listeners for the application.
 * This includes listeners for click events, window resize/orientation changes, touch keys, and buttons.
 */
function initListeners() {
  initializeClickListener();
  initializeWindowListener();
  initializeTouchKeys();
  initializeButtons();
}

/**
 * Starts the game by toggling the start screen, showing the stop button, generating the level, and initializing touch keys and buttons.
 */
function startGame() {
  toggleStartScreen();
  showStopGameButton();
  generateLevel();
}

/**
 * Stops the game by clearing intervals and timeouts, pausing audio, hiding the stop button, and clearing the canvas.
 */
function stopGame() {
  intervalIds.forEach((id) => clearInterval(id));
  timeoutIds.forEach((id) => clearTimeout(id));
  world.audios.backgroundMusic.pause();
  world.audios.endbossBackgroundMusic.pause();
  hideStopGameButton();
  world.clearCanvas();
}

/**
 * Restarts the game by stopping it, toggling the start screen, and hiding any overlays.
 */
function restartGame() {
  stopGame();
  toggleStartScreen();
  hideOverlay();
}

/**
 * Shows an overlay based on the provided condition ('win' or 'loose').
 * @param {string} condition - The condition to determine which overlay to show ('win' or 'loose').
 */
function showOverlay(condition) {
  let overlay;
  if (condition === "win") {
    overlay = document.getElementById("winOverlay");
    overlay.classList.remove("d-none");
    isOverlayShown = true;
  } else if (condition === "loose") {
    overlay = document.getElementById("looseOverlay");
    overlay.classList.remove("d-none");
    isOverlayShown = true;
  }
}

/**
 * Hides any visible overlays.
 */
function hideOverlay() {
  if (isOverlayShown) {
    document.querySelectorAll(".overlay").forEach((overlay) => {
      overlay.classList.add("d-none");
    });
    isOverlayShown = false;
  }
}

/**
 * Toggles the visibility of the start screen.
 */
function toggleStartScreen() {
  document.getElementById("startScreen").classList.toggle("d-none");
}

/**
 * Shows the stop game button.
 */
function showStopGameButton() {
  document.getElementById("stopGameButton").classList.remove("d-none");
  isStopButtonShown = true;
}

/**
 * Hides the stop game button.
 */
function hideStopGameButton() {
  document.getElementById("stopGameButton").classList.add("d-none");
  isStopButtonShown = false;
}

/**
 * Sets an interval and stores its ID to allow for later clearing.
 * @param {Function} fn - The function to execute at each interval.
 * @param {number} time - The interval time in milliseconds.
 * @returns {number} The interval ID.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  return id;
}

/**
 * Sets a timeout and stores its ID to allow for later clearing.
 * @param {Function} fn - The function to execute after the timeout.
 * @param {number} time - The timeout time in milliseconds.
 * @returns {number} The timeout ID.
 */
function setStoppableTimeout(fn, time) {
  let id = setTimeout(fn, time);
  timeoutIds.push(id);
  return id;
}

/**
 * Toggles the visibility of the sound slider.
 * Prevents the click event from propagating to the document.
 * @param {Event} event - The click event.
 */
function toggleSoundSlider(event) {
  event.stopPropagation(); // Prevents the click event from propagating to the document
  let slider = document.getElementById("volumeSlider");
  slider.classList.toggle("invisible");
}

/**
 * Sets the audio volume based on the provided value and updates the displayed volume value.
 * @param {number} value - The volume value (0-100).
 */
function setAudioVolume(value) {
  let volume = value / 100;
  audios.setVolume(volume);
  document.getElementById("sliderValue").innerText = value;
}

/**
 * Toggles fullscreen mode for the canvas and updates the fullscreen icon.
 */
function toggleFullscreen() {
  let canvas = document.getElementById("canvas");
  let canvasContainer = document.getElementById("canvasContainer");
  let icon = document.getElementById("resizeButton");
  if (canvas.classList.contains("fullscreen")) {
    canvas.classList.remove("fullscreen");
    canvasContainer.classList.remove("fullscreen");
    fullscreen = false;
    icon.src = "img/6.Botones/Full Screen/fullscreen-icon.png";
  } else {
    canvas.classList.add("fullscreen");
    canvasContainer.classList.add("fullscreen");
    fullscreen = true;
    icon.src = "img/6.Botones/Full Screen/fullscreen-exit-icon.png";
  }
}

/**
 * Toggles the visibility of the information screen.
 */
function toggleInfo() {
  if (isInfoOpen) {
    document.getElementById("info").classList.add("d-none");
    document.getElementById("startScreen").classList.remove("d-none");
    document.getElementById("canvas").classList.remove("border-radius-left-0");
    isInfoOpen = false;
  } else {
    document.getElementById("info").classList.remove("d-none");
    document.getElementById("startScreen").classList.add("d-none");
    document.getElementById("canvas").classList.add("border-radius-left-0");
    isInfoOpen = true;
  }
}

/**
 * Checks the display size of the device and shows an overlay if the device is in portrait orientation.
 * The overlay is hidden if the device is in landscape orientation.
 */
function checkDeviceDisplaySize() {
  let overlay = document.getElementById("turnDeviceOverlay");
  if (window.innerHeight > window.innerWidth) {
    overlay.classList.remove("d-none");
  } else {
    overlay.classList.add("d-none");
  }
}

/**
 * Closes the sound slider if it is open and the click is outside of the slider and mute button.
 * @param {Event} event - The click event.
 */
function initializeClickListener() {
  document.addEventListener("click", function (event) {
    let slider = document.getElementById("volumeSlider");
    let muteButton = document.getElementById("muteButton");
    if (
      !slider.classList.contains("invisible") &&
      !slider.contains(event.target) &&
      event.target !== muteButton
    ) {
      slider.classList.add("invisible");
    }
  });
}

// Add event listener to check device display size on window resize
// Add event listener to check device display size on orientation change
function initializeWindowListener() {
  window.addEventListener("resize", checkDeviceDisplaySize);
  window.addEventListener("orientationchange", checkDeviceDisplaySize);
}

/**
 * Initializes touch key event listeners for game controls.
 */
function initializeTouchKeys() {
  document.getElementById("up").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });

  document.getElementById("down").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.DOWN = true;
  });

  document.getElementById("left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById("f").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.F = true;
  });

  document.getElementById("space").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById("up").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });

  document.getElementById("down").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.DOWN = false;
  });

  document.getElementById("left").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("f").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.F = false;
  });

  document.getElementById("space").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
}

/**
 * Initializes keyboard button event listeners for game controls.
 */
function initializeButtons() {
  window.addEventListener("keydown", (event) => {
    if (event.keyCode == 40 || event.keyCode == 83) {
      keyboard.DOWN = true;
    }

    if (event.keyCode == 39 || event.keyCode == 68) {
      keyboard.RIGHT = true;
    }

    if (event.keyCode == 38 || event.keyCode == 87) {
      keyboard.UP = true;
    }

    if (event.keyCode == 37 || event.keyCode == 65) {
      keyboard.LEFT = true;
    }

    if (event.keyCode == 32) {
      keyboard.SPACE = true;
    }

    if (event.keyCode == 70) {
      keyboard.F = true;
    }

    if (event.keyCode == 27 && fullscreen) {
      toggleFullscreen();
    }
  });

  window.addEventListener("keyup", (event) => {
    if (event.keyCode == 40 || event.keyCode == 83) {
      keyboard.DOWN = false;
    }

    if (event.keyCode == 39 || event.keyCode == 68) {
      keyboard.RIGHT = false;
    }

    if (event.keyCode == 38 || event.keyCode == 87) {
      keyboard.UP = false;
    }

    if (event.keyCode == 37 || event.keyCode == 65) {
      keyboard.LEFT = false;
    }

    if (event.keyCode == 32) {
      keyboard.SPACE = false;
    }

    if (event.keyCode == 70) {
      keyboard.F = false;
    }
  });
}
