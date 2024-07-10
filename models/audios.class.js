class Audios {
  constructor() {
    this.backgroundMusic = new Audio('audio/background_music.mp3');
    this.collectCoin = new Audio('audio/collect_coin.mp3');
    this.collectBottle = new Audio('audio/collect_bottle.mp3');
    this.jellyfishShock = new Audio('audio/shock.mp3');
    this.characterSwim = new Audio('audio/swimming.mp3');
    this.characterFinSlap = new Audio('audio/fin_slap.mp3');
    this.gameOver = new Audio('audio/game_over.mp3');
    this.bubble = new Audio('audio/bubble_pop.mp3');
    this.finslap = new Audio('audio/fin_slap.mp3')

    this.allAudios = [
      this.backgroundMusic,
      this.collectCoin,
      this.collectBottle,
      this.jellyfishShock,
      this.characterSwim,
      this.characterFinSlap,
      this.gameOver,
      this.bubble,
      this.finslap
    ];
  }

  setVolume(volume) {
    this.allAudios.forEach((audio) => {
      audio.volume = volume;
    });
  }
}
