/* eslint-disable import/prefer-default-export */

export const Computer = (() => {
  const selectPosition = (computerAttack) => {
    const options = computerAttack.getEmptySquares();
    const selection = options[Math.floor(Math.random() * options.length)];
    return selection;
  };

  const turn = (computerAttack, playerMaster) => {
    const square = selectPosition(computerAttack);
    const xpos = square.position[0];
    const ypos = square.position[1];
    const masterSquare = playerMaster.getBoardSquare(xpos, ypos);
    const attackSquare = computerAttack.getBoardSquare(xpos, ypos);
    const hitOrMiss = computerAttack.recieveAttack(masterSquare, attackSquare);
    return hitOrMiss;
  };

  return { turn };
})();
