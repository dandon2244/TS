import Vector from "/src/Vector.js";
export default class Point {
  constructor(x, y, z = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  add(other) {
    return new Point(this.x + other.x, this.y + other.y, this.z);
  }
  add3(other) {
    return new Point(this.x + other.x, this.y + other.y, this.z + other.z);
  }
  minus(other) {
    return new Point(this.x - other.x, this.y - other.y);
  }
  times(n) {
    return new Point(this.x * n, this.y * n, this.z);
  }
  times3(n) {
    return new Point(this.x * n, this.y * n, this.z * n);
  }
  negative() {
    return new Point(-this.x, -this.y);
  }
  move(vec) {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;
  }
  copy() {
    return new Point(this.x, this.y, this.z);
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
  dotProduct(other) {
    return this.x * other.x + this.y * other.y;
  }
}
