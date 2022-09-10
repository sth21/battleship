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
    if (typeof attackingSquare.whatOccupies === 'object') {
      const ship = attackingSquare.whatOccupies;
      attackingSquare.hitOrMiss = 'hit';
      ship.hit(attackingSquare.index, ship);
    } else {
      attackingSquare.hitOrMiss = 'miss';
    }
    return attackingSquare.hitOrMiss;
  };

  const isAllSunk = () => {
    const arr = Gameboard.board;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (arr[i][j].whatOccupies !== undefined && (arr[i][j].hitOrMiss === 'miss' || arr[i][j].hitOrMiss === undefined)) {
          return false;
        }
      }
    }
    return true;
  };

  return {
    board, boardSquare, initializeBoard, placeShip, recieveAttack, isAllSunk,
  };
})();
