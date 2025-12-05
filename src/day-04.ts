/**
 * The elves have found the encrypted code that protects the door to Santa’s workshop 🔐. The PIN has 4 digits, and it is hidden inside blocks like these:
 *
 * [1++][2-][3+][<]
 * Write a function that deciphers the PIN from the code.
 *
 * The code is made up of blocks between brackets [...] and each block generates one digit of the PIN.
 *
 * A normal block has the form [nOP...], where n is a number (0-9) and after it there can be a list of (optional) operations.
 *
 * The operations are applied in order to the number and are:
 *
 * + adds 1
 * - subtracts 1
 * The result is always a digit (mod 10 arithmetic), for example 9 + 1 → 0 and 0 - 1 → 9.
 *
 * There is also the special block [<], which repeats the digit from the previous block.
 *
 * If in the end there are fewer than 4 digits, you must return null.
 *
 * 🧩 Examples
 * decodeSantaPin('[1++][2-][3+][<]')
 * // "3144"
 *
 * decodeSantaPin('[9+][0-][4][<]')
 * // "0944"
 *
 * decodeSantaPin('[1+][2-]')
 * // null (only 2 digits)
 */

const SPECIAL = "<";
const mod10 = modulo(10);

decodeSantaPin("[1++][2-][3+][<]");
// "3144"

decodeSantaPin("[9+][0-][4][<]");
// "0944"

decodeSantaPin("[1+][2-]");
// null (only 2 digits)

console.log(Math.abs(0 - 1 * 10) % 10);
console.log(mod10(9 + 1)); // Plus
console.log(mod10(0 + 1 * 9)); // Minus

function decodeSantaPin(code: string): string {
	const blocks = code
		.split("][")
		.map((block) => block.replace("[", "").replace("]", ""));

	return blocks
		.map((block, index, allBlocks) => {
			const isSpecial = index > 0 && block === SPECIAL; // Special is only valid if it's not the first block
			if (isSpecial) return allBlocks[index - 1];

			const number = block.replace(/\D+/, "");
			const operators = block.replace(/\d/, "");
			const pluses = block.replace(/\d/, "");

			// TODO: If there are fewer than 4 digits, return null

			return block;
		})
		.join("");
}

function modulo(divisor: number) {
	return (dividend: number) => dividend % divisor;
}
