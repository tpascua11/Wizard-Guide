/*
 Building Block Of Everything (Player, NPCs, Items, Platform)
 */

export default class MapEvent extends Phaser.GameObjects.Sprite {
  /**
   * Intialization
   */
  constructor(config) {
    console.log("new map config", config);
    super(config.scene, config.x, config.y - 16, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.body.allowGravity = false;
    this.eventLimit = 0;
  }

  overlapUpdate(scene){
		if(this.eventLimit == 0){
      console.log("REPLACE CURRENT EVENT ", this);
			this.eventLimit = 2;
			//this.bubble.trigger();
			console.log("new only once");
				let config = {
				followSprite: scene.player,
				key: "signPostQuestion",
				scene,
				alignX: -40 ,
				alignY: 10
			};

			this.bubbleAlert = scene.bubbleAlertGroup.getFirstDead();
			this.bubbleAlert.trigger(config);
      this.eventIsActive = true;
			//this.newBubble.clear();
		}
    else {
			this.eventLimit = 2;
		}

  }

  update(){
    if(!this.eventIsActive) return;

		if(this.eventLimit == 0){
      this.eventIsActive = false;
			this.bubbleAlert.clear();
		}
		else{
			this.eventLimit--;
		}
  }


};

/*
export function SetupMapEvent(scene){
  console.log("TESTING SETUP MAP EVENT");
  console.log("TESTING SETUP MAP EVENT");
  console.log("TESTING SETUP MAP EVENT");
  console.log("TESTING SETUP MAP EVENT");
  let maxBubbles = 1;

  let config = {
    x: 100,
    y: 200,
    key: "attackDebug",
    alignX: 0,
    alignY: 0,
    followSprite: null,
    scene,
  };

  //scene.= scene.add.group();
  //scene.bubbleAlertGroup.add(new BubbleAlert(config));
  for(var i = 0; i < maxBubbles; i++){
    scene.newBubble = new BubbleAlert(config);
    scene.bubbleAlertGroup.add(scene.newBubble);
  }
  scene.bubbleAlertGroup.runChildUpdate = true;

}
*/
