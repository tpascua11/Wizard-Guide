export default class BubbleAlert extends Phaser.GameObjects.Sprite {
  /**
   * Intialization
   */

  constructor(config) {
    super(config.scene, config.x, config.y - 16, config.key);
    //super({scene, x, y, key});

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.setScale(2);
    this.body.allowGravity = false;
    this.followSprite = config.scene.player;
    this.alignX = 0;
    this.alignY = 0;
    this.anims.play('slimeDo', true);

    this.clear();
  }

  trigger(config){
    this.alignX = config.alignX;
    this.alignY = config.alignY;
    this.setActive(true);
    this.visible = true;
    this.followSprite = config.followSprite;
    this.anims.play(config.key, true);
    this.anims.resume();
  }

  clear(){
    console.log("Stop");
    this.anims.pause();
    this.setActive(false);
    this.visible = false;
    this.active = false;
    this.followSprite = null;
  }

  update(){
    if(this.followSprite){
     // console.log("player x", this.followSprite.body.x);
      this.body.reset(
        this.followSprite.body.x - this.alignX,
        this.followSprite.body.y - this.alignY
      );
    }
  }

};


export function SetupBubbleGroup(scene){
  let maxBubbles = 10;

  let config = {
    x: 100,
    y: 200,
    key: "interactBubble",
    alignX: 0,
    alignY: 0,
    followSprite: null,
    scene,
  };

  scene.bubbleAlertGroup = scene.add.group();
  for(var i = 0; i < maxBubbles; i++){
    scene.newBubble = new BubbleAlert(config);
    scene.bubbleAlertGroup.add(scene.newBubble);
  }
  scene.bubbleAlertGroup.runChildUpdate = true;
}

