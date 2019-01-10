import 'phaser';

import { SimpleScene } from './scenes/simple-scene';
import { DialogBox } from './scenes/dialogScene';
import { platformerPhysics} from './physics/physics';
import { game } from './objects/source';

var player;
var cursors;
var groundLayer, coinLayer;
var text;

const gameConfig = {
	width: 800,
	height: 600,
	pixelArt: true,
	roundPixels: true,
	parent: 'content',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 2500},
			debug: true
		}
	},
	scene: [SimpleScene, DialogBox],
	render: {
		pixelArt: true,
		roundPixels: true
	}
}
new Phaser.Game(gameConfig);
