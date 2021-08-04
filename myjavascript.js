"use strict";

function getClass(value){
  switch(value){
    case "W":
      return Tiles.Wall;
      break;
    case " ":
      return Tiles.Space;
      break;
    case "G":
      return Tiles.Goal;
      break;    
    case "P":
      return Entities.Character;
      break;
  
    case "B":
      return Entities.Block;
      break;
    case "BG":
      return Entities.BlockDone;
      break;
    case "PG":
      return "player-in-goal";
      break;

}
}

//setp1: draw board 
function drawBoard(){

  //1. clear board
  document.getElementById("game-board").innerHTML ="";

  //2. drow board
  for(let y = 0; y<tileMap01.mapGrid.length;y ++)
  {
    const row = tileMap01.mapGrid[y]
    
    for(let x =0; x<row.length;x++)
    {
      let div = document.createElement("div");
      //every cells has it's unique id
      div.id = `${x},${y}`;
      //add list of classes for each cell
      div.classList.add("tile-space");

      //add new class for styling cell
      if(row[x][0] !==" "){
        div.classList.add( ...row[x][0].split("").map(getClass));
      }

      //add content of each cell
      // div.innerHTML = row[x][0]; // zero denotes content of the row array 
      
      //append child to the node
      document.getElementById("game-board").appendChild(div);
    }    
  }
}

drawBoard();

//setp2: Listening key event from user
document.addEventListener('keydown', onKeyPressListner)

function onKeyPressListner(event){
  event.preventDefault();

  const playerDiv = document.getElementsByClassName(Entities.Character)[0];

  const [x,y] = playerDiv.id.split(",").map(Number);

  switch(event.key){
    case "ArrowUp":
    {
      moveUp(x,y)
      break;
    }
    case "ArrowDown":
    {
      moveDown(x,y);
      break;
    }
    case "ArrowLeft":
    {
      moveLeft(x,y)
      break;
    }
    case "ArrowRight":
    {
      moveRight(x,y)      
      break;
    }
  }
 
}

//step3: move object and replace
function move(x, y, destX, destY)
{
  let from = tileMap01.mapGrid[y][x]
  let to = tileMap01.mapGrid[destY][destX]

  function movingConstraints(movedBody){
    if(from[0] === movedBody  && to[0] === "G")
    {
      from[0] = " ";
      to[0] = `${movedBody}G`
    }else if(from[0] === `${movedBody}G`  && to[0] === "G"){
      from[0] = "G";
      to[0] = `${movedBody}G`
    }  
    else if(from[0] === `${movedBody}G`  && to[0] === " "){
      from[0] = "G";
      to[0] = movedBody;
    }   
    else {
      from[0] = " ";
      to[0] = movedBody;
    }
  }

  //restrict player from entering block and wall
  if(!["W", "B", "BG"].includes(to[0]) ){

    if(from[0].includes("B")){
      movingConstraints("B"); 
    }else{
      movingConstraints("P");
    }
       
    //draw new board with new player position
    drawBoard();
  }
 
}

//move player and block downwords
function moveDown(x,y){

  const target = tileMap01.mapGrid[y][x][0];
  const [destX, destY] = [x, y+1]
  const destination = tileMap01.mapGrid[destY][destX][0];

  if(target.includes("P"))
  {
    if(destination.includes("B"))
    {
      moveDown(destX, destY);
    }
    move(x, y, destX, destY);

  }
  else if(target.includes("B")){
    move(x, y, destX, destY);
  }
}

//move player and block Upwards
function moveUp(x,y){

  const target = tileMap01.mapGrid[y][x][0];
  const [destX, destY] = [x, y-1]
  const destination = tileMap01.mapGrid[destY][destX][0];

  
  if(target.includes("P"))
  {
    if(destination.includes("B"))
    {
        moveUp(destX, destY);
    }
    move(x, y, destX, destY);

  }
  else if(target.includes("B")){
    move(x, y, destX, destY);
  }
}

//move player and block to the left
function moveLeft(x,y){
  
  const target = tileMap01.mapGrid[y][x][0];
  const [destX, destY] = [x-1, y]
  const destination = tileMap01.mapGrid[destY][destX][0];

  
  if(target.includes("P"))
  {
    if(destination.includes("B"))
    {
        moveLeft(destX, destY);
    }
    move(x, y, destX, destY);

  }
  else if(target.includes("B")){
    move(x, y, destX, destY);
  }
}

//move player and block to the right
function moveRight(x,y){

  const target = tileMap01.mapGrid[y][x][0];
  const [destX, destY] = [x+1, y]
  const destination = tileMap01.mapGrid[destY][destX][0];

  
  if(target.includes("P"))
  {
    if(destination.includes("B"))
    {
      moveRight(destX, destY);
    }
    move(x, y, destX, destY);
  }
  else if(target.includes("B")){
    move(x, y, destX, destY);
  }

}