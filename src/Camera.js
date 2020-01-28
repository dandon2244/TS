export default class Camera {
  constructor(pos) {
    this.pos = pos;
  }
  move(dt, dir) {
    this.pos += dir / dt;
  }
}
