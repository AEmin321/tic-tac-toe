function Gameboard () {
  const cells=9;
  let gameboard=['','','','','','','','',''];

  const resetBoard=()=>{
    gameboard=['','','','','','','','',''];
  }

  const getBoard=()=>gameboard;

  const dropToken= (cell,player)=> {
    if (gameboard[cell]!=='') {
      return ;
    }
    gameboard[cell]=player;
  }

  const printBoard =()=> {
    const printWithValues=gameboard.map((cell)=>cell);
    console.log(printWithValues);
  }
  return {resetBoard,dropToken,printBoard,getBoard};
}


function gameManager () {
  const players=[
    {
      name:'Player1',
      token:'X',
      score:0
    },
    {
      name:'Player2',
      token:'O',
      score:0
    }
  ];
  const getPlayers=()=>players;
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

  const isFull=(board)=>{
    if (board.includes('')){
      return false;
    }
    return true;
  }

  const playRound=(cell)=>{
    board.dropToken(cell,activePlayer.token);
    switchActivePlayer();
  }

  const printNewRound=()=>{
    board.printBoard();
    console.log (`${getActivePlayer().name}`);
  };
  return {getPlayers,getActivePlayer,playRound,isFull,checkWin,getBoard:board.getBoard,reset:board.resetBoard};
}


function screenManager () {
  const game=gameManager();
  const switchPlayerDiv=document.querySelector('.active-player');
  const boardDiv=document.querySelector('.board');
  const winnerOverlay=document.querySelector('.winner-overlay');
  const roundWinner=document.querySelector('.round-winner');
  const newGameBtn=document.querySelector('.new-game');
  const newRoundBtn=document.querySelector('.new-round');
  const player1Score=document.querySelector('.player1-score');
  const player2Score=document.querySelector('.player2-score');

  const handleScore=()=>{
    let players=game.getPlayers();
    if (game.getActivePlayer()===players[0]) {
      players[1].score++;
    }
    else {
      players[0].score++;
    }
  }

  const handleWinner=()=>{
    if (game.checkWin(game.getBoard())){
      winnerOverlay.style.display='flex';
      roundWinner.textContent=`${game.getActivePlayer().token==='X'?'O':'X'} won the round.`;
      handleScore();
    }
    if (game.isFull(game.getBoard())){
      winnerOverlay.style.display='flex';
      roundWinner.textContent="It's a tie.";
    }
  }

  newRoundBtn.addEventListener('click',()=>{
    winnerOverlay.style.display='none';
    reset();
    updateGame();
  })

  newGameBtn.addEventListener('click',()=>{
    winnerOverlay.style.display='none';
    let players=game.getPlayers();
    players[0].score=0;
    players[1].score=0;
    reset();
    updateGame();
  });

  const reset=()=>{
    game.reset();
    
    console.log (game.getBoard());
    player1Score.textContent='0';
    player2Score.textContent='0';
  }

  const updateGame=()=>{
    let players=game.getPlayers();
    const activePlayer=game.getActivePlayer();
    player1Score.textContent=players[0].score;
    player2Score.textContent=players[1].score;

    boardDiv.textContent='';
    console.log (activePlayer);
    switchPlayerDiv.textContent=`${activePlayer.token}'s turn.`;
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

    handleWinner();
    updateGame();
  })
  updateGame();
}
const game=screenManager();