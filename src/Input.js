export default class InputHandler {
  constructor() {
    this.keyStates = {};
    for (var i = 0; i < 256; i++) {
      this.keyStates[String.fromCharCode(i)] = "RELEASED";
    }
    document.addEventListener("keydown", event => {
      if (this.keyStates[event.key] == "RELEASED") {
        this.keyStates[event.key] = "TAPPED";
        console.log(this.keyStates["a"]);
        this.keyStates[event.key] = "HELD";
      }
    });
    document.addEventListener("keyup", event => {
      this.keyStates[event.key] = "RELEASED";
    });
  }
  getKeyStates() {
    return this.keyStates;
  }
}
