let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let cameraPos = [0, 0];
let cTime = 0;
let lastTime = 0;
let lastSec = 0;
let dt = 0;
let frames = 0;
let position = 10;
let direction = 0;
function update(timestamp) {
  frames++;
  cTime = performance.now();
  dt = cTime - lastTime;
  lastTime = cTime;
  if (lastSec == 0) {
    lastSec = cTime;
  }

  if (cTime - lastSec > 1000) {
    console.log(frames);
    lastSec = cTime;
    frames = 0;
  }
  //console.log(cTime);
  if (!direction) {
    if (position >= 500) {
      direction = 1;
    } else position += 40 / dt;
  }
  if (direction) {
    if (position <= 50) {
      direction = 0;
    } else position -= 40 / dt;
  }
  context.fillStyle = "#fff8c7";
  context.fillRect(0, 0, canvas.clientWidth, canvas.height);
  context.fillStyle = "blue";
  context.fillRect(position - cameraPos[0], 10 - cameraPos[1], 50, 50);
  requestAnimationFrame(update);
}
update();
