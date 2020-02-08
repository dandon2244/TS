import * as constants from "./constants.js";
import Vector from "/src/Vector.js";
export function genKeyFunctions() {
  let keyFunctions = {};
  keyFunctions["down arrow"] = function(type, obj) {
    obj.camera.move(new Vector(0, -100, 0));
  };
  keyFunctions["spacebar"] = function(type, obj) {
    if (type == "TAPPED") {
      obj.running = !obj.running;
    }
  };
  keyFunctions["c"] = function(type, obj) {
    if (type == "TAPPED") {
      console.clear();
    }
  };
  keyFunctions["l"] = function(type, obj) {
    if (type == "TAPPED") {
      console.log(obj.cars[0].frame.colliding(obj.cars[1].frame));
      for (var x = 0; x < obj.objects.length; x++) {
        if (obj.objects[x].log) {
          switch (obj.objects[x].colour) {
            case "purple":
              console.log("Purple: ", obj.objects[x].log);
              break;
            case "red":
              //console.log("RED: ", obj.objects[x].log);
              break;
            default:
          }
        }
      }
    }
  };
  keyFunctions["s"] = function(type, obj) {
    if (type == "TAPPED") {
    }
  };
  keyFunctions["i"] = function(type, obj) {
    obj.camera.move(new Vector(0, 0, 1));
  };
  keyFunctions["k"] = function(type, obj) {
    obj.camera.move(new Vector(0, 0, -1));
  };

  keyFunctions["up arrow"] = function(type, obj) {
    obj.camera.move(new Vector(0, 100, 0));
  };
  keyFunctions["left arrow"] = function(type, obj) {
    obj.camera.move(new Vector(-200, 0, 0));
  };
  keyFunctions["right arrow"] = function(type, obj) {
    obj.camera.move(new Vector(200, 0, 0));
  };
  return keyFunctions;
}
