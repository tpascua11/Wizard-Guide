import 'phaser';

import { SimpleScene } from 'ROOT/scenes/simple-scene';
import { MenuScene } from './scenes/dialogScene';
import { platformerPhysics} from './physics/physics';
//import { game } from './objects/source';

var player;
var cursors;
var groundLayer, coinLayer;
var text;

const gameConfig = {
	version: '0.0.4',
	canvasStyle: 'display: block, margin: 0 auto',
	width: 900,
	height: 640,
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
	scene: [SimpleScene, MenuScene],
	render: {
		pixelArt: true,
		roundPixels: true
	}
}

new Phaser.Game(gameConfig);
