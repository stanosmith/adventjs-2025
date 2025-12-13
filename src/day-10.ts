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
// ⚠️ Weak points:
// • The logic for checking bracket validity is incomplete. It only checks if the string starts with '[' and ends with ']', and if the total counts of '[' and ']' are equal. It does not detect cases like '][' or '[]]]' correctly.
// • The depth calculation logic is flawed. It only increments depth when consecutive '[' characters are found, which does not accurately represent nested depth. For example, '[[[]]]' would incorrectly result in a depth of 2.
// • The code does not correctly handle the case where the input string is empty or contains characters other than '[' and ']'.
// • The use of `letters.split('') as '['[] | ']'[]` is a type assertion that might not be entirely safe if the input string contains characters other than brackets. A more robust approach would be to filter or validate characters.
// 🤔 Next steps:
// • Implement a robust bracket validation mechanism. A common approach is to use a stack to track open brackets and ensure they are closed in the correct order.
// • Revise the depth calculation logic. The maximum depth should be tracked by incrementing a counter when an opening bracket is encountered and decrementing it when a closing bracket is encountered, while keeping track of the maximum value the counter reaches.
// • Add checks for empty strings and potentially filter or validate input characters to ensure only brackets are processed.
// • Consider using a more type-safe approach for handling the characters in the string, perhaps by filtering them first or using a loop that explicitly checks each character.

function maxDepth(s: string): number {
	const startsWithOpenBracket = /^\[/.test(s);
	const endsWithCloseBracket = /]$/.test(s);

	const open = "[";
	const close = "]";
	const letters = s.split("") as "["[] | "]"[];
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
