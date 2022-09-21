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
      console.log(index);
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
      const index = computerResult[0] + computerResult[1] + 1;
      const masterPiece = document.getElementById('player-master').children[index];
      _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.hitEffect(masterPiece, 'miss');
      console.log(playerMaster.giveHeadOfShips());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU4QjtBQUNLOztBQUU1QjtBQUNQO0FBQ0EsbUJBQW1CLDJDQUFJO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkNBQUk7QUFDdkI7QUFDQSxNQUFNO0FBQ04sbUJBQW1CLDJDQUFJO0FBQ3ZCO0FBQ0EsTUFBTTtBQUNOLG1CQUFtQiwyQ0FBSTtBQUN2QjtBQUNBLE1BQU07QUFDTixtQkFBbUIsMkNBQUk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxLQUFLO0FBQ3JDLCtCQUErQixLQUFLO0FBQ3BDO0FBQ0EsOENBQThDLDREQUF3QjtBQUN0RSwwQ0FBMEMsc0RBQWtCO0FBQzVELFVBQVU7QUFDViwwQ0FBMEMsaURBQWE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlKRDtBQUNBOztBQUU4QjtBQUNVOztBQUVqQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLHFEQUFTO0FBQ3BDLG1CQUFtQiwyQ0FBSSxLQUFLLDJDQUFJLEtBQUssMkNBQUksS0FBSywyQ0FBSSxLQUFLLDJDQUFJO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOzs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV3QztBQUNOO0FBQ0k7QUFDVjtBQUNFOztBQUV2QjtBQUNQLGlCQUFpQiwrQ0FBTTtBQUN2QixxQkFBcUIscURBQVM7QUFDOUIsdUJBQXVCLHFEQUFTO0FBQ2hDLG1CQUFtQixtREFBUTtBQUMzQix1QkFBdUIscURBQVM7QUFDaEMseUJBQXlCLHFEQUFTO0FBQ2xDLG1CQUFtQiwyQ0FBSTtBQUN2QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksK0NBQWE7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGdEQUFjO0FBQ3BCLE1BQU07QUFDTjtBQUNBLE1BQU0sZ0RBQWM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsK0NBQWE7QUFDOUI7O0FBRUE7QUFDQSxJQUFJLHNEQUFvQjtBQUN4Qjs7QUFFQTtBQUNBLElBQUkscURBQW1CO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sK0NBQWE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixNQUFNLCtDQUFhO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLCtDQUFhO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNLCtDQUFhO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELCtDQUFhO0FBQ2Isa0NBQWtDLCtDQUFhO0FBQy9DO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDN0dBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOzs7Ozs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNwQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb250aW51ZSAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSByYWRpeCAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IEdhbWVmbG93IH0gZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBjb25zdCBET00gPSAoKCkgPT4ge1xuICBsZXQgYXhpcyA9ICd4JztcbiAgbGV0IGFjdGl2ZVNoaXAgPSBTaGlwKDUpO1xuICBhY3RpdmVTaGlwLnNldE5hbWUoJ0NhcnJpZXInKTtcblxuICBjb25zdCByZXNldEJvYXJkQ29sb3JzID0gKHBsYXllck1hc3RlcikgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCAxMDsgayArPSAxKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVNxID0gcGxheWVyTWFzdGVyLmdldEJvYXJkU3F1YXJlKGksIGspLndoYXRPY2N1cGllcztcbiAgICAgICAgY29uc3QgYm9hcmRJbmRleCA9IHBhcnNlSW50KGsudG9TdHJpbmcoKSArIGkudG9TdHJpbmcoKSk7XG4gICAgICAgIGlmIChhY3RpdmVTcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYm9hcmQuY2hpbGRyZW5bYm9hcmRJbmRleF0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwMDIwNUInO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvYXJkLmNoaWxkcmVuW2JvYXJkSW5kZXhdLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjQzVCNzgzJztcbiAgICAgICAgICBib2FyZC5jaGlsZHJlbltib2FyZEluZGV4XS5zdHlsZS5ib3JkZXIgPSAnLjVweCBzb2xpZCAjMDAyMDVCJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBob3ZlclBsYXllckZvcm0gPSAoZXZlbnQsIHBsYXllck1hc3RlcikgPT4ge1xuICAgIHJlc2V0Qm9hcmRDb2xvcnMocGxheWVyTWFzdGVyKTtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZC1jb250YWluZXInKTtcbiAgICBjb25zdCB4cG9zID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQueHBvcztcbiAgICBjb25zdCB5cG9zID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQueXBvcztcbiAgICBsZXQgaW5kZXggPSBwYXJzZUludCh5cG9zICsgeHBvcyk7XG4gICAgaWYgKHBsYXllck1hc3Rlci5jYW5TaGlwQmVQbGFjZWQoYWN0aXZlU2hpcCwgcGFyc2VJbnQoeHBvcyksIHBhcnNlSW50KHlwb3MpLCBheGlzKSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICBsZXQgYWN0aXZlVGlsZSA9IGV2ZW50LnRhcmdldDtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFjdGl2ZVNoaXAubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgIGFjdGl2ZVRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICAgIGlmIChheGlzID09PSAneCcpIHtcbiAgICAgICAgYWN0aXZlVGlsZSA9IGJvYXJkLmNoaWxkcmVuW2luZGV4ICsgMV07XG4gICAgICAgIGluZGV4ICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY3RpdmVUaWxlID0gYm9hcmQuY2hpbGRyZW5baW5kZXggKyAxMF07XG4gICAgICAgIGluZGV4ICs9IDEwO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGFuZ2VTaGlwID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwLW5hbWUnKTtcbiAgICBpZiAoYWN0aXZlU2hpcC5zZXROYW1lKCkgPT09ICdDYXJyaWVyJykge1xuICAgICAgYWN0aXZlU2hpcCA9IFNoaXAoNCk7XG4gICAgICBhY3RpdmVTaGlwLnNldE5hbWUoJ0JhdHRsZXNoaXAnKTtcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZVNoaXAuc2V0TmFtZSgpID09PSAnQmF0dGxlc2hpcCcpIHtcbiAgICAgIGFjdGl2ZVNoaXAgPSBTaGlwKDMpO1xuICAgICAgYWN0aXZlU2hpcC5zZXROYW1lKCdDcnVpc2VyJyk7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVTaGlwLnNldE5hbWUoKSA9PT0gJ0NydWlzZXInKSB7XG4gICAgICBhY3RpdmVTaGlwID0gU2hpcCgzKTtcbiAgICAgIGFjdGl2ZVNoaXAuc2V0TmFtZSgnU3VibWFyaW5lJyk7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVTaGlwLnNldE5hbWUoKSA9PT0gJ1N1Ym1hcmluZScpIHtcbiAgICAgIGFjdGl2ZVNoaXAgPSBTaGlwKDIpO1xuICAgICAgYWN0aXZlU2hpcC5zZXROYW1lKCdEZXN0cm95ZXInKTtcbiAgICB9XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gYWN0aXZlU2hpcC5zZXROYW1lKCk7XG4gICAgcmV0dXJuIGFjdGl2ZVNoaXA7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgeHBvcyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnhwb3M7XG4gICAgY29uc3QgeXBvcyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnlwb3M7XG4gICAgbGV0IGluZGV4ID0gcGFyc2VJbnQoeXBvcyArIHhwb3MpO1xuICAgIGxldCBhY3RpdmVUaWxlID0gZXZlbnQudGFyZ2V0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlU2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgYWN0aXZlVGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0M1Qjc4Myc7XG4gICAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIGFjdGl2ZVRpbGUgPSBib2FyZC5jaGlsZHJlbltpbmRleF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCArPSAxMDtcbiAgICAgICAgYWN0aXZlVGlsZSA9IGJvYXJkLmNoaWxkcmVuW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNoYW5nZVNoaXAoKTtcbiAgfTtcblxuICBjb25zdCBsb2FkQm9hcmQgPSAoYm9hcmQpID0+IHtcbiAgICBpZiAoYm9hcmQgPT09IHVuZGVmaW5lZCB8fCBib2FyZC50YXJnZXQpIGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIHdoaWxlIChib2FyZC5maXJzdENoaWxkKSB7XG4gICAgICBib2FyZC5yZW1vdmVDaGlsZChib2FyZC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgY29uc3QgeyB3aWR0aCB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoYm9hcmQpO1xuICAgIGJvYXJkLnN0eWxlLmhlaWdodCA9IHdpZHRoO1xuICAgIGNvbnN0IHNpemUgPSAod2lkdGguc2xpY2UoMCwgd2lkdGgubGVuZ3RoIC0gMikgLyAxMCkgLSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IHBpZWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBpZWNlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLXBpZWNlJyk7XG4gICAgICAgIHBpZWNlLmRhdGFzZXQueHBvcyA9IGo7XG4gICAgICAgIHBpZWNlLmRhdGFzZXQueXBvcyA9IGk7XG4gICAgICAgIHBpZWNlLnN0eWxlLmhlaWdodCA9IGAke3NpemV9cHhgO1xuICAgICAgICBwaWVjZS5zdHlsZS53aWR0aCA9IGAke3NpemV9cHhgO1xuICAgICAgICBpZiAoYm9hcmQuZ2V0QXR0cmlidXRlKCdpZCcpID09PSAnYm9hcmQtY29udGFpbmVyJykge1xuICAgICAgICAgIHBpZWNlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIEdhbWVmbG93LmhvdmVyUGxheWVyRm9ybSk7XG4gICAgICAgICAgcGllY2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBHYW1lZmxvdy5wbGFjZVNoaXApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBpZWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgR2FtZWZsb3cudHVybik7XG4gICAgICAgIH1cbiAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQocGllY2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBzd2l0Y2hBeGlzID0gKG5ld0F4aXMpID0+IHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlJyk7XG4gICAgYXhpcyA9IG5ld0F4aXM7XG4gICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1JvdGF0ZSB0byBYJztcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1JvdGF0ZSB0byBZJztcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc3RhcnRHYW1lID0gKHBsYXllck1hc3RlcikgPT4ge1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheVBsYXllcicpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnLmFjdGl2ZScpO1xuICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnaW5hY3RpdmUnKTtcbiAgICBjb25zdCBwbGF5ZXJNYXN0ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItbWFzdGVyJyk7XG4gICAgY29uc3QgcGxheWVyQXR0YWNrQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWF0dGFjaycpO1xuICAgIGxvYWRCb2FyZChwbGF5ZXJNYXN0ZXJCb2FyZCk7XG4gICAgbG9hZEJvYXJkKHBsYXllckF0dGFja0JvYXJkKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBpZiAocGxheWVyTWFzdGVyLmdldEJvYXJkU3F1YXJlKGksIGopLndoYXRPY2N1cGllcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChqLnRvU3RyaW5nKCkgKyBpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIHBsYXllck1hc3RlckJvYXJkLmNoaWxkcmVuW2luZGV4XS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI0M1Qjc4Myc7XG4gICAgICAgICAgcGxheWVyTWFzdGVyQm9hcmQuY2hpbGRyZW5baW5kZXhdLnN0eWxlLmJvcmRlciA9ICcuNXB4IHNvbGlkICMwMDIwNUInO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhpdEVmZmVjdCA9IChzcXVhcmUsIGhpdFN0YXR1cykgPT4ge1xuICAgIHNxdWFyZS50ZXh0Q29udGVudCA9ICfil48nO1xuICAgIChoaXRTdGF0dXMgPT09ICdoaXQnKSA/IHNxdWFyZS5zdHlsZS5jb2xvciA9ICdyZWQnIDogc3F1YXJlLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJlc2V0Qm9hcmRDb2xvcnMsIGhvdmVyUGxheWVyRm9ybSwgbG9hZEJvYXJkLCBzd2l0Y2hBeGlzLCBwbGFjZVNoaXAsIHN0YXJ0R2FtZSwgaGl0RWZmZWN0LFxuICB9O1xufSkoKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5cbmV4cG9ydCBjb25zdCBDb21wdXRlciA9ICgpID0+IHtcbiAgY29uc3Qgc2VsZWN0UG9zaXRpb24gPSAoY29tcHV0ZXJBdHRhY2spID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0gY29tcHV0ZXJBdHRhY2suZ2V0RW1wdHlTcXVhcmVzKCk7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCldO1xuICAgIHJldHVybiBzZWxlY3Rpb24ucG9zaXRpb247XG4gIH07XG5cbiAgY29uc3Qgc2VsZWN0QXhpcyA9ICgpID0+IHtcbiAgICBjb25zdCBudW1iZXIgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpO1xuICAgIHJldHVybiAobnVtYmVyID09PSAwKSA/ICd4JyA6ICd5JztcbiAgfTtcblxuICBjb25zdCB0dXJuID0gKGNvbXB1dGVyQXR0YWNrLCBwbGF5ZXJNYXN0ZXIpID0+IHtcbiAgICBjb25zdCBzcXVhcmUgPSBzZWxlY3RQb3NpdGlvbihjb21wdXRlckF0dGFjayk7XG4gICAgY29uc3QgeHBvcyA9IHNxdWFyZVswXTtcbiAgICBjb25zdCB5cG9zID0gc3F1YXJlWzFdO1xuICAgIGNvbnN0IG1hc3RlclNxdWFyZSA9IHBsYXllck1hc3Rlci5nZXRCb2FyZFNxdWFyZSh4cG9zLCB5cG9zKTtcbiAgICBjb25zdCBhdHRhY2tTcXVhcmUgPSBjb21wdXRlckF0dGFjay5nZXRCb2FyZFNxdWFyZSh4cG9zLCB5cG9zKTtcbiAgICBjb25zdCBoaXRPck1pc3MgPSBjb21wdXRlckF0dGFjay5yZWNpZXZlQXR0YWNrKG1hc3RlclNxdWFyZSwgYXR0YWNrU3F1YXJlKTtcbiAgICByZXR1cm4gW3hwb3MsIHlwb3MsIGhpdE9yTWlzc107XG4gIH07XG5cbiAgY29uc3QgcmFuZG9taXplQm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgY29tcHV0ZXJNYXN0ZXIgPSBHYW1lYm9hcmQoKTtcbiAgICBjb25zdCBxdWV1ZSA9IFtTaGlwKDIpLCBTaGlwKDIpLCBTaGlwKDMpLCBTaGlwKDQpLCBTaGlwKDUpXTtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IHNlbGVjdFBvc2l0aW9uKGNvbXB1dGVyTWFzdGVyKTtcbiAgICAgIGNvbnN0IGF4aXMgPSBzZWxlY3RBeGlzKCk7XG4gICAgICBjb25zdCBwbGFjZW1lbnRSZXN1bHQgPSBjb21wdXRlck1hc3Rlci5jYW5TaGlwQmVQbGFjZWQocXVldWVbMF0sIHBvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSwgYXhpcyk7XG4gICAgICBpZiAocGxhY2VtZW50UmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIGNvbXB1dGVyTWFzdGVyLnBsYWNlU2hpcChxdWV1ZVswXSwgcG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdLCBheGlzKTtcbiAgICAgICAgcXVldWUuc2hpZnQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbXB1dGVyTWFzdGVyO1xuICB9O1xuXG4gIHJldHVybiB7IHR1cm4sIHJhbmRvbWl6ZUJvYXJkIH07XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuZXhwb3J0IGNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmRTcXVhcmUgPSAoKSA9PiAoe1xuICAgIHBvc2l0aW9uOiB1bmRlZmluZWQsIHdoYXRPY2N1cGllczogdW5kZWZpbmVkLCBpbmRleDogdW5kZWZpbmVkLCBoaXRPck1pc3M6IHVuZGVmaW5lZCxcbiAgfSk7XG5cbiAgY29uc3QgYm9hcmQgPSBbW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11dO1xuICBsZXQgY291bnRlciA9IDA7XG4gIGJvYXJkLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgY29sdW1uW2ldID0gYm9hcmRTcXVhcmUoKTtcbiAgICAgIGNvbHVtbltpXS5wb3NpdGlvbiA9IFtjb3VudGVyLCBpXTtcbiAgICAgIGlmIChpID09PSA5KSBjb3VudGVyICs9IDE7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBnZXRCb2FyZFNxdWFyZSA9ICh4cG9zLCB5cG9zKSA9PiBib2FyZFt4cG9zXVt5cG9zXTtcblxuICBjb25zdCBnZXRFbXB0eVNxdWFyZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgZW1wdHlTcXVhcmVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW2pdLmhpdE9yTWlzcyA9PT0gdW5kZWZpbmVkKSBlbXB0eVNxdWFyZXNbZW1wdHlTcXVhcmVzLmxlbmd0aF0gPSBib2FyZFtpXVtqXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVtcHR5U3F1YXJlcztcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgcG9zeCwgcG9zeSwgYWxpZ25tZW50KSA9PiB7XG4gICAgbGV0IHBvc2l0aW9uWCA9IHBvc3g7XG4gICAgbGV0IHBvc2l0aW9uWSA9IHBvc3k7XG4gICAgY29uc3QgaGVhZE9mU2hpcCA9IGJvYXJkW3Bvc2l0aW9uWF1bcG9zaXRpb25ZXTtcbiAgICBoZWFkT2ZTaGlwLndoYXRPY2N1cGllcyA9IHNoaXA7XG4gICAgaGVhZE9mU2hpcC5pbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYWxpZ25tZW50ID09PSAneCcpIHtcbiAgICAgICAgcG9zaXRpb25YICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3NpdGlvblkgKz0gMTtcbiAgICAgIH1cbiAgICAgIGJvYXJkW3Bvc2l0aW9uWF1bcG9zaXRpb25ZXS53aGF0T2NjdXBpZXMgPSBzaGlwO1xuICAgICAgYm9hcmRbcG9zaXRpb25YXVtwb3NpdGlvblldLmluZGV4ID0gaTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRPZlNoaXA7XG4gIH07XG5cbiAgY29uc3QgY2FuU2hpcEJlUGxhY2VkID0gKHNoaXAsIHBvc3gsIHBvc3ksIGFsaWdubWVudCkgPT4ge1xuICAgIGxldCBwb3NpdGlvblggPSBwb3N4O1xuICAgIGxldCBwb3NpdGlvblkgPSBwb3N5O1xuICAgIGNvbnN0IGhlYWRPZlNoaXAgPSBib2FyZFtwb3NpdGlvblhdW3Bvc2l0aW9uWV07XG4gICAgaWYgKGhlYWRPZlNoaXAud2hhdE9jY3VwaWVzICE9PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChhbGlnbm1lbnQgPT09ICd4Jykge1xuICAgICAgICBwb3NpdGlvblggKz0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvc2l0aW9uWSArPSAxO1xuICAgICAgfVxuICAgICAgaWYgKHBvc2l0aW9uWCA8IDAgfHwgcG9zaXRpb25YID4gOSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKHBvc2l0aW9uWSA8IDAgfHwgcG9zaXRpb25ZID4gOSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKGJvYXJkW3Bvc2l0aW9uWF1bcG9zaXRpb25ZXS53aGF0T2NjdXBpZXMgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCByZWNpZXZlQXR0YWNrID0gKG1hc3RlciwgYXR0YWNrKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBtYXN0ZXIud2hhdE9jY3VwaWVzID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3QgYXR0YWNraW5nU2hpcCA9IG1hc3Rlci53aGF0T2NjdXBpZXM7XG4gICAgICBhdHRhY2sud2hhdE9jY3VwaWVzID0gbWFzdGVyLndoYXRPY2N1cGllcztcbiAgICAgIGF0dGFjay5oaXRPck1pc3MgPSAnaGl0JztcbiAgICAgIG1hc3Rlci5oaXRPck1pc3MgPSAnaGl0JztcbiAgICAgIGF0dGFja2luZ1NoaXAuaGl0KG1hc3Rlci5pbmRleCk7XG4gICAgICByZXR1cm4gYXR0YWNraW5nU2hpcDtcbiAgICB9XG4gICAgYXR0YWNrLmhpdE9yTWlzcyA9ICdtaXNzJztcbiAgICBtYXN0ZXIuaGl0T3JNaXNzID0gJ21pc3MnO1xuICAgIHJldHVybiBhdHRhY2suaGl0T3JNaXNzO1xuICB9O1xuXG4gIGNvbnN0IGlzQWxsU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBhcnIgPSBib2FyZDtcbiAgICBsZXQgYWxsRW1wdHkgPSB0cnVlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChhcnJbaV1bal0ud2hhdE9jY3VwaWVzICE9PSB1bmRlZmluZWQgJiYgYXJyW2ldW2pdLmhpdE9yTWlzcyAhPT0gJ2hpdCcpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFycltpXVtqXS53aGF0T2NjdXBpZXMgIT09IHVuZGVmaW5lZCkgYWxsRW1wdHkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFsbEVtcHR5ID09PSB0cnVlKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgZ2l2ZUhlYWRPZlNoaXBzID0gKCkgPT4ge1xuICAgIGNvbnN0IGFyciA9IGJvYXJkO1xuICAgIGNvbnN0IGhlYWRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKGFycltpXVtqXS5pbmRleCA9PT0gMCkgaGVhZHNbaGVhZHMubGVuZ3RoXSA9IGFycltpXVtqXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhlYWRzO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0Qm9hcmRTcXVhcmUsXG4gICAgZ2V0RW1wdHlTcXVhcmVzLFxuICAgIHBsYWNlU2hpcCxcbiAgICBjYW5TaGlwQmVQbGFjZWQsXG4gICAgcmVjaWV2ZUF0dGFjayxcbiAgICBpc0FsbFN1bmssXG4gICAgZ2l2ZUhlYWRPZlNoaXBzLFxuICB9O1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNvbnNpc3RlbnQtcmV0dXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1kZXN0cnVjdHVyaW5nICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby10cmFpbGluZy1zcGFjZXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtcmV0dXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4vKiBlc2xpbnQtZGlzYWJsZSByYWRpeCAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBDb21wdXRlciB9IGZyb20gJy4vY29tcHV0ZXInO1xuaW1wb3J0IHsgRE9NIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5cbmV4cG9ydCBjb25zdCBHYW1lZmxvdyA9ICgoKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IFBsYXllcigpO1xuICBsZXQgcGxheWVyTWFzdGVyID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IHBsYXllckF0dGFjayA9IEdhbWVib2FyZCgpO1xuICBjb25zdCBjb21wdXRlciA9IENvbXB1dGVyKCk7XG4gIGxldCBjb21wdXRlck1hc3RlciA9IEdhbWVib2FyZCgpO1xuICBjb25zdCBjb21wdXRlckF0dGFjayA9IEdhbWVib2FyZCgpO1xuICBsZXQgYWN0aXZlU2hpcCA9IFNoaXAoNSk7XG4gIGFjdGl2ZVNoaXAuc2V0TmFtZSgnQ2FycmllcicpO1xuICBsZXQgYXhpcyA9ICd4JztcblxuICBjb25zdCBzdGFydEdhbWUgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQpIHBsYXllck1hc3RlciA9IGNvbXB1dGVyLnJhbmRvbWl6ZUJvYXJkKCk7XG4gICAgY29tcHV0ZXJNYXN0ZXIgPSBjb21wdXRlci5yYW5kb21pemVCb2FyZCgpO1xuICAgIERPTS5zdGFydEdhbWUocGxheWVyTWFzdGVyKTtcbiAgfTtcblxuICBjb25zdCBzd2l0Y2hBeGlzID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICBheGlzID0gJ3knO1xuICAgICAgRE9NLnN3aXRjaEF4aXMoYXhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF4aXMgPSAneCc7XG4gICAgICBET00uc3dpdGNoQXhpcyhheGlzKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgeHBvcyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnhwb3M7XG4gICAgY29uc3QgeXBvcyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnlwb3M7XG4gICAgaWYgKHBsYXllck1hc3Rlci5jYW5TaGlwQmVQbGFjZWQoYWN0aXZlU2hpcCwgcGFyc2VJbnQoeHBvcyksIHBhcnNlSW50KHlwb3MpLCBheGlzKSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICBwbGF5ZXJNYXN0ZXIucGxhY2VTaGlwKGFjdGl2ZVNoaXAsIHBhcnNlSW50KHhwb3MpLCBwYXJzZUludCh5cG9zKSwgYXhpcyk7XG4gICAgaWYgKGFjdGl2ZVNoaXAuc2V0TmFtZSgpID09PSAnRGVzdHJveWVyJykgcmV0dXJuIHN0YXJ0R2FtZSgpO1xuICAgIGFjdGl2ZVNoaXAgPSBET00ucGxhY2VTaGlwKGV2ZW50KTtcbiAgfTtcblxuICBjb25zdCByZXNldEJvYXJkQ29sb3JzID0gKCkgPT4ge1xuICAgIERPTS5yZXNldEJvYXJkQ29sb3JzKHBsYXllck1hc3Rlcik7XG4gIH07XG5cbiAgY29uc3QgaG92ZXJQbGF5ZXJGb3JtID0gKGV2ZW50KSA9PiB7XG4gICAgRE9NLmhvdmVyUGxheWVyRm9ybShldmVudCwgcGxheWVyTWFzdGVyKTtcbiAgfTtcblxuICBjb25zdCB0dXJuID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgR2FtZWZsb3cudHVybik7XG4gICAgY29uc3QgeHBvcyA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0Lnhwb3MpO1xuICAgIGNvbnN0IHlwb3MgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC55cG9zKTtcbiAgICBjb25zdCBwbGF5ZXJSZXN1bHQgPSBwbGF5ZXIudHVybihwbGF5ZXJBdHRhY2ssIGNvbXB1dGVyTWFzdGVyLCB4cG9zLCB5cG9zKTtcbiAgICBpZiAodHlwZW9mIHBsYXllclJlc3VsdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIERPTS5oaXRFZmZlY3QoZXZlbnQudGFyZ2V0LCAnaGl0Jyk7XG4gICAgICBpZiAoY29tcHV0ZXJNYXN0ZXIuaXNBbGxTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgd2lubmVyT3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5V2lubmVyJyk7XG4gICAgICAgIGNvbnN0IHdpbm5lclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lubmVyJykuY2hpbGRyZW5bMF07XG4gICAgICAgIHdpbm5lclRleHQudGV4dENvbnRlbnQgPSAnUGxheWVyIFdvbiEnO1xuICAgICAgICB3aW5uZXJPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2luYWN0aXZlJyk7XG4gICAgICAgIHdpbm5lck92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgRE9NLmhpdEVmZmVjdChldmVudC50YXJnZXQsICdtaXNzJyk7XG4gICAgfVxuXG4gICAgY29uc3QgY29tcHV0ZXJSZXN1bHQgPSBjb21wdXRlci50dXJuKGNvbXB1dGVyQXR0YWNrLCBwbGF5ZXJNYXN0ZXIpO1xuICAgIGlmICh0eXBlb2YgY29tcHV0ZXJSZXN1bHRbMl0gPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGNvbXB1dGVyUmVzdWx0WzBdICsgKGNvbXB1dGVyUmVzdWx0WzFdICogMTApO1xuICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgICAgY29uc3QgbWFzdGVyUGllY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW1hc3RlcicpLmNoaWxkcmVuW2luZGV4XTtcbiAgICAgIERPTS5oaXRFZmZlY3QobWFzdGVyUGllY2UsICdoaXQnKTtcbiAgICAgIGlmIChwbGF5ZXJNYXN0ZXIuaXNBbGxTdW5rKCkgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgd2lubmVyT3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5V2lubmVyJyk7XG4gICAgICAgIGNvbnN0IHdpbm5lclRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lubmVyJykuY2hpbGRyZW5bMF07XG4gICAgICAgIHdpbm5lclRleHQudGV4dENvbnRlbnQgPSAnQ29tcHV0ZXIgV29uISc7XG4gICAgICAgIHdpbm5lck92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnaW5hY3RpdmUnKTtcbiAgICAgICAgd2lubmVyT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5kZXggPSBjb21wdXRlclJlc3VsdFswXSArIGNvbXB1dGVyUmVzdWx0WzFdICsgMTtcbiAgICAgIGNvbnN0IG1hc3RlclBpZWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1tYXN0ZXInKS5jaGlsZHJlbltpbmRleF07XG4gICAgICBET00uaGl0RWZmZWN0KG1hc3RlclBpZWNlLCAnbWlzcycpO1xuICAgICAgY29uc29sZS5sb2cocGxheWVyTWFzdGVyLmdpdmVIZWFkT2ZTaGlwcygpKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBzd2l0Y2hBeGlzLCBwbGFjZVNoaXAsIHN0YXJ0R2FtZSwgcmVzZXRCb2FyZENvbG9ycywgaG92ZXJQbGF5ZXJGb3JtLCB0dXJuLFxuICB9O1xufSkoKTtcblxuRE9NLmxvYWRCb2FyZCgpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIERPTS5sb2FkQm9hcmQpO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdGF0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgR2FtZWZsb3cuc3dpdGNoQXhpcyk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmFuZG9taXplJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBHYW1lZmxvdy5zdGFydEdhbWUpO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkLWNvbnRhaW5lcicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgR2FtZWZsb3cucmVzZXRCb2FyZENvbG9ycyk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1zZXF1ZW5jZXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuZXhwb3J0IGNvbnN0IFBsYXllciA9ICgpID0+IHtcbiAgY29uc3QgdHVybiA9IChwbGF5ZXJBdHRhY2ssIGNvbXB1dGVyTWFzdGVyLCB4cG9zLCB5cG9zKSA9PiB7XG4gICAgY29uc3QgbWFzdGVyU3F1YXJlID0gY29tcHV0ZXJNYXN0ZXIuZ2V0Qm9hcmRTcXVhcmUoeHBvcywgeXBvcyk7XG4gICAgY29uc3QgYXR0YWNrU3F1YXJlID0gcGxheWVyQXR0YWNrLmdldEJvYXJkU3F1YXJlKHhwb3MsIHlwb3MpO1xuICAgIGNvbnN0IGhpdE9yTWlzcyA9IHBsYXllckF0dGFjay5yZWNpZXZlQXR0YWNrKG1hc3RlclNxdWFyZSwgYXR0YWNrU3F1YXJlKTtcbiAgICByZXR1cm4gaGl0T3JNaXNzO1xuICB9O1xuXG4gIHJldHVybiB7IHR1cm4gfTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuZXhwb3J0IGNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGxldCBuYW1lO1xuXG4gIGNvbnN0IHdoZXJlSGl0ID0gbmV3IEFycmF5KGxlbmd0aCkuZmlsbChmYWxzZSk7XG5cbiAgY29uc3Qgc3Vua1N0YXR1cyA9IGZhbHNlO1xuXG4gIGNvbnN0IGhpdCA9IChpbmRleCkgPT4ge1xuICAgIHdoZXJlSGl0W2luZGV4XSA9IHRydWU7XG4gICAgcmV0dXJuIHdoZXJlSGl0O1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgc3RhdHVzID0gdHJ1ZTtcbiAgICB3aGVyZUhpdC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgaWYgKGxvY2F0aW9uID09PSBmYWxzZSkgc3RhdHVzID0gZmFsc2U7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0YXR1cztcbiAgfTtcblxuICBjb25zdCBzZXROYW1lID0gKG5ld05hbWUpID0+IHtcbiAgICBpZiAobmV3TmFtZSAhPT0gdW5kZWZpbmVkKSBuYW1lID0gbmV3TmFtZTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGxlbmd0aCxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIHN1bmtTdGF0dXMsXG4gICAgc2V0TmFtZSxcbiAgfTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9