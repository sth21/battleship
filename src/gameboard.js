/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

export const Gameboard = () => {
  const boardSquare = () => ({
    position: undefined, whatOccupies: undefined, index: undefined, hitOrMiss: undefined,
  });

  const board = [[], [], [], [], [], [], [], [], [], []];
  let counter = 0;
  board.forEach((column) => {
    for (let i = 0; i < 10; i += 1) {
      column[i] = boardSquare();
      column[i].position = [counter, i];
      if (i === 9) counter += 1;
    }
  });

  const getBoardSquare = (xpos, ypos) => board[xpos][ypos];

  const getEmptySquares = () => {
    const emptySquares = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (board[i][j].hitOrMiss === undefined) emptySquares[emptySquares.length] = board[i][j];
      }
    }
    return emptySquares;
  };

  const placeShip = (ship, posx, posy, alignment) => {
    const headOfShip = board[posx][posy];
    board[posx][posy].whatOccupies = ship;
    board[posx][posy].index = 0;
    for (let i = 1; i < ship.length; i += 1) {
      if (alignment === 'x') {
        posx += 1;
      } else {
        posy += 1;
      }
      board[posx][posy].whatOccupies = ship;
      board[posx][posy].index = i;
    }
    return headOfShip;
  };

  const recieveAttack = (master, attack) => {
    if (typeof master.whatOccupies === 'object') {
      const attackingShip = master.whatOccupies;
      attack.whatOccupies = master.whatOccupies;
      attack.hitOrMiss = 'hit';
      attackingShip.hit(master.index);
      return attackingShip;
    }
    attack.hitOrMiss = 'miss';
    return attack.hitOrMiss;
  };

  const isAllSunk = () => {
    const arr = board;
    let allEmpty = true;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (arr[i][j].whatOccupies !== undefined && arr[i][j].hitOrMiss !== 'hit') {
          return false;
        }
        if (arr[i][j].whatOccupies !== undefined) allEmpty = false;
      }
    }
    if (allEmpty === true) return false;
    return true;
  };

  return {
    getBoardSquare, getEmptySquares, placeShip, recieveAttack, isAllSunk,
  };
};
