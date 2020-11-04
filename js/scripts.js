var element, piece, moveCounter = 0, board = [];

// Esconde o botão "Jogar" e exibe o tabuleiro
function startGame(piece) { 
  document.getElementById('game-container').style.display = 'grid';
  document.getElementById('start-container').style.display = 'none';

  this.piece = piece;

  // Se for par, será mostrado que o primeiro movimento é do O, se for ímpar, do X
  if(piece%2 === 0) {
    document.getElementById('player-turn').innerText = 'O'; 
  } else {
    document.getElementById('player-turn').innerText = 'X';
  }
}

// Cria a interface de botões que funcionam como o tabuleiro
function generateButtons() {
  var content = '';
  for(var i = 0; i < 9; i++) {
    content += (
      `<div class="grid-item" > <button id="btn${i}" onclick="setPiece(${i})"></button> </div>`
    );
  }
  document.getElementById('game-container').innerHTML = content;
}

// Coloca a peça que foi jogada no tabuleiro e chama a função checkWinner
function setPiece(position){
  element = document.getElementById('btn' + position);
  // Desabilita a posição que foi jogada
  element.disabled = true;

  // Se for ímpar a peça X será jogada, se for par, será a peça O
  if(piece%2 == 0) {
    element.innerHTML = 'O';
    board[position] = 'O';
    document.getElementById('player-turn').innerText = 'X'
  } else {
    element.innerHTML = 'X';
    board[position] = 'X';
    document.getElementById('player-turn').innerText = 'O'
  }
  piece++;
  moveCounter++;

  var winner = checkWinner(); 
  // Se der velha ou houver um vencedor a função updateScore é chamada
  if(winner) {
    updateScore(winner);
  } else if(moveCounter > 8) {
    updateScore('');
  }  
}

// Checa se houve um vencedor e retorna a peça vencedora
function checkWinner() {
  var i;

  // Checar na horizontal
  for(i = 0; i < 7; i+=3) {
    if(board[i] === board[i+1] && board[i] === board[i+2]){
      return board[i];
    }
  }
  // Chegar na vertical
  for(i = 0; i < 3; i++) {
    if(board[i] === board[i+3] && board[i] === board[i+6]){
      return board[i];
    }
  }
  // Checar na diagonal
  if(board[0] === board[4] && board[0] === board[8]){
    return board[0];
  }
  // Checar na diagona inversa
  if(board[2] === board[4] && board[2] === board[6]){
    return board[2];
  }

  return '';
}

// Atualiza o placar do jogo, avisa o jogador e chama a função restartGame
function updateScore(winner) {
  if(winner === 'X') {
    element = document.getElementById('x-score');
    alert(`${winner} ganhou!`);
  } else if(winner === 'O') {
    element = document.getElementById('o-score');
    alert(`${winner} ganhou!`);
  } else {
    element = document.getElementById('draw-score')
    alert('Deu velha!');
  }
  
  element.innerText = parseInt(element.textContent) + 1;

  restartGame();
}

// Define a configuração inicial dos elementos e chama a função generateButtons
function restartGame() {
  // Reset no contador de movimentos
  moveCounter = 0;

  // Reset no tabuleiro
  board.splice(0, 9, '');
  
  // Reset nos componentes de interface do tabuleiro
  document.getElementById('start-container').style.display = 'block';
  document.getElementById('game-container').style.display = 'none';

  // Simula um click no botão inicial
  document.getElementById('start-button').click();

  generateButtons();
}

// Reinicia o placar
function resetScore() {
  document.getElementById('x-score').innerText = '0';
  document.getElementById('o-score').innerText = '0';
  document.getElementById('draw-score').innerText = '0';
}

