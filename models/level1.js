let level1;

/**
 * Generates a new level with various game objects and background elements.
 *
 * This function initializes a new level with the following elements:
 * - **PufferFish**: Different types of PufferFish (Red, Green, Orange) positioned at specified x-coordinates.
 * - **JellyFish**: Different types of JellyFish (Green, Purple, Pink, Yellow) positioned at specified x and y-coordinates.
 * - **Endboss**: An instance of the Endboss.
 * - **Background Objects**: A sequence of background layers (Water and other layers) at various x-coordinates to create a scrolling effect.
 * - **Light**: An instance of Light.
 * - **Coins**: A set of Coin objects positioned at specified x-coordinates.
 * - **Poison Bottles**: A set of PoisonBottle objects positioned at specified x-coordinates.
 *
 * The level layout is designed to provide a diverse and challenging environment for the player,
 * with various types of enemies, collectibles, and background layers.
 */
function generateLevel() {
  level1 = new Level(
    [
      new PufferFish_Red(575),
      new PufferFish_Green(725),
      new PufferFish_Orange(975),
      new PufferFish_Red(1125),
      new PufferFish_Green(1375),
      new PufferFish_Orange(1525),
    ],

    [
      new JellyFish_Green(650, 125),
      new JellyFish_Purple(850, 300),
      new JellyFish_Pink(1050, 225),
      new JellyFish_Yellow(1250, 400),
      new JellyFish_Green(1450, 125),
      new JellyFish_Purple(1650, 300),
      new JellyFish_Pink(1850, 225),
      new JellyFish_Yellow(2050, 400),
    ],

    [new Endboss()],

    [
      new Water('img/3. Background/Layers/5. Water/D2.png', -720),
      new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', -720),
      new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', -720),
      new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', -720),

      new Water('img/3. Background/Layers/5. Water/D1.png', 0),
      new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
      new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
      new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),
      new Water('img/3. Background/Layers/5. Water/D2.png', 720),
      new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720),
      new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720),
      new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720),

      new Water('img/3. Background/Layers/5. Water/D1.png', 1440),
      new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 1440),
      new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 1440),
      new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 1440),
      new Water('img/3. Background/Layers/5. Water/D2.png', 2160),
      new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 2160),
      new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 2160),
      new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 2160),

      new Water('img/3. Background/Layers/5. Water/D1.png', 2880),
      new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 2880),
      new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 2880),
      new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 2880),
      new Water('img/3. Background/Layers/5. Water/D2.png', 3600),
      new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 3600),
      new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 3600),
      new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 3600),
    ],

    [
      new Light(0),
      new Light(720),
      new Light(1440),
      new Light(2160),
      new Light(2880),
      new Light(3600),
    ],

    [
      new Coin(423),
      new Coin(619),
      new Coin(741),
      new Coin(895),
      new Coin(1174),
      new Coin(1268),
      new Coin(1401),
      new Coin(1693),
      new Coin(1817),
      new Coin(2042),
      new Coin(2201),
      new Coin(2365),
    ],

    [
      new PoisonBottle(450),
      new PoisonBottle(900),
      new PoisonBottle(1350),
      new PoisonBottle(1800),
      new PoisonBottle(2250),
    ]
  );
}
