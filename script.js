function Gameboard () {
  const column=3;
  const rows=3;
  const gameboard=[];

  for (let i=0;i<rows;i++) {
    gameboard[i]=[];
    for (let j=0;j<column;j++) {
      gameboard[j].push(cell());
    }
  }

  const printBoard =()=> {
    const printWithValues=gameboard.map((row)=>row.map((cell)=>cell.getValue()));
    console.log (printWithValues);
  }
}

function cell () {
  let value=0;
  const setValue=(player)=> {
    value=player;
  }

  const getValue=()=>value;
  return {setValue,getValue};
}