import * as constants from "./constants.js";
import Vector from "./Vector.js";
import Point from "./Point.js";
export function genKeyFunctions() {
  let keyFunctions = {};
  keyFunctions["down arrow"] = function(type, game) {
    game.camera.move(new Vector(0, -100, 0));
  };
  keyFunctions["spacebar"] = function(type, game) {
    if (type == "TAPPED") {
      game.running = !game.running;
    }
  };
  keyFunctions["c"] = function(type, game) {
    if (type == "TAPPED") {
      console.clear();
    }
  };
  keyFunctions["r"] = function(type, game) {
    if (type == "TAPPED") {
      if (game.selected == null) {
        if (game.mouseMode != "roadGreen") {
          game.changeMouseMode("roadGreen");
        } else {
          game.changeMouseMode("auto");
        }
      } else {
        game.selected.delete();
        game.selected = null;
      }
    }
  };
  keyFunctions["d"] = function(type, game) {
    if (type == "TAPPED") {
      if (game.roads[game.roads.length - 1]) {
        game.roads[game.roads.length - 1].delete();
      }
    }
  };

  keyFunctions["l"] = function(type, game) {};
  keyFunctions["s"] = function(type, game) {
    if (type == "TAPPED") {
      console.log(game.roads[0].mRoad.angle);
    }
  };
  keyFunctions["h"] = function(type, game) {
    if (type == "TAPPED") {
      game.cars.forEach(function(o, index) {
        o.hitBox.rendering = !o.hitBox.rendering;
      });
    }
  };
  keyFunctions["i"] = function(type, game) {
    game.camera.move(new Vector(0, 0, 1));
  };
  keyFunctions["k"] = function(type, game) {
    game.camera.move(new Vector(0, 0, -1));
  };

  keyFunctions["up arrow"] = function(type, game) {
    game.camera.move(new Vector(0, 100, 0));
  };
  keyFunctions["left arrow"] = function(type, game) {
    game.camera.move(new Vector(-200, 0, 0));
  };
  keyFunctions["right arrow"] = function(type, game) {
    game.camera.move(new Vector(200, 0, 0));
  };
  return keyFunctions;
}

export function processMouse(game, point) {
  if (game.mouseMode == "auto") {
    for (var i = 0; i < game.cars.length; i++) {
      if (game.cars[i].frame.pointWithinRender(point)) {
        game.cars[i].select(!game.cars[i].selected);
        if (game.cars[i].selected) {
          game.selected = game.cars[i];
        } else {
          game.selected = null;
        }
      }
    }
  }
  if (game.mouseMode == "roadGreen") {
    game.roadCreate(game.camera.screenToGamePos(point));
  }
}
