/*
export default class DialogMenuCenter {

  constructor(scene){
    this.init(scene);
  }

  init(scene){
    this.backgroundHUD = scene.add.image(
      scene.game.canvas.width * 0.5,
      scene.game.canvas.height * 0.92,
      'backgroundUI'
    );
    this.backgroundHUD.displayWidth = scene.game.canvas.width * 0.85;
    this.backgroundHUD.displayHeight = scene.game.canvas.height * 0.16;
    this.backgroundHUD.setAlpha(0.60);

    scene.currentDialogText =
      scene.add.text(
        (scene.game.canvas.width * 0.10), scene.game.canvas.height * 0.850,
        'Start Text'
        { fontFamily: 'Luminari', fontSize: 15, color: 'white' }
      );


  }


}
*/




export default class DialogMenu {
  constructor(scene){
    this.selectedDefaultChoiceOption = true;
    this.init(scene);
  }

  init(scene){
    this.backgroundHUD = scene.add.image(
      scene.game.canvas.width * 0.5,
      scene.game.canvas.height * 0.92,
      'backgroundUI'
    );
    this.backgroundHUD.displayWidth = scene.game.canvas.width * 0.85;
    this.backgroundHUD.displayHeight = scene.game.canvas.height * 0.16;
    this.backgroundHUD.setAlpha(0.60);

    scene.currentDialogText =
      scene.add.text(
        (scene.game.canvas.width * 0.10), scene.game.canvas.height * 0.850,
        'Start Text',
        { fontFamily: 'Luminari', fontSize: 15, color: 'white' }
      );


    this.confirmOptionBox =
      scene.add.text(
        (scene.game.canvas.width * 0.42), scene.game.canvas.height * 0.950,
        'Yes',
        { fontFamily: 'Luminari', fontSize: 15, color: 'white' }
      );

    this.declineOptionBox =
      scene.add.text(
        (scene.game.canvas.width * 0.54), scene.game.canvas.height * 0.950,
        'No',
        { fontFamily: 'Luminari', fontSize: 15, color: 'white' }
      );

  }

  defaultChoiceSet(){
    this.confirmOptionBox.setText("Yes");
  
  }

  defaultChoiceOption(){
    this.selectedDefaultChoiceOption != this.selectedDefaultChoiceOption;

    if(this.selectedDefaultChoiceOption){
      this.confirmOptionBox.setColor('white');
      this.declineOptionBox.setColor('yellow');
    }
    else{
      this.confirmOptionBox.setColor('yellow');
      this.declineOptionBox.setColor('white');
    }
  }

  defaultChoiceOptionResult(){
    return this.selectedDefaultChoiceOption;
  }

/*
  init(scene){
    this.options = [];

    this.backgroundHUD = scene.add.image(
      scene.game.canvas.width * 0.5,
      scene.game.canvas.height * 0.92,
      'backgroundUI'
    );
    this.backgroundHUD.displayWidth = scene.game.canvas.width * 0.85;
    this.backgroundHUD.displayHeight = scene.game.canvas.height * 0.16;
    this.backgroundHUD.setAlpha(0.60);

    this.yes =
      scene.add.text(
        (scene.game.canvas.width * 0.42), scene.game.canvas.height * 0.950,
        'Yes',
        { fontFamily: 'Luminari', fontSize: 15, color: 'white' }
      );
    this.yes['activate'] = function(){
      console.log("ACCEPT");
    }

    this.no=
      scene.add.text(
        (scene.game.canvas.width * 0.54), scene.game.canvas.height * 0.950,
        'No',
        { fontFamily: 'Luminari', fontSize: 15, color: 'white' }
      );

    this.options = [... this.options, this.yes, this.no];
    console.log("Current Options " , this.options);
    this.clearOut();

    scene.currentText = 
    scene.add.text(
      (scene.game.canvas.width * 0.10), scene.game.canvas.height * 0.850,
      'Dragon Wizard Guide Testing All The Reason not to do this I hope I can see the sun again because\n I see nothing but the cold blue air \n test dance -------------------------------------------------------',
      { fontFamily: 'Luminari', fontSize: 15, color: 'white' }
    );
    scene.currentText.setText("Love");

    //scene.currentMenuList = this.options;
    //scene.menuType = "HORIZONTAL";
    //scene.currentPosition.x = 0;
    */

  activateEvent(){
    console.log("activat");
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
