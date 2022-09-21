/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-useless-return */
/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */

import { Gameboard } from './gameboard';
import { Player } from './player';
import { Computer } from './computer';
import { DOM } from './DOM';
import { Ship } from './ship';

export const Gameflow = (() => {
  const player = Player();
  let playerMaster = Gameboard();
  const playerAttack = Gameboard();
  const computer = Computer();
  let computerMaster = Gameboard();
  const computerAttack = Gameboard();
  let activeShip = Ship(5);
  activeShip.setName('Carrier');
  let axis = 'x';

  const startGame = (event) => {
    if (event) playerMaster = computer.randomizeBoard();
    computerMaster = computer.randomizeBoard();
    DOM.startGame(playerMaster);
  };

  const switchAxis = (event) => {
    event.preventDefault();
    if (axis === 'x') {
      axis = 'y';
      DOM.switchAxis(axis);
    } else {
      axis = 'x';
      DOM.switchAxis(axis);
    }
  };

  const placeShip = (event) => {
    const xpos = event.target.dataset.xpos;
    const ypos = event.target.dataset.ypos;
    if (playerMaster.canShipBePlaced(activeShip, parseInt(xpos), parseInt(ypos), axis) === false) return;
    playerMaster.placeShip(activeShip, parseInt(xpos), parseInt(ypos), axis);
    if (activeShip.setName() === 'Destroyer') return startGame();
    activeShip = DOM.placeShip(event);
  };

  const resetBoardColors = () => {
    DOM.resetBoardColors(playerMaster);
  };

  const hoverPlayerForm = (event) => {
    DOM.hoverPlayerForm(event, playerMaster);
  };

  const turn = (event) => {
    event.target.removeEventListener('click', Gameflow.turn);
    const xpos = parseInt(event.target.dataset.xpos);
    const ypos = parseInt(event.target.dataset.ypos);
    const playerResult = player.turn(playerAttack, computerMaster, xpos, ypos);
    if (typeof playerResult === 'object') {
      DOM.hitEffect(event.target, 'hit');
      if (computerMaster.isAllSunk() === true) {
        const winnerOverlay = document.getElementById('overlayWinner');
        const winnerText = document.getElementById('winner').children[0];
        winnerText.textContent = 'Player Won!';
        winnerOverlay.classList.remove('inactive');
        winnerOverlay.classList.add('active');
        return;
      }
    } else {
      DOM.hitEffect(event.target, 'miss');
    }

    const computerResult = computer.turn(computerAttack, playerMaster);
    if (typeof computerResult[2] === 'object') {
      const index = computerResult[0] + (computerResult[1] * 10);
      console.log(index);
      const masterPiece = document.getElementById('player-master').children[index];
      DOM.hitEffect(masterPiece, 'hit');
      if (playerMaster.isAllSunk() === true) {
        const winnerOverlay = document.getElementById('overlayWinner');
        const winnerText = document.getElementById('winner').children[0];
        winnerText.textContent = 'Computer Won!';
        winnerOverlay.classList.remove('inactive');
        winnerOverlay.classList.add('active');
      }
    } else {
      const index = computerResult[0] + computerResult[1] + 1;
      const masterPiece = document.getElementById('player-master').children[index];
      DOM.hitEffect(masterPiece, 'miss');
      console.log(playerMaster.giveHeadOfShips());
    }
  };

  return {
    switchAxis, placeShip, startGame, resetBoardColors, hoverPlayerForm, turn,
  };
})();

DOM.loadBoard();
window.addEventListener('resize', DOM.loadBoard);
document.querySelector('.rotate').addEventListener('click', Gameflow.switchAxis);
document.querySelector('.randomize').addEventListener('click', Gameflow.startGame);
document.getElementById('board-container').addEventListener('mouseout', Gameflow.resetBoardColors);
