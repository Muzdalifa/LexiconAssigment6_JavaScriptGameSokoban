function drawBoard(){

  //1. clear board
  document.getElementById("game-board").innerHTML =""

  //2. drow board
  for(let y = 0; y<tileMap01.mapGrid.length;y ++)
  {
    //console.log(tileMap01.mapGrid[y]);
    const row = tileMap01.mapGrid[y]
    
    for(let x =0; x<row.length;x++)
    {
      //console.log(row[x]);
      let div = document.createElement("div");
      //every cells has it's unique id
      div.id = `${x},${y}`;
      //add list of classes for each cell
      div.classList.add("board-cell");

      //add new class for styling cell
      if(row[x][0] !==" "){
        div.classList.add( ...row[x][0].split("").map(v=>v.toLowerCase()));
      }

      //add content of each cell
      div.innerHTML = row[x][0]; // zero denotes content of the row array 
      //append child to the node
      document.getElementById("game-board").appendChild(div);
    }    
  }
}

drawBoard();

document.addEventListener('keydown', onKeyPressListner)

function onKeyPressListner(event){
  //console.log(event);
  event.preventDefault();

  //move()
  playerDiv = document.getElementsByClassName("p")[0];

  //console.log(playerDiv.id)

  const [x,y] = playerDiv.id.split(",").map(Number);
  // console.log(i);
  // console.log(j); 

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

//move(currentXPos, currentYPos, destX,destY )
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

function moveDown(x,y){

  const target = tileMap01.mapGrid[y][x][0];
  const [destX, destY] = [x, y+1]
  const destination = tileMap01.mapGrid[destY][destX][0];

  
  if(target.includes("P"))
  {
    console.log("moving P")
    if(destination.includes("B"))
    {
      moveDown(destX, destY);
    }
    move(x, y, destX, destY);

  }
  else if(target.includes("B")){
    console.log("moving B")
    move(x, y, destX, destY);
  }
}


function moveUp(x,y){

  const target = tileMap01.mapGrid[y][x][0];
  const [destX, destY] = [x, y-1]
  const destination = tileMap01.mapGrid[destY][destX][0];

  
  if(target.includes("P"))
  {
    console.log("moving P")
    if(destination.includes("B"))
    {
        moveUp(destX, destY);
    }
    move(x, y, destX, destY);

  }
  else if(target.includes("B")){
    console.log("moving B")
    move(x, y, destX, destY);
  }
}

function moveLeft(x,y){

  const target = tileMap01.mapGrid[y][x][0];
  const [destX, destY] = [x-1, y]
  const destination = tileMap01.mapGrid[destY][destX][0];

  
  if(target.includes("P"))
  {
    console.log("moving P")
    if(destination.includes("B"))
    {
        moveLeft(destX, destY);
    }
    move(x, y, destX, destY);

  }
  else if(target.includes("B")){
    console.log("moving B")
    move(x, y, destX, destY);
  }
}

function moveRight(x,y){

  const target = tileMap01.mapGrid[y][x][0];
  const [destX, destY] = [x+1, y]
  const destination = tileMap01.mapGrid[destY][destX][0];

  
  if(target.includes("P"))
  {
    console.log("moving P")
    if(destination.includes("B"))
    {
      moveRight(destX, destY);
    }
    move(x, y, destX, destY);

  }
  else if(target.includes("B")){
    console.log("moving B")
    move(x, y, destX, destY);
  }

}