/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOM": () => (/* binding */ DOM)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* eslint-disable no-unused-expressions */
/* eslint-disable no-continue */
/* eslint-disable import/no-cycle */
/* eslint-disable no-useless-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */




const DOM = (() => {
  let axis = 'x';
  let activeShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(5);
  activeShip.setName('Carrier');

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
      activeShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(4);
      activeShip.setName('Battleship');
    } else if (activeShip.setName() === 'Battleship') {
      activeShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(3);
      activeShip.setName('Cruiser');
    } else if (activeShip.setName() === 'Cruiser') {
      activeShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(3);
      activeShip.setName('Submarine');
    } else if (activeShip.setName() === 'Submarine') {
      activeShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(2);
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
          piece.addEventListener('mouseover', _index__WEBPACK_IMPORTED_MODULE_1__.Gameflow.hoverPlayerForm);
          piece.addEventListener('click', _index__WEBPACK_IMPORTED_MODULE_1__.Gameflow.placeShip);
        } else {
          piece.addEventListener('click', _index__WEBPACK_IMPORTED_MODULE_1__.Gameflow.turn);
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
    if (axis === 'x') {
      button.textContent = 'Rotate to X';
    } else {
      button.textContent = 'Rotate to Y';
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
    square.textContent = '●';
    (hitStatus === 'hit') ? square.style.color = 'red' : square.style.color = 'white';
  };

  return {
    resetBoardColors, hoverPlayerForm, loadBoard, resizeBoard, switchAxis, placeShip, startGame, hitEffect,
  };
})();


/***/ }),

/***/ "./src/computer.js":
/*!*************************!*\
  !*** ./src/computer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Computer": () => (/* binding */ Computer)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */




const Computer = () => {
  const selectPosition = (computerAttack) => {
    const options = computerAttack.getEmptySquares();
    const selection = options[Math.floor(Math.random() * options.length)];
    return selection.position;
  };

  const selectAxis = () => {
    const number = Math.round(Math.random());
    return (number === 0) ? 'x' : 'y';
  };

  const turn = (computerAttack, playerMaster) => {
    const square = selectPosition(computerAttack);
    const xpos = square[0];
    const ypos = square[1];
    const masterSquare = playerMaster.getBoardSquare(xpos, ypos);
    const attackSquare = computerAttack.getBoardSquare(xpos, ypos);
    const hitOrMiss = computerAttack.recieveAttack(masterSquare, attackSquare);
    return [xpos, ypos, hitOrMiss];
  };

  const randomizeBoard = () => {
    const computerMaster = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
    const queue = [(0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(2), (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(2), (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(3), (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(4), (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(5)];
    while (queue.length !== 0) {
      const position = selectPosition(computerMaster);
      const axis = selectAxis();
      const placementResult = computerMaster.canShipBePlaced(queue[0], position[0], position[1], axis);
      if (placementResult === true) {
        computerMaster.placeShip(queue[0], position[0], position[1], axis);
        queue.shift();
      }
    }
    return computerMaster;
  };

  return { turn, randomizeBoard };
};


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

const Gameboard = () => {
  const boardSquare = () => ({
    position: undefined, whatOccupies: undefined, index: undefined, hitOrMiss: undefined,
  });

  const board = [[], [], [], [], [], [], [], [], [], []];
  let counter = 0;
  board.forEach((column) => {
    for (let i = 0; i < 10; i += 1) {
      column[i] = boardSquare();
      column[i].position = [counter, i];
      if (i === 9) counter += 1;
    }
  });

  const getBoardSquare = (xpos, ypos) => board[xpos][ypos];

  const getEmptySquares = () => {
    const emptySquares = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (board[i][j].hitOrMiss === undefined) emptySquares[emptySquares.length] = board[i][j];
      }
    }
    return emptySquares;
  };

  const placeShip = (ship, posx, posy, alignment) => {
    let positionX = posx;
    let positionY = posy;
    const headOfShip = board[positionX][positionY];
    headOfShip.whatOccupies = ship;
    headOfShip.index = 0;
    for (let i = 1; i < ship.length; i += 1) {
      if (alignment === 'x') {
        positionX += 1;
      } else {
        positionY += 1;
      }
      board[positionX][positionY].whatOccupies = ship;
      board[positionX][positionY].index = i;
    }
    return headOfShip;
  };

  const canShipBePlaced = (ship, posx, posy, alignment) => {
    let positionX = posx;
    let positionY = posy;
    const headOfShip = board[positionX][positionY];
    if (headOfShip.whatOccupies !== undefined) return false;
    for (let i = 1; i < ship.length; i += 1) {
      if (alignment === 'x') {
        positionX += 1;
      } else {
        positionY += 1;
      }
      if (positionX < 0 || positionX > 9) return false;
      if (positionY < 0 || positionY > 9) return false;
      if (board[positionX][positionY].whatOccupies !== undefined) return false;
    }
    return true;
  };

  const recieveAttack = (master, attack) => {
    if (typeof master.whatOccupies === 'object') {
      const attackingShip = master.whatOccupies;
      attack.whatOccupies = master.whatOccupies;
      attack.hitOrMiss = 'hit';
      master.hitOrMiss = 'hit';
      attackingShip.hit(master.index);
      return attackingShip;
    }
    attack.hitOrMiss = 'miss';
    master.hitOrMiss = 'miss';
    return attack.hitOrMiss;
  };

  const isAllSunk = () => {
    const arr = board;
    let allEmpty = true;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (arr[i][j].whatOccupies !== undefined && arr[i][j].hitOrMiss !== 'hit') {
          return false;
        }
        if (arr[i][j].whatOccupies !== undefined) allEmpty = false;
      }
    }
    if (allEmpty === true) return false;
    return true;
  };

  const giveHeadOfShips = () => {
    const arr = board;
    const heads = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (arr[i][j].index === 0) heads[heads.length] = arr[i][j];
      }
    }
    return heads;
  };

  return {
    getBoardSquare,
    getEmptySquares,
    placeShip,
    canShipBePlaced,
    recieveAttack,
    isAllSunk,
    giveHeadOfShips,
  };
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameflow": () => (/* binding */ Gameflow)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computer */ "./src/computer.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-useless-return */
/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */







const Gameflow = (() => {
  const player = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)();
  let playerMaster = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();
  const playerAttack = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();
  const computer = (0,_computer__WEBPACK_IMPORTED_MODULE_2__.Computer)();
  let computerMaster = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();
  const computerAttack = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();
  let activeShip = (0,_ship__WEBPACK_IMPORTED_MODULE_4__.Ship)(5);
  activeShip.setName('Carrier');
  let axis = 'x';

  const startGame = (event) => {
    document.getElementById('overlayPlayer').classList.remove('active');
    if (event) playerMaster = computer.randomizeBoard();
    computerMaster = computer.randomizeBoard();
    _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.startGame(playerMaster);
  };

  const switchAxis = (event) => {
    event.preventDefault();
    if (axis === 'x') {
      axis = 'y';
      _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.switchAxis(axis);
    } else {
      axis = 'x';
      _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.switchAxis(axis);
    }
  };

  const placeShip = (event) => {
    const xpos = event.target.dataset.xpos;
    const ypos = event.target.dataset.ypos;
    if (playerMaster.canShipBePlaced(activeShip, parseInt(xpos), parseInt(ypos), axis) === false) return;
    playerMaster.placeShip(activeShip, parseInt(xpos), parseInt(ypos), axis);
    if (activeShip.setName() === 'Destroyer') return startGame();
    activeShip = _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.placeShip(event);
  };

  const resetBoardColors = () => {
    _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.resetBoardColors(playerMaster);
  };

  const hoverPlayerForm = (event) => {
    _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.hoverPlayerForm(event, playerMaster);
  };

  const turn = (event) => {
    event.target.removeEventListener('click', Gameflow.turn);
    const xpos = parseInt(event.target.dataset.xpos);
    const ypos = parseInt(event.target.dataset.ypos);
    const playerResult = player.turn(playerAttack, computerMaster, xpos, ypos);
    if (typeof playerResult === 'object') {
      _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.hitEffect(event.target, 'hit');
      if (computerMaster.isAllSunk() === true) {
        const winnerOverlay = document.getElementById('overlayWinner');
        const winnerText = document.getElementById('winner').children[0];
        winnerText.textContent = 'Player Won!';
        winnerOverlay.classList.remove('inactive');
        winnerOverlay.classList.add('active');
        return;
      }
    } else {
      _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.hitEffect(event.target, 'miss');
    }

    const computerResult = computer.turn(computerAttack, playerMaster);
    if (typeof computerResult[2] === 'object') {
      const index = computerResult[0] + (computerResult[1] * 10);
      const masterPiece = document.getElementById('player-master').children[index];
      _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.hitEffect(masterPiece, 'hit');
      if (playerMaster.isAllSunk() === true) {
        const winnerOverlay = document.getElementById('overlayWinner');
        const winnerText = document.getElementById('winner').children[0];
        winnerText.textContent = 'Computer Won!';
        winnerOverlay.classList.remove('inactive');
        winnerOverlay.classList.add('active');
      }
    } else {
      const index = computerResult[0] + (computerResult[1] * 10);
      const masterPiece = document.getElementById('player-master').children[index];
      _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.hitEffect(masterPiece, 'miss');
    }
  };

  return {
    switchAxis, placeShip, startGame, resetBoardColors, hoverPlayerForm, turn,
  };
})();

_DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.loadBoard();
window.addEventListener('resize', _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.resizeBoard);
document.querySelector('.rotate').addEventListener('click', Gameflow.switchAxis);
document.querySelector('.randomize').addEventListener('click', Gameflow.startGame);
document.getElementById('board-container').addEventListener('mouseout', Gameflow.resetBoardColors);
document.querySelector('.play-again').addEventListener('click', () => window.location.reload());


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* eslint-disable no-sequences */
/* eslint-disable import/prefer-default-export */

const Player = () => {
  const turn = (playerAttack, computerMaster, xpos, ypos) => {
    const masterSquare = computerMaster.getBoardSquare(xpos, ypos);
    const attackSquare = playerAttack.getBoardSquare(xpos, ypos);
    const hitOrMiss = playerAttack.recieveAttack(masterSquare, attackSquare);
    return hitOrMiss;
  };

  return { turn };
};


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

const Ship = (length) => {
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb250aW51ZSAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSByYWRpeCAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IEdhbWVmbG93IH0gZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBjb25zdCBET00gPSAoKCkgPT4ge1xuICBsZXQgYXhpcyA9ICd4JztcbiAgbGV0IGFjdGl2ZVNoaXAgPSBTaGlwKDUpO1xuICBhY3RpdmVTaGlwLnNldE5hbWUoJ0NhcnJpZXInKTtcblxuICBjb25zdCByZXNldEJvYXJkQ29sb3JzID0gKHBsYXllck1hc3RlcikgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCAxMDsgayArPSAxKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVNxID0gcGxheWVyTWFzdGVyLmdldEJvYXJkU3F1YXJlKGksIGspLndoYXRPY2N1cGllcztcbiAgICAgICAgY29uc3QgYm9hcmRJbmRleCA9IHBhcnNlSW50KGsudG9TdHJpbmcoKSArIGkudG9TdHJpbmcoKSk7XG4gICAgICAgIGlmIChhY3RpdmVTcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYm9hcmQuY2hpbGRyZW5bYm9hcmRJbmRleF0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwMDIwNUInO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvYXJkLmNoaWxkcmVuW2JvYXJkSW5kZXhdLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjQzVCNzgzJztcbiAgICAgICAgICBib2FyZC5jaGlsZHJlbltib2FyZEluZGV4XS5zdHlsZS5ib3JkZXIgPSAnLjVweCBzb2xpZCAjMDAyMDVCJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBob3ZlclBsYXllckZvcm0gPSAoZXZlbnQsIHBsYXllck1hc3RlcikgPT4ge1xuICAgIHJlc2V0Qm9hcmRDb2xvcnMocGxheWVyTWFzdGVyKTtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZC1jb250YWluZXInKTtcbiAgICBjb25zdCB4cG9zID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQueHBvcztcbiAgICBjb25zdCB5cG9zID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQueXBvcztcbiAgICBsZXQgaW5kZXggPSBwYXJzZUludCh5cG9zICsgeHBvcyk7XG4gICAgaWYgKHBsYXllck1hc3Rlci5jYW5TaGlwQmVQbGFjZWQoYWN0aXZlU2hpcCwgcGFyc2VJbnQoeHBvcyksIHBhcnNlSW50KHlwb3MpLCBheGlzKSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICBsZXQgYWN0aXZlVGlsZSA9IGV2ZW50LnRhcmdldDtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFjdGl2ZVNoaXAubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIGFjdGl2ZVRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICAgIGlmIChheGlzID09PSAneCcpIHtcbiAgICAgICAgYWN0aXZlVGlsZSA9IGJvYXJkLmNoaWxkcmVuW2luZGV4ICsgMV07XG4gICAgICAgIGluZGV4ICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY3RpdmVUaWxlID0gYm9hcmQuY2hpbGRyZW5baW5kZXggKyAxMF07XG4gICAgICAgIGluZGV4ICs9IDEwO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGFuZ2VTaGlwID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwLW5hbWUnKTtcbiAgICBpZiAoYWN0aXZlU2hpcC5zZXROYW1lKCkgPT09ICdDYXJyaWVyJykge1xuICAgICAgYWN0aXZlU2hpcCA9IFNoaXAoNCk7XG4gICAgICBhY3RpdmVTaGlwLnNldE5hbWUoJ0JhdHRsZXNoaXAnKTtcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZVNoaXAuc2V0TmFtZSgpID09PSAnQmF0dGxlc2hpcCcpIHtcbiAgICAgIGFjdGl2ZVNoaXAgPSBTaGlwKDMpO1xuICAgICAgYWN0aXZlU2hpcC5zZXROYW1lKCdDcnVpc2VyJyk7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVTaGlwLnNldE5hbWUoKSA9PT0gJ0NydWlzZXInKSB7XG4gICAgICBhY3RpdmVTaGlwID0gU2hpcCgzKTtcbiAgICAgIGFjdGl2ZVNoaXAuc2V0TmFtZSgnU3VibWFyaW5lJyk7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVTaGlwLnNldE5hbWUoKSA9PT0gJ1N1Ym1hcmluZScpIHtcbiAgICAgIGFjdGl2ZVNoaXAgPSBTaGlwKDIpO1xuICAgICAgYWN0aXZlU2hpcC5zZXROYW1lKCdEZXN0cm95ZXInKTtcbiAgICB9XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gYWN0aXZlU2hpcC5zZXROYW1lKCk7XG4gICAgcmV0dXJuIGFjdGl2ZVNoaXA7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgeHBvcyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnhwb3M7XG4gICAgY29uc3QgeXBvcyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnlwb3M7XG4gICAgbGV0IGluZGV4ID0gcGFyc2VJbnQoeXBvcyArIHhwb3MpO1xuICAgIGxldCBhY3RpdmVUaWxlID0gZXZlbnQudGFyZ2V0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlU2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgYWN0aXZlVGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0M1Qjc4Myc7XG4gICAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIGFjdGl2ZVRpbGUgPSBib2FyZC5jaGlsZHJlbltpbmRleF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCArPSAxMDtcbiAgICAgICAgYWN0aXZlVGlsZSA9IGJvYXJkLmNoaWxkcmVuW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNoYW5nZVNoaXAoKTtcbiAgfTtcblxuICBjb25zdCBsb2FkQm9hcmQgPSAoYm9hcmQpID0+IHtcbiAgICBpZiAoYm9hcmQgPT09IHVuZGVmaW5lZCB8fCBib2FyZC50YXJnZXQpIGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIHdoaWxlIChib2FyZC5maXJzdENoaWxkKSB7XG4gICAgICBib2FyZC5yZW1vdmVDaGlsZChib2FyZC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgY29uc3QgeyB3aWR0aCB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoYm9hcmQpO1xuICAgIGJvYXJkLnN0eWxlLmhlaWdodCA9IHdpZHRoO1xuICAgIGNvbnN0IHNpemUgPSAod2lkdGguc2xpY2UoMCwgd2lkdGgubGVuZ3RoIC0gMikgLyAxMCkgLSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IHBpZWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBpZWNlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLXBpZWNlJyk7XG4gICAgICAgIHBpZWNlLmRhdGFzZXQueHBvcyA9IGo7XG4gICAgICAgIHBpZWNlLmRhdGFzZXQueXBvcyA9IGk7XG4gICAgICAgIHBpZWNlLnN0eWxlLmhlaWdodCA9IGAke3NpemV9cHhgO1xuICAgICAgICBwaWVjZS5zdHlsZS53aWR0aCA9IGAke3NpemV9cHhgO1xuICAgICAgICBpZiAoYm9hcmQuZ2V0QXR0cmlidXRlKCdpZCcpID09PSAnYm9hcmQtY29udGFpbmVyJykge1xuICAgICAgICAgIHBpZWNlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIEdhbWVmbG93LmhvdmVyUGxheWVyRm9ybSk7XG4gICAgICAgICAgcGllY2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBHYW1lZmxvdy5wbGFjZVNoaXApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBpZWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgR2FtZWZsb3cudHVybik7XG4gICAgICAgIH1cbiAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQocGllY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByZXNpemVCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBib2FyZEFyciA9IFtdO1xuICAgIGNvbnN0IG92ZXJsYXkxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXlXaW5uZXInKTtcbiAgICBjb25zdCBvdmVybGF5MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5UGxheWVyJyk7XG4gICAgaWYgKG92ZXJsYXkxLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHJldHVybjtcbiAgICBpZiAob3ZlcmxheTIuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgYm9hcmRBcnJbYm9hcmRBcnIubGVuZ3RoXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZC1jb250YWluZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9hcmRBcnJbYm9hcmRBcnIubGVuZ3RoXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItbWFzdGVyJyk7XG4gICAgICBib2FyZEFycltib2FyZEFyci5sZW5ndGhdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1hdHRhY2snKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZEFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgeyB3aWR0aCB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoYm9hcmRBcnJbaV0pO1xuICAgICAgYm9hcmRBcnJbaV0uc3R5bGUuaGVpZ2h0ID0gd2lkdGg7XG4gICAgICBjb25zdCBzaXplID0gKHdpZHRoLnNsaWNlKDAsIHdpZHRoLmxlbmd0aCAtIDIpIC8gMTApIC0gMTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDEwOyBrICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGogKyAoayAqIDEwKTtcbiAgICAgICAgICBib2FyZEFycltpXS5jaGlsZHJlbltpbmRleF0uc3R5bGUud2lkdGggPSBgJHtzaXplfXB4YDtcbiAgICAgICAgICBib2FyZEFycltpXS5jaGlsZHJlbltpbmRleF0uc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZX1weGA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc3dpdGNoQXhpcyA9IChuZXdBeGlzKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdGF0ZScpO1xuICAgIGF4aXMgPSBuZXdBeGlzO1xuICAgIGlmIChheGlzID09PSAneCcpIHtcbiAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdSb3RhdGUgdG8gWCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdSb3RhdGUgdG8gWSc7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHN0YXJ0R2FtZSA9IChwbGF5ZXJNYXN0ZXIpID0+IHtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXlQbGF5ZXInKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJy5hY3RpdmUnKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XG4gICAgY29uc3QgcGxheWVyTWFzdGVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW1hc3RlcicpO1xuICAgIGNvbnN0IHBsYXllckF0dGFja0JvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1hdHRhY2snKTtcbiAgICBsb2FkQm9hcmQocGxheWVyTWFzdGVyQm9hcmQpO1xuICAgIGxvYWRCb2FyZChwbGF5ZXJBdHRhY2tCb2FyZCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKHBsYXllck1hc3Rlci5nZXRCb2FyZFNxdWFyZShpLCBqKS53aGF0T2NjdXBpZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoai50b1N0cmluZygpICsgaS50b1N0cmluZygpKTtcbiAgICAgICAgICBwbGF5ZXJNYXN0ZXJCb2FyZC5jaGlsZHJlbltpbmRleF0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNDNUI3ODMnO1xuICAgICAgICAgIHBsYXllck1hc3RlckJvYXJkLmNoaWxkcmVuW2luZGV4XS5zdHlsZS5ib3JkZXIgPSAnLjVweCBzb2xpZCAjMDAyMDVCJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBoaXRFZmZlY3QgPSAoc3F1YXJlLCBoaXRTdGF0dXMpID0+IHtcbiAgICBzcXVhcmUudGV4dENvbnRlbnQgPSAn4pePJztcbiAgICAoaGl0U3RhdHVzID09PSAnaGl0JykgPyBzcXVhcmUuc3R5bGUuY29sb3IgPSAncmVkJyA6IHNxdWFyZS5zdHlsZS5jb2xvciA9ICd3aGl0ZSc7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZXNldEJvYXJkQ29sb3JzLCBob3ZlclBsYXllckZvcm0sIGxvYWRCb2FyZCwgcmVzaXplQm9hcmQsIHN3aXRjaEF4aXMsIHBsYWNlU2hpcCwgc3RhcnRHYW1lLCBoaXRFZmZlY3QsXG4gIH07XG59KSgpO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcblxuZXhwb3J0IGNvbnN0IENvbXB1dGVyID0gKCkgPT4ge1xuICBjb25zdCBzZWxlY3RQb3NpdGlvbiA9IChjb21wdXRlckF0dGFjaykgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBjb21wdXRlckF0dGFjay5nZXRFbXB0eVNxdWFyZXMoKTtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKV07XG4gICAgcmV0dXJuIHNlbGVjdGlvbi5wb3NpdGlvbjtcbiAgfTtcblxuICBjb25zdCBzZWxlY3RBeGlzID0gKCkgPT4ge1xuICAgIGNvbnN0IG51bWJlciA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSk7XG4gICAgcmV0dXJuIChudW1iZXIgPT09IDApID8gJ3gnIDogJ3knO1xuICB9O1xuXG4gIGNvbnN0IHR1cm4gPSAoY29tcHV0ZXJBdHRhY2ssIHBsYXllck1hc3RlcikgPT4ge1xuICAgIGNvbnN0IHNxdWFyZSA9IHNlbGVjdFBvc2l0aW9uKGNvbXB1dGVyQXR0YWNrKTtcbiAgICBjb25zdCB4cG9zID0gc3F1YXJlWzBdO1xuICAgIGNvbnN0IHlwb3MgPSBzcXVhcmVbMV07XG4gICAgY29uc3QgbWFzdGVyU3F1YXJlID0gcGxheWVyTWFzdGVyLmdldEJvYXJkU3F1YXJlKHhwb3MsIHlwb3MpO1xuICAgIGNvbnN0IGF0dGFja1NxdWFyZSA9IGNvbXB1dGVyQXR0YWNrLmdldEJvYXJkU3F1YXJlKHhwb3MsIHlwb3MpO1xuICAgIGNvbnN0IGhpdE9yTWlzcyA9IGNvbXB1dGVyQXR0YWNrLnJlY2lldmVBdHRhY2sobWFzdGVyU3F1YXJlLCBhdHRhY2tTcXVhcmUpO1xuICAgIHJldHVybiBbeHBvcywgeXBvcywgaGl0T3JNaXNzXTtcbiAgfTtcblxuICBjb25zdCByYW5kb21pemVCb2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBjb21wdXRlck1hc3RlciA9IEdhbWVib2FyZCgpO1xuICAgIGNvbnN0IHF1ZXVlID0gW1NoaXAoMiksIFNoaXAoMiksIFNoaXAoMyksIFNoaXAoNCksIFNoaXAoNSldO1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gc2VsZWN0UG9zaXRpb24oY29tcHV0ZXJNYXN0ZXIpO1xuICAgICAgY29uc3QgYXhpcyA9IHNlbGVjdEF4aXMoKTtcbiAgICAgIGNvbnN0IHBsYWNlbWVudFJlc3VsdCA9IGNvbXB1dGVyTWFzdGVyLmNhblNoaXBCZVBsYWNlZChxdWV1ZVswXSwgcG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdLCBheGlzKTtcbiAgICAgIGlmIChwbGFjZW1lbnRSZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgY29tcHV0ZXJNYXN0ZXIucGxhY2VTaGlwKHF1ZXVlWzBdLCBwb3NpdGlvblswXSwgcG9zaXRpb25bMV0sIGF4aXMpO1xuICAgICAgICBxdWV1ZS5zaGlmdCgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29tcHV0ZXJNYXN0ZXI7XG4gIH07XG5cbiAgcmV0dXJuIHsgdHVybiwgcmFuZG9taXplQm9hcmQgfTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG5leHBvcnQgY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZFNxdWFyZSA9ICgpID0+ICh7XG4gICAgcG9zaXRpb246IHVuZGVmaW5lZCwgd2hhdE9jY3VwaWVzOiB1bmRlZmluZWQsIGluZGV4OiB1bmRlZmluZWQsIGhpdE9yTWlzczogdW5kZWZpbmVkLFxuICB9KTtcblxuICBjb25zdCBib2FyZCA9IFtbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXV07XG4gIGxldCBjb3VudGVyID0gMDtcbiAgYm9hcmQuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBjb2x1bW5baV0gPSBib2FyZFNxdWFyZSgpO1xuICAgICAgY29sdW1uW2ldLnBvc2l0aW9uID0gW2NvdW50ZXIsIGldO1xuICAgICAgaWYgKGkgPT09IDkpIGNvdW50ZXIgKz0gMTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGdldEJvYXJkU3F1YXJlID0gKHhwb3MsIHlwb3MpID0+IGJvYXJkW3hwb3NdW3lwb3NdO1xuXG4gIGNvbnN0IGdldEVtcHR5U3F1YXJlcyA9ICgpID0+IHtcbiAgICBjb25zdCBlbXB0eVNxdWFyZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBpZiAoYm9hcmRbaV1bal0uaGl0T3JNaXNzID09PSB1bmRlZmluZWQpIGVtcHR5U3F1YXJlc1tlbXB0eVNxdWFyZXMubGVuZ3RoXSA9IGJvYXJkW2ldW2pdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZW1wdHlTcXVhcmVzO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCBwb3N4LCBwb3N5LCBhbGlnbm1lbnQpID0+IHtcbiAgICBsZXQgcG9zaXRpb25YID0gcG9zeDtcbiAgICBsZXQgcG9zaXRpb25ZID0gcG9zeTtcbiAgICBjb25zdCBoZWFkT2ZTaGlwID0gYm9hcmRbcG9zaXRpb25YXVtwb3NpdGlvblldO1xuICAgIGhlYWRPZlNoaXAud2hhdE9jY3VwaWVzID0gc2hpcDtcbiAgICBoZWFkT2ZTaGlwLmluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChhbGlnbm1lbnQgPT09ICd4Jykge1xuICAgICAgICBwb3NpdGlvblggKz0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvc2l0aW9uWSArPSAxO1xuICAgICAgfVxuICAgICAgYm9hcmRbcG9zaXRpb25YXVtwb3NpdGlvblldLndoYXRPY2N1cGllcyA9IHNoaXA7XG4gICAgICBib2FyZFtwb3NpdGlvblhdW3Bvc2l0aW9uWV0uaW5kZXggPSBpO1xuICAgIH1cbiAgICByZXR1cm4gaGVhZE9mU2hpcDtcbiAgfTtcblxuICBjb25zdCBjYW5TaGlwQmVQbGFjZWQgPSAoc2hpcCwgcG9zeCwgcG9zeSwgYWxpZ25tZW50KSA9PiB7XG4gICAgbGV0IHBvc2l0aW9uWCA9IHBvc3g7XG4gICAgbGV0IHBvc2l0aW9uWSA9IHBvc3k7XG4gICAgY29uc3QgaGVhZE9mU2hpcCA9IGJvYXJkW3Bvc2l0aW9uWF1bcG9zaXRpb25ZXTtcbiAgICBpZiAoaGVhZE9mU2hpcC53aGF0T2NjdXBpZXMgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGFsaWdubWVudCA9PT0gJ3gnKSB7XG4gICAgICAgIHBvc2l0aW9uWCArPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zaXRpb25ZICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAocG9zaXRpb25YIDwgMCB8fCBwb3NpdGlvblggPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAocG9zaXRpb25ZIDwgMCB8fCBwb3NpdGlvblkgPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoYm9hcmRbcG9zaXRpb25YXVtwb3NpdGlvblldLndoYXRPY2N1cGllcyAhPT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHJlY2lldmVBdHRhY2sgPSAobWFzdGVyLCBhdHRhY2spID0+IHtcbiAgICBpZiAodHlwZW9mIG1hc3Rlci53aGF0T2NjdXBpZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBhdHRhY2tpbmdTaGlwID0gbWFzdGVyLndoYXRPY2N1cGllcztcbiAgICAgIGF0dGFjay53aGF0T2NjdXBpZXMgPSBtYXN0ZXIud2hhdE9jY3VwaWVzO1xuICAgICAgYXR0YWNrLmhpdE9yTWlzcyA9ICdoaXQnO1xuICAgICAgbWFzdGVyLmhpdE9yTWlzcyA9ICdoaXQnO1xuICAgICAgYXR0YWNraW5nU2hpcC5oaXQobWFzdGVyLmluZGV4KTtcbiAgICAgIHJldHVybiBhdHRhY2tpbmdTaGlwO1xuICAgIH1cbiAgICBhdHRhY2suaGl0T3JNaXNzID0gJ21pc3MnO1xuICAgIG1hc3Rlci5oaXRPck1pc3MgPSAnbWlzcyc7XG4gICAgcmV0dXJuIGF0dGFjay5oaXRPck1pc3M7XG4gIH07XG5cbiAgY29uc3QgaXNBbGxTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGFyciA9IGJvYXJkO1xuICAgIGxldCBhbGxFbXB0eSA9IHRydWU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKGFycltpXVtqXS53aGF0T2NjdXBpZXMgIT09IHVuZGVmaW5lZCAmJiBhcnJbaV1bal0uaGl0T3JNaXNzICE9PSAnaGl0Jykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJyW2ldW2pdLndoYXRPY2N1cGllcyAhPT0gdW5kZWZpbmVkKSBhbGxFbXB0eSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYWxsRW1wdHkgPT09IHRydWUpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBnaXZlSGVhZE9mU2hpcHMgPSAoKSA9PiB7XG4gICAgY29uc3QgYXJyID0gYm9hcmQ7XG4gICAgY29uc3QgaGVhZHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBpZiAoYXJyW2ldW2pdLmluZGV4ID09PSAwKSBoZWFkc1toZWFkcy5sZW5ndGhdID0gYXJyW2ldW2pdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaGVhZHM7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRCb2FyZFNxdWFyZSxcbiAgICBnZXRFbXB0eVNxdWFyZXMsXG4gICAgcGxhY2VTaGlwLFxuICAgIGNhblNoaXBCZVBsYWNlZCxcbiAgICByZWNpZXZlQXR0YWNrLFxuICAgIGlzQWxsU3VuayxcbiAgICBnaXZlSGVhZE9mU2hpcHMsXG4gIH07XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXRyYWlsaW5nLXNwYWNlcyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IENvbXB1dGVyIH0gZnJvbSAnLi9jb21wdXRlcic7XG5pbXBvcnQgeyBET00gfSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcblxuZXhwb3J0IGNvbnN0IEdhbWVmbG93ID0gKCgpID0+IHtcbiAgY29uc3QgcGxheWVyID0gUGxheWVyKCk7XG4gIGxldCBwbGF5ZXJNYXN0ZXIgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgcGxheWVyQXR0YWNrID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyID0gQ29tcHV0ZXIoKTtcbiAgbGV0IGNvbXB1dGVyTWFzdGVyID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyQXR0YWNrID0gR2FtZWJvYXJkKCk7XG4gIGxldCBhY3RpdmVTaGlwID0gU2hpcCg1KTtcbiAgYWN0aXZlU2hpcC5zZXROYW1lKCdDYXJyaWVyJyk7XG4gIGxldCBheGlzID0gJ3gnO1xuXG4gIGNvbnN0IHN0YXJ0R2FtZSA9IChldmVudCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5UGxheWVyJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgaWYgKGV2ZW50KSBwbGF5ZXJNYXN0ZXIgPSBjb21wdXRlci5yYW5kb21pemVCb2FyZCgpO1xuICAgIGNvbXB1dGVyTWFzdGVyID0gY29tcHV0ZXIucmFuZG9taXplQm9hcmQoKTtcbiAgICBET00uc3RhcnRHYW1lKHBsYXllck1hc3Rlcik7XG4gIH07XG5cbiAgY29uc3Qgc3dpdGNoQXhpcyA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgYXhpcyA9ICd5JztcbiAgICAgIERPTS5zd2l0Y2hBeGlzKGF4aXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBheGlzID0gJ3gnO1xuICAgICAgRE9NLnN3aXRjaEF4aXMoYXhpcyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IHhwb3MgPSBldmVudC50YXJnZXQuZGF0YXNldC54cG9zO1xuICAgIGNvbnN0IHlwb3MgPSBldmVudC50YXJnZXQuZGF0YXNldC55cG9zO1xuICAgIGlmIChwbGF5ZXJNYXN0ZXIuY2FuU2hpcEJlUGxhY2VkKGFjdGl2ZVNoaXAsIHBhcnNlSW50KHhwb3MpLCBwYXJzZUludCh5cG9zKSwgYXhpcykgPT09IGZhbHNlKSByZXR1cm47XG4gICAgcGxheWVyTWFzdGVyLnBsYWNlU2hpcChhY3RpdmVTaGlwLCBwYXJzZUludCh4cG9zKSwgcGFyc2VJbnQoeXBvcyksIGF4aXMpO1xuICAgIGlmIChhY3RpdmVTaGlwLnNldE5hbWUoKSA9PT0gJ0Rlc3Ryb3llcicpIHJldHVybiBzdGFydEdhbWUoKTtcbiAgICBhY3RpdmVTaGlwID0gRE9NLnBsYWNlU2hpcChldmVudCk7XG4gIH07XG5cbiAgY29uc3QgcmVzZXRCb2FyZENvbG9ycyA9ICgpID0+IHtcbiAgICBET00ucmVzZXRCb2FyZENvbG9ycyhwbGF5ZXJNYXN0ZXIpO1xuICB9O1xuXG4gIGNvbnN0IGhvdmVyUGxheWVyRm9ybSA9IChldmVudCkgPT4ge1xuICAgIERPTS5ob3ZlclBsYXllckZvcm0oZXZlbnQsIHBsYXllck1hc3Rlcik7XG4gIH07XG5cbiAgY29uc3QgdHVybiA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIEdhbWVmbG93LnR1cm4pO1xuICAgIGNvbnN0IHhwb3MgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC54cG9zKTtcbiAgICBjb25zdCB5cG9zID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQueXBvcyk7XG4gICAgY29uc3QgcGxheWVyUmVzdWx0ID0gcGxheWVyLnR1cm4ocGxheWVyQXR0YWNrLCBjb21wdXRlck1hc3RlciwgeHBvcywgeXBvcyk7XG4gICAgaWYgKHR5cGVvZiBwbGF5ZXJSZXN1bHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBET00uaGl0RWZmZWN0KGV2ZW50LnRhcmdldCwgJ2hpdCcpO1xuICAgICAgaWYgKGNvbXB1dGVyTWFzdGVyLmlzQWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHdpbm5lck92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheVdpbm5lcicpO1xuICAgICAgICBjb25zdCB3aW5uZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbm5lcicpLmNoaWxkcmVuWzBdO1xuICAgICAgICB3aW5uZXJUZXh0LnRleHRDb250ZW50ID0gJ1BsYXllciBXb24hJztcbiAgICAgICAgd2lubmVyT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZScpO1xuICAgICAgICB3aW5uZXJPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIERPTS5oaXRFZmZlY3QoZXZlbnQudGFyZ2V0LCAnbWlzcycpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXB1dGVyUmVzdWx0ID0gY29tcHV0ZXIudHVybihjb21wdXRlckF0dGFjaywgcGxheWVyTWFzdGVyKTtcbiAgICBpZiAodHlwZW9mIGNvbXB1dGVyUmVzdWx0WzJdID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3QgaW5kZXggPSBjb21wdXRlclJlc3VsdFswXSArIChjb21wdXRlclJlc3VsdFsxXSAqIDEwKTtcbiAgICAgIGNvbnN0IG1hc3RlclBpZWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1tYXN0ZXInKS5jaGlsZHJlbltpbmRleF07XG4gICAgICBET00uaGl0RWZmZWN0KG1hc3RlclBpZWNlLCAnaGl0Jyk7XG4gICAgICBpZiAocGxheWVyTWFzdGVyLmlzQWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHdpbm5lck92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheVdpbm5lcicpO1xuICAgICAgICBjb25zdCB3aW5uZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbm5lcicpLmNoaWxkcmVuWzBdO1xuICAgICAgICB3aW5uZXJUZXh0LnRleHRDb250ZW50ID0gJ0NvbXB1dGVyIFdvbiEnO1xuICAgICAgICB3aW5uZXJPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlJyk7XG4gICAgICAgIHdpbm5lck92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gY29tcHV0ZXJSZXN1bHRbMF0gKyAoY29tcHV0ZXJSZXN1bHRbMV0gKiAxMCk7XG4gICAgICBjb25zdCBtYXN0ZXJQaWVjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItbWFzdGVyJykuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgRE9NLmhpdEVmZmVjdChtYXN0ZXJQaWVjZSwgJ21pc3MnKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzd2l0Y2hBeGlzLCBwbGFjZVNoaXAsIHN0YXJ0R2FtZSwgcmVzZXRCb2FyZENvbG9ycywgaG92ZXJQbGF5ZXJGb3JtLCB0dXJuLFxuICB9O1xufSkoKTtcblxuRE9NLmxvYWRCb2FyZCgpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIERPTS5yZXNpemVCb2FyZCk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBHYW1lZmxvdy5zd2l0Y2hBeGlzKTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYW5kb21pemUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEdhbWVmbG93LnN0YXJ0R2FtZSk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBHYW1lZmxvdy5yZXNldEJvYXJkQ29sb3JzKTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWFnYWluJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCkpO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tc2VxdWVuY2VzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbmV4cG9ydCBjb25zdCBQbGF5ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHR1cm4gPSAocGxheWVyQXR0YWNrLCBjb21wdXRlck1hc3RlciwgeHBvcywgeXBvcykgPT4ge1xuICAgIGNvbnN0IG1hc3RlclNxdWFyZSA9IGNvbXB1dGVyTWFzdGVyLmdldEJvYXJkU3F1YXJlKHhwb3MsIHlwb3MpO1xuICAgIGNvbnN0IGF0dGFja1NxdWFyZSA9IHBsYXllckF0dGFjay5nZXRCb2FyZFNxdWFyZSh4cG9zLCB5cG9zKTtcbiAgICBjb25zdCBoaXRPck1pc3MgPSBwbGF5ZXJBdHRhY2sucmVjaWV2ZUF0dGFjayhtYXN0ZXJTcXVhcmUsIGF0dGFja1NxdWFyZSk7XG4gICAgcmV0dXJuIGhpdE9yTWlzcztcbiAgfTtcblxuICByZXR1cm4geyB0dXJuIH07XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbmV4cG9ydCBjb25zdCBTaGlwID0gKGxlbmd0aCkgPT4ge1xuICBsZXQgbmFtZTtcblxuICBjb25zdCB3aGVyZUhpdCA9IG5ldyBBcnJheShsZW5ndGgpLmZpbGwoZmFsc2UpO1xuXG4gIGNvbnN0IHN1bmtTdGF0dXMgPSBmYWxzZTtcblxuICBjb25zdCBoaXQgPSAoaW5kZXgpID0+IHtcbiAgICB3aGVyZUhpdFtpbmRleF0gPSB0cnVlO1xuICAgIHJldHVybiB3aGVyZUhpdDtcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IHN0YXR1cyA9IHRydWU7XG4gICAgd2hlcmVIaXQuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgIGlmIChsb2NhdGlvbiA9PT0gZmFsc2UpIHN0YXR1cyA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHJldHVybiBzdGF0dXM7XG4gIH07XG5cbiAgY29uc3Qgc2V0TmFtZSA9IChuZXdOYW1lKSA9PiB7XG4gICAgaWYgKG5ld05hbWUgIT09IHVuZGVmaW5lZCkgbmFtZSA9IG5ld05hbWU7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBsZW5ndGgsXG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgICBzdW5rU3RhdHVzLFxuICAgIHNldE5hbWUsXG4gIH07XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==