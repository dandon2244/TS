export function rotatePoint(angle, origin, pos) {
  // console.log(pos);
  let a = [];

  var dis = [pos[0] - origin[0], pos[1] - origin[1]];
  if (dis[0] == 0 && dis[1] == 0) {
    return pos;
  }

  var ang = radians(angle);
  var dis2 = [
    Math.cos(ang) * dis[0] - Math.sin(ang) * dis[1],
    Math.sin(ang) * dis[0] + Math.cos(ang) * dis[1]
  ];
  dis = [dis2[0] - dis[0], dis2[1] - dis[1]];

  a[0] = pos[0] + dis[0];
  a[1] = pos[1] + dis[1];
  // console.log(ang);
  return a;
}

export function radians(ang) {
  return (Math.PI * ang) / 180;
}
