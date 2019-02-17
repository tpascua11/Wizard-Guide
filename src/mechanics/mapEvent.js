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
    //this.setScale(3,3);

    //this.is_overlaping = false;
    console.log("see this", this);
    //this.setActive(false);
    //this.disableBody();
    this.eventLimit = 0;
  }

  overlapProcess(scene){
    this.is_overlaping = true;
    if(this.is_overlaping){
      scene.bubble.trigger();
    }
  }

  overlapUpdate(scene){
		if(this.eventLimit == 0){
			this.eventLimit = 2;
			//this.bubble.trigger();
			console.log("new only once");
				let config = {
				followSprite: scene.player,
				key: "Interact",
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

  process(scene){
    this.is_overlaping = false;
    this.bubbleAlert.clear();
    //scene.bubble.clear();
  }

  /*
  preUpdate(){
    console.log("IM UPDATING");
		if(this.testEvent.eventLimit == 0){
			//this.bubble.clear();
      //this.disableBody(true,true);
		}
		else{
			this.testEvent.eventLimit--;
		}
  }
  */
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

  updateZ(){
		if(this.eventLimit == 0){
			//this.bubbleAlert.clear();
		}
		else{
			this.eventLimit--;
		}
    /*
    if(this.testEvent.eventLimit == 0){
      //this.bubble.clear();
      //this.disableBody(true,true);
    }
    else{
      this.testEvent.eventLimit--;
    }*/
  }

};


export function SetupMapEvent(scene){
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
