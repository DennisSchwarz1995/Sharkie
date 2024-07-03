let level1;

function generateLevel() {
  level1 = new Level(
    [
      new PufferFish_Red(375),
      new PufferFish_Green(625),
      new PufferFish_Orange(875),
      new PufferFish_Red(1025),
      new PufferFish_Green(1275),
      new PufferFish_Orange(1525),
    ],


    [
      new JellyFish_Green(450, 125),
      new JellyFish_Purple(650, 300),
      new JellyFish_Pink(850, 225),
      new JellyFish_Yellow(1050, 400),
      new JellyFish_Green(1250, 125),
      new JellyFish_Purple(1450, 300),
      new JellyFish_Pink(1650, 225),
      new JellyFish_Yellow(1850, 400),
    ],

    [
      new Endboss()
    ],



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
    ],

    [new Light()],

    [
      new Coin(440, 300),
      new Coin(490, 260),
      new Coin(560, 220),
      new Coin(620, 220),
      new Coin(680, 260),
      new Coin(730, 300),
    ]
  );
}
