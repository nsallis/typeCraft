import * as Phaser from 'phaser';
import { compileMap } from './mapGen'; 

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: true,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  private camera: Phaser.Cameras.Scene2D.Camera;
 
  constructor() {
    super(sceneConfig);
  }
 
  public create() {
    this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF) as any;
    this.physics.add.existing(this.square);
    // this.camera = this.cameras.add(0, 0, 400, 400);
    this.cameras.main.width = 400;
    this.cameras.main.height = 400;
    this.camera = this.cameras.main;
    compileMap("myseed");
  }
 
  public update() {
    // const cursorKeys = this.input.keyboard.createCursorKeys();
 
    let up = this.input.keyboard.addKey('W');
    let down = this.input.keyboard.addKey('S');
    let right = this.input.keyboard.addKey('D');
    let left = this.input.keyboard.addKey('A');

    if (up.isDown) {
      this.camera.y -= 8;
    } else if (down.isDown) {
      this.camera.y += 8;
    } 
     
    if (right.isDown) {
      this.camera.x += 8;
    } else if (left.isDown) {
      this.camera.x -= 8;
    } 
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',

  type: Phaser.AUTO,

  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },

  parent: 'game',
  backgroundColor: '#000000',
  scene: GameScene
};

export const game = new Phaser.Game(gameConfig);
