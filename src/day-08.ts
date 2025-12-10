/**
 * Santa 🎅 wants to know what the first non-repeated letter is in a toy's name 🎁.
 *
 * Write a function that takes a string and returns the first letter that is not repeated, ignoring uppercase and lowercase when counting, but returning the letter as it appears in the string.
 *
 * If there is none, return an empty string ("").
 */

// 🧩 Examples
findUniqueToy("Gift"); // 'G'
// ℹ️ The G is the first letter that is not repeated
// and we return it exactly as it appears

findUniqueToy("sS"); // ''
// ℹ️ The letters are repeated, since it doesn't distinguish uppercase

findUniqueToy("reindeeR"); // 'i'
// ℹ️ The r is repeated (even if it's uppercase)
// and the e as well, so the first one is 'i'

// More cases:
findUniqueToy("AaBbCc"); // ''
findUniqueToy("abcDEF"); // 'a'
findUniqueToy("aAaAaAF"); // 'F'
findUniqueToy("sTreSS"); // 'T'
findUniqueToy("z"); // 'z'

// Code review: 5/5
// ✅ Strengths:
// • The code correctly identifies the first non-repeated character, handling case-insensitivity as required.
// • The use of `reduce` to build a frequency map is efficient and idiomatic.
// • TypeScript types are used effectively, and the inferred types are appropriate.
// • The code is clean, readable, and adheres to the problem constraints.

function findUniqueToy(toy: string): string {
	const toys = toy.split("").reduce(
		(summary, letter) => {
			const letterNormalized = normalize(letter);
			if (summary[letterNormalized]) summary[letterNormalized].count++;
			else summary[letterNormalized] = { ogLetter: letter, count: 1 };
			return summary;
		},
		{} as Record<string, { ogLetter: string; count: number }>,
	);

	const uniqueToy = Object.values(toys).find(({ count }) => count === 1);

	return uniqueToy?.ogLetter ?? "";

	function normalize(str: string) {
		return str.toLowerCase();
	}
}
