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
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */

const DOM = (() => {
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
    const headOfShip = board[posx][posy];
    if (headOfShip.whatOccupies !== undefined) return false;
    for (let i = 1; i < ship.length; i += 1) {
      if (alignment === 'x') {
        posx += 1;
      } else {
        posy += 1;
      }
      if (posx < 0 || posx > 9) return false;
      if (posy < 0 || posy > 9) return false;
      if (board[posx][posy].whatOccupies !== undefined) return false;
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

window.addEventListener('load', _DOM__WEBPACK_IMPORTED_MODULE_3__.DOM.loadBoard);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLEtBQUs7QUFDckMsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QkQ7QUFDQTs7QUFFOEI7O0FBRXZCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsMkNBQUksS0FBSywyQ0FBSSxLQUFLLDJDQUFJLEtBQUssMkNBQUksS0FBSywyQ0FBSTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7Ozs7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzdHQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzVCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRXdDO0FBQ047QUFDSTtBQUNWOztBQUVyQjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSwrQ0FBTTtBQUNuQixtQkFBbUIscURBQVM7QUFDNUIsbUJBQW1CLHFEQUFTOztBQUU1QjtBQUNBLGVBQWUsbURBQVE7QUFDdkIscUJBQXFCLHFEQUFTO0FBQzlCLHFCQUFxQixxREFBUzs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxXQUFXO0FBQ1gsQ0FBQzs7QUFFRCxnQ0FBZ0MsK0NBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXB1dGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByYWRpeCAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG5leHBvcnQgY29uc3QgRE9NID0gKCgpID0+IHtcbiAgY29uc3QgbG9hZEJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHsgaGVpZ2h0IH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShib2FyZCk7XG4gICAgYm9hcmQuc3R5bGUud2lkdGggPSBoZWlnaHQ7XG4gICAgY29uc3Qgc2l6ZSA9IChib2FyZC5zdHlsZS53aWR0aC5zbGljZSgwLCBoZWlnaHQubGVuZ3RoIC0gMikgLyAxMCkgLSAxO1xuICAgIGNvbnNvbGUubG9nKHNpemUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IHBpZWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBpZWNlLmNsYXNzTGlzdC5hZGQoJ2JvYXJkLXBpZWNlJyk7XG4gICAgICAgIHBpZWNlLmRhdGFzZXQueHBvcyA9IGk7XG4gICAgICAgIHBpZWNlLmRhdGFzZXQueXBvcyA9IGo7XG4gICAgICAgIHBpZWNlLnN0eWxlLmhlaWdodCA9IGAke3NpemV9cHhgO1xuICAgICAgICBwaWVjZS5zdHlsZS53aWR0aCA9IGAke3NpemV9cHhgO1xuICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChwaWVjZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGxvYWRCb2FyZCB9O1xufSkoKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cblxuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5cbmV4cG9ydCBjb25zdCBDb21wdXRlciA9ICgpID0+IHtcbiAgY29uc3Qgc2VsZWN0UG9zaXRpb24gPSAoY29tcHV0ZXJBdHRhY2spID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0gY29tcHV0ZXJBdHRhY2suZ2V0RW1wdHlTcXVhcmVzKCk7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLmxlbmd0aCldO1xuICAgIHJldHVybiBzZWxlY3Rpb24ucG9zaXRpb247XG4gIH07XG5cbiAgY29uc3Qgc2VsZWN0QXhpcyA9ICgpID0+IHtcbiAgICBjb25zdCBudW1iZXIgPSBNYXRoLnJhbmRvbSgpO1xuICAgIHJldHVybiAobnVtYmVyID09PSAwKSA/ICd4JyA6ICd5JztcbiAgfTtcblxuICBjb25zdCB0dXJuID0gKGNvbXB1dGVyQXR0YWNrLCBwbGF5ZXJNYXN0ZXIpID0+IHtcbiAgICBjb25zdCBzcXVhcmUgPSBzZWxlY3RQb3NpdGlvbihjb21wdXRlckF0dGFjayk7XG4gICAgY29uc3QgeHBvcyA9IHNxdWFyZVswXTtcbiAgICBjb25zdCB5cG9zID0gc3F1YXJlWzFdO1xuICAgIGNvbnN0IG1hc3RlclNxdWFyZSA9IHBsYXllck1hc3Rlci5nZXRCb2FyZFNxdWFyZSh4cG9zLCB5cG9zKTtcbiAgICBjb25zdCBhdHRhY2tTcXVhcmUgPSBjb21wdXRlckF0dGFjay5nZXRCb2FyZFNxdWFyZSh4cG9zLCB5cG9zKTtcbiAgICBjb25zdCBoaXRPck1pc3MgPSBjb21wdXRlckF0dGFjay5yZWNpZXZlQXR0YWNrKG1hc3RlclNxdWFyZSwgYXR0YWNrU3F1YXJlKTtcbiAgICByZXR1cm4gaGl0T3JNaXNzO1xuICB9O1xuXG4gIGNvbnN0IHJhbmRvbWl6ZUJvYXJkID0gKGNvbXB1dGVyTWFzdGVyKSA9PiB7XG4gICAgY29uc3QgcXVldWUgPSBbU2hpcCgxKSwgU2hpcCgyKSwgU2hpcCgzKSwgU2hpcCg0KSwgU2hpcCg1KV07XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgY29uc3QgcG9zaXRpb24gPSBzZWxlY3RQb3NpdGlvbihjb21wdXRlck1hc3Rlcik7XG4gICAgICBjb25zdCBwbGFjZW1lbnRSZXN1bHQgPSBjb21wdXRlck1hc3Rlci5jYW5TaGlwQmVQbGFjZWQocXVldWVbMF0sIHBvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSwgc2VsZWN0QXhpcygpKTtcbiAgICAgIGlmIChwbGFjZW1lbnRSZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgY29tcHV0ZXJNYXN0ZXIucGxhY2VTaGlwKHF1ZXVlWzBdLCBwb3NpdGlvblswXSwgcG9zaXRpb25bMV0sIHNlbGVjdEF4aXMoKSk7XG4gICAgICAgIHF1ZXVlLnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wdXRlck1hc3Rlci5naXZlSGVhZE9mU2hpcHMoKTtcbiAgfTtcblxuICByZXR1cm4geyB0dXJuLCByYW5kb21pemVCb2FyZCB9O1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbmV4cG9ydCBjb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkU3F1YXJlID0gKCkgPT4gKHtcbiAgICBwb3NpdGlvbjogdW5kZWZpbmVkLCB3aGF0T2NjdXBpZXM6IHVuZGVmaW5lZCwgaW5kZXg6IHVuZGVmaW5lZCwgaGl0T3JNaXNzOiB1bmRlZmluZWQsXG4gIH0pO1xuXG4gIGNvbnN0IGJvYXJkID0gW1tdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXTtcbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBib2FyZC5mb3JFYWNoKChjb2x1bW4pID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGNvbHVtbltpXSA9IGJvYXJkU3F1YXJlKCk7XG4gICAgICBjb2x1bW5baV0ucG9zaXRpb24gPSBbY291bnRlciwgaV07XG4gICAgICBpZiAoaSA9PT0gOSkgY291bnRlciArPSAxO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgZ2V0Qm9hcmRTcXVhcmUgPSAoeHBvcywgeXBvcykgPT4gYm9hcmRbeHBvc11beXBvc107XG5cbiAgY29uc3QgZ2V0RW1wdHlTcXVhcmVzID0gKCkgPT4ge1xuICAgIGNvbnN0IGVtcHR5U3F1YXJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChib2FyZFtpXVtqXS5oaXRPck1pc3MgPT09IHVuZGVmaW5lZCkgZW1wdHlTcXVhcmVzW2VtcHR5U3F1YXJlcy5sZW5ndGhdID0gYm9hcmRbaV1bal07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbXB0eVNxdWFyZXM7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHBvc3gsIHBvc3ksIGFsaWdubWVudCkgPT4ge1xuICAgIGNvbnN0IGhlYWRPZlNoaXAgPSBib2FyZFtwb3N4XVtwb3N5XTtcbiAgICBoZWFkT2ZTaGlwLndoYXRPY2N1cGllcyA9IHNoaXA7XG4gICAgaGVhZE9mU2hpcC5pbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYWxpZ25tZW50ID09PSAneCcpIHtcbiAgICAgICAgcG9zeCArPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zeSArPSAxO1xuICAgICAgfVxuICAgICAgYm9hcmRbcG9zeF1bcG9zeV0ud2hhdE9jY3VwaWVzID0gc2hpcDtcbiAgICAgIGJvYXJkW3Bvc3hdW3Bvc3ldLmluZGV4ID0gaTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRPZlNoaXA7XG4gIH07XG5cbiAgY29uc3QgY2FuU2hpcEJlUGxhY2VkID0gKHNoaXAsIHBvc3gsIHBvc3ksIGFsaWdubWVudCkgPT4ge1xuICAgIGNvbnN0IGhlYWRPZlNoaXAgPSBib2FyZFtwb3N4XVtwb3N5XTtcbiAgICBpZiAoaGVhZE9mU2hpcC53aGF0T2NjdXBpZXMgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGFsaWdubWVudCA9PT0gJ3gnKSB7XG4gICAgICAgIHBvc3ggKz0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvc3kgKz0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3N4IDwgMCB8fCBwb3N4ID4gOSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKHBvc3kgPCAwIHx8IHBvc3kgPiA5KSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoYm9hcmRbcG9zeF1bcG9zeV0ud2hhdE9jY3VwaWVzICE9PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgcmVjaWV2ZUF0dGFjayA9IChtYXN0ZXIsIGF0dGFjaykgPT4ge1xuICAgIGlmICh0eXBlb2YgbWFzdGVyLndoYXRPY2N1cGllcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IGF0dGFja2luZ1NoaXAgPSBtYXN0ZXIud2hhdE9jY3VwaWVzO1xuICAgICAgYXR0YWNrLndoYXRPY2N1cGllcyA9IG1hc3Rlci53aGF0T2NjdXBpZXM7XG4gICAgICBhdHRhY2suaGl0T3JNaXNzID0gJ2hpdCc7XG4gICAgICBhdHRhY2tpbmdTaGlwLmhpdChtYXN0ZXIuaW5kZXgpO1xuICAgICAgcmV0dXJuIGF0dGFja2luZ1NoaXA7XG4gICAgfVxuICAgIGF0dGFjay5oaXRPck1pc3MgPSAnbWlzcyc7XG4gICAgcmV0dXJuIGF0dGFjay5oaXRPck1pc3M7XG4gIH07XG5cbiAgY29uc3QgaXNBbGxTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGFyciA9IGJvYXJkO1xuICAgIGxldCBhbGxFbXB0eSA9IHRydWU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKGFycltpXVtqXS53aGF0T2NjdXBpZXMgIT09IHVuZGVmaW5lZCAmJiBhcnJbaV1bal0uaGl0T3JNaXNzICE9PSAnaGl0Jykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJyW2ldW2pdLndoYXRPY2N1cGllcyAhPT0gdW5kZWZpbmVkKSBhbGxFbXB0eSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYWxsRW1wdHkgPT09IHRydWUpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBnaXZlSGVhZE9mU2hpcHMgPSAoKSA9PiB7XG4gICAgY29uc3QgYXJyID0gYm9hcmQ7XG4gICAgY29uc3QgaGVhZHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBpZiAoYXJyW2ldW2pdLmluZGV4ID09PSAwKSBoZWFkc1toZWFkcy5sZW5ndGhdID0gYXJyW2ldW2pdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaGVhZHM7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRCb2FyZFNxdWFyZSxcbiAgICBnZXRFbXB0eVNxdWFyZXMsXG4gICAgcGxhY2VTaGlwLFxuICAgIGNhblNoaXBCZVBsYWNlZCxcbiAgICByZWNpZXZlQXR0YWNrLFxuICAgIGlzQWxsU3VuayxcbiAgICBnaXZlSGVhZE9mU2hpcHMsXG4gIH07XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tc2VxdWVuY2VzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbmV4cG9ydCBjb25zdCBQbGF5ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHR1cm4gPSAocGxheWVyQXR0YWNrLCBjb21wdXRlck1hc3RlciwgeHBvcywgeXBvcykgPT4ge1xuICAgIGNvbnN0IG1hc3RlclNxdWFyZSA9IGNvbXB1dGVyTWFzdGVyLmdldEJvYXJkU3F1YXJlKHhwb3MsIHlwb3MpO1xuICAgIGNvbnN0IGF0dGFja1NxdWFyZSA9IHBsYXllckF0dGFjay5nZXRCb2FyZFNxdWFyZSh4cG9zLCB5cG9zKTtcbiAgICBjb25zdCBoaXRPck1pc3MgPSBwbGF5ZXJBdHRhY2sucmVjaWV2ZUF0dGFjayhtYXN0ZXJTcXVhcmUsIGF0dGFja1NxdWFyZSk7XG4gICAgcmV0dXJuIGhpdE9yTWlzcztcbiAgfTtcblxuICByZXR1cm4geyB0dXJuIH07XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbmV4cG9ydCBjb25zdCBTaGlwID0gKGxlbmd0aCkgPT4ge1xuICBjb25zdCB3aGVyZUhpdCA9IG5ldyBBcnJheShsZW5ndGgpLmZpbGwoZmFsc2UpO1xuXG4gIGNvbnN0IHN1bmtTdGF0dXMgPSBmYWxzZTtcblxuICBjb25zdCBoaXQgPSAoaW5kZXgpID0+IHtcbiAgICB3aGVyZUhpdFtpbmRleF0gPSB0cnVlO1xuICAgIHJldHVybiB3aGVyZUhpdDtcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IHN0YXR1cyA9IHRydWU7XG4gICAgd2hlcmVIaXQuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgIGlmIChsb2NhdGlvbiA9PT0gZmFsc2UpIHN0YXR1cyA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHJldHVybiBzdGF0dXM7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBsZW5ndGgsXG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgICBzdW5rU3RhdHVzLFxuICB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBDb21wdXRlciB9IGZyb20gJy4vY29tcHV0ZXInO1xuaW1wb3J0IHsgRE9NIH0gZnJvbSAnLi9ET00nO1xuXG5leHBvcnQgY29uc3QgR2FtZWZsb3cgPSAoKCkgPT4ge1xuICBsZXQgcGxheWVyO1xuICBsZXQgcGxheWVyTWFzdGVyO1xuICBsZXQgcGxheWVyQXR0YWNrO1xuICBsZXQgY29tcHV0ZXI7XG4gIGxldCBjb21wdXRlck1hc3RlcjtcbiAgbGV0IGNvbXB1dGVyQXR0YWNrO1xuXG4gIGNvbnN0IHN0YXJ0R2FtZSA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBEZWNsYXJlIHBsYXllciAvIHBsYXllciBib2FyZHNcbiAgICBwbGF5ZXIgPSBQbGF5ZXIoKTtcbiAgICBwbGF5ZXJNYXN0ZXIgPSBHYW1lYm9hcmQoKTtcbiAgICBwbGF5ZXJBdHRhY2sgPSBHYW1lYm9hcmQoKTtcblxuICAgIC8vIERlY2xhcmUgY29tcHV0ZXIgLyBjb21wdXRlciBib2FyZHNcbiAgICBjb21wdXRlciA9IENvbXB1dGVyKCk7XG4gICAgY29tcHV0ZXJNYXN0ZXIgPSBHYW1lYm9hcmQoKTtcbiAgICBjb21wdXRlckF0dGFjayA9IEdhbWVib2FyZCgpO1xuXG4gICAgLy8gVXNlIHN1Ym1pdCBib2FyZCB0byByZW5kZXIgcGxheWVyIGJvYXJkXG4gICAgcmVuZGVyUGxheWVyQm9hcmQoZXZlbnQsIHBsYXllck1hc3Rlcik7XG4gICAgLy8gUmFuZG9tbHkgY3JlYXRlIGNvbXB1dGVyIGJvYXJkXG4gICAgLy8gUmVtb3ZlIGZvcm0gZnJvbSBET00sIHJlbmRlciB0d28gYm9hcmRzIHRvIHJlcHJlc2VudCB0aGUgcGxheWVyQXR0YWNrIC8gY29tcHV0ZXJBdHRhY2sgYm9hcmRzXG4gIH07XG5cbiAgY29uc3QgcmVuZGVyUGxheWVyQm9hcmQgPSAoZXZlbnQsIGJvYXJkKSA9PiB7XG5cbiAgfTtcblxuICByZXR1cm4geyBzdGFydEdhbWUgfTtcbn0pKCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgRE9NLmxvYWRCb2FyZCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=