export default class Car{
constructor(position){
  this.position = position;
  this.colour = "blue";
}
move(dt,vec){
this.position[0]+= vec[0]*dt;
this.position[1]+= vec[1]*dt;
}
update(dt){
  this.move(dt,[5,0]);
}
render(game){
game.context.fillStyle = this.colour;
game.context.fillRect(
      this.position[0] - game.camera.pos[0],
      this.position[1]+ game.camera.pos[1],
      50,
      50
    );
}
};