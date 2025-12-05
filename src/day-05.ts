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

function timeUntilTakeOff(
	fromTime: ElfDateTime,
	takeOffTime: ElfDateTime,
): number {
	const fromTimeDate = edtToUtc(fromTime);
	const takeOffTimeDate = edtToUtc(takeOffTime);

	const fromTimeEpoch = fromTimeDate.valueOf();
	const takeOffTimeEpoch = takeOffTimeDate.valueOf();

	return Math.floor((takeOffTimeEpoch - fromTimeEpoch) * 0.001);

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
