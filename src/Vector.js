export default class Vector {
  constructor(x, y, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  negative() {
    return new Vector(-this.x, -this.y, this.z);
  }
  add(other) {
    return new Vector(this.x + other.x, this.y + other.y, this.z);
  }
  add3(other) {
    return new Vector(this.x + other.x, this.y + other.y, this.z);
  }
  times3(n) {
    return new Vector(this.x * n, this.y * n, this.z * n);
  }
  times(n) {
    return new Vector(this.x * n, this.y * n, this.z);
  }
  getAngle() {
    if (this.x == 0) {
      if (this.y == 0) {
        return 0;
      }
      if (this.y > 0) {
        return 90;
      }
      if (this.y < 0) {
        return 360 - 90;
      }
    }
    var angle = (180 / Math.PI) * Math.atan(this.y / this.x);
    if (this.x > 0) {
      return angle;
    }
    if (this.x < 0) {
      if (this.y < 0) {
        return angle - 180;
      }
      return angle + 180;
    }
  }

  toString() {
    return (
      "X: " +
      this.x.toString() +
      ", Y: " +
      this.y.toString() +
      ", Z: " +
      this.z.toString()
    );
  }
}
