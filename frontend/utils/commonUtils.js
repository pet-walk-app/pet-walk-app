export function formatDate(date, separator) {
	if (!(date instanceof Date)) {
		date = parseDate(date)
	}

	const day = date.getDate().toString().padStart(2, "0")
	const month = (date.getMonth() + 1).toString().padStart(2, "0")
	const year = date.getFullYear()
	return `${day}${separator}${month}${separator}${year}`
}

export function parseDate(dateStr) {
	const [month, day, year] = dateStr.split("/").map(Number)
	return new Date(year, month - 1, day)
}

export const getFutureDate = (days = 0, months = 0, years = 0) => {
	const date = new Date();
  
	date.setDate(date.getDate() + days);
	date.setMonth(date.getMonth() + months);
	date.setFullYear(date.getFullYear() + years);
  
	return date;
  };

export const formatTime = (date) => {
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return `${hours}:${minutes}`;
};
