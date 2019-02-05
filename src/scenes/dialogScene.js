export class DialogBox extends Phaser.Scene {
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
    this.currentMenu = [[],[]];
		this.cursors = this.input.keyboard.createCursorKeys();

    this.backgroundUI = this.add.image(400, 500, 'backgroundUI').setScale(8 ,4).setAlpha(0.9);

    this.input.keyboard.on('keydown_SPACE', function (event) {
      console.log('Hello from the Space Bar!');
      console.log("this", this);

      this.scene.UIrefresh = false;
      this.scene.backgroundUI.setAlpha(0);

      this.scene.scene.pause();
      this.scene.scene.resume("GameScene");

    });

    this.uiMovePrevious = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.uiMoveNext = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


    this.uiMoveLeft  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.uiMoveUp    = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.uiMoveRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.uiMoveDown  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.startUICondition = true;
  }

	update(time, delta) {
    if(Phaser.Input.Keyboard.JustDown(this.uiMoveLeft)){
      console.log("Move Left");
    }
    if(Phaser.Input.Keyboard.JustUp(this.uiMoveLeft)){
      console.log("Stop Left");
    }

    if(Phaser.Input.Keyboard.JustDown(this.uiMoveRight)){
      console.log("Move Right");
    }
    if(Phaser.Input.Keyboard.JustUp(this.uiMoveRight)){
      console.log("STOP");
    }

    if(Phaser.Input.Keyboard.JustDown(this.uiMoveUp)){
      console.log("Move Up");
    }
    if(Phaser.Input.Keyboard.JustUp(this.uiMoveUp)){
      console.log("STOP");
    }

    if(Phaser.Input.Keyboard.JustDown(this.uiMoveDown)){
      console.log("Going Down");
    }
    if(Phaser.Input.Keyboard.JustUp(this.uiMoveDown)){
      console.log("STOP");
    }

    //this.refreshUI(this);

  }

  init(){
    console.log(`%c INIT`, 'color: teal');
  }

  refreshUI(scene){
    if(scene.startUICondition){
      console.log(`%c Menu On`, 'color: green')
      scene.backgroundUI.setAlpha(0.9);
      scene.startUICondition = false;
    }
  }



}
