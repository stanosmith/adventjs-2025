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

function decodeSantaPin(code: string): string | null {
	const SPECIAL = "<";

	const mod10 = modulo(10);

	const blocks = code
		.split("][")
		.map((block) => block.replace("[", "").replace("]", ""));

	const pin = blocks
		.map((block, index) => {
			if (block === SPECIAL) return block;

			const number = parseInt(match(/\d/)(block));

			const operators = match(/\D/g)(block);
			if (operators.length === 0) return number;

			const pluses = match(/\+/g)(operators).length;
			const minuses = match(/-/g)(operators).length;

			if (pluses) return mod10(number + pluses);
			return mod10(number + minuses * 9);
		})
		.map((number, index, allNumbers) => {
			if (index > 0 && number === SPECIAL) return allNumbers[index - 1];
			return number;
		})
		.join("");

	// If there are fewer than 4 digits, return null
	return pin.length < 4 ? null : pin;

	function match(regex: RegExp) {
		return (str: string) => str.match(regex)?.join("") ?? "";
	}

	function modulo(divisor: number) {
		return (dividend: number) => dividend % divisor;
	}
}
