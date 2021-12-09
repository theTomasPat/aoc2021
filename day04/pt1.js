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
 * Rows:
 * [
 *  [  0,  1,  2,  3,  4 ],
 *  [  5,  6,  7,  8,  9 ],
 *  [ 10, 11, 12, 13, 14 ],
 *  [ 15, 16, 17, 18, 19 ],
 *  [ 20, 21, 22, 23, 24 ]
 * ]
 * 
 * Cols:
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

Board.prototype.hasWon = function() {
	// for each of the winning rows,
	for(let i = 0; i < this.winningRows.length; i++) {
		// if this board's `marked` array includes each value in the current row
		if(this.winningRows[i].every(idx => this.marked.includes(idx))) {
			// there's a win
			return true;
		}
	}

	// for each of the winning cols,
	for(let i = 0; i < this.winningCols.length; i++) {
		// if this board's `marked` array includes each value in the current row
		if(this.winningCols[i].every(idx => this.marked.includes(idx))) {
			// there's a win
			return true;
		}
	}

	return false;
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
	// iterate through each of the draws
	for(let i = 0; i < draws.length; i++) {
		// mark this draw on every board as necessary
		for(let j = 0; j < boards.length; j++) {
			let markedIndices = boards[j].numbers.allIndexesOf(draws[i]);
			if(markedIndices.length > 0) {
				markedIndices.forEach(idx => {
					boards[j].marked.push(idx);
				});

				if(boards[j].hasWon()) {
					// sum the non-marked numbers on the board
					const boardSum = boards[j].numbers
						.filter((num, idx) => boards[j].marked.includes(idx) === false)
						.reduce((acc, val) => acc + val);
					// multiply that number by the most recent draw (in this case, `draws[i]`)
					const finalAnswer = boardSum * draws[i];

					console.log(`The winning board is: \n${JSON.stringify(boards[j])}`);

					return `board sum: ${boardSum},\nlast draw: ${draws[i]},\nfinal answer: ${finalAnswer}`;
				}
			}
		}
	}

	return "There is no winning board";
}


//const input = fs.readFileSync('./testInput');
const input = fs.readFileSync('./input');

// parse input
const parsedInput = parseInput(input);
//console.log(parsedInput.draws, parsedInput.boards);

console.log(playBingo(parsedInput.draws, parsedInput.boards));
