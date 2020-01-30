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
    var supe = this;
    var x = 0;
    while (supe.supe != null) {
      x++;
      if (x > 5) {
        break;
      }
      supe = supe.supe;
    }
    this.supe = supe;
  }
  render() {
    if (this.type == "RECT") {
    }
  }
}
