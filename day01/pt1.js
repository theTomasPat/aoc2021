//const input = [ 199, 200, 208, 210, 200, 207, 240, 269, 260, 263 ];
const input = require('./input.js');

//console.log(input);

function countIncrements(input)
{
	let increments = 0;

	for(let i = 1; i < input.length; i++)
	{
		increments += input[i] > input[i - 1] ? 1 : 0;
	}

	return increments;
}

console.log('increments:', countIncrements(input));
