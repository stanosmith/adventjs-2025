/**
 * In Santa's workshop, the elves have found a mountain of magical gloves completely disorganized. Each glove is described by two values:
 *
 * hand: indicates whether it is a left glove (L) or a right glove (R)
 * color: the color of the glove (string)
 * Your task is to help them match gloves: A valid pair is a left glove and a right glove of the same color.
 *
 * You must return a list with the colors of all the pairs found. Keep in mind that there can be several pairs of the same color.
 */

// 🧩 Examples
const gloves: Glove[] = [
	{ hand: "L", color: "red" },
	{ hand: "R", color: "red" },
	{ hand: "R", color: "green" },
	{ hand: "L", color: "blue" },
	{ hand: "L", color: "green" },
];
const gloves2: Glove[] = [
	{ hand: "L", color: "gold" },
	{ hand: "R", color: "gold" },
	{ hand: "L", color: "gold" },
	{ hand: "L", color: "gold" },
	{ hand: "R", color: "gold" },
];
const gloves3: Glove[] = [
	{ hand: "L", color: "red" },
	{ hand: "R", color: "green" },
	{ hand: "L", color: "blue" },
];

matchGloves(gloves);
// ["red", "green"]

matchGloves(gloves2);
// ["gold", "gold"]

matchGloves(gloves3);
// []

type Glove = { hand: "L" | "R"; color: string };

function matchGloves(gloves: Glove[]): string[] {
	const summary = gloves.reduce(
		(summary, { hand, color }) => {
			if (summary[color]) {
				if (typeof summary[color][hand] === "number") summary[color][hand]++;
				else summary[color][hand] = 1;
			} else {
				summary[color] = { [hand]: 1 };
			}
			return summary;
		},
		{} as Record<string, Record<string, number>>,
	);

	const pairs = [] as string[];

	for (const summaryKey in summary) {
		const left = summary[summaryKey]["L"];
		const right = summary[summaryKey]["R"];

		if (left && right) {
			const totalMatches = Math.min(left, right);
			for (let i = 0; i < totalMatches; i++) {
				pairs.push(summaryKey);
			}
		}
	}

	return pairs;
}
