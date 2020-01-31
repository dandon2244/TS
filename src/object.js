export default class object {
  constructor(game, pos, type, size, colour, subObjects = []) {
    this.position = pos;
    this.game = game;
    this.rendering = true;
    this.game.objects.push(this);
    this.inited = false;

    this.absPos = this.position;
    this.supe = null;
    this.type = type;
    this.size = size;
    this.colour = colour;
    this.subObjects = [];

    for (var x = 0; x < subObjects.length; x++) {
      this.subObjects.push(subObjects[x]);
    }
    for (var x = 0; x < this.subObjects.length; x++) {
      this.subObjects[x].supe = this;
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
  addSubObject(obj) {
    this.subObjects.push(obj);
    obj.supe = this;
    obj.trueSuper();
    this.subElements(this);
  }
  render() {
    if (this.rendering) {
      if (this.type == "RECT") {
        this.game.context.fillStyle = this.colour;
        this.game.context.fillRect(
          this.absPos[0] - this.size[0] / 2 - this.game.camera.position[0],
          this.absPos[1] - this.size[1] / 2 + this.game.camera.position[1],
          this.size[0],
          this.size[1]
        );
      }
    }
  }
  move(vel, DT = true) {
    this.absPos[0] += vel[0] * (DT ? this.game.DT : 1);
    this.absPos[1] += vel[1] * (DT ? this.game.DT : 1);
    for (var x = 0; x < this.subObjects.length; x++) {
      this.subObjects[x].move(vel);
    }
  }
  update() {}
}
