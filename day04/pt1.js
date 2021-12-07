const fs = require('fs');

/**
 * A board is a 5x5 grid of numbers.
 * 
 * Each time a number is drawn, the board
 * is checked to see if it contains that number.
 * 
 * If so, that number becomes marked.
 * 
 * After each turn, each board should be checked to
 * see if an entire row or column is marked. If there
 * is, it's a winning board.
 * 
 * The boards are stored in a 1D array. The width of
 * the board gives us a way to index into the board
 * using grid coordinates. Ex:
 * 
 * [
 *    0,  1,  2,  3,  4,
 *    5,  6,  7,  8,  9,
 *   10, 11, 12, 13, 14,
 *   15, 16, 17, 18, 19,
 *   20, 21, 22, 23, 24
 * ]
 * 
 * Winning combinations can be determined by comparing the
 * array of marked indices against the winning rows or columns:
 * 
 * Cols:
 * [
 *  [  0,  1,  2,  3,  4 ],
 *  [  5,  6,  7,  8,  9 ],
 *  [ 10, 11, 12, 13, 14 ],
 *  [ 15, 16, 17, 18, 19 ],
 *  [ 20, 21, 22, 23, 24 ]
 * ]
 * 
 * Rows:
 * [
 *  [  0,  5, 10, 15, 20 ],
 *  [  1,  6, 11, 16, 21 ],
 *  [  2,  7, 12, 17, 22 ],
 *  [  3,  8, 13, 18, 23 ],
 *  [  4,  9, 14, 19, 24 ]
 * ]
*/
let Board = function(numbers, marked) {
	this.numbers = numbers;
	this.marked = marked;
};

Board.prototype.checkWin = function() {
	return this.width;
}

Board.prototype.winningRows = [
	[  0,  1,  2,  3,  4 ],
	[  5,  6,  7,  8,  9 ],
	[ 10, 11, 12, 13, 14 ],
	[ 15, 16, 17, 18, 19 ],
	[ 20, 21, 22, 23, 24 ]
];

Board.prototype.winningCols = [
	[ 0, 5, 10, 15, 20 ],
	[ 1, 6, 11, 16, 21 ],
	[ 2, 7, 12, 17, 22 ],
	[ 3, 8, 13, 18, 23 ],
	[ 4, 9, 14, 19, 24 ]
];

Array.prototype.allIndexesOf = function(elem) {
	let output = [];

	for(let i = 0; i < this.length; i++) {
		if(this[i] === elem) {
			output.push(i);
		}
	}

	return output;
};

function parseInput(input) {
	let idx = 0;
	let draws = '';
	let boards = [];

	input = input.toString();

	// populate an array of draws
	while(input[idx] != '\n') {
		draws += input[idx];
		idx++;
	}
	draws = draws.split(',').map(num => Number(num));

	// adding 2 will skip us past the empty line after the list of draws
	idx += 2;

	let curBoard = new Board([], []);
	let curNum = '';
	// walk through the input to populate an array of boards
	while(idx < input.length) {
		
		// we only need to do something special if the current char is
		// a '\n' or ' '
		if(input[idx] === '\n' || input[idx] === ' ') {
			if(input[idx] === '\n' && curNum === '') {
				boards.push(curBoard);
				curBoard = new Board([], []);
			}
			else {
				if(curNum != '') {
					curBoard.numbers.push(Number(curNum));
					curNum = '';
				}
			}
		}
		else {
			curNum += input[idx];
		}

		idx++;
	}
	// be sure to add the last board as well
	boards.push(curBoard);

	return {
		draws: draws,
		boards: boards
	}
}

function playBingo(draws, boards) {
	
}


const input = fs.readFileSync('./testInput');
//const input = fs.readFileSync('./input');

parsedInput = parseInput(input);
console.log(parsedInput.draws, parsedInput.boards);

console.log('index of 17 in board[0]: ', parsedInput.boards[0].numbers.allIndexesOf(17));
console.log('index of 0 in board[2]: ', parsedInput.boards[2].numbers.allIndexesOf(0));

//playBingo(parsedInput.draws, parsedInput.boards);
