import { default as object } from "./newObjects";

export default class Road {
  constructor(game, Points) {
    this.game = game;
    this.game.roads.push(this);
    this.Points = Points;
    this.update();
    this.mRoad = new object(
      this.game,
      this.centre,
      "RECT",
      [this.length, 30],
      "black"
    );
  }
  update() {
    this.centre = this.Points[0].add(this.Points[1]).times(1 / 2);
    var dx = this.Points[1].x - this.Points[0].x;
    var dy = this.Points[1].y - this.Points[0].y;
    dy = -dy;
    if (dx != 0 && dy != 0) {
      this.angle = (Math.atan(dy / dx) * 180) / Math.PI;
      if (dx < 0 && dy < 0) {
        this.angle -= 180;
      }
      if (dx < 0 && dy > 0) {
        this.angle += 180;
      }
    } else {
      this.angle = 0;
    }
    //if (this.mRoad) this.setAngle(this.angle);
    this.length =
      (this.Points[0].x - this.Points[1].x) ** 2 +
      (this.Points[0].y - this.Points[1].y) ** 2;
    this.length = Math.sqrt(this.length);
    //console.log(this.angle, dy, dx);
  }
  setAngle(ang) {
    this.mRoad.rotate(ang, false);
  }
  delete() {
    this.mRoad.deleteAll();
    this.game.roads.remove(this);
  }
  changePoint(point) {
    this.Points[1] = point;
    this.update();
    this.mRoad.absPos = this.centre;
    this.mRoad.size[0] = this.length;
    // this.
  }
}
