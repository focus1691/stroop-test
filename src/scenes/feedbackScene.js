import { WIDTH } from '..';

export default class playFeedback extends Phaser.Scene {
  constructor() {
    super('playFeedback');
  }
  init({ results }) {
    this.results = results || [0, 0];
  }
  create() {
    this.make.image({ key: 'background', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });

    var title = `[color=red]S[color=green]t[color=yellow]r[color=blue]o[color=purple]o[color=red]p[color=yellow][color=green] T[color=yellow]e[color=blue]s[color=purple]t`;
    this.add.rexBBCodeText(this.cameras.main.width / 4, 40, title, {
      fontSize: '4rem',
      fontFamily: 'Roboto',
      align: 'center',
      wrap: {
        mode: 'word',
        width: 600,
      },
      underline: {
        color: '#000',
        thickness: 2,
        offset: 1,
      },
    });

    const text1 = `[color=black]You took [b][u]${this.results[0]} seconds[/u][/b] to complete part one of the test.`;
    const line1 = this.add.rexBBCodeText(this.cameras.main.width / 8, 150, text1, {
      fontSize: '1.5rem',
      fontFamily: 'Roboto',
      align: 'center',
      wrap: {
        mode: 'word',
        width: 600,
      },
      underline: {
        color: '#000',
        thickness: 2,
        offset: 1,
      },
    });

    const text2 = `[color=black]You took [b][u]${this.results[1]} seconds[/u][/b] to complete part two of the test.`;
    const line2 = this.add.rexBBCodeText(this.cameras.main.width / 8, line1.y + line1.height * 1.5, text2, {
      fontSize: '1.5rem',
      fontFamily: 'Roboto',
      align: 'center',
      wrap: {
        mode: 'word',
        width: 600,
      },
      underline: {
        color: '#000',
        thickness: 2,
        offset: 1,
      },
    });

    var text3 = `[color=#731622]Did you have to stop sometimes to think about which word to drag? This it caused by the conflicting properties of the word colour and semantics. When muddled up, it takes more time to process them. This is termed the Stroop Effect.`;
    const line3 = this.add.rexBBCodeText(this.cameras.main.width / 8, line2.y + line2.height * 1.5, text3, {
      fontSize: '1.5rem',
      fontFamily: 'Roboto',
      align: 'center',
      align: 'left',
      wrap: {
        mode: 'word',
        width: 600,
      },
      underline: {
        color: '#000',
        thickness: 2,
        offset: 1,
      },
    });

    this.playBtn = this.make.image({
      x: 0,
      y: line3.y + line3.height * 1.5,
      key: 'play_button',
      scale: { x: 0.2, y: 0.2 },
    }).setInteractive();

    this.menuBtn = this.make.image({
      x: 0,
      y: line3.y + line3.height * 1.5,
      key: 'menu_button',
      scale: { x: 0.2, y: 0.2 },
    }).setInteractive();

    let initalOffset = WIDTH * 0.2 - this.menuBtn.width * 0.2 - this.playBtn.width * 0.2 - 5;

    this.playBtn.x = initalOffset;
    this.menuBtn.x = initalOffset + this.menuBtn.width * 0.2 + 5;

    this.playBtn.on('pointerup', this.handePlay, this);
    this.menuBtn.on('pointerup', this.handleMenu, this);
  }

  handleMenu() {
    this.scene.start('playInstructions', { mode: 1, results: [] });
  }

  handePlay() {
    this.scene.start('playGame', { mode: 1, results: [] });
  }
}
