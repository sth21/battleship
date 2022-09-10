/* eslint-disable max-len */
/* eslint-disable no-undef */

import { Ship } from './ship';
import { Gameboard } from './gameboard';

const battleship = Ship(5);

describe('ship tests', () => {
  it('Ship constructor returns object with properties', () => {
    expect(battleship).toEqual(expect.objectContaining({ length: 5 }));
  });

  it('isSunk only returns true if all locations sunk', () => {
    expect(battleship.isSunk([true, true, true, true, false])).toEqual(false);
  });

  it('hit marks position as hit', () => {
    const newShip = Ship(4);
    expect(newShip.hit(2, newShip)).toStrictEqual([false, false, true, false]);
  });
});

describe('gameboard tests', () => {
  beforeAll(() => {
    Gameboard.board = Gameboard.initializeBoard();
    Gameboard.placeShip(battleship, 2, 0, 'x');
  });

  it('adds ship to gameBoard', () => {
    expect(Gameboard.placeShip(battleship, 2, 0, 'x')).toStrictEqual({
      position: [2, 0], whatOccupies: battleship, index: 0, hitOrMiss: undefined,
    });
  });

  it('marks a ship as hit at the proper index', () => {
    expect(Gameboard.recieveAttack(2, 0)).toEqual('hit');
  });

  it('registers a missed attack', () => {
    expect(Gameboard.recieveAttack(9, 0)).toEqual('miss');
  });

  it('returns false if all boats not sunk', () => {
    expect(Gameboard.isAllSunk()).toEqual(false);
  });

  it('returns true if all boats sunk', () => {
    Gameboard.recieveAttack(2, 0);
    Gameboard.recieveAttack(3, 0);
    Gameboard.recieveAttack(4, 0);
    Gameboard.recieveAttack(5, 0);
    Gameboard.recieveAttack(6, 0);
    expect(Gameboard.isAllSunk()).toEqual(true);
  });
});
