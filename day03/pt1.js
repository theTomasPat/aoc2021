const fs = require('fs');

//const input = fs.readFileSync('./testInput').toString().split('\n');
const input = fs.readFileSync('./input').toString().split('\n');

let gammaRate = '';
let epsilonRate = '';

// this loop setup is iterating through the input like this:
//
// [ 1, 5, 10, ],
// [ 2, 6, 11, ],
// [ 3, 7, 12, ],
// [ 4, 8, 13  ]
//
//
// TODO: test to see if iterating through the input like this is faster:
//       I suspect it would be faster because of memory locality.
//
// [  1,  2,  3, ],
// [  4,  5,  6, ],
// [  7,  8,  9, ],
// [ 10, 11, 12  ]
//
for(let i = 0; i < input[0].length; i++)
{
	let countOnes = 0;

	for(let j = 0; j < input.length; j++)
	{
		if(input[j][i] == '1')
		{
			countOnes++;
		}
	}

	// if more than half of the values are 1s
	if(countOnes > input.length / 2)
	{
		gammaRate += '1';
		epsilonRate += '0';
		console.log(`gamma bit from row ${i} is 1`);
	}
	else
	{
		gammaRate += '0';
		epsilonRate += '1';
		console.log(`gamma bit from row ${i} is 0`);
	}
}

const numGamma = binStringToNumber(gammaRate);
const numEpsilon = binStringToNumber(epsilonRate);

console.log(`gamma: ${numGamma}, epsilon: ${numEpsilon}`);
console.log(`result: ${numGamma * numEpsilon}`);



function binStringToNumber(inputStr)
{
	let num = 0;

	for(let i = 0; i < inputStr.length; i++)
	{
		num *= 2;
		num += Number(inputStr[i]);
	}

	return num;
}
