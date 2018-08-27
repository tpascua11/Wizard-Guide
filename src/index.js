import 'phaser';

import { SimpleScene } from './scenes/simple-scene';
import { platformerPhysics} from './physics/physics';
import { game } from './objects/source';

const gameConfig = {
  width: 800,
  height: 600,
	physics: platformerPhysics,
  scene: SimpleScene,
	render: {
		pixelArt: true,
		roundPixels: true
	}
}

new Phaser.Game(gameConfig);

