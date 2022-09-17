/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */

import { Ship } from './ship';
import { Gameboard } from './gameboard';

export const DOM = (() => {
  const axis = 'x';
  const activeShip = Ship(5);
  const playerMaster = Gameboard();
  const playerAttack = Gameboard();

  const hoverPlayerForm = (event) => {
    const board = document.getElementById('board-container');
    for (let i = 0; i < board.children.length; i += 1) {
      const backgroundColor = window.getComputedStyle(board.children[i]).backgroundColor;
      if (backgroundColor !== '#00205B' || backgroundColor !== '#C5B783') board.children[i].style.backgroundColor = '#00205B';
    }
    const xpos = event.target.dataset.xpos;
    const ypos = event.target.dataset.ypos;
    let index = parseInt(ypos + xpos);
    if (playerMaster.canShipBePlaced(activeShip, parseInt(xpos), parseInt(ypos), axis) === false) {
      return;
    }
    let activeTile = event.target;
    for (let i = 0; i < activeShip.length; i += 1) {
      activeTile.style.backgroundColor = 'white';
      console.log(index);
      if (axis === 'x') {
        activeTile = board.children[index + 1];
        index += 1;
      } else {
        activeTile = board.children[index + 10];
        index += 10;
      }
    }
  };

  const loadBoard = (board) => {
    if (board === undefined || board.target) board = document.getElementById('board-container');
    while (board.firstChild) {
      board.removeChild(board.firstChild);
    }
    const { width } = window.getComputedStyle(board);
    board.style.height = width;
    const size = (width.slice(0, width.length - 2) / 10) - 1;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const piece = document.createElement('div');
        piece.classList.add('board-piece');
        piece.dataset.xpos = j;
        piece.dataset.ypos = i;
        piece.style.height = `${size}px`;
        piece.style.width = `${size}px`;
        piece.addEventListener('mouseover', hoverPlayerForm);
        board.appendChild(piece);
      }
    }
  };

  return { loadBoard };
})();
