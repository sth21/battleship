/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

export const Ship = (length) => {
  let name;

  const whereHit = new Array(length).fill(false);

  const sunkStatus = false;

  const hit = (index) => {
    whereHit[index] = true;
    return whereHit;
  };

  const isSunk = () => {
    let status = true;
    whereHit.forEach((location) => {
      if (location === false) status = false;
    });
    return status;
  };

  const setName = (newName) => {
    if (newName !== undefined) name = newName;
    return name;
  };

  return {
    length,
    hit,
    isSunk,
    sunkStatus,
    setName,
  };
};
