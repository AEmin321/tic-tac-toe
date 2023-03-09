function Gameboard () {
  const cells=9;
  const gameboard=[];

  for (let i=0;i<cells;i++) {
    gameboard.push(cell());
    
  }

  const getBoard=()=>gameboard;

  const dropToken= (cell,player)=> {
    if (gameboard[cell].getValue()!==0) {
      return ;
    }
    gameboard[cell].setValue(player);
  }

  const printBoard =()=> {
    const printWithValues=gameboard.map((cell)=>cell.getValue());
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

  

  const playRound=(cell)=>{
    board.dropToken(cell,activePlayer.token);
    switchActivePlayer();
    console.log(checkWin(board.getBoard(),'X'));
  }

  const printNewRound=()=>{
    board.printBoard();
    console.log (`${getActivePlayer().name}`);
  };


  return {getActivePlayer,playRound,switchActivePlayer,getBoard:board.getBoard};
}

function screenManager () {
  const game=gameManager();

  const switchPlayerDiv=document.querySelector('.active-player');
  const boardDiv=document.querySelector('.board');
  const activePlayer=game.getActivePlayer();
  
  const updateGame=()=>{
    boardDiv.textContent='';
    switchPlayerDiv.textContent=`${activePlayer.name}'s turn.`;
    const board=game.getBoard();
    
    board.forEach((cell,indexc) => {
      const cellDiv=document.createElement('div');
      cellDiv.dataset.cell=indexc;
      cellDiv.classList.add('cell');
      cellDiv.textContent=cell.getValue();
      boardDiv.appendChild(cellDiv);
    });
  }

  boardDiv.addEventListener('click',(e)=>{
    const selectedCell=e.target.dataset.cell;

    game.playRound(selectedCell);
    console.log (selectedCell+" and thats it");

    updateGame();
  })

  updateGame();
}

const game=screenManager();