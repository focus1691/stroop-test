export default class playFeedback extends Phaser.Scene {
  constructor() {
    super('playFeedback');
  }
  init(data) {
    this.results = data.results;
  }
  create() {
    this.make.image({ key: 'background', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });

    var title = `[color=red]S[color=green]t[color=yellow]r[color=blue]o[color=purple]o[color=red]p[color=yellow][color=green] T[color=yellow]e[color=blue]s[color=purple]t`;
    var bbcodetext = this.add.rexBBCodeText(this.cameras.main.width / 4, 40, title, {
      fontSize: '60px',
      wrap: {
        mode: 'char',
        width: 500,
      },
      underline: {
        color: '#000',
        thickness: 2,
        offset: 1,
      },
    });

    var lineOne = `[color=black]You took [b][u]${this.results[0]} seconds[/u][/b] to complete part one of the test.`;
    this.add.rexBBCodeText(this.cameras.main.width / 8, 150, lineOne, {
      fontSize: '17px',
      align: 'center',
      wrap: {
        mode: 'char',
        width: 600,
      },
      underline: {
        color: '#000',
        thickness: 2,
        offset: 1,
      },
    });

    var lineTwo = `[color=black]You took [b][u]${this.results[1]} seconds[/u][/b] to complete part two of the test.`;
    this.add.rexBBCodeText(this.cameras.main.width / 8, 190, lineTwo, {
      fontSize: '17px',
      align: 'center',
      wrap: {
        mode: 'char',
        width: 600,
      },
      underline: {
        color: '#000',
        thickness: 2,
        offset: 1,
      },
    });

    var lineThree = `[color=red]Did you have to stop sometimes to think about which word to drag? This it the Stroop Effect and you can learn more about it at PsychoTechnology.`;
    this.add.rexBBCodeText(this.cameras.main.width / 8, 230, lineThree, {
      fontSize: '17px',
      align: 'left',
      wrap: {
        mode: 'char',
        width: 600,
      },
      underline: {
        color: '#000',
        thickness: 2,
        offset: 1,
      },
    });
  }
}
