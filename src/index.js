import Camera from "/src/Camera.js";
import * as constants from "./constants.js";
import * as Input from "./Input";
import Car from "./Car.js";
import object from "./object.js";
import newObject from "./newObjects.js";
import Point from "/src/Point.js";
import Map from "/src/Map.js";
import Road from "./Road.js";
import Vector from "./Vector.js";
class Game {
  constructor() {
    var vec = new Vector(-1, -1);
    console.log(vec.getAngle());
    this.mouseMode = "auto";
    this.road = null;
    this.collisionPairs = { frame: ["frame"], hitbox: ["frame"] };
    this.mousePos = new Point(0, 0);
    this.canvas = document.getElementById("gameCanvas");

    this.context = this.canvas.getContext("2d");
    this.camera = new Camera(new Point(0.0, 0.0, 0.8), this);
    this.roads = [];
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
    this.selected = null;
    this.cars = [new Car(new Point(-200, 0, 1), "purple", this)];
    var x = 0;
    // for (var x = 0; x < 20; x++) {
    this.cars.push(new Car(new Point(100 + x * 100, 0, 1), "purple", this));
    //  }
    /*  for (var x = 0; x < 20; x++) {
      this.cars.push(new Car(new Point(200 + x * 100, 400, 1), "purple", this));
    }*/

    this.map = new Map(this);
    this.map.update();
    this.camera.position = this.map.camPos();
    //  this.camera.position.x = this.cars[0].position.x - this.camera.centre.x;

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
      if (
        x >= 0 &&
        y >= 0 &&
        x <= _this.canvas.width &&
        y <= _this.canvas.height
      ) {
        Input.processMouse(_this, new Point(x, y));
      }
    });

    this.keyFunctions = Input.genKeyFunctions();
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

  roadCreate(point) {
    var Point = this.camera.screenToGamePos(point);
    if (this.road == null) {
      this.road = new Road(this, [point, point]);
    } else {
      this.road.changePoint(point);
      this.road = null;
    }
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
  secondUpdate() {}

  changeMouseMode(type) {
    this.mouseMode = type;
    this.canvas.style.cursor = constants.mouseModes[type];
  }

  update(timestamp) {
    this.cur = Math.random();
    if (this.close > this.cur) {
      this.close = this.cur;
    }
    this.objects.sort(function(a, b) {
      return a.absPos.z - b.absPos.z;
    });
    this.map.update();
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
