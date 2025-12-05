/**
 * Elves have a secret timestamp: it’s the exact date and time when Santa Claus takes off with the sleigh 🛷 to deliver gifts around the world. But at the North Pole they use a super weird format to store the time: YYYY*MM*DD@HH|mm|ss NP (example: 2025*12*25@00|00|00 NP).
 *
 * Your mission is to write a function that receives:
 *
 * fromTime → reference date in elf format (YYYY*MM*DD@HH|mm|ss NP).
 * takeOffTime → the same takeoff date, also in elf format.
 * The function must return:
 *
 * The full seconds remaining until takeoff.
 * If we’re exactly at takeoff time → 0.
 * If takeoff already happened → a negative number indicating how many seconds have passed since then.
 * 🎯 Rules
 * First convert the elf format to a timestamp. The NP suffix indicates official North Pole time (no time zones or DST), so you can treat it as if it were UTC.
 * Use differences in seconds, not milliseconds.
 * Always round down (floor): only full seconds.
 */

// 🧩 Examples
const takeoff = "2025*12*25@00|00|00 NP";

// from December 24, 2025, 23:59:30, 30 seconds before takeoff
timeUntilTakeOff("2025*12*24@23|59|30 NP", takeoff);
// 30

// exactly at takeoff time
timeUntilTakeOff("2025*12*25@00|00|00 NP", takeoff);
// 0

// 12 seconds after takeoff
timeUntilTakeOff("2025*12*25@00|00|12 NP", takeoff);
// -12

type ElfDateTime =
	`${number}*${number}*${number}@${number}|${number}|${number} NP`;

// ✅ Strengths:
// • Excellent use of TypeScript template literal types for `ElfDateTime`, providing strong type safety and clarity for the expected input format.
// • The code is well-structured, using nested helper functions (`edtToUtc`, `_parseInt`) to encapsulate parsing logic, which improves readability and separation of concerns.
// • The logic correctly handles UTC date parsing and accurately calculates the time difference in full seconds, including handling past and future dates.
// • The parsing logic is robust, correctly extracting all date and time components from the specified format.
// ⚠️ Weak points:
// • The constant `0.001` used for converting milliseconds to seconds is a magic number; using `1000` in a division or a named constant would improve readability.
// • The `edtToUtc` helper function creates a `Date` object and then mutates its UTC components individually, which is less concise and idiomatic than using `new Date(Date.UTC(...))`.
// • The `_parseInt` helper function is slightly redundant; `parseInt` can be passed directly to `map` with the radix.
// 🤔 TODO: Next steps:
// • Refactor the `edtToUtc` function to use `new Date(Date.UTC(year, monthIndex, day, hours, minutes, seconds))` for a more concise and direct way to create UTC date objects.
// • Consider passing `parseInt` directly to `map` (e.g., `array.map(s => parseInt(s, 10))`) instead of using the `_parseInt` helper for slight conciseness.

function timeUntilTakeOff(
	fromTime: ElfDateTime,
	takeOffTime: ElfDateTime,
): number {
	const fromTimeDate = edtToUtc(fromTime);
	const takeOffTimeDate = edtToUtc(takeOffTime);

	const fromTimeEpoch = fromTimeDate.valueOf();
	const takeOffTimeEpoch = takeOffTimeDate.valueOf();

	return Math.floor((takeOffTimeEpoch - fromTimeEpoch) / 1000);

	function edtToUtc(dateTime: ElfDateTime) {
		// Date
		const dateParts = dateTime.split("@")[0].split("*").map(_parseInt);
		const year = dateParts[0];
		const month = dateParts[1] - 1;
		const day = dateParts[2];

		// Time
		const timeParts = dateTime
			.split("@")[1]
			.replace(/ NP/, "")
			.split("|")
			.map(_parseInt);
		const hours = timeParts[0];
		const minutes = timeParts[1];
		const seconds = timeParts[2];

		// Create new Date instance and set datetime in UTC
		const fromTimeDate = new Date();
		fromTimeDate.setUTCFullYear(year);
		fromTimeDate.setUTCMonth(month);
		fromTimeDate.setUTCDate(day);
		fromTimeDate.setUTCHours(hours);
		fromTimeDate.setUTCMinutes(minutes);
		fromTimeDate.setUTCSeconds(seconds);

		return fromTimeDate;
	}

	function _parseInt(string: string) {
		return parseInt(string, 10);
	}
}
