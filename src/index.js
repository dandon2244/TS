import Camera from "/src/Camera.js";
import * as constants from "./constants.js";
import Car from "./Car.js";
import object from "/src/object.js";
import newObject from "/src/newObjects.js";
import { genKeyFunctions } from "/src/Input.js";
import Point from "/src/Point.js";
class Game {
  constructor() {
    this.mousePos = new Point(0, 0);
    this.canvas = document.getElementById("gameCanvas");
    this.canvas.style.cursor = "url('GreenCursor.png'),auto";
    this.context = this.canvas.getContext("2d");
    this.camera = new Camera(new Point(0.0, 0.0, 0.8), this);
    this.objects = [];

    // console.log(this.o.absPos);
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
    this.cars = [];
    this.cars = [new Car(new Point(100, 100, 1), "purple", this)];
    this.cars.push(new Car(new Point(200, 100, 1), "purple", this));

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
        for (var i = 0; i < _this.cars.length; i++) {
          if (!_this.cars[i].frame.pointWithinRender(_this.mousePos)) {
            _this.cars[i].selected = false;
          }
        }

        _this.mousePos.x = x;
        _this.mousePos.y = y;
      }
    });
    document.addEventListener("keyup", keyUp);
    document.addEventListener("keydown", keyDown);
    document.addEventListener("click", function(e) {
      const rect = _this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (_this.canvas.style.cursor != "auto") {
        _this.canvas.style.cursor = "auto";
      } else _this.canvas.style.cursor = "url('GreenCursor.png'),auto";
      if (
        x >= 0 &&
        y >= 0 &&
        x <= _this.canvas.width &&
        y <= _this.canvas.height
      ) {
        for (var i = 0; i < _this.cars.length; i++) {
          if (_this.cars[i].frame.pointWithinRender(new Point(x, y))) {
            _this.cars[i].selected = !_this.cars[i].selected;
          }
        }
      }
    });

    this.keyFunctions = genKeyFunctions();
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
    // console.log(this.frames);
  }

  update(timestamp) {
    if (this.camera.position.z < 0.5) {
      this.camera.position.z = 0.5;
    }
    this.updateDt();
    g.context.fillStyle = "#fcf2d2";
    g.context.fillRect(0, 0, g.canvas.width, g.canvas.height);
    if (this.running) {
      for (var i = 0; i < this.cars.length; i++) {
        this.cars[i].run();
      }
    }

    for (var i = 0; i < this.cars.length; i++) {
      this.cars[i].update();
    }

    for (var x = 0; x < this.objects.length; x++) {
      this.objects[x].update();
    }

    for (var x = 0; x < this.objects.length; x++) {
      this.objects[x].render();
    }

    for (var x = 0; x < 257; x++) {
      if (this.keys[x] && this.keyFunctions[constants.keyCodes[x]]) {
        this.keyFunctions[constants.keyCodes[x]]("HELD", this);
      }
    }
  }
}

var g = new Game();

var gameLoop = function(timeStamp) {
  g.update();
  requestAnimationFrame(gameLoop);
};

gameLoop();
