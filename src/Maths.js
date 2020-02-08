import "/src/Point.js";
export function cos(angle) {
  return Math.cos((angle * Math.PI) / 180);
}
export function sin(angle) {
  return Math.sin((angle * Math.PI) / 180);
}
export function normalize(vec) {
  var mag = vec.x * vec.x + vec.y * vec.y;
  return vec.times(1 / mag);
}
