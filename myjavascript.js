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
        div.classList.add( row[x][0].toLowerCase());
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

function move(x, y, destX, destY)
{

  if(!["W", "B"].includes(tileMap01.mapGrid[destY][destX][0]) )
  {
    tileMap01.mapGrid[destY][destX][0] = tileMap01.mapGrid[y][x][0];
    // assign empty array player to the current position
    tileMap01.mapGrid[y][x][0] = " "; 
    //draw new board with new player position
    drawBoard();
  }
 
}

function moveDown(x,y){

  const target = tileMap01.mapGrid[y][x][0];
  const [destX, destY] = [x, y+1]
  const destination = tileMap01.mapGrid[destY][destX][0];

  
  if(target === "P")
  {
    console.log("moving P")
    if(destination === "B")
    {
      moveDown(destX, destY);
    }
    move(x, y, destX, destY);

  }
  else if(target==="B"){
    console.log("moving B")
    move(x, y, destX, destY);
  }
}


function moveUp(x,y){

  const target = tileMap01.mapGrid[y][x][0];
  const [destX, destY] = [x, y-1]
  const destination = tileMap01.mapGrid[destY][destX][0];

  
  if(target === "P")
  {
    console.log("moving P")
    if(destination === "B")
    {
        moveUp(destX, destY);
    }
    move(x, y, destX, destY);

  }
  else if(target==="B"){
    console.log("moving B")
    move(x, y, destX, destY);
  }
}

function moveLeft(x,y){

  const target = tileMap01.mapGrid[y][x][0];
  const [destX, destY] = [x-1, y]
  const destination = tileMap01.mapGrid[destY][destX][0];

  
  if(target === "P")
  {
    console.log("moving P")
    if(destination === "B")
    {
        moveLeft(destX, destY);
    }
    move(x, y, destX, destY);

  }
  else if(target==="B"){
    console.log("moving B")
    move(x, y, destX, destY);
  }
}

function moveRight(x,y){

  const target = tileMap01.mapGrid[y][x][0];
  const [destX, destY] = [x+1, y]
  const destination = tileMap01.mapGrid[destY][destX][0];

  
  if(target === "P")
  {
    console.log("moving P")
    if(destination === "B")
    {
      moveRight(destX, destY);
    }
    move(x, y, destX, destY);

  }
  else if(target==="B"){
    console.log("moving B")
    move(x, y, destX, destY);
  }

}