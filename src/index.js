let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let cTime = 0;
let lastTime = 0;
let lastSec = 0;
function update() {
  cTime = performance.now();

  //console.log(cTime);

  context.fillStyle = "#fff8c7";
  context.fillRect(0, 0, canvas.clientWidth, canvas.height);
  context.fillStyle = "blue";
  context.fillRect(10, 10, 50, 50);
}
setInterval(update, 10);
