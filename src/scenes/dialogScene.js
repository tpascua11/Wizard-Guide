export class DialogBox extends Phaser.Scene {
  constructor() {
    super({
      key: 'DialogBox', active: true
    });
  }

  preload(){
  }


  create(){
    console.log("ACTIVATED")

    console.log("ACTIVATED")
    console.log("ACTIVATED")
    console.log("ACTIVATED")
    console.log("ACTIVATED")
    console.log("ACTIVATED")
    console.log("ACTIVATED")
    console.log("ACTIVATED")
    console.log("ACTIVATED")

    this.input.keyboard.on('keydown_SPACE', function (event) {
      console.log('Hello from the Space Bar!');
      this.scene.scene.pause();
      this.scene.scene.resume("GameScene");
    });

  }

}
