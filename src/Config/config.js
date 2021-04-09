import 'phaser';
/* global Phaser */
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
export default {
  type: Phaser.AUTO,
    width: 800,
    height: 600,
        // scene: playGame,
        backgroundColor:  ' 0x0c88c7',
 
        // physics settings
        physics: {
            default: "arcade"
        },
        parent: 'phaser-container',
        dom: {
          createContainer: true
      },
    plugins: {
      scene: [
        {
          key: 'rexUI',
          plugin: RexUIPlugin,
          mapping: 'rexUI'
        }
      ]
      }
    }