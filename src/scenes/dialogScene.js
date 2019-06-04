import DialogMenu from "ROOT/hud/DialogMenu";
import {activateEvent} from "ROOT/mechanics/gameEvent";
import {callEvent} from "ROOT/mechanics/gameEvent";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'DialogBox', active: true
    });
  }

  preload(){
    this.load.spritesheet('backgroundUI', 'assets/debug/blackbox.png', {
      frameWidth: 100,
      frameHeight: 49,
      spacing: 0
    });
  }

  create(){
    //this.option1 = this.add.text(300, 500, 'Wizard Guide', { fontFamily: 'Luminari', fontSize: 20, color: 'white' });
    //this.option1.displayWidth = 100;
    this.menuList = [{}];
    this.currentPosition = {x:0 ,y:0};

    this.cursors = this.input.keyboard.createCursorKeys();
    this.uiActivateMenu  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.uiMoveLeft  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.uiMoveUp    = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.uiMoveRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.uiMoveDown  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.startUICondition = true;
    this.dialogMenu = new DialogMenu(this);
    console.log("BOTH HAPPEN AT THE SAME TIME");

    this.input.keyboard.on('keydown_SPACE', function (event) {
      this.scene.dialogMenu.clearOut();
      this.scene.scene.pause();
      this.scene.scene.resume("GameScene");
    });
    this.scene.pause();

  }

  update(time, delta) {
    if(Phaser.Input.Keyboard.JustDown(this.uiActivateMenu)){
      console.log("activate menu");
      this.menuList[this.currentPosition.x].activate();
    }
    if(Phaser.Input.Keyboard.JustDown(this.uiMoveLeft)){
      this.updateMoveHorizontal(-1);
      //console.log("Move Left");
    }
    if(Phaser.Input.Keyboard.JustUp(this.uiMoveLeft)){
      //console.log("Stop Left");
    }

    if(Phaser.Input.Keyboard.JustDown(this.uiMoveRight)){
      this.updateMoveHorizontal(1);
      //console.log("Move Right");
    }
    if(Phaser.Input.Keyboard.JustUp(this.uiMoveRight)){
      //console.log("STOP");
    }

    if(Phaser.Input.Keyboard.JustDown(this.uiMoveUp)){
      this.updateMoveVertical(-1);
      //console.log("Move Up");
    }
    if(Phaser.Input.Keyboard.JustUp(this.uiMoveUp)){
      //console.log("STOP");
    }

    if(Phaser.Input.Keyboard.JustDown(this.uiMoveDown)){
      this.updateMoveVertical(1);
      //console.log("Going Down");
    }
    if(Phaser.Input.Keyboard.JustUp(this.uiMoveDown)){
      //console.log("STOP");
    }
  }

  updateMoveVertical(movement){
    if(this.menuType === "VERTICAL" || this.menuType === "2D"){
      this.moveMenuSelector(movement);
    }
  }

  updateMoveHorizontal(movement){
    if(this.menuType === "HORIZONTAL" || this.menuType == "2D"){
      this.moveMenuSelector(movement);
    }
  }

  moveMenuSelector(x){
    let newPositionX = this.currentPosition.x;
    let newPositionY = this.currentPosition.y;

    if(this.currentPosition.x + x >= this.menuList.length){
      newPositionX = 0;
    }
    else if(this.currentPosition.x + x < 0){
      newPositionX = this.menuList.length-1;
    }
    else{
      newPositionX = this.currentPosition.x + x;
    }

    this.currentPosition.x = newPositionX;

    this.deselect(this.targetMenu);
    this.targetMenu = this.menuList[newPositionX];
    this.select(this.targetMenu);
    //console.log(`%c Next Menu`, 'color: green', newPositionX);
  }

  deselect(menuOption){
    console.log("New Option", menuOption);
    if(menuOption){
      menuOption.selected = false;
      menuOption.setTint(0xFFFFFF);
    }
  }

  select(menuOption){
    this.targetMenu = menuOption;
    menuOption.selected = true;
    menuOption.setTint(0xFFD700);
  }

  hideMenu(scene){
    this.menuList.forEach(function(menu){
      menu.visable = false;
    });
  }

  newMenu(menuName, menuData){
    console.log("menu Name", menuName);
    console.log("menu Data", menuData);
    var newIndex = 0;
    switch(menuName){
      case "DIALOG":  this.dialogMenu.convert(this, menuData); break;
      default: console.log("DOES NOT EXIST"); break;
    }
  }

  nextDialogOption(dialogueList){
    let nextCall = dialogueList.shift();
    activateEvent();
  }

  makeEventList(textCode){
    //Converts Text Code Into An Event List
    let newLineList = textCode.split('\n');
    var eventList = [];
    newLineList.forEach(function(newLine){
      eventList.push(lineReader(newLine));
    });

    function lineReader(line){
      let lineSplit = line.split(" ");
      return lineSplit;
    }

    return eventList;
  }

}

class TitleScreen{
  constructor(scene){
    this.buildBaseHUD(scene);
    this.startGame(scene);
  }

  buildBaseHUD(scene){
    this.backgroundHUD =
      scene.add.image(scene.game.canvas.width/2, scene.game.canvas.height/2, 'backgroundUI');
    this.backgroundHUD.displayWidth = scene.game.canvas.width;
    this.backgroundHUD.displayHeight = scene.game.canvas.height;

    this.title =
      scene.add.text(
        (scene.game.canvas.width/3), scene.game.canvas.height/6,
        'Wizard Guide',
        { fontFamily: 'Luminari', fontSize: 55, color: 'white' }
      );
    console.log("Check", scene.game.canvas.width);

  }

  startGame(scene){
    this.startGame =
      scene.add.text(
        (scene.game.canvas.width/2), scene.game.canvas.height/2,
        'Start Game',
      );

    this.startGame.start = function(){
      console.log("START GAME");
    }
  }

}


class dialogScreen{
  constructor(){
  }
}

