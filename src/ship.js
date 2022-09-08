/* eslint-disable import/prefer-default-export */

export const Ship = (length) => {
  const whereHit = Array(length - 1).fill(false);
  const sunkStatus = false;
  const hit = () => {

  };
  const isSunk = (arr) => {
    let status = true;
    arr.forEach((location) => {
      if (location === false) status = false;
    });
    return status;
  };

  return {
    length,
    hit,
    isSunk,
    sunkStatus,
  };
};
