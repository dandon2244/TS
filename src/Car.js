import object from "./object.js";

export default class Car {
  constructor(position, colour, game) {
    this.selected = false;
    this.game = game;
    this.position = position;
    this.colour = colour;
    this.angle = 0;
    this.speed = 1;
    this.gamePos = position;
    this.frame = new object(game, position, "RECT", [60, 35], this.colour);
    this.window = new object(
      game,
      [this.frame.size[0] / 2 - 10, 0, 2],
      "RECT",
      [20, this.frame.size[1]],
      "#d8e8e6"
    );
    this.leftHead = new object(
      game,
      [-this.frame.size[0] / 2 + 4, -this.frame.size[1] / 2 + 4, 2],
      "RECT",
      [8, 8],
      "red"
    );
    this.rightHead = new object(
      game,
      [-this.frame.size[0] / 2 + 4, this.frame.size[1] / 2 - 4, 2],
      "RECT",
      [8, 8],
      "red"
    );
    this.leftGlows = [];
    for (var x = 0; x < 4; x++) {
      var glow = new object(
        game,
        [0, 0, 0.4],
        "CIRCLE",
        [30 - 30 / (x + 1), 135 * (Math.PI / 180), 235 * (Math.PI / 180)],
        "orange"
      );
      glow.transparency = 0.3;
      this.leftGlows.push(glow);
    }
    this.leftGlow = new object(game, [0, 0]);
    this.selectedFrame = new object(
      game,
      [0, 0, 5],
      "RECT",
      [this.frame.size[0], this.frame.size[1]],
      "green"
    );
    this.selectedFrame.transparency = 0.0;

    this.frame.addSubObject(this.window);
    this.frame.addSubObject(this.selectedFrame);
    this.frame.addSubObject(this.leftHead);
    this.frame.addSubObject(this.rightHead);
    this.leftHead.addSubObject(this.leftGlow);
    for (var x = 0; x < this.leftGlows.length; x++) {
      this.leftGlow.addSubObject(this.leftGlows[x]);
    }
    this.leftGlow.setAllRendering(false);
    this.leftLight = false;
  }
  setLeftLight(val) {
    this.leftLight = val;
  }
  move(vec) {
    this.frame.move(vec);
  }
  rotate(angle, DT = true) {
    this.angle += angle * (DT ? this.game.DT : 1);

    this.frame.rotate(angle, DT);
  }

  update(dt) {
    if (!(this.angle <= -180 * (Math.PI / 180))) {
      this.rotate(-3.1);
    } else {
      if (
        this.angle <= -180 * (Math.PI / 180) &&
        this.angle > -180.2 * (Math.PI / 180)
      ) {
        this.angle = -180 * (Math.PI / 180);
        this.frame.setAngle(-180 * (Math.PI / 180));
      }
      if (this.angle < -180 * (Math.PI / 180)) {
        this.rotate(0.1);
      }
    }
    this.move([100 * Math.cos(this.angle), 100 * Math.sin(this.angle)]);

    if (this.leftLight) {
      this.leftHead.colour = "orange";
      this.leftGlow.setAllRendering(true);
    } else {
      this.leftHead.colour = "red";
      this.leftGlow.setAllRendering(false);
    }
  }
}
