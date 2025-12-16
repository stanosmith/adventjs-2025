/**
 * Two elves are playing a turn-based battle. Each one has a deck of moves represented as a string where each character is an action.
 *
 * A Normal attack: deals 1 point of damage if it’s not blocked
 * B Block: blocks a normal attack (A)
 * F Strong attack: deals 2 points of damage, cannot be blocked
 * Both elves start with 3 hit points. The first elf to reach 0 hit points or less loses and the battle ends immediately (no further moves are processed).
 *
 * Round rules
 *
 * If both use an attack (A or F), both take damage according to the type.
 * B blocks A, but does not block F.
 * Everything is resolved simultaneously.
 * Your task
 *
 * Return the result of the battle as a number:
 *
 * 1 → if Elf 1 wins
 * 2 → if Elf 2 wins
 * 0 → if it’s a draw (both reach 0 at the same time or end with the same health)
 */

// 🧩 Examples

elfBattle("A", "B");
// Round 1: A vs B -> Elf 2 blocks
// Result: Elf 1 = 3 HP
//         Elf 2 = 3 HP
// → 0

elfBattle("F", "B");
// Round 1: F vs B -> Elf 2 takes 2 damage (F cannot be blocked)
// Result: Elf 1 = 3 HP
//         Elf 2 = 1 HP
// → 1

elfBattle("AAB", "BBA");
// R1: A vs B → Elf 2 blocks
// R2: A vs B → Elf 2 blocks
// R3: B vs A → Elf 1 blocks
// Result: Elf 1 = 3, Elf 2 = 3
// → 0

elfBattle("AFA", "BBA");
// R1: A vs B → Elf 2 blocks
// R2: F vs B → Elf 2 takes 2 damage (F cannot be blocked)
// R3: A vs A → both -1
// Result: Elf 1 = 2, Elf 2 = 0
// → 1

elfBattle("AFAB", "BBAF");
// R1: A vs B → Elf 2 blocks
// R2: F vs B → Elf 2 takes 2 damage (F cannot be blocked)
// R3: A vs A → both -1 → Elf 2 reaches 0 Battle ends!
// R4: is not played, since Elf 2 has no health left
// → 1

elfBattle("AA", "FF");
// R1: A vs F → Elf 1 -2, Elf 2 -1
// R2: A vs F → Elf 1 -2, Elf 2 -1 → Elf 1 reaches -1
// → 2

function elfBattle(elf1: string, elf2: string): number {
	const RESULT = {
		elf1: 1,
		elf2: 2,
		draw: 0,
	};

	enum ActionType {
		ATTACK = "ATTACK",
		BLOCK = "BLOCK",
	}

	enum ActionId {
		A = "A",
		B = "B",
		F = "F",
	}

	const STARTING_HP = 3;
	const ACTIONS = [
		{
			id: ActionId.A,
			type: ActionType.ATTACK,
			hitPoint: 1,
		},
		{
			id: ActionId.F,
			type: ActionType.ATTACK,
			hitPoint: 2,
		},
		{
			id: ActionId.B,
			type: ActionType.BLOCK,
			blocks: [ActionId.A],
		},
	];

	// Handle blanket cases
	if (elf1.trim().length !== elf2.trim().length)
		throw Error("Invalid battle: Elve's must have the same number of movies.");
	if (elf1 === elf2) return RESULT.draw;

	// Normalize and Validate moves
	const movesElf1 = getMoves(elf1);
	const movesElf2 = getMoves(elf2);

	const rounds = movesElf1.map((action: ActionId, index) => [
		action,
		movesElf2[index],
	]) as ActionId[][];

	return rounds.reduce((result: number, round: ActionId[]) => {
		return result;
	}, RESULT.draw);

	function getMoves(moves: string) {
		return moves.split("").filter(identity).map(forceUpper).map(validateAction);
	}

	function identity(val: unknown) {
		return val;
	}

	function forceUpper(move: string) {
		return move.toUpperCase();
	}

	function validateAction(action: string) {
		const key = action as keyof typeof ActionId;

		if (Object.keys(ActionId).includes(key)) {
			return ActionId[key];
		}
		throw Error(`This battle is forfeit due to an invalid action: ${action}`);
	}
}
