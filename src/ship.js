/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

export const Ship = (length) => {
  const whereHit = Array(length).fill(false);

  const sunkStatus = false;

  const hit = (index) => {
    this.whereHit[index] = true;
    return this.whereHit;
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
