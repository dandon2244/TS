import Point from "/src/Point.js";
import * as Maths from "/src/Maths.js";
export function rotatePoint(angle, origin, pos) {
  var dis = pos.minus(origin);
  if (dis.x == 0 && dis.y == 0) {
    return pos;
  }
  var ang = -radians(angle);
  var dis2 = new Point(
    Math.cos(ang) * dis.x - Math.sin(ang) * dis.y,
    Math.sin(ang) * dis.x + Math.cos(ang) * dis.y
  );
  dis = dis2.minus(dis);
  return pos.add(dis);
}

export function radians(ang) {
  return (Math.PI * ang) / 180;
}
export function isColliding(rect1, rect2) {
  var points1 = rect1.getPoints();
  var points2 = rect2.getPoints();
  var axes = getAxes(rect1);
  axes = axes.concat(getAxes(rect2));
  axes = axes.map(x => Maths.normalize(x));
  for (var a = 0; a < axes.length; a++) {
    var min1 = Math.min.apply(null, points1.map(p => p.dotProduct(axes[a])));
    var max1 = Math.max.apply(null, points1.map(p => p.dotProduct(axes[a])));
    //console.log(min1, max1);
    // console.log();
    var min2 = Math.min.apply(null, points2.map(p => p.dotProduct(axes[a])));
    var max2 = Math.max.apply(null, points2.map(p => p.dotProduct(axes[a])));
    //  console.log(min2, max2);
    if (max2 < min1 || max1 < min2) {
      return false;
    }
  }
  //axes.map(x => console.log(x.toString()));
  return true;
}

function getAxes(rect) {
  return [
    new Point(Maths.cos(-rect.angle), Maths.sin(-rect.angle)),
    new Point(Maths.cos(-rect.angle + 90), Maths.sin(-rect.angle + 90))
  ];
}
