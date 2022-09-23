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
  let activeShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(5);
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
    console.log(axis);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnRpbnVlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtcmV0dXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIHJhZGl4ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgR2FtZWZsb3cgfSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IERPTSA9ICgoKSA9PiB7XG4gIGxldCBhY3RpdmVTaGlwID0gU2hpcCg1KTtcbiAgYWN0aXZlU2hpcC5zZXROYW1lKCdDYXJyaWVyJyk7XG4gIGxldCBheGlzID0gJ3gnO1xuXG4gIGNvbnN0IHJlc2V0Qm9hcmRDb2xvcnMgPSAocGxheWVyTWFzdGVyKSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IDEwOyBrICs9IDEpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlU3EgPSBwbGF5ZXJNYXN0ZXIuZ2V0Qm9hcmRTcXVhcmUoaSwgaykud2hhdE9jY3VwaWVzO1xuICAgICAgICBjb25zdCBib2FyZEluZGV4ID0gcGFyc2VJbnQoay50b1N0cmluZygpICsgaS50b1N0cmluZygpKTtcbiAgICAgICAgaWYgKGFjdGl2ZVNxID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBib2FyZC5jaGlsZHJlbltib2FyZEluZGV4XS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMjA1Qic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm9hcmQuY2hpbGRyZW5bYm9hcmRJbmRleF0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNDNUI3ODMnO1xuICAgICAgICAgIGJvYXJkLmNoaWxkcmVuW2JvYXJkSW5kZXhdLnN0eWxlLmJvcmRlciA9ICcuNXB4IHNvbGlkICMwMDIwNUInO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhvdmVyUGxheWVyRm9ybSA9IChldmVudCwgcGxheWVyTWFzdGVyKSA9PiB7XG4gICAgcmVzZXRCb2FyZENvbG9ycyhwbGF5ZXJNYXN0ZXIpO1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHhwb3MgPSBldmVudC50YXJnZXQuZGF0YXNldC54cG9zO1xuICAgIGNvbnN0IHlwb3MgPSBldmVudC50YXJnZXQuZGF0YXNldC55cG9zO1xuICAgIGxldCBpbmRleCA9IHBhcnNlSW50KHlwb3MgKyB4cG9zKTtcbiAgICBpZiAocGxheWVyTWFzdGVyLmNhblNoaXBCZVBsYWNlZChhY3RpdmVTaGlwLCBwYXJzZUludCh4cG9zKSwgcGFyc2VJbnQoeXBvcyksIGF4aXMpID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIGxldCBhY3RpdmVUaWxlID0gZXZlbnQudGFyZ2V0O1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWN0aXZlU2hpcC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgYWN0aXZlVGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgICBhY3RpdmVUaWxlID0gYm9hcmQuY2hpbGRyZW5baW5kZXggKyAxXTtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2ZVRpbGUgPSBib2FyZC5jaGlsZHJlbltpbmRleCArIDEwXTtcbiAgICAgICAgaW5kZXggKz0gMTA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNoYW5nZVNoaXAgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXAtbmFtZScpO1xuICAgIGlmIChhY3RpdmVTaGlwLnNldE5hbWUoKSA9PT0gJ0NhcnJpZXInKSB7XG4gICAgICBhY3RpdmVTaGlwID0gU2hpcCg0KTtcbiAgICAgIGFjdGl2ZVNoaXAuc2V0TmFtZSgnQmF0dGxlc2hpcCcpO1xuICAgIH0gZWxzZSBpZiAoYWN0aXZlU2hpcC5zZXROYW1lKCkgPT09ICdCYXR0bGVzaGlwJykge1xuICAgICAgYWN0aXZlU2hpcCA9IFNoaXAoMyk7XG4gICAgICBhY3RpdmVTaGlwLnNldE5hbWUoJ0NydWlzZXInKTtcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZVNoaXAuc2V0TmFtZSgpID09PSAnQ3J1aXNlcicpIHtcbiAgICAgIGFjdGl2ZVNoaXAgPSBTaGlwKDMpO1xuICAgICAgYWN0aXZlU2hpcC5zZXROYW1lKCdTdWJtYXJpbmUnKTtcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZVNoaXAuc2V0TmFtZSgpID09PSAnU3VibWFyaW5lJykge1xuICAgICAgYWN0aXZlU2hpcCA9IFNoaXAoMik7XG4gICAgICBhY3RpdmVTaGlwLnNldE5hbWUoJ0Rlc3Ryb3llcicpO1xuICAgIH1cbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBhY3RpdmVTaGlwLnNldE5hbWUoKTtcbiAgICByZXR1cm4gYWN0aXZlU2hpcDtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZC1jb250YWluZXInKTtcbiAgICBjb25zdCB4cG9zID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQueHBvcztcbiAgICBjb25zdCB5cG9zID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQueXBvcztcbiAgICBsZXQgaW5kZXggPSBwYXJzZUludCh5cG9zICsgeHBvcyk7XG4gICAgbGV0IGFjdGl2ZVRpbGUgPSBldmVudC50YXJnZXQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3RpdmVTaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBhY3RpdmVUaWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjQzVCNzgzJztcbiAgICAgIGlmIChheGlzID09PSAneCcpIHtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgYWN0aXZlVGlsZSA9IGJvYXJkLmNoaWxkcmVuW2luZGV4XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ICs9IDEwO1xuICAgICAgICBhY3RpdmVUaWxlID0gYm9hcmQuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2hhbmdlU2hpcCgpO1xuICB9O1xuXG4gIGNvbnN0IGxvYWRCb2FyZCA9IChib2FyZCkgPT4ge1xuICAgIGlmIChib2FyZCA9PT0gdW5kZWZpbmVkIHx8IGJvYXJkLnRhcmdldCkgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgd2hpbGUgKGJvYXJkLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGJvYXJkLnJlbW92ZUNoaWxkKGJvYXJkLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBjb25zdCB7IHdpZHRoIH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShib2FyZCk7XG4gICAgYm9hcmQuc3R5bGUuaGVpZ2h0ID0gd2lkdGg7XG4gICAgY29uc3Qgc2l6ZSA9ICh3aWR0aC5zbGljZSgwLCB3aWR0aC5sZW5ndGggLSAyKSAvIDEwKSAtIDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3QgcGllY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcGllY2UuY2xhc3NMaXN0LmFkZCgnYm9hcmQtcGllY2UnKTtcbiAgICAgICAgcGllY2UuZGF0YXNldC54cG9zID0gajtcbiAgICAgICAgcGllY2UuZGF0YXNldC55cG9zID0gaTtcbiAgICAgICAgcGllY2Uuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZX1weGA7XG4gICAgICAgIHBpZWNlLnN0eWxlLndpZHRoID0gYCR7c2l6ZX1weGA7XG4gICAgICAgIGlmIChib2FyZC5nZXRBdHRyaWJ1dGUoJ2lkJykgPT09ICdib2FyZC1jb250YWluZXInKSB7XG4gICAgICAgICAgcGllY2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgR2FtZWZsb3cuaG92ZXJQbGF5ZXJGb3JtKTtcbiAgICAgICAgICBwaWVjZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEdhbWVmbG93LnBsYWNlU2hpcCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGllY2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBHYW1lZmxvdy50dXJuKTtcbiAgICAgICAgfVxuICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChwaWVjZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlc2l6ZUJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkQXJyID0gW107XG4gICAgY29uc3Qgb3ZlcmxheTEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheVdpbm5lcicpO1xuICAgIGNvbnN0IG92ZXJsYXkyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXlQbGF5ZXInKTtcbiAgICBpZiAob3ZlcmxheTEuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkgcmV0dXJuO1xuICAgIGlmIChvdmVybGF5Mi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICBib2FyZEFycltib2FyZEFyci5sZW5ndGhdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBib2FyZEFycltib2FyZEFyci5sZW5ndGhdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1tYXN0ZXInKTtcbiAgICAgIGJvYXJkQXJyW2JvYXJkQXJyLmxlbmd0aF0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWF0dGFjaycpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkQXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCB7IHdpZHRoIH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShib2FyZEFycltpXSk7XG4gICAgICBib2FyZEFycltpXS5zdHlsZS5oZWlnaHQgPSB3aWR0aDtcbiAgICAgIGNvbnN0IHNpemUgPSAod2lkdGguc2xpY2UoMCwgd2lkdGgubGVuZ3RoIC0gMikgLyAxMCkgLSAxO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgMTA7IGsgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gaiArIChrICogMTApO1xuICAgICAgICAgIGJvYXJkQXJyW2ldLmNoaWxkcmVuW2luZGV4XS5zdHlsZS53aWR0aCA9IGAke3NpemV9cHhgO1xuICAgICAgICAgIGJvYXJkQXJyW2ldLmNoaWxkcmVuW2luZGV4XS5zdHlsZS5oZWlnaHQgPSBgJHtzaXplfXB4YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBzd2l0Y2hBeGlzID0gKG5ld0F4aXMpID0+IHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlJyk7XG4gICAgYXhpcyA9IG5ld0F4aXM7XG4gICAgY29uc29sZS5sb2coYXhpcyk7XG4gICAgaWYgKG5ld0F4aXMgPT09ICd4Jykge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1JvdGF0ZSB0byBZJztcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1JvdGF0ZSB0byBYJztcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc3RhcnRHYW1lID0gKHBsYXllck1hc3RlcikgPT4ge1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheVBsYXllcicpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnLmFjdGl2ZScpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcbiAgICBjb25zdCBwbGF5ZXJNYXN0ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItbWFzdGVyJyk7XG4gICAgY29uc3QgcGxheWVyQXR0YWNrQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWF0dGFjaycpO1xuICAgIGxvYWRCb2FyZChwbGF5ZXJNYXN0ZXJCb2FyZCk7XG4gICAgbG9hZEJvYXJkKHBsYXllckF0dGFja0JvYXJkKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBpZiAocGxheWVyTWFzdGVyLmdldEJvYXJkU3F1YXJlKGksIGopLndoYXRPY2N1cGllcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChqLnRvU3RyaW5nKCkgKyBpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIHBsYXllck1hc3RlckJvYXJkLmNoaWxkcmVuW2luZGV4XS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0M1Qjc4Myc7XG4gICAgICAgICAgcGxheWVyTWFzdGVyQm9hcmQuY2hpbGRyZW5baW5kZXhdLnN0eWxlLmJvcmRlciA9ICcuNXB4IHNvbGlkICMwMDIwNUInO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhpdEVmZmVjdCA9IChzcXVhcmUsIGhpdFN0YXR1cykgPT4ge1xuICAgIHNxdWFyZS50ZXh0Q29udGVudCA9ICfil48nO1xuICAgIChoaXRTdGF0dXMgPT09ICdoaXQnKSA/IHNxdWFyZS5zdHlsZS5jb2xvciA9ICdyZWQnIDogc3F1YXJlLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJlc2V0Qm9hcmRDb2xvcnMsIGhvdmVyUGxheWVyRm9ybSwgbG9hZEJvYXJkLCByZXNpemVCb2FyZCwgc3dpdGNoQXhpcywgcGxhY2VTaGlwLCBzdGFydEdhbWUsIGhpdEVmZmVjdCxcbiAgfTtcbn0pKCk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5leHBvcnQgY29uc3QgQ29tcHV0ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHNlbGVjdFBvc2l0aW9uID0gKGNvbXB1dGVyQXR0YWNrKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGNvbXB1dGVyQXR0YWNrLmdldEVtcHR5U3F1YXJlcygpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5sZW5ndGgpXTtcbiAgICByZXR1cm4gc2VsZWN0aW9uLnBvc2l0aW9uO1xuICB9O1xuXG4gIGNvbnN0IHNlbGVjdEF4aXMgPSAoKSA9PiB7XG4gICAgY29uc3QgbnVtYmVyID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgICByZXR1cm4gKG51bWJlciA9PT0gMCkgPyAneCcgOiAneSc7XG4gIH07XG5cbiAgY29uc3QgdHVybiA9IChjb21wdXRlckF0dGFjaywgcGxheWVyTWFzdGVyKSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gc2VsZWN0UG9zaXRpb24oY29tcHV0ZXJBdHRhY2spO1xuICAgIGNvbnN0IHhwb3MgPSBzcXVhcmVbMF07XG4gICAgY29uc3QgeXBvcyA9IHNxdWFyZVsxXTtcbiAgICBjb25zdCBtYXN0ZXJTcXVhcmUgPSBwbGF5ZXJNYXN0ZXIuZ2V0Qm9hcmRTcXVhcmUoeHBvcywgeXBvcyk7XG4gICAgY29uc3QgYXR0YWNrU3F1YXJlID0gY29tcHV0ZXJBdHRhY2suZ2V0Qm9hcmRTcXVhcmUoeHBvcywgeXBvcyk7XG4gICAgY29uc3QgaGl0T3JNaXNzID0gY29tcHV0ZXJBdHRhY2sucmVjaWV2ZUF0dGFjayhtYXN0ZXJTcXVhcmUsIGF0dGFja1NxdWFyZSk7XG4gICAgcmV0dXJuIFt4cG9zLCB5cG9zLCBoaXRPck1pc3NdO1xuICB9O1xuXG4gIGNvbnN0IHJhbmRvbWl6ZUJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbXB1dGVyTWFzdGVyID0gR2FtZWJvYXJkKCk7XG4gICAgY29uc3QgcXVldWUgPSBbU2hpcCgyKSwgU2hpcCgyKSwgU2hpcCgzKSwgU2hpcCg0KSwgU2hpcCg1KV07XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgY29uc3QgcG9zaXRpb24gPSBzZWxlY3RQb3NpdGlvbihjb21wdXRlck1hc3Rlcik7XG4gICAgICBjb25zdCBheGlzID0gc2VsZWN0QXhpcygpO1xuICAgICAgY29uc3QgcGxhY2VtZW50UmVzdWx0ID0gY29tcHV0ZXJNYXN0ZXIuY2FuU2hpcEJlUGxhY2VkKHF1ZXVlWzBdLCBwb3NpdGlvblswXSwgcG9zaXRpb25bMV0sIGF4aXMpO1xuICAgICAgaWYgKHBsYWNlbWVudFJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb21wdXRlck1hc3Rlci5wbGFjZVNoaXAocXVldWVbMF0sIHBvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSwgYXhpcyk7XG4gICAgICAgIHF1ZXVlLnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wdXRlck1hc3RlcjtcbiAgfTtcblxuICByZXR1cm4geyB0dXJuLCByYW5kb21pemVCb2FyZCB9O1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbmV4cG9ydCBjb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkU3F1YXJlID0gKCkgPT4gKHtcbiAgICBwb3NpdGlvbjogdW5kZWZpbmVkLCB3aGF0T2NjdXBpZXM6IHVuZGVmaW5lZCwgaW5kZXg6IHVuZGVmaW5lZCwgaGl0T3JNaXNzOiB1bmRlZmluZWQsXG4gIH0pO1xuXG4gIGNvbnN0IGJvYXJkID0gW1tdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXTtcbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBib2FyZC5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGNvbHVtbltpXSA9IGJvYXJkU3F1YXJlKCk7XG4gICAgICBjb2x1bW5baV0ucG9zaXRpb24gPSBbY291bnRlciwgaV07XG4gICAgICBpZiAoaSA9PT0gOSkgY291bnRlciArPSAxO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgZ2V0Qm9hcmRTcXVhcmUgPSAoeHBvcywgeXBvcykgPT4gYm9hcmRbeHBvc11beXBvc107XG5cbiAgY29uc3QgZ2V0RW1wdHlTcXVhcmVzID0gKCkgPT4ge1xuICAgIGNvbnN0IGVtcHR5U3F1YXJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChib2FyZFtpXVtqXS5oaXRPck1pc3MgPT09IHVuZGVmaW5lZCkgZW1wdHlTcXVhcmVzW2VtcHR5U3F1YXJlcy5sZW5ndGhdID0gYm9hcmRbaV1bal07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbXB0eVNxdWFyZXM7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHBvc3gsIHBvc3ksIGFsaWdubWVudCkgPT4ge1xuICAgIGxldCBwb3NpdGlvblggPSBwb3N4O1xuICAgIGxldCBwb3NpdGlvblkgPSBwb3N5O1xuICAgIGNvbnN0IGhlYWRPZlNoaXAgPSBib2FyZFtwb3NpdGlvblhdW3Bvc2l0aW9uWV07XG4gICAgaGVhZE9mU2hpcC53aGF0T2NjdXBpZXMgPSBzaGlwO1xuICAgIGhlYWRPZlNoaXAuaW5kZXggPSAwO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGFsaWdubWVudCA9PT0gJ3gnKSB7XG4gICAgICAgIHBvc2l0aW9uWCArPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zaXRpb25ZICs9IDE7XG4gICAgICB9XG4gICAgICBib2FyZFtwb3NpdGlvblhdW3Bvc2l0aW9uWV0ud2hhdE9jY3VwaWVzID0gc2hpcDtcbiAgICAgIGJvYXJkW3Bvc2l0aW9uWF1bcG9zaXRpb25ZXS5pbmRleCA9IGk7XG4gICAgfVxuICAgIHJldHVybiBoZWFkT2ZTaGlwO1xuICB9O1xuXG4gIGNvbnN0IGNhblNoaXBCZVBsYWNlZCA9IChzaGlwLCBwb3N4LCBwb3N5LCBhbGlnbm1lbnQpID0+IHtcbiAgICBsZXQgcG9zaXRpb25YID0gcG9zeDtcbiAgICBsZXQgcG9zaXRpb25ZID0gcG9zeTtcbiAgICBjb25zdCBoZWFkT2ZTaGlwID0gYm9hcmRbcG9zaXRpb25YXVtwb3NpdGlvblldO1xuICAgIGlmIChoZWFkT2ZTaGlwLndoYXRPY2N1cGllcyAhPT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYWxpZ25tZW50ID09PSAneCcpIHtcbiAgICAgICAgcG9zaXRpb25YICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3NpdGlvblkgKz0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3NpdGlvblggPCAwIHx8IHBvc2l0aW9uWCA+IDkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChwb3NpdGlvblkgPCAwIHx8IHBvc2l0aW9uWSA+IDkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChib2FyZFtwb3NpdGlvblhdW3Bvc2l0aW9uWV0ud2hhdE9jY3VwaWVzICE9PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgcmVjaWV2ZUF0dGFjayA9IChtYXN0ZXIsIGF0dGFjaykgPT4ge1xuICAgIGlmICh0eXBlb2YgbWFzdGVyLndoYXRPY2N1cGllcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IGF0dGFja2luZ1NoaXAgPSBtYXN0ZXIud2hhdE9jY3VwaWVzO1xuICAgICAgYXR0YWNrLndoYXRPY2N1cGllcyA9IG1hc3Rlci53aGF0T2NjdXBpZXM7XG4gICAgICBhdHRhY2suaGl0T3JNaXNzID0gJ2hpdCc7XG4gICAgICBtYXN0ZXIuaGl0T3JNaXNzID0gJ2hpdCc7XG4gICAgICBhdHRhY2tpbmdTaGlwLmhpdChtYXN0ZXIuaW5kZXgpO1xuICAgICAgcmV0dXJuIGF0dGFja2luZ1NoaXA7XG4gICAgfVxuICAgIGF0dGFjay5oaXRPck1pc3MgPSAnbWlzcyc7XG4gICAgbWFzdGVyLmhpdE9yTWlzcyA9ICdtaXNzJztcbiAgICByZXR1cm4gYXR0YWNrLmhpdE9yTWlzcztcbiAgfTtcblxuICBjb25zdCBpc0FsbFN1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgYXJyID0gYm9hcmQ7XG4gICAgbGV0IGFsbEVtcHR5ID0gdHJ1ZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBpZiAoYXJyW2ldW2pdLndoYXRPY2N1cGllcyAhPT0gdW5kZWZpbmVkICYmIGFycltpXVtqXS5oaXRPck1pc3MgIT09ICdoaXQnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcnJbaV1bal0ud2hhdE9jY3VwaWVzICE9PSB1bmRlZmluZWQpIGFsbEVtcHR5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhbGxFbXB0eSA9PT0gdHJ1ZSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGdpdmVIZWFkT2ZTaGlwcyA9ICgpID0+IHtcbiAgICBjb25zdCBhcnIgPSBib2FyZDtcbiAgICBjb25zdCBoZWFkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChhcnJbaV1bal0uaW5kZXggPT09IDApIGhlYWRzW2hlYWRzLmxlbmd0aF0gPSBhcnJbaV1bal07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoZWFkcztcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldEJvYXJkU3F1YXJlLFxuICAgIGdldEVtcHR5U3F1YXJlcyxcbiAgICBwbGFjZVNoaXAsXG4gICAgY2FuU2hpcEJlUGxhY2VkLFxuICAgIHJlY2lldmVBdHRhY2ssXG4gICAgaXNBbGxTdW5rLFxuICAgIGdpdmVIZWFkT2ZTaGlwcyxcbiAgfTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdHJhaWxpbmctc3BhY2VzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgQ29tcHV0ZXIgfSBmcm9tICcuL2NvbXB1dGVyJztcbmltcG9ydCB7IERPTSB9IGZyb20gJy4vRE9NJztcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuXG5leHBvcnQgY29uc3QgR2FtZWZsb3cgPSAoKCkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcbiAgbGV0IHBsYXllck1hc3RlciA9IEdhbWVib2FyZCgpO1xuICBjb25zdCBwbGF5ZXJBdHRhY2sgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBDb21wdXRlcigpO1xuICBsZXQgY29tcHV0ZXJNYXN0ZXIgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXJBdHRhY2sgPSBHYW1lYm9hcmQoKTtcbiAgbGV0IGFjdGl2ZVNoaXAgPSBTaGlwKDUpO1xuICBhY3RpdmVTaGlwLnNldE5hbWUoJ0NhcnJpZXInKTtcbiAgbGV0IGF4aXMgPSAneCc7XG5cbiAgY29uc3Qgc3RhcnRHYW1lID0gKGV2ZW50KSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXlQbGF5ZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICBpZiAoZXZlbnQpIHBsYXllck1hc3RlciA9IGNvbXB1dGVyLnJhbmRvbWl6ZUJvYXJkKCk7XG4gICAgY29tcHV0ZXJNYXN0ZXIgPSBjb21wdXRlci5yYW5kb21pemVCb2FyZCgpO1xuICAgIERPTS5zdGFydEdhbWUocGxheWVyTWFzdGVyKTtcbiAgfTtcblxuICBjb25zdCBzd2l0Y2hBeGlzID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICBheGlzID0gJ3knO1xuICAgICAgRE9NLnN3aXRjaEF4aXMoYXhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF4aXMgPSAneCc7XG4gICAgICBET00uc3dpdGNoQXhpcyhheGlzKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgeHBvcyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnhwb3M7XG4gICAgY29uc3QgeXBvcyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnlwb3M7XG4gICAgaWYgKHBsYXllck1hc3Rlci5jYW5TaGlwQmVQbGFjZWQoYWN0aXZlU2hpcCwgcGFyc2VJbnQoeHBvcyksIHBhcnNlSW50KHlwb3MpLCBheGlzKSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICBwbGF5ZXJNYXN0ZXIucGxhY2VTaGlwKGFjdGl2ZVNoaXAsIHBhcnNlSW50KHhwb3MpLCBwYXJzZUludCh5cG9zKSwgYXhpcyk7XG4gICAgaWYgKGFjdGl2ZVNoaXAuc2V0TmFtZSgpID09PSAnRGVzdHJveWVyJykgcmV0dXJuIHN0YXJ0R2FtZSgpO1xuICAgIGFjdGl2ZVNoaXAgPSBET00ucGxhY2VTaGlwKGV2ZW50KTtcbiAgfTtcblxuICBjb25zdCByZXNldEJvYXJkQ29sb3JzID0gKCkgPT4ge1xuICAgIERPTS5yZXNldEJvYXJkQ29sb3JzKHBsYXllck1hc3Rlcik7XG4gIH07XG5cbiAgY29uc3QgaG92ZXJQbGF5ZXJGb3JtID0gKGV2ZW50KSA9PiB7XG4gICAgRE9NLmhvdmVyUGxheWVyRm9ybShldmVudCwgcGxheWVyTWFzdGVyKTtcbiAgfTtcblxuICBjb25zdCB0dXJuID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgR2FtZWZsb3cudHVybik7XG4gICAgY29uc3QgeHBvcyA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0Lnhwb3MpO1xuICAgIGNvbnN0IHlwb3MgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC55cG9zKTtcbiAgICBjb25zdCBwbGF5ZXJSZXN1bHQgPSBwbGF5ZXIudHVybihwbGF5ZXJBdHRhY2ssIGNvbXB1dGVyTWFzdGVyLCB4cG9zLCB5cG9zKTtcbiAgICBpZiAodHlwZW9mIHBsYXllclJlc3VsdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIERPTS5oaXRFZmZlY3QoZXZlbnQudGFyZ2V0LCAnaGl0Jyk7XG4gICAgICBpZiAoY29tcHV0ZXJNYXN0ZXIuaXNBbGxTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgd2lubmVyT3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5V2lubmVyJyk7XG4gICAgICAgIGNvbnN0IHdpbm5lclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lubmVyJykuY2hpbGRyZW5bMF07XG4gICAgICAgIHdpbm5lclRleHQudGV4dENvbnRlbnQgPSAnUGxheWVyIFdvbiEnO1xuICAgICAgICB3aW5uZXJPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlJyk7XG4gICAgICAgIHdpbm5lck92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgRE9NLmhpdEVmZmVjdChldmVudC50YXJnZXQsICdtaXNzJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY29tcHV0ZXJSZXN1bHQgPSBjb21wdXRlci50dXJuKGNvbXB1dGVyQXR0YWNrLCBwbGF5ZXJNYXN0ZXIpO1xuICAgIGlmICh0eXBlb2YgY29tcHV0ZXJSZXN1bHRbMl0gPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGNvbXB1dGVyUmVzdWx0WzBdICsgKGNvbXB1dGVyUmVzdWx0WzFdICogMTApO1xuICAgICAgY29uc3QgbWFzdGVyUGllY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW1hc3RlcicpLmNoaWxkcmVuW2luZGV4XTtcbiAgICAgIERPTS5oaXRFZmZlY3QobWFzdGVyUGllY2UsICdoaXQnKTtcbiAgICAgIGlmIChwbGF5ZXJNYXN0ZXIuaXNBbGxTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgd2lubmVyT3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5V2lubmVyJyk7XG4gICAgICAgIGNvbnN0IHdpbm5lclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lubmVyJykuY2hpbGRyZW5bMF07XG4gICAgICAgIHdpbm5lclRleHQudGV4dENvbnRlbnQgPSAnQ29tcHV0ZXIgV29uISc7XG4gICAgICAgIHdpbm5lck92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgd2lubmVyT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5kZXggPSBjb21wdXRlclJlc3VsdFswXSArIChjb21wdXRlclJlc3VsdFsxXSAqIDEwKTtcbiAgICAgIGNvbnN0IG1hc3RlclBpZWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1tYXN0ZXInKS5jaGlsZHJlbltpbmRleF07XG4gICAgICBET00uaGl0RWZmZWN0KG1hc3RlclBpZWNlLCAnbWlzcycpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHN3aXRjaEF4aXMsIHBsYWNlU2hpcCwgc3RhcnRHYW1lLCByZXNldEJvYXJkQ29sb3JzLCBob3ZlclBsYXllckZvcm0sIHR1cm4sXG4gIH07XG59KSgpO1xuXG5ET00ubG9hZEJvYXJkKCk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgRE9NLnJlc2l6ZUJvYXJkKTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb3RhdGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEdhbWVmbG93LnN3aXRjaEF4aXMpO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhbmRvbWl6ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgR2FtZWZsb3cuc3RhcnRHYW1lKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZC1jb250YWluZXInKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIEdhbWVmbG93LnJlc2V0Qm9hcmRDb2xvcnMpO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYWdhaW4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1zZXF1ZW5jZXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuZXhwb3J0IGNvbnN0IFBsYXllciA9ICgpID0+IHtcbiAgY29uc3QgdHVybiA9IChwbGF5ZXJBdHRhY2ssIGNvbXB1dGVyTWFzdGVyLCB4cG9zLCB5cG9zKSA9PiB7XG4gICAgY29uc3QgbWFzdGVyU3F1YXJlID0gY29tcHV0ZXJNYXN0ZXIuZ2V0Qm9hcmRTcXVhcmUoeHBvcywgeXBvcyk7XG4gICAgY29uc3QgYXR0YWNrU3F1YXJlID0gcGxheWVyQXR0YWNrLmdldEJvYXJkU3F1YXJlKHhwb3MsIHlwb3MpO1xuICAgIGNvbnN0IGhpdE9yTWlzcyA9IHBsYXllckF0dGFjay5yZWNpZXZlQXR0YWNrKG1hc3RlclNxdWFyZSwgYXR0YWNrU3F1YXJlKTtcbiAgICByZXR1cm4gaGl0T3JNaXNzO1xuICB9O1xuXG4gIHJldHVybiB7IHR1cm4gfTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuZXhwb3J0IGNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGxldCBuYW1lO1xuXG4gIGNvbnN0IHdoZXJlSGl0ID0gbmV3IEFycmF5KGxlbmd0aCkuZmlsbChmYWxzZSk7XG5cbiAgY29uc3Qgc3Vua1N0YXR1cyA9IGZhbHNlO1xuXG4gIGNvbnN0IGhpdCA9IChpbmRleCkgPT4ge1xuICAgIHdoZXJlSGl0W2luZGV4XSA9IHRydWU7XG4gICAgcmV0dXJuIHdoZXJlSGl0O1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgc3RhdHVzID0gdHJ1ZTtcbiAgICB3aGVyZUhpdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgaWYgKGxvY2F0aW9uID09PSBmYWxzZSkgc3RhdHVzID0gZmFsc2U7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0YXR1cztcbiAgfTtcblxuICBjb25zdCBzZXROYW1lID0gKG5ld05hbWUpID0+IHtcbiAgICBpZiAobmV3TmFtZSAhPT0gdW5kZWZpbmVkKSBuYW1lID0gbmV3TmFtZTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGxlbmd0aCxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIHN1bmtTdGF0dXMsXG4gICAgc2V0TmFtZSxcbiAgfTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9