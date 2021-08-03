function addBoardCell(){
  for(let i = 0; i<tileMap01.mapGrid.length;i ++)
  {
    //console.log(tileMap01.mapGrid[i]);
    const row = tileMap01.mapGrid[i]
    
    for(let j =0; j<row.length;j++)
    {
      //console.log(row[j]);
      let div = document.createElement("div");
      //every cells has it's unique id
      div.id = `${i},${j}`;
      //add list of classes for each cell
      div.classList.add("board-cell");
      //add content of each cell
      div.innerHTML = row[j][0]; // zero denotes content of the row array 
      //append child to the node
      document.getElementById("game-board").appendChild(div);
    }    
  }
}

addBoardCell();