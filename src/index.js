/*const messageEl = document.createElement('div');
messageEl.textContent = 'I was put here by JavaScript!';
document.body.appendChild(messageEl);
*/

import 'phaser';

import { SimpleScene } from './scenes/simple-scene';

const gameConfig = {
  width: 680,
  height: 400,
  scene: SimpleScene
};

new Phaser.Game(gameConfig);

