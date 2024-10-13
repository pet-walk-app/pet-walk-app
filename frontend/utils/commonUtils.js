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
