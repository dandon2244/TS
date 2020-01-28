import * as constants from "./constants.js";

export default class InputHandler {
  constructor(doSomething) {
    this.keyStates = {};
    for (var i = 0; i < 256; i++) {
      this.keyStates[constants.keyCodes[i]] = "RELEASED";
    }
    document.addEventListener("keydown", event => {
      if (!event.repeat) {
        doSomething(event.key, "TAPPED");
      } else {
        doSomething(event.key, "HELD");
      }
    });
    document.addEventListener("keyup", event => {
      this.keyStates[constants.keyCodes[event.keyCode]] = "RELEASED";
    });
  }
  getKeyStates() {
    return this.keyStates;
  }
}
