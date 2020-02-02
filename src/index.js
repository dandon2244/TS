import Camera from "/src/Camera.js";
import * as constants from "./constants.js";
import Car from "./Car.js";
import object from "/src/object.js";

function pausecomp(millis) {
  var date = new Date();
  var curDate = null;
  do {
    curDate = new Date();
  } while (curDate - date < millis);
}

class Game {
  constructor() {
    this.mousePos = [0, 0];
    this.canvas = document.getElementById("gameCanvas");
    this.context = this.canvas.getContext("2d");
    this.camera = new Camera([0.0, 0.0, 1], this);
    this.objects = [];
    this.suObjects = [];
    this.frames = 0;
    this.cTime = 0;
    this.lastTime = 0;
    this.lastSec = 0;
    this.dt = 0;
    this.DT = 0;
    this.objects = [];
    this.keyFunctions = {};
    this.keys = [];
    this.running = false;
    this.keyName = "";

    this.car = new Car([100, 100, 1], "purple", this);
    this.car.setLeftLight(true);
    this.lastPosition = this.car.frame.gamePos.slice();
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
    document.addEventListener("mousemove", function(e) {
      const rect = _this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (
        x >= 0 &&
        y >= 0 &&
        x <= _this.canvas.width &&
        y <= _this.canvas.height
      ) {
        _this.mousePos[0] = x;
        _this.mousePos[1] = y;
      }
    });
    document.addEventListener("keyup", keyUp);
    document.addEventListener("keydown", keyDown);
    document.addEventListener("click", function(e) {
      const rect = _this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if ((x >= 0) & (y >= 0)) {
        // console.log(_this.car.frame.screenPos);
        if (_this.car.frame.pointWithinRender(x, y)) {
          if (_this.car.selectedFrame.transparency == 0) {
            _this.car.selectedFrame.transparency = 0.7;
          } else {
            _this.car.selectedFrame.transparency = 0;
          }
        }
      }
    });

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
      obj.camera.move([0, -100, 0]);
    };
    this.keyFunctions["spacebar"] = function(type, obj) {
      if (type == "TAPPED") {
        obj.running = !obj.running;
      }
    };
    this.keyFunctions["c"] = function(type, obj) {
      if (type == "TAPPED") {
        console.clear();
      }
    };
    this.keyFunctions["l"] = function(type, obj) {
      if (type == "TAPPED") {
        for (var x = 0; x < obj.objects.length; x++) {
          if (obj.objects[x].log) console.log(obj.objects[x].log);
        }
      }
    };
    this.keyFunctions["s"] = function(type, obj) {
      if (type == "TAPPED") {
        console.log(obj.car.frame.screenPos[0]);
      }
    };
    this.keyFunctions["i"] = function(type, obj) {
      obj.camera.move([0, 0, 1]);
    };
    this.keyFunctions["k"] = function(type, obj) {
      obj.camera.move([0, 0, -1]);
    };

    this.keyFunctions["up arrow"] = function(type, obj) {
      obj.camera.move([0, 100, 0]);
    };
    this.keyFunctions["left arrow"] = function(type, obj) {
      obj.camera.move([-200, 0, 0]);
    };
    this.keyFunctions["right arrow"] = function(type, obj) {
      obj.camera.move([200, 0, 0]);
    };
  }
  updateDt() {
    this.frames++;
    this.cTime = performance.now();
    this.dt = this.cTime - this.lastTime;
    this.DT = this.dt / 1000;
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
    console.log(this.mousePos);
  }

  update(timestamp) {
    this.updateDt();
    if (this.running) {
      this.car.update();
      for (var x = 0; x < this.objects.length; x++) {
        this.objects[x].update();
      }
    }
    g.context.fillStyle = "#fcf2d2";
    g.context.fillRect(0, 0, g.canvas.width, g.canvas.height);
    for (var x = 0; x < this.objects.length; x++) {
      this.objects[x].render();
    }

    for (var x = 0; x < 257; x++) {
      if (this.keys[x] && this.keyFunctions[constants.keyCodes[x]]) {
        this.keyFunctions[constants.keyCodes[x]]("HELD", this);
      }
    }
    //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    requestAnimationFrame(gameLoop);
  }
}
var g = new Game();

g.setUpKeyFunctions();
function gameLoop(timeStamp) {
  g.update();
}
gameLoop();
