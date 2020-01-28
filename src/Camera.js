export default class Camera {
  constructor(pos) {
    this.pos = pos;
  }
  move(dir) {
    this.pos += dir;
  }
}
