/* eslint-disable no-unused-expressions */
/* eslint-disable no-continue */
/* eslint-disable import/no-cycle */
/* eslint-disable no-useless-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */

import { Ship } from './ship';
import { Gameflow } from './index';

export const DOM = (() => {
  let activeShip = Ship(5);
  activeShip.setName('Carrier');
  let axis = 'x';

  const resetBoardColors = (playerMaster) => {
    const board = document.getElementById('board-container');
    for (let i = 0; i < 10; i += 1) {
      for (let k = 0; k < 10; k += 1) {
        const activeSq = playerMaster.getBoardSquare(i, k).whatOccupies;
        const boardIndex = parseInt(k.toString() + i.toString());
        if (activeSq === undefined) {
          board.children[boardIndex].style.backgroundColor = '#00205B';
        } else {
          board.children[boardIndex].style.backgroundColor = '#C5B783';
          board.children[boardIndex].style.border = '.5px solid #00205B';
        }
      }
    }
  };

  const hoverPlayerForm = (event, playerMaster) => {
    resetBoardColors(playerMaster);
    const board = document.getElementById('board-container');
    const xpos = event.target.dataset.xpos;
    const ypos = event.target.dataset.ypos;
    let index = parseInt(ypos + xpos);
    if (playerMaster.canShipBePlaced(activeShip, parseInt(xpos), parseInt(ypos), axis) === false) return;
    let activeTile = event.target;
    for (let j = 0; j < activeShip.length; j += 1) {
      activeTile.style.backgroundColor = 'white';
      if (axis === 'x') {
        activeTile = board.children[index + 1];
        index += 1;
      } else {
        activeTile = board.children[index + 10];
        index += 10;
      }
    }
  };

  const changeShip = () => {
    const header = document.querySelector('.ship-name');
    if (activeShip.setName() === 'Carrier') {
      activeShip = Ship(4);
      activeShip.setName('Battleship');
    } else if (activeShip.setName() === 'Battleship') {
      activeShip = Ship(3);
      activeShip.setName('Cruiser');
    } else if (activeShip.setName() === 'Cruiser') {
      activeShip = Ship(3);
      activeShip.setName('Submarine');
    } else if (activeShip.setName() === 'Submarine') {
      activeShip = Ship(2);
      activeShip.setName('Destroyer');
    }
    header.textContent = activeShip.setName();
    return activeShip;
  };

  const placeShip = (event) => {
    const board = document.getElementById('board-container');
    const xpos = event.target.dataset.xpos;
    const ypos = event.target.dataset.ypos;
    let index = parseInt(ypos + xpos);
    let activeTile = event.target;
    for (let i = 0; i < activeShip.length; i += 1) {
      activeTile.style.backgroundColor = '#C5B783';
      if (axis === 'x') {
        index += 1;
        activeTile = board.children[index];
      } else {
        index += 10;
        activeTile = board.children[index];
      }
    }
    return changeShip();
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
        if (board.getAttribute('id') === 'board-container') {
          piece.addEventListener('mouseover', Gameflow.hoverPlayerForm);
          piece.addEventListener('click', Gameflow.placeShip);
        } else {
          piece.addEventListener('click', Gameflow.turn);
        }
        board.appendChild(piece);
      }
    }
  };

  const resizeBoard = () => {
    const boardArr = [];
    const overlay1 = document.getElementById('overlayWinner');
    const overlay2 = document.getElementById('overlayPlayer');
    if (overlay1.classList.contains('active')) return;
    if (overlay2.classList.contains('active')) {
      boardArr[boardArr.length] = document.getElementById('board-container');
    } else {
      boardArr[boardArr.length] = document.getElementById('player-master');
      boardArr[boardArr.length] = document.getElementById('player-attack');
    }
    for (let i = 0; i < boardArr.length; i += 1) {
      const { width } = window.getComputedStyle(boardArr[i]);
      boardArr[i].style.height = width;
      const size = (width.slice(0, width.length - 2) / 10) - 1;
      for (let j = 0; j < 10; j += 1) {
        for (let k = 0; k < 10; k += 1) {
          const index = j + (k * 10);
          boardArr[i].children[index].style.width = `${size}px`;
          boardArr[i].children[index].style.height = `${size}px`;
        }
      }
    }
  };

  const switchAxis = (newAxis) => {
    const button = document.querySelector('.rotate');
    axis = newAxis;
    if (newAxis === 'x') {
      button.textContent = 'Rotate to Y';
    } else {
      button.textContent = 'Rotate to X';
    }
  };

  const startGame = (playerMaster) => {
    const overlay = document.getElementById('overlayPlayer');
    overlay.classList.remove('.active');
    overlay.classList.add('inactive');
    const playerMasterBoard = document.getElementById('player-master');
    const playerAttackBoard = document.getElementById('player-attack');
    loadBoard(playerMasterBoard);
    loadBoard(playerAttackBoard);
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (playerMaster.getBoardSquare(i, j).whatOccupies === undefined) {
          continue;
        } else {
          const index = parseInt(j.toString() + i.toString());
          playerMasterBoard.children[index].style.backgroundColor = '#C5B783';
          playerMasterBoard.children[index].style.border = '.5px solid #00205B';
        }
      }
    }
  };

  const hitEffect = (square, hitStatus) => {
    square.textContent = '???';
    (hitStatus === 'hit') ? square.style.color = 'red' : square.style.color = 'white';
  };

  return {
    resetBoardColors, hoverPlayerForm, loadBoard, resizeBoard, switchAxis, placeShip, startGame, hitEffect,
  };
})();
