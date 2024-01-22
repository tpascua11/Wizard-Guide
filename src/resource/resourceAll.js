export function LoadResources(scene){
   scene.load.atlas('mainAtlas', 'assets/spritesheet.png', 'assets/sprites.json');
  /**
   * Map
   */
  scene.load.image('coin', 'assets/coinGold.png');
  scene.load.tilemapTiledJSON('map', 'assets/tilemap/map/TestGround2.json');
  scene.load.tilemapTiledJSON('TestingGround', 'assets/tilemap/map/Test3.json');
  scene.load.spritesheet('basic', 'assets/tilemap/texture/basic.png', {frameWidth: 32, frameHeight: 32});
  /**
   * Player
   */
  scene.load.spritesheet('playerDino', 'assets/player/player_dinosaur_spritesheet.png', {
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

  scene.load.spritesheet('attackDebug', 'assets/debug/collisionField.png', {
    frameWidth: 25,
    frameHeight: 25,
    spacing: 0
  });


  scene.load.image('SignPostQuestion', 'assets/npc/objects/SignPostQuestion.png');


/*
  scene.load.spritesheet('backgroundUI', 'assets/debug/blackbox.png', {
    frameWidth: 25,
    frameHeight: 25,
    spacing: 0
  });
  */

}
