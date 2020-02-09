import { radians, rotatePoint, isColliding } from "./lib.js";
import Point from "./Point.js";
export default class newObject {
  constructor(game, relPos, type, size, colour, id, collider = false) {
    this.game = game;
    this.game.objects.push(this);
    this.relPos = relPos;
    this.absPos = this.relPos;
    this.type = type;
    this.size = typeof size != "undefined" ? size : [0, 0];
    this.colour = colour;
    this.subObjects = [];
    this.id = id;
    this.collider = collider;
    if (this.collider) {
      this.blocks = [];
      this.nearby = [];
      this.collisionTypes = this.game.collisionPairs[this.id];
      this.collStates = { frame: [false, null] };
    }
    this.firstInit();
  }
  firstInit() {
    this.supe = null;
    this.rendering = true;
    this.angle = 0;
    this.screenPos = this.game.camera.gameToScreenPos(this.absPos);
    var z = this.game.camera.position.z;
    this.screenSize = [this.size[0] / z, this.size[1] / z];
  }

  move(vel, DT = true) {
    this.absPos.move(vel.times(DT ? this.game.DT : 1));
  }
  moveAll(vel, DT = true) {
    this.move(vel, DT);
    for (var x = 0; x < this.subObjects.length; x++) {
      this.subObjects[x].moveAll(vel, DT);
    }
  }

  rotate(angle, origin, DT = true) {
    var ang = angle * (DT ? this.game.DT : 1);
    this.angle += ang;
    this.absPos = rotatePoint(ang, origin, this.absPos);
  }
  radians(ang) {
    return (Math.PI * ang) / 180;
  }
  rotateAll(angle, origin, DT = true) {
    this.rotate(angle, origin, DT);
    for (var x = 0; x < this.subObjects.length; x++) {
      this.subObjects[x].rotateAll(angle, origin, DT);
    }
  }
  finalInit() {
    this.trueSuper();
    if (this.supe == null) {
      this.game.suObjects.push(this);
      this.subElements(this);
      this.inited = true;
    }
  }
  addSubObject(obj) {
    this.subObjects.push(obj);
    obj.supe = this;
    obj.trueSuper();
    this.subElements(this);
  }
  subElements(obj) {
    for (var x = 0; x < obj.subObjects.length; x++) {
      if (!obj.subObjects[x].inited) {
        obj.subObjects[x].absPos = obj.subObjects[x].absPos.add(obj.absPos);
        obj.subObjects[x].inited = true;
      }
      this.subElements(obj.subObjects[x]);
    }
  }

  trueSuper() {
    if (this.supe != null) {
      var supe = this;
      while (supe.supe != null) {
        supe = supe.supe;
      }
      this.supe = supe;
    }
  }

  setAllRendering(val) {
    this.rendering = val;
    for (var x = 0; x < this.subObjects.length; x++) {
      this.subObjects[x].setAllRendering(val);
    }
  }

  render() {
    if (!this.rendering) {
      return;
    }
    this.screenPos = this.game.camera.gameToScreenPos(this.absPos);
    var z = this.game.camera.position.z;
    this.screenSize = [this.size[0] / z, this.size[1] / z];
    if (typeof this.transparency != "undefined") {
      if (this.transparency <= 0) {
        return;
      }
      this.game.context.globalAlpha = this.transparency;
    }
    if (this.type == "RECT") {
      var w = this.game.camera.centre.x;
      var h = this.game.camera.centre.y;
      var z = this.game.camera.position.z;
      var camPos = this.game.camera.position;
      this.game.context.save();
      this.game.context.translate(
        this.absPos.x / z + w * (1 - 1 / z) - camPos.x / z,
        this.absPos.y / z + h * (1 - 1 / z) + camPos.y / z
      );
      this.game.context.rotate(-(this.angle * Math.PI) / 180);
      this.game.context.fillStyle = this.colour;
      this.game.context.fillRect(
        -(this.size[0] / 2) / z,
        -this.size[1] / 2 / z,
        this.size[0] / z,
        this.size[1] / z
      );
      this.game.context.restore();
    }
    this.game.context.globalAlpha = 1;
  }
  colliding(other) {
    var b = isColliding(this, other);
    //for (var x = 0; x < 5000; x++) {
    //  b = isColliding(this, other);
    //  }
    return b;
  }
  update() {
    if (this.angle > 360) {
      this.angle -= 360;
    }
    if (this.angle < 0) {
      this.angle += 360;
    }
    if (this.collider) {
      this.nearby = [];
      for (const [key, value] of Object.entries(this.collStates)) {
        this.collStates[key] = [false, null];
      }
      for (var x = 0; x < this.blocks.length; x++) {
        for (var i = 0; i < this.blocks[x].objects.length; i++) {
          if (this.blocks[x].objects[i] != this) {
            this.nearby.push(this.blocks[x].objects[i]);
          }
        }
      }
      this.nearby = Array.from(new Set(this.nearby));
      //   console.log(this.nearby.length);
      for (var x = 0; x < this.nearby.length; x++) {
        if (this.collisionTypes.includes(this.nearby[x].id)) {
          if (this.colliding(this.nearby[x]))
            this.collStates[this.nearby[x].id] = [true, this.nearby[x]];
        }
      }
    }
  }
  pointWithinRender(pos) {
    if (this.type == "RECT") {
      var rotatedPoint = rotatePoint(-this.angle, this.screenPos, pos);
      if (
        rotatedPoint.x <= this.screenPos.x + this.screenSize[0] / 2 &&
        rotatedPoint.x >= this.screenPos.x - this.screenSize[0] / 2 &&
        rotatedPoint.y <= this.screenPos.y + this.screenSize[1] / 2 &&
        rotatedPoint.y >= this.screenPos.y - this.screenSize[1] / 2
      ) {
        return true;
      } else return false;
    }
  }

  getPoints() {
    var points = [];
    points.push(
      //Top left corner
      rotatePoint(
        this.angle,
        this.absPos,
        new Point(
          this.absPos.x - this.size[0] / 2,
          this.absPos.y - this.size[1] / 2
        )
      )
    );
    points.push(
      //bottom left corner
      rotatePoint(
        this.angle,
        this.absPos,
        new Point(
          this.absPos.x - this.size[0] / 2,
          this.absPos.y + this.size[1] / 2
        )
      )
    );
    points.push(
      //top right corner
      rotatePoint(
        this.angle,
        this.absPos,
        new Point(
          this.absPos.x + this.size[0] / 2,
          this.absPos.y - this.size[1] / 2
        )
      )
    );
    points.push(
      //bottom right corner
      rotatePoint(
        this.angle,
        this.absPos,
        new Point(
          this.absPos.x + this.size[0] / 2,
          this.absPos.y + this.size[1] / 2
        )
      )
    );
    return points;
  }

  delete() {
    this.game.objects.splice(this.game.objects.indexOf(this), 1);
  }
  deleteAll() {
    this.delete();
    for (var x = 0; x < this.subObjects.length; x++) {
      this.subObjects[x].deleteAll();
    }
  }
}
