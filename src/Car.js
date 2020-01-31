import object from "./object.js";

export default class Car {
  constructor(position, colour, game) {
    this.position = position;
    this.colour = colour;
    this.frame = new object(game, position, "RECT", [50, 30], this.colour);
    this.window = new object(
      game,
      [this.frame.size[0], 10, 1],
      "RECT",
      [30, 30],
      "grey"
    );
    this.frame.addSubObject(this.window);
  }
  move(vec) {
    this.frame.move(vec);
  }
  update(dt) {
    this.move(dt, [5, 0]);
  }
  render(game) {}
}
