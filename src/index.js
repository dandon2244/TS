import Camera from "/src/Camera.js";
import InputHandler from "./Input";

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let camera = new Camera([0.0, 0.0]);
let cTime = 0;
let lastTime = 0;
let lastSec = 0;
let dt = 0;
let frames = 0;
let position = 10;

let direction = 0;
var keyState;
keyState = {
  down: {}, // True if key is down
  toggle: {}, // toggles on key up
  changed: {} // True if key state changes. Does not set back false
  // or you will lose a change
};

function keyHandler(e) {
  // simple but powerful
  if (keyState.down[e.code] !== (e.type === "keydown")) {
    keyState.changed = true;
  }
  keyState.down[e.code] = e.type === "keydown";
  if (e.type === "keyup") {
    keyState.toggle[e.code] = !keyState.toggle[e.code];
  }
}
document.addEventListener("keydown", keyHandler);
document.addEventListener("keyup", keyHandler);
//let inputHandle = new InputHandler(doSomething);

function update(timestamp) {
  //keyStates = inputHandle.getKeyStates();
  frames++;
  cTime = performance.now();
  dt = cTime - lastTime;
  lastTime = cTime;
  if (lastSec == 0) {
    lastSec = cTime;
  }
  if (keyState.down.LeftArrow) {
    // && keyState.changed.LeftArrow) {
    console.log("som");
  }
  //  keyState.changed.LeftArrow = false; // Clear it  so we can detect next change
  if (cTime - lastSec > 1000) {
    //console.log(frames);
    lastSec = cTime;
    frames = 0;
  }

  context.fillStyle = "#fff8c7";
  context.fillRect(0, 0, canvas.clientWidth, canvas.height);
  context.fillStyle = "blue";
  context.fillRect(position - camera.pos[0], 10 - camera.pos[1], 50, 50);
  requestAnimationFrame(update);
}
update();
