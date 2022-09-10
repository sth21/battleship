/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

export const Ship = (length) => {
  const whereHit = new Array(length).fill(false);

  const sunkStatus = false;

  const hit = (index, ship) => {
    const newArr = ship.whereHit;
    newArr[index] = true;
    return newArr;
  };

  const isSunk = (arr) => {
    let status = true;
    arr.forEach((location) => {
      if (location === false) status = false;
    });
    return status;
  };

  return {
    whereHit,
    length,
    hit,
    isSunk,
    sunkStatus,
  };
};
