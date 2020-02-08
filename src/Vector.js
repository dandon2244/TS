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
