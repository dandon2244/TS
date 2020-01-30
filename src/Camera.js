export default class Camera {
  constructor(pos) {
    this.position = pos;
  }
  move(dt, dir) {
    this.position[0] += (dir[0] * dt) / 10;
    this.position[1] += (dir[1] * dt) / 10;
  }
}
