import { radians, rotatePoint } from "./lib.js";
export default class newObject {
  constructor(game, relPos, type, size, colour, subObjects = []) {
    this.game = game;
    this.game.objects.push(this);
    this.relPos = relPos;
    this.absPos = this.relPos;
    this.type = type;
    this.size = typeof size != "undefined" ? size : [0, 0];
    this.colour = colour;
    this.subObjects = subObjects;
    this.firstInit();
  }
  firstInit() {
    this.supe = null;
    this.rendering = true;
    this.angle = 0;
    for (var x = 0; x < this.subObjects.length; x++) {
      this.subObjects[x].supe = this;
    }
    this.screenPos = this.game.camera.gameToScreenPos(this.absPos);
    var z = this.game.camera.position[2];
    this.screenSize = [this.size[0] / z, this.size[1] / z];
  }

  move(vel, DT = true) {
    this.absPos[0] += vel[0] * (DT ? this.game.DT : 1);
    this.absPos[1] += vel[1] * (DT ? this.game.DT : 1);
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
        obj.subObjects[x].absPos[0] += obj.absPos[0];
        obj.subObjects[x].absPos[1] += obj.absPos[1];
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
    var z = this.game.camera.position[2];
    this.screenSize = [this.size[0] / z, this.size[1] / z];
    if (typeof this.transparency != "undefined") {
      if (this.transparency <= 0) {
        return;
      }
      this.game.context.globalAlpha = this.transparency;
    }
    if (this.type == "RECT") {
      var w = this.game.canvas.width / 2;
      var h = this.game.canvas.height / 2;
      var z = this.game.camera.position[2];
      var camPos = this.game.camera.position;
      this.game.context.save();
      this.game.context.translate(
        this.absPos[0] / z + w * (1 - 1 / z) - camPos[0] / z,
        this.absPos[1] / z + h * (1 - 1 / z) + camPos[1] / z
      );
      this.game.context.rotate((this.angle * Math.PI) / 180);
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
  update() {}
  pointWithinRender(pos) {
    if (this.type == "RECT") {
      var rotatedPoint = rotatePoint(-this.angle, this.screenPos, pos);
      if (
        rotatedPoint[0] <= this.screenPos[0] + this.screenSize[0] / 2 &&
        rotatedPoint[0] >= this.screenPos[0] - this.screenSize[0] / 2 &&
        rotatedPoint[1] <= this.screenPos[1] + this.screenSize[1] / 2 &&
        rotatedPoint[1] >= this.screenPos[1] - this.screenSize[1] / 2
      ) {
        return true;
      } else return false;
    }
  }
}
