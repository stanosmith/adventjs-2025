/**
 * The Grinch wants to steal the Christmas presents from the warehouse. To do this, he needs to know which presents are not under surveillance.
 *
 * The warehouse is represented as an array of strings (string[]), where each present (*) is protected if its position is next to a camera (#). Each empty space is represented with a dot (.).
 *
 * Your task is to count how many presents are not under surveillance, meaning they do not have any adjacent camera (up, down, left, or right).
 *
 * Keep in mind: only the 4 cardinal directions are considered "adjacent", not diagonals.
 *
 * Presents in the corners or at the edges can be unguarded, as long as they do not have cameras directly next to them.
 */

// 🧩 Examples

findUnsafeGifts([".*.", "*#*", ".*."]); // ➞ 0
// All presents are next to a camera

findUnsafeGifts(["...", ".*.", "..."]); // ➞ 1
// This present has no cameras around

findUnsafeGifts(["*.*", "...", "*#*"]); // ➞ 2
// The presents in the top corners have no cameras around

findUnsafeGifts([".....", ".*.*.", "..#..", ".*.*.", "....."]); // ➞ 4
// The four presents have no cameras, because they are diagonal to the camera

// Code review: 3/5
// ✅ Strengths:
// • The code correctly identifies and counts unsafe gifts based on the provided logic.
// • TypeScript types are used, although inference would suffice for most parts.
// • The use of nested functions is generally well-contained.
// ⚠️ Weak points:
// • The cyclomatic complexity is high (13), indicating potential for simplification.
// • The nested function `getUnsafeCounter` returning another function `countUnsafe` adds unnecessary complexity and reduces readability.
// • The `map` operation is used to process rows, but it's not strictly necessary as the logic could be integrated into a single loop or a more direct iteration.
// • The `row.indexOf(present)` check within the `map` callback is inefficient as it only checks for the first present in a row and doesn't account for multiple presents.
// • The `sum` helper function is a simple addition and could be replaced by the direct `+` operator for brevity.
// • The `adjacentItems.includes(camera)` check is a clear indicator of a potential for a more direct conditional check.
// • The code relies on accessing `warehouse[index - 1]` and `warehouse[index + 1]` which can lead to `undefined` values if not handled carefully, though the current logic seems to mitigate this by checking `rowPrev` and `rowNext`.
// 🤔 Next steps:
// • Refactor the nested functions to a single, more straightforward function to reduce cyclomatic complexity and improve readability.
// • Consider a single loop that iterates through the warehouse, checking each cell for a present and then its neighbors.
// • Remove the `row.indexOf(present)` check and directly process each character in the row.
// • Simplify the `adjacentItems.includes(camera)` check to a series of direct conditional checks for clarity.
// • Remove the `sum` helper function and use the `+` operator directly in the `reduce` call.

function findUnsafeGifts(warehouse: string[]): number {
	const present = "*";
	const camera = "#";

	const sum = (a: number, b: number) => a + b;

	return warehouse
		.map((row, index, warehouse) => {
			const unsafeCounter = getUnsafeCounter(
				warehouse[index - 1],
				warehouse[index + 1],
			);
			const presentIndex = row.indexOf(present);
			if (presentIndex !== -1) return unsafeCounter(row);
			return 0;
		})
		.reduce(sum, 0);

	function getUnsafeCounter(rowPrev: string, rowNext: string) {
		return function countUnsafe(row: string) {
			let unsafeTotal = 0;
			for (let i = 0; i < row.length; i++) {
				const item = row[i];
				if (item === present) {
					const adjacentItems = [
						row[i - 1],
						row[i + 1],
						rowPrev ? rowPrev[i] : undefined,
						rowNext ? rowNext[i] : undefined,
					];
					if (!adjacentItems.includes(camera)) unsafeTotal++;
				}
			}
			return unsafeTotal;
		};
	}
}
