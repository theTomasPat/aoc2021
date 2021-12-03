//const input = [ 199, 200, 208, 210, 200, 207, 240, 269, 260, 263 ];
const input = require('./input.js');

//console.log(input);

function countIncrementsRecursive(inputArr, prevSum, numIncrements)
{
	if(inputArr.length < 3) return numIncrements;

	let currSum = inputArr[0] + inputArr[1] + inputArr[2];
	//console.log(`${inputArr[0]} + ${inputArr[1]} + ${inputArr[2]} = ${currSum}`); 

	return countIncrementsRecursive(
		inputArr.slice(1),
		currSum,
		numIncrements + (currSum > prevSum ? 1 : 0)
	);
}

console.log(
	'number of increments:',
	countIncrementsRecursive(input, Math.MAX_VALUE, 0)
);
