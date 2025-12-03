/**
 * Santa has received a list of gifts, but some are defective. A gift is defective if its name contains the # character.
 *
 * Help Santa by writing a function that takes a list of gift names and returns a new list that only contains the non-defective gifts.
 *
 * Examples
 * const gifts1 = ['car', 'doll#arm', 'ball', '#train']
 * const good1 = filterGifts(gifts1)
 * console.log(good1)
 * // ['car', 'ball']
 *
 * const gifts2 = ['#broken', '#rusty']
 * const good2 = filterGifts(gifts2)
 * console.log(good2)
 * // []
 *
 * const gifts3 = []
 * const good3 = filterGifts(gifts3)
 * console.log(good3)
 * // []
 */

const good1 = filterGifts(["car", "doll#arm", "ball", "#train"]);
const good2 = filterGifts(["#broken", "#rusty"]);
const good3 = filterGifts([]);

function filterGifts(gifts: string[]): string[] {
	return gifts.filter((gift) => !gift.includes("#"));
}
