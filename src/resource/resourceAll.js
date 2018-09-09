export function LoadResources(scene){
  scene.load.image('coin', 'assets/coinGold.png');
  scene.load.atlas('player', 'assets/player.png', 'assets/player.json');

  scene.load.tilemapTiledJSON('map', 'assets/tilemap/map/test2.json');
  scene.load.spritesheet('basic', 'assets/tilemap/texture/basic.png', {frameWidth: 32, frameHeight: 32});

  scene.load.spritesheet('playerDino', 'assets/wizard_dino.png', {
    frameWidth: 25,
    frameHeight: 25,
    spacing: 0
  });
}
