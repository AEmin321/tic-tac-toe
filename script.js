function Gameboard () {
  const cells=9;
  const gameboard=[];

  for (let i=0;i<cells;i++) {
    gameboard.push(0);
    
  }

  const getBoard=()=>gameboard;

  const dropToken= (cell,player)=> {
    if (gameboard[cell]!==0) {
      return ;
    }
    gameboard[cell]=player;
  }

  const printBoard =()=> {
    const printWithValues=gameboard.map((cell)=>cell);
    console.log(printWithValues);
  }

  return {dropToken,printBoard,getBoard};
}

function gameManager () {
  const players=[
    {
      name:'You ara X',
      token:'X'
    },
    {
      name:'You are O',
      token:'O'
    }
  ];

  const board=Gameboard();

  let activePlayer=players[0];

  const switchActivePlayer=()=>{
    activePlayer=activePlayer===players[0] ? players[1] : players[0];
  }

  const getActivePlayer=()=>activePlayer;


  const checkWin=(board,player)=>{
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
     ];
  
     for (let combo of winningCombos) {
      const [a,b,c] = combo;
      console.log (board[a]);
       if (board[a] && board[a] === board[b] && board[a] === board[c]) {
         return true; // combination found
       }
     }
  
     return false; // no combination found 
  }

  const playRound=(cell)=>{
    board.dropToken(cell,activePlayer.token);
    switchActivePlayer();
    console.log(checkWin(board.getBoard(),activePlayer.token));
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
  let activePlayer=game.getActivePlayer().name;
  
  const updateGame=()=>{
    boardDiv.textContent='';
    switchPlayerDiv.textContent=`${activePlayer}'s turn.`;
    const board=game.getBoard();
    
    board.forEach((cell,indexc) => {
      const cellDiv=document.createElement('div');
      cellDiv.dataset.cell=indexc;
      cellDiv.classList.add('cell');
      cellDiv.textContent=cell;
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