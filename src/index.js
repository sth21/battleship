/* eslint-disable import/prefer-default-export */

import { Gameboard } from './gameboard';
import { Player } from './player';
import { Computer } from './computer';
import { DOM } from './DOM';

export const Gameflow = (() => {
  let player;
  let playerMaster;
  let playerAttack;
  let computer;
  let computerMaster;
  let computerAttack;

  const startGame = (event) => {
    event.preventDefault();

    // Declare player / player boards
    player = Player();
    playerMaster = Gameboard();
    playerAttack = Gameboard();

    // Declare computer / computer boards
    computer = Computer();
    computerMaster = Gameboard();
    computerAttack = Gameboard();

    // Use submit board to render player board
    renderPlayerBoard(event, playerMaster);
    // Randomly create computer board
    // Remove form from DOM, render two boards to represent the playerAttack / computerAttack boards
  };

  const renderPlayerBoard = (event, board) => {

  };

  return { startGame };
})();

window.addEventListener('load', DOM.loadBoard);
