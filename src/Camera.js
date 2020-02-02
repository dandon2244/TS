export default class Camera {
  constructor(pos, game) {
    this.game = game;
    this.position = pos;
    this.centre = [game.canvas.width / 2, game.canvas.height / 2];
  }
  move(dir) {
    this.position[0] += dir[0] * this.game.DT;
    this.position[1] += dir[1] * this.game.DT;
    this.position[2] += dir[2] * this.game.DT;
  }
}
