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
  const playerMaster = Gameboard();
  const playerAttack = Gameboard();
  const computer = Computer();
  const computerMaster = Gameboard();
  const computerAttack = Gameboard();
  let activeShip = Ship(5);
  activeShip.setName('Carrier');
  let axis = 'x';

  const renderPlayerBoard = (event, board) => {

  };

  const startGame = () => {
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

  return {
    switchAxis, placeShip, startGame, resetBoardColors, hoverPlayerForm,
  };
})();

DOM.loadBoard();
window.addEventListener('resize', DOM.loadBoard);
document.querySelector('.rotate').addEventListener('click', Gameflow.switchAxis);
document.getElementById('board-container').addEventListener('mouseout', Gameflow.resetBoardColors);
