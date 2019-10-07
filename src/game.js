import './game.css';
import * as PIXI from 'pixi.js';

const Status = {
  READY: 0,
  RUNNING: 1,
  GAMEOVER: 2
};

class Game {
  init(options = {}) {
    console.log('game init');
    const defaultOptions = {
      gameWidth: 1024,
      gameHeight: 576,
      xAxisSpeed: 20,
      g: 10, // Gravity acceleration
      fireAcc: 8, // acceleration when fire (click mouse)
    };
    this.options = {...defaultOptions, ...options};
    this.app = new PIXI.Application({
      width: this.options.gameWidth,
      height: this.options.gameHeight,
      backgroundColor: 0x46A3FF,
    });
    document.body.appendChild(this.app.view);

    this.state = {
      status: Status.READY,
      balloon: {
        y: Math.floor(this.options.gameHeight / 2), // init position is middle of the screen
        speed: 0, // this is y axis speed only, x axis speed is constant number
      },
      pillar: {
        distance: 0,
        upQueue: [],
        downQueue: [],
      }
    };
    this.app.loader.add('balloon', './resource/balloon.png').load(() => {
      this.app.ticker.add(time => this.tick(time));
    })
  }

  tick(time) {
    if (this.state.status === Status.RUNNING) {
      this.state.balloon.speed += Math.round(this.app.ticker.elapsedMS * this.options.g / 1000);
      //TODO collision detection
    }
  }

  changeStatus(newStatus) {
    this.state.status = newStatus;
    if (newStatus === Status.RUNNING) {
      // TODO clear all infos
    }
    else if (newStatus === Status.GAMEOVER) {
      // TODO show game over and final score
    }
    else if (newStatus === Status.READY) {
      // TODO hide game over and final score, show welcome and click to start
    }
  }

  onClick() {
    if (this.state.status === Status.RUNNING) {
      this.state.balloon.speed -= this.options.fireAcc;
    }
    else if (this.state.status === Status.GAMEOVER) {
      this.changeStatus(Status.READY);
    }
    else if (this.state.status === Status.READY) {
      this.changeStatus(Status.RUNNING);
    }
  }
}

const game = new Game();

export default game;
