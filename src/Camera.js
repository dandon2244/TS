export default class Camera {
  constructor(pos) {
    this.pos = pos;
  }
  move(dt, dir) {
    this.pos[0] += (dir[0] * dt) / 10;
    this.pos[1] += (dir[1] * dt) / 10;
  }
}
