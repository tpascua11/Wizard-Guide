moveMenuSelector(x){
  this.targetMenu.selected = false;
  let newPositionX = this.currentPosition.x;
  let newPositionY = this.currentPosition.y;

  if(this.currentPosition.x + x >= this.currentMenuList.length){
    newPositionX = 0;
  }
  else if(this.currentPosition.x + x <= 0){
    newPositionX = this.currentMenuList.length-1;
  }
  else{
    newPositionX = this.currentPosition.x + x;
  }

  this.currentPosition.x = newPositionX;
  this.targetMenu = this.currentMenuList[newPositionX];
  this.targetMenu.selected = true;
  console.log(`%c Next Menu`, 'color: green', newPositionX);
}

moveMenuSelector(x){
  this.targetMenu.selected = false;
  let newPositionX = this.currentPosition.x;
  let newPositionY = this.currentPosition.y;

  if(this.currentPosition.x + x >= this.currentMenuList.length){
    newPositionX = 0;
  }
  else if(this.currentPosition.x + x <= 0){
    newPositionX = this.currentMenuList.length-1;
  }
  else{
    newPositionX = this.currentPosition.x + x;
  }

  if(this.currentPosition.y + y >= this.currentMenuList[this.currentPosition.x].length){
    if(x > 0){
      newPositionY = this.currentMenuList[this.currentPosition.x].length - 1;
    }
    else newPositionY = 0;
  }
  else if(this.currentPosition.y + y <= 0){
    newPositionY = this.currentMenuList[this.currentPosition.x].length - 1;
  }
  else{
    newPositionY = this.currentPosition.y + y;
  }

  this.currentPosition.x = newPositionX;
  this.currentPosition.y = newPositionY;
  this.targetMenu = this.currentMenuList[newPositionX, newPositionY];
  this.targetMenu.selected = true;
  console.log(`%c Next Menu`, 'color: green', newPositionX, newPositionY);
}


eventCollision(targets, mapEvent){
  mapEvent.overlapUpdate(this);
  /*
    if(mapEvent.eventLimit == 0){
      mapEvent.eventLimit = 2;
      //this.bubble.trigger();
      console.log("only once");
        let config = {
        followSprite: this.player,
        key: "Interact",
        scene: this,
        alignX: -40 ,
        alignY: 10
      };

//mapEvent.bubbleAlert = this.bubbleAlertGroup.getFirstDead();
//mapEvent.bubbleAlert.trigger(config);
//this.newBubble.clear();
    } else {
      mapEvent.eventLimit = 2;
    }
  /*
    if(mapEvent.causeEvent = true){
      console.log("EVENT COLLISION");
      mapEvent.overlapProcess(this);
    }
    */

  //this.player.stats.maxVelocity = 25;
  //this.player.body.setVelocityX(25);
  //console.log("touch");
  //mapEvent.causeEvent = true
}


if(this.testEvent.body.touching.none){
  if(!this.bubble.skip){
    this.bubble.skip = true;
    this.bubble.clear();
  }
}else{
  console.log("TOUCHING", this.player.body.velocity.y, this.player.body.velocity.x);
  if(this.bubble.skip){
    this.bubble.canSkipCutscene = true;
    this.bubble.skip = false;
    this.bubble.trigger();
  }
}




