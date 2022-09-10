/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

export const Gameboard = (() => {
  let board;
  const boardSquare = () => ({
    position: undefined, whatOccupies: undefined, index: undefined, hitOrMiss: undefined,
  });

  const initializeBoard = () => {
    const tempBoard = [[], [], [], [], [], [], [], [], [], []];
    let counter = 0;
    tempBoard.forEach((column) => {
      for (let i = 0; i < 10; i += 1) {
        column[i] = boardSquare();
        column[i].position = [counter, i];
        if (i === 9) counter += 1;
      }
    });
    return tempBoard;
  };

  const placeShip = (ship, posx, posy, alignment) => {
    const headOfShip = Gameboard.board[posx][posy];
    Gameboard.board[posx][posy].whatOccupies = ship;
    Gameboard.board[posx][posy].index = 0;
    for (let i = 1; i < ship.length; i += 1) {
      if (alignment === 'x') {
        posx += 1;
      } else {
        posy += 1;
      }
      Gameboard.board[posx][posy].whatOccupies = ship;
      Gameboard.board[posx][posy].index = i;
    }
    return headOfShip;
  };

  const recieveAttack = (posx, posy) => {
    const attackingSquare = Gameboard.board[posx][posy];
    if (attackingSquare.whatOccupies !== undefined) {
      const ship = attackingSquare.whatOccupies;
      attackingSquare.hitOrMiss = 'hit';
      ship.hit(attackingSquare.index);
      return ship;
    }
    attackingSquare.hitOrMiss = 'miss';
    return attackingSquare.hitOrMiss;
  };
  // recieveAttack(coords) => either marks ship as hit or registers as miss

  // report if all ships are sunk

  return {
    board, boardSquare, initializeBoard, placeShip, recieveAttack,
  };
})();
