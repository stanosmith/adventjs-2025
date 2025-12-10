/**
 * The elves have built a robot vacuum reindeer 🦌 (@) to tidy up the workshop a bit before Christmas.
 *
 * The reindeer moves on a board to pick things up off the floor (*) and must avoid obstacles (#).
 *
 * You will receive two parameters:
 *
 * board: a string that represents the board.
 * moves: a string with the movements: 'L' (left), 'R' (right), 'U' (up), 'D' (down).
 * Movement rules:
 *
 * If the reindeer picks something up off the floor (*) during the moves → return 'success'.
 * If the reindeer goes off the board or crashes into an obstacle (#) → return 'crash'.
 * If the reindeer neither picks anything up nor crashes → return 'fail'.
 * Keep in mind that if the reindeer picks something up off the floor, it is already 'success', regardless of whether in later moves it crashes into an obstacle or goes off the board.
 *
 * Important: Keep in mind that in the board the first and last lines are blank and must be discarded.
 */

// 🧩 Examples

const board = `
.....
.*#.*
.@...
.....
`;

moveReno(board, "D");
// ➞ 'fail' -> it moves but doesn't pick anything up

moveReno(board, "U");
// ➞ 'success' -> it picks something up (*) right above

moveReno(board, "RU");
// ➞ 'crash' -> it crashes into an obstacle (#)

moveReno(board, "RRRUU");
// ➞ 'success' -> it picks something up (*)

moveReno(board, "DD");
// ➞ 'crash' -> it crashes into the bottom of the board

moveReno(board, "UUU");
// ➞ 'success' -> it picks something up off the floor (*) and then crashes at the top

moveReno(board, "RR");
// ➞ 'fail' -> it moves but doesn't pick anything up

// Code review: 4/5
// ✅ Strengths:
// • The code correctly handles the logic for success, crash, and fail conditions.
// • The use of nested functions for helper logic is well-structured.
// • TypeScript types are used appropriately for clarity.
// ⚠️ Weak points:
// • The cyclomatic complexity is high due to the nested loops and conditional logic, making it harder to follow.
// • The `movementTracker` function modifies the `coordinates` array in place, which can lead to unexpected side effects if not carefully managed. A more functional approach would be preferable.
// 🤔 Next steps:
// • Consider refactoring the movement logic to reduce cyclomatic complexity. This might involve breaking down the main loop into smaller, more manageable functions or using a state machine pattern.
// • Modify `movementTracker` to return a new coordinate array instead of mutating the existing one. This improves predictability and testability.

type Board = string;
type Moves = string;
type Result = "fail" | "crash" | "success";

function moveReno(board: Board, moves: Moves): Result {
	const boardGrid = board.split("\n").filter(identity).map(stringToArray);
	const initialCoordinates = getInitialCoordinates(boardGrid);
	const track = movementTracker(initialCoordinates);

	for (let i = 0; i < moves.length; i++) {
		const movement = moves.slice(i, i + 1);
		const [x, y] = track(movement);

		const row = boardGrid[y];
		const col = typeof row !== "undefined" ? row[x] : undefined;

		if (
			col === "#" ||
			x < 0 ||
			x >= boardGrid[0].length ||
			y < 0 ||
			y >= boardGrid.length
		)
			return "crash";
		if (col === "*") return "success";
	}

	return "fail";

	function identity(a: unknown) {
		return a;
	}

	function stringToArray(s: string) {
		return s.split("");
	}

	function getInitialCoordinates(boardGrid: string[][]) {
		for (let row = 0; row < boardGrid.length; row++) {
			const col = boardGrid[row].indexOf("@");
			if (col !== -1) return [col, row];
		}
		throw Error(`Unable to find Reno in board "${boardGrid}"`);
	}

	function movementTracker(coordinates: number[]) {
		return (movement: string | "L" | "R" | "U" | "D") => {
			switch (movement) {
				case "L":
					coordinates[0]--;
					break;
				case "R":
					coordinates[0]++;
					break;
				case "U":
					coordinates[1]--;
					break;
				case "D":
					coordinates[1]++;
					break;
				default:
					throw Error(`Unknown movement '${movement}'`);
			}
			return coordinates;
		};
	}
}
