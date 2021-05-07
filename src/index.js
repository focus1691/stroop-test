import Phaser from 'phaser';
import BBCodeTextPlugin from 'phaser3-rex-plugins/plugins/bbcodetext-plugin.js';
//* Scenes
import preloader from './scenes/preloader';
import playInstructions from './scenes/instructionsScene';
import playGame from './scenes/playGameScene';
import playFeedback from './scenes/feedbackScene';
//* CSS
import './css/style.css';

const roundHalf = (num) => Math.round(num * 2) / 2;
const DPR = window.devicePixelRatio;

const isMobile = () => Math.min(screen.width, screen.height) <= 480;
export const WIDTH = 640 * (isMobile() ? DPR : 4);
export const HEIGHT = 360 * (isMobile() ? DPR : 4);

// will be 1, 1.5, 2, 2.5, 3, 3.5 or 4
export const assetsDPR = roundHalf(Math.min(Math.max(WIDTH / 640, 1), 4));

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth);
const DEFAULT_HEIGHT = 720; // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;

var config = {
  type: Phaser.AUTO,
  parent: 'stroop-test',
title: "Stroop Test",
url: "https://localhost/psychotechnology/stroop-test/",
version: "1.0.0",
  width: 800,
  height: 600,
  scale: {
      mode: Phaser.DOM.FIT,
      autoCenter: Phaser.DOM.CENTER_BOTH
  },
  plugins: {
    global: [
      {
        key: 'rexBBCodeTextPlugin',
        plugin: BBCodeTextPlugin,
        start: true,
      },
      // ...
    ],
  },
  scene: [preloader, playInstructions, playGame, playFeedback]
};

var game = new Phaser.Game(config);
