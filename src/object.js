export default class object {
  constructor(game, pos, type, size, colour, subObjects = []) {
    this.position = pos;
    this.game = game;

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
      this.game.objects.push(this);
      this.subElements(this);
    }
  }
  getPosition() {
    return this.absPos;
  }

  subElements(obj) {
    for (var x = 0; x < obj.subObjects.length; x++) {
      obj.subObjects[x].absPos[0] += obj.absPos[0];
      obj.subObjects[x].absPos[1] += obj.absPos[1];
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
  render() {
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
  move(vel) {
    this.absPos[0] += vel[0] * this.game.DT;
    this.absPos[1] += vel[1] * this.game.DT;
  }
  update() {}
}
