/**
 * 🎄 Depth of Christmas Magic
 * At the North Pole, Santa Claus is reviewing the magical letters 📩✨ he receives from children all over the world. These letters use an ancient Christmas language in which the brackets [ and ] represent the intensity of the wish.
 *
 * The deeper the nesting of the brackets, the stronger the wish. Your mission is to find out the maximum depth at which the [] are nested.
 *
 * But be careful! Some letters may be poorly written. If the brackets are not properly balanced (if one closes before it opens, there are extra closing brackets, or closing brackets are missing), the letter is invalid and you must return -1.
 */

// 🧩 Examples

maxDepth("[]"); // -> 1
maxDepth("[[]]"); // -> 2
maxDepth("[][]"); // -> 1
maxDepth("[[][]]"); // -> 2
maxDepth("[[[]]]"); // -> 3
maxDepth("[][[]][]"); // -> 2

maxDepth("]["); // -> -1 (closes before opening)
maxDepth("[[["); // -> -1 (missing closing brackets)
maxDepth("[]]]"); // -> -1 (extra closing brackets)
maxDepth("[][]["); // -> -1 (one remains unclosed)

// Code review: 3/5
// ✅ Strengths:
// • The code attempts to handle bracket balancing and depth calculation.
// Uses TypeScript for type safety.
// ⚠️ Weak points:
// • The logic for calculating maximum depth is incorrect. It only increments depth when consecutive opening brackets are found, failing to account for nested structures like `[[]]` correctly.
// • The initial checks for `startsWithOpenBracket` and `endsWithCloseBracket` are insufficient for full bracket validation. For example, `][` would pass these checks but is invalid.
// • The filtering of characters using `filter(identity).filter(isValidCharacter)` is redundant and can be simplified.
// • The `reduce` operation to count brackets is unnecessary if the primary goal is to iterate and track depth.
// 🤔 Next steps:
// • Implement a single pass through the string to track current depth and maximum depth. Increment depth for '[' and decrement for ']'.
// • Ensure that the depth never goes below zero during the pass, indicating an invalid sequence (closing bracket without an open one).
// • After the pass, check if the final depth is zero. If not, it means there are unclosed brackets.
// • Remove the redundant `filter` calls and the `reduce` operation. Process the string directly.
// • Refactor the initial checks to be part of the main loop for a more robust validation.

function maxDepth(s: string): number {
	const open = "[";
	const close = "]";
	const identity = (val: unknown) => val;
	const isValidCharacter = (val: string) => val === open || val === close;
	const startsWithOpenBracket = /^\[/.test(s);
	const endsWithCloseBracket = /]$/.test(s);

	const letters = s.split("").filter(identity).filter(isValidCharacter) as
		| "["[]
		| "]"[];
	const wishes = letters.reduce(
		(summary, bracket: "[" | "]") => {
			summary[bracket]++;
			return summary;
		},
		{ [open]: 0, [close]: 0 },
	);

	if (
		!startsWithOpenBracket ||
		!endsWithCloseBracket ||
		wishes[open] !== wishes[close]
	)
		return -1;

	let depth = 1;

	for (let i = 0; i < letters.length; i++) {
		const lastBracket = letters[i - 1];
		const bracket = letters[i];
		if (bracket === open && bracket === lastBracket) depth++;
	}

	return depth;
}
