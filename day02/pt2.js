const fs = require('fs');

//const input = fs.readFileSync('./testInput').toString();
const input = fs.readFileSync('./input').toString();

let x = 0;
let y = 0;
let aim = 0;

let cmdString = '';
let valString = '';

// readingCmd is true when it's interpreting the movement command
// false when it's interpreting the movement value
let readingCmd = true;
for(let i = 0; i < input.length; i++)
{
	if(readingCmd)
	{
		if(input[i] != ' ')
		{
			cmdString += input[i];
		}
		else
		{
			readingCmd = false;
		}
	}
	else
	{
		if(input[i] != '\n')
		{
			valString += input[i];
		}
		else
		{
			readingCmd = true;

			value = Number(valString);
			switch(cmdString)
			{
				case "forward":
					x += value;
					y += aim * value;

					cmdString = '';
					valString = '';
					break;

				case "up":
					aim -= value;

					cmdString = '';
					valString = '';
					break;

				case "down":
					aim += value;

					cmdString = '';
					valString = '';
					break;
			}
		}
	}
}

console.log(`x: ${x}, y: ${y}`);
console.log(`final product: ${x * y}`);
