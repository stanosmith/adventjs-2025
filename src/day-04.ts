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
 */

// 🧩 Examples

decodeSantaPin("[1++][2-][3+][<]");
// "3144"

decodeSantaPin("[9+][0-][4][<]");
// "0944"

decodeSantaPin("[1+][2-]");
// null (only 2 digits)

decodeSantaPin("[0][<][<][<]");
// "0000"

function decodeSantaPin(code: string): string | null {
	const SPECIAL = "<";

	const mod10 = modulo(10);

	const blocks = code
		.split("][")
		.map((block) => block.replace("[", "").replace("]", ""));

	const pin = blocks
		.map((block) => {
			if (block === SPECIAL) return block;

			const number = parseInt(match(/\d/)(block), 10);

			const operators = match(/\D/g)(block);

			const pluses = match(/\+/g)(operators).length;
			const minuses = match(/-/g)(operators).length;

			// Weak points:
			// • The logic for applying `+` and `-` operations is incorrect. It counts total `+` and `-` signs but does not apply them sequentially as they appear in the block. If a block contains both `+` and `-` (e.g., `[1+-]`), only the `+` operations are considered due to the `if (pluses)` condition, leading to an incorrect result.
			// • The cyclomatic complexity is high, indicating that the logic for parsing and applying operations within each block could be simplified or refactored for better clarity and reduced branching.
			// TODO: Next steps:
			// • Refactor the operation parsing logic to iterate through the operators and apply `+` and `-` operations sequentially to the number, respecting their order of appearance in the block.
			// • Consider simplifying the regex matching and operation application within the `map` callback to reduce the overall cyclomatic complexity.
			if (pluses) return mod10(number + pluses);
			if (minuses) return mod10(number + minuses * 9);
			return number;
		})
		.reduce((acc, cur) => {
			if (cur === SPECIAL) acc.push(acc[acc.length - 1]);
			else acc.push(cur);
			return acc;
		}, [] as number[])
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
