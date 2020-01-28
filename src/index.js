import Camera from "/src/Camera.js";
import InputHandler from "./Input";

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let camera = new Camera([0, 0]);
let cTime = 0;
let lastTime = 0;
let lastSec = 0;
let dt = 0;
let frames = 0;
let position = 10;
let inputHandle = new InputHandler();
let direction = 0;
var keyStates;

function update(timestamp) {
  keyStates = inputHandle.getKeyStates();
  frames++;
  cTime = performance.now();
  dt = cTime - lastTime;
  lastTime = cTime;
  if (lastSec == 0) {
    lastSec = cTime;
  }
  console.log(keyStates["up"]);

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
