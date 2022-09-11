/* eslint-disable max-len */
/* eslint-disable no-undef */

import { Ship } from './ship';
import { Gameboard } from './gameboard';
import { Player } from './player';
import { Computer } from './computer';

const battleship = Ship(5);

describe('ship tests', () => {
  it('Ship constructor returns object with properties', () => {
    expect(battleship).toEqual(expect.objectContaining({ length: 5 }));
  });

  it('isSunk only returns true if all locations sunk', () => {
    const master = Gameboard();
    const attack = Gameboard();
    master.placeShip(battleship, 2, 0, 'x');
    attack.recieveAttack(master.getBoardSquare(2, 0), attack.getBoardSquare(2, 0));
    attack.recieveAttack(master.getBoardSquare(3, 0), attack.getBoardSquare(3, 0));
    attack.recieveAttack(master.getBoardSquare(4, 0), attack.getBoardSquare(4, 0));
    attack.recieveAttack(master.getBoardSquare(5, 0), attack.getBoardSquare(5, 0));
    expect(battleship.isSunk()).toEqual(false);
  });

  it('hit marks position as hit', () => {
    const newShip = Ship(4);
    expect(newShip.hit(2)).toStrictEqual([false, false, true, false]);
  });
});

describe('gameboard tests', () => {
  it('gets board square', () => {
    const gameboard = Gameboard();
    expect(gameboard.getBoardSquare(2, 0)).toEqual(expect.objectContaining({ position: [2, 0] }));
  });

  it('gets empty board squares', () => {
    const attack = Gameboard();
    const master = Gameboard();
    attack.recieveAttack(master.getBoardSquare(2, 0), attack.getBoardSquare(2, 0));
    attack.recieveAttack(master.getBoardSquare(3, 0), attack.getBoardSquare(3, 0));
    attack.recieveAttack(master.getBoardSquare(4, 0), attack.getBoardSquare(4, 0));
    attack.recieveAttack(master.getBoardSquare(5, 0), attack.getBoardSquare(5, 0));
    expect(attack.getEmptySquares().length).toEqual(96);
  });

  it('adds ship to Gameboard', () => {
    const gameboard = Gameboard();
    expect(gameboard.placeShip(battleship, 2, 0, 'x')).toStrictEqual({
      position: [2, 0], whatOccupies: battleship, index: 0, hitOrMiss: undefined,
    });
  });

  it('marks a ship as hit at the proper index', () => {
    const master = Gameboard();
    const attack = Gameboard();
    master.placeShip(battleship, 2, 0, 'x');
    expect(attack.recieveAttack(master.getBoardSquare(2, 0), attack.getBoardSquare(2, 0))).toEqual(expect.objectContaining({ sunkStatus: false }));
  });

  it('registers a missed attack', () => {
    const master = Gameboard();
    const attack = Gameboard();
    master.placeShip(battleship, 2, 0, 'x');
    expect(attack.recieveAttack(master.getBoardSquare(9, 0), attack.getBoardSquare(9, 0))).toEqual('miss');
  });

  it('returns false if all boats not sunk', () => {
    const gameboard = Gameboard();
    expect(gameboard.isAllSunk()).toEqual(false);
  });

  it('returns true if all boats sunk', () => {
    const master = Gameboard();
    const attack = Gameboard();
    master.placeShip(battleship, 2, 0, 'x');
    attack.recieveAttack(master.getBoardSquare(2, 0), attack.getBoardSquare(2, 0));
    attack.recieveAttack(master.getBoardSquare(3, 0), attack.getBoardSquare(3, 0));
    attack.recieveAttack(master.getBoardSquare(4, 0), attack.getBoardSquare(4, 0));
    attack.recieveAttack(master.getBoardSquare(5, 0), attack.getBoardSquare(5, 0));
    attack.recieveAttack(master.getBoardSquare(6, 0), attack.getBoardSquare(6, 0));
    expect(attack.isAllSunk()).toEqual(true);
  });
});

describe('player tests', () => {
  it('returns ship if player attacks ship on computer master', () => {
    const playerAttack = Gameboard();
    const computerMaster = Gameboard();
    computerMaster.placeShip(battleship, 2, 0, 'x');
    expect(Player.turn(playerAttack, computerMaster, 2, 0)).toEqual(expect.objectContaining({ sunkStatus: false }));
  });

  it('returns miss if player attacks empty space on computer master', () => {
    const playerAttack = Gameboard();
    const computerMaster = Gameboard();
    computerMaster.placeShip(battleship, 2, 0, 'x');
    expect(Player.turn(playerAttack, computerMaster, 9, 0)).toEqual('miss');
  });
});
