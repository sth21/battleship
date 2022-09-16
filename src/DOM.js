/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */

export const DOM = (() => {
  const loadBoard = () => {
    const board = document.getElementById('board-container');
    const { height } = window.getComputedStyle(board);
    board.style.width = height;
    const size = (board.style.width.slice(0, height.length - 2) / 10) - 1;
    console.log(size);
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const piece = document.createElement('div');
        piece.classList.add('board-piece');
        piece.dataset.xpos = i;
        piece.dataset.ypos = j;
        piece.style.height = `${size}px`;
        piece.style.width = `${size}px`;
        board.appendChild(piece);
      }
    }
  };

  return { loadBoard };
})();
