export function AnimationSet(scene){

  /**
   * Slime
   */
  scene.anims.create({
    key: 'slimeDo',
    frames: scene.anims.generateFrameNames('mainAtlas', { prefix: 'SlimeIdle', start: 0, end: 5}),
    frameRate: 5,
    repeat: -1, onUpdate: scene.test
  });
  scene.anims.create({
    key: 'slimeJump',
    frames: scene.anims.generateFrameNames('mainAtlas', { prefix: 'SlimeJump', start: 0, end: 7}),
    frameRate: 10,
    repeat: 1,
    onUpdate: function(){ console.log("cool")}
  });
  scene.anims.create({
    key: 'goblinStabber',
    frames: scene.anims.generateFrameNames('mainAtlas', { prefix: 'goblinDagger', start: 0, end: 5}),
    frameRate: 10,
    repeat: -1
  });

  /**
   * Player
   */
  /* Save This For Example! get Sprite Sheet From Atlas
    this.textures.addSpriteSheetFromAtlas(
        'testPlayer',
        {
            atlas: 'npcList',
            frame: 'wizard_dino',
            frameWidth: 25,
            frameHeight: 25
        }
    );*/
    scene.textures.addSpriteSheetFromAtlas(
      'healthbarsheet',
      {
        atlas: 'mainAtlas',
        frame: 'health_bar_face',
        frameWidth: 49,
        frameHeight: 11
      }
    );

    scene.textures.addSpriteSheetFromAtlas(
      'manabarsheet',
      {
        atlas: 'mainAtlas',
        frame: 'manabar',
        frameWidth: 81,
        frameHeight: 9
      }
    );

}
