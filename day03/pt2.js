const fs = require('fs');

//const input = fs.readFileSync('./testInput').toString().split('\n');
const input = fs.readFileSync('./input').toString().split('\n');

function getO2Rating(input) {

	let checkRatingValues = input;

	// this loop setup is iterating through the input like this:
	//
	// [ 1, 5, 10, ],
	// [ 2, 6, 11, ],
	// [ 3, 7, 12, ],
	// [ 4, 8, 13  ]
	//
	for(let i = 0; i < input[0].length; i++)
	{
		let countOnes = 0;

		for(let j = 0; j < checkRatingValues.length; j++)
		{
			if(checkRatingValues[j][i] === '1')
			{
				countOnes++;
			}
		}

		// check whether 1s or 0s are more common
		// if there's a tie, favor 1s
		if(countOnes >= checkRatingValues.length / 2)
		{
			// filter for values with a 1 in the current column (i)
			checkRatingValues = checkRatingValues.filter(value => {
				return value[i] === '1';
			});
		}
		else
		{
			// filter for values with a 0 in the current column
			checkRatingValues = checkRatingValues.filter(value => {
				return value[i] === '0';
			});
		}

		if(checkRatingValues.length == 1) {
			break;
		}
	}

	return checkRatingValues[0];
}

function getCO2Rating(input) {

	let checkRatingValues = input;

	// this loop setup is iterating through the input like this:
	//
	// [ 1, 5, 10, ],
	// [ 2, 6, 11, ],
	// [ 3, 7, 12, ],
	// [ 4, 8, 13  ]
	//
	for(let i = 0; i < input[0].length; i++)
	{
		let countOnes = 0;

		for(let j = 0; j < checkRatingValues.length; j++)
		{
			if(checkRatingValues[j][i] === '1')
			{
				countOnes++;
			}
		}

		// check whether 1s or 0s are more common
		// if there's a tie, favor 0s
		if(countOnes >= checkRatingValues.length / 2)
		{
			// we're looking for the least common digit so if 1s are more
			// common, filter out the 1s
			checkRatingValues = checkRatingValues.filter(value => {
				return value[i] === '0';
			});
		}
		else
		{
			// filter for values with a 1 in the current column
			checkRatingValues = checkRatingValues.filter(value => {
				return value[i] === '1';
			});
		}

		if(checkRatingValues.length == 1) {
			break;
		}
	}

	return checkRatingValues[0];
}

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



// Run the code
const o2Rating = binStringToNumber(getO2Rating(input));
const co2Rating = binStringToNumber(getCO2Rating(input));
console.log(`O2: ${o2Rating},`,
	`CO2: ${co2Rating},`,
	`life support: ${o2Rating * co2Rating}`);
