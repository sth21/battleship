/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */

import { Ship } from './ship';
import { Gameboard } from './gameboard';

export const Computer = () => {
  const selectPosition = (computerAttack) => {
    const options = computerAttack.getEmptySquares();
    const selection = options[Math.floor(Math.random() * options.length)];
    return selection.position;
  };

  const selectAxis = () => {
    const number = Math.round(Math.random());
    return (number === 0) ? 'x' : 'y';
  };

  const turn = (computerAttack, playerMaster) => {
    const square = selectPosition(computerAttack);
    const xpos = square[0];
    const ypos = square[1];
    const masterSquare = playerMaster.getBoardSquare(xpos, ypos);
    const attackSquare = computerAttack.getBoardSquare(xpos, ypos);
    const hitOrMiss = computerAttack.recieveAttack(masterSquare, attackSquare);
    return [xpos, ypos, hitOrMiss];
  };

  const randomizeBoard = () => {
    const computerMaster = Gameboard();
    const queue = [Ship(2), Ship(2), Ship(3), Ship(4), Ship(5)];
    while (queue.length !== 0) {
      const position = selectPosition(computerMaster);
      const axis = selectAxis();
      const placementResult = computerMaster.canShipBePlaced(queue[0], position[0], position[1], axis);
      if (placementResult === true) {
        computerMaster.placeShip(queue[0], position[0], position[1], axis);
        queue.shift();
      }
    }
    return computerMaster;
  };

  return { turn, randomizeBoard };
};
