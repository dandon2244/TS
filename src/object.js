export default class object {
  constructor(game, pos, type, size, colour, collider = false) {
    this.position = pos;
    this.game = game;
    this.angle = 0;
    this.rendering = true;
    this.game.objects.push(this);
    this.inited = false;
    this.printed = false;
    this.gamePos = [
      this.position[0] * this.game.camera.position[2],
      this.position[1] * this.game.camera.position[2]
    ];

    this.absPos = this.position;
    this.supe = null;
    this.type = type;
    this.size = size || [0, 0];
    this.colour = colour;
    this.subObjects = [];
    this.screenPos = [
      this.absPos[0] -
        this.game.camera.position[0] +
        this.game.canvas.width * (1 - 1 / this.game.camera.position) -
        (this.game.canvas.width / this.game.camera.position[2] -
          this.game.canvas.width) /
          2,
      this.absPos[1] +
        this.game.camera.position[1] -
        (this.game.canvas.height / this.game.camera.position[2] -
          this.game.canvas.height) /
          2
    ];
    this.screenSize = [
      this.size[0] / this.game.camera.position[2],
      this.size[1] / this.game.camera.position[2]
    ];
  }
  finalInit() {
    if (this.supe == null) {
      this.game.suObjects.push(this);
      this.subElements(this);
      this.inited = true;
    }
  }
  getPosition() {
    return this.absPos;
  }
  setPosition(pos) {
    var dif = [pos[0] - this.getPosition()[0], pos[1] - this.getPosition()[1]];
    this.move(dif, false);
  }

  subElements(obj) {
    for (var x = 0; x < obj.subObjects.length; x++) {
      if (!obj.subObjects[x].inited) {
        obj.subObjects[x].absPos[0] += obj.absPos[0];
        obj.subObjects[x].absPos[1] += obj.absPos[1];
        obj.subObjects[x].inited = true;
        this.subElements(obj.subObjects[x]);
      }
    }
  }

  setAllRendering(val) {
    this.rendering = val;
    for (var x = 0; x < this.subObjects.length; x++) {
      this.subObjects[x].setAllRendering(val);
    }
  }
  addSubObject(obj) {
    this.subObjects.push(obj);
    obj.supe = this;
    this.subElements(this);
  }
  pointWithin() {}
  render() {
    this.log = this.angle;
    this.screenSize = [
      this.size[0] / this.game.camera.position[2],
      this.size[1] / this.game.camera.position[2]
    ];
    this.screenPos = [
      this.absPos[0] -
        this.game.camera.position[0] -
        (this.game.canvas.width / this.game.camera.position[2] -
          this.game.canvas.width) /
          2,
      this.absPos[1] +
        this.game.camera.position[1] -
        (this.game.canvas.height / this.game.camera.position[2] -
          this.game.canvas.height) /
          2
    ];
    if (this.rendering) {
      if (typeof this.transparency != "undefined") {
        if (this.transparency == 0) {
          return;
        }
        this.game.context.globalAlpha = this.transparency;
      } else {
        this.game.context.globalAlpha = 1;
      }

      var x;
      var y;
      var z = this.game.camera.position[2];
      var width = this.game.canvas.width;
      var height = this.game.canvas.height;
      var newWidth = (width * 1) / z;
      var newHeight = (height * 1) / z;
      if (this.supe == null) {
        x = this.absPos[0];
        y = this.absPos[1];
      } else {
        x = this.supe.absPos[0];
        y = this.supe.absPos[1];
      }

      this.game.context.save();

      if (this.type == "RECT") {
        var nx = this.absPos[0] - this.game.camera.position[0];
        this.log = nx;
        //nx = nx + (250 - nx) * (1 - 1 / z);

        this.game.context.fillStyle = this.colour;
        var rx = -nx + this.absPos[0] - this.size[0] / 2;
        var ry = -y + this.absPos[1] - this.size[1] / 2;

        this.game.context.translate(x, y + this.game.camera.position[1]);
        this.game.context.rotate(this.angle);
        //this.game.context.scale(1 / z, 1 / z);
        this.game.context.fillRect(rx, ry, this.size[0] / z, this.size[1]);
      }
      if (this.type == "CIRCLE") {
        this.game.context.fillStyle = this.colour;
        var cx = this.absPos[0] - x;
        var cy = this.absPos[1] - y;
        // this.game.context.moveTo(cx,cy);
        this.game.context.beginPath();
        this.game.context.arc(cx, cy, this.size[0], this.size[1], this.size[2]);
        this.game.context.lineTo(cx, cy);
        this.game.context.fill();
      }
      this.game.context.restore();
    }
  }
  move(vel, DT = true) {
    this.absPos[0] +=
      (vel[0] * (DT ? this.game.DT : 1)) / this.game.camera.position[2];
    this.absPos[1] +=
      (vel[1] * (DT ? this.game.DT : 1)) / this.game.camera.position[2];
    for (var x = 0; x < this.subObjects.length; x++) {
      this.subObjects[x].move(vel);
    }
  }
  setAngle(angle) {
    var dif = angle - this.angle;
    this.rotate(dif, false);
  }
  rotate(angle, DT = true) {
    this.angle += angle * (DT ? this.game.DT : 1);
    for (var x = 0; x < this.subObjects.length; x++) {
      this.subObjects[x].rotate(angle, DT);
    }
  }
  update() {
    for (var x = 0; x < this.subObjects.length; x++) {
      this.subObjects[x].angle = this.angle;
    }
    this.gamePos = [
      this.position[0] * this.game.camera.position[2],
      this.position[1] * this.game.camera.position[2]
    ];
  }

  pointWithinRender(x, y) {
    var dx = x - this.screenPos[0];
    var dy = y - this.screenPos[1];

    var h1 = Math.sqrt(dx * dx + dy * dy);
    var currA = Math.atan2(dy, dx);
    var newA = currA - this.angle;
    var x2 = Math.cos(newA) * h1;
    var y2 = Math.sin(newA) * h1;

    if (
      x2 > -0.5 * this.screenSize[0] &&
      x2 < 0.5 * this.screenSize[0] &&
      y2 > -0.5 * this.screenSize[1] &&
      y2 < 0.5 * this.screenSize[1]
    ) {
      return true;
    } else return false;
  }
}
