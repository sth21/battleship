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
    resetBoardColors, hoverPlayerForm, loadBoard, switchAxis, placeShip, startGame, hitEffect,
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
window.addEventListener('resize', _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.loadBoard);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSwrQ0FBYTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTSwrQ0FBYTtBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsK0NBQWE7QUFDYixrQ0FBa0MsK0NBQWE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzVHQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDcENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tY29udGludWUgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1kZXN0cnVjdHVyaW5nICovXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBHYW1lZmxvdyB9IGZyb20gJy4vaW5kZXgnO1xuXG5leHBvcnQgY29uc3QgRE9NID0gKCgpID0+IHtcbiAgbGV0IGF4aXMgPSAneCc7XG4gIGxldCBhY3RpdmVTaGlwID0gU2hpcCg1KTtcbiAgYWN0aXZlU2hpcC5zZXROYW1lKCdDYXJyaWVyJyk7XG5cbiAgY29uc3QgcmVzZXRCb2FyZENvbG9ycyA9IChwbGF5ZXJNYXN0ZXIpID0+IHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZC1jb250YWluZXInKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgMTA7IGsgKz0gMSkge1xuICAgICAgICBjb25zdCBhY3RpdmVTcSA9IHBsYXllck1hc3Rlci5nZXRCb2FyZFNxdWFyZShpLCBrKS53aGF0T2NjdXBpZXM7XG4gICAgICAgIGNvbnN0IGJvYXJkSW5kZXggPSBwYXJzZUludChrLnRvU3RyaW5nKCkgKyBpLnRvU3RyaW5nKCkpO1xuICAgICAgICBpZiAoYWN0aXZlU3EgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJvYXJkLmNoaWxkcmVuW2JvYXJkSW5kZXhdLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMDAyMDVCJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBib2FyZC5jaGlsZHJlbltib2FyZEluZGV4XS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0M1Qjc4Myc7XG4gICAgICAgICAgYm9hcmQuY2hpbGRyZW5bYm9hcmRJbmRleF0uc3R5bGUuYm9yZGVyID0gJy41cHggc29saWQgIzAwMjA1Qic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaG92ZXJQbGF5ZXJGb3JtID0gKGV2ZW50LCBwbGF5ZXJNYXN0ZXIpID0+IHtcbiAgICByZXNldEJvYXJkQ29sb3JzKHBsYXllck1hc3Rlcik7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgeHBvcyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnhwb3M7XG4gICAgY29uc3QgeXBvcyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnlwb3M7XG4gICAgbGV0IGluZGV4ID0gcGFyc2VJbnQoeXBvcyArIHhwb3MpO1xuICAgIGlmIChwbGF5ZXJNYXN0ZXIuY2FuU2hpcEJlUGxhY2VkKGFjdGl2ZVNoaXAsIHBhcnNlSW50KHhwb3MpLCBwYXJzZUludCh5cG9zKSwgYXhpcykgPT09IGZhbHNlKSByZXR1cm47XG4gICAgbGV0IGFjdGl2ZVRpbGUgPSBldmVudC50YXJnZXQ7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBhY3RpdmVTaGlwLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICBhY3RpdmVUaWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gICAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICAgIGFjdGl2ZVRpbGUgPSBib2FyZC5jaGlsZHJlbltpbmRleCArIDFdO1xuICAgICAgICBpbmRleCArPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aXZlVGlsZSA9IGJvYXJkLmNoaWxkcmVuW2luZGV4ICsgMTBdO1xuICAgICAgICBpbmRleCArPSAxMDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2hhbmdlU2hpcCA9ICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hpcC1uYW1lJyk7XG4gICAgaWYgKGFjdGl2ZVNoaXAuc2V0TmFtZSgpID09PSAnQ2FycmllcicpIHtcbiAgICAgIGFjdGl2ZVNoaXAgPSBTaGlwKDQpO1xuICAgICAgYWN0aXZlU2hpcC5zZXROYW1lKCdCYXR0bGVzaGlwJyk7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVTaGlwLnNldE5hbWUoKSA9PT0gJ0JhdHRsZXNoaXAnKSB7XG4gICAgICBhY3RpdmVTaGlwID0gU2hpcCgzKTtcbiAgICAgIGFjdGl2ZVNoaXAuc2V0TmFtZSgnQ3J1aXNlcicpO1xuICAgIH0gZWxzZSBpZiAoYWN0aXZlU2hpcC5zZXROYW1lKCkgPT09ICdDcnVpc2VyJykge1xuICAgICAgYWN0aXZlU2hpcCA9IFNoaXAoMyk7XG4gICAgICBhY3RpdmVTaGlwLnNldE5hbWUoJ1N1Ym1hcmluZScpO1xuICAgIH0gZWxzZSBpZiAoYWN0aXZlU2hpcC5zZXROYW1lKCkgPT09ICdTdWJtYXJpbmUnKSB7XG4gICAgICBhY3RpdmVTaGlwID0gU2hpcCgyKTtcbiAgICAgIGFjdGl2ZVNoaXAuc2V0TmFtZSgnRGVzdHJveWVyJyk7XG4gICAgfVxuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGFjdGl2ZVNoaXAuc2V0TmFtZSgpO1xuICAgIHJldHVybiBhY3RpdmVTaGlwO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHhwb3MgPSBldmVudC50YXJnZXQuZGF0YXNldC54cG9zO1xuICAgIGNvbnN0IHlwb3MgPSBldmVudC50YXJnZXQuZGF0YXNldC55cG9zO1xuICAgIGxldCBpbmRleCA9IHBhcnNlSW50KHlwb3MgKyB4cG9zKTtcbiAgICBsZXQgYWN0aXZlVGlsZSA9IGV2ZW50LnRhcmdldDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZVNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGFjdGl2ZVRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNDNUI3ODMnO1xuICAgICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICBhY3RpdmVUaWxlID0gYm9hcmQuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggKz0gMTA7XG4gICAgICAgIGFjdGl2ZVRpbGUgPSBib2FyZC5jaGlsZHJlbltpbmRleF07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjaGFuZ2VTaGlwKCk7XG4gIH07XG5cbiAgY29uc3QgbG9hZEJvYXJkID0gKGJvYXJkKSA9PiB7XG4gICAgaWYgKGJvYXJkID09PSB1bmRlZmluZWQgfHwgYm9hcmQudGFyZ2V0KSBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZC1jb250YWluZXInKTtcbiAgICB3aGlsZSAoYm9hcmQuZmlyc3RDaGlsZCkge1xuICAgICAgYm9hcmQucmVtb3ZlQ2hpbGQoYm9hcmQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGNvbnN0IHsgd2lkdGggfSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGJvYXJkKTtcbiAgICBib2FyZC5zdHlsZS5oZWlnaHQgPSB3aWR0aDtcbiAgICBjb25zdCBzaXplID0gKHdpZHRoLnNsaWNlKDAsIHdpZHRoLmxlbmd0aCAtIDIpIC8gMTApIC0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBwaWVjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwaWVjZS5jbGFzc0xpc3QuYWRkKCdib2FyZC1waWVjZScpO1xuICAgICAgICBwaWVjZS5kYXRhc2V0Lnhwb3MgPSBqO1xuICAgICAgICBwaWVjZS5kYXRhc2V0Lnlwb3MgPSBpO1xuICAgICAgICBwaWVjZS5zdHlsZS5oZWlnaHQgPSBgJHtzaXplfXB4YDtcbiAgICAgICAgcGllY2Uuc3R5bGUud2lkdGggPSBgJHtzaXplfXB4YDtcbiAgICAgICAgaWYgKGJvYXJkLmdldEF0dHJpYnV0ZSgnaWQnKSA9PT0gJ2JvYXJkLWNvbnRhaW5lcicpIHtcbiAgICAgICAgICBwaWVjZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBHYW1lZmxvdy5ob3ZlclBsYXllckZvcm0pO1xuICAgICAgICAgIHBpZWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgR2FtZWZsb3cucGxhY2VTaGlwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwaWVjZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEdhbWVmbG93LnR1cm4pO1xuICAgICAgICB9XG4gICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHBpZWNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc3dpdGNoQXhpcyA9IChuZXdBeGlzKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdGF0ZScpO1xuICAgIGF4aXMgPSBuZXdBeGlzO1xuICAgIGlmIChheGlzID09PSAneCcpIHtcbiAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdSb3RhdGUgdG8gWCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdSb3RhdGUgdG8gWSc7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHN0YXJ0R2FtZSA9IChwbGF5ZXJNYXN0ZXIpID0+IHtcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXlQbGF5ZXInKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJy5hY3RpdmUnKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2luYWN0aXZlJyk7XG4gICAgY29uc3QgcGxheWVyTWFzdGVyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW1hc3RlcicpO1xuICAgIGNvbnN0IHBsYXllckF0dGFja0JvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1hdHRhY2snKTtcbiAgICBsb2FkQm9hcmQocGxheWVyTWFzdGVyQm9hcmQpO1xuICAgIGxvYWRCb2FyZChwbGF5ZXJBdHRhY2tCb2FyZCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKHBsYXllck1hc3Rlci5nZXRCb2FyZFNxdWFyZShpLCBqKS53aGF0T2NjdXBpZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoai50b1N0cmluZygpICsgaS50b1N0cmluZygpKTtcbiAgICAgICAgICBwbGF5ZXJNYXN0ZXJCb2FyZC5jaGlsZHJlbltpbmRleF0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNDNUI3ODMnO1xuICAgICAgICAgIHBsYXllck1hc3RlckJvYXJkLmNoaWxkcmVuW2luZGV4XS5zdHlsZS5ib3JkZXIgPSAnLjVweCBzb2xpZCAjMDAyMDVCJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBoaXRFZmZlY3QgPSAoc3F1YXJlLCBoaXRTdGF0dXMpID0+IHtcbiAgICBzcXVhcmUudGV4dENvbnRlbnQgPSAn4pePJztcbiAgICAoaGl0U3RhdHVzID09PSAnaGl0JykgPyBzcXVhcmUuc3R5bGUuY29sb3IgPSAncmVkJyA6IHNxdWFyZS5zdHlsZS5jb2xvciA9ICd3aGl0ZSc7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZXNldEJvYXJkQ29sb3JzLCBob3ZlclBsYXllckZvcm0sIGxvYWRCb2FyZCwgc3dpdGNoQXhpcywgcGxhY2VTaGlwLCBzdGFydEdhbWUsIGhpdEVmZmVjdCxcbiAgfTtcbn0pKCk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5leHBvcnQgY29uc3QgQ29tcHV0ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHNlbGVjdFBvc2l0aW9uID0gKGNvbXB1dGVyQXR0YWNrKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGNvbXB1dGVyQXR0YWNrLmdldEVtcHR5U3F1YXJlcygpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb3B0aW9ucy5sZW5ndGgpXTtcbiAgICByZXR1cm4gc2VsZWN0aW9uLnBvc2l0aW9uO1xuICB9O1xuXG4gIGNvbnN0IHNlbGVjdEF4aXMgPSAoKSA9PiB7XG4gICAgY29uc3QgbnVtYmVyID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgICByZXR1cm4gKG51bWJlciA9PT0gMCkgPyAneCcgOiAneSc7XG4gIH07XG5cbiAgY29uc3QgdHVybiA9IChjb21wdXRlckF0dGFjaywgcGxheWVyTWFzdGVyKSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gc2VsZWN0UG9zaXRpb24oY29tcHV0ZXJBdHRhY2spO1xuICAgIGNvbnN0IHhwb3MgPSBzcXVhcmVbMF07XG4gICAgY29uc3QgeXBvcyA9IHNxdWFyZVsxXTtcbiAgICBjb25zdCBtYXN0ZXJTcXVhcmUgPSBwbGF5ZXJNYXN0ZXIuZ2V0Qm9hcmRTcXVhcmUoeHBvcywgeXBvcyk7XG4gICAgY29uc3QgYXR0YWNrU3F1YXJlID0gY29tcHV0ZXJBdHRhY2suZ2V0Qm9hcmRTcXVhcmUoeHBvcywgeXBvcyk7XG4gICAgY29uc3QgaGl0T3JNaXNzID0gY29tcHV0ZXJBdHRhY2sucmVjaWV2ZUF0dGFjayhtYXN0ZXJTcXVhcmUsIGF0dGFja1NxdWFyZSk7XG4gICAgcmV0dXJuIFt4cG9zLCB5cG9zLCBoaXRPck1pc3NdO1xuICB9O1xuXG4gIGNvbnN0IHJhbmRvbWl6ZUJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbXB1dGVyTWFzdGVyID0gR2FtZWJvYXJkKCk7XG4gICAgY29uc3QgcXVldWUgPSBbU2hpcCgyKSwgU2hpcCgyKSwgU2hpcCgzKSwgU2hpcCg0KSwgU2hpcCg1KV07XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgY29uc3QgcG9zaXRpb24gPSBzZWxlY3RQb3NpdGlvbihjb21wdXRlck1hc3Rlcik7XG4gICAgICBjb25zdCBheGlzID0gc2VsZWN0QXhpcygpO1xuICAgICAgY29uc3QgcGxhY2VtZW50UmVzdWx0ID0gY29tcHV0ZXJNYXN0ZXIuY2FuU2hpcEJlUGxhY2VkKHF1ZXVlWzBdLCBwb3NpdGlvblswXSwgcG9zaXRpb25bMV0sIGF4aXMpO1xuICAgICAgaWYgKHBsYWNlbWVudFJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb21wdXRlck1hc3Rlci5wbGFjZVNoaXAocXVldWVbMF0sIHBvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSwgYXhpcyk7XG4gICAgICAgIHF1ZXVlLnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wdXRlck1hc3RlcjtcbiAgfTtcblxuICByZXR1cm4geyB0dXJuLCByYW5kb21pemVCb2FyZCB9O1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbmV4cG9ydCBjb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkU3F1YXJlID0gKCkgPT4gKHtcbiAgICBwb3NpdGlvbjogdW5kZWZpbmVkLCB3aGF0T2NjdXBpZXM6IHVuZGVmaW5lZCwgaW5kZXg6IHVuZGVmaW5lZCwgaGl0T3JNaXNzOiB1bmRlZmluZWQsXG4gIH0pO1xuXG4gIGNvbnN0IGJvYXJkID0gW1tdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXTtcbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBib2FyZC5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGNvbHVtbltpXSA9IGJvYXJkU3F1YXJlKCk7XG4gICAgICBjb2x1bW5baV0ucG9zaXRpb24gPSBbY291bnRlciwgaV07XG4gICAgICBpZiAoaSA9PT0gOSkgY291bnRlciArPSAxO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgZ2V0Qm9hcmRTcXVhcmUgPSAoeHBvcywgeXBvcykgPT4gYm9hcmRbeHBvc11beXBvc107XG5cbiAgY29uc3QgZ2V0RW1wdHlTcXVhcmVzID0gKCkgPT4ge1xuICAgIGNvbnN0IGVtcHR5U3F1YXJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChib2FyZFtpXVtqXS5oaXRPck1pc3MgPT09IHVuZGVmaW5lZCkgZW1wdHlTcXVhcmVzW2VtcHR5U3F1YXJlcy5sZW5ndGhdID0gYm9hcmRbaV1bal07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbXB0eVNxdWFyZXM7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHBvc3gsIHBvc3ksIGFsaWdubWVudCkgPT4ge1xuICAgIGxldCBwb3NpdGlvblggPSBwb3N4O1xuICAgIGxldCBwb3NpdGlvblkgPSBwb3N5O1xuICAgIGNvbnN0IGhlYWRPZlNoaXAgPSBib2FyZFtwb3NpdGlvblhdW3Bvc2l0aW9uWV07XG4gICAgaGVhZE9mU2hpcC53aGF0T2NjdXBpZXMgPSBzaGlwO1xuICAgIGhlYWRPZlNoaXAuaW5kZXggPSAwO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGFsaWdubWVudCA9PT0gJ3gnKSB7XG4gICAgICAgIHBvc2l0aW9uWCArPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zaXRpb25ZICs9IDE7XG4gICAgICB9XG4gICAgICBib2FyZFtwb3NpdGlvblhdW3Bvc2l0aW9uWV0ud2hhdE9jY3VwaWVzID0gc2hpcDtcbiAgICAgIGJvYXJkW3Bvc2l0aW9uWF1bcG9zaXRpb25ZXS5pbmRleCA9IGk7XG4gICAgfVxuICAgIHJldHVybiBoZWFkT2ZTaGlwO1xuICB9O1xuXG4gIGNvbnN0IGNhblNoaXBCZVBsYWNlZCA9IChzaGlwLCBwb3N4LCBwb3N5LCBhbGlnbm1lbnQpID0+IHtcbiAgICBsZXQgcG9zaXRpb25YID0gcG9zeDtcbiAgICBsZXQgcG9zaXRpb25ZID0gcG9zeTtcbiAgICBjb25zdCBoZWFkT2ZTaGlwID0gYm9hcmRbcG9zaXRpb25YXVtwb3NpdGlvblldO1xuICAgIGlmIChoZWFkT2ZTaGlwLndoYXRPY2N1cGllcyAhPT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYWxpZ25tZW50ID09PSAneCcpIHtcbiAgICAgICAgcG9zaXRpb25YICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3NpdGlvblkgKz0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3NpdGlvblggPCAwIHx8IHBvc2l0aW9uWCA+IDkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChwb3NpdGlvblkgPCAwIHx8IHBvc2l0aW9uWSA+IDkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChib2FyZFtwb3NpdGlvblhdW3Bvc2l0aW9uWV0ud2hhdE9jY3VwaWVzICE9PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgcmVjaWV2ZUF0dGFjayA9IChtYXN0ZXIsIGF0dGFjaykgPT4ge1xuICAgIGlmICh0eXBlb2YgbWFzdGVyLndoYXRPY2N1cGllcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IGF0dGFja2luZ1NoaXAgPSBtYXN0ZXIud2hhdE9jY3VwaWVzO1xuICAgICAgYXR0YWNrLndoYXRPY2N1cGllcyA9IG1hc3Rlci53aGF0T2NjdXBpZXM7XG4gICAgICBhdHRhY2suaGl0T3JNaXNzID0gJ2hpdCc7XG4gICAgICBtYXN0ZXIuaGl0T3JNaXNzID0gJ2hpdCc7XG4gICAgICBhdHRhY2tpbmdTaGlwLmhpdChtYXN0ZXIuaW5kZXgpO1xuICAgICAgcmV0dXJuIGF0dGFja2luZ1NoaXA7XG4gICAgfVxuICAgIGF0dGFjay5oaXRPck1pc3MgPSAnbWlzcyc7XG4gICAgbWFzdGVyLmhpdE9yTWlzcyA9ICdtaXNzJztcbiAgICByZXR1cm4gYXR0YWNrLmhpdE9yTWlzcztcbiAgfTtcblxuICBjb25zdCBpc0FsbFN1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgYXJyID0gYm9hcmQ7XG4gICAgbGV0IGFsbEVtcHR5ID0gdHJ1ZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBpZiAoYXJyW2ldW2pdLndoYXRPY2N1cGllcyAhPT0gdW5kZWZpbmVkICYmIGFycltpXVtqXS5oaXRPck1pc3MgIT09ICdoaXQnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcnJbaV1bal0ud2hhdE9jY3VwaWVzICE9PSB1bmRlZmluZWQpIGFsbEVtcHR5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhbGxFbXB0eSA9PT0gdHJ1ZSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGdpdmVIZWFkT2ZTaGlwcyA9ICgpID0+IHtcbiAgICBjb25zdCBhcnIgPSBib2FyZDtcbiAgICBjb25zdCBoZWFkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChhcnJbaV1bal0uaW5kZXggPT09IDApIGhlYWRzW2hlYWRzLmxlbmd0aF0gPSBhcnJbaV1bal07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoZWFkcztcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldEJvYXJkU3F1YXJlLFxuICAgIGdldEVtcHR5U3F1YXJlcyxcbiAgICBwbGFjZVNoaXAsXG4gICAgY2FuU2hpcEJlUGxhY2VkLFxuICAgIHJlY2lldmVBdHRhY2ssXG4gICAgaXNBbGxTdW5rLFxuICAgIGdpdmVIZWFkT2ZTaGlwcyxcbiAgfTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdHJhaWxpbmctc3BhY2VzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgQ29tcHV0ZXIgfSBmcm9tICcuL2NvbXB1dGVyJztcbmltcG9ydCB7IERPTSB9IGZyb20gJy4vRE9NJztcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuXG5leHBvcnQgY29uc3QgR2FtZWZsb3cgPSAoKCkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcbiAgbGV0IHBsYXllck1hc3RlciA9IEdhbWVib2FyZCgpO1xuICBjb25zdCBwbGF5ZXJBdHRhY2sgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBDb21wdXRlcigpO1xuICBsZXQgY29tcHV0ZXJNYXN0ZXIgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXJBdHRhY2sgPSBHYW1lYm9hcmQoKTtcbiAgbGV0IGFjdGl2ZVNoaXAgPSBTaGlwKDUpO1xuICBhY3RpdmVTaGlwLnNldE5hbWUoJ0NhcnJpZXInKTtcbiAgbGV0IGF4aXMgPSAneCc7XG5cbiAgY29uc3Qgc3RhcnRHYW1lID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50KSBwbGF5ZXJNYXN0ZXIgPSBjb21wdXRlci5yYW5kb21pemVCb2FyZCgpO1xuICAgIGNvbXB1dGVyTWFzdGVyID0gY29tcHV0ZXIucmFuZG9taXplQm9hcmQoKTtcbiAgICBET00uc3RhcnRHYW1lKHBsYXllck1hc3Rlcik7XG4gIH07XG5cbiAgY29uc3Qgc3dpdGNoQXhpcyA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgYXhpcyA9ICd5JztcbiAgICAgIERPTS5zd2l0Y2hBeGlzKGF4aXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBheGlzID0gJ3gnO1xuICAgICAgRE9NLnN3aXRjaEF4aXMoYXhpcyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IHhwb3MgPSBldmVudC50YXJnZXQuZGF0YXNldC54cG9zO1xuICAgIGNvbnN0IHlwb3MgPSBldmVudC50YXJnZXQuZGF0YXNldC55cG9zO1xuICAgIGlmIChwbGF5ZXJNYXN0ZXIuY2FuU2hpcEJlUGxhY2VkKGFjdGl2ZVNoaXAsIHBhcnNlSW50KHhwb3MpLCBwYXJzZUludCh5cG9zKSwgYXhpcykgPT09IGZhbHNlKSByZXR1cm47XG4gICAgcGxheWVyTWFzdGVyLnBsYWNlU2hpcChhY3RpdmVTaGlwLCBwYXJzZUludCh4cG9zKSwgcGFyc2VJbnQoeXBvcyksIGF4aXMpO1xuICAgIGlmIChhY3RpdmVTaGlwLnNldE5hbWUoKSA9PT0gJ0Rlc3Ryb3llcicpIHJldHVybiBzdGFydEdhbWUoKTtcbiAgICBhY3RpdmVTaGlwID0gRE9NLnBsYWNlU2hpcChldmVudCk7XG4gIH07XG5cbiAgY29uc3QgcmVzZXRCb2FyZENvbG9ycyA9ICgpID0+IHtcbiAgICBET00ucmVzZXRCb2FyZENvbG9ycyhwbGF5ZXJNYXN0ZXIpO1xuICB9O1xuXG4gIGNvbnN0IGhvdmVyUGxheWVyRm9ybSA9IChldmVudCkgPT4ge1xuICAgIERPTS5ob3ZlclBsYXllckZvcm0oZXZlbnQsIHBsYXllck1hc3Rlcik7XG4gIH07XG5cbiAgY29uc3QgdHVybiA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIEdhbWVmbG93LnR1cm4pO1xuICAgIGNvbnN0IHhwb3MgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC54cG9zKTtcbiAgICBjb25zdCB5cG9zID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQueXBvcyk7XG4gICAgY29uc3QgcGxheWVyUmVzdWx0ID0gcGxheWVyLnR1cm4ocGxheWVyQXR0YWNrLCBjb21wdXRlck1hc3RlciwgeHBvcywgeXBvcyk7XG4gICAgaWYgKHR5cGVvZiBwbGF5ZXJSZXN1bHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBET00uaGl0RWZmZWN0KGV2ZW50LnRhcmdldCwgJ2hpdCcpO1xuICAgICAgaWYgKGNvbXB1dGVyTWFzdGVyLmlzQWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHdpbm5lck92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheVdpbm5lcicpO1xuICAgICAgICBjb25zdCB3aW5uZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbm5lcicpLmNoaWxkcmVuWzBdO1xuICAgICAgICB3aW5uZXJUZXh0LnRleHRDb250ZW50ID0gJ1BsYXllciBXb24hJztcbiAgICAgICAgd2lubmVyT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdpbmFjdGl2ZScpO1xuICAgICAgICB3aW5uZXJPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIERPTS5oaXRFZmZlY3QoZXZlbnQudGFyZ2V0LCAnbWlzcycpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXB1dGVyUmVzdWx0ID0gY29tcHV0ZXIudHVybihjb21wdXRlckF0dGFjaywgcGxheWVyTWFzdGVyKTtcbiAgICBpZiAodHlwZW9mIGNvbXB1dGVyUmVzdWx0WzJdID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3QgaW5kZXggPSBjb21wdXRlclJlc3VsdFswXSArIChjb21wdXRlclJlc3VsdFsxXSAqIDEwKTtcbiAgICAgIGNvbnN0IG1hc3RlclBpZWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1tYXN0ZXInKS5jaGlsZHJlbltpbmRleF07XG4gICAgICBET00uaGl0RWZmZWN0KG1hc3RlclBpZWNlLCAnaGl0Jyk7XG4gICAgICBpZiAocGxheWVyTWFzdGVyLmlzQWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHdpbm5lck92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheVdpbm5lcicpO1xuICAgICAgICBjb25zdCB3aW5uZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbm5lcicpLmNoaWxkcmVuWzBdO1xuICAgICAgICB3aW5uZXJUZXh0LnRleHRDb250ZW50ID0gJ0NvbXB1dGVyIFdvbiEnO1xuICAgICAgICB3aW5uZXJPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlJyk7XG4gICAgICAgIHdpbm5lck92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gY29tcHV0ZXJSZXN1bHRbMF0gKyAoY29tcHV0ZXJSZXN1bHRbMV0gKiAxMCk7XG4gICAgICBjb25zdCBtYXN0ZXJQaWVjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItbWFzdGVyJykuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgRE9NLmhpdEVmZmVjdChtYXN0ZXJQaWVjZSwgJ21pc3MnKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzd2l0Y2hBeGlzLCBwbGFjZVNoaXAsIHN0YXJ0R2FtZSwgcmVzZXRCb2FyZENvbG9ycywgaG92ZXJQbGF5ZXJGb3JtLCB0dXJuLFxuICB9O1xufSkoKTtcblxuRE9NLmxvYWRCb2FyZCgpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIERPTS5sb2FkQm9hcmQpO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdGF0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgR2FtZWZsb3cuc3dpdGNoQXhpcyk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmFuZG9taXplJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBHYW1lZmxvdy5zdGFydEdhbWUpO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkLWNvbnRhaW5lcicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgR2FtZWZsb3cucmVzZXRCb2FyZENvbG9ycyk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1hZ2FpbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNlcXVlbmNlcyAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG5leHBvcnQgY29uc3QgUGxheWVyID0gKCkgPT4ge1xuICBjb25zdCB0dXJuID0gKHBsYXllckF0dGFjaywgY29tcHV0ZXJNYXN0ZXIsIHhwb3MsIHlwb3MpID0+IHtcbiAgICBjb25zdCBtYXN0ZXJTcXVhcmUgPSBjb21wdXRlck1hc3Rlci5nZXRCb2FyZFNxdWFyZSh4cG9zLCB5cG9zKTtcbiAgICBjb25zdCBhdHRhY2tTcXVhcmUgPSBwbGF5ZXJBdHRhY2suZ2V0Qm9hcmRTcXVhcmUoeHBvcywgeXBvcyk7XG4gICAgY29uc3QgaGl0T3JNaXNzID0gcGxheWVyQXR0YWNrLnJlY2lldmVBdHRhY2sobWFzdGVyU3F1YXJlLCBhdHRhY2tTcXVhcmUpO1xuICAgIHJldHVybiBoaXRPck1pc3M7XG4gIH07XG5cbiAgcmV0dXJuIHsgdHVybiB9O1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG5leHBvcnQgY29uc3QgU2hpcCA9IChsZW5ndGgpID0+IHtcbiAgbGV0IG5hbWU7XG5cbiAgY29uc3Qgd2hlcmVIaXQgPSBuZXcgQXJyYXkobGVuZ3RoKS5maWxsKGZhbHNlKTtcblxuICBjb25zdCBzdW5rU3RhdHVzID0gZmFsc2U7XG5cbiAgY29uc3QgaGl0ID0gKGluZGV4KSA9PiB7XG4gICAgd2hlcmVIaXRbaW5kZXhdID0gdHJ1ZTtcbiAgICByZXR1cm4gd2hlcmVIaXQ7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBzdGF0dXMgPSB0cnVlO1xuICAgIHdoZXJlSGl0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICBpZiAobG9jYXRpb24gPT09IGZhbHNlKSBzdGF0dXMgPSBmYWxzZTtcbiAgICB9KTtcbiAgICByZXR1cm4gc3RhdHVzO1xuICB9O1xuXG4gIGNvbnN0IHNldE5hbWUgPSAobmV3TmFtZSkgPT4ge1xuICAgIGlmIChuZXdOYW1lICE9PSB1bmRlZmluZWQpIG5hbWUgPSBuZXdOYW1lO1xuICAgIHJldHVybiBuYW1lO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbGVuZ3RoLFxuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgc3Vua1N0YXR1cyxcbiAgICBzZXROYW1lLFxuICB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=