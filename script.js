function Gameboard () {
  const column=3;
  const rows=3;
  const gameboard=[];

  for (let i=0;i<rows;i++) {
    gameboard[i]=[];
    for (let j=0;j<column;j++) {
      gameboard[i].push(cell());
    }
  }

  const getBoard=()=>gameboard;

  const dropToken= (row,column,player)=> {
    if (gameboard[row][column].getValue()!==0) {
      return ;
    }
    gameboard[row][column].setValue(player);
  }

  const printBoard =()=> {
    const printWithValues=gameboard.map((row)=>row.map((cell)=>cell.getValue()));
    console.log(printWithValues);
  }

  return {dropToken,printBoard,getBoard};
}

function cell () {
  let value=0;
  const setValue=(player)=> {
    value=player;
  }

  const getValue=()=>value;
  return {setValue,getValue};
}

function gameManager () {
  const players=[
    {
      name:'Player1',
      token:'X'
    },
    {
      name:'Player2',
      token:'O'
    }
  ];

  const board=Gameboard();

  let activePlayer=players[0];
  const getActivePlayer=()=>activePlayer;

  const switchActivePlayer=()=>{
    activePlayer=activePlayer===players[0]?players[1]:players[0];
  }

  const playRound=(row,column)=>{
    board.dropToken(row,column,activePlayer.token);
    printNewRound();
  }

  const printNewRound=()=>{
    board.printBoard();
    console.log (`${getActivePlayer().name}`);
  };

  playRound(0,0);
  switchActivePlayer();
  printNewRound();
  playRound(0,0);
}

const game=gameManager();