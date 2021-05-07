import Phaser from 'phaser';

export default class WordContainer extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);

    this.word = this.scene.add.dynamicBitmapText(0, 0, 'desyrel', 'Color', 24);
    this.add(this.word);

    this.setSize(this.word.width * 2, this.word.height * 2);

    this.setInteractive();

    this.scene.input.setDraggable(this);

    this.input.enabled = false;

    this.scene.add.existing(this);
  }
  setColor(config) {
    this.name = config.text.toLowerCase();
    this.word.setText(config.text);

    this.setSize(this.word.width * 2, this.word.height * 2);
    this.word.setPosition(-(this.word.width / 2), -(this.word.height / 2));
    this.setPosition(this.x + this.word.width / 2, this.y + this.word.height / 2);

    this.word.tint = config.code;
    this.colorName = config.color;
  }
}
