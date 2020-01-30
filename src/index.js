import Camera from "/src/Camera.js";
import * as constants from "./constants.js";
import Car from "./Car.js";
import object from "/src/object.js";

class Game {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.context = this.canvas.getContext("2d");
    this.camera = new Camera([0.0, 0.0]);
    this.frames = 0;
    this.cTime = 0;
    this.lastTime = 0;
    this.lastSec = 0;
    this.dt = 0;
    this.objects = [];
    this.keyFunctions = {};
    this.keys = [];
    this.running = false;
    this.keyName = "";
    this.car = new Car([10, 10]);
    for (var x = 0; x < 257; x++) {
      this.keys[x] = false;
    }
    var _this = this;
    function keyDown(e) {
      _this.keyDown(e);
    }
    function keyUp(e) {
      _this.keys[e.keyCode] = false;
    }

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    this.setUpKeyFunctions();
  }
  keyDown(e) {
    this.keyName = constants.keyCodes[e.keyCode];

    if (!this.keys[e.keyCode]) {
      if (this.keyFunctions[this.keyName]) {
        this.keyFunctions[this.keyName]("TAPPED", this);
      }
    }
    this.keys[e.keyCode] = true;
  }

  setUpKeyFunctions() {
    this.keyFunctions["down arrow"] = function(type, obj) {
      obj.camera.move(obj.dt, [0, -1]);
    };
    this.keyFunctions["spacebar"] = function(type, obj) {
      if (type == "TAPPED") {
        obj.running = !obj.running;
      }
    };

    this.keyFunctions["up arrow"] = function(type, obj) {
      obj.camera.move(obj.dt, [0, 1]);
    };
    this.keyFunctions["left arrow"] = function(type, obj) {
      obj.camera.move(obj.dt, [-1, 0]);
    };
    this.keyFunctions["right arrow"] = function(type, obj) {
      obj.camera.move(obj.dt, [1, 0]);
    };
  }
  updateDt() {
    this.frames++;
    this.cTime = performance.now();
    this.dt = this.cTime - this.lastTime;
    this.DT = this.dt / 50;
    this.lastTime = this.cTime;
    if (this.lastSec == 0) {
      this.lastSec = this.cTime;
    }
    if (this.cTime - this.lastSec > 1000) {
      this.secondUpdate();
      this.lastSec = this.cTime;
      this.frames = 0;
    }
  }
  secondUpdate() {
    //console.log(this.frames);
  }

  update(timestamp) {
    this.updateDt();

    for (var x = 0; x < 257; x++) {
      if (this.keys[x] && this.keyFunctions[constants.keyCodes[x]]) {
        this.keyFunctions[constants.keyCodes[x]]("HELD", this);
      }
    }

    this.context.fillStyle = "#fff8c7";
    this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.height);
    if (this.running) {
      this.car.update(this.DT);
    }
    this.car.render(this);
  }
}
var g = new Game();
/** /function gameLoop(timeStamp) {
  g.update(timeStamp);
  requestAnimationFrame(gameLoop);
}**/
//gameLoop();
var j = new object(g, [0, 20], "RECT", [10, 10], "blue");
var k = new object(g, [10, 1], "RECT", [10, 10], "green", [j]);
var i = new object(g, [20, 0.9], "RECT", [10, 10], "red", [k]);
for (var x = 0; x < g.objects.length; x++) {
  g.objects[x].finalInit();
}
g.keyFunctions["spacebar"] = function(TYPE, obj) {
  if ((TYPE = "TAPPED")) {
    //g.running = !g.running;
    console.log(g.camera.position);
  }
};
function gameLoop(timeStamp) {
  g.updateDt();
  g.context.fillStyle = "white";
  g.context.fillRect(0, 0, g.canvas.width, g.canvas.height);
  for (var x = 0; x < g.objects.length; x++) {
    if (g.running) g.objects[x].move([6, 0]);
    g.objects[x].render();
  }
  requestAnimationFrame(gameLoop);
}
gameLoop();
