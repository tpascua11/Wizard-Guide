export default class DialogMenu {
  constructor(scene){
    this.init(scene);
  }

  init(scene){
    this.options = [];

    this.backgroundHUD = scene.add.image(
      scene.game.canvas.width * 0.5,
      scene.game.canvas.height * 0.92,
      'backgroundUI'
    );
    this.backgroundHUD.displayWidth = scene.game.canvas.width * 0.25;
    this.backgroundHUD.displayHeight = scene.game.canvas.height * 0.15;
    this.backgroundHUD.setAlpha(0.60);

    this.yes =
      scene.add.text(
        (scene.game.canvas.width * 0.42), scene.game.canvas.height * 0.895,
        'Yes',
        { fontFamily: 'Luminari', fontSize: 25, color: 'white' }
      );
    this.yes['activate'] = function(){
      console.log("ACCEPT");
    }
    //scene.select(this.yes);

    this.no=
      scene.add.text(
        (scene.game.canvas.width * 0.54), scene.game.canvas.height * 0.895,
        'No',
        { fontFamily: 'Luminari', fontSize: 25, color: 'white' }
      );

    this.options = [... this.options, this.yes, this.no];
    console.log("Current Options " , this.options);
    this.clearOut();

    //scene.currentMenuList = this.options;
    //scene.menuType = "HORIZONTAL";
    //scene.currentPosition.x = 0;
  }

  activateEvent(){
    console.log("activat")
  }

  convert(scene, menuData){
    this.revive();
    scene.menuType = "HORIZONTAL";
    scene.menuList = this.options;
    return this.options;
  }

  newSetup(scene){
  }

  clearOut(){
    this.options.forEach(function(option){
      console.log("option hide", option);
      option.visible = false;
      option.active  = false;
    });
    this.backgroundHUD.visible  = false;
    this.backgroundHUD.active   = false;
  }

  revive(){
    this.options.forEach(function(option){
      option.visible = true;
      option.active  = true;
    });

    this.backgroundHUD.visible  = true;
    this.backgroundHUD.active   = true;
  }

}
