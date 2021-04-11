import 'phaser'
import gameOptions from '../Config/gameOptions.js'
export default class PlayerName extends Phaser.Scene{

  constructor () {
    super('Player');
  }
  preload(){
    this.load.html('nameform', 'assets/text/nameform.html');
    this.load.image('player','assets/runner1.png')
  }
  create(){
    this.add.image(400, 300, 'player');
    var text = this.add.text(300, 10, 'Please enter your name', { color: 'white', fontSize: '20px '});
    var element = this.add.dom(game.config.width/2, this.game.config.height/2).createFromCache('nameform');
  
    element.addListener('click');
    var that = this
  
    element.on('click', function (event) {
  
        if (event.target.name === 'playButton')
        {
            var inputText = this.getChildByName('nameField');
  
            //  Have they entered anything?
            if (inputText.value !== '')
            {
                //  Turn off the click events
                this.removeListener('click');
  
                //  Hide the login element
                this.setVisible(false);
  
                //  Populate the text with whatever they typed in
                text.setText('Welcome ' + inputText.value);
                gameOptions.playerName.push(inputText.value)
                that.scene.stop('Player')
                that.scene.start('Animate')
            }
            else
            {
                //  Flash the prompt
                this.scene.tweens.add({
                    targets: text,
                    alpha: 0.2,
                    duration: 250,
                    ease: 'Power3',
                    yoyo: true
                });
                        }
        }
  
    });
  }
}
