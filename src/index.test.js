/* eslint-disable max-len */
/* eslint-disable no-undef */

import { Ship } from './ship';
import { Gameboard } from './gameboard';

// Ship used for testing
const battleship = Ship(5);

it('Ship constructor returns object with properties', () => {
  expect(Ship(5)).toEqual(expect.objectContaining({ length: 5 }));
});

it('isSunk only returns true if all locations sunk', () => {
  expect(battleship.isSunk([true, true, true, true, false])).toEqual(false);
});

it('hit marks position as hit', () => {
  expect(battleship.hit(2)).toStrictEqual([false, false, true, false, false]);
});

describe('gameboard tests', () => {
  beforeAll(() => {
    Gameboard.board = Gameboard.initializeBoard();
  });

  it('adds ship to gameBoard', () => {
    Gameboard.initializeBoard();
    expect(Gameboard.placeShip(battleship, 2, 0, 'x')).toStrictEqual({
      position: [2, 0], whatOccupies: battleship, index: 0, hitOrMiss: undefined,
    });
  });

  it('marks a ship as hit at the proper index', () => {
    expect(Gameboard.recieveAttack(2, 0)).toEqual(expect.objectContaining({ whereHit: [true, false, false, false, false] }));
  });
});
