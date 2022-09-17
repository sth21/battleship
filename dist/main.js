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
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */




const DOM = (() => {
  const axis = 'x';
  const activeShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(5);
  const playerMaster = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
  const playerAttack = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();

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
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */



const Computer = () => {
  const selectPosition = (computerAttack) => {
    const options = computerAttack.getEmptySquares();
    const selection = options[Math.floor(Math.random() * options.length)];
    return selection.position;
  };

  const selectAxis = () => {
    const number = Math.random();
    return (number === 0) ? 'x' : 'y';
  };

  const turn = (computerAttack, playerMaster) => {
    const square = selectPosition(computerAttack);
    const xpos = square[0];
    const ypos = square[1];
    const masterSquare = playerMaster.getBoardSquare(xpos, ypos);
    const attackSquare = computerAttack.getBoardSquare(xpos, ypos);
    const hitOrMiss = computerAttack.recieveAttack(masterSquare, attackSquare);
    return hitOrMiss;
  };

  const randomizeBoard = (computerMaster) => {
    const queue = [(0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(1), (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(2), (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(3), (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(4), (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(5)];
    while (queue.length !== 0) {
      const position = selectPosition(computerMaster);
      const placementResult = computerMaster.canShipBePlaced(queue[0], position[0], position[1], selectAxis());
      if (placementResult === true) {
        computerMaster.placeShip(queue[0], position[0], position[1], selectAxis());
        queue.shift();
      }
    }
    return computerMaster.giveHeadOfShips();
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
    const headOfShip = board[posx][posy];
    headOfShip.whatOccupies = ship;
    headOfShip.index = 0;
    for (let i = 1; i < ship.length; i += 1) {
      if (alignment === 'x') {
        posx += 1;
      } else {
        posy += 1;
      }
      board[posx][posy].whatOccupies = ship;
      board[posx][posy].index = i;
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
      attackingShip.hit(master.index);
      return attackingShip;
    }
    attack.hitOrMiss = 'miss';
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

  return {
    length,
    hit,
    isSunk,
    sunkStatus,
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameflow": () => (/* binding */ Gameflow)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computer */ "./src/computer.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* eslint-disable import/prefer-default-export */






const Gameflow = (() => {
  let player;
  let playerMaster;
  let playerAttack;
  let computer;
  let computerMaster;
  let computerAttack;

  const startGame = (event) => {
    event.preventDefault();

    // Declare player / player boards
    player = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)();
    playerMaster = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();
    playerAttack = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();

    // Declare computer / computer boards
    computer = (0,_computer__WEBPACK_IMPORTED_MODULE_2__.Computer)();
    computerMaster = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();
    computerAttack = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();

    // Use submit board to render player board
    renderPlayerBoard(event, playerMaster);
    // Randomly create computer board
    // Remove form from DOM, render two boards to represent the playerAttack / computerAttack boards
  };

  const renderPlayerBoard = (event, board) => {

  };

  return { startGame };
})();

_DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.loadBoard();
window.addEventListener('resize', _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.loadBoard);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRXdDO0FBQ047QUFDSTtBQUNWOztBQUVyQjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSwrQ0FBTTtBQUNuQixtQkFBbUIscURBQVM7QUFDNUIsbUJBQW1CLHFEQUFTOztBQUU1QjtBQUNBLGVBQWUsbURBQVE7QUFDdkIscUJBQXFCLHFEQUFTO0FBQzlCLHFCQUFxQixxREFBUzs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxXQUFXO0FBQ1gsQ0FBQzs7QUFFRCwrQ0FBYTtBQUNiLGtDQUFrQywrQ0FBYSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1kZXN0cnVjdHVyaW5nICovXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgcmFkaXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5cbmV4cG9ydCBjb25zdCBET00gPSAoKCkgPT4ge1xuICBjb25zdCBheGlzID0gJ3gnO1xuICBjb25zdCBhY3RpdmVTaGlwID0gU2hpcCg1KTtcbiAgY29uc3QgcGxheWVyTWFzdGVyID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IHBsYXllckF0dGFjayA9IEdhbWVib2FyZCgpO1xuXG4gIGNvbnN0IGhvdmVyUGxheWVyRm9ybSA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuY2hpbGRyZW4ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGJhY2tncm91bmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGJvYXJkLmNoaWxkcmVuW2ldKS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICBpZiAoYmFja2dyb3VuZENvbG9yICE9PSAnIzAwMjA1QicgfHwgYmFja2dyb3VuZENvbG9yICE9PSAnI0M1Qjc4MycpIGJvYXJkLmNoaWxkcmVuW2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMDAyMDVCJztcbiAgICB9XG4gICAgY29uc3QgeHBvcyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnhwb3M7XG4gICAgY29uc3QgeXBvcyA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lnlwb3M7XG4gICAgbGV0IGluZGV4ID0gcGFyc2VJbnQoeXBvcyArIHhwb3MpO1xuICAgIGlmIChwbGF5ZXJNYXN0ZXIuY2FuU2hpcEJlUGxhY2VkKGFjdGl2ZVNoaXAsIHBhcnNlSW50KHhwb3MpLCBwYXJzZUludCh5cG9zKSwgYXhpcykgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBhY3RpdmVUaWxlID0gZXZlbnQudGFyZ2V0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlU2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgYWN0aXZlVGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgICBhY3RpdmVUaWxlID0gYm9hcmQuY2hpbGRyZW5baW5kZXggKyAxXTtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2ZVRpbGUgPSBib2FyZC5jaGlsZHJlbltpbmRleCArIDEwXTtcbiAgICAgICAgaW5kZXggKz0gMTA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGxvYWRCb2FyZCA9IChib2FyZCkgPT4ge1xuICAgIGlmIChib2FyZCA9PT0gdW5kZWZpbmVkIHx8IGJvYXJkLnRhcmdldCkgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgd2hpbGUgKGJvYXJkLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGJvYXJkLnJlbW92ZUNoaWxkKGJvYXJkLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBjb25zdCB7IHdpZHRoIH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShib2FyZCk7XG4gICAgYm9hcmQuc3R5bGUuaGVpZ2h0ID0gd2lkdGg7XG4gICAgY29uc3Qgc2l6ZSA9ICh3aWR0aC5zbGljZSgwLCB3aWR0aC5sZW5ndGggLSAyKSAvIDEwKSAtIDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3QgcGllY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcGllY2UuY2xhc3NMaXN0LmFkZCgnYm9hcmQtcGllY2UnKTtcbiAgICAgICAgcGllY2UuZGF0YXNldC54cG9zID0gajtcbiAgICAgICAgcGllY2UuZGF0YXNldC55cG9zID0gaTtcbiAgICAgICAgcGllY2Uuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZX1weGA7XG4gICAgICAgIHBpZWNlLnN0eWxlLndpZHRoID0gYCR7c2l6ZX1weGA7XG4gICAgICAgIHBpZWNlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhvdmVyUGxheWVyRm9ybSk7XG4gICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHBpZWNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgbG9hZEJvYXJkIH07XG59KSgpO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcblxuZXhwb3J0IGNvbnN0IENvbXB1dGVyID0gKCkgPT4ge1xuICBjb25zdCBzZWxlY3RQb3NpdGlvbiA9IChjb21wdXRlckF0dGFjaykgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBjb21wdXRlckF0dGFjay5nZXRFbXB0eVNxdWFyZXMoKTtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9wdGlvbnMubGVuZ3RoKV07XG4gICAgcmV0dXJuIHNlbGVjdGlvbi5wb3NpdGlvbjtcbiAgfTtcblxuICBjb25zdCBzZWxlY3RBeGlzID0gKCkgPT4ge1xuICAgIGNvbnN0IG51bWJlciA9IE1hdGgucmFuZG9tKCk7XG4gICAgcmV0dXJuIChudW1iZXIgPT09IDApID8gJ3gnIDogJ3knO1xuICB9O1xuXG4gIGNvbnN0IHR1cm4gPSAoY29tcHV0ZXJBdHRhY2ssIHBsYXllck1hc3RlcikgPT4ge1xuICAgIGNvbnN0IHNxdWFyZSA9IHNlbGVjdFBvc2l0aW9uKGNvbXB1dGVyQXR0YWNrKTtcbiAgICBjb25zdCB4cG9zID0gc3F1YXJlWzBdO1xuICAgIGNvbnN0IHlwb3MgPSBzcXVhcmVbMV07XG4gICAgY29uc3QgbWFzdGVyU3F1YXJlID0gcGxheWVyTWFzdGVyLmdldEJvYXJkU3F1YXJlKHhwb3MsIHlwb3MpO1xuICAgIGNvbnN0IGF0dGFja1NxdWFyZSA9IGNvbXB1dGVyQXR0YWNrLmdldEJvYXJkU3F1YXJlKHhwb3MsIHlwb3MpO1xuICAgIGNvbnN0IGhpdE9yTWlzcyA9IGNvbXB1dGVyQXR0YWNrLnJlY2lldmVBdHRhY2sobWFzdGVyU3F1YXJlLCBhdHRhY2tTcXVhcmUpO1xuICAgIHJldHVybiBoaXRPck1pc3M7XG4gIH07XG5cbiAgY29uc3QgcmFuZG9taXplQm9hcmQgPSAoY29tcHV0ZXJNYXN0ZXIpID0+IHtcbiAgICBjb25zdCBxdWV1ZSA9IFtTaGlwKDEpLCBTaGlwKDIpLCBTaGlwKDMpLCBTaGlwKDQpLCBTaGlwKDUpXTtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IHNlbGVjdFBvc2l0aW9uKGNvbXB1dGVyTWFzdGVyKTtcbiAgICAgIGNvbnN0IHBsYWNlbWVudFJlc3VsdCA9IGNvbXB1dGVyTWFzdGVyLmNhblNoaXBCZVBsYWNlZChxdWV1ZVswXSwgcG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdLCBzZWxlY3RBeGlzKCkpO1xuICAgICAgaWYgKHBsYWNlbWVudFJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb21wdXRlck1hc3Rlci5wbGFjZVNoaXAocXVldWVbMF0sIHBvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSwgc2VsZWN0QXhpcygpKTtcbiAgICAgICAgcXVldWUuc2hpZnQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbXB1dGVyTWFzdGVyLmdpdmVIZWFkT2ZTaGlwcygpO1xuICB9O1xuXG4gIHJldHVybiB7IHR1cm4sIHJhbmRvbWl6ZUJvYXJkIH07XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuZXhwb3J0IGNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmRTcXVhcmUgPSAoKSA9PiAoe1xuICAgIHBvc2l0aW9uOiB1bmRlZmluZWQsIHdoYXRPY2N1cGllczogdW5kZWZpbmVkLCBpbmRleDogdW5kZWZpbmVkLCBoaXRPck1pc3M6IHVuZGVmaW5lZCxcbiAgfSk7XG5cbiAgY29uc3QgYm9hcmQgPSBbW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11dO1xuICBsZXQgY291bnRlciA9IDA7XG4gIGJvYXJkLmZvckVhY2goKGNvbHVtbikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgY29sdW1uW2ldID0gYm9hcmRTcXVhcmUoKTtcbiAgICAgIGNvbHVtbltpXS5wb3NpdGlvbiA9IFtjb3VudGVyLCBpXTtcbiAgICAgIGlmIChpID09PSA5KSBjb3VudGVyICs9IDE7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBnZXRCb2FyZFNxdWFyZSA9ICh4cG9zLCB5cG9zKSA9PiBib2FyZFt4cG9zXVt5cG9zXTtcblxuICBjb25zdCBnZXRFbXB0eVNxdWFyZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgZW1wdHlTcXVhcmVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW2pdLmhpdE9yTWlzcyA9PT0gdW5kZWZpbmVkKSBlbXB0eVNxdWFyZXNbZW1wdHlTcXVhcmVzLmxlbmd0aF0gPSBib2FyZFtpXVtqXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVtcHR5U3F1YXJlcztcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgcG9zeCwgcG9zeSwgYWxpZ25tZW50KSA9PiB7XG4gICAgY29uc3QgaGVhZE9mU2hpcCA9IGJvYXJkW3Bvc3hdW3Bvc3ldO1xuICAgIGhlYWRPZlNoaXAud2hhdE9jY3VwaWVzID0gc2hpcDtcbiAgICBoZWFkT2ZTaGlwLmluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChhbGlnbm1lbnQgPT09ICd4Jykge1xuICAgICAgICBwb3N4ICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3N5ICs9IDE7XG4gICAgICB9XG4gICAgICBib2FyZFtwb3N4XVtwb3N5XS53aGF0T2NjdXBpZXMgPSBzaGlwO1xuICAgICAgYm9hcmRbcG9zeF1bcG9zeV0uaW5kZXggPSBpO1xuICAgIH1cbiAgICByZXR1cm4gaGVhZE9mU2hpcDtcbiAgfTtcblxuICBjb25zdCBjYW5TaGlwQmVQbGFjZWQgPSAoc2hpcCwgcG9zeCwgcG9zeSwgYWxpZ25tZW50KSA9PiB7XG4gICAgbGV0IHBvc2l0aW9uWCA9IHBvc3g7XG4gICAgbGV0IHBvc2l0aW9uWSA9IHBvc3k7XG4gICAgY29uc3QgaGVhZE9mU2hpcCA9IGJvYXJkW3Bvc2l0aW9uWF1bcG9zaXRpb25ZXTtcbiAgICBpZiAoaGVhZE9mU2hpcC53aGF0T2NjdXBpZXMgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGFsaWdubWVudCA9PT0gJ3gnKSB7XG4gICAgICAgIHBvc2l0aW9uWCArPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zaXRpb25ZICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAocG9zaXRpb25YIDwgMCB8fCBwb3NpdGlvblggPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAocG9zaXRpb25ZIDwgMCB8fCBwb3NpdGlvblkgPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoYm9hcmRbcG9zaXRpb25YXVtwb3NpdGlvblldLndoYXRPY2N1cGllcyAhPT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHJlY2lldmVBdHRhY2sgPSAobWFzdGVyLCBhdHRhY2spID0+IHtcbiAgICBpZiAodHlwZW9mIG1hc3Rlci53aGF0T2NjdXBpZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBhdHRhY2tpbmdTaGlwID0gbWFzdGVyLndoYXRPY2N1cGllcztcbiAgICAgIGF0dGFjay53aGF0T2NjdXBpZXMgPSBtYXN0ZXIud2hhdE9jY3VwaWVzO1xuICAgICAgYXR0YWNrLmhpdE9yTWlzcyA9ICdoaXQnO1xuICAgICAgYXR0YWNraW5nU2hpcC5oaXQobWFzdGVyLmluZGV4KTtcbiAgICAgIHJldHVybiBhdHRhY2tpbmdTaGlwO1xuICAgIH1cbiAgICBhdHRhY2suaGl0T3JNaXNzID0gJ21pc3MnO1xuICAgIHJldHVybiBhdHRhY2suaGl0T3JNaXNzO1xuICB9O1xuXG4gIGNvbnN0IGlzQWxsU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBhcnIgPSBib2FyZDtcbiAgICBsZXQgYWxsRW1wdHkgPSB0cnVlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChhcnJbaV1bal0ud2hhdE9jY3VwaWVzICE9PSB1bmRlZmluZWQgJiYgYXJyW2ldW2pdLmhpdE9yTWlzcyAhPT0gJ2hpdCcpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFycltpXVtqXS53aGF0T2NjdXBpZXMgIT09IHVuZGVmaW5lZCkgYWxsRW1wdHkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFsbEVtcHR5ID09PSB0cnVlKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgZ2l2ZUhlYWRPZlNoaXBzID0gKCkgPT4ge1xuICAgIGNvbnN0IGFyciA9IGJvYXJkO1xuICAgIGNvbnN0IGhlYWRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKGFycltpXVtqXS5pbmRleCA9PT0gMCkgaGVhZHNbaGVhZHMubGVuZ3RoXSA9IGFycltpXVtqXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhlYWRzO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0Qm9hcmRTcXVhcmUsXG4gICAgZ2V0RW1wdHlTcXVhcmVzLFxuICAgIHBsYWNlU2hpcCxcbiAgICBjYW5TaGlwQmVQbGFjZWQsXG4gICAgcmVjaWV2ZUF0dGFjayxcbiAgICBpc0FsbFN1bmssXG4gICAgZ2l2ZUhlYWRPZlNoaXBzLFxuICB9O1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNlcXVlbmNlcyAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG5leHBvcnQgY29uc3QgUGxheWVyID0gKCkgPT4ge1xuICBjb25zdCB0dXJuID0gKHBsYXllckF0dGFjaywgY29tcHV0ZXJNYXN0ZXIsIHhwb3MsIHlwb3MpID0+IHtcbiAgICBjb25zdCBtYXN0ZXJTcXVhcmUgPSBjb21wdXRlck1hc3Rlci5nZXRCb2FyZFNxdWFyZSh4cG9zLCB5cG9zKTtcbiAgICBjb25zdCBhdHRhY2tTcXVhcmUgPSBwbGF5ZXJBdHRhY2suZ2V0Qm9hcmRTcXVhcmUoeHBvcywgeXBvcyk7XG4gICAgY29uc3QgaGl0T3JNaXNzID0gcGxheWVyQXR0YWNrLnJlY2lldmVBdHRhY2sobWFzdGVyU3F1YXJlLCBhdHRhY2tTcXVhcmUpO1xuICAgIHJldHVybiBoaXRPck1pc3M7XG4gIH07XG5cbiAgcmV0dXJuIHsgdHVybiB9O1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG5leHBvcnQgY29uc3QgU2hpcCA9IChsZW5ndGgpID0+IHtcbiAgY29uc3Qgd2hlcmVIaXQgPSBuZXcgQXJyYXkobGVuZ3RoKS5maWxsKGZhbHNlKTtcblxuICBjb25zdCBzdW5rU3RhdHVzID0gZmFsc2U7XG5cbiAgY29uc3QgaGl0ID0gKGluZGV4KSA9PiB7XG4gICAgd2hlcmVIaXRbaW5kZXhdID0gdHJ1ZTtcbiAgICByZXR1cm4gd2hlcmVIaXQ7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBzdGF0dXMgPSB0cnVlO1xuICAgIHdoZXJlSGl0LmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICBpZiAobG9jYXRpb24gPT09IGZhbHNlKSBzdGF0dXMgPSBmYWxzZTtcbiAgICB9KTtcbiAgICByZXR1cm4gc3RhdHVzO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbGVuZ3RoLFxuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgc3Vua1N0YXR1cyxcbiAgfTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgQ29tcHV0ZXIgfSBmcm9tICcuL2NvbXB1dGVyJztcbmltcG9ydCB7IERPTSB9IGZyb20gJy4vRE9NJztcblxuZXhwb3J0IGNvbnN0IEdhbWVmbG93ID0gKCgpID0+IHtcbiAgbGV0IHBsYXllcjtcbiAgbGV0IHBsYXllck1hc3RlcjtcbiAgbGV0IHBsYXllckF0dGFjaztcbiAgbGV0IGNvbXB1dGVyO1xuICBsZXQgY29tcHV0ZXJNYXN0ZXI7XG4gIGxldCBjb21wdXRlckF0dGFjaztcblxuICBjb25zdCBzdGFydEdhbWUgPSAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gRGVjbGFyZSBwbGF5ZXIgLyBwbGF5ZXIgYm9hcmRzXG4gICAgcGxheWVyID0gUGxheWVyKCk7XG4gICAgcGxheWVyTWFzdGVyID0gR2FtZWJvYXJkKCk7XG4gICAgcGxheWVyQXR0YWNrID0gR2FtZWJvYXJkKCk7XG5cbiAgICAvLyBEZWNsYXJlIGNvbXB1dGVyIC8gY29tcHV0ZXIgYm9hcmRzXG4gICAgY29tcHV0ZXIgPSBDb21wdXRlcigpO1xuICAgIGNvbXB1dGVyTWFzdGVyID0gR2FtZWJvYXJkKCk7XG4gICAgY29tcHV0ZXJBdHRhY2sgPSBHYW1lYm9hcmQoKTtcblxuICAgIC8vIFVzZSBzdWJtaXQgYm9hcmQgdG8gcmVuZGVyIHBsYXllciBib2FyZFxuICAgIHJlbmRlclBsYXllckJvYXJkKGV2ZW50LCBwbGF5ZXJNYXN0ZXIpO1xuICAgIC8vIFJhbmRvbWx5IGNyZWF0ZSBjb21wdXRlciBib2FyZFxuICAgIC8vIFJlbW92ZSBmb3JtIGZyb20gRE9NLCByZW5kZXIgdHdvIGJvYXJkcyB0byByZXByZXNlbnQgdGhlIHBsYXllckF0dGFjayAvIGNvbXB1dGVyQXR0YWNrIGJvYXJkc1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlclBsYXllckJvYXJkID0gKGV2ZW50LCBib2FyZCkgPT4ge1xuXG4gIH07XG5cbiAgcmV0dXJuIHsgc3RhcnRHYW1lIH07XG59KSgpO1xuXG5ET00ubG9hZEJvYXJkKCk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgRE9NLmxvYWRCb2FyZCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=