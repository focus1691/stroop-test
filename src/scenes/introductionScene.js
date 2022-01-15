import psychotechnologyVideo from '../video/welcome.mp4';

export default class introductionScene extends Phaser.Scene {
  constructor() {
    super('introduction');
  }
  preload() {
    this.load.video('psychotechnology', NODE_ENV === 'development' ? psychotechnologyVideo : 'https://www.psychotechnology.com/assets/videos/welcome.mp4', 'loadeddata', false, false);
  }
  create() {
    try {
      var vid = this.add.video(this.game.config.width / 2, this.game.config.height / 2, 'psychotechnology');
      vid.setMute(true);
      vid.setDisplaySize(this.game.config.width, this.game.config.height);
  
      vid.play(false);
  
      // Prevents video freeze when game is out of focus (i.e. user changes tab on the browser)
      vid.setPaused(false);
      vid.on('complete', this.onComplete, this);
    } catch (error) {
      console.log(error);
      this.onComplete();
    }
  }
  onComplete() {
    this.scene.start('preloaderScene');
  }
}
