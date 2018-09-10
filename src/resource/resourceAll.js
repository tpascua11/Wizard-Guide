export function LoadResources(scene){

  /**
   * Map
   */
  scene.load.image('coin', 'assets/coinGold.png');
  scene.load.tilemapTiledJSON('map', 'assets/tilemap/map/test2.json');
  scene.load.spritesheet('basic', 'assets/tilemap/texture/basic.png', {frameWidth: 32, frameHeight: 32});
  /**
   * Player
   */
  scene.load.atlas('player', 'assets/player.png', 'assets/player.json');
  scene.load.spritesheet('playerDino', 'assets/wizard_dino.png', {
    frameWidth: 25,
    frameHeight: 25,
    spacing: 0
  });
  /**
   * Monster
   */
  scene.load.spritesheet('goblinTemplate', 'assets/npc/monsters/Goblin.png', {
    frameWidth: 16,
    frameHeight: 16,
    spacing: 0
  });
  scene.load.spritesheet('slimeTemplate', 'assets/npc/monsters/Slime.png', {
    frameWidth: 16,
    frameHeight: 16,
    spacing: 0
  });



}
