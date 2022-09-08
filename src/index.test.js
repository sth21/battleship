/* eslint-disable no-undef */
import { Ship } from './ship';

it('Ship constructor returns object with properties', () => {
  expect(Ship(5)).toEqual(expect.objectContaining({ length: 5 }));
});

it('isSunk only returns true if all locations sunk', () => {
  expect(Ship.isSunk([true, true, true, true, false]).toBe(false));
});
