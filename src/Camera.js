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
  gameToScreenPos(x, y) {
    var sx =
      x -
      this.position[0] +
      (this.game.canvas.width * (1 - 1 / this.position[2])) / 2;
    var sy =
      y +
      this.position[1] +
      (this.game.canvas.height * (1 - 1 / this.position[2])) / 2;
    return [sx, sy];
  }
  screenToGamePos(x, y) {
    var gx =
      x +
      this.position[0] -
      (this.game.canvas.width * (1 - 1 / this.position[2])) / 2;
    var gy =
      y -
      this.position[1] -
      (this.game.canvas.height * (1 - 1 / this.position[2])) / 2;
    return [gx * this.position[2], gy * this.position[2]];
  }
}
