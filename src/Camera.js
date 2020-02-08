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
  gameToScreenPos(pos) {
    var z = this.position[2];

    return [
      pos[0] / z +
        (this.game.canvas.width / 2) * (1 - 1 / z) -
        this.position[0] / z,
      pos[1] / z +
        (this.game.canvas.height / 2) * (1 - 1 / z) +
        this.position[1] / z
    ];
  }
  screenToGamePos(pos) {
    var z = this.position[2];
    var x =
      (pos[0] +
        this.position[0] / z -
        (this.game.canvas.width / 2) * (1 - 1 / z)) *
      z;
    var y =
      (pos[1] -
        this.position[1] / z -
        (this.game.canvas.height / 2) * (1 - 1 / z)) *
      z;
    return [x, y];
  }
}
